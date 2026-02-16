"use client";

import { useEffect, useRef, useCallback } from "react";
import { SOUNDS } from "@/lib/sounds";
import { useSoundStore } from "@/stores/useSoundStore";

type HowlInstance = {
  playing: () => boolean;
  play: () => void;
  pause: () => void;
  load: () => void;
  volume: (v?: number) => number;
  fade: (from: number, to: number, duration: number) => void;
  unload: () => void;
};

const FADE_IN_MS = 400;
const FADE_OUT_MS = 300;

export function SoundEngine() {
  const sounds = useSoundStore((s) => s.sounds);
  const masterVolume = useSoundStore((s) => s.masterVolume);
  const isMuted = useSoundStore((s) => s.isMuted);
  const howlsRef = useRef<Map<string, HowlInstance>>(new Map());
  const howlerModuleRef = useRef<typeof import("howler") | null>(null);
  const initializedRef = useRef(false);
  const fadeOutTimers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());
  const prevSoundsRef = useRef<Record<string, { playing: boolean; volume: number }>>({});

  // Lazy load howler module
  useEffect(() => {
    import("howler").then((mod) => {
      howlerModuleRef.current = mod;
    });
  }, []);

  const getOrCreateHowl = useCallback(
    (id: string): HowlInstance | null => {
      if (howlsRef.current.has(id)) {
        return howlsRef.current.get(id)!;
      }

      const mod = howlerModuleRef.current;
      if (!mod) return null;

      const soundDef = SOUNDS.find((s) => s.id === id);
      if (!soundDef) return null;

      const howl = new mod.Howl({
        src: [soundDef.src],
        loop: true,
        volume: 0,
        html5: true,
        preload: false,
      });

      howlsRef.current.set(id, howl as unknown as HowlInstance);
      return howl as unknown as HowlInstance;
    },
    []
  );

  // Handle play/pause state changes with fade transitions
  useEffect(() => {
    if (!howlerModuleRef.current) return;

    const prev = prevSoundsRef.current;

    Object.entries(sounds).forEach(([id, state]) => {
      const howl = getOrCreateHowl(id);
      if (!howl) return;

      const wasPlaying = prev[id]?.playing ?? false;
      const targetVolume = isMuted ? 0 : state.volume * masterVolume;

      try {
        if (state.playing) {
          // Clear any pending fade-out timer
          const timer = fadeOutTimers.current.get(id);
          if (timer) {
            clearTimeout(timer);
            fadeOutTimers.current.delete(id);
          }

          if (!wasPlaying) {
            // Starting: fade in from 0
            howl.load();
            howl.volume(0);
            howl.play();
            howl.fade(0, targetVolume, FADE_IN_MS);
          } else {
            // Already playing: just update volume
            howl.volume(targetVolume);
          }
        } else if (wasPlaying && !state.playing) {
          // Stopping: fade out then pause
          const currentVol = howl.volume() ?? 0;
          howl.fade(currentVol, 0, FADE_OUT_MS);
          const timer = setTimeout(() => {
            try {
              howl.pause();
            } catch {
              // Ignore
            }
            fadeOutTimers.current.delete(id);
          }, FADE_OUT_MS);
          fadeOutTimers.current.set(id, timer);
        }
      } catch {
        // Ignore howler errors during state transitions
      }
    });

    // Store current state for next comparison
    prevSoundsRef.current = Object.fromEntries(
      Object.entries(sounds).map(([id, s]) => [id, { playing: s.playing, volume: s.volume }])
    );
  }, [sounds, masterVolume, isMuted, getOrCreateHowl]);

  // Handle autoplay restrictions - resume on first user interaction
  useEffect(() => {
    if (initializedRef.current) return;

    const resumeAudio = () => {
      try {
        const mod = howlerModuleRef.current;
        if (mod?.Howler?.ctx?.state === "suspended") {
          mod.Howler.ctx.resume();
        }
      } catch {
        // Ignore errors
      }
      initializedRef.current = true;
      document.removeEventListener("click", resumeAudio);
      document.removeEventListener("touchstart", resumeAudio);
      document.removeEventListener("keydown", resumeAudio);
    };

    document.addEventListener("click", resumeAudio);
    document.addEventListener("touchstart", resumeAudio);
    document.addEventListener("keydown", resumeAudio);

    return () => {
      document.removeEventListener("click", resumeAudio);
      document.removeEventListener("touchstart", resumeAudio);
      document.removeEventListener("keydown", resumeAudio);
    };
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      fadeOutTimers.current.forEach((timer) => clearTimeout(timer));
      fadeOutTimers.current.clear();
      howlsRef.current.forEach((howl) => {
        try {
          howl.unload();
        } catch {
          // Ignore cleanup errors
        }
      });
      howlsRef.current.clear();
    };
  }, []);

  return null;
}

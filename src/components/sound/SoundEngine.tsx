"use client";

import { useEffect, useRef, useCallback } from "react";
import { Howl } from "howler";
import { SOUNDS } from "@/lib/sounds";
import { useSoundStore } from "@/stores/useSoundStore";

export function SoundEngine() {
  const sounds = useSoundStore((s) => s.sounds);
  const masterVolume = useSoundStore((s) => s.masterVolume);
  const isMuted = useSoundStore((s) => s.isMuted);
  const howlsRef = useRef<Map<string, Howl>>(new Map());
  const initializedRef = useRef(false);

  const getOrCreateHowl = useCallback((id: string): Howl | null => {
    if (howlsRef.current.has(id)) {
      return howlsRef.current.get(id)!;
    }

    const soundDef = SOUNDS.find((s) => s.id === id);
    if (!soundDef) return null;

    const howl = new Howl({
      src: [soundDef.src],
      loop: true,
      volume: 0,
      html5: true,
      preload: false,
    });

    howlsRef.current.set(id, howl);
    return howl;
  }, []);

  // Handle play/pause state changes
  useEffect(() => {
    Object.entries(sounds).forEach(([id, state]) => {
      const howl = getOrCreateHowl(id);
      if (!howl) return;

      if (state.playing) {
        if (!howl.playing()) {
          howl.load();
          howl.play();
        }
        howl.volume(isMuted ? 0 : state.volume * masterVolume);
      } else {
        if (howl.playing()) {
          howl.pause();
        }
      }
    });
  }, [sounds, masterVolume, isMuted, getOrCreateHowl]);

  // Handle autoplay restrictions - resume on first user interaction
  useEffect(() => {
    if (initializedRef.current) return;

    const resumeAudio = () => {
      if (Howler.ctx && Howler.ctx.state === "suspended") {
        Howler.ctx.resume();
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
      howlsRef.current.forEach((howl) => {
        howl.unload();
      });
      howlsRef.current.clear();
    };
  }, []);

  return null;
}

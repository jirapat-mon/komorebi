"use client";

import { useSoundStore } from "@/stores/useSoundStore";
import { cn } from "@/lib/utils";
import type { Sound } from "@/types/sound";
import {
  CloudRain,
  Coffee,
  Flame,
  Play,
  Pause,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  "cloud-rain": CloudRain,
  coffee: Coffee,
  flame: Flame,
};

interface SoundCardProps {
  sound: Sound;
}

export function SoundCard({ sound }: SoundCardProps) {
  const soundState = useSoundStore((s) => s.sounds[sound.id]);
  const toggleSound = useSoundStore((s) => s.toggleSound);
  const setVolume = useSoundStore((s) => s.setVolume);
  const activeSounds = useSoundStore((s) =>
    Object.values(s.sounds).filter((ss) => ss.playing)
  );

  const isPlaying = soundState?.playing ?? false;
  const volume = soundState?.volume ?? 0.5;
  const isDisabled = !isPlaying && activeSounds.length >= 2;

  const Icon = ICON_MAP[sound.icon] ?? Flame;

  return (
    <div
      className={cn(
        "relative flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-300",
        "bg-stone-800/50 border border-stone-700/30",
        isPlaying && "border-amber-500/30 bg-stone-800/80",
        isDisabled && "opacity-40 cursor-not-allowed"
      )}
    >
      {/* Playing glow */}
      {isPlaying && (
        <div
          className="absolute inset-0 rounded-xl pointer-events-none animate-pulse"
          style={{
            background: `radial-gradient(ellipse at center, ${sound.color}10 0%, transparent 70%)`,
          }}
        />
      )}

      {/* Icon + Play button */}
      <button
        onClick={() => !isDisabled && toggleSound(sound.id)}
        disabled={isDisabled}
        className={cn(
          "relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200",
          "hover:scale-105 active:scale-95",
          isPlaying
            ? "bg-amber-500/20 text-amber-400"
            : "bg-stone-700/50 text-stone-400 hover:text-stone-300",
          isDisabled && "pointer-events-none"
        )}
      >
        {isPlaying ? (
          <Pause className="w-4 h-4 fill-current" />
        ) : (
          <Play className="w-4 h-4 fill-current ml-0.5" />
        )}
      </button>

      {/* Label */}
      <div className="flex items-center gap-1.5">
        <Icon
          className="w-3.5 h-3.5"
          style={{ color: isPlaying ? sound.color : undefined }}
        />
        <span
          className={cn(
            "text-xs font-medium",
            isPlaying ? "text-stone-200" : "text-stone-400"
          )}
        >
          {sound.name}
        </span>
      </div>

      {/* Volume slider */}
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={volume}
        onChange={(e) => setVolume(sound.id, parseFloat(e.target.value))}
        className={cn(
          "w-full h-1 rounded-full appearance-none cursor-pointer",
          "bg-stone-700 accent-amber-500",
          "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-amber-500 [&::-webkit-slider-thumb]:shadow-md",
          !isPlaying && "opacity-50"
        )}
      />
    </div>
  );
}

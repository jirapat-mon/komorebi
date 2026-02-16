"use client";

import { useSoundStore } from "@/stores/useSoundStore";
import { cn } from "@/lib/utils";
import type { Sound } from "@/types/sound";
import {
  CloudRain,
  CloudLightning,
  Bird,
  Wind,
  Waves,
  Coffee,
  Flame,
  Keyboard,
  Play,
  Pause,
  CloudRainWind,
  Snowflake,
  Trees,
  Droplets,
  Bug,
  Clock,
  Fan,
  ThermometerSnowflake,
  CupSoda,
  Utensils,
  Car,
  TrainFront,
  Building2,
  BookOpen,
  PenTool,
  Headphones,
  Music,
  Music2,
  Radio,
  Orbit,
  Rocket,
  Globe,
  Lock,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  "cloud-rain": CloudRain,
  "cloud-rain-wind": CloudRainWind,
  "cloud-lightning": CloudLightning,
  bird: Bird,
  wind: Wind,
  waves: Waves,
  coffee: Coffee,
  flame: Flame,
  keyboard: Keyboard,
  snowflake: Snowflake,
  trees: Trees,
  droplets: Droplets,
  bug: Bug,
  clock: Clock,
  fan: Fan,
  "thermometer-snowflake": ThermometerSnowflake,
  "cup-soda": CupSoda,
  utensils: Utensils,
  car: Car,
  "train-front": TrainFront,
  "building-2": Building2,
  "book-open": BookOpen,
  "pen-tool": PenTool,
  headphones: Headphones,
  music: Music,
  "music-2": Music2,
  radio: Radio,
  orbit: Orbit,
  rocket: Rocket,
  globe: Globe,
};

interface SoundCardProps {
  sound: Sound;
}

export function SoundCard({ sound }: SoundCardProps) {
  const soundState = useSoundStore((s) => s.sounds[sound.id]);
  const toggleSound = useSoundStore((s) => s.toggleSound);
  const setVolume = useSoundStore((s) => s.setVolume);
  const activeCount = useSoundStore((s) =>
    Object.values(s.sounds).filter((ss) => ss.playing).length
  );

  const isPlaying = soundState?.playing ?? false;
  const volume = soundState?.volume ?? 0.5;
  const isPremium = sound.tier === "premium";
  const isMaxed = !isPlaying && activeCount >= 3;
  const isDisabled = isPremium || isMaxed;

  const Icon = ICON_MAP[sound.icon] ?? Flame;

  return (
    <div
      className={cn(
        "relative flex flex-col items-center gap-1.5 sm:gap-2 p-2 sm:p-3 rounded-xl transition-all duration-300",
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

      {/* Premium lock overlay */}
      {isPremium && (
        <div className="absolute top-1 right-1 z-10">
          <Lock className="w-2.5 h-2.5 text-stone-500" />
        </div>
      )}

      {/* Icon + Play button */}
      <button
        onClick={() => !isDisabled && toggleSound(sound.id)}
        disabled={isDisabled}
        className={cn(
          "relative w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200",
          "hover:scale-105 active:scale-95",
          isPlaying
            ? "bg-amber-500/20 text-amber-400"
            : "bg-stone-700/50 text-stone-400 hover:text-stone-300",
          isDisabled && "pointer-events-none"
        )}
      >
        {isPlaying ? (
          <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
        ) : (
          <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current ml-0.5" />
        )}
      </button>

      {/* Label */}
      <div className="flex items-center gap-1">
        <Icon
          className="w-3 h-3 sm:w-3.5 sm:h-3.5"
          style={{ color: isPlaying ? sound.color : undefined }}
        />
        <span
          className={cn(
            "text-[10px] sm:text-xs font-medium",
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

"use client";

import { useRoomStore } from "@/stores/useRoomStore";
import { usePremiumStore } from "@/stores/usePremiumStore";
import { ROOM_THEMES } from "@/lib/rooms";
import { PremiumGate } from "@/components/premium/PremiumGate";
import { cn } from "@/lib/utils";
import {
  Lightbulb,
  Flame,
  Sparkles,
  Wind,
  Sun,
  Sunset,
  Moon,
  CloudRain,
  CloudOff,
  Lock,
  Crown,
  Palette,
} from "lucide-react";

const TIME_OPTIONS = [
  { id: "day" as const, label: "Day", icon: Sun, color: "#FFD700" },
  { id: "sunset" as const, label: "Sunset", icon: Sunset, color: "#FF8C00" },
  { id: "night" as const, label: "Night", icon: Moon, color: "#C8C8FF" },
];

const COLOR_PALETTES = [
  { id: "default", name: "Default", wall: "#1a1a2e", floor: "#16213e", accent: "#e2e8f0" },
  { id: "warm", name: "Warm", wall: "#2d1b1b", floor: "#1a0f0f", accent: "#fbbf24" },
  { id: "cool", name: "Cool", wall: "#0f172a", floor: "#1e293b", accent: "#38bdf8" },
  { id: "forest", name: "Forest", wall: "#14261c", floor: "#0d1f15", accent: "#4ade80" },
  { id: "sunset", name: "Sunset", wall: "#2d1a0f", floor: "#1a0f07", accent: "#fb923c" },
  { id: "lavender", name: "Lavender", wall: "#1e1b2e", floor: "#14112a", accent: "#c084fc" },
  { id: "ocean", name: "Ocean", wall: "#0c1929", floor: "#061220", accent: "#22d3ee" },
  { id: "rose", name: "Rose", wall: "#2a1520", floor: "#1a0c14", accent: "#fb7185" },
];

const TIER_CYCLE = ["free", "premium", "premium_plus"] as const;

export function RoomCustomizer() {
  const lightsOn = useRoomStore((s) => s.lightsOn);
  const candleLit = useRoomStore((s) => s.candleLit);
  const fairyLightsOn = useRoomStore((s) => s.fairyLightsOn);
  const particlesEnabled = useRoomStore((s) => s.particlesEnabled);
  const rainIntensity = useRoomStore((s) => s.rainIntensity);
  const timeOfDay = useRoomStore((s) => s.timeOfDay);
  const currentTheme = useRoomStore((s) => s.currentTheme);
  const colorPaletteId = useRoomStore((s) => s.colorPaletteId);
  const toggleLights = useRoomStore((s) => s.toggleLights);
  const toggleCandle = useRoomStore((s) => s.toggleCandle);
  const toggleFairyLights = useRoomStore((s) => s.toggleFairyLights);
  const toggleParticles = useRoomStore((s) => s.toggleParticles);
  const toggleRain = useRoomStore((s) => s.toggleRain);
  const setRainIntensity = useRoomStore((s) => s.setRainIntensity);
  const setTimeOfDay = useRoomStore((s) => s.setTimeOfDay);
  const setTheme = useRoomStore((s) => s.setTheme);
  const setColorPalette = useRoomStore((s) => s.setColorPalette);

  const tier = usePremiumStore((s) => s.tier);
  const setTier = usePremiumStore((s) => s.setTier);
  const isPremium = tier === "premium" || tier === "premium_plus";

  const isRaining = rainIntensity > 0;

  const toggles = [
    { id: "lamp", label: "Desk Lamp", icon: Lightbulb, active: lightsOn, toggle: toggleLights, color: "#FFD700" },
    { id: "candle", label: "Candle", icon: Flame, active: candleLit, toggle: toggleCandle, color: "#FF9933" },
    { id: "fairy", label: "Fairy Lights", icon: Sparkles, active: fairyLightsOn, toggle: toggleFairyLights, color: "#FFCC33" },
    { id: "dust", label: "Dust", icon: Wind, active: particlesEnabled, toggle: toggleParticles, color: "#D4A868" },
  ];

  const handleThemeClick = (themeId: string, themeTier: "free" | "premium") => {
    if (themeTier === "premium" && !isPremium) return;
    setTheme(themeId);
  };

  const handlePaletteClick = (paletteId: string) => {
    if (!isPremium) return;
    setColorPalette(colorPaletteId === paletteId ? null : paletteId);
  };

  const cycleTier = () => {
    const idx = TIER_CYCLE.indexOf(tier);
    const next = TIER_CYCLE[(idx + 1) % TIER_CYCLE.length];
    setTier(next);
  };

  return (
    <div className="space-y-4">
      {/* Room Theme */}
      <div>
        <p className="text-[10px] uppercase tracking-wider text-stone-500 mb-2 px-1">
          Room Theme
        </p>
        <div className="grid grid-cols-4 gap-2">
          {ROOM_THEMES.map((theme) => {
            const isActive = currentTheme === theme.id;
            const isLocked = theme.tier === "premium" && !isPremium;
            return (
              <button
                key={theme.id}
                onClick={() => handleThemeClick(theme.id, theme.tier)}
                className={cn(
                  "relative flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300",
                  "border border-stone-700/30",
                  isActive && "border-amber-500/50 ring-1 ring-amber-500/30",
                  isLocked ? "cursor-not-allowed" : "hover:border-stone-600/50"
                )}
                style={{ background: theme.previewGradient }}
              >
                {isLocked && (
                  <div className="absolute inset-0 bg-stone-900/60 rounded-xl flex items-center justify-center">
                    <Lock className="w-3.5 h-3.5 text-stone-400" />
                  </div>
                )}
                <span className="text-lg leading-none">{theme.previewEmoji}</span>
                <span
                  className={cn(
                    "text-[9px] font-medium truncate w-full text-center",
                    isActive ? "text-amber-300" : "text-stone-300"
                  )}
                >
                  {theme.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Color Palette */}
      <div>
        <div className="flex items-center gap-2 mb-2 px-1">
          <p className="text-[10px] uppercase tracking-wider text-stone-500">
            Color Palette
          </p>
          {!isPremium && (
            <span className="inline-flex items-center gap-0.5 text-[9px] text-amber-500/60">
              <Crown className="w-2.5 h-2.5" />
              Premium
            </span>
          )}
        </div>
        <PremiumGate>
          <div className="flex gap-2 flex-wrap">
            {COLOR_PALETTES.map((palette) => {
              const isActive = colorPaletteId === palette.id;
              return (
                <button
                  key={palette.id}
                  onClick={() => handlePaletteClick(palette.id)}
                  title={palette.name}
                  className={cn(
                    "w-8 h-8 rounded-lg border-2 transition-all duration-200 flex items-center justify-center",
                    isActive
                      ? "border-amber-500 ring-1 ring-amber-500/30 scale-110"
                      : "border-stone-700/50 hover:border-stone-500/50"
                  )}
                  style={{ background: palette.wall }}
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ background: palette.accent }}
                  />
                </button>
              );
            })}
          </div>
        </PremiumGate>
      </div>

      {/* Time of Day */}
      <div>
        <p className="text-[10px] uppercase tracking-wider text-stone-500 mb-2 px-1">
          Time of Day
        </p>
        <div className="flex gap-2">
          {TIME_OPTIONS.map((time) => {
            const Icon = time.icon;
            const isActive = timeOfDay === time.id;
            return (
              <button
                key={time.id}
                onClick={() => setTimeOfDay(time.id)}
                className={cn(
                  "flex-1 flex flex-col items-center gap-1.5 py-2.5 rounded-xl transition-all duration-300",
                  "bg-stone-800/50 border border-stone-700/30",
                  isActive && "border-amber-500/30 bg-stone-800/80"
                )}
              >
                <Icon
                  className="w-5 h-5"
                  style={{ color: isActive ? time.color : undefined }}
                />
                <span
                  className={cn(
                    "text-[10px] font-medium",
                    isActive ? "text-stone-200" : "text-stone-400"
                  )}
                >
                  {time.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Weather */}
      <div>
        <p className="text-[10px] uppercase tracking-wider text-stone-500 mb-2 px-1">
          Weather
        </p>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleRain}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300",
              "bg-stone-800/50 border border-stone-700/30",
              isRaining && "border-blue-500/30 bg-stone-800/80"
            )}
          >
            {isRaining ? (
              <CloudRain className="w-4 h-4 text-blue-400" />
            ) : (
              <CloudOff className="w-4 h-4 text-stone-400" />
            )}
            <span
              className={cn(
                "text-xs font-medium",
                isRaining ? "text-stone-200" : "text-stone-400"
              )}
            >
              Rain
            </span>
          </button>
          {isRaining && (
            <input
              type="range"
              min={0.1}
              max={1}
              step={0.05}
              value={rainIntensity}
              onChange={(e) => setRainIntensity(parseFloat(e.target.value))}
              className="flex-1 h-1 rounded-full appearance-none cursor-pointer bg-stone-700 accent-blue-400 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-400"
            />
          )}
        </div>
      </div>

      {/* Decorations */}
      <div>
        <p className="text-[10px] uppercase tracking-wider text-stone-500 mb-2 px-1">
          Decorations
        </p>
        <div className="grid grid-cols-4 gap-2">
          {toggles.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={item.toggle}
                className={cn(
                  "flex flex-col items-center gap-1.5 p-2 sm:p-3 rounded-xl transition-all duration-300",
                  "bg-stone-800/50 border border-stone-700/30",
                  item.active && "border-amber-500/30 bg-stone-800/80"
                )}
              >
                <div
                  className={cn(
                    "w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all",
                    item.active
                      ? "bg-amber-500/20"
                      : "bg-stone-700/50"
                  )}
                >
                  <Icon
                    className="w-4 h-4"
                    style={{ color: item.active ? item.color : "#78716c" }}
                  />
                </div>
                <span
                  className={cn(
                    "text-[10px] sm:text-xs font-medium",
                    item.active ? "text-stone-200" : "text-stone-400"
                  )}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dev: Premium Toggle */}
      <div className="pt-2 border-t border-stone-800/50">
        <button
          onClick={cycleTier}
          className="text-[9px] text-stone-600 hover:text-stone-400 transition-colors px-1"
        >
          Dev: {tier}
        </button>
      </div>
    </div>
  );
}

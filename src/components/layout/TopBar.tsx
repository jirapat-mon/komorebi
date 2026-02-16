"use client";

import { Flame, Volume2, VolumeX, LogIn, Sun, Sunset, Moon, CloudRain, CloudOff } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useTimerStore } from "@/stores/useTimerStore";
import { useSoundStore } from "@/stores/useSoundStore";
import { useRoomStore } from "@/stores/useRoomStore";
import { cn } from "@/lib/utils";

const TIME_ICONS = {
  day: Sun,
  sunset: Sunset,
  night: Moon,
};

const TIME_LABELS = {
  day: "Day",
  sunset: "Sunset",
  night: "Night",
};

export default function TopBar() {
  const { data: session } = useSession();
  const { mode, timeLeft, isRunning } = useTimerStore();
  const isMuted = useSoundStore((s) => s.isMuted);
  const toggleMute = useSoundStore((s) => s.toggleMute);
  const timeOfDay = useRoomStore((s) => s.timeOfDay);
  const cycleTimeOfDay = useRoomStore((s) => s.cycleTimeOfDay);
  const rainIntensity = useRoomStore((s) => s.rainIntensity);
  const toggleRain = useRoomStore((s) => s.toggleRain);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeDisplay = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  const TimeIcon = TIME_ICONS[timeOfDay];
  const isRaining = rainIntensity > 0;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-12 sm:h-14 flex items-center justify-between px-3 sm:px-4 bg-stone-950/60 backdrop-blur-md border-b border-stone-800/50">
      {/* Left: Logo */}
      <Link href="/" className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
        <span className="text-xs sm:text-sm font-semibold font-[family-name:var(--font-heading)] text-stone-200 hidden sm:inline">
          Komorebi
        </span>
      </Link>

      {/* Center: Timer + controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Day/Night toggle */}
        <button
          onClick={cycleTimeOfDay}
          className="p-1.5 sm:p-2 rounded-lg text-stone-400 hover:text-stone-200 hover:bg-stone-800/50 transition-colors"
          aria-label={`Time: ${TIME_LABELS[timeOfDay]}`}
          title={TIME_LABELS[timeOfDay]}
        >
          <TimeIcon className="w-4 h-4" />
        </button>

        {/* Rain toggle */}
        <button
          onClick={toggleRain}
          className={cn(
            "p-1.5 sm:p-2 rounded-lg transition-colors",
            isRaining
              ? "text-blue-400 bg-blue-500/10 hover:bg-blue-500/20"
              : "text-stone-400 hover:text-stone-200 hover:bg-stone-800/50"
          )}
          aria-label={isRaining ? "Stop rain" : "Start rain"}
          title={isRaining ? "Rain On" : "Rain Off"}
        >
          {isRaining ? (
            <CloudRain className="w-4 h-4" />
          ) : (
            <CloudOff className="w-4 h-4" />
          )}
        </button>

        {/* Timer indicator */}
        <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 rounded-lg bg-stone-800/40">
          <div
            className={cn(
              "w-1.5 h-1.5 rounded-full",
              isRunning
                ? mode === "work"
                  ? "bg-amber-500 animate-pulse"
                  : "bg-green-500 animate-pulse"
                : "bg-stone-600"
            )}
          />
          <span className="text-xs sm:text-sm font-[family-name:var(--font-mono)] text-stone-300 tabular-nums">
            {timeDisplay}
          </span>
          <span className="text-[10px] sm:text-xs text-stone-500 uppercase hidden sm:inline">
            {mode === "work" ? "Focus" : "Break"}
          </span>
        </div>
      </div>

      {/* Right: Sound toggle + avatar */}
      <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
        <button
          onClick={toggleMute}
          className="p-1.5 sm:p-2 text-stone-400 hover:text-stone-200 transition-colors"
          aria-label={isMuted ? "Unmute sounds" : "Mute sounds"}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4" />
          ) : (
            <Volume2 className="w-4 h-4" />
          )}
        </button>

        {session?.user ? (
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full overflow-hidden border border-stone-700">
            {session.user.image ? (
              <img
                src={session.user.image}
                alt={session.user.name || "User"}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-stone-800 flex items-center justify-center text-xs text-stone-400">
                {session.user.name?.[0] || "?"}
              </div>
            )}
          </div>
        ) : (
          <Link
            href="/login"
            className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-stone-200 transition-colors"
          >
            <LogIn className="w-4 h-4" />
            <span className="hidden sm:inline">Sign in</span>
          </Link>
        )}
      </div>
    </header>
  );
}

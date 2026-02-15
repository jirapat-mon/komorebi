"use client";

import { Flame, Volume2, VolumeX, LogIn } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { useTimerStore } from "@/stores/useTimerStore";
import { cn } from "@/lib/utils";

export default function TopBar() {
  const { data: session } = useSession();
  const { mode, timeLeft, isRunning } = useTimerStore();
  const [soundEnabled, setSoundEnabled] = useState(true);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeDisplay = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-4 bg-stone-950/60 backdrop-blur-md border-b border-stone-800/50">
      {/* Left: Logo */}
      <Link href="/" className="flex items-center gap-2">
        <Flame className="w-5 h-5 text-amber-500" />
        <span className="text-sm font-semibold font-[family-name:var(--font-heading)] text-stone-200">
          Komorebi
        </span>
      </Link>

      {/* Center: Compact timer */}
      <div className="flex items-center gap-2">
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
        <span className="text-sm font-[family-name:var(--font-mono)] text-stone-300 tabular-nums">
          {timeDisplay}
        </span>
        <span className="text-xs text-stone-500 uppercase">
          {mode === "work" ? "Focus" : "Break"}
        </span>
      </div>

      {/* Right: Sound toggle + avatar */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="p-2 text-stone-400 hover:text-stone-200 transition-colors"
          aria-label={soundEnabled ? "Mute sounds" : "Unmute sounds"}
        >
          {soundEnabled ? (
            <Volume2 className="w-4 h-4" />
          ) : (
            <VolumeX className="w-4 h-4" />
          )}
        </button>

        {session?.user ? (
          <div className="w-7 h-7 rounded-full overflow-hidden border border-stone-700">
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

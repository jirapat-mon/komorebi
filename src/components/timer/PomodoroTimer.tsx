"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  Flame,
  ChevronDown,
  Clock,
  Timer,
  Zap,
  Trophy,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTimerStore } from "@/stores/useTimerStore";
import { cn } from "@/lib/utils";
import type { TimerPreset } from "@/types/timer";

const RADIUS = 90;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const PRESET_OPTIONS: { id: TimerPreset; label: string; desc: string }[] = [
  { id: "classic", label: "Classic", desc: "25/5" },
  { id: "long", label: "Long", desc: "50/10" },
  { id: "custom", label: "Custom", desc: "" },
  { id: "stopwatch", label: "Stopwatch", desc: "" },
];

const PRESET_WORK_SECONDS: Record<string, number> = {
  classic: 25 * 60,
  long: 50 * 60,
};

function formatTime(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  if (h > 0) {
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function formatMinutesToHM(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h > 0 && m > 0) return `${h}h ${m}m`;
  if (h > 0) return `${h}h`;
  return `${m}m`;
}

export default function PomodoroTimer() {
  const {
    preset,
    mode,
    timeLeft,
    stopwatchTime,
    isRunning,
    sessionsCompleted,
    todayMinutes,
    autoStart,
    customWork,
    customBreak,
    stats,
    start,
    pause,
    reset,
    tick,
    switchMode,
    setPreset,
    setCustomDurations,
    toggleAutoStart,
    getWeekMinutes,
    getMonthMinutes,
  } = useTimerStore();

  const [showStats, setShowStats] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const prevTimeLeftRef = useRef(timeLeft);

  const requestNotificationPermission = useCallback(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  const sendNotification = useCallback((message: string) => {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("Komorebi", { body: message });
    }
  }, []);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(tick, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, tick]);

  // Detect session completion (timeLeft jumps up = mode switched)
  useEffect(() => {
    if (preset === "stopwatch") return;
    if (prevTimeLeftRef.current <= 1 && timeLeft > 60) {
      if (mode === "break" || mode === "longBreak") {
        sendNotification("Focus session complete! Time for a break.");
      } else {
        sendNotification("Break is over! Ready to focus?");
      }
    }
    prevTimeLeftRef.current = timeLeft;
  }, [timeLeft, mode, preset, sendNotification]);

  const handleStart = () => {
    requestNotificationPermission();
    start();
  };

  // Calculate progress for circular indicator
  const isStopwatch = preset === "stopwatch";

  let totalDuration: number;
  if (isStopwatch) {
    totalDuration = 60 * 60; // 1 hour cycle for visual
  } else if (mode === "work") {
    totalDuration =
      preset === "custom"
        ? customWork * 60
        : (PRESET_WORK_SECONDS[preset] ?? 25 * 60);
  } else if (mode === "longBreak") {
    totalDuration = 15 * 60;
  } else {
    totalDuration =
      preset === "custom"
        ? customBreak * 60
        : preset === "long"
          ? 10 * 60
          : 5 * 60;
  }

  const progress = isStopwatch
    ? (stopwatchTime % 3600) / 3600
    : totalDuration > 0
      ? timeLeft / totalDuration
      : 0;
  const dashoffset = isStopwatch
    ? CIRCUMFERENCE * (1 - progress)
    : CIRCUMFERENCE * (1 - progress);

  const displaySeconds = isStopwatch ? stopwatchTime : timeLeft;
  const timeDisplay = formatTime(displaySeconds);

  const modeLabel =
    mode === "work" ? "Focus" : mode === "longBreak" ? "Long Break" : "Break";
  const isBreak = mode === "break" || mode === "longBreak";
  const strokeColor = isBreak ? "#22c55e" : "#f59e0b";
  const trackColor = "rgba(255,255,255,0.08)";

  const sessionDots = Array.from({ length: 4 }, (_, i) => i);

  const weekMinutes = getWeekMinutes();
  const monthMinutes = getMonthMinutes();

  return (
    <div className="flex flex-col items-center gap-3 py-2">
      {/* Preset selector */}
      <div className="flex items-center gap-1.5">
        {PRESET_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            onClick={() => setPreset(opt.id)}
            className={cn(
              "px-3 py-1 rounded-full text-xs font-medium transition-colors",
              preset === opt.id
                ? "bg-amber-500/20 text-amber-400 ring-1 ring-amber-500/30"
                : "text-stone-500 hover:text-stone-300 hover:bg-stone-800/50",
            )}
          >
            {opt.label}
            {opt.desc && (
              <span className="ml-1 opacity-60">({opt.desc})</span>
            )}
          </button>
        ))}
      </div>

      {/* Custom duration inputs */}
      <AnimatePresence>
        {preset === "custom" && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="flex items-center gap-4 px-3 py-2 rounded-lg bg-stone-800/30 border border-stone-800/50">
              <label className="flex items-center gap-2 text-xs text-stone-400">
                <Timer className="w-3.5 h-3.5" />
                Work
                <input
                  type="number"
                  min={1}
                  max={120}
                  value={customWork}
                  onChange={(e) => {
                    const v = Math.max(1, Math.min(120, Number(e.target.value) || 1));
                    setCustomDurations(v, customBreak);
                  }}
                  className="w-14 px-2 py-0.5 rounded bg-stone-900 border border-stone-700 text-stone-200 text-xs text-center focus:outline-none focus:ring-1 focus:ring-amber-500/50"
                />
                <span className="text-stone-500">min</span>
              </label>
              <label className="flex items-center gap-2 text-xs text-stone-400">
                <Clock className="w-3.5 h-3.5" />
                Break
                <input
                  type="number"
                  min={1}
                  max={60}
                  value={customBreak}
                  onChange={(e) => {
                    const v = Math.max(1, Math.min(60, Number(e.target.value) || 1));
                    setCustomDurations(customWork, v);
                  }}
                  className="w-14 px-2 py-0.5 rounded bg-stone-900 border border-stone-700 text-stone-200 text-xs text-center focus:outline-none focus:ring-1 focus:ring-amber-500/50"
                />
                <span className="text-stone-500">min</span>
              </label>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Circular progress */}
      <div className="relative w-[200px] h-[200px]">
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          className="-rotate-90"
        >
          <circle
            cx="100"
            cy="100"
            r={RADIUS}
            fill="none"
            stroke={trackColor}
            strokeWidth="6"
          />
          <circle
            cx="100"
            cy="100"
            r={RADIUS}
            fill="none"
            stroke={strokeColor}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={dashoffset}
            className="transition-[stroke-dashoffset] duration-1000 ease-linear"
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xs uppercase tracking-widest text-stone-400 mb-1">
            {isStopwatch ? "Stopwatch" : modeLabel}
          </span>
          <span className="text-4xl font-[family-name:var(--font-mono)] text-stone-50 tabular-nums">
            {timeDisplay}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={reset}
          className="p-2 rounded-full text-stone-400 hover:text-stone-200 hover:bg-stone-800 transition-colors"
          aria-label="Reset timer"
        >
          <RotateCcw className="w-5 h-5" />
        </button>

        <button
          onClick={isRunning ? pause : handleStart}
          className={cn(
            "p-4 rounded-full transition-colors",
            isBreak
              ? "bg-green-500 hover:bg-green-400 text-stone-950"
              : "bg-amber-500 hover:bg-amber-400 text-stone-950",
          )}
          aria-label={isRunning ? "Pause timer" : "Start timer"}
        >
          {isRunning ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6 ml-0.5" />
          )}
        </button>

        {!isStopwatch && (
          <button
            onClick={switchMode}
            className="p-2 rounded-full text-stone-400 hover:text-stone-200 hover:bg-stone-800 transition-colors"
            aria-label="Skip to next mode"
          >
            <SkipForward className="w-5 h-5" />
          </button>
        )}

        {isStopwatch && <div className="w-9" />}
      </div>

      {/* Auto-start toggle */}
      <button
        onClick={toggleAutoStart}
        className={cn(
          "flex items-center gap-2 text-xs transition-colors",
          autoStart ? "text-amber-400" : "text-stone-500 hover:text-stone-400",
        )}
      >
        <Zap className="w-3.5 h-3.5" />
        Auto-start
        <div
          className={cn(
            "w-7 h-4 rounded-full relative transition-colors",
            autoStart ? "bg-amber-500/30" : "bg-stone-700",
          )}
        >
          <div
            className={cn(
              "absolute top-0.5 w-3 h-3 rounded-full transition-all",
              autoStart
                ? "left-3.5 bg-amber-400"
                : "left-0.5 bg-stone-500",
            )}
          />
        </div>
      </button>

      {/* Session & streak info */}
      {!isStopwatch && (
        <div className="flex items-center gap-3 text-xs text-stone-500">
          {/* Session dots */}
          <div className="flex items-center gap-1.5">
            <span>Session</span>
            {sessionDots.map((i) => (
              <div
                key={i}
                className={cn(
                  "w-2 h-2 rounded-full transition-colors",
                  i < sessionsCompleted % 4
                    ? "bg-amber-500"
                    : "bg-stone-700",
                )}
              />
            ))}
          </div>

          <span className="w-1 h-1 rounded-full bg-stone-700" />

          {/* Streak */}
          {stats.streak > 0 && (
            <>
              <span className="flex items-center gap-1 text-amber-400/80">
                <Flame className="w-3.5 h-3.5" />
                {stats.streak}d streak
              </span>
              <span className="w-1 h-1 rounded-full bg-stone-700" />
            </>
          )}

          {/* Today */}
          <span>{todayMinutes > 0 ? formatMinutesToHM(todayMinutes) : "0m"} today</span>
        </div>
      )}

      {/* Expandable stats section */}
      <button
        onClick={() => setShowStats(!showStats)}
        className="flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-400 transition-colors mt-1"
      >
        <Trophy className="w-3.5 h-3.5" />
        Focus Stats
        <ChevronDown
          className={cn(
            "w-3.5 h-3.5 transition-transform",
            showStats && "rotate-180",
          )}
        />
      </button>

      <AnimatePresence>
        {showStats && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden w-full"
          >
            <div className="grid grid-cols-2 gap-2 px-2 py-2 rounded-lg bg-stone-800/20 border border-stone-800/40 text-xs">
              <div className="flex flex-col items-center gap-0.5 p-2 rounded-md bg-stone-800/30">
                <span className="text-stone-500">This Week</span>
                <span className="text-stone-200 font-medium">
                  {formatMinutesToHM(weekMinutes)}
                </span>
              </div>
              <div className="flex flex-col items-center gap-0.5 p-2 rounded-md bg-stone-800/30">
                <span className="text-stone-500">This Month</span>
                <span className="text-stone-200 font-medium">
                  {formatMinutesToHM(monthMinutes)}
                </span>
              </div>
              <div className="flex flex-col items-center gap-0.5 p-2 rounded-md bg-stone-800/30">
                <span className="text-stone-500">Total Sessions</span>
                <span className="text-stone-200 font-medium">
                  {stats.totalSessions}
                </span>
              </div>
              <div className="flex flex-col items-center gap-0.5 p-2 rounded-md bg-stone-800/30">
                <span className="text-stone-500">Total Focus</span>
                <span className="text-stone-200 font-medium">
                  {formatMinutesToHM(stats.totalMinutes)}
                </span>
              </div>
              {stats.longestStreak > 0 && (
                <div className="col-span-2 flex flex-col items-center gap-0.5 p-2 rounded-md bg-stone-800/30">
                  <span className="text-stone-500">Longest Streak</span>
                  <span className="text-amber-400 font-medium flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5" />
                    {stats.longestStreak} days
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

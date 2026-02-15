"use client";

import { useEffect, useRef, useCallback } from "react";
import { Play, Pause, RotateCcw, SkipForward } from "lucide-react";
import { useTimerStore } from "@/stores/useTimerStore";
import { cn } from "@/lib/utils";

const RADIUS = 90;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const WORK_DURATION = 25 * 60;
const BREAK_DURATION = 5 * 60;

export default function PomodoroTimer() {
  const {
    mode,
    timeLeft,
    isRunning,
    sessionsCompleted,
    todayMinutes,
    start,
    pause,
    reset,
    tick,
    switchMode,
  } = useTimerStore();

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
    if (prevTimeLeftRef.current <= 1 && timeLeft > 60) {
      if (mode === "break") {
        sendNotification("Focus session complete! Time for a break.");
      } else {
        sendNotification("Break is over! Ready to focus?");
      }
    }
    prevTimeLeftRef.current = timeLeft;
  }, [timeLeft, mode, sendNotification]);

  const handleStart = () => {
    requestNotificationPermission();
    start();
  };

  const totalDuration = mode === "work" ? WORK_DURATION : BREAK_DURATION;
  const progress = timeLeft / totalDuration;
  const dashoffset = CIRCUMFERENCE * (1 - progress);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeDisplay = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  const strokeColor = mode === "work" ? "#f59e0b" : "#22c55e";
  const trackColor = "rgba(255,255,255,0.08)";

  return (
    <div className="flex flex-col items-center gap-4 py-2">
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
            {mode === "work" ? "Focus" : "Break"}
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
            mode === "work"
              ? "bg-amber-500 hover:bg-amber-400 text-stone-950"
              : "bg-green-500 hover:bg-green-400 text-stone-950"
          )}
          aria-label={isRunning ? "Pause timer" : "Start timer"}
        >
          {isRunning ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6 ml-0.5" />
          )}
        </button>

        <button
          onClick={switchMode}
          className="p-2 rounded-full text-stone-400 hover:text-stone-200 hover:bg-stone-800 transition-colors"
          aria-label="Skip to next mode"
        >
          <SkipForward className="w-5 h-5" />
        </button>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 text-xs text-stone-500">
        <span>Session {sessionsCompleted % 4 + 1}/4</span>
        <span className="w-1 h-1 rounded-full bg-stone-700" />
        <span>{todayMinutes} min focused today</span>
      </div>
    </div>
  );
}

"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { TimerMode, TimerPreset, FocusStats } from "@/types/timer";

const PRESET_DURATIONS: Record<
  Exclude<TimerPreset, "custom" | "stopwatch">,
  { work: number; break: number }
> = {
  classic: { work: 25 * 60, break: 5 * 60 },
  long: { work: 50 * 60, break: 10 * 60 },
};

function getTodayDate() {
  return new Date().toISOString().split("T")[0];
}

function getYesterdayDate() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split("T")[0];
}

function getWeekDates(): string[] {
  const dates: string[] = [];
  const now = new Date();
  const day = now.getDay();
  const monday = new Date(now);
  monday.setDate(now.getDate() - ((day + 6) % 7));
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    dates.push(d.toISOString().split("T")[0]);
  }
  return dates;
}

function getMonthDates(): string[] {
  const dates: string[] = [];
  const now = new Date();
  const first = new Date(now.getFullYear(), now.getMonth(), 1);
  const last = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  for (let d = new Date(first); d <= last; d.setDate(d.getDate() + 1)) {
    dates.push(d.toISOString().split("T")[0]);
  }
  return dates;
}

interface TimerStoreState {
  // Timer state
  preset: TimerPreset;
  mode: TimerMode;
  timeLeft: number;
  stopwatchTime: number;
  isRunning: boolean;
  sessionsCompleted: number;
  autoStart: boolean;

  // Custom preset durations (in minutes for UI, stored as minutes)
  customWork: number;
  customBreak: number;

  // Persistence helpers
  todayMinutes: number;
  lastDate: string;

  // Focus stats
  stats: FocusStats;

  // Actions
  start: () => void;
  pause: () => void;
  reset: () => void;
  tick: () => void;
  switchMode: () => void;
  completeSession: () => void;
  setPreset: (preset: TimerPreset) => void;
  setCustomDurations: (work: number, breakMin: number) => void;
  toggleAutoStart: () => void;
  getWeekMinutes: () => number;
  getMonthMinutes: () => number;
}

function getWorkDuration(preset: TimerPreset, customWork: number): number {
  if (preset === "custom") return customWork * 60;
  if (preset === "stopwatch") return 0;
  return PRESET_DURATIONS[preset].work;
}

function getBreakDuration(
  preset: TimerPreset,
  customBreak: number,
  isLongBreak: boolean,
  longBreakDuration: number,
): number {
  if (isLongBreak) return longBreakDuration;
  if (preset === "custom") return customBreak * 60;
  if (preset === "stopwatch") return 5 * 60;
  return PRESET_DURATIONS[preset].break;
}

const LONG_BREAK_DURATION = 15 * 60; // 15 min default
const LONG_BREAK_INTERVAL = 4;

function updateStreak(stats: FocusStats, today: string): FocusStats {
  const yesterday = getYesterdayDate();
  if (stats.lastActiveDate === today) {
    return stats;
  }
  if (stats.lastActiveDate === yesterday) {
    const newStreak = stats.streak + 1;
    return {
      ...stats,
      streak: newStreak,
      longestStreak: Math.max(stats.longestStreak, newStreak),
      lastActiveDate: today,
    };
  }
  // Streak broken
  return {
    ...stats,
    streak: 1,
    longestStreak: Math.max(stats.longestStreak, 1),
    lastActiveDate: today,
  };
}

const defaultStats: FocusStats = {
  daily: {},
  streak: 0,
  longestStreak: 0,
  lastActiveDate: "",
  totalSessions: 0,
  totalMinutes: 0,
};

export const useTimerStore = create<TimerStoreState>()(
  persist(
    (set, get) => ({
      preset: "classic",
      mode: "work",
      timeLeft: PRESET_DURATIONS.classic.work,
      stopwatchTime: 0,
      isRunning: false,
      sessionsCompleted: 0,
      autoStart: false,
      customWork: 30,
      customBreak: 10,
      todayMinutes: 0,
      lastDate: getTodayDate(),
      stats: { ...defaultStats },

      start: () => {
        const state = get();
        const today = getTodayDate();
        // Reset daily counter if new day
        if (state.lastDate !== today) {
          set({
            todayMinutes: 0,
            sessionsCompleted: 0,
            lastDate: today,
          });
        }
        set({ isRunning: true });
      },

      pause: () => set({ isRunning: false }),

      reset: () => {
        const state = get();
        if (state.preset === "stopwatch") {
          set({ stopwatchTime: 0, isRunning: false });
          return;
        }
        const workDur = getWorkDuration(state.preset, state.customWork);
        const isLong =
          state.mode === "longBreak" ||
          (state.mode !== "work" &&
            state.sessionsCompleted % LONG_BREAK_INTERVAL === 0 &&
            state.sessionsCompleted > 0);
        const breakDur = getBreakDuration(
          state.preset,
          state.customBreak,
          isLong,
          LONG_BREAK_DURATION,
        );
        set({
          timeLeft: state.mode === "work" ? workDur : breakDur,
          isRunning: false,
        });
      },

      tick: () => {
        const state = get();
        if (!state.isRunning) return;

        if (state.preset === "stopwatch") {
          set({ stopwatchTime: state.stopwatchTime + 1 });
          return;
        }

        if (state.timeLeft <= 0) return;
        const newTimeLeft = state.timeLeft - 1;
        if (newTimeLeft <= 0) {
          get().completeSession();
        } else {
          set({ timeLeft: newTimeLeft });
        }
      },

      switchMode: () => {
        const state = get();
        if (state.preset === "stopwatch") return;

        let newMode: TimerMode;
        if (state.mode === "work") {
          const nextSessions = state.sessionsCompleted + 1;
          newMode =
            nextSessions % LONG_BREAK_INTERVAL === 0 && nextSessions > 0
              ? "longBreak"
              : "break";
        } else {
          newMode = "work";
        }

        const workDur = getWorkDuration(state.preset, state.customWork);
        const breakDur = getBreakDuration(
          state.preset,
          state.customBreak,
          newMode === "longBreak",
          LONG_BREAK_DURATION,
        );

        set({
          mode: newMode,
          timeLeft: newMode === "work" ? workDur : breakDur,
          isRunning: false,
        });
      },

      completeSession: () => {
        const state = get();
        const wasWork = state.mode === "work";
        const today = getTodayDate();
        const workMinutes = wasWork
          ? Math.round(
              getWorkDuration(state.preset, state.customWork) / 60,
            )
          : 0;

        let newMode: TimerMode;
        if (wasWork) {
          const nextSessions = state.sessionsCompleted + 1;
          newMode =
            nextSessions % LONG_BREAK_INTERVAL === 0
              ? "longBreak"
              : "break";
        } else {
          newMode = "work";
        }

        const workDur = getWorkDuration(state.preset, state.customWork);
        const breakDur = getBreakDuration(
          state.preset,
          state.customBreak,
          newMode === "longBreak",
          LONG_BREAK_DURATION,
        );

        // Update stats
        let newStats = { ...state.stats };
        if (wasWork) {
          newStats = updateStreak(newStats, today);
          newStats.daily = { ...newStats.daily };
          newStats.daily[today] = (newStats.daily[today] || 0) + workMinutes;
          newStats.totalSessions += 1;
          newStats.totalMinutes += workMinutes;
        }

        set({
          mode: newMode,
          timeLeft: newMode === "work" ? workDur : breakDur,
          isRunning: wasWork ? false : state.autoStart,
          sessionsCompleted: wasWork
            ? state.sessionsCompleted + 1
            : state.sessionsCompleted,
          todayMinutes: wasWork
            ? state.todayMinutes + workMinutes
            : state.todayMinutes,
          stats: newStats,
        });

        // Auto-start next session if enabled
        if (state.autoStart) {
          set({ isRunning: true });
        }
      },

      setPreset: (preset: TimerPreset) => {
        const state = get();
        if (preset === "stopwatch") {
          set({
            preset,
            mode: "work",
            timeLeft: 0,
            stopwatchTime: 0,
            isRunning: false,
          });
          return;
        }

        const workDur = getWorkDuration(preset, state.customWork);
        set({
          preset,
          mode: "work",
          timeLeft: workDur,
          isRunning: false,
        });
      },

      setCustomDurations: (work: number, breakMin: number) => {
        const state = get();
        const updates: Partial<TimerStoreState> = {
          customWork: work,
          customBreak: breakMin,
        };
        // If currently using custom preset, also update timeLeft
        if (state.preset === "custom" && state.mode === "work" && !state.isRunning) {
          updates.timeLeft = work * 60;
        }
        if (state.preset === "custom" && state.mode !== "work" && !state.isRunning) {
          updates.timeLeft = breakMin * 60;
        }
        set(updates as TimerStoreState);
      },

      toggleAutoStart: () =>
        set((s) => ({ autoStart: !s.autoStart })),

      getWeekMinutes: () => {
        const state = get();
        const dates = getWeekDates();
        return dates.reduce(
          (sum, d) => sum + (state.stats.daily[d] || 0),
          0,
        );
      },

      getMonthMinutes: () => {
        const state = get();
        const dates = getMonthDates();
        return dates.reduce(
          (sum, d) => sum + (state.stats.daily[d] || 0),
          0,
        );
      },
    }),
    {
      name: "komorebi-timer",
      partialize: (state) => ({
        sessionsCompleted: state.sessionsCompleted,
        todayMinutes: state.todayMinutes,
        lastDate: state.lastDate,
        stats: state.stats,
        preset: state.preset,
        customWork: state.customWork,
        customBreak: state.customBreak,
        autoStart: state.autoStart,
      }),
    },
  ),
);

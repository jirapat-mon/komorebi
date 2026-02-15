"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { TimerMode } from "@/types/timer";

const WORK_DURATION = 25 * 60; // 25 minutes
const BREAK_DURATION = 5 * 60; // 5 minutes

interface TimerStoreState {
  mode: TimerMode;
  timeLeft: number;
  isRunning: boolean;
  sessionsCompleted: number;
  todayMinutes: number;
  lastDate: string;
  start: () => void;
  pause: () => void;
  reset: () => void;
  tick: () => void;
  switchMode: () => void;
  completeSession: () => void;
}

function getTodayDate() {
  return new Date().toISOString().split("T")[0];
}

export const useTimerStore = create<TimerStoreState>()(
  persist(
    (set, get) => ({
      mode: "work",
      timeLeft: WORK_DURATION,
      isRunning: false,
      sessionsCompleted: 0,
      todayMinutes: 0,
      lastDate: getTodayDate(),

      start: () => {
        const state = get();
        // Reset daily stats if new day
        if (state.lastDate !== getTodayDate()) {
          set({
            todayMinutes: 0,
            sessionsCompleted: 0,
            lastDate: getTodayDate(),
          });
        }
        set({ isRunning: true });
      },

      pause: () => set({ isRunning: false }),

      reset: () =>
        set((s) => ({
          timeLeft: s.mode === "work" ? WORK_DURATION : BREAK_DURATION,
          isRunning: false,
        })),

      tick: () => {
        const state = get();
        if (!state.isRunning || state.timeLeft <= 0) return;

        const newTimeLeft = state.timeLeft - 1;
        if (newTimeLeft <= 0) {
          get().completeSession();
        } else {
          set({ timeLeft: newTimeLeft });
        }
      },

      switchMode: () =>
        set((s) => {
          const newMode = s.mode === "work" ? "break" : "work";
          return {
            mode: newMode,
            timeLeft: newMode === "work" ? WORK_DURATION : BREAK_DURATION,
            isRunning: false,
          };
        }),

      completeSession: () =>
        set((s) => {
          const wasWork = s.mode === "work";
          const newMode: TimerMode = wasWork ? "break" : "work";
          return {
            mode: newMode,
            timeLeft: newMode === "work" ? WORK_DURATION : BREAK_DURATION,
            isRunning: false,
            sessionsCompleted: wasWork
              ? s.sessionsCompleted + 1
              : s.sessionsCompleted,
            todayMinutes: wasWork ? s.todayMinutes + 25 : s.todayMinutes,
          };
        }),
    }),
    {
      name: "komorebi-timer",
      partialize: (state) => ({
        sessionsCompleted: state.sessionsCompleted,
        todayMinutes: state.todayMinutes,
        lastDate: state.lastDate,
      }),
    }
  )
);

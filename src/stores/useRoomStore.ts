"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { RoomLayout } from "@/types/room";

export type TimeOfDay = "day" | "sunset" | "night";

interface RoomState {
  lightsOn: boolean;
  candleLit: boolean;
  fairyLightsOn: boolean;
  rainIntensity: number; // 0-1
  particlesEnabled: boolean;
  timeOfDay: TimeOfDay;
  currentTheme: string;
  colorPaletteId: string | null;
  savedLayouts: RoomLayout[];
  toggleLights: () => void;
  toggleCandle: () => void;
  toggleFairyLights: () => void;
  setRainIntensity: (intensity: number) => void;
  toggleRain: () => void;
  toggleParticles: () => void;
  setTimeOfDay: (time: TimeOfDay) => void;
  cycleTimeOfDay: () => void;
  setTheme: (themeId: string) => void;
  setColorPalette: (paletteId: string | null) => void;
  saveLayout: (name: string) => boolean;
  loadLayout: (layoutId: string) => void;
  deleteLayout: (layoutId: string) => void;
}

const TIME_CYCLE: TimeOfDay[] = ["day", "sunset", "night"];

export const useRoomStore = create<RoomState>()(
  persist(
    (set, get) => ({
      lightsOn: true,
      candleLit: true,
      fairyLightsOn: true,
      rainIntensity: 0.6,
      particlesEnabled: true,
      timeOfDay: "night" as TimeOfDay,
      currentTheme: "cozy-bedroom",
      colorPaletteId: null,
      savedLayouts: [],
      toggleLights: () => set((s) => ({ lightsOn: !s.lightsOn })),
      toggleCandle: () => set((s) => ({ candleLit: !s.candleLit })),
      toggleFairyLights: () =>
        set((s) => ({ fairyLightsOn: !s.fairyLightsOn })),
      setRainIntensity: (intensity) => set({ rainIntensity: intensity }),
      toggleRain: () =>
        set((s) => ({
          rainIntensity: s.rainIntensity > 0 ? 0 : 0.6,
        })),
      toggleParticles: () =>
        set((s) => ({ particlesEnabled: !s.particlesEnabled })),
      setTimeOfDay: (time) => set({ timeOfDay: time }),
      cycleTimeOfDay: () => {
        const current = get().timeOfDay;
        const idx = TIME_CYCLE.indexOf(current);
        const next = TIME_CYCLE[(idx + 1) % TIME_CYCLE.length];
        set({ timeOfDay: next });
      },
      setTheme: (themeId) => set({ currentTheme: themeId }),
      setColorPalette: (paletteId) => set({ colorPaletteId: paletteId }),
      saveLayout: (name) => {
        const state = get();
        if (state.savedLayouts.length >= 5) return false;
        const layout: RoomLayout = {
          id: crypto.randomUUID(),
          name,
          themeId: state.currentTheme,
          paletteId: state.colorPaletteId ?? undefined,
          savedAt: new Date().toISOString(),
        };
        set({ savedLayouts: [...state.savedLayouts, layout] });
        return true;
      },
      loadLayout: (layoutId) => {
        const layout = get().savedLayouts.find((l) => l.id === layoutId);
        if (!layout) return;
        set({
          currentTheme: layout.themeId,
          colorPaletteId: layout.paletteId ?? null,
        });
      },
      deleteLayout: (layoutId) => {
        set((s) => ({
          savedLayouts: s.savedLayouts.filter((l) => l.id !== layoutId),
        }));
      },
    }),
    { name: "komorebi-room" }
  )
);

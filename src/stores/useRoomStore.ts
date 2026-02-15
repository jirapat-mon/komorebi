"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface RoomState {
  lightsOn: boolean;
  candleLit: boolean;
  fairyLightsOn: boolean;
  rainIntensity: number; // 0-1
  particlesEnabled: boolean;
  toggleLights: () => void;
  toggleCandle: () => void;
  toggleFairyLights: () => void;
  setRainIntensity: (intensity: number) => void;
  toggleParticles: () => void;
}

export const useRoomStore = create<RoomState>()(
  persist(
    (set) => ({
      lightsOn: true,
      candleLit: true,
      fairyLightsOn: true,
      rainIntensity: 0.6,
      particlesEnabled: true,
      toggleLights: () => set((s) => ({ lightsOn: !s.lightsOn })),
      toggleCandle: () => set((s) => ({ candleLit: !s.candleLit })),
      toggleFairyLights: () =>
        set((s) => ({ fairyLightsOn: !s.fairyLightsOn })),
      setRainIntensity: (intensity) => set({ rainIntensity: intensity }),
      toggleParticles: () =>
        set((s) => ({ particlesEnabled: !s.particlesEnabled })),
    }),
    { name: "komorebi-room" }
  )
);

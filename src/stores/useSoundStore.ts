"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { SoundState } from "@/types/sound";

const MAX_ACTIVE_SOUNDS = 2;

interface SoundStoreState {
  sounds: Record<string, SoundState>;
  masterVolume: number;
  isMuted: boolean;
  toggleSound: (id: string) => void;
  setVolume: (id: string, volume: number) => void;
  setMasterVolume: (volume: number) => void;
  toggleMute: () => void;
  stopAll: () => void;
  getActiveSounds: () => SoundState[];
}

export const useSoundStore = create<SoundStoreState>()(
  persist(
    (set, get) => ({
      sounds: {},
      masterVolume: 0.7,
      isMuted: false,

      toggleSound: (id) =>
        set((state) => {
          const current = state.sounds[id];
          const isCurrentlyPlaying = current?.playing ?? false;

          if (!isCurrentlyPlaying) {
            const activeSounds = Object.values(state.sounds).filter(
              (s) => s.playing
            );
            if (activeSounds.length >= MAX_ACTIVE_SOUNDS) {
              return state; // Don't allow more than 2 active sounds
            }
          }

          return {
            sounds: {
              ...state.sounds,
              [id]: {
                id,
                playing: !isCurrentlyPlaying,
                volume: current?.volume ?? 0.5,
              },
            },
          };
        }),

      setVolume: (id, volume) =>
        set((state) => ({
          sounds: {
            ...state.sounds,
            [id]: {
              ...state.sounds[id],
              id,
              volume,
              playing: state.sounds[id]?.playing ?? false,
            },
          },
        })),

      setMasterVolume: (volume) => set({ masterVolume: volume }),

      toggleMute: () => set((s) => ({ isMuted: !s.isMuted })),

      stopAll: () =>
        set((state) => ({
          sounds: Object.fromEntries(
            Object.entries(state.sounds).map(([id, s]) => [
              id,
              { ...s, playing: false },
            ])
          ),
        })),

      getActiveSounds: () =>
        Object.values(get().sounds).filter((s) => s.playing),
    }),
    { name: "komorebi-sounds" }
  )
);

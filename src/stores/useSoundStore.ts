"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { SoundCategory, SoundState, SoundMixPreset } from "@/types/sound";

// Free tier: max 3 active sounds. Premium will be unlimited.
const MAX_ACTIVE_SOUNDS = 3;
const MAX_PRESETS = 5;

interface SoundStoreState {
  sounds: Record<string, SoundState>;
  masterVolume: number;
  isMuted: boolean;
  activeCategory: SoundCategory | "all";
  presets: SoundMixPreset[];

  toggleSound: (id: string) => void;
  setVolume: (id: string, volume: number) => void;
  setMasterVolume: (volume: number) => void;
  toggleMute: () => void;
  stopAll: () => void;
  getActiveSounds: () => SoundState[];

  setActiveCategory: (category: SoundCategory | "all") => void;
  savePreset: (name: string) => boolean;
  loadPreset: (presetId: string) => void;
  deletePreset: (presetId: string) => void;
  renamePreset: (presetId: string, name: string) => void;
}

export const useSoundStore = create<SoundStoreState>()(
  persist(
    (set, get) => ({
      sounds: {},
      masterVolume: 0.7,
      isMuted: false,
      activeCategory: "all",
      presets: [],

      toggleSound: (id) =>
        set((state) => {
          const current = state.sounds[id];
          const isCurrentlyPlaying = current?.playing ?? false;

          if (!isCurrentlyPlaying) {
            const activeSounds = Object.values(state.sounds).filter(
              (s) => s.playing
            );
            if (activeSounds.length >= MAX_ACTIVE_SOUNDS) {
              return state;
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

      setActiveCategory: (category) => set({ activeCategory: category }),

      savePreset: (name) => {
        const state = get();
        if (state.presets.length >= MAX_PRESETS) return false;

        const activeSounds = Object.values(state.sounds)
          .filter((s) => s.playing)
          .map((s) => ({ id: s.id, volume: s.volume }));

        if (activeSounds.length === 0) return false;

        const preset: SoundMixPreset = {
          id: crypto.randomUUID(),
          name,
          sounds: activeSounds,
          createdAt: new Date().toISOString(),
        };

        set({ presets: [...state.presets, preset] });
        return true;
      },

      loadPreset: (presetId) => {
        const state = get();
        const preset = state.presets.find((p) => p.id === presetId);
        if (!preset) return;

        // Stop all current sounds, then activate preset sounds
        const newSounds: Record<string, SoundState> = {};

        // Keep existing entries but set all to not playing
        Object.entries(state.sounds).forEach(([id, s]) => {
          newSounds[id] = { ...s, playing: false };
        });

        // Activate preset sounds (respecting max limit)
        preset.sounds.slice(0, MAX_ACTIVE_SOUNDS).forEach(({ id, volume }) => {
          newSounds[id] = { id, playing: true, volume };
        });

        set({ sounds: newSounds });
      },

      deletePreset: (presetId) =>
        set((state) => ({
          presets: state.presets.filter((p) => p.id !== presetId),
        })),

      renamePreset: (presetId, name) =>
        set((state) => ({
          presets: state.presets.map((p) =>
            p.id === presetId ? { ...p, name } : p
          ),
        })),
    }),
    { name: "komorebi-sounds" }
  )
);

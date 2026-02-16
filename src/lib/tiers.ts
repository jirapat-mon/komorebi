import type { UserTier } from "@/stores/usePremiumStore";

export interface TierFeatures {
  maxTodos: number;
  maxSoundLayers: number;
  maxPresets: number;
  maxRoomLayouts: number;
  customTimer: boolean;
  categories: boolean;
  dueDates: boolean;
  recurringTasks: boolean;
  focusStats: boolean;
  roomThemes: boolean;
  colorPalette: boolean;
  multiplayer: boolean;
}

export const TIER_FEATURES: Record<UserTier, TierFeatures> = {
  free: {
    maxTodos: 5,
    maxSoundLayers: 3,
    maxPresets: 0,
    maxRoomLayouts: 1,
    customTimer: false,
    categories: false,
    dueDates: false,
    recurringTasks: false,
    focusStats: false,
    roomThemes: false,
    colorPalette: false,
    multiplayer: false,
  },
  premium: {
    maxTodos: 999,
    maxSoundLayers: 999,
    maxPresets: 5,
    maxRoomLayouts: 5,
    customTimer: true,
    categories: true,
    dueDates: true,
    recurringTasks: true,
    focusStats: true,
    roomThemes: true,
    colorPalette: true,
    multiplayer: false,
  },
  premium_plus: {
    maxTodos: 999,
    maxSoundLayers: 999,
    maxPresets: 10,
    maxRoomLayouts: 10,
    customTimer: true,
    categories: true,
    dueDates: true,
    recurringTasks: true,
    focusStats: true,
    roomThemes: true,
    colorPalette: true,
    multiplayer: true,
  },
};

export function getTierFeatures(tier: UserTier): TierFeatures {
  return TIER_FEATURES[tier];
}

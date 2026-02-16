"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserTier = "free" | "premium" | "premium_plus";

interface PremiumState {
  tier: UserTier;
  setTier: (tier: UserTier) => void;
  isPremium: () => boolean;
  isPremiumPlus: () => boolean;
}

export const usePremiumStore = create<PremiumState>()(
  persist(
    (set, get) => ({
      tier: "free",
      setTier: (tier) => set({ tier }),
      isPremium: () => get().tier === "premium" || get().tier === "premium_plus",
      isPremiumPlus: () => get().tier === "premium_plus",
    }),
    { name: "komorebi-premium" }
  )
);

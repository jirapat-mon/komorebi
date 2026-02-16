"use client";

import { ReactNode } from "react";
import { Lock, Crown } from "lucide-react";
import { usePremiumStore } from "@/stores/usePremiumStore";
import { cn } from "@/lib/utils";

interface PremiumGateProps {
  children: ReactNode;
  requiredTier?: "premium" | "premium_plus";
  fallback?: ReactNode;
  inline?: boolean;
}

export function PremiumGate({
  children,
  requiredTier = "premium",
  fallback,
  inline,
}: PremiumGateProps) {
  const tier = usePremiumStore((s) => s.tier);
  const hasAccess =
    requiredTier === "premium"
      ? tier === "premium" || tier === "premium_plus"
      : tier === "premium_plus";

  if (hasAccess) return <>{children}</>;

  if (fallback) return <>{fallback}</>;

  if (inline) {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-amber-500/60">
        <Lock className="w-3 h-3" />
        <span>Premium</span>
      </span>
    );
  }

  return (
    <div className="relative">
      <div className="opacity-40 pointer-events-none blur-[1px]">
        {children}
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-900/60 rounded-xl">
        <Crown className="w-6 h-6 text-amber-500 mb-1" />
        <span className="text-xs text-amber-400 font-medium">Premium</span>
      </div>
    </div>
  );
}

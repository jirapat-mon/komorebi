"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Crown, Check } from "lucide-react";

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PREMIUM_FEATURES = [
  "7 additional room themes",
  "Unlimited sound layers & presets",
  "Custom timer durations",
  "Task categories & due dates",
  "Advanced focus statistics",
  "Color palette customization",
  "Save room layouts",
];

export function UpgradeModal({ isOpen, onClose }: UpgradeModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-sm bg-stone-900 border border-stone-700/50 rounded-2xl p-6 shadow-2xl">
              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-1 text-stone-500 hover:text-stone-300"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="flex flex-col items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center mb-3">
                  <Crown className="w-6 h-6 text-amber-500" />
                </div>
                <h2 className="text-lg font-semibold text-stone-100 font-[family-name:var(--font-heading)]">
                  Upgrade to Premium
                </h2>
                <p className="text-sm text-stone-400 text-center mt-1">
                  Unlock the full Komorebi experience
                </p>
              </div>

              {/* Features */}
              <div className="space-y-2 mb-6">
                {PREMIUM_FEATURES.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-500 shrink-0" />
                    <span className="text-sm text-stone-300">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-sm transition-colors">
                Coming Soon
              </button>

              <p className="text-center text-[10px] text-stone-500 mt-3">
                Premium features are coming soon!
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

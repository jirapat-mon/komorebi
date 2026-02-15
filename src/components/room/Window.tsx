"use client";

import { useRoomStore } from "@/stores/useRoomStore";
import { useMemo } from "react";

export function Window() {
  const rainIntensity = useRoomStore((s) => s.rainIntensity);

  const rainDrops = useMemo(() => {
    const count = Math.floor(rainIntensity * 40);
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 0.6 + Math.random() * 0.4,
      opacity: 0.3 + Math.random() * 0.5,
    }));
  }, [rainIntensity]);

  return (
    <div className="absolute top-[8%] left-[6%] w-[22%] h-[40%]">
      {/* Window frame */}
      <div className="relative w-full h-full rounded-lg border-4 border-stone-600 bg-gradient-to-b from-slate-800/80 to-slate-900/90 overflow-hidden shadow-[inset_0_0_30px_rgba(96,165,250,0.1)]">
        {/* Window panes - cross divider */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-stone-600 -translate-y-1/2 z-10" />
        <div className="absolute top-0 left-1/2 w-1 h-full bg-stone-600 -translate-x-1/2 z-10" />

        {/* Outside blue moonlight glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-slate-900/40" />

        {/* Rain drops */}
        {rainIntensity > 0 && (
          <div className="absolute inset-0">
            {rainDrops.map((drop) => (
              <div
                key={drop.id}
                className="absolute w-[1px] bg-blue-300/40 animate-[rain-fall_linear_infinite]"
                style={{
                  left: `${drop.left}%`,
                  height: "8px",
                  animationDelay: `${drop.delay}s`,
                  animationDuration: `${drop.duration}s`,
                  opacity: drop.opacity,
                }}
              />
            ))}
          </div>
        )}

        {/* Interior glow on window sill */}
        <div className="absolute bottom-0 left-0 w-full h-[30%] bg-gradient-to-t from-amber-900/10 to-transparent" />
      </div>

      {/* Window sill */}
      <div className="w-[110%] -ml-[5%] h-3 bg-stone-700 rounded-sm shadow-md" />

      {/* Light cast from window into room */}
      <div
        className="absolute -bottom-[60%] -left-[10%] w-[120%] h-[60%] pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(96,165,250,0.03) 0%, transparent 100%)",
        }}
      />
    </div>
  );
}

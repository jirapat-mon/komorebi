"use client";

import { useRoomStore } from "@/stores/useRoomStore";
import { useMemo } from "react";

export function RainOverlay() {
  const rainIntensity = useRoomStore((s) => s.rainIntensity);

  const rainDrops = useMemo(() => {
    if (rainIntensity === 0) return [];
    const count = Math.floor(rainIntensity * 80);
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 0.3 + Math.random() * 0.5,
      opacity: 0.1 + Math.random() * 0.3,
      height: 12 + Math.random() * 20,
    }));
  }, [rainIntensity]);

  if (rainIntensity === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Rain streaks */}
      {rainDrops.map((drop) => (
        <div
          key={drop.id}
          className="absolute w-[1px] bg-blue-200/30 animate-[rain-fall_linear_infinite]"
          style={{
            left: `${drop.left}%`,
            height: `${drop.height}px`,
            animationDelay: `${drop.delay}s`,
            animationDuration: `${drop.duration}s`,
            opacity: drop.opacity,
          }}
        />
      ))}

      {/* Rain mist at bottom */}
      <div className="absolute bottom-0 left-0 w-full h-[20%] bg-gradient-to-t from-blue-300/[0.03] to-transparent" />

      {/* Overall rain fog */}
      <div
        className="absolute inset-0"
        style={{
          background: `rgba(100,150,200,${rainIntensity * 0.03})`,
        }}
      />
    </div>
  );
}

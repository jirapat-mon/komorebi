"use client";

import { useRoomStore } from "@/stores/useRoomStore";
import { useMemo } from "react";

const LIGHT_COLORS = [
  "rgba(251,191,36,0.9)", // amber
  "rgba(252,211,77,0.9)", // yellow
  "rgba(249,115,22,0.8)", // orange
  "rgba(251,191,36,0.9)", // amber
  "rgba(253,224,71,0.9)", // light yellow
  "rgba(234,179,8,0.9)", // gold
  "rgba(249,115,22,0.8)", // orange
  "rgba(251,191,36,0.9)", // amber
  "rgba(252,211,77,0.9)", // yellow
  "rgba(249,115,22,0.8)", // orange
  "rgba(253,224,71,0.9)", // light yellow
  "rgba(234,179,8,0.9)", // gold
];

export function FairyLights() {
  const fairyLightsOn = useRoomStore((s) => s.fairyLightsOn);

  const lights = useMemo(() => {
    return LIGHT_COLORS.map((color, i) => {
      const t = i / (LIGHT_COLORS.length - 1);
      // Gentle catenary curve across the top of the room
      const x = 10 + t * 80; // 10% to 90% of width
      const sag = Math.sin(t * Math.PI) * 8; // sag in the middle
      const y = 6 + sag;
      return {
        id: i,
        x,
        y,
        color,
        delay: i * 0.3 + Math.random() * 0.5,
      };
    });
  }, []);

  if (!fairyLightsOn) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      {/* Wire/string */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          d={`M ${lights.map((l) => `${l.x} ${l.y}`).join(" L ")}`}
          fill="none"
          stroke="rgba(120,113,108,0.4)"
          strokeWidth="0.15"
        />
      </svg>

      {/* Light bulbs */}
      {lights.map((light) => (
        <div
          key={light.id}
          className="absolute animate-[twinkle_4s_ease-in-out_infinite]"
          style={{
            left: `${light.x}%`,
            top: `${light.y}%`,
            animationDelay: `${light.delay}s`,
            transform: "translate(-50%, -50%)",
          }}
        >
          {/* Glow */}
          <div
            className="absolute -inset-2 rounded-full"
            style={{
              background: `radial-gradient(circle, ${light.color.replace("0.9", "0.15").replace("0.8", "0.12")} 0%, transparent 70%)`,
              width: "16px",
              height: "16px",
              transform: "translate(-25%, -25%)",
            }}
          />
          {/* Bulb */}
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: light.color,
              boxShadow: `0 0 4px ${light.color}, 0 0 8px ${light.color.replace("0.9", "0.4").replace("0.8", "0.3")}`,
            }}
          />
        </div>
      ))}
    </div>
  );
}

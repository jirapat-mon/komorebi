"use client";

import { useRoomStore, type TimeOfDay } from "@/stores/useRoomStore";
import { useMemo } from "react";

const SKY_STYLES: Record<TimeOfDay, { bg: string; glow: string; moonOrSun: boolean }> = {
  day: {
    bg: "linear-gradient(to bottom, #7dd3fc 0%, #bae6fd 40%, #e0f2fe 100%)",
    glow: "rgba(250,204,21,0.15)",
    moonOrSun: true,
  },
  sunset: {
    bg: "linear-gradient(to bottom, #1e1b4b 0%, #7c3aed 20%, #f97316 60%, #fbbf24 100%)",
    glow: "rgba(249,115,22,0.15)",
    moonOrSun: true,
  },
  night: {
    bg: "linear-gradient(to bottom, #0c0a09 0%, #1c1917 30%, #292524 100%)",
    glow: "rgba(96,165,250,0.08)",
    moonOrSun: true,
  },
};

export function Window() {
  const rainIntensity = useRoomStore((s) => s.rainIntensity);
  const timeOfDay = useRoomStore((s) => s.timeOfDay);
  const sky = SKY_STYLES[timeOfDay];

  const rainDrops = useMemo(() => {
    const count = Math.floor(rainIntensity * 50);
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 0.4 + Math.random() * 0.4,
      opacity: 0.2 + Math.random() * 0.6,
      width: Math.random() > 0.7 ? 2 : 1,
    }));
  }, [rainIntensity]);

  const stars = useMemo(() => {
    if (timeOfDay !== "night") return [];
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: 8 + Math.random() * 84,
      top: 8 + Math.random() * 40,
      size: 1 + Math.random() * 1.5,
      delay: Math.random() * 3,
    }));
  }, [timeOfDay]);

  return (
    <div className="absolute top-[8%] left-[6%] w-[22%] h-[40%]">
      {/* Window frame */}
      <div className="relative w-full h-full rounded-lg border-4 border-stone-600 overflow-hidden shadow-[inset_0_0_30px_rgba(96,165,250,0.05)]">
        {/* Sky background */}
        <div
          className="absolute inset-0 transition-all duration-[2000ms]"
          style={{ background: sky.bg }}
        />

        {/* Stars (night only) */}
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white animate-[twinkle_3s_ease-in-out_infinite]"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}

        {/* Moon (night) */}
        {timeOfDay === "night" && (
          <div className="absolute top-[12%] right-[15%] w-5 h-5">
            <div className="w-full h-full rounded-full bg-stone-200 shadow-[0_0_10px_rgba(255,255,255,0.3),0_0_30px_rgba(255,255,255,0.1)]" />
            <div className="absolute top-[10%] left-[5%] w-[35%] h-[35%] rounded-full bg-stone-300/50" />
          </div>
        )}

        {/* Sun (day) */}
        {timeOfDay === "day" && (
          <div className="absolute top-[15%] right-[20%] w-6 h-6">
            <div className="w-full h-full rounded-full bg-amber-300 shadow-[0_0_15px_rgba(250,204,21,0.5),0_0_40px_rgba(250,204,21,0.2)]" />
          </div>
        )}

        {/* Sunset sun */}
        {timeOfDay === "sunset" && (
          <div className="absolute bottom-[25%] right-[20%] w-7 h-7">
            <div className="w-full h-full rounded-full bg-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.5),0_0_50px_rgba(249,115,22,0.2)]" />
          </div>
        )}

        {/* Clouds */}
        {(timeOfDay === "day" || timeOfDay === "sunset") && (
          <>
            <div
              className="absolute top-[20%] left-[10%] w-[30%] h-3 rounded-full animate-[cloud-drift_20s_linear_infinite]"
              style={{
                background:
                  timeOfDay === "day"
                    ? "rgba(255,255,255,0.6)"
                    : "rgba(255,255,255,0.15)",
              }}
            />
            <div
              className="absolute top-[35%] left-[50%] w-[25%] h-2.5 rounded-full animate-[cloud-drift_25s_linear_infinite_3s]"
              style={{
                background:
                  timeOfDay === "day"
                    ? "rgba(255,255,255,0.4)"
                    : "rgba(255,255,255,0.1)",
              }}
            />
          </>
        )}

        {/* Window panes - cross divider */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-stone-600 -translate-y-1/2 z-10" />
        <div className="absolute top-0 left-1/2 w-1 h-full bg-stone-600 -translate-x-1/2 z-10" />

        {/* Rain drops */}
        {rainIntensity > 0 && (
          <div className="absolute inset-0 z-[5]">
            {rainDrops.map((drop) => (
              <div
                key={drop.id}
                className="absolute bg-blue-300/40 animate-[rain-fall_linear_infinite]"
                style={{
                  left: `${drop.left}%`,
                  width: `${drop.width}px`,
                  height: `${6 + drop.width * 3}px`,
                  animationDelay: `${drop.delay}s`,
                  animationDuration: `${drop.duration}s`,
                  opacity: drop.opacity,
                }}
              />
            ))}
            {/* Rain fog / mist effect */}
            <div className="absolute bottom-0 left-0 w-full h-[40%] bg-gradient-to-t from-blue-400/5 to-transparent" />
          </div>
        )}

        {/* Condensation on glass when raining */}
        {rainIntensity > 0.3 && (
          <div className="absolute inset-0 bg-blue-200/[0.03] backdrop-blur-[0.5px]" />
        )}

        {/* Interior glow on window sill */}
        <div
          className="absolute bottom-0 left-0 w-full h-[30%] transition-all duration-1000"
          style={{
            background: `linear-gradient(to top, ${sky.glow} 0%, transparent 100%)`,
          }}
        />
      </div>

      {/* Window sill */}
      <div className="w-[110%] -ml-[5%] h-3 bg-stone-700 rounded-sm shadow-md" />

      {/* Light cast from window into room */}
      <div
        className="absolute -bottom-[60%] -left-[10%] w-[120%] h-[60%] pointer-events-none transition-all duration-1000"
        style={{
          background:
            timeOfDay === "day"
              ? "linear-gradient(to bottom, rgba(250,204,21,0.06) 0%, transparent 100%)"
              : timeOfDay === "sunset"
                ? "linear-gradient(to bottom, rgba(249,115,22,0.04) 0%, transparent 100%)"
                : "linear-gradient(to bottom, rgba(96,165,250,0.03) 0%, transparent 100%)",
        }}
      />
    </div>
  );
}

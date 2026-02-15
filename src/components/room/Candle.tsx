"use client";

import { useRoomStore } from "@/stores/useRoomStore";

export function Candle() {
  const candleLit = useRoomStore((s) => s.candleLit);

  return (
    <div className="absolute bottom-[38%] right-[22%] w-[3%]">
      {/* Candle holder / saucer */}
      <div className="relative flex flex-col items-center">
        {/* Flame */}
        {candleLit && (
          <div className="relative w-3 h-6 mb-0.5">
            {/* Outer flame glow */}
            <div
              className="absolute -inset-4 rounded-full pointer-events-none animate-[candle-glow_3s_ease-in-out_infinite]"
              style={{
                background:
                  "radial-gradient(ellipse, rgba(245,158,11,0.2) 0%, rgba(245,158,11,0.05) 50%, transparent 70%)",
              }}
            />
            {/* Outer flame */}
            <div
              className="absolute inset-0 animate-[flame-flicker_2.5s_ease-in-out_infinite]"
              style={{
                background:
                  "linear-gradient(to top, #f59e0b 0%, #f97316 40%, #ef4444 70%, transparent 100%)",
                borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
                filter: "blur(0.5px)",
              }}
            />
            {/* Inner flame (bright core) */}
            <div
              className="absolute left-[25%] bottom-0 w-[50%] h-[50%] animate-[flame-flicker-alt_2s_ease-in-out_infinite]"
              style={{
                background:
                  "linear-gradient(to top, #fef3c7 0%, #fbbf24 60%, transparent 100%)",
                borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
              }}
            />
          </div>
        )}

        {/* Wick */}
        <div className="w-[2px] h-1.5 bg-stone-800" />

        {/* Candle body */}
        <div className="w-4 h-8 bg-gradient-to-b from-amber-100 to-amber-200 rounded-sm" />

        {/* Candle holder */}
        <div className="w-6 h-1.5 bg-stone-500 rounded-sm" />
      </div>

      {/* Large ambient glow */}
      {candleLit && (
        <div
          className="absolute -top-16 left-1/2 -translate-x-1/2 w-32 h-32 pointer-events-none animate-[candle-glow_3s_ease-in-out_infinite]"
          style={{
            background:
              "radial-gradient(ellipse, rgba(245,158,11,0.08) 0%, transparent 70%)",
          }}
        />
      )}
    </div>
  );
}

"use client";

export function Furniture() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Floor */}
      <div className="absolute bottom-0 left-0 w-full h-[28%] bg-gradient-to-t from-stone-900 to-stone-900/80" />
      {/* Floor line */}
      <div className="absolute bottom-[28%] left-0 w-full h-[1px] bg-stone-700/50" />

      {/* Wall */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-stone-900/50 to-transparent" />

      {/* Desk */}
      <div className="absolute bottom-[28%] left-[25%] w-[30%]">
        {/* Desktop surface */}
        <div className="w-full h-3 bg-gradient-to-r from-stone-700 via-stone-600 to-stone-700 rounded-t-sm shadow-lg" />
        {/* Desk front panel */}
        <div className="w-full h-16 bg-gradient-to-b from-stone-700 to-stone-800 border-t border-stone-600/30">
          {/* Drawer */}
          <div className="absolute top-5 left-[10%] w-[35%] h-8 bg-stone-750 border border-stone-600/20 rounded-sm">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-1 bg-stone-500 rounded-full" />
          </div>
          <div className="absolute top-5 right-[10%] w-[35%] h-8 bg-stone-750 border border-stone-600/20 rounded-sm">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-1 bg-stone-500 rounded-full" />
          </div>
        </div>
        {/* Desk legs */}
        <div className="absolute -bottom-10 left-[5%] w-2 h-10 bg-stone-700" />
        <div className="absolute -bottom-10 right-[5%] w-2 h-10 bg-stone-700" />
      </div>

      {/* Bed */}
      <div className="absolute bottom-[28%] right-[3%] w-[28%]">
        {/* Headboard */}
        <div className="absolute -top-16 right-0 w-[30%] h-16 bg-gradient-to-t from-stone-700 to-stone-600 rounded-t-md" />
        {/* Mattress */}
        <div className="w-full h-6 bg-gradient-to-r from-stone-600 to-stone-700 rounded-t-md">
          {/* Pillow */}
          <div className="absolute -top-2 right-[5%] w-[25%] h-5 bg-stone-500/80 rounded-md" />
          {/* Blanket */}
          <div className="absolute top-1 left-0 w-[65%] h-4 bg-amber-900/30 rounded-tr-lg" />
        </div>
        {/* Bed frame */}
        <div className="w-full h-8 bg-stone-800 border-t border-stone-600/20" />
      </div>

      {/* Bookshelf */}
      <div className="absolute top-[20%] right-[8%] w-[14%] h-[35%]">
        {/* Shelf frame */}
        <div className="w-full h-full bg-gradient-to-b from-stone-800 to-stone-800/90 border border-stone-700/30 rounded-sm">
          {/* Shelves */}
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ top: `${(i + 1) * 25}%` }} className="absolute left-0 w-full">
              <div className="w-full h-[2px] bg-stone-600" />
              {/* Books */}
              <div className="flex gap-[2px] px-1 -mt-[14px]">
                {[0, 1, 2, 3].map((j) => (
                  <div
                    key={j}
                    className="rounded-t-[1px]"
                    style={{
                      width: `${18 + Math.random() * 8}%`,
                      height: `${10 + Math.random() * 4}px`,
                      background: [
                        "#78350f",
                        "#92400e",
                        "#7c2d12",
                        "#713f12",
                        "#44403c",
                      ][j % 5],
                      opacity: 0.7 + Math.random() * 0.3,
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Plant */}
      <div className="absolute bottom-[28%] left-[8%] w-[6%]">
        {/* Pot */}
        <div className="w-full mx-auto">
          {/* Leaves */}
          <div className="relative flex justify-center -mb-1">
            <div className="w-3 h-5 bg-green-900/70 rounded-full -rotate-20 -mr-1" />
            <div className="w-3 h-6 bg-green-800/70 rounded-full" />
            <div className="w-3 h-5 bg-green-900/70 rounded-full rotate-20 -ml-1" />
          </div>
          {/* Pot body */}
          <div
            className="w-full mx-auto h-6 bg-gradient-to-b from-amber-800 to-amber-900 rounded-b-md"
            style={{
              clipPath: "polygon(10% 0%, 90% 0%, 80% 100%, 20% 100%)",
            }}
          />
        </div>
      </div>

      {/* Rug under desk */}
      <div className="absolute bottom-[12%] left-[20%] w-[38%] h-[10%] bg-amber-950/20 rounded-full blur-sm" />
    </div>
  );
}

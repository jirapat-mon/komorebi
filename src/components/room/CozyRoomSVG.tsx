"use client";

import { useRoomStore } from "@/stores/useRoomStore";

export function CozyRoomSVG() {
  const timeOfDay = useRoomStore((s) => s.timeOfDay);
  const lightsOn = useRoomStore((s) => s.lightsOn);
  const candleLit = useRoomStore((s) => s.candleLit);
  const fairyLightsOn = useRoomStore((s) => s.fairyLightsOn);

  // Pick color by time: day / sunset / night
  const c = (d: string, s: string, n: string) =>
    timeOfDay === "day" ? d : timeOfDay === "sunset" ? s : n;

  const t: React.CSSProperties = { transition: "fill 2s ease" };

  return (
    <svg
      viewBox="0 0 480 380"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
    >
      {/* ==================== 1. ROOM STRUCTURE ==================== */}

      {/* Left wall */}
      <polygon
        points="80,220 240,140 240,20 80,100"
        fill={c("#E8D8C0", "#D4A870", "#3A3028")}
        style={t}
      />
      {/* Left wall shadow strip (near back corner) */}
      <polygon
        points="220,148 240,140 240,20 220,28"
        fill={c("#D8C8B0", "#C49860", "#322820")}
        style={t}
      />
      {/* Left wall wainscoting */}
      <polygon
        points="80,180 240,100 240,140 80,220"
        fill={c("#D0C0A0", "#C09050", "#302818")}
        style={t}
      />
      {/* Left wall wainscoting highlight line */}
      <polygon
        points="80,180 240,100 240,102 80,182"
        fill={c("#DED0B0", "#D0A060", "#3A3020")}
        style={t}
      />

      {/* Right wall */}
      <polygon
        points="240,140 400,220 400,100 240,20"
        fill={c("#D4C4A8", "#C09050", "#2E2420")}
        style={t}
      />
      {/* Right wall shadow strip (near front) */}
      <polygon
        points="380,212 400,220 400,100 380,92"
        fill={c("#C4B498", "#B08040", "#261C18")}
        style={t}
      />
      {/* Right wall wainscoting */}
      <polygon
        points="240,100 400,180 400,220 240,140"
        fill={c("#C4B498", "#B08040", "#281E14")}
        style={t}
      />

      {/* Back corner edge line */}
      <line x1={240} y1={20} x2={240} y2={140} stroke={c("#C0B090", "#A87838", "#222034")} strokeWidth={1} />

      {/* Floor */}
      <polygon
        points="240,140 400,220 240,300 80,220"
        fill={c("#C8A882", "#A88050", "#2A2018")}
        style={t}
      />
      {/* Floor plank lines (isometric, going left-to-right) */}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => {
        const yOff = i * 20;
        return (
          <line
            key={`fp${i}`}
            x1={80 + yOff * 1}
            y1={220 + yOff * 0}
            x2={240 + yOff * 1}
            y2={140 + yOff * 0}
            stroke={c("#B89872", "#987040", "#221810")}
            strokeWidth={1}
            opacity={0.25}
            style={t}
          />
        );
      })}
      {/* Floor plank lines (going right-to-left) */}
      {[1, 2, 3, 4, 5, 6].map((i) => {
        const step = 24;
        const x1 = 240 - i * step;
        const y1 = 140 + i * (step / 2);
        const x2 = 400 - i * step;
        const y2 = 220 + i * (step / 2);
        return (
          <line
            key={`fpr${i}`}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={c("#B89872", "#987040", "#221810")}
            strokeWidth={1}
            opacity={0.2}
            style={t}
          />
        );
      })}

      {/* Baseboard — left wall bottom */}
      <polygon
        points="80,216 240,136 240,140 80,220"
        fill={c("#8B6244", "#7B5234", "#1E1810")}
        style={t}
      />
      {/* Baseboard — right wall bottom */}
      <polygon
        points="240,136 400,216 400,220 240,140"
        fill={c("#7B5234", "#6B4224", "#181210")}
        style={t}
      />

      {/* ==================== 2. WINDOW (right wall) ==================== */}
      {/* Sky through window */}
      <polygon
        points="300,46 376,84 376,160 300,122"
        fill={c("#78C8F0", "#FF8844", "#0A0C24")}
        style={t}
      />
      {/* Sky gradient band (lower) */}
      <polygon
        points="300,90 376,128 376,160 300,122"
        fill={c("#90D8FF", "#FFB060", "#101438")}
        style={t}
      />

      {/* Sun (day/sunset) */}
      {timeOfDay !== "night" && (
        <polygon
          points="330,60 338,64 338,72 330,68"
          fill={c("#FFE060", "#FF6800", "#E0E0F0")}
          style={t}
        />
      )}

      {/* Moon (night) */}
      {timeOfDay === "night" && (
        <>
          <polygon points="316,52 322,55 322,61 316,58" fill="#E0E0F0" />
          <polygon points="318,50 320,51 320,53 318,52" fill="#D0D0E8" />
        </>
      )}

      {/* Stars (night) */}
      {timeOfDay === "night" && [
        [310, 50], [340, 62], [360, 70], [320, 74], [350, 56],
        [305, 64], [370, 82], [328, 48], [355, 66], [312, 80],
      ].map(([sx, sy], i) => (
        <rect key={`star${i}`} x={sx} y={sy} width={1} height={1} fill="#E8E8FF" opacity={0.7}>
          <animate attributeName="opacity" values="0.7;0.15;0.7" dur={`${2.5 + (i % 4) * 0.4}s`} begin={`${(i * 0.4) % 3}s`} repeatCount="indefinite" />
        </rect>
      ))}

      {/* City skyline silhouettes (inside window) */}
      <polygon points="300,112 312,106 312,160 300,122" fill={c("#6888A8", "#4A2040", "#0C0C20")} style={t} />
      <polygon points="312,100 324,94 324,160 312,122" fill={c("#7898B8", "#5A3050", "#101028")} style={t} />
      <polygon points="324,108 340,100 340,160 324,122" fill={c("#88A8C8", "#6A4060", "#141430")} style={t} />
      <polygon points="340,114 352,108 352,160 340,122" fill={c("#6888A8", "#4A2040", "#0C0C20")} style={t} />
      <polygon points="352,104 368,96 368,160 352,122" fill={c("#7898B8", "#5A3050", "#101028")} style={t} />
      <polygon points="368,110 376,106 376,160 368,122" fill={c("#88A8C8", "#6A4060", "#141430")} style={t} />

      {/* City lit windows (night) */}
      {timeOfDay === "night" && (
        <>
          <rect x={306} y={118} width={2} height={1} fill="#FFE880" opacity={0.8} />
          <rect x={318} y={108} width={2} height={1} fill="#FFCC60" opacity={0.6}>
            <animate attributeName="opacity" values="0.6;0.2;0.6" dur="4s" begin="1s" repeatCount="indefinite" />
          </rect>
          <rect x={332} y={112} width={2} height={1} fill="#FFE880" opacity={0.8} />
          <rect x={346} y={116} width={2} height={1} fill="#FFCC60" opacity={0.6}>
            <animate attributeName="opacity" values="0.6;0.1;0.6" dur="5s" begin="2s" repeatCount="indefinite" />
          </rect>
          <rect x={358} y={110} width={2} height={1} fill="#FFE880" opacity={0.8}>
            <animate attributeName="opacity" values="0.8;0.3;0.8" dur="3s" begin="0.5s" repeatCount="indefinite" />
          </rect>
          <rect x={370} y={114} width={2} height={1} fill="#FFCC60" opacity={0.6} />
        </>
      )}

      {/* Window frame (isometric parallelogram on right wall) */}
      <polygon points="296,42 380,82 380,86 296,46" fill={c("#8B6244", "#7B5234", "#3B2820")} style={t} />
      <polygon points="296,158 380,198 380,164 296,124" fill={c("#8B6244", "#7B5234", "#3B2820")} style={t} />
      <polygon points="296,42 300,44 300,124 296,122" fill={c("#8B6244", "#7B5234", "#3B2820")} style={t} />
      <polygon points="376,82 380,84 380,164 376,162" fill={c("#8B6244", "#7B5234", "#3B2820")} style={t} />
      {/* Cross bars */}
      <polygon points="296,82 380,122 380,124 296,84" fill={c("#8B6244", "#7B5234", "#3B2820")} style={t} />
      <polygon points="336,60 340,62 340,144 336,142" fill={c("#8B6244", "#7B5234", "#3B2820")} style={t} />

      {/* Window sill */}
      <polygon
        points="292,124 384,166 384,170 292,128"
        fill={c("#9B7254", "#8B6244", "#4B3830")}
        style={t}
      />

      {/* Curtain left */}
      <polygon points="300,46 308,50 308,158 300,154" fill={c("#C4956A", "#A47B50", "#3A2818")} style={t} />
      {/* Curtain right */}
      <polygon points="370,80 378,84 378,162 370,158" fill={c("#C4956A", "#A47B50", "#3A2818")} style={t} />

      {/* ==================== 3. WALL DECORATIONS (left wall) ==================== */}

      {/* Poster 1 — mountain landscape on left wall */}
      <polygon points="110,130 170,100 170,60 110,90" fill={c("#6B4226", "#5B3216", "#2B1810")} style={t} />
      <polygon points="112,128 168,98 168,62 112,92" fill={c("#F5E6D3", "#E5D6C3", "#3A3428")} style={t} />
      {/* Mountains */}
      <polygon points="112,118 168,88 168,98 112,128" fill={c("#5A8063", "#4A7053", "#1A3023")} style={t} />
      <polygon points="130,108 150,98 150,88 130,78" fill={c("#7BA083", "#6B9073", "#2B4033")} style={t} />
      <polygon points="138,78 144,75 144,88 138,91" fill={c("#8BB093", "#7BA083", "#3B5043")} style={t} />

      {/* Poster 2 — abstract on left wall */}
      <polygon points="178,112 214,94 214,64 178,82" fill={c("#6B4226", "#5B3216", "#2B1810")} style={t} />
      <polygon points="180,110 212,92 212,66 180,84" fill={c("#F5E6D3", "#E5D6C3", "#3A3428")} style={t} />
      <polygon points="184,102 200,94 200,82 184,90" fill={c("#8B4513", "#7B3503", "#3B1503")} style={t} />
      <polygon points="196,96 210,90 210,78 196,84" fill={c("#2E8B8B", "#1E7B7B", "#0E3B3B")} style={t} />

      {/* Clock on left wall */}
      <polygon points="128,160 144,152 144,140 128,148" fill={c("#FFF8F0", "#F0E8E0", "#2A2418")} style={t} />
      <polygon points="130,158 142,152 142,142 130,148" fill={c("#6B4226", "#5B3216", "#2B1810")} style={t} />
      <polygon points="132,156 140,152 140,144 132,148" fill={c("#FFF8F0", "#F0E8E0", "#2A2418")} style={t} />
      {/* Clock hands */}
      <rect x={136} y={148} width={1} height={4} fill={c("#333", "#333", "#888")} style={t} />
      <rect x={136} y={150} width={3} height={1} fill={c("#333", "#333", "#888")} style={t} />

      {/* Wall shelf + candle (left wall) */}
      <polygon points="158,168 206,144 206,140 158,164" fill={c("#9B7254", "#8B6244", "#4B3830")} style={t} />
      {/* Shelf brackets */}
      <polygon points="160,168 164,166 164,174 160,176" fill={c("#6B4226", "#5B3216", "#2B1810")} style={t} />
      <polygon points="200,146 204,144 204,152 200,154" fill={c("#6B4226", "#5B3216", "#2B1810")} style={t} />

      {/* Candle on shelf */}
      <polygon points="180,152 186,149 186,140 180,143" fill={c("#FFF5E0", "#F5E5D0", "#8B8570")} style={t} />
      <rect x={182} y={138} width={1} height={2} fill="#333" />
      {/* Candle flame */}
      {candleLit && (
        <>
          <polygon points="181,133 185,131 185,138 181,140" fill="#FF9933">
            <animate attributeName="opacity" values="0.9;0.5;0.9" dur="0.5s" repeatCount="indefinite" />
          </polygon>
          <rect x={183} y={134} width={1} height={3} fill="#FFDD44">
            <animate attributeName="opacity" values="1;0.6;1" dur="0.4s" repeatCount="indefinite" />
          </rect>
        </>
      )}

      {/* Small vase on shelf */}
      <polygon points="192,148 198,145 198,140 192,143" fill={c("#6B8BA4", "#5B7B94", "#2B4B64")} style={t} />

      {/* ==================== 4. HANGING PLANTS ==================== */}

      {/* Hanging plant 1 (left wall area) */}
      <rect x={130} y={18} width={1} height={20} fill={c("#666", "#666", "#444")} style={t} />
      <polygon points="124,38 136,32 136,44 124,50" fill={c("#B87333", "#A86323", "#5A3313")} style={t} />
      {/* Trailing vines */}
      <rect x={126} y={50} width={1} height={16} fill={c("#3A6C49", "#2A5C39", "#1A3C29")} style={t} />
      <rect x={132} y={44} width={1} height={14} fill={c("#3A6C49", "#2A5C39", "#1A3C29")} style={t} />
      {/* Leaves */}
      <rect x={124} y={54} width={2} height={2} fill={c("#5A8C69", "#4A7C59", "#2A4C39")} style={t} />
      <rect x={128} y={60} width={2} height={2} fill={c("#6AAC79", "#5A9C69", "#3A6C49")} style={t} />
      <rect x={134} y={50} width={2} height={2} fill={c("#5A8C69", "#4A7C59", "#2A4C39")} style={t} />
      <rect x={130} y={56} width={2} height={2} fill={c("#4A7C59", "#3A6C49", "#1A3C29")} style={t} />

      {/* Hanging plant 2 (right wall area) */}
      <rect x={350} y={18} width={1} height={18} fill={c("#666", "#666", "#444")} style={t} />
      <polygon points="344,36 356,42 356,52 344,46" fill={c("#B87333", "#A86323", "#5A3313")} style={t} />
      <rect x={346} y={52} width={1} height={14} fill={c("#3A6C49", "#2A5C39", "#1A3C29")} style={t} />
      <rect x={352} y={52} width={1} height={12} fill={c("#3A6C49", "#2A5C39", "#1A3C29")} style={t} />
      <rect x={344} y={56} width={2} height={2} fill={c("#6AAC79", "#5A9C69", "#3A6C49")} style={t} />
      <rect x={348} y={62} width={2} height={2} fill={c("#5A8C69", "#4A7C59", "#2A4C39")} style={t} />
      <rect x={354} y={58} width={2} height={2} fill={c("#4A7C59", "#3A6C49", "#1A3C29")} style={t} />

      {/* ==================== 5. FAIRY LIGHTS ==================== */}
      {fairyLightsOn && (
        <g>
          {/* Wire along left wall top */}
          <line x1={80} y1={102} x2={240} y2={22} stroke={c("rgba(120,100,80,0.3)", "rgba(100,80,60,0.3)", "rgba(80,70,60,0.4)")} strokeWidth={1} />
          {/* Wire along right wall top */}
          <line x1={240} y1={22} x2={400} y2={102} stroke={c("rgba(120,100,80,0.3)", "rgba(100,80,60,0.3)", "rgba(80,70,60,0.4)")} strokeWidth={1} />

          {/* Left wall bulbs */}
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
            const bx = 95 + i * 18;
            const by = 96 - i * 9;
            const colors = ["#FFB347", "#FFCC33", "#FF9933", "#FFE066", "#FFAA33"];
            const color = colors[i % colors.length];
            return (
              <g key={`fll${i}`}>
                <rect x={bx - 1} y={by} width={4} height={4} fill={color} opacity={0.08}>
                  <animate attributeName="opacity" values="0.08;0.02;0.08" dur="4s" begin={`${(i * 0.35) % 4}s`} repeatCount="indefinite" />
                </rect>
                <rect x={bx} y={by + 1} width={2} height={2} fill={color} opacity={0.85}>
                  <animate attributeName="opacity" values="0.85;0.35;0.85" dur="4s" begin={`${(i * 0.35) % 4}s`} repeatCount="indefinite" />
                </rect>
              </g>
            );
          })}
          {/* Right wall bulbs */}
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
            const bx = 255 + i * 18;
            const by = 28 + i * 9;
            const colors = ["#FFE066", "#FFAA33", "#FFB347", "#FFCC33", "#FF9933"];
            const color = colors[i % colors.length];
            return (
              <g key={`flr${i}`}>
                <rect x={bx - 1} y={by} width={4} height={4} fill={color} opacity={0.08}>
                  <animate attributeName="opacity" values="0.08;0.02;0.08" dur="4s" begin={`${(i * 0.5) % 4}s`} repeatCount="indefinite" />
                </rect>
                <rect x={bx} y={by + 1} width={2} height={2} fill={color} opacity={0.85}>
                  <animate attributeName="opacity" values="0.85;0.35;0.85" dur="4s" begin={`${(i * 0.5) % 4}s`} repeatCount="indefinite" />
                </rect>
              </g>
            );
          })}
        </g>
      )}

      {/* ==================== 6. PERSIAN RUG (on floor) ==================== */}
      {/* Rug outer border — isometric diamond */}
      <polygon
        points="240,190 310,225 240,260 170,225"
        fill={c("#8B1A1A", "#7B0A0A", "#3B0A0A")}
        style={t}
      />
      {/* Rug inner */}
      <polygon
        points="240,196 302,228 240,254 178,228"
        fill={c("#B03030", "#A02020", "#501010")}
        style={t}
      />
      {/* Rug medallion center */}
      <polygon
        points="240,216 256,224 240,232 224,224"
        fill={c("#DEB887", "#CE9C70", "#5B4030")}
        style={t}
      />
      {/* Rug teal accents */}
      <polygon
        points="240,210 248,214 240,218 232,214"
        fill={c("#2E8B8B", "#1E7B7B", "#0E3B3B")}
        style={t}
      />
      <polygon
        points="240,228 248,232 240,236 232,232"
        fill={c("#2E8B8B", "#1E7B7B", "#0E3B3B")}
        style={t}
      />
      {/* Rug border accents */}
      <rect x={200} y={214} width={2} height={2} fill={c("#FFF5DC", "#E0D5BC", "#6A6558")} style={t} />
      <rect x={276} y={230} width={2} height={2} fill={c("#FFF5DC", "#E0D5BC", "#6A6558")} style={t} />
      <rect x={216} y={240} width={2} height={2} fill={c("#FFF5DC", "#E0D5BC", "#6A6558")} style={t} />
      <rect x={262} y={210} width={2} height={2} fill={c("#FFF5DC", "#E0D5BC", "#6A6558")} style={t} />

      {/* ==================== 7. BOOKSHELF (against left wall) ==================== */}
      {/* Back face (left face visible) */}
      <polygon points="90,208 110,198 110,118 90,128" fill={c("#5B3216", "#4B2206", "#1B0800")} style={t} />
      {/* Right face */}
      <polygon points="110,198 140,213 140,133 110,118" fill={c("#4A2810", "#3A1800", "#120400")} style={t} />
      {/* Top face */}
      <polygon points="90,128 110,118 140,133 120,143" fill={c("#9B7254", "#8B6244", "#4B3830")} style={t} />

      {/* Shelf boards (on right face) */}
      {[0, 1, 2, 3].map((i) => {
        const y1 = 140 + i * 18;
        const y2 = y1 + 15;
        return (
          <polygon
            key={`shelf${i}`}
            points={`110,${y1} 140,${y1 + 15} 140,${y1 + 17} 110,${y1 + 2}`}
            fill={c("#9B7254", "#8B6244", "#4B3830")}
            style={t}
          />
        );
      })}

      {/* Books on shelves (colored rects on the right face) */}
      {/* Shelf 1 books */}
      <rect x={112} y={122} width={3} height={16} fill="#8B2500" />
      <rect x={116} y={124} width={4} height={14} fill="#2E4057" />
      <rect x={121} y={120} width={3} height={18} fill="#1B4D3E" />
      <rect x={125} y={123} width={4} height={15} fill="#800020" />
      <rect x={130} y={121} width={3} height={17} fill="#483D8B" />
      <rect x={134} y={125} width={4} height={13} fill="#7B3F00" />

      {/* Shelf 2 books */}
      <rect x={112} y={142} width={4} height={14} fill="#006400" />
      <rect x={117} y={140} width={3} height={16} fill="#8B0000" />
      <rect x={121} y={143} width={4} height={13} fill="#191970" />
      <rect x={126} y={141} width={3} height={15} fill="#556B2F" />
      {/* Small plant on shelf */}
      <rect x={132} y={150} width={4} height={6} fill={c("#B87333", "#A86323", "#5A3313")} style={t} />
      <rect x={132} y={146} width={4} height={4} fill={c("#4A7C59", "#3A6C49", "#1A3C29")} style={t} />

      {/* Shelf 3 books */}
      <rect x={112} y={160} width={3} height={14} fill="#800000" />
      <rect x={116} y={158} width={4} height={16} fill="#004D40" />
      <rect x={121} y={161} width={3} height={13} fill="#311B92" />
      <rect x={125} y={159} width={4} height={15} fill="#BF360C" />
      <rect x={130} y={160} width={3} height={14} fill="#1A237E" />
      {/* Photo frame */}
      <rect x={134} y={164} width={5} height={6} fill={c("#8B7355", "#7B6345", "#3B2F25")} style={t} />
      <rect x={135} y={165} width={3} height={4} fill={c("#C8E8FF", "#FFD0B0", "#384860")} style={t} />

      {/* Shelf 4 books */}
      <rect x={112} y={178} width={4} height={14} fill="#3E2723" />
      <rect x={117} y={176} width={3} height={16} fill="#0D47A1" />
      <rect x={121} y={179} width={4} height={13} fill="#827717" />
      <rect x={126} y={177} width={3} height={15} fill="#4A148C" />
      <rect x={130} y={178} width={4} height={14} fill="#E65100" />
      {/* Globe */}
      <rect x={135} y={184} width={4} height={4} fill={c("#4A8CB8", "#3A7CA8", "#1A4C78")} style={t} />

      {/* ==================== 8. BED (against right wall, back) ==================== */}
      {/* Headboard (against right wall) */}
      <polygon points="310,162 340,177 340,147 310,132" fill={c("#6B4226", "#5B3216", "#2B1810")} style={t} />
      <polygon points="310,132 340,147 370,132 340,117" fill={c("#9B7254", "#8B6244", "#4B3830")} style={t} />

      {/* Mattress — top face */}
      <polygon
        points="270,195 340,160 400,190 330,225"
        fill={c("#F0EBE0", "#E0DBD0", "#6A655D")}
        style={t}
      />
      {/* Mattress — left face */}
      <polygon
        points="270,195 330,225 330,235 270,205"
        fill={c("#E0D8C8", "#D0C8B8", "#5A554D")}
        style={t}
      />
      {/* Mattress — right face */}
      <polygon
        points="330,225 400,190 400,200 330,235"
        fill={c("#D0C8B8", "#C0B8A8", "#4A453D")}
        style={t}
      />

      {/* Bed frame bottom */}
      <polygon points="268,205 328,238 328,242 268,209" fill={c("#6B4226", "#5B3216", "#2B1810")} style={t} />
      <polygon points="328,238 398,203 398,207 328,242" fill={c("#5B3216", "#4B2206", "#1B0800")} style={t} />

      {/* Pillows */}
      <polygon points="310,180 336,166 356,176 330,190" fill={c("#FFF8F0", "#F0E8E0", "#7A756D")} style={t} />
      <polygon points="330,170 352,158 370,168 348,180" fill={c("#FFF0E8", "#E8E0D8", "#726D65")} style={t} />

      {/* Blanket — top face */}
      <polygon
        points="270,200 330,215 390,195 330,180"
        fill={c("#8B4513", "#7B3503", "#2B1503")}
        style={t}
      />
      {/* Blanket fold line */}
      <polygon
        points="280,202 330,218 380,198 330,183"
        fill={c("#A05520", "#903510", "#3B2010")}
        style={t}
        opacity={0.4}
      />

      {/* Sleeping cat on bed */}
      <g>
        {/* Body */}
        <polygon points="340,182 352,176 352,182 340,188" fill={c("#FF8C42", "#E87C32", "#8B5C22")} style={t}>
          <animate attributeName="transform" values="translate(0,0);translate(0,1);translate(0,0)" dur="4s" repeatCount="indefinite" type="translate" />
        </polygon>
        {/* Head */}
        <polygon points="352,174 362,169 362,177 352,182" fill={c("#FF8C42", "#E87C32", "#8B5C22")} style={t} />
        {/* Ears */}
        <rect x={354} y={170} width={2} height={2} fill={c("#FF8C42", "#E87C32", "#8B5C22")} style={t} />
        <rect x={358} y={168} width={2} height={2} fill={c("#FF8C42", "#E87C32", "#8B5C22")} style={t} />
        <rect x={355} y={171} width={1} height={1} fill={c("#FFB088", "#EEA078", "#AB7C42")} style={t} />
        <rect x={359} y={169} width={1} height={1} fill={c("#FFB088", "#EEA078", "#AB7C42")} style={t} />
        {/* Closed eyes */}
        <rect x={355} y={174} width={2} height={1} fill={c("#CC6B2E", "#BC5B1E", "#6C3D0E")} style={t} />
        <rect x={359} y={172} width={2} height={1} fill={c("#CC6B2E", "#BC5B1E", "#6C3D0E")} style={t} />
        {/* Tail */}
        <polygon points="336,186 340,184 340,186 336,188" fill={c("#FF8C42", "#E87C32", "#8B5C22")} style={t} />
        <polygon points="332,184 336,186 336,188 332,186" fill={c("#E87C32", "#D86C22", "#7B4C12")} style={t} />
      </g>

      {/* ==================== 9. DESK (left-center) ==================== */}
      {/* Desktop — top face */}
      <polygon
        points="150,230 240,188 300,218 210,260"
        fill={c("#C89660", "#B08850", "#4A3828")}
        style={t}
      />
      {/* Desktop — left face */}
      <polygon
        points="150,230 210,260 210,268 150,238"
        fill={c("#A07840", "#907038", "#3A2818")}
        style={t}
      />
      {/* Desktop — right face */}
      <polygon
        points="210,260 300,218 300,226 210,268"
        fill={c("#7A5830", "#705028", "#2A1808")}
        style={t}
      />

      {/* Desk drawer section — left face */}
      <polygon
        points="152,234 210,264 210,280 152,250"
        fill={c("#8B6244", "#7B5234", "#3B2820")}
        style={t}
      />
      {/* Drawer handle */}
      <rect x={178} y={258} width={6} height={1} fill={c("#B89060", "#A88050", "#5A4830")} style={t} />
      {/* Drawer line */}
      <polygon
        points="152,242 210,272 210,273 152,243"
        fill={c("#6B4226", "#5B3216", "#2B1810")}
        style={t}
        opacity={0.5}
      />

      {/* Desk legs */}
      <polygon points="152,250 156,252 156,264 152,262" fill={c("#6B4226", "#5B3216", "#2B1810")} style={t} />
      <polygon points="296,222 300,224 300,236 296,234" fill={c("#5B3216", "#4B2206", "#1B0800")} style={t} />

      {/* ==================== 10. DESK ITEMS ==================== */}

      {/* Stacked books (left side of desk) */}
      <polygon points="160,224 178,215 198,225 180,234" fill="#8B2500" />
      <polygon points="162,221 180,212 196,222 178,231" fill="#2E4057" />
      <polygon points="164,218 176,212 192,220 180,226" fill="#5C4033" />

      {/* Laptop */}
      {/* Screen (angled up) */}
      <polygon
        points="200,208 248,184 268,194 220,218"
        fill={c("#2A2A2A", "#2A2A2A", "#1A1A1A")}
        style={t}
      />
      {/* Screen display */}
      <polygon
        points="204,210 246,188 264,198 222,220"
        fill={c("#D0E0F0", "#B8C8D8", "#384860")}
        style={t}
      />
      {/* Code lines on screen */}
      <line x1={210} y1={212} x2={232} y2={201} stroke={c("#A0B0C0", "#90A0B0", "#506878")} strokeWidth={1} opacity={0.7} />
      <line x1={212} y1={215} x2={228} y2={207} stroke={c("#B0C0D0", "#A0B0C0", "#607888")} strokeWidth={1} opacity={0.5} />
      <line x1={210} y1={218} x2={240} y2={203} stroke={c("#A0B0C0", "#90A0B0", "#506878")} strokeWidth={1} opacity={0.7} />
      {/* Laptop base */}
      <polygon
        points="196,226 248,200 278,215 226,241"
        fill={c("#3A3A3A", "#3A3A3A", "#2A2A2A")}
        style={t}
      />

      {/* Coffee mug (right side of desk) */}
      {/* Mug body — left face */}
      <polygon points="272,214 278,211 278,204 272,207" fill={c("#F5F5DC", "#E5E5CC", "#6A6A5C")} style={t} />
      {/* Mug — top face (ellipse approximation) */}
      <polygon points="272,204 278,201 284,204 278,207" fill={c("#3E2723", "#3E2723", "#1A0E08")} style={t} />
      {/* Mug — right face */}
      <polygon points="278,211 284,208 284,204 278,207" fill={c("#E5E5CC", "#D5D5BC", "#5A5A4C")} style={t} />
      {/* Handle */}
      <rect x={284} y={205} width={2} height={3} fill={c("#F5F5DC", "#E5E5CC", "#6A6A5C")} style={t} />
      {/* Steam */}
      <rect x={276} y={199} width={1} height={3} fill="rgba(255,255,255,0.12)">
        <animate attributeName="opacity" values="0.12;0.02;0.12" dur="3s" repeatCount="indefinite" />
      </rect>
      <rect x={278} y={197} width={1} height={3} fill="rgba(255,255,255,0.08)">
        <animate attributeName="opacity" values="0.08;0.01;0.08" dur="4s" repeatCount="indefinite" />
      </rect>

      {/* Pencil holder */}
      <polygon points="286,210 292,207 292,200 286,203" fill={c("#8B4513", "#7B3503", "#3B1503")} style={t} />
      <rect x={288} y={196} width={1} height={4} fill="#FFD700" />
      <rect x={290} y={195} width={1} height={5} fill="#4169E1" />

      {/* Desk lamp */}
      {/* Base */}
      <polygon points="260,202 272,196 280,200 268,206" fill={c("#555", "#555", "#333")} style={t} />
      {/* Arm */}
      <rect x={268} y={180} width={2} height={16} fill={c("#666", "#666", "#444")} style={t} />
      {/* Diagonal arm */}
      <line x1={269} y1={180} x2={262} y2={170} stroke={c("#666", "#666", "#444")} strokeWidth={2} />
      {/* Shade */}
      <polygon points="254,164 270,157 276,160 260,167" fill={c("#D4A868", "#C49858", "#8B6830")} style={t} />
      {/* Bulb */}
      <polygon
        points="258,167 266,163 270,165 262,169"
        fill={lightsOn ? c("#FFF8E0", "#FFE4B5", "#FFD070") : c("#888", "#888", "#555")}
        style={{ ...t, transition: "fill 0.5s ease" }}
      />

      {/* Lamp glow */}
      {lightsOn && (
        <>
          <polygon
            points="250,170 280,155 300,210 210,250"
            fill={c("rgba(255,230,150,0.03)", "rgba(255,230,150,0.06)", "rgba(255,230,150,0.16)")}
            style={t}
          >
            <animate attributeName="opacity" values="1;0.8;1" dur="3s" repeatCount="indefinite" />
          </polygon>
        </>
      )}

      {/* ==================== 11. CHAIR ==================== */}
      {/* Seat — top face */}
      <polygon
        points="190,266 220,251 240,261 210,276"
        fill={c("#555", "#555", "#333")}
        style={t}
      />
      {/* Backrest — left face */}
      <polygon
        points="190,266 220,251 220,238 190,253"
        fill={c("#4A4A4A", "#4A4A4A", "#2A2A2A")}
        style={t}
      />
      {/* Seat — left face */}
      <polygon
        points="190,266 210,276 210,280 190,270"
        fill={c("#4A4A4A", "#4A4A4A", "#2A2A2A")}
        style={t}
      />
      {/* Pedestal */}
      <rect x={212} y={280} width={2} height={8} fill={c("#666", "#666", "#444")} style={t} />
      {/* Wheel base */}
      <polygon points="204,288 220,282 228,286 212,292" fill={c("#555", "#555", "#333")} style={t} />
      {/* Wheels */}
      <rect x={206} y={290} width={2} height={2} fill={c("#444", "#444", "#222")} style={t} />
      <rect x={218} y={286} width={2} height={2} fill={c("#444", "#444", "#222")} style={t} />
      <rect x={224} y={288} width={2} height={2} fill={c("#444", "#444", "#222")} style={t} />

      {/* ==================== 12. RECORD PLAYER / SIDE TABLE ==================== */}
      {/* Table — top face */}
      <polygon
        points="290,248 320,233 348,248 318,263"
        fill={c("#C89660", "#B08850", "#4A3828")}
        style={t}
      />
      {/* Table — left face */}
      <polygon
        points="290,248 318,263 318,273 290,258"
        fill={c("#A07840", "#907038", "#3A2818")}
        style={t}
      />
      {/* Table — right face */}
      <polygon
        points="318,263 348,248 348,258 318,273"
        fill={c("#7A5830", "#705028", "#2A1808")}
        style={t}
      />
      {/* Table legs */}
      <polygon points="292,258 296,260 296,274 292,272" fill={c("#6B4226", "#5B3216", "#2B1810")} style={t} />
      <polygon points="344,258 348,256 348,270 344,272" fill={c("#5B3216", "#4B2206", "#1B0800")} style={t} />

      {/* Record on turntable */}
      <polygon points="304,240 324,230 340,238 320,248" fill="#1A1A1A" />
      {/* Record label */}
      <polygon points="312,238 320,234 328,238 320,242" fill="#CC3333">
        <animate attributeName="opacity" values="1;0.7;1" dur="8s" repeatCount="indefinite" />
      </polygon>
      {/* Tonearm */}
      <rect x={336} y={233} width={2} height={2} fill={c("#888", "#888", "#555")} style={t} />
      <line x1={337} y1={235} x2={332} y2={240} stroke={c("#888", "#888", "#555")} strokeWidth={1} />

      {/* ==================== 13. FLOOR PLANT ==================== */}
      {/* Pot — top face */}
      <polygon points="114,258 128,251 142,258 128,265" fill={c("#C88343", "#B87333", "#6A4323")} style={t} />
      {/* Pot — left face */}
      <polygon points="114,258 128,265 128,275 114,268" fill={c("#B87333", "#A86323", "#5A3313")} style={t} />
      {/* Pot — right face */}
      <polygon points="128,265 142,258 142,268 128,275" fill={c("#A86323", "#985313", "#4A2303")} style={t} />
      {/* Stems */}
      <rect x={127} y={238} width={1} height={20} fill={c("#4A7C59", "#3A6C49", "#1A3C29")} style={t} />
      <rect x={124} y={242} width={1} height={16} fill={c("#4A7C59", "#3A6C49", "#1A3C29")} style={t} />
      <rect x={130} y={244} width={1} height={14} fill={c("#4A7C59", "#3A6C49", "#1A3C29")} style={t} />
      {/* Leaf clusters */}
      <polygon points="118,230 128,225 128,238 118,243" fill={c("#5A8C69", "#4A7C59", "#2A4C39")} style={t} />
      <polygon points="128,222 138,217 138,232 128,237" fill={c("#4A7C59", "#3A6C49", "#1A3C29")} style={t} />
      <polygon points="122,236 130,232 130,244 122,248" fill={c("#6AAC79", "#5A9C69", "#3A6C49")} style={t} />
      <polygon points="130,228 140,224 140,236 130,240" fill={c("#5A8C69", "#4A7C59", "#2A4C39")} style={t} />

      {/* ==================== 14. BEDSIDE TABLE ==================== */}
      {/* Top face */}
      <polygon points="364,216 384,206 404,216 384,226" fill={c("#C89660", "#B08850", "#4A3828")} style={t} />
      {/* Left face */}
      <polygon points="364,216 384,226 384,240 364,230" fill={c("#A07840", "#907038", "#3A2818")} style={t} />
      {/* Right face */}
      <polygon points="384,226 404,216 404,230 384,240" fill={c("#7A5830", "#705028", "#2A1808")} style={t} />
      {/* Small book on top */}
      <polygon points="370,212 382,206 392,211 380,217" fill="#8B0000" />
      {/* Small plant on top */}
      <rect x={392} y={207} width={4} height={4} fill={c("#5A8C69", "#4A7C59", "#2A4C39")} style={t} />
      <rect x={390} y={204} width={3} height={3} fill={c("#6AAC79", "#5A9C69", "#3A6C49")} style={t} />
      <rect x={394} y={205} width={3} height={3} fill={c("#4A7C59", "#3A6C49", "#1A3C29")} style={t} />

      {/* ==================== 15. LIGHTING OVERLAYS ==================== */}

      {/* Window light spill on floor */}
      <polygon
        points="300,180 380,220 340,280 260,240"
        fill={c("rgba(255,255,200,0.04)", "rgba(255,150,50,0.04)", "rgba(100,130,200,0.02)")}
        style={t}
      />

      {/* Moonlight (night) — cool blue on floor near window */}
      {timeOfDay === "night" && (
        <>
          <polygon
            points="300,160 400,200 380,260 280,220"
            fill="rgba(80,110,180,0.05)"
          />
          {/* Moonlight on right wall */}
          <polygon
            points="290,60 380,100 380,170 290,130"
            fill="rgba(80,110,180,0.03)"
          />
        </>
      )}

      {/* Lamp floor spill */}
      {lightsOn && (
        <polygon
          points="200,250 280,210 320,230 240,270"
          fill={c("rgba(255,220,150,0.03)", "rgba(255,220,150,0.06)", "rgba(255,220,150,0.12)")}
          style={t}
        />
      )}

      {/* Candle glow on left wall */}
      {candleLit && (
        <>
          <polygon
            points="155,130 210,100 210,170 155,200"
            fill={c("rgba(255,153,51,0.02)", "rgba(255,153,51,0.04)", "rgba(255,153,51,0.10)")}
            style={t}
          >
            <animate attributeName="opacity" values="1;0.5;1" dur="3s" repeatCount="indefinite" />
          </polygon>
        </>
      )}

      {/* Laptop screen glow (night) */}
      {timeOfDay === "night" && (
        <polygon
          points="196,218 250,192 268,202 214,228"
          fill="rgba(130,160,255,0.05)"
        />
      )}

      {/* Lamp warm tint on left wall (night) */}
      {lightsOn && timeOfDay === "night" && (
        <polygon
          points="160,160 240,120 240,140 160,180"
          fill="rgba(255,210,140,0.04)"
        />
      )}

      {/* Global ambient overlay */}
      <rect x={0} y={0} width={480} height={380} fill={c("rgba(255,240,200,0.02)", "rgba(255,150,50,0.03)", "rgba(10,10,40,0.10)")} style={t} />
    </svg>
  );
}

"use client";

import { Bull } from "@/types/bulls";
import { cn } from "@/lib/utils";

interface BullRadarChartProps {
  bull: Bull;
  size?: number | string;
  showLabels?: boolean;
  className?: string;
}

export function BullRadarChart({ 
  bull, 
  size = 200, 
  showLabels = true,
  className 
}: BullRadarChartProps) {
  const dimensions = [
    { name: "Crecimiento", value: bull.metrics?.crecimiento || 0 },
    { name: "Reproducción", value: bull.metrics?.reproduccion || 0 },
    { name: "Moderación", value: bull.metrics?.moderacion || 0 },
    { name: "Carcasa", value: bull.metrics?.carcasa || 0 },
    { name: "Facilidad Parto", value: bull.metrics?.facilidad_parto || 0 },
  ];

  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  const radarPoints = dimensions.map((d, i) => {
    const angle = (i * 360) / dimensions.length;
    const radius = (d.value / 100) * 80;
    return polarToCartesian(100, 100, radius, angle);
  });

  const radarPath = radarPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  return (
    <div 
      className={cn("relative flex items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      {/* Background Hexagons/Pentagons */}
      <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full text-gray-100 fill-none stroke-current stroke-1">
        {[1, 0.75, 0.5, 0.25].map((scale) => {
          const points = dimensions.map((_, i) => {
            const angle = (i * 360) / dimensions.length;
            const p = polarToCartesian(100, 100, 80 * scale, angle);
            return `${p.x},${p.y}`;
          }).join(' ');
          return <polygon key={scale} points={points} />;
        })}
        {/* Axis lines */}
        {dimensions.map((_, i) => {
          const angle = (i * 360) / dimensions.length;
          const p = polarToCartesian(100, 100, 80, angle);
          return <line key={i} x1="100" y1="100" x2={p.x} y2={p.y} />;
        })}
      </svg>

      {/* Data Polygon */}
      <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full drop-shadow-[0_0_10px_rgba(54,226,123,0.3)]">
        <path 
          d={radarPath} 
          fill="rgba(54, 226, 123, 0.2)" 
          stroke="#36E27B" 
          strokeWidth="3" 
          strokeLinejoin="round" 
        />
        {radarPoints.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="4" fill="#36E27B" />
        ))}
      </svg>

      {/* Labels */}
      {showLabels && dimensions.map((d, i) => {
        const angle = (i * 360) / dimensions.length;
        const p = polarToCartesian(100, 100, 95, angle);
        return (
          <span 
            key={i} 
            className="absolute text-[9px] font-bold text-gray-400 uppercase text-center w-16"
            style={{ 
              left: `${p.x/2}%`, 
              top: `${p.y/2}%`, 
              transform: 'translate(-50%, -50%)' 
            }}
          >
            {d.name}
          </span>
        );
      })}
    </div>
  );
}

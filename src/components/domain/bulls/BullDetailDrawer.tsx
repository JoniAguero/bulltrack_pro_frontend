"use client";

import { X, MapPin, Award, Zap, Ruler, Beaker, FileText, ChevronRight, Heart, Share2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Bull } from "@/types/bulls";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { t } from "@/lib/i18n";
import { useEffect, useState } from "react";

interface BullDetailDrawerProps {
  bull?: Bull;
  isOpen: boolean;
}

export function BullDetailDrawer({ bull, isOpen }: BullDetailDrawerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("bullId");
      router.replace(`?${params.toString()}`, { scroll: false });
      setIsClosing(false);
    }, 300);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen && !isClosing) return null;

  if (!bull) return null;

  // Radar Chart Data Calculation
  const dimensions = [
    { name: "Crecimiento", value: bull.metrics?.crecimiento || 0, color: "#36E27B" },
    { name: "Reproducción", value: bull.metrics?.reproduccion || 0, color: "#3B82F6" },
    { name: "Moderación", value: bull.metrics?.moderacion || 0, color: "#F59E0B" },
    { name: "Carcasa", value: bull.metrics?.carcasa || 0, color: "#EF4444" },
    { name: "Facilidad Parto", value: bull.metrics?.facilidad_parto || 0, color: "#8B5CF6" },
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
    <div className={cn(
      "fixed inset-0 z-[100] flex justify-end",
      isClosing ? "pointer-events-none" : ""
    )}>
      {/* Backdrop */}
      <div 
        className={cn(
          "absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300",
          isOpen && !isClosing ? "opacity-100" : "opacity-0"
        )}
        onClick={handleClose}
      />

      {/* Drawer Panel */}
      <div className={cn(
        "relative w-full max-w-[550px] bg-white h-screen shadow-2xl overflow-y-auto overflow-x-hidden no-scrollbar transition-transform duration-300 transform",
        isOpen && !isClosing ? "translate-x-0" : "translate-x-full"
      )}>
        
        {/* Sticky Header Actions */}
        <div className="sticky top-0 z-10 flex justify-between items-center p-4 md:p-6 bg-transparent">
           <button 
             onClick={handleClose}
             className="h-10 w-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-all shadow-lg"
           >
             <X className="h-6 w-6" />
           </button>
           <div className="flex gap-2">
              <button className="h-10 w-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-all shadow-lg">
                <Share2 className="h-5 w-5" />
              </button>
              <button className="h-10 w-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-[#36E27B] hover:text-white transition-all shadow-lg">
                <Heart className={cn("h-5 w-5", bull.isFavorite && "fill-current")} />
              </button>
           </div>
        </div>

        {/* Hero Section */}
        <div className="mt-[-88px] relative h-[350px] w-full bg-gray-900">
           <img 
             src={bull.photoUrl || "https://images.unsplash.com/photo-1541689221361-ad95003448dc?q=80&w=2670&auto=format&fit=crop"} 
             alt={bull.name} 
             className="h-full w-full object-cover opacity-80"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
           
           <div className="absolute bottom-8 left-8 right-8">
              <Badge variant="secondary" className="mb-3 bg-emerald-500 text-white border-none px-3 py-1 font-bold">
                 {t("origen", bull.source)}
              </Badge>
              <h2 className="text-4xl font-black text-gray-900 tracking-tighter uppercase mb-1">Toro # {bull.caravana}</h2>
              <p className="text-gray-600 font-medium text-lg">
                 {bull.breed} • {bull.birthDate} meses
              </p>
           </div>
        </div>

        {/* Content Section */}
        <div className="px-8 pb-12 space-y-8">
           
           {/* BT Score Macro */}
           <div className="bg-gray-900 rounded-[32px] p-8 text-white flex items-center justify-between shadow-xl overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#36E27B] opacity-10 blur-3xl transform translate-x-10 translate-y-[-10]" />
              <div>
                 <p className="text-[#36E27B] font-bold text-xs uppercase tracking-[3px] mb-2">Desempeño General</p>
                 <h3 className="text-3xl font-bold mb-1">Bulltrack Score</h3>
                 <p className="text-gray-400 text-sm max-w-[200px]">Calificación basada en objetivos de producción</p>
              </div>
              <div className="relative">
                 <div className="h-24 w-24 rounded-full border-[8px] border-white/5 flex items-center justify-center">
                    <span className="text-4xl font-black text-[#36E27B]">{bull.bullScore.toFixed(1)}</span>
                 </div>
                 <svg className="absolute inset-0 h-24 w-24 transform -rotate-90">
                    <circle 
                      cx="48" cy="48" r="40" 
                      fill="none" 
                      stroke="#36E27B" 
                      strokeWidth="8" 
                      strokeDasharray={`${(bull.bullScore / 100) * 251.2} 251.2`}
                      strokeLinecap="round"
                    />
                 </svg>
              </div>
           </div>

           {/* Metrics Grid */}
           <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 flex flex-col gap-3">
                 <div className="h-10 w-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <Zap className="h-5 w-5" />
                 </div>
                 <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Crecimiento</p>
                    <p className="text-xl font-bold text-gray-900">{bull.metrics?.crecimiento || 0}%</p>
                 </div>
              </div>
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 flex flex-col gap-3">
                 <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                    <Beaker className="h-5 w-5" />
                 </div>
                 <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Reproducción</p>
                    <p className="text-xl font-bold text-gray-900">{bull.metrics?.reproduccion || 0}%</p>
                 </div>
              </div>
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 flex flex-col gap-3">
                 <div className="h-10 w-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
                    <Ruler className="h-5 w-5" />
                 </div>
                 <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Moderación</p>
                    <p className="text-xl font-bold text-gray-900">{bull.metrics?.moderacion || 0}%</p>
                 </div>
              </div>
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 flex flex-col gap-3">
                 <div className="h-10 w-10 rounded-xl bg-red-100 flex items-center justify-center text-red-600">
                    <Award className="h-5 w-5" />
                 </div>
                 <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Carcasa</p>
                    <p className="text-xl font-bold text-gray-900">{bull.metrics?.carcasa || 0}%</p>
                 </div>
              </div>
           </div>

           {/* Radar Chart Section */}
           <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm flex flex-col items-center">
              <h4 className="text-gray-900 font-bold mb-6 flex items-center gap-2">
                 <Zap className="h-4 w-4 text-emerald-500" />
                 Perfil de Aptitudes
              </h4>
              
              <div className="relative h-[250px] w-[250px] flex items-center justify-center mb-6">
                 {/* Background Hexagons */}
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
                 {dimensions.map((d, i) => {
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
           </div>

           {/* Additional Details */}
           <div className="space-y-4">
              <h4 className="text-gray-900 font-bold flex items-center gap-2">
                 <FileText className="h-4 w-4 text-emerald-500" />
                 Características Destacadas
              </h4>
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 text-gray-600 text-sm leading-relaxed">
                 {bull.highlightedCharacteristic || "Este reproductor destaca por su precocidad reproductiva y excelente conformación de carcasa, ideal para programas de mejoramiento intensivos."}
              </div>
           </div>

           {/* Actions Footer */}
           <div className="flex gap-4 pt-4">
              <Button className="flex-1 bg-gray-900 text-white rounded-xl h-14 font-bold text-lg hover:bg-gray-800 transition-all shadow-lg active:scale-95">
                 Contactar Propietario
              </Button>
              <Button variant="outline" className="flex-1 border-gray-200 text-gray-700 rounded-xl h-14 font-bold text-lg hover:bg-gray-50 transition-all active:scale-95 flex gap-2">
                 <FileText className="h-5 w-5" />
                 Ficha completa
              </Button>
           </div>
        </div>
      </div>
    </div>
  );
}

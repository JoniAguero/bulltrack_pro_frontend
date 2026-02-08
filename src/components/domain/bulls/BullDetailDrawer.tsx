"use client";

import { X, MapPin, Award, Zap, Ruler, Beaker, FileText, ChevronRight, Heart, Share2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Bull } from "@/types/bulls";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { t } from "@/lib/i18n";
import { FavoriteButton } from "./FavoriteButton";
import { BullRadarChart } from "./BullRadarChart";
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
    const params = new URLSearchParams(searchParams.toString());
    params.delete("bullId");
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsClosing(false);
    } else {
      document.body.style.overflow = 'unset';
      // If isOpen becomes false but it wasn't triggered by handleClose,
      // we still might want to show the closing animation if we were open
      const timer = setTimeout(() => {
        setIsClosing(false);
      }, 300);
      return () => clearTimeout(timer);
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen && !isClosing) return null;

  if (!bull) return null;

  return (
    <div className={cn(
      "fixed inset-0 z-[100] flex justify-end",
      isClosing ? "pointer-events-none" : ""
    )}>
      <div 
        className={cn(
          "absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300",
          isOpen && !isClosing ? "opacity-100" : "opacity-0"
        )}
        onClick={handleClose}
      />

      <div className={cn(
        "relative w-full max-w-[550px] bg-white h-screen shadow-2xl overflow-y-auto overflow-x-hidden no-scrollbar transition-transform duration-300 transform",
        isOpen && !isClosing ? "translate-x-0" : "translate-x-full"
      )}>
        
        <div className="sticky top-0 z-10 flex justify-between items-center p-4 md:p-6 bg-transparent">
           <button 
             onClick={handleClose}
             className="cursor-pointer h-10 w-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-all shadow-lg"
           >
             <X className="h-6 w-6" />
           </button>
           <div className="flex gap-2">
              <button className="cursor-pointer h-10 w-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-all shadow-lg">
                <Share2 className="h-5 w-5" />
              </button>
              <FavoriteButton 
                bullId={bull.id} 
                initialIsFavorite={bull.isFavorite || false} 
                className={cn(
                  "h-10 w-10 bg-white/20 backdrop-blur-md border-none flex items-center justify-center shadow-lg transition-all",
                  bull.isFavorite 
                    ? "bg-red-500 text-white hover:bg-red-600" 
                    : "text-white hover:bg-white/30"
                )} 
              />
           </div>
        </div>

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

        <div className="px-8 pb-12 space-y-8">
           
           <div className="bg-gray-900 rounded-[32px] p-8 text-white flex items-center justify-between shadow-xl overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#36E27B] opacity-10 blur-3xl transform translate-x-10 translate-y-[-10]" />
              <div>
                 <p className="text-[#36E27B] font-bold text-xs uppercase tracking-[3px] mb-2">Desempeño General</p>
                 <h3 className="text-3xl font-bold mb-1">Bulltrack Score</h3>
                 <p className="text-gray-400 text-sm max-w-[200px]">Calificación basada en objetivos de producción</p>
              </div>
              <div className="relative">
                 <div className="h-28 w-28 rounded-full border-[8px] border-white/5 flex items-center justify-center">
                    <span className="text-3xl font-black text-[#36E27B]">{bull.bullScore.toFixed(1)}</span>
                 </div>
                 <svg className="absolute inset-0 h-28 w-28 transform -rotate-90" viewBox="0 0 100 100">
                    <circle 
                      cx="50" cy="50" r="44" 
                      fill="none" 
                      stroke="#36E27B" 
                      strokeWidth="8" 
                      strokeDasharray={`${(bull.bullScore / 100) * 276.4} 276.4`}
                      strokeLinecap="round"
                    />
                 </svg>
              </div>
           </div>

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

           <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm flex flex-col items-center">
              <h4 className="text-gray-900 font-bold mb-6 flex items-center gap-2">
                 <Zap className="h-4 w-4 text-emerald-500" />
                 Perfil de Aptitudes
              </h4>
              
              <BullRadarChart 
                bull={bull} 
                size={250} 
                showLabels={true} 
                className="mb-6"
              />
           </div>

           <div className="space-y-4">
              <h4 className="text-gray-900 font-bold flex items-center gap-2">
                 <FileText className="h-4 w-4 text-emerald-500" />
                 Características Destacadas
              </h4>
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 text-gray-600 text-sm leading-relaxed">
                 {bull.highlightedCharacteristic || "Este reproductor destaca por su precocidad reproductiva y excelente conformación de carcasa, ideal para programas de mejoramiento intensivos."}
              </div>
           </div>

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

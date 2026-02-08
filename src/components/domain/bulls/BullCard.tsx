"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Bull } from "@/types/bulls";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Eye } from "lucide-react";
import { FavoriteButton } from "./FavoriteButton";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { BullRadarChart } from "./BullRadarChart";
import { t } from "@/lib/i18n";

interface BullCardProps {
  bull: Bull & { rank: number; isFavorite?: boolean };
}

export function BullCard({ bull }: BullCardProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const openDetail = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("bullId", bull.id.toString());
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <Card className="border-none shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-shadow bg-white">
      <CardContent className="p-0 flex flex-col md:flex-row items-stretch md:items-center md:h-28">
        
        <div className="px-5 py-3 md:pl-6 md:pr-4 flex items-center justify-between md:justify-start gap-4 bg-gray-50 md:bg-transparent border-b md:border-b-0 border-gray-100">
           <div className="flex items-center gap-4">
              <div className="h-5 w-5 rounded border border-blue-500 flex items-center justify-center cursor-pointer">
              </div>
              
              <span className="text-2xl md:text-3xl font-bold text-gray-700 md:w-10">#{bull.rank}</span>
           </div>
           
           <span className="md:hidden font-bold text-gray-900">Toro # {bull.caravana}</span>
        </div>

        <div className="flex flex-1 items-center p-3 md:p-0">
          <div className="md:py-3 md:pr-4">
            <div className="h-16 w-16 md:h-20 md:w-20 rounded-lg overflow-hidden bg-gray-100 shrink-0">
              <img 
                src={bull.photoUrl || "https://images.unsplash.com/photo-1541689221361-ad95003448dc?q=80&w=2670&auto=format&fit=crop"} 
                alt={bull.name} 
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="flex-1 ml-4 md:ml-0 md:py-3 md:pr-6 flex flex-col justify-center min-w-[150px]">
            <h3 className="hidden md:block font-bold text-gray-900 text-xl leading-tight mb-1">Toro # {bull.caravana}</h3>
            <p className="text-gray-500 text-xs md:text-sm mb-1.5 md:mb-2">
               {bull.breed} • {bull.birthDate ? `${bull.birthDate} meses` : "N/A"}
            </p>
            <div className="flex flex-wrap gap-1.5 md:gap-2">
               <span className={cn(
                  "text-[9px] md:text-[10px] px-2 py-0.5 rounded border font-medium",
                  bull.source === 'PROPIO' ? "border-emerald-500 text-emerald-600 bg-emerald-50" : "border-emerald-200 text-emerald-600 bg-emerald-50"
               )}>
                  {t("origen", bull.source)}
               </span>
               {bull.characteristics?.slice(0, 1).map((char, i) => (
                  <span key={i} className="text-[9px] md:text-[10px] px-2 py-0.5 rounded border border-blue-200 text-blue-600 bg-blue-50 font-medium whitespace-nowrap">
                     {t("characteristics", char.name)}
                  </span>
               ))}
            </div>
          </div>
        </div>

        <div className="hidden md:block h-16 w-px bg-gray-200 mx-2" />

        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-[260px] lg:w-[300px] px-5 py-3 md:px-6 md:py-3 flex flex-col justify-center border-t md:border-t-0 border-gray-100">
            <div className="flex justify-between items-end mb-1">
              <span className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t("ui", "bullScore")}</span>
              <span className="text-xl md:text-2xl font-medium text-gray-900">{bull.bullScore.toFixed(1)}</span>
            </div>
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden mb-1">
              <div 
                className="h-full bg-emerald-500 rounded-full"
                style={{ width: `${Math.min(bull.bullScore, 100)}%` }} 
              />
            </div>
            <p className="text-[10px] md:text-xs text-gray-500 truncate mt-1">
               {t("characteristics", bull.characteristics?.[0]?.name || "Desempeño destacado")}
            </p>
          </div>

          <div className="hidden lg:flex flex-col items-center justify-center px-4">
             <BullRadarChart 
               bull={bull} 
               size={80} 
               showLabels={false} 
               className="mb-1"
             />
             <p className="text-[10px] text-gray-400 font-medium uppercase tracking-tighter">
                Perfil de Aptitudes
             </p>
          </div>
        </div>

        {/* Actions - Now moved to the right with md:pr-6 padding */}
        <div className="w-full md:w-auto flex flex-row md:flex-col items-center justify-center gap-3 md:gap-2 px-5 py-3 md:pl-4 md:pr-6 md:py-0 bg-gray-50 md:bg-transparent border-t md:border-t-0 border-gray-100 ml-auto">
          <Button 
            onClick={openDetail}
            size="icon" 
            className="h-9 w-9 md:h-8 md:w-8 rounded-full bg-gray-900 text-white hover:bg-gray-700 shadow-sm p-2 cursor-pointer border-none transition-all duration-200 hover:shadow-md"
          >
             <Eye className="h-full w-full" />
          </Button>
          <FavoriteButton bullId={bull.id} initialIsFavorite={bull.isFavorite || false} />
        </div>
         
      </CardContent>
    </Card>
  );
}

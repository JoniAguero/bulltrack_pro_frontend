"use client";

import { Bull } from "@/types/bulls";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button"; 
import { Eye } from "lucide-react";
import { FavoriteButton } from "./FavoriteButton";
import { cn } from "@/lib/utils";
import { t } from "@/lib/i18n";

import { useRouter, useSearchParams } from "next/navigation";

interface BullGridCardProps {
  bull: Bull & { rank: number; isFavorite?: boolean }; 
}

export function BullGridCard({ bull }: BullGridCardProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const openDetail = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("bullId", bull.id.toString());
    router.replace(`?${params.toString()}`, { scroll: false });
  };
  return (
    <Card className="group border-none shadow-sm rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 bg-white flex flex-col h-full">
      <CardContent className="p-0 flex flex-col h-full relative">
        
        {/* 1. Image and Overlays */}
        <div className="relative h-48 md:h-56 overflow-hidden bg-gray-100">
           <img 
             src={bull.photoUrl || "https://images.unsplash.com/photo-1541689221361-ad95003448dc?q=80&w=2670&auto=format&fit=crop"} 
             alt={bull.name} 
             className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
           />
           
           {/* Gradient Overlay */}
           <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

           {/* Rank Badge */}
           <div className="absolute top-3 left-3 bg-gray-900/90 backdrop-blur-md text-white px-2.5 py-1 rounded-lg font-bold text-sm shadow-lg border border-white/20">
              #{bull.rank}
           </div>

           {/* Favorite Button Overlay */}
           <div className="absolute top-3 right-3 transform translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <FavoriteButton bullId={bull.id} initialIsFavorite={bull.isFavorite || false} />
           </div>

           {/* Quick Action Button */}
            <div className="absolute bottom-3 right-3 transform translate-y-[10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <Button 
                onClick={openDetail}
                size="icon" 
                className="h-9 w-9 rounded-full bg-white/90 backdrop-blur-sm text-gray-900 hover:bg-emerald-500 hover:text-white shadow-xl p-2 border-none cursor-pointer transition-all duration-200"
              >
                 <Eye className="h-full w-full" />
              </Button>
            </div>
        </div>

        {/* 2. Content */}
        <div className="p-4 md:p-5 flex flex-col flex-1">
           <div className="flex justify-between items-start mb-2">
              <div>
                 <h3 className="font-bold text-gray-900 text-lg leading-tight uppercase tracking-tight">Toro # {bull.caravana}</h3>
                 <p className="text-gray-500 text-xs mt-0.5">
                    {bull.breed} • {bull.birthDate ? `${bull.birthDate} meses` : "N/A"}
                 </p>
              </div>
              <div className="text-right">
                 <span className="text-2xl font-black text-gray-900 leading-none">{bull.bullScore.toFixed(1)}</span>
                 <p className="text-[8px] font-bold text-gray-400 uppercase tracking-tighter">BT Score</p>
              </div>
           </div>

           {/* Characteristics Tags */}
           <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-gray-50">
              <span className={cn(
                 "text-[9px] px-2 py-0.5 rounded border font-bold uppercase",
                 bull.source === 'PROPIO' ? "border-emerald-500 text-emerald-600 bg-emerald-50" : "border-emerald-200 text-emerald-600 bg-emerald-50"
              )}>
                 {t("origen", bull.source)}
              </span>
              {bull.characteristics?.slice(0, 1).map((char, i) => (
                 <span key={i} className="text-[9px] px-2 py-0.5 rounded border border-blue-200 text-blue-600 bg-blue-50 font-bold uppercase whitespace-nowrap">
                    {t("characteristics", char.name)}
                 </span>
              ))}
           </div>
        </div>
         
      </CardContent>
    </Card>
  );
}

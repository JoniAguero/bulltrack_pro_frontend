import { Bull } from "@/types/bulls";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Eye } from "lucide-react";
import { FavoriteButton } from "./FavoriteButton";
import { cn } from "@/lib/utils";

interface BullCardProps {
  bull: Bull & { rank: number; isFavorite?: boolean }; // Inject rank for display
}

export function BullCard({ bull }: BullCardProps) {
  return (
    <Card className="border-none shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-shadow bg-white">
      <CardContent className="p-0 flex items-center h-28">
        
        {/* 1. Selection & Rank */}
        <div className="pl-6 pr-4 flex items-center gap-4">
           {/* Selection Checkbox */}
           <div className="h-5 w-5 rounded border border-blue-500 flex items-center justify-center cursor-pointer">
              {/* Checked state would go here */}
           </div>
           
           {/* Rank */}
           <span className="text-3xl font-bold text-gray-700 w-10">#{bull.rank}</span>
        </div>

        {/* 2. Image */}
        <div className="py-3 pr-4">
          <div className="h-20 w-20 rounded-lg overflow-hidden bg-gray-100 shrink-0">
            <img 
              src={bull.photoUrl || "https://images.unsplash.com/photo-1541689221361-ad95003448dc?q=80&w=2670&auto=format&fit=crop"} 
              alt={bull.name} 
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* 3. Info */}
        <div className="flex-1 py-3 pr-6 flex flex-col justify-center min-w-[200px]">
          <h3 className="font-bold text-gray-900 text-xl leading-tight mb-1">Toro # {bull.caravana}</h3>
          <p className="text-gray-500 text-sm mb-2">
             {bull.breed} • {bull.birthDate ? `${bull.birthDate} meses` : "N/A"}
          </p>
          <div className="flex gap-2">
             <span className={cn(
                "text-[10px] px-2 py-0.5 rounded border font-medium",
                bull.source === 'PROPIO' ? "border-emerald-500 text-emerald-600 bg-emerald-50" : "border-emerald-200 text-emerald-600 bg-emerald-50"
             )}>
                {bull.source === 'PROPIO' ? 'Propio' : 'Catálogo'}
             </span>
             {bull.characteristics?.slice(0, 2).map((char, i) => (
                <span key={i} className="text-[10px] px-2 py-0.5 rounded border border-blue-200 text-blue-600 bg-blue-50 font-medium">
                   {char.name}
                </span>
             ))}
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="h-16 w-px bg-gray-200 mx-2" />

        {/* 4. Score */}
        <div className="w-[300px] px-6 py-3 flex flex-col justify-center">
          <div className="flex justify-between items-end mb-1">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">BULL SCORE</span>
            <span className="text-2xl font-medium text-gray-900">{bull.bullScore.toFixed(1)}</span>
          </div>
          <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden mb-1">
            <div 
              className="h-full bg-emerald-500 rounded-full"
              style={{ width: `${Math.min(bull.bullScore, 100)}%` }} 
            />
          </div>
          <p className="text-xs text-gray-500 truncate mt-1">
             {bull.characteristics?.[0]?.name || "Desempeño destacado"}
          </p>
        </div>

        {/* 5. Radar Chart (Visual Approximation) */}
        <div className="w-24 h-24 flex items-center justify-center p-2 relative">
             <div className="absolute inset-0 flex items-center justify-center">
                {/* Background Pentagon */}
                <svg viewBox="0 0 100 100" className="w-20 h-20 text-gray-100 fill-current">
                   <polygon points="50,5 95,35 75,90 25,90 5,35" />
                </svg>
             </div>
             <div className="absolute inset-0 flex items-center justify-center">
                {/* Data Pentagon (Green Outline) */}
                <svg viewBox="0 0 100 100" className="w-20 h-20 text-emerald-400 fill-none stroke-current stroke-2 drop-shadow-sm">
                   <polygon points="50,15 85,40 70,80 30,80 15,40" fill="rgba(52, 211, 153, 0.1)" />
                </svg>
             </div>
        </div>

         {/* 6. Actions */}
         <div className="w-16 flex flex-col items-center justify-center gap-2 pr-4 pl-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-gray-900 text-white hover:bg-gray-800 shadow-sm p-1.5">
               <Eye className="h-full w-full" />
            </Button>
            <FavoriteButton bullId={bull.id} initialIsFavorite={bull.isFavorite || false} />
         </div>
         
      </CardContent>
    </Card>
  );
}

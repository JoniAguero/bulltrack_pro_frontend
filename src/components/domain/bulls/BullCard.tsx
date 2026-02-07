import { Bull } from "@/types/bulls";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Eye, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface BullCardProps {
  bull: Bull & { rank: number }; // Inject rank for display
}

export function BullCard({ bull }: BullCardProps) {
  return (
    <Card className="border-none shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-0 flex items-stretch">
        
        {/* Checkbox Strip */}
        <div className="w-12 bg-white flex items-center justify-center border-r border-gray-50">
          <div className="h-4 w-4 rounded border border-gray-300 ring-offset-2 ring-violet-500 cursor-pointer hover:border-emerald-500" />
        </div>

        {/* Rank Badge */}
        <div className="w-16 flex items-center justify-center text-xl font-bold text-gray-400">
          #{bull.rank}
        </div>

        {/* Image */}
        <div className="w-24 py-4">
          <div className="h-16 w-16 rounded-xl bg-gray-200 overflow-hidden relative">
            <img 
              src={bull.photoUrl || "https://images.unsplash.com/photo-1541689221361-ad95003448dc?q=80&w=2670&auto=format&fit=crop"} 
              alt={bull.name} 
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 py-4 flex flex-col justify-center gap-1">
          <h3 className="font-bold text-gray-900 text-lg">{bull.caravana || bull.name}</h3>
          <p className="text-gray-500 text-sm">
             {bull.breed} • {bull.birthDate ? "36 meses" : "N/A"} {/* Todo: calc age */}
          </p>
          <div className="flex gap-2 mt-1">
             <Badge variant="outline-green" className="text-[10px] h-5 rounded px-2 font-medium bg-white">
                {bull.source === 'PROPIO' ? 'Propio' : 'Catálogo'}
             </Badge>
             {/* Render traits as badges if available, limit to 1 for space */}
             {bull.characteristics?.slice(0, 1).map((char, i) => (
                <Badge key={i} variant="outline-purple" className="text-[10px] h-5 rounded px-2 font-medium bg-white">
                   {char.name}
                </Badge>
             ))}
          </div>
        </div>

        {/* Score */}
        <div className="w-48 py-4 flex flex-col justify-center border-l border-gray-50 px-6">
          <div className="flex justify-between items-end mb-1">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Bull Score</span>
            <span className="text-xl font-bold text-gray-900">{bull.bullScore.toFixed(1)}</span>
          </div>
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.3)] transition-all duration-500"
              style={{ width: `${Math.min(bull.bullScore * 10, 100)}%` }} // Scaling 0-10 score to %
            />
          </div>
          <p className="text-xs text-gray-500 mt-2 truncate">
             Top 1% de facilidad de parto
          </p>
        </div>

        {/* Radar Placeholder */}
        <div className="w-32 py-4 flex items-center justify-center border-l border-gray-50">
          <div className="h-16 w-16 relative opacity-70">
            <svg viewBox="0 0 100 100" className="w-full h-full text-emerald-500 fill-none stroke-current stroke-2">
               <path d="M50 5 L90 25 L90 75 L50 95 L10 75 L10 25 Z" />
               <path d="M50 20 L80 35 L80 65 L50 80 L20 65 L20 35 Z" fill="rgba(16,185,129,0.1)" />
            </svg>
          </div>
        </div>

         {/* Actions */}
         <div className="w-20 flex flex-col items-center justify-center gap-2 border-l border-gray-50 pr-4">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-gray-900 text-white hover:bg-gray-700">
               <Eye className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200">
               <Heart className="h-4 w-4" />
            </Button>
         </div>
      </CardContent>
    </Card>
  );
}

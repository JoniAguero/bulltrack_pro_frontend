"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { ChevronDown, Check, ArrowLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

// Helper for the Card style seen in screenshots
const FilterCard = ({ children, className, onClick, isSelected }: { children: React.ReactNode, className?: string, onClick?: () => void, isSelected?: boolean }) => (
  <div 
     onClick={onClick}
     className={cn(
       "bg-[#152B1E] p-4 rounded-xl flex items-center justify-between cursor-pointer border transition-all", 
       isSelected ? "border-[#36E27B]" : "border-transparent",
       className
     )}
  >
     {children}
  </div>
);

const Checkbox = ({ checked }: { checked: boolean }) => (
  <div className={cn(
     "h-6 w-6 rounded-[5px] flex items-center justify-center transition-colors border-2",
     checked ? "bg-[#36E27B] border-[#36E27B] text-black shadow-sm" : "bg-transparent border-[#36E27B]/50"
  )}>
      {checked && <Check className="h-4 w-4 stroke-[3]" />}
  </div>
);

export function Sidebar({ className }: { className?: string }) {
  return (
    <Suspense fallback={<div className="w-80 bg-[#111714]" />}>
      <SidebarContent className={className} />
    </Suspense>
  );
}

function SidebarContent({ className }: { className?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleOriginChange = (mode: 'source' | 'favorites' | 'all', value?: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (mode === 'all') {
      params.delete("source");
      params.delete("favorites");
    } 
    else if (mode === 'source' && value) {
      if (searchParams.get("source") === value) {
         params.delete("source");
      } else {
         params.set("source", value);
         params.delete("favorites");
      }
    }
    else if (mode === 'favorites') {
       if (searchParams.get("favorites") === "true") {
          params.delete("favorites");
       } else {
          params.set("favorites", "true");
          params.delete("source");
       }
    }
    router.replace(`?${params.toString()}`);
  };

  const isActive = (key: string, value: string) => searchParams.get(key) === value;
  const isFavoritesActive = searchParams.get("favorites") === "true";

  return (
    <div className={cn("flex flex-col h-screen w-80 bg-[#111714] text-white p-6 border-none overflow-y-auto overflow-x-hidden no-scrollbar", className)}>
      {/* Brand */}
      <div className="flex items-center gap-3 mb-8 px-1">
        <div className="h-8 w-8 rounded-full bg-[#36E27B] flex items-center justify-center text-white font-bold">
          B
        </div>
        <span className="text-xl font-bold tracking-tight">Bulltrack</span>
      </div>

      <div className="flex-1 flex flex-col gap-6">
        
        <div className="space-y-3">
             <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block px-1">
                Origen
             </label>

             <FilterCard onClick={() => handleOriginChange("all")} isSelected={!searchParams.get("source") && !isFavoritesActive}>
                 <span className="text-sm font-medium text-gray-200">Todos</span>
                 <Checkbox checked={!searchParams.get("source") && !isFavoritesActive} />
             </FilterCard>

             <FilterCard onClick={() => handleOriginChange("source", "PROPIO")} isSelected={isActive("source", "PROPIO")}>
                 <span className="text-sm font-medium text-gray-200">Toros propios</span>
                 <Checkbox checked={isActive("source", "PROPIO")} />
             </FilterCard>
              
             <FilterCard onClick={() => handleOriginChange("source", "CATALOGO")} isSelected={isActive("source", "CATALOGO")}>
                 <span className="text-sm font-medium text-gray-200">Catálogo</span>
                 <Checkbox checked={isActive("source", "CATALOGO")} />
             </FilterCard>
 
             <FilterCard onClick={() => handleOriginChange("favorites")} isSelected={isFavoritesActive}>
                 <span className="text-sm font-medium text-gray-200">Favoritos</span>
                 <Checkbox checked={isFavoritesActive} />
             </FilterCard>
        </div>
         
      <div className="h-px bg-white/30 w-full" />
 
        <div className="space-y-3">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block px-1">
             Filtros Productivos
          </label>
          <FilterCard>
             <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-200">Para vaquillona</span>
                <span className="text-xs text-gray-500 mt-0.5">Facilidad de parto</span>
             </div>
             {/* Toggle Switch */}
             <div className="w-12 h-6 bg-[#36E27B] rounded-full relative cursor-pointer">
                <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-black rounded-full shadow-sm" />
             </div>
          </FilterCard>

          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block px-1 pt-2">
             Pelaje
          </label>
          <FilterCard>
              <div className="flex flex-col">
                 <span className="text-sm font-medium text-gray-200">Todos</span>
              </div>
              <ChevronDown className="h-5 w-5 text-[#36E27B]" />
          </FilterCard>
        </div>

         {/* Group: Ordenamiento */}
         <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block px-1">
               Ordenamiento
            </label>
            <FilterCard>
              <div className="flex flex-col">
                 <span className="text-sm font-medium text-gray-200">Score mejor a peor</span>
              </div>
              <ChevronDown className="h-5 w-5 text-[#36E27B]" />
            </FilterCard>
        </div>
      </div>
      
      <div className="h-px bg-white/30 w-full my-6" /> 

       <div>
          <div className="p-5 rounded-2xl bg-[#152B1E] space-y-4 border border-[#1f2b28]">
            <h4 className="text-white font-bold text-sm">Objetivo actual</h4>
            <p className="text-sm text-gray-400 leading-relaxed">
               Maximizar la ganancia de peso (destete) manteniendo facilidad de parto.
            </p>
            <Button 
               variant="outline" 
               className="w-full justify-between bg-transparent border-[#36E27B]/50 text-[#36E27B] hover:bg-[#36E27B]/10 hover:text-[#36E27B] h-10 rounded-xl"
            >
               <ArrowLeft className="h-4 w-4" />
               <span className="text-sm font-medium">Editar criterios</span>
            </Button>
          </div>
       </div>
    </div>
  );
}

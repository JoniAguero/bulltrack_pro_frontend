"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Settings, ChevronDown, Check, ArrowLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

// Helper for the Card style seen in screenshots
const FilterCard = ({ children, className, onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) => (
  <div 
     onClick={onClick}
     className={cn(
       "bg-[#161E1C] p-4 rounded-xl flex items-center justify-between cursor-pointer border border-transparent hover:border-emerald-500/30 transition-all", 
       className
     )}
  >
     {children}
  </div>
);

// Helper for the Checkbox square
const Checkbox = ({ checked }: { checked: boolean }) => (
  <div className={cn(
     "h-6 w-6 rounded-md flex items-center justify-center transition-colors",
     checked ? "bg-emerald-500 text-black shadow-sm" : "bg-transparent border border-emerald-500/50"
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

  const handleFilterChange = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value === null) {
      params.delete(key);
    } else {
      // If same value clicked, toggle off (optional, but standard behavior)
      if (params.get(key) === value) {
         params.delete(key);
      } else {
         params.set(key, value);
      }
    }
    router.replace(`?${params.toString()}`);
  };

  const isActive = (key: string, value: string) => searchParams.get(key) === value;

  return (
    <div className={cn("flex flex-col h-screen w-80 bg-[#111714] text-white p-6 border-none overflow-y-auto overflow-x-hidden no-scrollbar", className)}>
      {/* Brand */}
      <div className="flex items-center gap-3 mb-8 px-1">
        <div className="h-8 w-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold">
          B
        </div>
        <span className="text-xl font-bold tracking-tight">Bulltrack</span>
      </div>

      {/* Main Navigation (Scrollable) */}
      <div className="flex-1 space-y-8">
        
        {/* Section: Filtros Activos (Actually Filter Groups) */}
        
        {/* Group: Origen */}
        <div className="space-y-3">
             <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block px-1">
                Origen
             </label>
             {/* Todos */}
             <FilterCard onClick={() => handleFilterChange("source", null)}>
                 <span className="text-sm font-medium text-gray-200">Todos</span>
                 <Checkbox checked={!searchParams.get("source")} />
             </FilterCard>

             {/* Toros propios */}
             <FilterCard onClick={() => handleFilterChange("source", "PROPIO")}>
                 <span className="text-sm font-medium text-gray-200">Toros propios</span>
                 <Checkbox checked={isActive("source", "PROPIO")} />
             </FilterCard>
             
             {/* Catálogo */}
             <FilterCard onClick={() => handleFilterChange("source", "CATALOGO")}>
                 <span className="text-sm font-medium text-gray-200">Catálogo</span>
                 <Checkbox checked={isActive("source", "CATALOGO")} />
             </FilterCard>

             {/* Favoritos */}
             <FilterCard>
                 <span className="text-sm font-medium text-gray-200">Favoritos</span>
                 <Checkbox checked={false} />
             </FilterCard>
        </div>

        {/* Group: Pelaje / Productivos */}
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
             <div className="w-12 h-6 bg-emerald-500 rounded-full relative cursor-pointer">
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
              <ChevronDown className="h-5 w-5 text-emerald-500" />
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
              <ChevronDown className="h-5 w-5 text-emerald-500" />
            </FilterCard>
        </div>
      </div>

       {/* Widget: Objetivo Actual (Pinned at bottom) */}
       <div className="mt-8 pt-6 border-t border-gray-800">
          <div className="p-5 rounded-2xl bg-[#161E1C] space-y-4 border border-[#1f2b28]">
            <h4 className="text-white font-bold text-sm">Objetivo actual</h4>
            <p className="text-sm text-gray-400 leading-relaxed">
               Maximizar la ganancia de peso (destete) manteniendo facilidad de parto.
            </p>
            <Button 
               variant="outline" 
               className="w-full justify-between bg-transparent border-emerald-500/50 text-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-400 h-10 rounded-xl"
            >
               <ArrowLeft className="h-4 w-4" />
               <span className="text-sm font-medium">Editar criterios</span>
            </Button>
          </div>
       </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { 
  LayoutGrid, 
  ListFilter, 
  Settings, 
  LogOut, 
  ChevronDown, 
  ArrowLeft 
} from "lucide-react";

export function Sidebar({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col h-screen w-80 bg-[#111827] text-white p-6 border-r border-gray-800", className)}>
      {/* Brand */}
      <div className="flex items-center gap-3 mb-10">
        <div className="h-8 w-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold">
          B
        </div>
        <span className="text-xl font-bold tracking-tight">Bulltrack</span>
      </div>

      {/* Main Navigation (Placeholder logic based on screenshot structure) */}
      <div className="flex-1 overflow-y-auto space-y-8">
        
        {/* Section: Filtros Activos */}
        <div className="space-y-4">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Filtros Activos
          </h3>
          
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-300">Origen</label>
              <div className="p-3 rounded-lg border border-emerald-500/50 bg-emerald-500/10 flex items-center justify-between">
                <span className="text-sm font-medium text-emerald-400">Todos</span>
                <div className="h-4 w-4 rounded-full bg-emerald-500 flex items-center justify-center">
                   <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                   </svg>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border border-gray-700 bg-gray-800/50 hover:bg-gray-800 transition-colors cursor-pointer">
               <span className="text-sm text-gray-300">Toros propios</span>
               <div className="h-4 w-4 rounded border border-gray-600" />
            </div>
            
            <div className="flex items-center justify-between p-3 rounded-lg border border-gray-700 bg-gray-800/50 hover:bg-gray-800 transition-colors cursor-pointer">
               <span className="text-sm text-gray-300">Catálogo</span>
               <div className="h-4 w-4 rounded border border-gray-600" />
            </div>

             <div className="flex items-center justify-between p-3 rounded-lg border border-gray-700 bg-gray-800/50 hover:bg-gray-800 transition-colors cursor-pointer">
               <span className="text-sm text-gray-300">Favoritos</span>
               <div className="h-4 w-4 rounded border border-gray-600" />
            </div>
          </div>
        </div>

        {/* Section: Filtros Productivos */}
        <div className="space-y-4">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Filtros Productivos
          </h3>
          
          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50 border border-gray-700">
             <div>
                <p className="text-sm font-medium text-gray-200">Para vaquillona</p>
                <p className="text-xs text-emerald-400">Facilidad de parto</p>
             </div>
             <div className="w-10 h-5 bg-emerald-500 rounded-full relative">
                <div className="absolute right-1 top-1 w-3 h-3 bg-black rounded-full shadow" />
             </div>
          </div>

          <div className="space-y-1">
             <label className="text-sm font-medium text-gray-300">Pelaje</label>
             <div className="flex items-center justify-between p-3 rounded-lg border border-gray-700 bg-gray-800/50">
                <span className="text-sm text-gray-300">Todos</span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
             </div>
          </div>
        </div>

         {/* Section: Ordenamiento */}
         <div className="space-y-4">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Ordenamiento
          </label>
           <div className="flex items-center justify-between p-3 rounded-lg border border-gray-700 bg-gray-800/50">
                <span className="text-sm text-gray-300">Score mejor a peor</span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
             </div>
        </div>

      </div>

      {/* Footer / CTA */}
      <div className="mt-6 pt-6 border-t border-gray-800 space-y-4">
         <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-900/50 to-gray-900 border border-emerald-900/50">
            <h4 className="text-sm font-bold text-emerald-100 mb-1">Objetivo actual</h4>
            <p className="text-xs text-gray-400 leading-relaxed mb-3">
               Maximizar la ganancia de peso (destete) manteniendo facilidad de parto.
            </p>
            <Button variant="outline" size="sm" className="w-full border-emerald-800 text-emerald-400 hover:bg-emerald-900/50 hover:text-emerald-300">
               <Settings className="h-3 w-3 mr-2" />
               Editar criterios
            </Button>
         </div>
      </div>
    </div>
  );
}

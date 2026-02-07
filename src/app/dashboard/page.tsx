import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Search, Download, List, LayoutGrid, Eye, Heart, Info, ArrowRight } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Section */}
      <div className="flex flex-col gap-1">
         <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Datos actualizados hace 2 min
         </div>
         <div className="flex items-center justify-between">
            <div>
               <h1 className="text-2xl font-bold text-gray-900">Resultados de la clasificación</h1>
               <p className="text-gray-500 text-sm mt-1">
                  Los resultados están ordenados por Bulltrack Score que reflejan tus objetivos de producción
               </p>
            </div>
            <Button variant="outline" className="bg-black text-white hover:bg-gray-800 border-transparent gap-2 h-9 text-xs rounded-lg">
               Exportar
               <Download className="h-3 w-3" />
            </Button>
         </div>
      </div>

      {/* Info Banner */}
      <div className="bg-gray-50 rounded-lg p-3 flex items-center justify-between border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
         <div className="flex items-center gap-2 text-gray-700 text-sm font-medium">
            <Info className="h-4 w-4 text-gray-500" />
            Criterios del ranking
         </div>
         <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
         </svg>
      </div>

      {/* Search Bar & View Toggle */}
      <div className="flex items-center gap-4">
         <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
               placeholder="Busca por caravana, nombre o cabaña" 
               className="pl-10 bg-white border-transparent h-12 shadow-sm rounded-xl focus-visible:ring-emerald-500" 
            />
         </div>
         <span className="text-sm font-bold text-gray-900 whitespace-nowrap">24 resultados</span>
         <div className="bg-white rounded-lg p-1 shadow-sm flex items-center border border-gray-100">
            <button className="p-2 rounded bg-black text-white hover:bg-gray-800">
               <List className="h-4 w-4" />
            </button>
            <button className="p-2 rounded text-gray-400 hover:text-gray-600">
               <LayoutGrid className="h-4 w-4" />
            </button>
         </div>
      </div>

      {/* Bulls List */}
      <div className="space-y-4">
         {/* Bull Card 1 */}
         <Card className="border-none shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-0 flex items-stretch">
               {/* Checkbox Strip */}
               <div className="w-12 bg-white flex items-center justify-center border-r border-gray-50">
                  <div className="h-4 w-4 rounded border border-gray-300 ring-offset-2 ring-violet-500"></div>
               </div>
               
               {/* Rank Badge */}
               <div className="w-16 flex items-center justify-center text-xl font-bold text-gray-400">
                  #1
               </div>

               {/* Image */}
               <div className="w-24 py-4">
                  <div className="h-16 w-16 rounded-xl bg-gray-200 overflow-hidden relative">
                     {/* Placeholder img */}
                     <img src="https://images.unsplash.com/photo-1541689221361-ad95003448dc?q=80&w=2670&auto=format&fit=crop" className="h-full w-full object-cover" />
                  </div>
               </div>

               {/* Info */}
               <div className="flex-1 py-4 flex flex-col justify-center">
                  <h3 className="font-bold text-gray-900 text-lg">Toro #992</h3>
                  <p className="text-gray-500 text-sm">Angus • 36 meses</p>
                  <div className="flex gap-2 mt-2">
                     <Badge variant="outline-green" className="text-[10px] h-5 rounded px-2 font-medium bg-white">Propio</Badge>
                     <Badge variant="outline-purple" className="text-[10px] h-5 rounded px-2 font-medium bg-white">Para vaquillona</Badge>
                  </div>
               </div>

               {/* Score */}
               <div className="w-48 py-4 flex flex-col justify-center border-l border-gray-50 px-6">
                  <div className="flex justify-between items-end mb-1">
                     <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Bull Score</span>
                     <span className="text-xl font-bold text-gray-900">0.9</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                     <div className="h-full bg-emerald-500 w-[90%] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.3)]"></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Top 1% de facilidad de parto</p>
               </div>

               {/* Radar Placeholder */}
               <div className="w-32 py-4 flex items-center justify-center border-l border-gray-50">
                  <div className="h-16 w-16 relative opacity-70">
                     {/* CSS-only Hexagon for representation */}
                      <svg viewBox="0 0 100 100" className="w-full h-full text-emerald-500 fill-none stroke-current stroke-2">
                        <path d="M50 5 L90 25 L90 75 L50 95 L10 75 L10 25 Z" />
                        <path d="M50 20 L80 35 L80 65 L50 80 L20 65 L20 35 Z" fill="rgba(16,185,129,0.1)" />
                      </svg>
                  </div>
               </div>

               {/* Actions */}
               <div className="w-20 flex flex-col items-center justify-center gap-2 border-l border-gray-50">
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-gray-900 text-white hover:bg-gray-700">
                     <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200">
                     <Heart className="h-4 w-4" />
                  </Button>
               </div>
            </CardContent>
         </Card>

         {/* Bull Card 2 */}
         <Card className="border-none shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-0 flex items-stretch">
               <div className="w-12 bg-white flex items-center justify-center border-r border-gray-50">
                  <div className="h-4 w-4 rounded border border-gray-300"></div>
               </div>
               
               <div className="w-16 flex items-center justify-center text-xl font-bold text-gray-400">#2</div>
               
               <div className="w-24 py-4">
                  <div className="h-16 w-16 rounded-xl bg-gray-200 overflow-hidden">
                     <img src="https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?q=80&w=2670&auto=format&fit=crop" className="h-full w-full object-cover" />
                  </div>
               </div>

               <div className="flex-1 py-4 flex flex-col justify-center">
                  <h3 className="font-bold text-gray-900 text-lg">Toro #442</h3>
                  <p className="text-gray-500 text-sm">Angus • 36 meses</p>
                  <div className="flex gap-2 mt-2">
                     <Badge variant="outline-green" className="text-[10px] h-5 rounded px-2 font-medium bg-white">Catálogo</Badge>
                     <Badge variant="outline-blue" className="text-[10px] h-5 rounded px-2 font-medium bg-white">Para vaca</Badge>
                  </div>
               </div>

               <div className="w-48 py-4 flex flex-col justify-center border-l border-gray-50 px-6">
                  <div className="flex justify-between items-end mb-1">
                     <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Bull Score</span>
                     <span className="text-xl font-bold text-gray-900">0.9</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                     <div className="h-full bg-emerald-500 w-[90%] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.3)]"></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Top 1% de facilidad de parto</p>
               </div>
               
               <div className="w-32 py-4 flex items-center justify-center border-l border-gray-50">
                   <div className="h-16 w-16 relative opacity-70">
                      <svg viewBox="0 0 100 100" className="w-full h-full text-emerald-500 fill-none stroke-current stroke-2">
                        <path d="M50 5 L90 25 L90 75 L50 95 L10 75 L10 25 Z" />
                        <path d="M50 20 L80 35 L80 65 L50 80 L20 65 L20 35 Z" fill="rgba(16,185,129,0.1)" />
                      </svg>
                  </div>
               </div>

               <div className="w-20 flex flex-col items-center justify-center gap-2 border-l border-gray-50">
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-gray-900 text-white hover:bg-gray-700">
                     <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200">
                     <Heart className="h-4 w-4" />
                  </Button>
               </div>
            </CardContent>
         </Card>
      </div>
    </div>
  );
}

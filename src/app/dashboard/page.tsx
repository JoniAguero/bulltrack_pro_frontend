import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Search, Download, List, LayoutGrid, Info } from "lucide-react";
import { getBulls } from "@/services/bulls.service";
import { BullCard } from "@/components/domain/bulls/BullCard";

export default async function DashboardPage() {
  const bulls = await getData();

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
        {bulls.length > 0 ? (
          bulls.map((bull, index) => (
            <BullCard key={bull.id} bull={{ ...bull, rank: index + 1 }} />
          ))
        ) : (
          <div className="text-center py-20 text-gray-500">
            No se encontraron resultados
          </div>
        )}
      </div>
    </div>
  );
}

// Fetch data on server
async function getData() {
  // Mock data fallback if API fails (for development safety)
  try {
     const res = await getBulls();
     return res.data;
  } catch (e) {
     console.warn("Backend unavailable, using mock fallback temporarily.");
     return [
        {
           id: "1",
           caravana: "Toro #992",
           name: "Black Diamond",
           breed: "Angus",
           birthDate: "2021-01-01",
           source: "PROPIO",
           bullScore: 9.2,
           photoUrl: "https://images.unsplash.com/photo-1541689221361-ad95003448dc?q=80&w=2670&auto=format&fit=crop",
           characteristics: [{ name: "Facilidad parto", value: 1 }],
        },
        {
           id: "2",
           caravana: "Toro #442",
           name: "Red Thunder",
           breed: "Angus Colorado",
           birthDate: "2021-05-15",
           source: "CATALOGO",
           bullScore: 8.5,
           photoUrl: "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?q=80&w=2670&auto=format&fit=crop",
           characteristics: [{ name: "Crecimiento", value: 2 }],
        }
     ] as any[];
  }
}


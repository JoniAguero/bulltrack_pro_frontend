import { Button } from "@/components/ui/Button";
import { Search, Download, List, LayoutGrid, Info, ChevronDown } from "lucide-react";
import { getBulls } from "@/services/bulls.service";
import { BullCard } from "@/components/domain/bulls/BullCard";

interface DashboardPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const source = typeof searchParams.source === "string" ? searchParams.source : undefined;
  const favorites = typeof searchParams.favorites === "string" ? searchParams.favorites : undefined;
  
  const bulls = await getData({ source, favorites });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      
      {/* 1. Page Header */}
      <div className="flex justify-between items-start">
         <div className="space-y-1">
           <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
             <span className="h-4 w-4 rounded-full border border-gray-400 flex items-center justify-center text-[10px]">☁</span>
             Datos actualizados hace 2 min
           </div>
           <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Resultados de la clasificación</h1>
           <p className="text-gray-500">
             Los resultados están ordenados por Bulltrack Score que reflejan tus objetivos de producción
           </p>
         </div>
         <Button variant="outline" className="bg-gray-900 text-white border-none hover:bg-gray-700 flex gap-2">
            Exportar <Download className="h-4 w-4" />
         </Button>
      </div>

      {/* 2. Criterios Banner */}
      <div className="bg-gray-100 rounded-lg p-3 flex items-center justify-between cursor-pointer hover:bg-gray-200 transition-colors">
         <div className="flex items-center gap-2">
            <Info className="h-5 w-5 text-gray-500" />
            <span className="font-semibold text-gray-700">Criterios del ranking</span>
         </div>
         <ChevronDown className="h-5 w-5 text-gray-400" />
      </div>

      {/* 3. Search & Toolbar */}
      <div className="flex items-center justify-between bg-white p-2 rounded-xl border border-gray-100 shadow-sm">
         <div className="relative flex-1 max-w-md">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
             <input 
               type="text" 
               placeholder="Busca por caravana, nombre o cabaña" 
               className="w-full pl-10 pr-4 py-2 text-sm focus:outline-none placeholder:text-gray-400 border-none ring-0 outline-none"
             />
         </div>
         
         <div className="flex items-center gap-6 pr-2">
            <span className="font-bold text-gray-900 text-lg">24 <span className="font-normal text-gray-500 text-base">resultados</span></span>
            
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
               <button className="p-1.5 rounded bg-gray-900 text-white shadow-sm">
                  <List className="h-5 w-5" />
               </button>
               <button className="p-1.5 rounded text-gray-400 hover:text-gray-600">
                  <LayoutGrid className="h-5 w-5" />
               </button>
            </div>
         </div>
      </div>

      {/* 4. Results List */}
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
async function getData(filters?: { source?: string; favorites?: string }) {
  // Mock data fallback if API fails (for development safety)
  try {
     const res = await getBulls(1, 10, filters);
     return res.data;
  } catch (e) {
     console.warn("Backend unavailable, using mock fallback temporarily.");
     
     // Simple mock filtering
     let data = [
        {
           id: "1",
           caravana: "Toro #992",
           name: "Black Diamond",
           breed: "Angus",
           birthDate: "2021-01-01",
           source: "PROPIO",
           bullScore: 0.9,
           photoUrl: "https://images.unsplash.com/photo-1541689221361-ad95003448dc?q=80&w=2670&auto=format&fit=crop",
           characteristics: [{ name: "Facilidad parto", value: 1 }],
           isFavorite: true,
        },
        {
           id: "2",
           caravana: "Toro #442",
           name: "Red Thunder",
           breed: "Angus Colorado",
           birthDate: "2021-05-15",
           source: "CATALOGO",
           bullScore: 0.9,
           photoUrl: "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?q=80&w=2670&auto=format&fit=crop",
           characteristics: [{ name: "Crecimiento", value: 2 }],
        },
        {
           id: "3",
           caravana: "Toro #992",
           name: "Masterpiece",
           breed: "Angus",
           birthDate: "2021-05-15",
           source: "PROPIO",
           bullScore: 0.9,
           photoUrl: "https://images.unsplash.com/photo-1594916895318-7b9bc9178007?q=80&w=2670&auto=format&fit=crop",
           characteristics: [{ name: "Facilidad parto", value: 2 }],
        }
     ] as any[];

     if (filters?.source) {
       data = data.filter(bull => bull.source === filters.source);
     }

     if (filters?.favorites === "true") {
       data = data.filter(bull => bull.isFavorite);
     }
     
     return data;
  }
}

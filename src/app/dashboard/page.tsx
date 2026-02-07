import { Search, Download, List, LayoutGrid, Info, ChevronDown } from "lucide-react";
import { getBulls } from "@/services/bulls.service";
import { BullCard } from "@/components/domain/bulls/BullCard";
import { ExportButton } from "@/components/domain/bulls/ExportButton";
import { SearchInput } from "@/components/domain/bulls/SearchInput";

import { t } from "@/lib/i18n";

import { cookies } from "next/headers";

interface DashboardPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const params = await searchParams;
  const origen = typeof params.origen === "string" ? params.origen : undefined;
  const favorites = typeof params.favorites === "string" ? params.favorites : undefined;
  const uso = typeof params.uso === "string" ? params.uso : undefined;
  const pelaje = typeof params.pelaje === "string" ? params.pelaje : undefined;
  const search = typeof params.search === "string" ? params.search : undefined;

  const token = (await cookies()).get("session_token")?.value;
  
  const bulls = await getData({ origen, favorites, uso, pelaje, search }, token);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      
      {/* 1. Page Header */}
      <div className="flex justify-between items-start">
         <div className="space-y-1">
           <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
             <span className="h-4 w-4 rounded-full border border-gray-400 flex items-center justify-center text-[10px]">☁</span>
             {t("ui", "updatedAgo")} 2 min
           </div>
           <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Resultados de la clasificación</h1>
           <p className="text-gray-500">
             Los resultados están ordenados por Bulltrack Score que reflejan tus objetivos de producción
           </p>
         </div>
         <ExportButton data={bulls} />
      </div>

      {/* 2. Criterios Banner */}
      <div className="bg-gray-100 rounded-lg p-3 flex items-center justify-between cursor-pointer hover:bg-gray-200 transition-colors">
         <div className="flex items-center gap-2">
            <Info className="h-5 w-5 text-gray-500" />
            <span className="font-semibold text-gray-700">{t("ui", "rankCriteria")}</span>
         </div>
         <ChevronDown className="h-5 w-5 text-gray-400" />
      </div>

      {/* 3. Search & Toolbar */}
      <div className="flex items-center justify-between bg-white p-2 rounded-xl border border-gray-100 shadow-sm">
         <SearchInput placeholder={t("ui", "searchPlaceholder")} />
         
         <div className="flex items-center gap-6 pr-2">
            <span className="font-bold text-gray-900 text-lg">{bulls.length} <span className="font-normal text-gray-500 text-base">{t("ui", "results")}</span></span>
            
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
            {t("ui", "noResults")}
          </div>
        )}
      </div>
    </div>
  );
}

// Fetch data on server
async function getData(filters?: { origen?: string; favorites?: string; uso?: string; pelaje?: string; search?: string }, token?: string) {
  try {
     const res = await getBulls(1, 10, filters, token);
     return res.data;
  } catch (e) {
     console.error("Backend Error:", e);
     // We throw the error to let Next.js handle it (error.tsx) or show empty state
     // For now, let's keep it simple and throw to be aware of failures
     throw new Error("No se pudo conectar con el servidor. Por favor, asegúrate de que el backend esté corriendo.");
  }
}

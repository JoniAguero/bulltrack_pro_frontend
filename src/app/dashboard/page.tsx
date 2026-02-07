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

import { ViewToggle } from "@/components/domain/bulls/ViewToggle";
import { BullGridCard } from "@/components/domain/bulls/BullGridCard";
import { cn } from "@/lib/utils";

// ... inside DashboardPage component
export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const params = await searchParams;
  const origen = typeof params.origen === "string" ? params.origen : undefined;
  const favorites = typeof params.favorites === "string" ? params.favorites : undefined;
  const uso = typeof params.uso === "string" ? params.uso : undefined;
  const pelaje = typeof params.pelaje === "string" ? params.pelaje : undefined;
  const search = typeof params.search === "string" ? params.search : undefined;
  const view = typeof params.view === "string" ? params.view : "list";

  const token = (await cookies()).get("session_token")?.value;
  
  const bulls = await getData({ origen, favorites, uso, pelaje, search }, token);

  return (
    <div className="space-y-4 md:space-y-6 max-w-7xl mx-auto pb-10">
      
      {/* 1. Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 md:gap-0">
         <div className="space-y-1">
           <div className="flex items-center gap-2 text-[10px] md:text-sm text-gray-500 mb-1 md:mb-2">
             <span className="h-3.5 w-3.5 md:h-4 md:w-4 rounded-full border border-gray-400 flex items-center justify-center text-[8px] md:text-[10px]">☁</span>
             {t("ui", "updatedAgo")} 2 min
           </div>
           <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight leading-tight">Resultados de la clasificación</h1>
           <p className="text-gray-500 text-sm md:text-base">
             Los resultados están ordenados por Bulltrack Score
           </p>
         </div>
         <div className="w-full md:w-auto">
            <ExportButton data={bulls} />
         </div>
      </div>

      {/* 2. Criterios Banner */}
      <div className="bg-gray-100 rounded-xl p-3 flex items-center justify-between cursor-pointer hover:bg-gray-200 transition-colors">
         <div className="flex items-center gap-2">
            <Info className="h-4 w-4 md:h-5 md:w-5 text-gray-500" />
            <span className="font-semibold text-xs md:text-sm text-gray-700">{t("ui", "rankCriteria")}</span>
         </div>
         <ChevronDown className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />
      </div>

      {/* 3. Search & Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between bg-white p-2 rounded-xl border border-gray-100 shadow-sm gap-3 sm:gap-0">
         <div className="flex-1">
            <SearchInput placeholder={t("ui", "searchPlaceholder")} />
         </div>
         
         <div className="flex items-center justify-between sm:justify-end gap-6 sm:pr-2">
            <span className="font-bold text-gray-900 text-base md:text-lg whitespace-nowrap">
               {bulls.length} <span className="font-normal text-gray-500 text-sm md:text-base">{t("ui", "results")}</span>
            </span>
            
            <ViewToggle />
         </div>
      </div>

      {/* 4. Results List / Grid */}
      <div className={cn(
        "gap-3 md:gap-4 transition-all duration-300",
        view === "grid" 
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" 
          : "flex flex-col"
      )}>
        {bulls.length > 0 ? (
          bulls.map((bull, index) => (
            view === "grid" ? (
              <BullGridCard key={bull.id} bull={{ ...bull, rank: index + 1 }} />
            ) : (
              <BullCard key={bull.id} bull={{ ...bull, rank: index + 1 }} />
            )
          ))
        ) : (
          <div className={cn(
             "text-center py-10 md:py-20 text-gray-500 bg-white rounded-2xl border border-dashed",
             view === "grid" ? "col-span-full" : "w-full"
          )}>
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

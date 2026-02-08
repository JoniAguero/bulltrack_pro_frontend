import { Suspense } from "react";
import { Info, ChevronDown } from "lucide-react";
import { ExportButton } from "@/components/domain/bulls/ExportButton";
import { SearchInput } from "@/components/domain/bulls/SearchInput";
import { BullsList } from "@/components/domain/bulls/BullsList";
import { BullsSkeleton } from "@/components/domain/bulls/BullsSkeleton";
import { ViewToggle } from "@/components/domain/bulls/ViewToggle";
import { ExportButtonContainer } from "@/components/domain/bulls/ExportButtonContainer";
import { Button } from "@/components/ui/Button";
import { Download } from "lucide-react";
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
  const bullId = typeof params.bullId === "string" ? params.bullId : undefined;
  const view = typeof params.view === "string" ? params.view : "list";

  const token = (await cookies()).get("session_token")?.value;
  
  const filters = { origen, favorites, uso, pelaje, search };

  return (
    <div className="space-y-4 md:space-y-6 max-w-7xl mx-auto pb-10">
      
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
            <Suspense fallback={
               <Button disabled variant="outline" className="w-full md:w-auto border-gray-200 text-gray-400 font-bold px-6 h-11 md:h-12 rounded-xl flex items-center justify-center gap-2 opacity-50">
                  <Download className="h-5 w-5 animate-pulse" />
                  {t("ui", "exportButton")}
               </Button>
            }>
               <ExportButtonContainer filters={filters} token={token} />
            </Suspense>
         </div>
      </div>

      <div className="bg-gray-100 rounded-xl p-3 flex items-center justify-between cursor-pointer hover:bg-gray-200 transition-colors">
         <div className="flex items-center gap-2">
            <Info className="h-4 w-4 md:h-5 md:w-5 text-gray-500" />
            <span className="font-semibold text-xs md:text-sm text-gray-700">{t("ui", "rankCriteria")}</span>
         </div>
         <ChevronDown className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between bg-white p-2 rounded-xl border border-gray-100 shadow-sm gap-3 sm:gap-0">
         <div className="flex-1">
            <SearchInput placeholder={t("ui", "searchPlaceholder")} />
         </div>
         
         <div className="flex items-center justify-between sm:justify-end gap-6 sm:pr-2">
            <ViewToggle />
         </div>
      </div>

      <Suspense key={JSON.stringify(filters) + view + bullId} fallback={<BullsSkeleton view={view as any} />}>
         <BullsList filters={{ ...filters, bullId }} token={token} view={view as any} />
      </Suspense>
    </div>
  );
}


import { getBulls } from "@/services/bulls.service";
import { BullCard } from "@/components/domain/bulls/BullCard";
import { BullGridCard } from "@/components/domain/bulls/BullGridCard";
import { BullDetailDrawer } from "@/components/domain/bulls/BullDetailDrawer";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface BullsListProps {
  filters: { 
    origen?: string; 
    favorites?: string; 
    uso?: string; 
    pelaje?: string; 
    search?: string;
    bullId?: string;
  };
  token?: string;
  view: "list" | "grid";
}

export async function BullsList({ filters, token, view }: BullsListProps) {
  const { bullId, ...apiFilters } = filters;
  
  let bulls = [];
  try {
    const res = await getBulls(1, 20, apiFilters, token);
    bulls = res.data;
  } catch (e) {
    console.error("Error fetching bulls:", e);
    return (
      <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-red-200 text-red-500">
        No se pudo conectar con el servidor. Por favor, asegúrate de que el backend esté corriendo.
      </div>
    );
  }

  if (bulls.length === 0) {
    return (
      <div className={cn(
        "text-center py-10 md:py-20 text-gray-500 bg-white rounded-2xl border border-dashed",
        view === "grid" ? "col-span-full" : "w-full"
      )}>
        {t("ui", "noResults")}
      </div>
    );
  }

  return (
    <>
      <div className={cn(
        "gap-3 md:gap-4 transition-all duration-300",
        view === "grid" 
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" 
          : "flex flex-col"
      )}>
        {bulls.map((bull, index) => (
          view === "grid" ? (
            <BullGridCard key={bull.id} bull={{ ...bull, rank: index + 1 }} />
          ) : (
            <BullCard key={bull.id} bull={{ ...bull, rank: index + 1 }} />
          )
        ))}
      </div>

      <BullDetailDrawer 
        isOpen={!!bullId} 
        bull={bulls.find(b => b.id === bullId)} 
      />
    </>
  );
}

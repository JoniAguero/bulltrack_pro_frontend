"use client";

import { LayoutGrid, List } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

export function ViewToggle() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentView = searchParams.get("view") || "list";

  const handleViewChange = (view: "list" | "grid") => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("view", view);
    router.replace(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center bg-gray-100 rounded-lg p-1">
      <button 
        onClick={() => handleViewChange("list")}
        className={cn(
          "p-1.5 rounded transition-all duration-200 cursor-pointer",
          currentView === "list" 
            ? "bg-gray-900 text-white shadow-sm" 
            : "text-gray-400 hover:text-gray-600 hover:bg-gray-200"
        )}
        title="Vista de lista"
      >
        <List className="h-4 w-4 md:h-5 md:w-5" />
      </button>
      <button 
        onClick={() => handleViewChange("grid")}
        className={cn(
          "p-1.5 rounded transition-all duration-200 cursor-pointer",
          currentView === "grid" 
            ? "bg-gray-900 text-white shadow-sm" 
            : "text-gray-400 hover:text-gray-600 hover:bg-gray-200"
        )}
        title="Vista de cuadrícula"
      >
        <LayoutGrid className="h-4 w-4 md:h-5 md:w-5" />
      </button>
    </div>
  );
}

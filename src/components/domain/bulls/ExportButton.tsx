"use client";

import { Button } from "@/components/ui/Button";
import { Download } from "lucide-react";
import * as XLSX from "xlsx";
import { t } from "@/lib/i18n";
import { Bull } from "@/types/bulls";

interface ExportButtonProps {
  data?: Bull[];
}

export function ExportButton({ data }: ExportButtonProps) {
  const handleExport = () => {
    if (!data || data.length === 0) {
      alert("No hay datos para exportar. Por favor, espera a que los resultados carguen.");
      return;
    }

    const exportData = data.map((bull) => ({
      Caravana: bull.caravana,
      Nombre: bull.name,
      Raza: bull.breed,
      "Edad (meses)": bull.birthDate,
      Origen: t("origen", bull.source),
      "Bull Score": bull.bullScore.toFixed(1),
      Características: bull.characteristics
        ?.map((c) => t("characteristics", c.name))
        .join(", "),
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Toros");

    const date = new Date().toISOString().split("T")[0];
    const filename = `bulltrack_export_${date}.xlsx`;

    XLSX.writeFile(workbook, filename);
  };

  return (
    <Button 
      onClick={handleExport}
      variant="outline" 
      disabled={!data || data.length === 0}
      className="cursor-pointer w-full md:w-auto border-gray-200 text-gray-700 font-bold px-6 h-11 md:h-12 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-all active:scale-95"
    >
      <Download className="h-5 w-5" />
      {t("ui", "exportButton")}
    </Button>
  );
}

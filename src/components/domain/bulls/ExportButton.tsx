"use client";

import { Button } from "@/components/ui/Button";
import { Download } from "lucide-react";
import * as XLSX from "xlsx";
import { Bull } from "@/types/bulls";
import { t } from "@/lib/i18n";

interface ExportButtonProps {
  data: Bull[];
}

export function ExportButton({ data }: ExportButtonProps) {
  const handleExport = () => {
    // 1. Prepare data for Excel
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

    // 2. Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(exportData);

    // 3. Create workbook and append worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Toros");

    // 4. Generate filename with current date
    const date = new Date().toISOString().split("T")[0];
    const filename = `bulltrack_export_${date}.xlsx`;

    // 5. Trigger download
    XLSX.writeFile(workbook, filename);
  };

  return (
    <Button 
      variant="outline" 
      onClick={handleExport}
      className="bg-gray-900 text-white border-none hover:bg-gray-700 flex gap-2"
    >
      {t("ui", "export")} <Download className="h-4 w-4" />
    </Button>
  );
}

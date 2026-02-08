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
      variant="outline" 
      onClick={handleExport}
      className="bg-gray-900 text-white border-none cursor-pointer hover:bg-gray-400 flex gap-2"
    >
      {t("ui", "export")} <Download className="h-4 w-4" />
    </Button>
  );
}

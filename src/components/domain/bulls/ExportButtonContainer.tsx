import { getBulls } from "@/services/bulls.service";
import { ExportButton } from "./ExportButton";

interface ExportButtonContainerProps {
  filters: { 
    origen?: string; 
    favorites?: string; 
    uso?: string; 
    pelaje?: string; 
    search?: string;
  };
  token?: string;
}

export async function ExportButtonContainer({ filters, token }: ExportButtonContainerProps) {
  try {
    // We fetch a larger limit for export or just the current view
    const res = await getBulls(1, 100, filters, token);
    return <ExportButton data={res.data} />;
  } catch (e) {
    console.error("Export fetch error:", e);
    return <ExportButton data={[]} />;
  }
}

export const TRANSLATIONS = {
    origen: {
        propio: "Propio",
        catalogo: "Catálogo",
        PROPIO: "Propio",
        CATALOGO: "Catálogo",
    },
    uso: {
        vaquillona: "Para vaquillona",
        vaca: "Vaca",
    },
    pelaje: {
        negro: "Negro",
        colorado: "Colorado",
    },
    ui: {
        bullScore: "Bull Score",
        results: "resultados",
        export: "Exportar",
        exportButton: "Exportar Excel",
        rankCriteria: "Criterios del ranking",
        updatedAgo: "Datos actualizados hace",
        noResults: "No se encontraron resultados",
        searchPlaceholder: "Busca por caravana, nombre o cabaña",
        currentObjective: "Objetivo actual",
        editCriteria: "Editar criterios",
        activeFilters: "Filtros activos",
    },
    characteristics: {
        "Top 1% calving ease": "Top 1% facilidad de parto",
        "Top 5% carcass": "Top 5% calidad de carcasa",
        "Efficiency Leader": "Líder en eficiencia",
        "Heat Tolerant": "Tolerante al calor",
        "Performance Pro": "Desempeño Pro",
    }
} as const;

export function t(category: keyof typeof TRANSLATIONS, key: string): string {
    const dict = TRANSLATIONS[category] as Record<string, string>;
    return dict[key] || key;
}

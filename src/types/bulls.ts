export interface Bull {
    id: string;
    caravana: string; // "Toro #992"
    name: string;
    breed: string; // "Angus"
    birthDate: string; // Calculate age from this
    photoUrl?: string;
    source: 'PROPIO' | 'CATALOGO';
    bullScore: number;
    location?: string;
    characteristics: {
        name: string;
        value: string | number;
        percentile?: number; // "Top 1%"
    }[];
    // Helper for UI tags
    primaryTag?: string; // "Propio"
    secondaryTags?: string[]; // ["Para vaquillona"]
}

export interface BullsResponse {
    data: Bull[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

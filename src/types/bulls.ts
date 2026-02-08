export interface Bull {
    id: string;
    caravana: string;
    name: string;
    breed: string;
    birthDate: string;
    photoUrl?: string;
    source: 'PROPIO' | 'CATALOGO';
    bullScore: number;
    location?: string;
    characteristics: {
        name: string;
        value: string | number;
        percentile?: number;
    }[];
    metrics: {
        crecimiento: number;
        facilidad_parto: number;
        reproduccion: number;
        moderacion: number;
        carcasa: number;
    };
    highlightedCharacteristic?: string;
    isFavorite: boolean;
    primaryTag?: string;
    secondaryTags?: string[];
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

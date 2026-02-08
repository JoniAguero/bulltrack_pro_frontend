import { BullsResponse } from "@/types/bulls";

const API_URL = (process.env.BACKEND_API_URL || "http://localhost:3001").replace(/\/$/, "");

export async function getBulls(
    page = 1,
    limit = 10,
    filters?: {
        origen?: string;
        uso?: string;
        pelaje?: string;
        search?: string;
        sort?: string;
        favorites?: string;
    },
    token?: string
): Promise<BullsResponse> {
    // Construct URL with query params
    const url = new URL(`${API_URL}/bulls`);
    url.searchParams.append("page", page.toString());
    url.searchParams.append("limit", limit.toString());

    if (filters?.origen) url.searchParams.append("origen", filters.origen.toLowerCase());
    if (filters?.uso) url.searchParams.append("uso", filters.uso.toLowerCase());
    if (filters?.pelaje) url.searchParams.append("pelaje", filters.pelaje.toLowerCase());
    if (filters?.search) url.searchParams.append("search", filters.search);
    if (filters?.favorites) url.searchParams.append("favorites", filters.favorites);

    console.log("Fetching bulls from:", url.toString());

    try {
        const res = await fetch(url.toString(), {
            cache: "no-store",
            headers: token ? {
                "Authorization": `Bearer ${token}`
            } : {}
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch bulls: ${res.statusText}`);
        }

        const backendResponse = await res.json();

        const mappedData = (backendResponse.data || []).map((b: any) => ({
            id: String(b.id),
            caravana: b.caravana,
            name: b.nombre,
            breed: b.raza,
            birthDate: String(b.edad_meses),
            source: b.origen === 'propio' ? 'PROPIO' : 'CATALOGO',
            bullScore: b.bullScore || 0,
            photoUrl: b.photoUrl,
            isFavorite: b.isFavorite || false,
            metrics: b.stats ? {
                crecimiento: b.stats.crecimiento || 0,
                facilidad_parto: b.stats.facilidad_parto || 0,
                reproduccion: b.stats.reproduccion || 0,
                moderacion: b.stats.moderacion || 0,
                carcasa: b.stats.carcasa || 0,
            } : {
                crecimiento: 0,
                facilidad_parto: 0,
                reproduccion: 0,
                moderacion: 0,
                carcasa: 0,
            },
            highlightedCharacteristic: b.caracteristica_destacada,
            characteristics: b.caracteristica_destacada ? [{
                name: b.caracteristica_destacada,
                value: ""
            }] : []
        }));

        return {
            data: mappedData,
            meta: {
                total: backendResponse.total || 0,
                page: backendResponse.page || 1,
                limit: backendResponse.limit || 10,
                totalPages: backendResponse.lastPage || 1
            }
        };
    } catch (error) {
        console.error("Error fetching bulls:", error);
        throw error;
    }
}

import { BullsResponse } from "@/types/bulls";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function getBulls(
    page = 1,
    limit = 10,
    filters?: {
        source?: string;
        sort?: string;
        favorites?: string;
    }
): Promise<BullsResponse> {
    // Construct URL with query params
    const url = new URL(`${API_URL}/bulls`);
    url.searchParams.append("page", page.toString());
    url.searchParams.append("limit", limit.toString());

    if (filters?.source) url.searchParams.append("source", filters.source);
    if (filters?.sort) url.searchParams.append("sort", filters.sort);
    if (filters?.favorites) url.searchParams.append("favorites", filters.favorites);

    console.log("Fetching bulls from:", url.toString());

    try {
        const res = await fetch(url.toString(), {
            cache: "no-store", // Ensure fresh data for now
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch bulls: ${res.statusText}`);
        }

        return await res.json();
    } catch (error) {
        console.error("Error fetching bulls:", error);
        // Return empty state or throw depending on error handling strategy
        // For now returning mock empty response to avoid crashing UI entirely if backend is off
        throw error;
    }
}

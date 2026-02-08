"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const API_URL = (process.env.BACKEND_API_URL || "http://localhost:3001").replace(/\/$/, "");

export async function toggleFavoriteAction(bullId: string, isFavorite: boolean) {
    const token = (await cookies()).get("session_token")?.value;

    if (!token) {
        console.error("No token found in cookies for favorite toggle");
        return { error: "No autorizado" };
    }

    console.log(`Attempting favorite toggle with token (first 20 chars): ${token.substring(0, 20)}...`);

    const method = isFavorite ? "DELETE" : "POST";

    try {
        const res = await fetch(`${API_URL}/favorites/${bullId}`, {
            method,
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (!res.ok) {
            const errorBody = await res.text();
            console.error(`Favorite toggle failed. Status: ${res.status}, Body: ${errorBody}`);
            throw new Error("Failed to update favorite");
        }

        revalidatePath("/dashboard");
        return { success: true };
    } catch (error) {
        console.error("Favorite toggle error:", error);
        return { error: "Error de conexión" };
    }
}

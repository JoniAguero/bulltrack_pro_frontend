"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function toggleFavoriteAction(bullId: string, isFavorite: boolean) {
    const token = (await cookies()).get("session_token")?.value;

    if (!token) {
        return { error: "No autorizado" };
    }

    const method = isFavorite ? "DELETE" : "POST";

    try {
        const res = await fetch(`${API_URL}/bulls/${bullId}/favorite`, {
            method,
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (!res.ok) {
            throw new Error("Failed to update favorite");
        }

        revalidatePath("/dashboard");
        return { success: true };
    } catch (error) {
        console.error("Favorite toggle error:", error);
        return { error: "Error de conexión" };
    }
}

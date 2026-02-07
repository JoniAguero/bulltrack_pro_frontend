const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export interface LoginResponse {
    access_token: string;
    user?: {
        id: string;
        email: string;
        name: string;
    };
}

export async function login(email: string, password: string): Promise<LoginResponse> {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
        if (res.status === 401) {
            throw new Error("Credenciales inválidas");
        }
        throw new Error("Error en el servidor");
    }

    return res.json();
}

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
    // MOCK CREDENTIALS FOR DEMO/DEV
    if (email === "admin@bulltrack.com" && password === "admin123") {
        return {
            access_token: "mock_jwt_token_for_demo_purposes",
            user: {
                id: "1",
                email: "admin@bulltrack.com",
                name: "Admin User"
            }
        };
    }

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

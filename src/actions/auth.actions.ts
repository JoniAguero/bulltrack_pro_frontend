"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { login } from "@/services/auth.service";

export async function loginAction(prevState: any, formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
        return { error: "Email y contraseña son requeridos" };
    }

    try {
        const data = await login(email, password);

        // Store JWT in HTTPOnly cookie
        cookies().set("session_token", data.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: "/",
        });

    } catch (err: any) {
        return { error: err.message || "Error al iniciar sesión" };
    }

    redirect("/dashboard");
}

export async function logoutAction() {
    cookies().delete("session_token");
    redirect("/login");
}

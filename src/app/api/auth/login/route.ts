import { NextRequest, NextResponse } from "next/server";

/**
 * API Route Mock para desarrollo
 * Este es un endpoint temporal para pruebas
 * En producción, esto debería apuntar al backend real
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Validación básica
    if (!username || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Usuario y contraseña son requeridos",
        },
        { status: 400 }
      );
    }

    // Simulación de validación (SOLO PARA DESARROLLO)
    // TODO: Conectar con el backend real
    if (username === "demo" && password === "demo123") {
      // Generar token mock
      const mockToken = Buffer.from(
        `${username}:${Date.now()}`
      ).toString("base64");

      const response = {
        success: true,
        token: mockToken,
        refreshToken: `refresh_${mockToken}`,
        user: {
          id: "1",
          username: username,
          name: "Usuario Demo",
          email: "demo@bancoademi.com",
        },
        message: "Login exitoso",
      };

      // Establecer cookie con el token
      const res = NextResponse.json(response);
      res.cookies.set("auth_token", mockToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24, // 24 horas
      });

      return res;
    }

    // Credenciales inválidas
    return NextResponse.json(
      {
        success: false,
        message: "Usuario o contraseña incorrectos",
      },
      { status: 401 }
    );
  } catch (error) {
    console.error("Error en login:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error interno del servidor",
      },
      { status: 500 }
    );
  }
}
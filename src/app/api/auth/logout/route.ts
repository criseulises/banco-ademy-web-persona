import { NextResponse } from "next/server";

/**
 * API Route para cerrar sesión
 */
export async function POST() {
  try {
    const response = NextResponse.json({
      success: true,
      message: "Sesión cerrada exitosamente",
    });

    // Eliminar la cookie del token
    response.cookies.delete("auth_token");

    return response;
  } catch (error) {
    console.error("Error en logout:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error al cerrar sesión",
      },
      { status: 500 }
    );
  }
}
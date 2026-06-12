import { NextResponse } from "next/server";
import { getCustomizerConfig } from "@/lib/server/customizer-config";

// Endpoint público de solo lectura: expone la configuración del
// personalizador (bases, items, lazos) desde Supabase para que la
// pueda consumir la UI "use client" (/customize).
export async function GET() {
  try {
    const config = await getCustomizerConfig();
    return NextResponse.json(config);
  } catch (error) {
    console.error("Error al obtener configuración del personalizador:", error);
    return NextResponse.json(
      { error: "No se pudo cargar la configuración del personalizador." },
      { status: 500 }
    );
  }
}

"use client";

import { useEffect } from "react";
import { syncProgresoFromServer } from "@/lib/progreso";

/**
 * Componente invisible que sincroniza el progreso entre la cache local
 * y Supabase al montar. Se inyecta en (app)/layout.tsx para que toque
 * todas las pantallas con progreso (estudiar, practicar, simulacro,
 * progreso, repaso, dashboard).
 *
 * Si no hay sesión la sync resuelve a false sin tocar nada. Si hay,
 * dispara "ccse:progreso-changed" y las pantallas que escuchan se
 * refrescan.
 */
export function ProgresoSyncer() {
  useEffect(() => {
    syncProgresoFromServer();
  }, []);
  return null;
}

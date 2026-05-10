"use client";

import { useEffect } from "react";
import { setUltimaActividad } from "@/lib/progreso";

export function EstudiarTracker({ tarea }: { tarea: number }) {
  useEffect(() => {
    setUltimaActividad({
      tipo: "estudiar",
      id: tarea,
      titulo: `Estudiar Tarea ${tarea}`,
      href: `/estudiar/${tarea}`,
    });
  }, [tarea]);
  return null;
}

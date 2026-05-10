import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Silencia el warning "multiple lockfiles": fija la raíz de Turbopack
  // a la del repo, ignorando el package-lock.json que pueda haber en el
  // home del usuario.
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;

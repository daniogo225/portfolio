import type { NextConfig } from "next";

// Le français est servi à la racine (/ et /cv) à partir des pages /fr, l’anglais vit sous /en.
// Les adresses /fr redirigent vers la racine pour qu’il n’existe qu’une URL par page.
const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/fr", destination: "/", permanent: true },
      { source: "/fr/:path*", destination: "/:path*", permanent: true },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/", destination: "/fr" },
        { source: "/cv", destination: "/fr/cv" },
      ],
    };
  },
};

export default nextConfig;

import type { NextConfig } from "next";

// Le français est servi à la racine (/ et /cv) à partir des pages /fr, l’anglais vit sous /en.
// Les adresses /fr redirigent vers la racine pour qu’il n’existe qu’une URL par page.
const nextConfig: NextConfig = {
  // Page 404 propre au site, puisque la mise en page racine vit sous app/[lang].
  experimental: {
    globalNotFound: true,
  },
  // Portraits servis en AVIF, à défaut en WebP : le détouré de la hero pèse plus d’un mégaoctet en PNG.
  images: {
    formats: ["image/avif", "image/webp"],
  },
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

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.isu.pub',
        pathname: '/**',
      },
      // Puedes agregar más dominios aquí si es necesario
    ],
  },
};

export default nextConfig;
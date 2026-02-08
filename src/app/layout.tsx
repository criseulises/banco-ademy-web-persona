import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/features/auth/components/AuthContext";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
  title: "Banco ADEMI - Portal de Clientes",
  description: "Portal de clientes Banco ADEMI - Credimejoras",
  keywords: ["Banco ADEMI", "Credimejoras", "Portal bancario", "República Dominicana"],
  icons: {
    icon: "/icon/icon-ademi.ico",
    apple: "/icon/icon-ademi.ico",
  },
  openGraph: {
    title: "Banco ADEMI - Portal de Clientes",
    description: "Portal de clientes Banco ADEMI - Credimejoras",
    type: "website",
    images: "/icon/icon-ademi.ico",
  },
  twitter: {
    card: "summary",
    title: "Banco ADEMI - Portal de Clientes",
    description: "Portal de clientes Banco ADEMI - Credimejoras",
    images: "/icon/icon-ademi.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={montserrat.variable}>
      <body className="font-sans antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "SegMob | Seja um Prestador",
  description:
    "Cadastre-se como prestador técnico SegMob. Atue com tecnologia de ponta em segurança veicular, rastreamento e gestão de frotas com alta demanda e cobertura nacional.",
  keywords: ["SegMob", "prestador", "rastreamento veicular", "instalador", "técnico automotivo"],
  openGraph: {
    title: "SegMob | Seja um Prestador",
    description:
      "Atue com tecnologia de ponta, alta demanda e cobertura nacional. Cadastre-se agora.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

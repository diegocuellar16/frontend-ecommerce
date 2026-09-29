// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar"; // IMPORTAMOS EL NAVBAR

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-Commerce UDB",
  description: "Proyecto de e-commerce con Next.js y Laravel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        <CartProvider>
          {/* EL NAVBAR VA AQUÍ, ARRIBA DEL CONTENIDO */}
          <Navbar /> 
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
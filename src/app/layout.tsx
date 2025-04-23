import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/context/AuthContext";
import BottomNavWrapper from "@/components/BottomNavWrapper"; // 👈 este es el nuevo componente

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata = {
  title: 'EspacioCV Suite',
  description: 'Sistema de gestión para cartelería',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          {children}
          <BottomNavWrapper /> {/* ✅ esto ya es seguro */}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}

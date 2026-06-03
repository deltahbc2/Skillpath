import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "@/providers/convex-provider";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { Toaster } from "sonner";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Skillpath - Plataforma de aprendizaje y capacitacion para puestos de trabajo",
  description: "Skillpath es una plataforma de aprendizaje y capacitación para puestos de trabajo, que ofrece cursos y recursos para mejorar las habilidades profesionales de los usuarios. Identificamos los puntos débiles de los usuarios en su desarrollo profesional y les brindamos acceso a cursos y recursos personalizados para mejorar sus habilidades y cumplir con los requisitos técnicos necesarios para cierto puesto.",
  icons: {
    icon: "/icon.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-MX"
      className={`${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ConvexClientProvider>
          <EdgeStoreProvider>
            {children}
            <Toaster position="bottom-center"/>
          </EdgeStoreProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
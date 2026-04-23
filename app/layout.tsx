import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Skillpath - Plataforma de aprendizaje y capacitacion para puestos de trabajo",
  description: "Skillpath es una plataforma de aprendizaje y capacitación para puestos de trabajo, que ofrece cursos y recursos para mejorar las habilidades profesionales de los usuarios. Identificamos los puntos débiles de los usuarios en su desarrollo profesional y les brindamos acceso a cursos y recursos personalizados para mejorar sus habilidades y cumplir con los requisitos técnicos necesarios para cierto puesto.",
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
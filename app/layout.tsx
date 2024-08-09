import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Text to Speech",
  description:
    "Converta textos em áudio utilizando a inteligência artificial da Elevenlabs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={cn("bg-zinc-200 min-h-screen p-4", inter.className)}>
        <div className="bg-white max-w-2xl mx-auto rounded-md shadow-md overflow-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}

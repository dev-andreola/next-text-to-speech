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
    <html lang="pt-br" className="h-dvh">
      <body className={cn("bg-zinc-200 p-4 ", inter.className)}>
        <div>
          <div className="bg-zinc-100 max-w-2xl max-h-full md:max-w-4xl mx-auto rounded-md shadow-md ">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}

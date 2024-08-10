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
      <body
        className={cn(
          "min-h-screen relative max-h-dvh overflow-hidden",
          inter.className
        )}
      >
        <div className="absolute top-0 left-0 w-full h-screen ">
          <div className=" h-full overflow-hidden">
            <div className="bg-zinc-100  max-w-2xl md:max-w-4xl mx-auto rounded-md shadow-md">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

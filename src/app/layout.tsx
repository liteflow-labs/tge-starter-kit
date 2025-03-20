import { Providers } from "@/components/providers";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TGE Starter Kit",
  description: "TGE Starter kit for a Liteflow application",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-muted/50 antialiased`}
      >
        <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-primary/20 to-accent/20 blur-xl" />
        <Providers cookie={(await headers()).get("cookie") || ""}>
          {children}
        </Providers>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_Khmer } from "next/font/google";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SiteHeader from "@/components/navigation/SiteHeader";
import thumbnail from "../../public/Thumbnail.png";
import "./globals.css";

// 1. Initialize all fonts with required subsets
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoKhmer = Noto_Sans_Khmer({
  variable: "--font-noto-khmer",
  subsets: ["khmer"],
  weight: ["400", "500", "700"], // Define weights needed for Khmer text
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.SITE_URL ||
      (process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : "http://localhost:3000")
  ),
  title: "NOVA — Everyday essentials",
  description: "A simple, modern storefront for everyday essentials.",
  openGraph: {
    images: [
      {
        url: thumbnail.src,
        width: thumbnail.width,
        height: thumbnail.height,
        alt: "M2 thumbnail",
      },
    ],
  },
};

// 2. Define proper TypeScript layout props
interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${notoKhmer.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-[#f7f7f4] text-slate-950">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-slate-200 bg-white">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
            <div>
              <p className="font-bold tracking-tight">NOVA</p>
              <p className="mt-1 text-sm text-slate-500">Simple products. Thoughtful design.</p>
            </div>
            <div className="flex gap-5 text-sm font-medium text-slate-600">
              <Link href="/about" className="hover:text-slate-950">About</Link>
              <Link href="/product" className="flex items-center gap-1 hover:text-slate-950">Shop <ArrowUpRight className="size-3.5" /></Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

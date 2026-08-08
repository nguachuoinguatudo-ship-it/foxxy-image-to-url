import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ToastProvider";
import AppShell from "@/components/AppShell";

const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FOXXY — Image to URL instantly",
  description:
    "Upload an image, get a shareable URL in seconds. Powered by Vercel Blob storage with CDN caching. Crafted by Wanz.",
  keywords: ["image to url", "image host", "upload image", "vercel blob", "foxxy"],
  authors: [{ name: "Wanz" }],
  openGraph: {
    title: "FOXXY — Image to URL instantly",
    description:
      "Upload an image, get a shareable URL in seconds. Powered by Vercel Blob storage.",
    type: "website",
  },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#05060b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${space.variable} ${jetbrains.variable}`}>
      <body className="noise-overlay min-h-screen antialiased">
        <ToastProvider>
          <AppShell>{children}</AppShell>
        </ToastProvider>
      </body>
    </html>
  );
}

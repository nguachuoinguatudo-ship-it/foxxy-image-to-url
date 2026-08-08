import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ToastProvider";
import AppShell from "@/components/AppShell";
import MaintenanceScreen from "@/components/MaintenanceScreen";
import { head } from "@vercel/blob";

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

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "FOXXY — Image to URL instantly",
  description:
    "Upload an image, get a shareable URL in seconds. Powered by Wanz Cloud. Crafted by Wanz.",
  keywords: ["image to url", "image host", "upload image", "image hosting", "foxxy"],
  authors: [{ name: "Wanz" }],
  openGraph: {
    title: "FOXXY — Image to URL instantly",
    description:
      "Upload an image, get a shareable URL in seconds. Powered by Wanz Cloud.",
    type: "website",
  },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#05060b",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const maintenance = await head("foxxy-maintenance.flag")
    .then(() => true)
    .catch(() => false);

  return (
    <html lang="en" className={`${space.variable} ${jetbrains.variable}`}>
      <body className="noise-overlay min-h-screen antialiased">
        {maintenance ? (
          <MaintenanceScreen />
        ) : (
          <ToastProvider>
            <AppShell>{children}</AppShell>
          </ToastProvider>
        )}
      </body>
    </html>
  );
}

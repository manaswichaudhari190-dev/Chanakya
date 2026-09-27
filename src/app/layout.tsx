import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "CHANAKYA — Standards-aware procurement intelligence",
  description:
    "CHANAKYA helps procurement teams identify the right Indian Standards, understand their relationships, verify currency and compliance, and resolve gaps in tender specifications.",
  keywords: [
    "CHANAKYA",
    "Indian Standards",
    "procurement intelligence",
    "tender compliance",
    "BIS",
    "QCO",
    "standards graph",
    "tender gap analysis",
  ],
  authors: [{ name: "CHANAKYA" }],
  openGraph: {
    title: "CHANAKYA — Standards-aware procurement intelligence",
    description:
      "Evidence-backed recommendations for Indian Standards and tender compliance. Built for procurement officers.",
    siteName: "CHANAKYA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-background text-foreground">
        {children}
        <Toaster />
      </body>
    </html>
  );
}

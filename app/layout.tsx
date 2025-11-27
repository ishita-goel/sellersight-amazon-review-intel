import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 🔥 This controls your tab title + SEO + favicon
export const metadata: Metadata = {
  title: {
    default: "SellerSight — Amazon Review Intelligence",
    template: "%s · SellerSight",
  },
  description:
    "AI-powered review insights, sentiment analysis, and competitor intelligence for Amazon sellers.",
  keywords: [
    "Amazon reviews",
    "Product intelligence",
    "Sentiment analysis",
    "Ecommerce analytics",
    "AI for Amazon sellers",
  ],
  icons: {
    icon: "/sellersight-logo.png",
    shortcut: "/sellersight-logo.png",
    apple: "/sellersight-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

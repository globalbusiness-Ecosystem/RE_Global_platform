import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";

const tajawal = Tajawal({ 
  subsets: ["arabic"],
  weight: ["300","400","500","700","800"]
});

export const metadata: Metadata = {
  title: "RE — منصة العقارات العالمية",
  description: "منصة عقارات عالمية لامركزية على Pi Network",
  manifest: "/manifest.json",
  themeColor: "#060608",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "RE Platform",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        {/* Pi Network SDK */}
        <script src="https://sdk.minepi.com/pi-sdk.js" async></script>
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className={tajawal.className}>{children}</body>
    </html>
  );
}

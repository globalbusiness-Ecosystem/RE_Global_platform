import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RE — منصة العقارات العالمية",
  description: "منصة عقارات عالمية لامركزية على Pi Network",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <script src="https://sdk.minepi.com/pi-sdk.js" async></script>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#060608" />
      </head>
      <body>{children}</body>
    </html>
  );
}

import "leaflet/dist/leaflet.css";
import "./globals.css";

import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { FooterNotice } from "@/components/FooterNotice";

export const metadata: Metadata = {
  title: "東北クマ出没・安全確認マップ",
  description: "東北6県の公式クマ出没情報をまとめて確認できる安全確認マップMVPです。"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="font-sans">
        <div className="flex min-h-screen flex-col bg-slate-50">
          <Header />
          <main className="flex-1">{children}</main>
          <FooterNotice />
        </div>
      </body>
    </html>
  );
}

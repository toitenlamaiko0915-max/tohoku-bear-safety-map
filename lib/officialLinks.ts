import type { OfficialLink } from "@/lib/types";

export const officialLinks: OfficialLink[] = [
  {
    prefecture: "青森県",
    name: "くまログあおもり",
    description: "公式マップへのリンク",
    url: "https://example.com/aomori",
    note: "青森県内のクマ出没情報を確認する入口です。URLは本番時に公式ページへ差し替えてください。"
  },
  {
    prefecture: "岩手県",
    name: "Bears",
    description: "アプリ・投稿・閲覧案内",
    url: "https://example.com/iwate",
    note: "岩手県の閲覧案内や関連アプリへの導線を想定しています。"
  },
  {
    prefecture: "宮城県",
    name: "クマ目撃等情報マップ",
    description: "Google Map／Excel情報",
    url: "https://example.com/miyagi",
    note: "地図とExcel形式の公式情報への案内をまとめる想定です。"
  },
  {
    prefecture: "秋田県",
    name: "クマダス",
    description: "マップ／メール配信／オープンデータ",
    url: "https://example.com/akita",
    note: "秋田県の公式マップ、配信、オープンデータへの入口として扱います。"
  },
  {
    prefecture: "山形県",
    name: "けものおと2",
    description: "マップ／アプリ案内",
    url: "https://example.com/yamagata",
    note: "山形県のマップ・アプリ情報への案内を想定しています。"
  },
  {
    prefecture: "福島県",
    name: "ツキノワグマ目撃情報",
    description: "地図／Excel情報",
    url: "https://example.com/fukushima",
    note: "福島県の地図・Excel形式の公式情報への入口です。"
  }
];

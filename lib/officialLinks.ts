import type { OfficialLink } from "@/lib/types";

export const prefectureOfficialLinks: OfficialLink[] = [
  {
    prefecture: "青森県",
    name: "くまログあおもり",
    description: "青森県内のクマ出没情報・人身被害情報を確認できる公式情報システムです。",
    url: "https://kumalog-aomori.info/",
    note: "最新情報はリンク先の公式情報ページで確認してください。"
  },
  {
    prefecture: "岩手県",
    name: "Bears",
    description: "岩手県のクマ出没情報投稿・閲覧アプリ「Bears」の公式利用案内ページです。",
    url: "https://www.pref.iwate.jp/kurashikankyou/shizen/yasei/1049881/1096154.html",
    note: "最新情報はリンク先の公式情報ページで確認してください。"
  },
  {
    prefecture: "宮城県",
    name: "令和8年度クマ目撃等情報",
    description: "宮城県のクマ目撃等情報マップとExcel集計表を確認できる公式情報ページです。",
    url: "https://www.pref.miyagi.jp/soshiki/sizenhogo/r8kumamokugeki.html",
    note: "最新情報はリンク先の公式情報ページで確認してください。"
  },
  {
    prefecture: "秋田県",
    name: "クマダス",
    description: "秋田県内のツキノワグマ等出没情報を確認できる情報マップシステムです。",
    url: "https://kumadas.net/",
    note: "最新情報はリンク先の公式情報ページで確認してください。"
  },
  {
    prefecture: "山形県",
    name: "ツキノワグマ目撃マップ／けものおと2",
    description: "山形県の最新クマ目撃マップ「けものおと2」への案内ページです。",
    url: "https://www.pref.yamagata.jp/050011/kurashi/shizen/seibutsu/about_kuma/kuma/index.html",
    note: "最新情報はリンク先の公式情報ページで確認してください。"
  },
  {
    prefecture: "福島県",
    name: "福島県ツキノワグマ目撃情報",
    description: "福島県警提供情報を基にしたツキノワグマ目撃情報マップとExcel情報の公式情報ページです。",
    url: "https://www.pref.fukushima.lg.jp/sec/16035b/tukinowaguma-mokugeki.html",
    note: "最新情報はリンク先の公式情報ページで確認してください。"
  }
];

export const environmentOfficialLink: OfficialLink = {
  prefecture: "環境省",
  name: "国民向けのクマに関する情報",
  description: "都道府県が提供するクマ出没情報への入口をまとめた環境省の公式情報ページです。",
  url: "https://www.env.go.jp/nature/choju/effort/effort12/kuma-info-citizen.html",
  note: "各都道府県の公式情報ページへの入口として確認できます。"
};

export const officialLinks: OfficialLink[] = [...prefectureOfficialLinks, environmentOfficialLink];

import Link from "next/link";
import { ArrowRight, CalendarDays, ExternalLink, MapPinned, ShieldAlert, Siren } from "lucide-react";
import { PrefectureCard } from "@/components/PrefectureCard";
import { RiskGuide } from "@/components/RiskGuide";
import { environmentOfficialLink, prefectureOfficialLinks } from "@/lib/officialLinks";

export default function HomePage() {
  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
        <div className="rounded border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
          <p className="mb-3 inline-flex rounded bg-forest-50 px-3 py-1 text-sm font-extrabold text-forest-800 ring-1 ring-forest-100">
            東北6県の公式情報入口
          </p>
          <h1 className="text-3xl font-extrabold text-slate-950 sm:text-4xl">東北クマ出没・安全確認マップ</h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-700">
            東北6県の公式クマ出没情報をまとめて確認できます。このサイトは速報・参考情報です。
            緊急時は110番、人身被害時は119番へ連絡してください。
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
            <p className="inline-flex items-center gap-2 rounded border border-civic-100 bg-civic-50 px-3 py-2 text-sm font-extrabold text-civic-800">
              <CalendarDays aria-hidden="true" className="h-4 w-4 flex-none" />
              最終更新日：2026年6月14日
            </p>
            <Link href="/updates" className="text-sm font-extrabold text-forest-800 underline-offset-4 hover:underline">
              更新履歴を見る
            </Link>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <Link
              href="/map"
              className="flex min-h-12 items-center justify-center gap-2 rounded bg-forest-700 px-4 py-3 text-sm font-extrabold text-white transition hover:bg-forest-800 focus:outline-none focus:ring-2 focus:ring-forest-600 focus:ring-offset-2"
            >
              <MapPinned aria-hidden="true" className="h-5 w-5" />
              地図を見る
            </Link>
            <Link
              href="/official-links"
              className="flex min-h-12 items-center justify-center gap-2 rounded border border-civic-600 bg-white px-4 py-3 text-sm font-extrabold text-civic-800 transition hover:bg-civic-50 focus:outline-none focus:ring-2 focus:ring-civic-600 focus:ring-offset-2"
            >
              <ExternalLink aria-hidden="true" className="h-5 w-5" />
              県別公式情報を見る
            </Link>
            <Link
              href="/safety"
              className="flex min-h-12 items-center justify-center gap-2 rounded border border-red-300 bg-red-50 px-4 py-3 text-sm font-extrabold text-red-900 transition hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
            >
              <ShieldAlert aria-hidden="true" className="h-5 w-5" />
              行動を見る
            </Link>
          </div>
        </div>
        <aside className="rounded border border-amber-300 bg-amber-50 p-6 shadow-soft">
          <div className="mb-4 flex items-start gap-3">
            <Siren aria-hidden="true" className="mt-1 h-6 w-6 text-amber-700" />
            <div>
              <h2 className="text-xl font-extrabold text-amber-950">今日の注意メッセージ</h2>
              <p className="mt-2 text-sm leading-7 text-amber-950">
                東北各県でクマ出没情報が更新されています。外出前に各県の公式情報をご確認ください。
              </p>
            </div>
          </div>
          <div className="rounded border border-amber-200 bg-white p-4 text-sm leading-7 text-slate-700">
            このサイトは公式情報を確認しやすくするための参考サイトです。情報の正確性・最新性を保証するものではありません。
            このサイトの情報だけで安全判断を行わず、必ず自治体・警察・消防など公的機関の情報を確認してください。
          </div>
        </aside>
      </section>

      <section>
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-950">県別カード</h2>
            <p className="mt-1 text-sm text-slate-600">公式マップ・アプリ・Excel情報への入口をまとめています。</p>
          </div>
          <Link href="/official-links" className="inline-flex items-center gap-2 text-sm font-extrabold text-forest-800">
            すべての公式情報へ
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {prefectureOfficialLinks.map((link) => (
            <PrefectureCard key={link.prefecture} link={link} />
          ))}
        </div>
      </section>

      <RiskGuide />

      <section className="rounded border border-slate-200 bg-white p-5 shadow-soft">
        <h2 className="text-xl font-extrabold text-slate-900">公式情報へのリンク案内</h2>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          東北6県の公式情報ページと、都道府県の情報入口をまとめた環境省ページを確認できます。
        </p>
        <p className="mt-4 text-xs font-bold text-slate-500">外部サイトへ移動します</p>
        <a
          href={environmentOfficialLink.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex min-h-11 items-center gap-2 rounded border border-civic-600 px-4 py-2 text-sm font-extrabold text-civic-800 transition hover:bg-civic-50 focus:outline-none focus:ring-2 focus:ring-civic-600"
        >
          環境省の公式情報ページを開く
          <ExternalLink aria-hidden="true" className="h-4 w-4" />
        </a>
      </section>
    </div>
  );
}

import Link from "next/link";
import { AlertTriangle, CalendarDays, ExternalLink, MapPinned } from "lucide-react";

export default function UpdatesPage() {
  return (
    <div className="mx-auto grid max-w-5xl gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <section className="rounded border border-slate-200 bg-white p-6 shadow-soft">
        <p className="inline-flex rounded bg-civic-50 px-3 py-1 text-sm font-extrabold text-civic-800 ring-1 ring-civic-100">
          更新履歴
        </p>
        <h1 className="mt-3 text-3xl font-extrabold text-slate-950">サイト更新情報</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-700">
          このページでは、東北クマ出没・安全確認マップの主な更新内容を記録します。
          掲載内容は公式情報を確認しやすくするための参考表示です。
        </p>
      </section>

      <article className="rounded border border-slate-200 bg-white p-6 shadow-soft">
        <div className="flex items-start gap-3">
          <CalendarDays aria-hidden="true" className="mt-1 h-5 w-5 text-forest-700" />
          <div>
            <h2 className="text-xl font-extrabold text-slate-950">2026年6月14日</h2>
            <p className="mt-1 text-sm leading-7 text-slate-600">
              公開運用に向けて、CSVデータと表示ページを安全性優先で整理しました。
            </p>
          </div>
        </div>
        <ul className="mt-5 grid gap-3 text-sm leading-7 text-slate-700">
          <li className="rounded border border-slate-200 bg-slate-50 p-3">東北6県の公式クマ出没情報を確認しました。</li>
          <li className="rounded border border-slate-200 bg-slate-50 p-3">
            各県の公式情報で確認できる最新日分を確認し、掲載可能な範囲でCSVデータを更新しました。
          </li>
          <li className="rounded border border-slate-200 bg-slate-50 p-3">くま出没一覧の表示件数を調整しました。</li>
          <li className="rounded border border-slate-200 bg-slate-50 p-3">/updates ページを新規作成しました。</li>
          <li className="rounded border border-slate-200 bg-slate-50 p-3">地図上の位置は概略表示です。</li>
          <li className="rounded border border-slate-200 bg-slate-50 p-3">
            最新・詳細情報は必ず各公式情報をご確認ください。
          </li>
        </ul>
      </article>

      <section className="rounded border border-amber-300 bg-amber-50 p-5 text-sm leading-7 text-amber-950">
        <div className="mb-2 flex items-center gap-2 font-extrabold">
          <AlertTriangle aria-hidden="true" className="h-5 w-5" />
          確認時の注意
        </div>
        <p>
          このサイトは速報・参考情報です。地図上の位置は概略表示で、詳細住所や施設を示すものではありません。
          緊急時は110番、人身被害時は119番へ連絡してください。
        </p>
      </section>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/map"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded bg-forest-700 px-4 py-2 text-sm font-extrabold text-white transition hover:bg-forest-800 focus:outline-none focus:ring-2 focus:ring-forest-600 focus:ring-offset-2"
        >
          <MapPinned aria-hidden="true" className="h-4 w-4" />
          地図を見る
        </Link>
        <Link
          href="/official-links"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded border border-civic-600 bg-white px-4 py-2 text-sm font-extrabold text-civic-800 transition hover:bg-civic-50 focus:outline-none focus:ring-2 focus:ring-civic-600 focus:ring-offset-2"
        >
          <ExternalLink aria-hidden="true" className="h-4 w-4" />
          公式情報へのリンクを見る
        </Link>
      </div>
    </div>
  );
}

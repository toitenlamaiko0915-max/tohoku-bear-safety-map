import Link from "next/link";
import { AlertTriangle, ExternalLink, Info, MapPinned, ShieldAlert } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="mx-auto grid max-w-5xl gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <section className="rounded border border-slate-200 bg-white p-6 shadow-soft">
        <p className="inline-flex rounded bg-forest-50 px-3 py-1 text-sm font-extrabold text-forest-800 ring-1 ring-forest-100">
          このサイトについて
        </p>
        <h1 className="mt-3 text-3xl font-extrabold text-slate-950">東北クマ出没・安全確認マップの方針</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-700">
          このサイトは公式サイトではなく、東北6県のクマ出没に関する公式情報への入口をまとめ、確認しやすくするための参考サイトです。
          対象地域は青森県、岩手県、宮城県、秋田県、山形県、福島県です。
          公的機関そのものの発信ではなく、安全を保証するものでもありません。
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded border border-slate-200 bg-white p-5 shadow-soft">
          <div className="mb-3 flex items-center gap-2 text-forest-800">
            <Info aria-hidden="true" className="h-5 w-5" />
            <h2 className="text-lg font-extrabold">掲載する情報</h2>
          </div>
          <p className="text-sm leading-7 text-slate-700">
            各県や環境省など、公的機関が公開している情報へのリンクを掲載します。
            CSVデータは出典URLを確認できる情報だけを掲載対象にします。
          </p>
        </div>

        <div className="rounded border border-slate-200 bg-white p-5 shadow-soft">
          <div className="mb-3 flex items-center gap-2 text-civic-800">
            <MapPinned aria-hidden="true" className="h-5 w-5" />
            <h2 className="text-lg font-extrabold">地図表示</h2>
          </div>
          <p className="text-sm leading-7 text-slate-700">
            地図上の位置は概略表示です。詳細住所、民家、学校、施設などを示すピンポイントの位置情報は表示しません。
            詳細は必ず各県の公式情報ページをご確認ください。
          </p>
        </div>

        <div className="rounded border border-slate-200 bg-white p-5 shadow-soft">
          <div className="mb-3 flex items-center gap-2 text-red-800">
            <ShieldAlert aria-hidden="true" className="h-5 w-5" />
            <h2 className="text-lg font-extrabold">掲載しない情報</h2>
          </div>
          <p className="text-sm leading-7 text-slate-700">
            SNS、ブログ、噂、出典URLを確認できない情報は掲載対象にしません。
            このサイト独自の危険判定や安全判断、即時更新を示す表現は行いません。
          </p>
        </div>

        <div className="rounded border border-slate-200 bg-white p-5 shadow-soft">
          <div className="mb-3 flex items-center gap-2 text-amber-800">
            <AlertTriangle aria-hidden="true" className="h-5 w-5" />
            <h2 className="text-lg font-extrabold">緊急時</h2>
          </div>
          <p className="text-sm leading-7 text-slate-700">
            緊急時は110番、人身被害時は119番へ連絡してください。
            このサイトの情報だけで判断せず、自治体・警察・消防など公的機関の情報を確認してください。
          </p>
        </div>
      </section>

      <section className="rounded border border-slate-200 bg-white p-5 shadow-soft">
        <h2 className="text-lg font-extrabold text-slate-950">日付の扱い</h2>
        <p className="mt-2 text-sm leading-7 text-slate-700">
          発生日、掲載日、更新日は意味が異なるため、CSV入力時には公式情報に記載された内容を混同しないように扱います。
          個別詳細が確認できない場合は推測で補完せず、概略表示として扱います。
        </p>
      </section>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/official-links"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded border border-civic-600 bg-white px-4 py-2 text-sm font-extrabold text-civic-800 transition hover:bg-civic-50 focus:outline-none focus:ring-2 focus:ring-civic-600 focus:ring-offset-2"
        >
          <ExternalLink aria-hidden="true" className="h-4 w-4" />
          公式情報へのリンクを見る
        </Link>
        <Link
          href="/updates"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded bg-forest-700 px-4 py-2 text-sm font-extrabold text-white transition hover:bg-forest-800 focus:outline-none focus:ring-2 focus:ring-forest-600 focus:ring-offset-2"
        >
          更新履歴を見る
        </Link>
      </div>
    </div>
  );
}

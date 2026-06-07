import { AlertTriangle } from "lucide-react";
import { OfficialLinkCard } from "@/components/OfficialLinkCard";
import { officialLinks } from "@/lib/officialLinks";

export default function OfficialLinksPage() {
  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <section className="rounded border border-slate-200 bg-white p-6 shadow-soft">
        <h1 className="text-3xl font-extrabold text-slate-950">県別公式情報</h1>
        <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-700">
          東北6県の公式クマ出没情報への入口を1ページにまとめています。MVPでは仮URLを使用しているため、
          公開前に各県の公式URLへ差し替えてください。
        </p>
        <div className="mt-4 flex items-start gap-2 rounded border border-amber-300 bg-amber-50 p-3 text-sm leading-6 text-amber-950">
          <AlertTriangle aria-hidden="true" className="mt-1 h-5 w-5 flex-none" />
          <p>非公式情報を公式情報のように表示しないため、リンク先と掲載元の確認を優先してください。</p>
        </div>
      </section>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {officialLinks.map((link) => (
          <OfficialLinkCard key={link.prefecture} link={link} />
        ))}
      </section>
    </div>
  );
}

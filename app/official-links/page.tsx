import { AlertTriangle } from "lucide-react";
import { OfficialLinkCard } from "@/components/OfficialLinkCard";
import { officialLinks } from "@/lib/officialLinks";

export default function OfficialLinksPage() {
  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <section className="rounded border border-slate-200 bg-white p-6 shadow-soft">
        <h1 className="text-3xl font-extrabold text-slate-950">県別公式情報</h1>
        <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-700">
          東北6県のクマ出没情報に関する公式情報ページへの入口を1ページにまとめています。
          環境省の国民向け情報ページもあわせて確認できます。
        </p>
        <div className="mt-4 flex items-start gap-2 rounded border border-amber-300 bg-amber-50 p-3 text-sm leading-6 text-amber-950">
          <AlertTriangle aria-hidden="true" className="mt-1 h-5 w-5 flex-none" />
          <p>リンク先と掲載元を確認し、最新情報は各公的機関の公式情報ページで確認してください。</p>
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

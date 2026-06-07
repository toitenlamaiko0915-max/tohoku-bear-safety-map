import { ExternalLink } from "lucide-react";
import type { OfficialLink } from "@/lib/types";

export function OfficialLinkCard({ link }: { link: OfficialLink }) {
  return (
    <article className="rounded border border-slate-200 bg-white p-5 shadow-soft">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-extrabold text-forest-700">{link.prefecture}</p>
          <h2 className="mt-1 text-xl font-extrabold text-slate-900">{link.name}</h2>
        </div>
        <span className="rounded bg-civic-50 p-2 text-civic-700">
          <ExternalLink aria-hidden="true" className="h-5 w-5" />
        </span>
      </div>
      <p className="text-sm font-bold text-slate-800">{link.description}</p>
      <p className="mt-3 text-sm leading-6 text-slate-600">{link.note}</p>
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex min-h-11 items-center gap-2 rounded bg-forest-700 px-4 py-2 text-sm font-extrabold text-white transition hover:bg-forest-800 focus:outline-none focus:ring-2 focus:ring-forest-600 focus:ring-offset-2"
      >
        公式情報ページを開く
        <ExternalLink aria-hidden="true" className="h-4 w-4" />
      </a>
      <p className="mt-2 text-xs font-bold text-slate-500">外部サイトへ移動します</p>
    </article>
  );
}

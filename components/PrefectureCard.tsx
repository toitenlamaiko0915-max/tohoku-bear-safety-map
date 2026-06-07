import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import type { OfficialLink } from "@/lib/types";

export function PrefectureCard({ link }: { link: OfficialLink }) {
  return (
    <article className="rounded border border-slate-200 bg-white p-4 shadow-soft">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-extrabold text-slate-900">{link.prefecture}</h3>
          <p className="mt-1 text-sm font-bold text-forest-700">{link.name}</p>
        </div>
        <ExternalLink aria-hidden="true" className="h-5 w-5 flex-none text-civic-700" />
      </div>
      <p className="text-sm font-medium text-slate-700">{link.description}</p>
      <p className="mt-3 text-sm leading-6 text-slate-600">{link.note}</p>
      <Link
        href="/official-links"
        className="mt-4 inline-flex min-h-11 items-center gap-2 rounded bg-forest-700 px-4 py-2 text-sm font-extrabold text-white transition hover:bg-forest-800 focus:outline-none focus:ring-2 focus:ring-forest-600 focus:ring-offset-2"
      >
        公式情報を見る
        <ArrowRight aria-hidden="true" className="h-4 w-4" />
      </Link>
    </article>
  );
}

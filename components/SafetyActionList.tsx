import { AlertTriangle, Phone, ShieldCheck } from "lucide-react";

const actions = [
  "近づかない",
  "写真を撮ろうとしない",
  "背を向けて走らない",
  "静かに距離を取る",
  "住宅地・学校周辺なら警察や自治体へ連絡",
  "人身被害がある場合は119番"
];

export function SafetyActionList() {
  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <div className="rounded border border-slate-200 bg-white p-5 shadow-soft">
        <div className="mb-5 flex items-start gap-3">
          <ShieldCheck aria-hidden="true" className="mt-1 h-6 w-6 text-forest-700" />
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">クマを見かけたら</h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">落ち着いて距離を取り、公的機関の情報や指示を確認してください。</p>
          </div>
        </div>
        <ol className="grid gap-3">
          {actions.map((action, index) => (
            <li key={action} className="flex gap-3 rounded border border-slate-200 bg-slate-50 p-4">
              <span className="flex h-7 w-7 flex-none items-center justify-center rounded bg-forest-700 text-sm font-extrabold text-white">
                {index + 1}
              </span>
              <span className="pt-1 text-base font-bold text-slate-800">{action}</span>
            </li>
          ))}
        </ol>
      </div>
      <aside className="rounded border border-red-200 bg-red-50 p-5 text-red-950 shadow-soft">
        <div className="mb-3 flex items-center gap-2 font-extrabold">
          <Phone aria-hidden="true" className="h-5 w-5" />
          緊急連絡
        </div>
        <p className="text-sm leading-7">緊急時は110番、人身被害時は119番へ連絡してください。</p>
        <div className="mt-5 flex items-start gap-2 rounded border border-red-200 bg-white p-3 text-sm leading-6">
          <AlertTriangle aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-red-700" />
          <p>このページの情報は一般的な注意喚起です。緊急時は必ず警察・消防・自治体などの公的機関の指示に従ってください。</p>
        </div>
      </aside>
    </section>
  );
}

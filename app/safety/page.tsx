import { SafetyActionList } from "@/components/SafetyActionList";

export default function SafetyPage() {
  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <section className="rounded border border-slate-200 bg-white p-6 shadow-soft">
        <h1 className="text-3xl font-extrabold text-slate-950">クマに遭遇した時の行動</h1>
        <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-700">
          クマを見かけた時の一般的な行動をまとめています。状況が切迫している場合は、このページの確認よりも
          警察・消防・自治体など公的機関への連絡を優先してください。
        </p>
      </section>
      <SafetyActionList />
    </div>
  );
}

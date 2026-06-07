import { AlertTriangle } from "lucide-react";
import BearMap from "@/components/BearMap";

export default function MapPage() {
  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <section className="rounded border border-slate-200 bg-white p-6 shadow-soft">
        <h1 className="text-3xl font-extrabold text-slate-950">クマ出没マップ</h1>
        <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-700">
          CSVデータから出没情報を読み込み、東北6県の地図上に表示します。詳細住所や緯度経度は画面上に出さず、
          位置精度がある場合は範囲情報として扱います。
        </p>
        <div className="mt-4 flex items-start gap-2 rounded border border-amber-300 bg-amber-50 p-3 text-sm leading-6 text-amber-950">
          <AlertTriangle aria-hidden="true" className="mt-1 h-5 w-5 flex-none" />
          <p>この地図は安全を保証するものではありません。緊急時は行政・警察・消防へ連絡してください。</p>
        </div>
      </section>
      <BearMap />
    </div>
  );
}

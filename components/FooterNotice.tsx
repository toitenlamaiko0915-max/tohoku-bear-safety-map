import { AlertTriangle } from "lucide-react";

export function FooterNotice() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="rounded border border-amber-300 bg-amber-50 p-4 text-sm leading-7 text-slate-800">
          <div className="mb-2 flex items-center gap-2 font-extrabold text-amber-900">
            <AlertTriangle aria-hidden="true" className="h-5 w-5" />
            緊急時の注意
          </div>
          <p>
            このサイトは、東北6県の公式クマ出没情報を確認しやすくするための参考サイトです。
            情報の正確性・最新性を保証するものではありません。緊急時は110番、人身被害時は119番へ連絡してください。
            地図上の位置は概略表示です。実際の詳細情報は各県の公式情報をご確認ください。
            このサイトの情報だけで安全判断を行わず、必ず自治体・警察・消防など公的機関の情報を確認してください。
          </p>
        </div>
      </div>
    </footer>
  );
}

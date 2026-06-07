import { AlertTriangle, Clock, Info } from "lucide-react";
import { eventTypeStyles, freshnessStyles } from "@/lib/sightings";
import { eventTypes, freshnessTypes } from "@/lib/types";

export function RiskGuide() {
  return (
    <section className="rounded border border-slate-200 bg-white p-5 shadow-soft">
      <div className="mb-4 flex items-start gap-3">
        <Info aria-hidden="true" className="mt-1 h-5 w-5 text-civic-700" />
        <div>
          <h2 className="text-xl font-extrabold text-slate-900">危険度の見方</h2>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            このMVPではAIによる危険判定は行いません。種別と情報鮮度を見分けやすく表示します。
          </p>
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <h3 className="mb-3 flex items-center gap-2 text-sm font-extrabold text-slate-800">
            <AlertTriangle aria-hidden="true" className="h-4 w-4 text-amber-600" />
            出没種別
          </h3>
          <div className="grid gap-2 sm:grid-cols-2">
            {eventTypes.map((type) => (
              <div key={type} className="flex items-center gap-3 rounded border border-slate-200 p-3">
                <span className={`bear-marker ${eventTypeStyles[type].markerClass}`} aria-hidden="true">
                  {eventTypeStyles[type].shortLabel}
                </span>
                <span className="text-sm font-bold text-slate-800">{eventTypeStyles[type].label}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-3 flex items-center gap-2 text-sm font-extrabold text-slate-800">
            <Clock aria-hidden="true" className="h-4 w-4 text-civic-700" />
            情報鮮度
          </h3>
          <div className="grid gap-2 sm:grid-cols-2">
            {freshnessTypes.map((type) => (
              <div key={type} className={`rounded border border-l-4 border-slate-200 p-3 ${freshnessStyles[type].itemClass}`}>
                <span className={`inline-flex rounded px-2 py-1 text-xs font-extrabold ring-1 ${freshnessStyles[type].badgeClass}`}>
                  {type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

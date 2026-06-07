import type { BearSighting } from "@/lib/types";
import { eventTypeStyles } from "@/lib/sightings";

export function SightingPopup({ sighting }: { sighting: BearSighting }) {
  return (
    <div>
      <h3>{`${sighting.prefecture}${sighting.municipality}${sighting.area}周辺`}</h3>
      <p>発生日：{sighting.occurred_at}</p>
      <p>種別：{sighting.event_type}</p>
      <p>内容：{sighting.description}</p>
      <p>情報源：{sighting.source_name}</p>
    </div>
  );
}

export function renderSightingPopupHtml(sighting: BearSighting): string {
  const accuracy = Number.isFinite(sighting.accuracy_m) && sighting.accuracy_m > 0 ? `${sighting.accuracy_m}m程度の範囲の情報` : "位置精度の指定なし";

  return `
    <div class="sighting-popup">
      <h3 class="sighting-popup__title">${escapeHtml(sighting.prefecture)}${escapeHtml(sighting.municipality)}${escapeHtml(sighting.area)}周辺</h3>
      <p class="sighting-popup__row"><strong>発生日：</strong>${escapeHtml(sighting.occurred_at)}</p>
      <p class="sighting-popup__row"><strong>種別：</strong>${escapeHtml(eventTypeStyles[sighting.event_type].label)}</p>
      <p class="sighting-popup__row"><strong>内容：</strong>${escapeHtml(sighting.description)}</p>
      <p class="sighting-popup__row"><strong>範囲：</strong>${escapeHtml(accuracy)}</p>
      <p class="sighting-popup__row"><strong>状態：</strong>${escapeHtml(sighting.status)}</p>
      <p class="sighting-popup__row"><strong>情報源：</strong>${escapeHtml(sighting.source_name)}</p>
      <p class="sighting-popup__row"><a class="sighting-popup__link" href="${escapeAttribute(sighting.source_url)}" target="_blank" rel="noreferrer">詳細：公式ページへ</a></p>
    </div>
  `;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value: string): string {
  return escapeHtml(value).replaceAll("`", "&#096;");
}

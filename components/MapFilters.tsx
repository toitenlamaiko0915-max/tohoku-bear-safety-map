"use client";

import { RotateCcw } from "lucide-react";
import { eventTypes, freshnessTypes, prefectures, type BearEventType, type FreshnessType, type Prefecture } from "@/lib/types";

type MapFiltersProps = {
  selectedPrefectures: Prefecture[];
  selectedEventTypes: BearEventType[];
  selectedFreshness: FreshnessType[];
  totalCount: number;
  filteredCount: number;
  onTogglePrefecture: (prefecture: Prefecture) => void;
  onToggleEventType: (eventType: BearEventType) => void;
  onToggleFreshness: (freshness: FreshnessType) => void;
  onReset: () => void;
};

export function MapFilters({
  selectedPrefectures,
  selectedEventTypes,
  selectedFreshness,
  totalCount,
  filteredCount,
  onTogglePrefecture,
  onToggleEventType,
  onToggleFreshness,
  onReset
}: MapFiltersProps) {
  return (
    <aside className="rounded border border-slate-200 bg-white p-4 shadow-soft">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900">絞り込み</h2>
          <p className="mt-1 text-sm text-slate-600">
            表示中 {filteredCount}件 / 全{totalCount}件
          </p>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="flex min-h-10 items-center gap-2 rounded border border-slate-200 px-3 py-2 text-sm font-bold text-slate-700 transition hover:border-forest-600 hover:text-forest-800 focus:outline-none focus:ring-2 focus:ring-forest-600"
        >
          <RotateCcw aria-hidden="true" className="h-4 w-4" />
          リセット
        </button>
      </div>
      <FilterGroup title="県別フィルター">
        {prefectures.map((prefecture) => (
          <Checkbox
            key={prefecture}
            label={prefecture.replace("県", "")}
            checked={selectedPrefectures.includes(prefecture)}
            onChange={() => onTogglePrefecture(prefecture)}
          />
        ))}
      </FilterGroup>
      <FilterGroup title="時間フィルター">
        {freshnessTypes.map((freshness) => (
          <Checkbox
            key={freshness}
            label={freshness}
            checked={selectedFreshness.includes(freshness)}
            onChange={() => onToggleFreshness(freshness)}
          />
        ))}
      </FilterGroup>
      <FilterGroup title="種別フィルター">
        {eventTypes.map((eventType) => (
          <Checkbox
            key={eventType}
            label={eventType}
            checked={selectedEventTypes.includes(eventType)}
            onChange={() => onToggleEventType(eventType)}
          />
        ))}
      </FilterGroup>
    </aside>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="border-t border-slate-200 py-4 first:border-t-0 first:pt-0">
      <legend className="mb-3 text-sm font-extrabold text-slate-800">{title}</legend>
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-1">{children}</div>
    </fieldset>
  );
}

function Checkbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex min-h-11 cursor-pointer items-center gap-2 rounded border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-700">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 rounded border-slate-300 text-forest-700 focus:ring-forest-600"
      />
      <span>{label}</span>
    </label>
  );
}

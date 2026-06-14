"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ExternalLink, Loader2, MapPinned, ShieldAlert } from "lucide-react";
import { MapFilters } from "@/components/MapFilters";
import { renderSightingPopupHtml } from "@/components/SightingPopup";
import {
  eventTypeStyles,
  freshnessStyles,
  getDisplayDescription,
  getFreshness,
  parseBearSightingsCsv,
  sortSightingsByDate,
  sourceNotice
} from "@/lib/sightings";
import { eventTypes, freshnessTypes, prefectures, type BearEventType, type BearSighting, type FreshnessType, type Prefecture } from "@/lib/types";

type LeafletModule = typeof import("leaflet");

export default function BearMap() {
  const mapElementRef = useRef<HTMLDivElement | null>(null);
  const leafletRef = useRef<LeafletModule | null>(null);
  const mapRef = useRef<ReturnType<LeafletModule["map"]> | null>(null);
  const markerLayerRef = useRef<ReturnType<LeafletModule["layerGroup"]> | null>(null);
  const accuracyLayerRef = useRef<ReturnType<LeafletModule["layerGroup"]> | null>(null);
  const [sightings, setSightings] = useState<BearSighting[]>([]);
  const [csvError, setCsvError] = useState<string | null>(null);
  const [isCsvLoading, setIsCsvLoading] = useState(true);
  const [isMapReady, setIsMapReady] = useState(false);
  const [selectedPrefectures, setSelectedPrefectures] = useState<Prefecture[]>([...prefectures]);
  const [selectedEventTypes, setSelectedEventTypes] = useState<BearEventType[]>([...eventTypes]);
  const [selectedFreshness, setSelectedFreshness] = useState<FreshnessType[]>([...freshnessTypes]);

  useEffect(() => {
    let cancelled = false;

    async function loadSightings() {
      setIsCsvLoading(true);
      setCsvError(null);

      try {
        const response = await fetch("/data/bear_sightings.csv");
        if (!response.ok) {
          throw new Error(`CSVを読み込めませんでした: ${response.status}`);
        }
        const csv = await response.text();
        const parsed = sortSightingsByDate(parseBearSightingsCsv(csv));

        if (!cancelled) {
          setSightings(parsed);
        }
      } catch (error) {
        if (!cancelled) {
          setCsvError(error instanceof Error ? error.message : "CSVの読み込み中にエラーが発生しました。");
        }
      } finally {
        if (!cancelled) {
          setIsCsvLoading(false);
        }
      }
    }

    loadSightings();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let disposed = false;

    async function initializeMap() {
      if (!mapElementRef.current || mapRef.current) {
        return;
      }

      const L = await import("leaflet");
      if (disposed || !mapElementRef.current) {
        return;
      }

      leafletRef.current = L;
      const map = L.map(mapElementRef.current, {
        center: [39.25, 140.95],
        zoom: 6,
        minZoom: 5,
        scrollWheelZoom: false,
        attributionControl: false
      });

      L.control
        .attribution({
          prefix: '<a href="https://leafletjs.com" target="_blank" rel="noopener noreferrer">Leaflet</a>'
        })
        .addTo(map);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors'
      }).addTo(map);

      accuracyLayerRef.current = L.layerGroup().addTo(map);
      markerLayerRef.current = L.layerGroup().addTo(map);
      mapRef.current = map;
      setIsMapReady(true);

      window.setTimeout(() => {
        map.invalidateSize();
      }, 0);
    }

    initializeMap();

    return () => {
      disposed = true;
      mapRef.current?.remove();
      mapRef.current = null;
      markerLayerRef.current = null;
      accuracyLayerRef.current = null;
      leafletRef.current = null;
    };
  }, []);

  const publishedSightings = useMemo(() => sightings.filter((sighting) => sighting.status === "published"), [sightings]);

  const filteredSightings = useMemo(() => {
    return publishedSightings.filter((sighting) => {
      const freshness = getFreshness(sighting.occurred_at);
      return (
        selectedPrefectures.includes(sighting.prefecture as Prefecture) &&
        selectedEventTypes.includes(sighting.event_type) &&
        selectedFreshness.includes(freshness)
      );
    });
  }, [publishedSightings, selectedEventTypes, selectedFreshness, selectedPrefectures]);

  useEffect(() => {
    const L = leafletRef.current;
    const markerLayer = markerLayerRef.current;
    const accuracyLayer = accuracyLayerRef.current;

    if (!L || !markerLayer || !accuracyLayer) {
      return;
    }

    markerLayer.clearLayers();
    accuracyLayer.clearLayers();

    filteredSightings.forEach((sighting) => {
      const style = eventTypeStyles[sighting.event_type];
      const marker = L.marker([sighting.latitude, sighting.longitude], {
        icon: L.divIcon({
          className: "",
          html: `<span class="bear-marker ${style.markerClass}" aria-hidden="true">${style.shortLabel}</span>`,
          iconSize: [34, 34],
          iconAnchor: [17, 17],
          popupAnchor: [0, -18]
        })
      });

      marker.bindPopup(renderSightingPopupHtml(sighting));
      marker.addTo(markerLayer);

      if (Number.isFinite(sighting.accuracy_m) && sighting.accuracy_m > 0) {
        L.circle([sighting.latitude, sighting.longitude], {
          radius: sighting.accuracy_m,
          color: style.color,
          fillColor: style.color,
          fillOpacity: 0.08,
          opacity: 0.45,
          weight: 1
        }).addTo(accuracyLayer);
      }
    });
  }, [filteredSightings, isMapReady]);

  function togglePrefecture(prefecture: Prefecture) {
    setSelectedPrefectures((current) => toggleValue(current, prefecture));
  }

  function toggleEventType(eventType: BearEventType) {
    setSelectedEventTypes((current) => toggleValue(current, eventType));
  }

  function toggleFreshness(freshness: FreshnessType) {
    setSelectedFreshness((current) => toggleValue(current, freshness));
  }

  function resetFilters() {
    setSelectedPrefectures([...prefectures]);
    setSelectedEventTypes([...eventTypes]);
    setSelectedFreshness([...freshnessTypes]);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <MapFilters
        selectedPrefectures={selectedPrefectures}
        selectedEventTypes={selectedEventTypes}
        selectedFreshness={selectedFreshness}
        totalCount={publishedSightings.length}
        filteredCount={filteredSightings.length}
        onTogglePrefecture={togglePrefecture}
        onToggleEventType={toggleEventType}
        onToggleFreshness={toggleFreshness}
        onReset={resetFilters}
      />
      <section className="grid gap-5">
        <div className="overflow-hidden rounded border border-slate-200 bg-white shadow-soft">
          <div className="flex flex-col gap-3 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="flex items-center gap-2 text-lg font-extrabold text-slate-900">
                <MapPinned aria-hidden="true" className="h-5 w-5 text-forest-700" />
                東北6県の出没情報
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                地図上の位置は概略表示です。実際の詳細情報は各県の公式情報をご確認ください。
              </p>
            </div>
            <div className="rounded border border-amber-300 bg-amber-50 px-3 py-2 text-sm font-bold text-amber-950">
              安全判断は必ず公式情報で確認
            </div>
          </div>
          <div className="relative h-[420px] bg-slate-100 sm:h-[560px]">
            <div ref={mapElementRef} className="h-full w-full" aria-label="東北地方のクマ出没マップ" />
            {(!isMapReady || isCsvLoading) && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/75">
                <div className="flex items-center gap-2 rounded border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 shadow-soft">
                  <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
                  読み込み中
                </div>
              </div>
            )}
            {csvError && (
              <div className="absolute inset-x-4 bottom-4 rounded border border-red-200 bg-red-50 p-3 text-sm font-bold text-red-900">
                {csvError}
              </div>
            )}
          </div>
        </div>
        <SightingList sightings={filteredSightings} />
      </section>
    </div>
  );
}

function SightingList({ sightings }: { sightings: BearSighting[] }) {
  if (sightings.length === 0) {
    return (
      <section className="rounded border border-slate-200 bg-white p-5 text-sm text-slate-600 shadow-soft">
        条件に一致する出没情報はありません。フィルター条件を変更して確認してください。
      </section>
    );
  }

  return (
    <section className="rounded border border-slate-200 bg-white p-4 shadow-soft">
      <div className="mb-4 flex items-start gap-3">
        <ShieldAlert aria-hidden="true" className="mt-1 h-5 w-5 text-civic-700" />
        <div>
          <h2 className="text-lg font-extrabold text-slate-900">一覧でも確認</h2>
          <p className="mt-1 text-sm text-slate-600">地図が読み込めない場合でも、同じCSV情報を確認できます。</p>
        </div>
      </div>
      <div className="grid gap-3">
        {sightings.map((sighting) => {
          const freshness = getFreshness(sighting.occurred_at);
          const description = getDisplayDescription(sighting.description);
          return (
            <article key={sighting.id} className={`rounded border border-l-4 border-slate-200 p-4 ${freshnessStyles[freshness].itemClass}`}>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    {sighting.prefecture}
                    {sighting.municipality}
                    {sighting.area}
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">発生日：{sighting.occurred_at}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className={`rounded px-2 py-1 text-xs font-extrabold ring-1 ${eventTypeStyles[sighting.event_type].badgeClass}`}>
                    {sighting.event_type}
                  </span>
                  <span className={`rounded px-2 py-1 text-xs font-extrabold ring-1 ${freshnessStyles[freshness].badgeClass}`}>{freshness}</span>
                </div>
              </div>
              <dl className="mt-3 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
                <div>
                  <dt className="font-extrabold">内容</dt>
                  <dd className="mt-1 leading-6">{description}</dd>
                  <dd className="mt-2 rounded border border-slate-200 bg-slate-50 p-2 text-xs font-medium leading-5 text-slate-600">
                    {sourceNotice}
                  </dd>
                </div>
                <div>
                  <dt className="font-extrabold">情報源</dt>
                  <dd className="mt-1 leading-6">{sighting.source_name}</dd>
                </div>
                <div>
                  <dt className="font-extrabold">位置情報</dt>
                  <dd className="mt-1 leading-6">
                    {Number.isFinite(sighting.accuracy_m) && sighting.accuracy_m > 0 ? `${sighting.accuracy_m}m程度の範囲の情報` : "位置精度の指定なし"}
                  </dd>
                </div>
                <div>
                  <dt className="font-extrabold">公式情報へのリンク</dt>
                  <dd className="mt-1">
                    <a
                      href={sighting.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-10 items-center gap-2 rounded border border-civic-600 px-3 py-2 text-sm font-extrabold text-civic-800 transition hover:bg-civic-50 focus:outline-none focus:ring-2 focus:ring-civic-600"
                    >
                      公式情報ページへ
                      <ExternalLink aria-hidden="true" className="h-4 w-4" />
                    </a>
                    <p className="mt-1 text-xs font-bold text-slate-500">外部サイトへ移動します</p>
                  </dd>
                </div>
              </dl>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function toggleValue<T>(current: T[], value: T): T[] {
  if (current.includes(value)) {
    return current.filter((item) => item !== value);
  }

  return [...current, value];
}

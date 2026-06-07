import { eventTypes, freshnessTypes, type BearEventType, type BearSighting, type FreshnessType } from "@/lib/types";

export const eventTypeStyles: Record<
  BearEventType,
  {
    label: string;
    shortLabel: string;
    markerClass: string;
    badgeClass: string;
    color: string;
  }
> = {
  目撃: {
    label: "目撃",
    shortLabel: "目",
    markerClass: "bear-marker-sighting",
    badgeClass: "bg-yellow-100 text-yellow-900 ring-yellow-300",
    color: "#facc15"
  },
  痕跡: {
    label: "痕跡",
    shortLabel: "痕",
    markerClass: "bear-marker-trace",
    badgeClass: "bg-sky-100 text-sky-900 ring-sky-300",
    color: "#38bdf8"
  },
  人身被害: {
    label: "人身被害",
    shortLabel: "害",
    markerClass: "bear-marker-injury",
    badgeClass: "bg-red-100 text-red-800 ring-red-300",
    color: "#ef4444"
  },
  捕獲済み: {
    label: "捕獲済み",
    shortLabel: "済",
    markerClass: "bear-marker-captured",
    badgeClass: "bg-slate-200 text-slate-800 ring-slate-300",
    color: "#9ca3af"
  }
};

export const freshnessStyles: Record<
  FreshnessType,
  {
    badgeClass: string;
    itemClass: string;
  }
> = {
  "24時間以内": {
    badgeClass: "bg-amber-100 text-amber-900 ring-amber-300",
    itemClass: "border-l-amber-500 bg-amber-50/50"
  },
  "3日以内": {
    badgeClass: "bg-emerald-100 text-emerald-900 ring-emerald-300",
    itemClass: "border-l-emerald-500 bg-white"
  },
  "1週間以内": {
    badgeClass: "bg-civic-50 text-civic-800 ring-civic-100",
    itemClass: "border-l-civic-600 bg-white"
  },
  古い情報: {
    badgeClass: "bg-slate-100 text-slate-600 ring-slate-200",
    itemClass: "border-l-slate-300 bg-slate-50 opacity-80"
  }
};

export function parseBearSightingsCsv(csv: string): BearSighting[] {
  const rows = parseCsv(csv.trim());
  if (rows.length < 2) {
    return [];
  }

  const [headers, ...records] = rows;

  return records
    .filter((record) => record.some((value) => value.trim().length > 0))
    .map((record) => {
      const row = Object.fromEntries(headers.map((header, index) => [header, record[index] ?? ""]));
      const eventType = normalizeEventType(row.event_type);

      return {
        id: row.id,
        prefecture: row.prefecture,
        municipality: row.municipality,
        area: row.area,
        occurred_at: row.occurred_at,
        event_type: eventType,
        description: row.description,
        source_name: row.source_name,
        source_url: row.source_url,
        latitude: Number(row.latitude),
        longitude: Number(row.longitude),
        accuracy_m: Number(row.accuracy_m),
        status: normalizeStatus(row.status)
      };
    })
    .filter((sighting) => Number.isFinite(sighting.latitude) && Number.isFinite(sighting.longitude));
}

export function getFreshness(occurredAt: string, now = new Date()): FreshnessType {
  const occurred = parseOccurredAt(occurredAt);
  const diffMs = Math.max(0, now.getTime() - occurred.getTime());
  const hours = diffMs / (1000 * 60 * 60);

  if (hours <= 24) {
    return "24時間以内";
  }

  if (hours <= 72) {
    return "3日以内";
  }

  if (hours <= 168) {
    return "1週間以内";
  }

  return "古い情報";
}

export function formatOccurredAt(value: string): string {
  return value.replace(" ", " ");
}

export function sortSightingsByDate(sightings: BearSighting[]): BearSighting[] {
  return [...sightings].sort((a, b) => parseOccurredAt(b.occurred_at).getTime() - parseOccurredAt(a.occurred_at).getTime());
}

export function isFreshnessType(value: string): value is FreshnessType {
  return freshnessTypes.includes(value as FreshnessType);
}

function normalizeEventType(value: string): BearEventType {
  if (eventTypes.includes(value as BearEventType)) {
    return value as BearEventType;
  }

  return "目撃";
}

function normalizeStatus(value: string): BearSighting["status"] {
  if (value === "確認済み" || value === "確認中" || value === "参考情報") {
    return value;
  }

  return "参考情報";
}

function parseOccurredAt(value: string): Date {
  const [date, time = "00:00"] = value.split(" ");
  const normalizedTime = time.length === 5 ? `${time}:00` : time;
  return new Date(`${date}T${normalizedTime}+09:00`);
}

function parseCsv(csv: string): string[][] {
  const rows: string[][] = [];
  let current = "";
  let row: string[] = [];
  let inQuotes = false;

  for (let index = 0; index < csv.length; index += 1) {
    const char = csv[index];
    const next = csv[index + 1];

    if (char === '"' && inQuotes && next === '"') {
      current += '"';
      index += 1;
      continue;
    }

    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === "," && !inQuotes) {
      row.push(current);
      current = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") {
        index += 1;
      }
      row.push(current);
      rows.push(row.map((value) => value.trim()));
      row = [];
      current = "";
      continue;
    }

    current += char;
  }

  row.push(current);
  rows.push(row.map((value) => value.trim()));
  return rows;
}

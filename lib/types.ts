export const prefectures = ["青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県"] as const;

export const eventTypes = ["目撃", "痕跡", "人身被害", "捕獲済み"] as const;

export const freshnessTypes = ["24時間以内", "3日以内", "1週間以内", "古い情報"] as const;

export type Prefecture = (typeof prefectures)[number];

export type BearEventType = (typeof eventTypes)[number];

export type BearSightingStatus = "確認済み" | "確認中" | "参考情報";

export type FreshnessType = (typeof freshnessTypes)[number];

export type BearSighting = {
  id: string;
  prefecture: string;
  municipality: string;
  area: string;
  occurred_at: string;
  event_type: BearEventType;
  description: string;
  source_name: string;
  source_url: string;
  latitude: number;
  longitude: number;
  accuracy_m: number;
  status: BearSightingStatus;
};

export type OfficialLink = {
  prefecture: Prefecture;
  name: string;
  description: string;
  url: string;
  note: string;
};

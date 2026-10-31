import type { Result } from "@/types/result";

export type SavedResult = {
  record: Result;
  playerName: string;
  shareText: string;
};

const storageKey = "battledle.results.v1";

export const loadResults = (): SavedResult[] => {
  const stored = localStorage.getItem(storageKey);
  if (!stored) return [];

  const entries: unknown = JSON.parse(stored);
  if (!Array.isArray(entries) || !entries.every((entry) =>
    entry && typeof entry.playerName === "string" &&
    typeof entry.shareText === "string" && entry.record &&
    typeof entry.record.id === "string" &&
    typeof entry.record.submitTime === "string" &&
    Number.isFinite(Date.parse(entry.record.submitTime)),
  )) {
    throw new Error("Saved results have an unsupported format.");
  }

  return entries;
};

export const saveResult = (entry: SavedResult): void => {
  const entries = loadResults();
  localStorage.setItem(storageKey, JSON.stringify([...entries, entry]));
};

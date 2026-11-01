"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { renderSavedResult } from "@/lib/games/registry";
import { loadResults } from "@/lib/resultStorage";
import type { Result } from "@/types/result";

const ResultsGrid = () => {
  const [entries, setEntries] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      setEntries(loadResults().sort((first, second) =>
        Date.parse(second.submitTime) - Date.parse(first.submitTime),
      ));
    } catch {
      setError("Couldn't read saved results from this browser. Your stored data has not been changed.");
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) return <p role="status">Loading results…</p>;
  if (error) return <p role="alert">{error}</p>;
  if (entries.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-300 p-8 text-center dark:border-zinc-700">
        <p>No submitted results yet.</p>
        <Link href="/" className="mt-3 inline-block underline underline-offset-4">Submit your first result</Link>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 xl:grid-cols-3">
      {entries.map((record) => {
        const card = renderSavedResult(record);
        return (
          <li key={record.id} className="min-w-0">
            {card ?? (
              <div className="rounded-2xl border border-zinc-300 p-6 dark:border-zinc-700">
                <p className="font-semibold">{record.playerName ?? record.playerId} · {record.gameName}</p>
                <p>This saved result cannot currently be rendered.</p>
              </div>
            )}
            <p className="mt-3 text-center text-xs text-zinc-500 dark:text-zinc-400">
              Submitted <time dateTime={record.submitTime}>{new Date(record.submitTime).toUTCString()}</time>
            </p>
          </li>
        );
      })}
    </ul>
  );
};

export default ResultsGrid;

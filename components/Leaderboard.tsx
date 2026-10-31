"use client";

import { useId, useState } from "react";
import type { PlayerStanding } from "@/types/player";

type LeaderboardProps = {
  players: PlayerStanding[];
};

type SortField = "totalPoints" | "streak" | "name";

const Leaderboard = ({ players }: LeaderboardProps) => {
  const [sortField, setSortField] = useState<SortField>("totalPoints");
  const sortId = useId();
  const headingId = useId();
  const orderedPlayers = [...players].sort((first, second) => {
    if (sortField === "name") {
      return first.name.localeCompare(second.name, "en");
    }

    return second[sortField] - first[sortField];
  });

  return (
    <section aria-labelledby={headingId} className="mt-10 w-full min-w-0">
      <h2 id={headingId} className="text-2xl font-bold">Player leaderboard</h2>
      <div className="my-4 flex flex-wrap items-center gap-3">
        <label htmlFor={sortId}>Order by</label>
        <select
          id={sortId}
          value={sortField}
          onChange={(event) => {
            const value = event.target.value;
            if (value === "totalPoints" || value === "streak" || value === "name") {
              setSortField(value);
            }
          }}
          className="rounded border border-zinc-400 bg-white px-3 py-2 dark:bg-black"
        >
          <option value="totalPoints">Total points (highest first)</option>
          <option value="streak">Streak (highest first)</option>
          <option value="name">Player name (A–Z)</option>
        </select>
      </div>
      {players.length === 0 ? (
        <p>No players yet.</p>
      ) : (
        <div className="w-full overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full border-collapse text-left text-sm">
            <caption className="sr-only">Players ordered by {sortField}</caption>
            <thead className="bg-zinc-100 dark:bg-zinc-900">
              <tr>
                <th scope="col" aria-sort={sortField === "name" ? "ascending" : undefined} className="px-4 py-3">Player</th>
                <th scope="col" aria-sort={sortField === "totalPoints" ? "descending" : undefined} className="px-4 py-3 text-right">Total points</th>
                <th scope="col" aria-sort={sortField === "streak" ? "descending" : undefined} className="px-4 py-3 text-right">Streak</th>
              </tr>
            </thead>
            <tbody>
              {orderedPlayers.map((player) => (
                <tr key={player.id} className="border-t border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900">
                  <th scope="row" className="px-4 py-3 font-medium">{player.name}</th>
                  <td className="px-4 py-3 text-right tabular-nums">{player.totalPoints}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{player.streak}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default Leaderboard;

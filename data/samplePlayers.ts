import type { Player } from "@/types/player";

// Display fixtures only; points and streaks are not calculated from results yet.
export const samplePlayers: Pick<Player, "id" | "name" | "totalPoints" | "siteStreak">[] = [
  { id: "sample-a-bot", name: "A Bot", totalPoints: 120, siteStreak: { currentStreak: 2, longestStreak: 2, lastPuzzleDate: null } },
  { id: "sample-noob", name: "Noob", totalPoints: 210, siteStreak: { currentStreak: 7, longestStreak: 7, lastPuzzleDate: null } },
  { id: "sample-zbot", name: "ZBot", totalPoints: 280, siteStreak: { currentStreak: 4, longestStreak: 4, lastPuzzleDate: null } },
];

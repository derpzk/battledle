import type { PlayerStanding } from "@/types/player";

// Display fixtures only; points and streaks are not calculated from results yet.
export const samplePlayers: PlayerStanding[] = [
  { id: "sample-a-bot", name: "A Bot", totalPoints: 120, streak: 2 },
  { id: "sample-noob", name: "Noob", totalPoints: 210, streak: 7 },
  { id: "sample-zbot", name: "ZBot", totalPoints: 280, streak: 4 },
];

import type { Result } from "@/types/result";
import type { WordleResult } from "@/types/wordle";

// These display fixtures contain guess counts, not full parsed Wordle results.
export const sampleResults: Result<Pick<WordleResult, "guesses">>[] = [
  {
    player: "A Bot",
    submittedAt: "2026-10-15T18:00:00Z",
    gameName: "Wordle",
    datePlayed: "2026-10-15",
    score: null,
    result: { guesses: 8 },
    message: "8 guesses (sample result)",
  },
  {
    player: "Noob",
    submittedAt: "2026-10-15T19:00:00Z",
    gameName: "Wordle",
    datePlayed: "2026-10-15",
    score: null,
    result: { guesses: 5 },
    message: "Solved in 5 guesses",
  },
  {
    player: "ZBot",
    submittedAt: "2026-10-15T20:00:00Z",
    gameName: "Wordle",
    datePlayed: "2026-10-15",
    score: null,
    result: { guesses: 4 },
    message: "Solved in 4 guesses",
  },
];

import type { Score } from "@/types/score";

export const rankScores = (scores: Score[]) => {
  return [...scores].sort(
    (firstScore, secondScore) => firstScore.guesses - secondScore.guesses,
  );
};

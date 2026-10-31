import type { GameId } from "@/types/game";

export type Streak = {
  currentStreak: number;
  longestStreak: number;
  lastPuzzleDate: string | null;
};

export type Player = {
  id: string;
  name: string;
  // standard point total across all games
  totalPoints: number;
  // number of submission totals for each different game
  gamePlays: Partial<Record<GameId, number>>;
  // standard point totals for each different game
  gamePoints: Partial<Record<GameId, number>>;
  // streaks for each different game
  gameStreaks: Partial<Record<GameId, Streak>>;
  // favorite game determined by plays + points + streak
  favoriteGame: GameId;
  // streak including input for any game
  siteStreak: Streak;
  // game with highest standard point value stored by id
  bestPlay: string | null;
  // total number of games inputted into the site across all games
  totalPlays: number;
}

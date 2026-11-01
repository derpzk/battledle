// TResult describes the game's parsed data, e.g. Result<WordleResult>.
export type Result<TResult = unknown> = {
  id : string;
  playerId : string;
  // Temporary display snapshot until player profiles can be looked up by ID.
  playerName?: string;
  gameName: string;
  datePlayed: string;
  submitTime: string;
  score: number | null;
  result: TResult;
};


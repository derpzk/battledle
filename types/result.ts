// TResult describes the game's parsed data, e.g. Result<WordleResult>.
export type Result<TResult = unknown> = {
  id : string;
  playerId : string;
  gameName: string;
  datePlayed: string;
  submitTime: string;
  score: number | null;
  result: TResult;
};


// TResult describes the game's parsed data, e.g. Result<WordleResult>.
export type Result<TResult = unknown> = {
  player: string;
  gameName: string;
  datePlayed: string;
  submittedAt: string;
  message: string;
  score: number | null;
  result: TResult;
};


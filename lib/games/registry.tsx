import type { ComponentType, ReactNode } from "react";
import type { Game } from "@/lib/games/Game";
import type { Result } from "@/types/result";
import { wordleGame } from "@/lib/games/WordleGame";
import WordleResultCard from "@/components/resultCards/WordleResultCard";

type ResultPreview = {
  gameName: string;
  renderCard: (player: string) => ReactNode;
  generateResult: (playerId: string) => Result;
};

type GameMatch =
  | { status: "unrecognized" }
  | { status: "invalid"; gameName: string; message: string }
  | { status: "valid"; preview: ResultPreview };

export type ResultIdentification =
  | { status: "empty" }
  | { status: "undetected"; message: string }
  | Exclude<GameMatch, { status: "unrecognized" }>;

export const generateResult = <TResult,>(
  game: Game<TResult>,
  playerId: string,
  result: TResult,
): Result<TResult> => {
  const normalizedPlayerId = playerId.trim();
  if (!normalizedPlayerId) {
    throw new Error("A player ID is required to create a result record.");
  }

  const datePlayed = game.dayPlayed(result);
  if (datePlayed === null) {
    throw new Error(`Couldn't determine the puzzle date for ${game.gameName}.`);
  }

  return {
    id: crypto.randomUUID(),
    playerId: normalizedPlayerId,
    gameName: game.gameName,
    datePlayed,
    submitTime: new Date().toISOString(),
    score: game.standardScore(result),
    result,
  };
};

// Pair each game's parser with a card accepting that parser's result type.
const registerGame = <TResult,>(
  game: Game<TResult>,
  Card: ComponentType<{ result: TResult; player?: string }>,
) => {
  return (text: string): GameMatch => {
    if (!game.recognizes(text)) return { status: "unrecognized" };

    const result = game.parse(text);
    if (result === null) {
      return {
        status: "invalid",
        gameName: game.gameName,
        message: `${game.gameName} detected, but the result format is invalid or unsupported. Copy the complete share result and preserve its original text and line breaks.`,
      };
    }

    return {
      status: "valid",
      preview: {
        gameName: game.gameName,
        renderCard: (player) => <Card result={result} player={player} />,
        generateResult: (playerId) => generateResult(game, playerId, result),
      },
    };
  };
};

const registeredGames = [registerGame(wordleGame, WordleResultCard)];

export const identifyResult = (text: string): ResultIdentification => {
  if (!text.trim()) return { status: "empty" };

  let invalidMatch: Extract<GameMatch, { status: "invalid" }> | null = null;
  for (const parsePreview of registeredGames) {
    const match = parsePreview(text);
    if (match.status === "valid") return match;
    if (match.status === "invalid" && !invalidMatch) invalidMatch = match;
  }

  return (
    invalidMatch ?? {
      status: "undetected",
      message:
        "Couldn't identify a supported game. Paste the complete share result, including its game heading. The game may not be supported yet.",
    }
  );
};

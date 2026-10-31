import type { WordleResult } from "@/types/wordle";
import { Game } from "@/lib/games/Game";

export class WordleGame extends Game<WordleResult> {
  readonly gameName = "Wordle";

  // Recognition selects a possible game; parsing still validates the full result.
  recognizes(text: string): boolean {
    return /^Wordle\s/.test(text.trim());
  }

  // Supports solved results in the standard green/yellow tile palette.
  parse(text: string): WordleResult | null {
    if (!this.recognizes(text)) {
      return null;
    }

    const lines = text.trim().replaceAll("\r\n", "\n").split("\n");
    const match = lines[0].match(
      /^Wordle ([1-9]\d*|[1-9]\d{0,2}(?:,\d{3})+) ([1-6])\/6\*?$/,
    );

    if (!match) {
      return null;
    }

    const puzzleNumber = Number(match[1].replaceAll(",", ""));
    const guesses = Number(match[2]);
    const grid = lines.slice(1);

    // A single blank line may separate the header and grid.
    if (grid[0] === "") {
      grid.shift();
    }

    if (!Number.isSafeInteger(puzzleNumber) || grid.length !== guesses) {
      return null;
    }

    const validRow = /^[⬛⬜🟨🟩]{5}$/u;
    if (!grid.every((row) => validRow.test(row))) {
      return null;
    }

    const winningRow = "🟩🟩🟩🟩🟩";
    if (
      grid[grid.length - 1] !== winningRow ||
      grid.slice(0, -1).includes(winningRow)
    ) {
      return null;
    }

    return { puzzleNumber, guesses, grid };
  }

  standardScore(_result: WordleResult): number | null {
    // Wordle's standardized scoring formula has not been decided yet.
    return null;
  }

  formatResult(result: WordleResult): string {
    const guessLabel = result.guesses === 1 ? "guess" : "guesses";
    return `Wordle puzzle ${result.puzzleNumber}: solved in ${result.guesses} ${guessLabel}.`;
  }

  getFeedback(text: string): string {
    const result = this.parse(text);

    if (!result) {
      return "Couldn't read this result. Paste a solved Wordle result with its header and each five-tile row on a separate line, using ⬛, ⬜, 🟨, or 🟩. Remove any links.";
    }

    return this.formatResult(result);
  }
}

// Game behavior is shared; individual submissions are plain result records.
export const wordleGame = new WordleGame();

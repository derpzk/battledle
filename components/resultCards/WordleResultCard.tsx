import ResultCard from "@/components/ResultCard";
import { wordleGame } from "@/lib/games/WordleGame";
import type { WordleResult } from "@/types/wordle";

type WordleResultCardProps = {
  result: WordleResult;
  player?: string;
};

const WordleResultCard = ({ result, player }: WordleResultCardProps) => {
  return (
    <ResultCard
      title={`Wordle #${result.puzzleNumber.toLocaleString("en-US")}`}
      player={player}
      message={wordleGame.formatResult(result)}
      resultLabel={`Solved · ${result.guesses}/6`}
    >
      <figure>
        <figcaption className="sr-only">Wordle guess grid</figcaption>
        <ol className="flex flex-col gap-1">
          {result.grid.map((row, index) => (
            <li key={index}>
              <span className="sr-only">
                Guess {index + 1}:{" "}
                {Array.from(row)
                  .map((tile) => {
                    if (tile === "🟩") return "correct position";
                    if (tile === "🟨") return "wrong position";
                    return "absent";
                  })
                  .join(", ")}
              </span>
              <span aria-hidden="true" className="whitespace-pre text-2xl leading-relaxed tracking-wider">
                {row}
              </span>
            </li>
          ))}
        </ol>
      </figure>
    </ResultCard>
  );
};

export default WordleResultCard;

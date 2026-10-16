import type { Score } from "@/types/score";

type ScoreCardProps = {
  score: Score;
  rank: number;
};

const ScoreCard = ({ score, rank }: ScoreCardProps) => {
  return (
    <article className="mb-2 rounded-lg border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="flex flex-row gap-6 items-center">
        <p className="text-2xl text-black font-bold">{rank}</p>
        <p className="text-base text-zinc-700 font-bold">
          {score.game} ({score.playedOn})
        </p>

        <p className="text-base text-zinc-700">
          {score.player} guessed {score.guesses} times
        </p>
      </div>
    </article>
  );
};

export default ScoreCard;

import { useId } from "react";
import type { ReactNode } from "react";

type ResultCardProps = {
  gameName: string;
  player?: string;
  datePlayed?: string;
  score: number | null;
  message: string;
  resultLabel?: string;
  children?: ReactNode;
};

const ResultCard = ({ gameName, player, datePlayed, score, message, resultLabel, children }: ResultCardProps) => {
  const headingId = useId();

  return (
    <article
      aria-labelledby={headingId}
      className="mx-auto flex min-h-[34rem] w-full max-w-sm flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-xl shadow-zinc-200/60 dark:border-zinc-700 dark:bg-zinc-950 dark:shadow-black/30"
    >
      <header className="border-b border-zinc-200 bg-zinc-50 px-6 py-5 dark:border-zinc-800 dark:bg-zinc-900">
        <p className="truncate text-lg font-semibold">{player || "Player preview"}</p>
        <div className="mt-2 flex flex-wrap items-baseline justify-between gap-2">
          <h3 id={headingId} className="text-sm font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-300">{gameName}</h3>
          {datePlayed ? (
            <time dateTime={datePlayed} className="text-sm text-zinc-500 dark:text-zinc-400">{datePlayed}</time>
          ) : (
            <span className="text-sm text-zinc-500 dark:text-zinc-400">Puzzle date pending</span>
          )}
        </div>
      </header>
      <div className="flex flex-1 flex-col items-center justify-center gap-5 px-5 py-8 text-center">
        {resultLabel && (
          <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            {resultLabel}
          </p>
        )}
        {children}
        <p className="max-w-xs text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">{message}</p>
      </div>
      <footer className="flex justify-center border-t border-zinc-100 px-6 py-6 dark:border-zinc-800">
        <div className="flex min-h-24 min-w-40 flex-col items-center justify-center rounded-full bg-amber-300 px-8 py-4 text-amber-950 shadow-lg shadow-amber-300/30">
          <span className="text-xs font-bold uppercase tracking-widest">Score</span>
          {score === null ? (
            <span className="mt-1 text-lg font-semibold">Pending</span>
          ) : (
            <span className="mt-1 text-4xl font-black tabular-nums">
              {score}<span className="ml-1 text-base font-medium">/100</span>
            </span>
          )}
        </div>
      </footer>
    </article>
  );
};

export default ResultCard;

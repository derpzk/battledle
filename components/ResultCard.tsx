import { useId } from "react";
import type { ReactNode } from "react";

type ResultCardProps = {
  title: string;
  player?: string;
  message: string;
  resultLabel?: string;
  children?: ReactNode;
};

const ResultCard = ({ title, player, message, resultLabel, children }: ResultCardProps) => {
  const headingId = useId();

  return (
    <article
      aria-labelledby={headingId}
      className="w-full rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
    >
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 id={headingId} className="text-lg font-bold">{title}</h3>
          {player && (
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{player}</p>
          )}
        </div>
        {resultLabel && (
          <p className="rounded-full bg-zinc-100 px-3 py-1 text-sm font-semibold text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
            {resultLabel}
          </p>
        )}
      </header>
      <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">{message}</p>
      {children && <div className="mt-4">{children}</div>}
    </article>
  );
};

export default ResultCard;

import type { ReactNode } from "react";

type ResultTableProps = {
  caption: string;
  children: ReactNode;
};

const ResultTable = ({ caption, children }: ResultTableProps) => {
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
      <table className="w-full border-collapse text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-zinc-100 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
          <tr>
            <th scope="col" className="px-4 py-3 font-semibold">Player</th>
            <th scope="col" className="px-4 py-3 font-semibold">Game</th>
            <th scope="col" className="px-4 py-3 font-semibold">Date inputted (UTC)</th>
            <th scope="col" className="px-4 py-3 font-semibold">Message</th>
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

export default ResultTable;

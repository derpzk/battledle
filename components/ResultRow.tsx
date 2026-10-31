import type { Result } from "@/types/result";

type ResultRowProps = {
  result: Pick<Result, "player" | "gameName" | "submittedAt" | "message">;
};

const ResultRow = ({ result }: ResultRowProps) => {
  return (
    <tr className="border-b border-zinc-200 last:border-b-0 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900">
      <td className="px-4 py-3 font-medium">{result.player}</td>
      <td className="px-4 py-3">{result.gameName}</td>
      <td className="whitespace-nowrap px-4 py-3 text-zinc-600 dark:text-zinc-400">
        <time dateTime={result.submittedAt}>
          {new Date(result.submittedAt).toUTCString()}
        </time>
      </td>
      <td className="min-w-48 px-4 py-3">{result.message}</td>
    </tr>
  );
};

export default ResultRow;

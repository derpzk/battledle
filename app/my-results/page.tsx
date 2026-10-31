import Link from "next/link";
import ResultRow from "@/components/ResultRow";
import ResultTable from "@/components/ResultTable";
import { sampleResults } from "@/data/sampleResults";

const MyResults = () => {
  // Temporary identity until a signed-in user's account supplies it.
  const currentPlayer = "ZBot";
  const playerResults = sampleResults
    .filter((result) => result.player === currentPlayer)
    .sort(
      (first, second) =>
        Date.parse(second.submittedAt) - Date.parse(first.submittedAt),
    );

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-6 py-12">
      <nav aria-label="Page navigation">
        <Link href="/" className="underline underline-offset-4">
          Back to home
        </Link>
      </nav>
      <header>
        <h1 className="text-3xl font-semibold">My Results</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Showing sample results for {currentPlayer}. Sign-in is coming later.
        </p>
      </header>
      <section aria-labelledby="result-history-heading">
        <h2 id="result-history-heading" className="mb-4 text-xl font-bold">
          Submission history
        </h2>
        {playerResults.length === 0 ? (
          <p>No results submitted yet.</p>
        ) : (
          <ResultTable caption={`Submission history for ${currentPlayer}`}>
            {playerResults.map((result) => (
              <ResultRow
                key={`${result.player}-${result.gameName}-${result.submittedAt}`}
                result={result}
              />
            ))}
          </ResultTable>
        )}
      </section>
    </main>
  );
};

export default MyResults;

import Link from "next/link";
import ResultsGrid from "@/components/ResultsGrid";

const Results = () => {
  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-12 sm:px-10">
      <Link href="/" className="underline underline-offset-4">Back to home</Link>
      <header className="my-8">
        <h1 className="text-3xl font-bold">All results</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Submitted plays, newest first. These records are saved only in this browser.
        </p>
      </header>
      <ResultsGrid />
    </main>
  );
};

export default Results;

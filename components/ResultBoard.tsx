"use client";

import ResultTable from "@/components/ResultTable";
import { Fragment, useState } from "react";
import type { ReactNode } from "react";

type SubmittedResult = {
  submittedAt: string;
};

type ResultBoardProps<T extends SubmittedResult> = {
  title: string;
  initialResults: T[];
  getResultKey: (result: T) => string;
  renderResult: (result: T) => ReactNode;
};

const ResultBoard = <T extends SubmittedResult,>({
  title,
  initialResults,
  getResultKey,
  renderResult,
}: ResultBoardProps<T>) => {
  const [results, setResults] = useState(initialResults);
  const orderedResults = [...results].sort(
    (first, second) =>
      Date.parse(second.submittedAt) - Date.parse(first.submittedAt),
  );
  const handleClearResults = () => {
    setResults([]);
  };
  const handleResetResults = () => {
    setResults(initialResults);
  };

  return (
    <section className="w-full min-w-0">
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="mb-4 flex gap-4">
        <button type="button" onClick={handleClearResults}>
          Clear results
        </button>
        <button type="button" onClick={handleResetResults}>
          Reset results
        </button>
      </div>
      {results.length === 0 && <p>No results yet.</p>}
      {results.length > 0 && (
        <ResultTable caption={title}>
          {orderedResults.map((result) => (
            <Fragment key={getResultKey(result)}>
              {renderResult(result)}
            </Fragment>
          ))}
        </ResultTable>
      )}
    </section>
  );
};

export default ResultBoard;

"use client";

import { useId, useState } from "react";
import type { FormEvent } from "react";
import { wordleGame } from "@/lib/games/WordleGame";
import WordleResultCard from "@/components/resultCards/WordleResultCard";
import type { WordleResult } from "@/types/wordle";

const ResultForm = () => {
  const [playerName, setPlayerName] = useState("");
  const [shareResult, setShareResult] = useState("");
  const [feedback, setFeedback] = useState("");
  const [preview, setPreview] = useState<{
    result: WordleResult;
    player: string;
  } | null>(null);
  const playerNameId = useId();
  const shareResultId = useId();
  const shareInstructionsId = useId();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setPreview(null);

    if (!wordleGame.recognizes(shareResult)) {
      setFeedback("This game isn't supported yet. Paste a Wordle share result to preview it.");
      return;
    }

    const result = wordleGame.parse(shareResult);
    if (!result) {
      setFeedback("Couldn't read this Wordle result. Include its header and each five-tile row on a separate line, using ⬛, ⬜, 🟨, or 🟩. Remove any links. Only solved results are supported currently.");
      return;
    }

    setFeedback(wordleGame.formatResult(result));
    setPreview({ result, player: playerName.trim() });
  };

  return (
    <form className="my-4 flex flex-col gap-2" onSubmit={handleSubmit}>
      <label htmlFor={playerNameId}>Player name</label>
      <input
        id={playerNameId}
        name="playerName"
        type="text"
        value={playerName}
        onChange={(event) => {
          setPlayerName(event.target.value);
          setPreview(null);
          setFeedback("");
        }}
        className="rounded border border-zinc-400 px-3 py-2"
      />
      <label htmlFor={shareResultId} className="mt-2">
        Game result
      </label>
      <p
        id={shareInstructionsId}
        className="text-sm text-zinc-600 dark:text-zinc-400"
      />
      <textarea
        id={shareResultId}
        name="shareResult"
        rows={8}
        value={shareResult}
        onChange={(event) => {
          setShareResult(event.target.value);
          setFeedback("");
          setPreview(null);
        }}
        aria-describedby={shareInstructionsId}
        placeholder="Paste your game's share result here…"
        className="w-full min-w-0 resize-y rounded border border-zinc-400 px-3 py-2"
      />
      <button
        type="submit"
        className="self-start rounded border border-zinc-400 px-3 py-2"
      >
        Read game result
      </button>
      <p role="status">{feedback}</p>
      {preview && <WordleResultCard result={preview.result} player={preview.player} />}
    </form>
  );
};

export default ResultForm;

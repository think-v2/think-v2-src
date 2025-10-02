import { useState, useCallback } from "react";
import "./LyricTest.css";
import confetti from "canvas-confetti";
import PasteButton from "../../../components/lyric_test/PasteButton.tsx";
import LyricLine from "../../../components/lyric_test/LyricLine.tsx";
import ScoreBar from "../../../components/lyric_test/ScoreBar.tsx";

function App() {
  const [lyrics, setLyrics] = useState<string[]>([]);
  const [scoreArray, setScoreArray] = useState<number[]>([]);
  const [_finishedSong, setFinishedSong] = useState(false);
  const splitLyrics = useCallback((fullLyrics: string) => {
    const newLyrics = fullLyrics.split("\n");
    console.log(newLyrics);
    setScoreArray(Array(newLyrics.length).fill(-1));
    setLyrics(newLyrics);
    setFinishedSong(false);
  }, []);
  const modifyScoreArray = useCallback((index: number, value: number) => {
    setScoreArray((prev) => {
      const copy = [...prev];
      copy[index] = value;

      if (!copy.includes(-1)) {
        setFinishedSong((prev) => {
          if (!prev) {
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { x: 0.25, y: 1 },
            });
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { x: 0.5, y: 1 },
            });
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { x: 0.75, y: 1 },
            });
          }
          return true;
        });
      }

      return copy;
    });
  }, []);

  const scoreSum = scoreArray.reduce((partialSum, score) => {
    return score === -1 ? partialSum : partialSum + score;
  }, 0);
  const scoredCount = scoreArray.reduce((partialSum, score) => {
    return score === -1 ? partialSum : partialSum + 1;
  }, 0);

  return (
    <>
      <PasteButton updateLyrics={splitLyrics}></PasteButton>
      <div className="grid gap-3 justify-items-center mt-5 mb-20">
        {lyrics.map((line, index) => (
          <LyricLine
            line={line}
            scoreArray={scoreArray}
            modifyScoreArray={modifyScoreArray}
            index={index}
            key={index}
          ></LyricLine>
        ))}
      </div>
      <ScoreBar scoreSum={scoreSum} scoredCount={scoredCount} />
    </>
  );
}

export default App;

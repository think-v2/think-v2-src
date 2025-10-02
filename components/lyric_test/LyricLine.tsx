import { useCallback, useEffect, useRef, useState } from "react";

type PasteButtonProps = {
  line: string;
  scoreArray: Array<number>;
  modifyScoreArray: (index: number, value: number) => void;
  index: number;
};

const LyricLine = ({
  line,
  scoreArray,
  modifyScoreArray,
  index,
}: PasteButtonProps) => {
  const [lineScore, setLineScore] = useState(0);
  const [_scored, setScored] = useState(false);
  const divRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setLineScore(0);
    setScored(false);
  }, [line]);

  const updateLineScore = useCallback(
    (newScore: number) => {
      modifyScoreArray(index, newScore);
      if (divRef.current && true) {
        const divRefBoundingClientRect = divRef.current.getBoundingClientRect();
        window.scrollTo({
          top:
            divRefBoundingClientRect.bottom +
            window.pageYOffset -
            window.innerHeight / 3,
          behavior: "smooth",
        });
      }
    },
    [lineScore]
  );

  const textColorArray = ["text-red-600", "text-yellow-300", "text-green-400"];
  const textColor =
    scoreArray[index] === -1 ? "text-white" : textColorArray[scoreArray[index]];

  return (
    <div ref={divRef} className="w-fit min-w-65 h-fit relative group">
      <p
        className={`text-5xl pb-6 font-bold ${
          scoreArray[index] === -1 ? "opacity-100" : "opacity-50"
        } ${textColor} transition-all`}
      >
        {line}
      </p>
      <div
        className="text-3xl absolute bottom-0 left-1/2 -translate-x-1/2 
        bg-gray-900/50 outline-amber-50/60 outline-2 rounded-xl
        opacity-0 group-hover:opacity-100
        translate-y-2 group-hover:translate-y-0
        rotate-x-90 group-hover:rotate-x-0
        blur-sm group-hover:blur-none
        transition-all"
      >
        <button onClick={() => updateLineScore(0)} className="p-px border-0">
          💀
        </button>
        <button onClick={() => updateLineScore(1)} className="p-px">
          🤷
        </button>
        <button onClick={() => updateLineScore(2)} className="p-px">
          🔥
        </button>
      </div>
    </div>
  );
};

export default LyricLine;

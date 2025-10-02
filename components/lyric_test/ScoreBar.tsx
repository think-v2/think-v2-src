type ScoreBarProps = {
  scoreSum: number;
  scoredCount: number;
};

const ScoreBar = ({ scoreSum, scoredCount }: ScoreBarProps) => {
  const scorePercent =
    (scoredCount === 0 ? 1 : scoreSum / (scoredCount * 2)) * 100;
  return (
    <>
      <p className="fixed bottom-0 left-0 text-6xl ml-7 mb-10">
        <b>{scorePercent.toFixed(2)}%</b>
      </p>
      <div className="fixed w-full h-6 bottom-0 bg-red-800"></div>
      <div
        className={`fixed h-6 bottom-0 bg-green-500 transition-all ease-out duration-500`}
        style={{
          width: `${scorePercent}%`,
        }}
      ></div>
    </>
  );
};

export default ScoreBar;

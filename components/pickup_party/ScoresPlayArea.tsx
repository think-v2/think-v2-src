type VotingPlayAreaProps = {
  scores: Record<string, number>;
};

const ScoresPlayArea = ({ scores }: VotingPlayAreaProps) => {
  return (
    <>
      <div className="text-5xl">Scoreboard</div>
      <div className="text-4xl">
        {Object.entries(scores)
          .sort(([, a], [, b]) => b - a)
          .map(([key, value]) => (
            <div key={key}>
              {key}: {value}
            </div>
          ))}
      </div>
    </>
  );
};

export default ScoresPlayArea;

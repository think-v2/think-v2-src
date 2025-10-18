import MessageBubble from "./MessageBubble";

type VotingPlayAreaProps = {
  promptVotingOn: string;
  responsesVotingOn: Record<string, any>;
  id: number;
  submitVote: (responderId: string) => void;
  votes: Record<string, string>;
};

const VotingPlayArea = ({
  promptVotingOn,
  responsesVotingOn,
  id,
  submitVote,
  votes,
}: VotingPlayAreaProps) => {
  return (
    <div className="text-4xl flex flex-col flex-grow overflow-y-auto w-full h-full gap-10 p-5">
      <MessageBubble>{promptVotingOn}</MessageBubble>
      {responsesVotingOn[id] != null && (
        <MessageBubble
          hearts={Number(votes[id])}
          sentStyle={true}
          youLabel={true}
        >
          {responsesVotingOn[id]}
        </MessageBubble>
      )}

      {Object.entries(responsesVotingOn)
        .filter(([key]) => key !== String(id))
        .map(([key, value]) => (
          <MessageBubble
            hearts={Number(votes[key])}
            sentStyle={true}
            youLabel={false}
            canBeVoted={true}
            submitVote={submitVote}
            messagerId={key}
            key={key}
          >
            {value}
          </MessageBubble>
        ))}
    </div>
  );
};

export default VotingPlayArea;

import React, { type ReactNode } from "react";

type MessageBubbleProps = {
  sentStyle?: boolean;
  canBeVoted?: boolean;
  youLabel?: boolean;
  hearts?: number;
  submitVote?: (responderId: string) => void;
  messagerId?: string;
  children?: ReactNode;
};

const MessageBubble = ({
  sentStyle,
  canBeVoted,
  youLabel,
  hearts,
  submitVote,
  messagerId,
  children,
}: MessageBubbleProps) => {
  return (
    <>
      {!sentStyle && (
        <div className="bg-gray-300 rounded-3xl p-4 text-black relative w-fit text-4xl">
          <div className="z-20 h-1/4 aspect-square bg-gray-300 [clip-path:polygon(100%_100%,100%_0,0_100%)] absolute left-0 bottom-0" />
          {children}
        </div>
      )}
      {sentStyle && (
        <div key={messagerId}>
          <div className="w-full flex justify-end">
            <div className="relative w-fit">
              <div className="z-20 h-1/4 aspect-square bg-blue-600 [clip-path:polygon(100%_100%,0_100%,0_0)] absolute right-0 bottom-0" />
              {hearts != null && hearts > 0 && (
                <div className="bg-gray-300 rounded-3xl absolute left-0 -top-6 text-black p-1">
                  {hearts != null && "❤️".repeat(Math.min(3, hearts))}
                  {hearts != null && hearts > 3 && ` + ${hearts - 3}`}
                </div>
              )}
              {youLabel && (
                <div className="bg-gray-300 rounded-3xl absolute right-0 -top-4 text-black p-2 text-lg ">
                  You
                </div>
              )}
              {!canBeVoted && (
                <div className="leading-normal bg-blue-600 rounded-3xl p-4 outline-0 min-w-60 text-white">
                  {children}
                </div>
              )}
              {canBeVoted && (
                <button
                  onClick={() => submitVote!(messagerId!)}
                  className="leading-normal bg-blue-600 rounded-3xl p-4 outline-0 min-w-60 text-white"
                >
                  {children}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MessageBubble;

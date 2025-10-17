import React from "react";
import MessageBubble from "./MessageBubble";

type ResponsePlayAreaProps = {
  prompts: Record<string, any>;
  id: number;
  onResponseChange: (
    key: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  localResponses: Record<string, string>;
};

const ResponsePlayArea = ({
  prompts,
  id,
  onResponseChange,
  localResponses,
}: ResponsePlayAreaProps) => {
  return (
    <div className="text-4xl flex flex-col flex-grow overflow-y-auto w-full h-full max-h-full gap-10 p-5">
      {Object.entries(prompts)
        .filter(([key]) => key !== String(id))
        .map(([key, value]) => (
          <div key={key}>
            <MessageBubble>{value.content}</MessageBubble>
            <br />
            <MessageBubble sentStyle={true}>
              <input
                onChange={(event) => onResponseChange(key, event)}
                value={localResponses[key] || ""}
                type="text"
                placeholder="Type your response..."
                className="leading-normal outline-0"
              />
            </MessageBubble>
          </div>
        ))}
    </div>
  );
};

export default ResponsePlayArea;

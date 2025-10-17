import React from "react";
import MessageBubble from "./MessageBubble";

type PromptPlayAreaProps = {
  promptprompt: string[];
  onPromptChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  prompt: string;
};

const PromptPlayArea = ({
  promptprompt,
  onPromptChange,
  prompt,
}: PromptPlayAreaProps) => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <MessageBubble>
        {promptprompt} <br />
        <input
          onChange={(event) => onPromptChange(event)}
          value={prompt || ""}
          type="text"
          placeholder="finish the prompt..."
          className="leading-normal outline-0 w-full"
        />
      </MessageBubble>
    </div>
  );
};

export default PromptPlayArea;

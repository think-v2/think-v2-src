import React from "react";

type ChatProps = {
  chat: string[];
  messageInput: React.RefObject<HTMLInputElement | null>;
  sendMessage: () => void;
};

const Chat = ({ chat, messageInput, sendMessage }: ChatProps) => {
  return (
    <>
      <b>Chat</b>
      <div className="flex flex-col flex-grow overflow-y-auto w-full h-full">
        {chat.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <div className="mt-2 flex m-3">
        <input
          type="text"
          placeholder="Type your message"
          className="flex-grow rounded-md p-1 m-1 bg-gray-300"
          ref={messageInput}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
        />
        <button
          onClick={sendMessage}
          className="rounded-md p-1 ml-4 m-1 bg-gray-300"
        >
          Send
        </button>
      </div>
    </>
  );
};

export default Chat;

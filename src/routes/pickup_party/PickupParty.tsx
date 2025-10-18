import React, { useCallback, useEffect, useRef, useState } from "react";
import "./PickupParty.css";
import Players from "../../../components/pickup_party/Players.tsx";
import Chat from "../../../components/pickup_party/Chat.tsx";
import PromptPlayArea from "../../../components/pickup_party/PromptPlayArea.tsx";
import ResponsePlayArea from "../../../components/pickup_party/ResponsePlayArea.tsx";
import VotingPlayArea from "../../../components/pickup_party/VotingPlayArea.tsx";
import ScoresPlayArea from "../../../components/pickup_party/ScoresPlayArea.tsx";

const PickupParty = () => {
  const ws = useRef<null | WebSocket>(null);
  const [id, setId] = useState(-1);
  const [playerList, setPlayerList] = useState<string[]>([]);
  const [adminId, setAdminId] = useState<number>(-2);
  const [chat, setChat] = useState<string[]>([]);
  const [phase, setPhase] = useState<number>(0);
  const [connection, setConnection] = useState<boolean>(false);

  // phase 1 (prompt)
  const [prompt, setPrompt] = useState<string>("");
  const [promptprompt, setPromptPrompt] = useState<string[]>([]);

  // phase 2 (response)
  const [prompts, setPrompts] = useState<Record<string, any>>({});
  const [localResponses, setLocalResponses] = useState<Record<string, string>>(
    {}
  );

  // phase 3 (voting)
  const [votes, setVotes] = useState<Record<string, string>>({});
  const [promptVotingOn, setPromptVotingOn] = useState<string>("");
  const [responsesVotingOn, setResponsesVotingOn] = useState<
    Record<string, string>
  >({});

  // phase 4 (scoreboard)
  const [scores, setScores] = useState<Record<string, number>>({});

  // manual inputs
  const messageInput = useRef<null | HTMLInputElement>(null);
  const lobbyIdInput = useRef<null | HTMLInputElement>(null);
  const nameInput = useRef<null | HTMLInputElement>(null);
  const serverAddress = useRef<null | HTMLInputElement>(null);

  // command tools
  const [seeIds, setSeeIds] = useState<boolean>(false);

  const connectToServerAddress = useCallback(() => {
    if (!serverAddress.current) {
      return;
    }

    setPrompts({});
    setPromptPrompt([]);
    setResponsesVotingOn({});
    setPromptVotingOn("");
    setVotes({});
    setScores({});
    setPhase(0);

    //ws.current = new WebSocket("ws://localhost:8080");
    ws.current = new WebSocket(serverAddress.current.value);

    ws.current.onopen = () => {
      console.log("Connected to server");
      setConnection(true);
    };

    ws.current.onmessage = (event) => {
      console.log(event.data);
      try {
        const data = JSON.parse(event.data);
        if (data.type === "give id") {
          setId(data.content);
        } else if (data.type === "player list") {
          setPlayerList(data.content);
          setAdminId(data.admin);
        } else if (data.type === "message") {
          setChat((prev) => {
            const copy = [...prev];
            copy.push(`${data.from}: ${data.content}`);
            return copy;
          });
        } else if (data.type === "waiting room") {
          setPhase(0);
        } else if (data.type === "promptprompt") {
          setPromptPrompt(data.content);
          setPrompt("");
          setPhase(1);
        } else if (data.type === "prompts") {
          setPrompts(data.content);
          setLocalResponses({});
          setPhase(2);
        } else if (data.type === "responses") {
          setResponsesVotingOn(data.content.responses);
          setPromptVotingOn(data.content.content);
          setVotes({});
          setPhase(3);
        } else if (data.type === "votes") {
          setVotes(data.content);
        } else if (data.type === "scores") {
          setScores(data.content);
          setPhase(4);
        }
      } catch (err) {
        console.error(err, event.data);
      }
    };

    ws.current.onerror = (error) => {
      console.log(error);
    };

    ws.current.onclose = () => {
      console.log("Disconnected from server");
      setConnection(false);
    };

    // stop timeouts from tunneling via heartbeat
    setInterval(() => {
      if (
        lobbyIdInput.current &&
        ws.current &&
        ws.current.readyState === WebSocket.OPEN
      ) {
        const data = {
          type: "heartbeat",
        };
        ws.current.send(JSON.stringify(data));
      }
    }, 1000 * 15);

    return () => {
      ws.current?.close();
    };
  }, []);

  const joinLobby = useCallback(() => {
    setPrompts({});
    setPromptPrompt([]);
    setResponsesVotingOn({});
    setPromptVotingOn("");
    setVotes({});
    setScores({});
    setPhase(0);
    if (
      lobbyIdInput.current &&
      ws.current &&
      ws.current.readyState === WebSocket.OPEN
    ) {
      const data = {
        type: "join",
        name: nameInput.current?.value,
        content: lobbyIdInput.current?.value,
      };
      ws.current.send(JSON.stringify(data));
    }
  }, []);

  const sendMessage = useCallback(() => {
    if (
      messageInput.current &&
      ws.current &&
      ws.current.readyState === WebSocket.OPEN
    ) {
      if (messageInput.current?.value.toLowerCase() === "/seeids") {
        setSeeIds(true);
        return;
      } else if (messageInput.current?.value.toLowerCase() === "/hideids") {
        setSeeIds(false);
        return;
      }

      const data = {
        type: "submit message",
        content: messageInput.current?.value,
      };
      ws.current.send(JSON.stringify(data));
      messageInput.current.value = "";
    }
  }, []);

  const progressPhase = useCallback(() => {
    if (
      messageInput.current &&
      ws.current &&
      ws.current.readyState === WebSocket.OPEN
    ) {
      const data = {
        type: "progress phase",
      };
      ws.current.send(JSON.stringify(data));
    }
  }, []);

  const progressVotingPhase = useCallback(() => {
    if (
      messageInput.current &&
      ws.current &&
      ws.current.readyState === WebSocket.OPEN
    ) {
      const data = {
        type: "progress voting phase",
      };
      ws.current.send(JSON.stringify(data));
    }
  }, []);

  const onPromptChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;
      if (
        messageInput.current &&
        ws.current &&
        ws.current.readyState === WebSocket.OPEN
      ) {
        const data = {
          type: "submit prompt",
          content: inputValue,
        };
        ws.current.send(JSON.stringify(data));
      }
      setPrompt(inputValue);
    },
    []
  );

  const onResponseChange = useCallback(
    (key: string, event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;
      if (
        messageInput.current &&
        ws.current &&
        ws.current.readyState === WebSocket.OPEN
      ) {
        const data = {
          type: "submit response",
          content: inputValue,
          prompterId: key,
        };
        ws.current.send(JSON.stringify(data));
      }
      setLocalResponses((prev) => {
        const copy = { ...prev };
        copy[key] = inputValue;
        return copy;
      });
    },
    []
  );

  const submitVote = useCallback((responderId: string) => {
    console.log("submit vote", responderId);
    if (
      messageInput.current &&
      ws.current &&
      ws.current.readyState === WebSocket.OPEN
    ) {
      const data = {
        type: "submit vote",
        content: responderId,
      };
      ws.current.send(JSON.stringify(data));
    }
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col justify-center align-middle text-black">
      <div className="grid grid-flow-col-dense grid-cols-4 grid-rows-7 bg-white rounded-md h-[800px] w-[1200px] mx-auto">
        <div className="col-span-4 row-span-1 bg-gray-200 relative">
          <div className="absolute top-1 left-1">
            <input
              type="text"
              placeholder="Server Address"
              ref={serverAddress}
              className="rounded-md p-1 m-1 bg-gray-300"
            ></input>
            <button
              onClick={connectToServerAddress}
              className="rounded-md p-1 m-1 bg-gray-300"
            >
              Connect
            </button>
            {connection ? "🟢" : "🔴"}
            <br />
            <a
              href="https://github.com/think-v2/pickup-party-server"
              target="_blank"
              className="text-gray-400 underline text-sm"
            >
              learn more about server hosting
            </a>
          </div>
          <p className="text-3xl m-3 text-black">
            <b>Pickup Party</b>
          </p>
          <input
            type="text"
            placeholder="Lobby ID"
            ref={lobbyIdInput}
            className="rounded-md p-1 m-1 bg-gray-300"
          ></input>
          <input
            type="text"
            placeholder="Username"
            ref={nameInput}
            className="rounded-md p-1 m-1 bg-gray-300"
          ></input>
          <button
            onClick={joinLobby}
            className="rounded-md p-1 m-1 bg-gray-300"
          >
            Join
          </button>
          {adminId === id && (
            <button
              onClick={phase === 3 ? progressVotingPhase : progressPhase}
              className="rounded-md p-1 m-1 bg-gray-300"
            >
              Progress Phase
            </button>
          )}
        </div>
        <div className="col-span-1 row-span-2 flex flex-col bg-gray-100">
          <Players
            playerList={playerList}
            adminId={adminId}
            seeIds={seeIds}
            id={id}
          />
        </div>
        <div className="col-span-1 row-span-4 flex flex-col bg-gray-200">
          <Chat
            chat={chat}
            messageInput={messageInput}
            sendMessage={sendMessage}
          />
        </div>
        <div className="col-span-3 row-span-6">
          {phase === 0 && <p>Waiting...</p>}
          {phase === 1 && (
            <PromptPlayArea
              promptprompt={promptprompt}
              onPromptChange={onPromptChange}
              prompt={prompt}
            />
          )}
          {phase === 2 && (
            <ResponsePlayArea
              prompts={prompts}
              id={id}
              onResponseChange={onResponseChange}
              localResponses={localResponses}
            />
          )}
          {phase === 3 && (
            <VotingPlayArea
              promptVotingOn={promptVotingOn}
              responsesVotingOn={responsesVotingOn}
              id={id}
              submitVote={submitVote}
              votes={votes}
            />
          )}
          {phase === 4 && <ScoresPlayArea scores={scores} />}
        </div>
      </div>
    </div>
  );
};

export default PickupParty;

import React from "react";

type PlayersProps = {
  playerList: string[];
  adminId: number;
  seeIds: boolean;
  id: number;
};

const Players = ({ playerList, adminId, seeIds, id }: PlayersProps) => {
  return (
    <>
      <b>Players</b>
      <div className="flex flex-col flex-grow overflow-y-auto w-full h-full">
        {Object.entries(playerList).map(([key, value]) => (
          <p key={key}>
            {adminId === Number(key) ? "🫅" : "🙇"}{" "}
            {id === Number(key) ? <b>{value}</b> : value} {seeIds && `(${key})`}
          </p>
        ))}
      </div>
    </>
  );
};

export default Players;

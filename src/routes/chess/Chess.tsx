import './Chess.css'
import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"

import { init, step, getGameState, getNextGameEventInQueue } from "../../../engine/chess/combatEngine.ts";

import UnitPiece from "../../../components/chess/UnitPiece.tsx";

import brick from "../../assets/chess/images/brick.png";
import type { Unit } from '../../../engine/chess/unit.ts';

function Chess() {
  const [player1Units, setPlayer1Units] = useState<Unit[]>([]);
  const [player2Units, setPlayer2Units] = useState<Unit[]>([]);
  const [clashing, setClashing] = useState<boolean>(false);

  useEffect(() => {
    //init();
    updatePlayers();
  }, []);

  const updatePlayers = useCallback(() => {
    const gameState = getGameState();
    setPlayer1Units([...gameState[0].getUnits()]);
    setPlayer2Units([...gameState[1].getUnits()]);
  }, []);

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const handleNext = useCallback(async () => {
    do {
    setClashing(getNextGameEventInQueue().type === "CLASH");
    step();
    updatePlayers();
    await delay(300);
    } while (getNextGameEventInQueue().type !== "CLASH");
  }, []);

  //console.log(player1);

  return (
    <>
      <button onClick={handleNext}>
        Next
      </button>
      <div className='flex justify-between items-center'>
        <div className='flex flex-row-reverse justify-start w-1/2'>
          <AnimatePresence mode="popLayout">
            {player1Units.map((unit, index) => (
              <UnitPiece key={unit.getId()} unit={unit} clashing={clashing && index === 0 ? 1 : 0} />
            ))}
          </AnimatePresence>
        </div>

        <div className='flex flex-row justify-start w-1/2'>
          <AnimatePresence mode="popLayout">
            {player2Units.map((unit, index) => (
              <UnitPiece key={unit.getId()} unit={unit} clashing={clashing && index === 0 ? -1 : 0} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

export default Chess;

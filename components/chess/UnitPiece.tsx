import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion"
import { Unit } from "../../engine/chess/unit";

import blank from "../../src/assets/chess/images/blank.png";
import brick from "../../src/assets/chess/images/brick.png";
import lighter from "../../src/assets/chess/images/lighter.png";
import glassJar from "../../src/assets/chess/images/glassJar.png";
import shard from "../../src/assets/chess/images/shard.png";

import onFire from "../../src/assets/chess/images/onFire.png";
import concussed from "../../src/assets/chess/images/concussed.png";

const imageMap = new Map();

imageMap.set("Brick", brick);
imageMap.set("Lighter", lighter);
imageMap.set("Glass Jar", glassJar);
imageMap.set("Shard", shard);

imageMap.set("On Fire", onFire);
imageMap.set("Concussed", concussed);

type UnitPieceProps = {
  unit: Unit;
  clashing: number;
};

const UnitPiece = ({unit, clashing}: UnitPieceProps) => {
  const health = unit.getHealth();
  const damage = unit.getDamage();
  const baseImage = imageMap.get(unit.getName()) || blank;

  return (
    <motion.div
      className='inline-block relative'
      layout

      initial={{ scale: 0 }}
      animate={{ scale: 1, x: 20 * clashing}}

      exit={{ scale: 0 }}
      
      transition={{
        duration: 0.2, type: "tween", ease: "easeIn"
      }}
    >
      <img src={baseImage}></img>
      
      {unit.getEffects().map((effect, index) => (
        <motion.div
          key={index}
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}  

          exit={{ opacity: 0 }}
        >
          <img src={imageMap.get(effect.getName())} className="absolute top-0 left-0"/>
        </motion.div>
      ))
      }

      <div className="absolute bottom-4 left-4 text-2xl ">
        ❤️
      </div>
      <div className="absolute bottom-0 left-4 text-4xl ">
        {health}
      </div>
      <div className="absolute bottom-4 right-4 text-2xl">
        🔪
      </div>
      <div className="absolute bottom-0 right-4 text-4xl">
        {damage}
      </div>
    </motion.div>
  );
};

export default UnitPiece;

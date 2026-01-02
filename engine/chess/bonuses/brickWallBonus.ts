import { Bonus } from "../bonus.ts";
import { Unit } from "../unit.ts";
import { type GameEvent } from "../gameEvent.ts";
import { type Player } from "../player.ts";

class BrickWallBonus extends Bonus {

    public constructor() {
        super();
        this.name = "Brick Wall";
        this.description = "Start of Battle: Have at least 2 bricks on team.";
    }

    public bonus(player1: Player, player2: Player): GameEvent[] {
        let gameEvents: GameEvent[] = [];

        const players = [player1, player2];
        players.forEach((player) => {
            const bricks = player.getUnits().filter((unit) => unit.getName() === "Brick");

            if (bricks.length >= 2) {
                bricks.forEach((brick) => {
                    gameEvents.push({
                        type: "HEAL_BY_OBJECT",
                        health: 2,
                        healer: brick,
                        patient: brick,
                    });
                });
            }
        });

        return gameEvents;
    }
}

export { BrickWallBonus };
import { type GameEvent } from "./gameEvent.ts";
import { type Player } from "./player.ts";

class Bonus {
    protected name!: string;
    protected description!: string;

    public constructor() {}

    public getName(): string {
        return this.name;
    }

    public getDescription(): string {
        return this.description;
    }

    public bonus(player1: Player, player2: Player): GameEvent[] {
        return [];
    }
}

export { Bonus };
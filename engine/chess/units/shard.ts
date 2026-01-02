import { Unit } from "../unit.ts";
import { type Player } from "../player.ts";

class Shard extends Unit {
    public constructor(player: Player, id: number) {
        super(player, id);

        this.name = "Shard";
        this.description = "Quite sharp.";

        this.health = 1;
        this.damage = 2;
        this.effects = [];
    }
}

export { Shard };
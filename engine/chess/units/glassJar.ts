import { Unit } from "../unit.ts";
import { type GameEvent } from "../gameEvent.ts";
import { type Player } from "../player.ts";
import { Shard } from "./shard.ts";

class GlassJar extends Unit {
    public constructor(player: Player, id: number) {
        super(player, id);

        this.name = "Glass Jar";
        this.description = "Summon 2 Shards on faint.";

        this.health = 1;
        this.damage = 1;
        this.effects = [];
    }

    public preFaint(attacker: Unit): GameEvent[] {
        return [{
                type: "SUMMON_BEHIND_OBJECT",
                summoner: this,
                summon: new Shard(this.player, -1),
            },{
                type: "SUMMON_BEHIND_OBJECT",
                summoner: this,
                summon: new Shard(this.player, -1),
            },
        ];
    }
}

export { GlassJar };
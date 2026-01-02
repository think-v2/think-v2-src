import { Unit } from "../unit.ts";
import { type GameEvent } from "../gameEvent.ts";
import { type Player } from "../player.ts";
import { OnFire } from "../effects/onFire.ts";

class Lighter extends Unit {
    public constructor(player: Player, id: number) {
        super(player, id);

        this.name = "Lighter";
        this.description = "Apply On Fire effect to enemy died to.";

        this.health = 1;
        this.damage = 1;
        this.effects = [];
    }

    public preFaint(attacker: Unit): GameEvent[] {
        return [{
                type: "APPLY_EFFECT",
                attacker: this,
                defender: attacker,
                effect: new OnFire(attacker),
            },
        ];
    }
}

export { Lighter };
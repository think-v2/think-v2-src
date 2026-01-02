import { Unit } from "../unit.ts";
import { type GameEvent } from "../gameEvent.ts";
import { type Player } from "../player.ts";
import { Concussed } from "../effects/concussed.ts";

class Brick extends Unit {
    public constructor(player: Player, id: number) {
        super(player, id);

        this.name = "Brick";
        this.description = "Apply concussed effect to enemy clashed with.";

        this.health = 4;
        this.damage = 4;
        this.effects = [];
    }

    public postClash(defender: Unit): GameEvent[] {
        return [{
                type: "APPLY_EFFECT",
                attacker: this,
                defender: defender,
                effect: new Concussed(defender),
            },
        ];
    }
}

export { Brick };
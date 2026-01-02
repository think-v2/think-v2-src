import { Effect } from "../effect.ts";
import { type GameEvent } from "../gameEvent.ts";
import { type Unit } from "../unit.ts";

class OnFire extends Effect {
    public constructor(unit: Unit) {
        super(unit);
        this.name = "On Fire";
        this.description = "Take 2 damage after any clashing.";
    }

    // triggers
    public postAnyClash(): GameEvent[] {
        return [{
            type: "DAMAGE_BY_OBJECT",
            damage: 2,
            attacker: this.unit,
            defender: this.unit,
        }];
    }
}

export { OnFire };
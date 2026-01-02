import { Effect } from "../effect.ts";
import { type GameEvent } from "../gameEvent.ts";
import { type Unit } from "../unit.ts";

class Concussed extends Effect {
    public constructor(unit: Unit) {
        super(unit);
        this.name = "Concussed";
        this.description = "x.5 damage.";

        this.damageMultiplier = .5;
    }
}

export { Concussed };
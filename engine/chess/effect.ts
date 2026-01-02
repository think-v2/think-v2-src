import { type GameEvent } from "./gameEvent.ts";
import { type Unit } from "./unit.ts";

class Effect {
    protected unit!: Unit;
    protected name!: string;
    protected description!: string;
    protected damageMultiplier!: number;
    protected damageAdditions!: number;

    public constructor(unit: Unit) {
        this.unit = unit;
        this.damageMultiplier = 1;
        this.damageAdditions = 0;
    }

    public getName(): string {
        return this.name;
    }

    public getDamageMultiplier(): number {
        return this.damageMultiplier;
    }

    public getDamageAdditions(): number {
        return this.damageAdditions;
    }

    // triggers
    public postClash(): GameEvent[] {
        return [];
    }

    public postAnyClash(): GameEvent[] {
        return [];
    }

    public toString() {
        return `${this.name}`;
    }
}

export { Effect };
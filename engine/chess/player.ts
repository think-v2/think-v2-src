import { Unit } from "./unit.ts";

class Player {
    private name: string;
    private units: Unit[];

    public constructor(name: string) {
        this.name = name;
        this.units = [];
    }

    public getName(): string {
        return this.name;
    }

    public getUnits(): Unit[] {
        return this.units;
    }

    public setUnits(units: Unit[]): void {
        this.units = units;
    }
}

export { Player };
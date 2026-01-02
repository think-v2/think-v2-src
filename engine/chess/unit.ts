import { Effect } from "./effect.ts";
import { type GameEvent } from "./gameEvent.ts";
import { type Player } from "./player.ts";

abstract class Unit {
    protected player!: Player;

    protected name!: string;
    protected description!: string;
    protected id!: number;

    protected health!: number;
    protected damage!: number;
    protected effects!: Effect[];
    

    public constructor(player: Player, id: number) {
        this.player = player;
        this.id = id;
    }

    public calculateDamage(damage: number): number {
        let damageMultiplier = 1;
        let damageAdditions = 0;

        this.effects.forEach((effect) => {
            damageMultiplier *= effect.getDamageMultiplier();
            damageAdditions += effect.getDamageAdditions();
        });
        return damage * damageMultiplier + damageAdditions;
    }

    public getId(): number {
        return this.id;
    }

    public getPlayer(): Player {
        return this.player;
    }

    public getName(): string {
        return this.name;
    }

    public getDescription(): string {
        return this.description;
    }

    public getDamage(): number {
        return this.damage;
    }

    public getHealth(): number {
        return this.health;
    }
    
    public getEffects(): Effect[] {
        return this.effects;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public setPlayer(player: Player): void {
        this.player = player;
    }

    public setHealth(health: number): void {
        this.health = health;
    }

    public setEffects(effects: Effect[]): void {
        this.effects = effects;
    }

    // triggers
    public postClash(defender: Unit): GameEvent[] {
        return [];
    }

    public postAnyClash(): GameEvent[] {
        return [];
    }

    public preFaint(attacker: Unit): GameEvent[] {
        return [];
    }
    
    public toString() {
        let effectList = "";
        this.effects.forEach((effect) => {
            effectList += effect.toString() + " ";
        });


        return `${this.name} 🗡 ${this.damage} / ♥ ${this.health} | ${effectList}`;
    }
}

export { Unit };
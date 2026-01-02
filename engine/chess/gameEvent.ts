import { type Unit } from "./unit.ts";
import { type Effect } from "./effect.ts";

type GameEvent =
    { type: "CLASH"; attacker1: Unit; attacker2: Unit; } |
    { type: "DAMAGE_BY_OBJECT"; damage: number; attacker: Unit; defender: Unit; } |
    { type: "DAMAGE_BY_POSITION"; damage: number; attacker: Unit; defenderOnOwnTeam: boolean; index: number } |
    { type: "HEAL_BY_OBJECT"; health: number; healer: Unit; patient: Unit; } |
    { type: "APPLY_EFFECT"; attacker: Unit; defender: Unit; effect: Effect } |
    { type: "FAINT"; fainter: Unit} |
    { type: "SUMMON_BEHIND_OBJECT"; summoner: Unit; summon: Unit };

export { type GameEvent };
import { Player } from "./player.ts";
import { Unit } from "./unit.ts";
//import { Effect } from "./effect.ts";
import { type GameEvent } from "./gameEvent.ts";
import { type Bonus } from "./bonus.ts";

import { BrickWallBonus } from "./bonuses/brickWallBonus.ts";

import { Brick } from "./units/brick.ts";
import { Lighter } from "./units/lighter.ts";
import { GlassJar } from "./units/glassJar.ts";

// assume player 1 is active player or randomly assign in 1v1s
const player1 = new Player("1");
const player2 = new Player("2");
const gameEventQueue: GameEvent[] = [];
let nextId: number = 0;

const bonusus: Bonus[] = [
    new BrickWallBonus(),
];

// example players setup
player1.setUnits([
    new Brick(player1, nextId++),
    new GlassJar(player1, nextId++),
    new Brick(player1, nextId++),
]);
player2.setUnits([
    new Lighter(player2, nextId++),
    new Brick(player2, nextId++),
    new Brick(player2, nextId++),
]);

function damageResolution(attacker: Unit, defender: Unit, damage: number): GameEvent[] {
    if (defender.getHealth() === 0) {
        return [];
    }

    const updatedHealth = Math.max(0, defender.getHealth() - Math.ceil(damage));
    defender.setHealth(updatedHealth);

    const resultingEvents: GameEvent[] = [];
    if (defender.getHealth() === 0) {
        // trigger pre faint events
        resultingEvents.push(...defender.preFaint(attacker));

        resultingEvents.push({
            type: "FAINT",
            fainter: defender,
        });

        // trigger post faint events
        // trigger knock out events
    }

    return resultingEvents;
}

function healResolution(healer: Unit, patient: Unit, health: number): void {
    if (patient.getHealth() === 0) {
        return;
    }

    const updatedHealth = patient.getHealth() + Math.ceil(health);
    patient.setHealth(updatedHealth);
}

function resolveGameEvent(gameEvent: GameEvent): void {
    //console.log(gameEvent.type);

    switch(gameEvent.type) {  
        case "CLASH": {
            const attacker1 = gameEvent.attacker1;
            const attacker1Damage = attacker1.calculateDamage(attacker1.getDamage());
            const attacker2 = gameEvent.attacker2;
            const attacker2Damage = attacker2.calculateDamage(attacker2.getDamage());
            const players = [player1, player2];

            // trigger pre clash events
            const damageResolutionResultingEvents: GameEvent[] = [];
            damageResolutionResultingEvents.push(...damageResolution(attacker1, attacker2, attacker1Damage));
            damageResolutionResultingEvents.push(...damageResolution(attacker2, attacker1, attacker2Damage));

            // trigger post clash events
            gameEventQueue.push(...attacker1.postClash(attacker2));
            gameEventQueue.push(...attacker2.postClash(attacker1));
            
            attacker1.getEffects().forEach((effect) => {
                gameEventQueue.push(...effect.postClash());
            });
            attacker2.getEffects().forEach((effect) => {
                gameEventQueue.push(...effect.postClash());
            });
            
            players.forEach((player) => {
                player.getUnits().forEach((unit) => {
                    gameEventQueue.push(...unit.postAnyClash());
                });
            });

            players.forEach((player) => {
                player.getUnits().forEach((unit) => {
                    unit.getEffects().forEach((effect) => {
                        gameEventQueue.push(...effect.postAnyClash());
                    });
                });
            });

            gameEventQueue.push(...damageResolutionResultingEvents);


            break;
        }
        
        case "DAMAGE_BY_OBJECT": {
            const attacker = gameEvent.attacker;
            const defender = gameEvent.defender;
            const damage = gameEvent.damage;
            
            const damageResolutionResultingEvents: GameEvent[] = damageResolution(attacker, defender, damage);;
            gameEventQueue.push(...damageResolutionResultingEvents);

            break;
        }

        case "DAMAGE_BY_POSITION": {
            const attacker = gameEvent.attacker;
            const players = [player1, player2];
            const defenderPlayer = players.filter((player) => 
                attacker.getPlayer() === player && gameEvent.defenderOnOwnTeam ||
                attacker.getPlayer() !== player && !gameEvent.defenderOnOwnTeam)[0];

            const defenderTeam = defenderPlayer.getUnits().filter((units) => units.getHealth() > 0);
            if (defenderTeam.length <= gameEvent.index) {
                break;
            }
            const defender = defenderTeam[gameEvent.index];
            const damage = gameEvent.damage;
            
            const damageResolutionResultingEvents: GameEvent[] = damageResolution(attacker, defender, damage);;
            gameEventQueue.push(...damageResolutionResultingEvents);

            break;
        }

        case "HEAL_BY_OBJECT": {
            const healer = gameEvent.healer;
            const patient = gameEvent.patient;
            const health = gameEvent.health;
            
            healResolution(healer, patient, health);

            break;
        }

        case "APPLY_EFFECT": {
            const defender = gameEvent.defender;
            defender.setEffects(defender.getEffects().concat([gameEvent.effect]));

            break;
        }

        case "FAINT": {
            // trigger faint events

            const fainter = gameEvent.fainter;
            const player: Player = fainter.getPlayer();
            player.setUnits(player.getUnits().filter((unit) => unit !== fainter));

            break;
        }

        case "SUMMON_BEHIND_OBJECT": {
            const summoner = gameEvent.summoner;
            const player = summoner.getPlayer();
            const units = player.getUnits();
            const summonerIndex = units.indexOf(summoner);
            const summon = gameEvent.summon;

            summon.setId(nextId++);
            
            player.setUnits([
                ...units.slice(0, summonerIndex+1),
                summon,
                ...units.slice(summonerIndex+1)
            ]);
        }
    }
}

function init(): void {
    console.log("init");
    //printGameState();

    // apply bonuses
    //console.log("apply bonuses");
    bonusus.forEach((bonus) => {
        gameEventQueue.push(...bonus.bonus(player1, player2));
    });

    //printGameState();
}

function getClashEvent(): GameEvent {
    let attacker1 = player1.getUnits()[0];
    let attacker2 = player2.getUnits()[0];

    return {
            type: "CLASH",
            attacker1: attacker1,
            attacker2: attacker2,
        };
}

function step(): boolean {
    console.log("step");
    if (gameEventQueue.length === 0) {
        if (player1.getUnits().length === 0 || player2.getUnits().length === 0) {
            return false;
        }

        let attacker1 = player1.getUnits()[0];
        let attacker2 = player2.getUnits()[0];

        // trigger pre attacks events

        gameEventQueue.push(getClashEvent());
    }

    const event = gameEventQueue.shift();
    event && resolveGameEvent(event);

    //printGameState();

    return true;
}

function printGameState(): void {
    //console.log("Game state -------------------------");
    const players = [player1, player2];
    players.forEach((player, index) => {
        //console.log(index);
        player.getUnits().forEach((unit) => {
            //console.log(unit.getName(), unit.getHealth(), "/", unit.getDamage(), "*".repeat(unit.getEffects().length));
            //console.log(unit.toString());
        });
    });
    //console.log("");
}

function getGameState(): Player[] {
    const players = [player1, player2];
    return players;
}

function getNextGameEventInQueue(): GameEvent {
    return gameEventQueue[0] || getClashEvent();
}

init();

export { init, step, getGameState, getNextGameEventInQueue };
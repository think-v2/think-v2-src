/*
import { greet } from "./combat_engine.ts";

const message: string = greet("Worldz");
console.log(message);

*/

import { init, step } from "./combatEngine.ts";

init();
let i = 0;
while (step() && i++ < 50) {}
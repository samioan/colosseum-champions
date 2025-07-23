import type { Enemy } from "@/types";
import { getRandomNumber } from "@/utils";

export default function createEnemy(id: string, gladiators: Enemy[]) {
  const health = getRandomNumber(10, 20);
  const stamina = getRandomNumber(10, 20);

  const gladiator: Enemy = {
    id: id,
    name: (Math.random() + 1).toString(36).substring(7),
    strength: getRandomNumber(5, 10),
    health: health,
    maxHealth: health,
    stamina: stamina,
    maxStamina: stamina,
  };

  gladiators.push(gladiator);
}

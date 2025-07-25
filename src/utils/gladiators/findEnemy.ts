import type { Enemy } from "@/types";

export default function findEnemy(enemies: Enemy[], id: string) {
  return enemies.find((enemy) => enemy.gladiatorId === id);
}

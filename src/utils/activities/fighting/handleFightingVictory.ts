import type { Gladiator, Enemy } from "@/types";
import {
  handleStat,
  endActivity,
  removeGladiator,
  createEnemy,
  getActivityExp,
  checkForLevelUp,
} from "@/utils";
import { FIGHT_EXP_BASE } from "@/constants";
import type { Ref } from "vue";

export default function handleFightingVictory(
  gladiator: Gladiator,
  enemy: Enemy,
  enemies: Ref<Enemy[]>
) {
  handleStat(
    gladiator,
    "experience",
    getActivityExp(FIGHT_EXP_BASE, enemy.level),
    "increment"
  );
  checkForLevelUp(gladiator);
  removeGladiator(enemies as Ref<Gladiator[]>, gladiator);
  createEnemy(gladiator.id, enemies.value, gladiator.level);

  endActivity(gladiator, "isFighting");
}

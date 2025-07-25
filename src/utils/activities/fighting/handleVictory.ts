import type { Gladiator, Enemy } from "@/types";
import {
  handleStat,
  endActivity,
  removeEnemy,
  createEnemy,
  getActivityExp,
  checkForLevelUp,
  createMessage,
} from "@/utils";
import { FIGHT_EXP_BASE } from "@/constants";
import type { Ref } from "vue";
import { VICTORY_MESSAGES } from "@/constants";

export default function handleVictory(
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
  removeEnemy(enemies, gladiator);
  createEnemy(gladiator.id, enemies.value, gladiator.level);
  gladiator.messages = [];
  createMessage(
    gladiator.messages,
    VICTORY_MESSAGES,
    gladiator.id,
    gladiator.name
  );

  endActivity(gladiator, "isFighting");
}

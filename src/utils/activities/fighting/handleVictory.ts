import type { Gladiator, Enemy } from "@/types";
import {
  handleStat,
  endActivity,
  getActivityExp,
  createMessage,
} from "@/utils";
import { FIGHT_EXP_BASE } from "@/constants";
import { VICTORY_MESSAGES } from "@/constants";

export default function handleVictory(gladiator: Gladiator, enemy: Enemy) {
  handleStat(
    gladiator,
    "gold",
    getActivityExp(FIGHT_EXP_BASE, enemy.level),
    "increment"
  );

  createMessage(
    gladiator.messages,
    VICTORY_MESSAGES,
    gladiator.id,
    gladiator.name
  );

  endActivity(gladiator, "isFighting");
}

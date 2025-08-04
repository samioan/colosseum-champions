import type { Gladiator } from "@/types";
import {
  handleStat,
  setActivity,
  getActivityExp,
  createMessage,
} from "@/utils";
import { FIGHT_EXP_BASE } from "@/constants";
import { VICTORY_MESSAGES } from "@/constants";

export default function handleVictory(gladiator: Gladiator, enemy: Gladiator) {
  handleStat(
    gladiator,
    "gold",
    getActivityExp(FIGHT_EXP_BASE, enemy.level),
    "increase"
  );
  handleStat(gladiator, "rage", 0, "set");

  createMessage(
    gladiator.messages,
    VICTORY_MESSAGES,
    gladiator.id,
    gladiator.name
  );

  setActivity(gladiator, "idle");
}

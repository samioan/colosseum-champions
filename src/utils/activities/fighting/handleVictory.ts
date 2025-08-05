import type { Gladiator } from "@/types";
import {
  handleStat,
  setActivity,
  getActivityExp,
  createMessage,
} from "@/utils";
import { FIGHT_EXP_BASE } from "@/constants";
import { VICTORY_MESSAGES } from "@/constants";
import { ActivityState, StatAction, StatKey } from "@/enums";

export default function handleVictory(gladiator: Gladiator, enemy: Gladiator) {
  handleStat(
    gladiator,
    StatKey.GOLD,
    getActivityExp(FIGHT_EXP_BASE, enemy.level),
    StatAction.INCREASE
  );
  handleStat(gladiator, StatKey.RAGE, 0, StatAction.SET);

  createMessage(
    gladiator.messages,
    VICTORY_MESSAGES,
    gladiator.id,
    gladiator.name
  );

  setActivity(gladiator, ActivityState.IDLE);
}

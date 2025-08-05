import type { Gladiator } from "@/types";
import {
  handleStat,
  setActivity,
  getActivityExp,
  checkForLevelUp,
} from "@/utils";
import { TRAIN_EXP_BASE } from "@/constants";
import { ActivityState, StatAction, StatKey } from "@/enums";

export default function handleTraining(gladiator: Gladiator) {
  if (gladiator.stamina <= 0 || gladiator.gold < 10) {
    return setActivity(gladiator, ActivityState.IDLE);
  }

  handleStat(gladiator, StatKey.STAMINA, 5, StatAction.DECREASE);
  handleStat(gladiator, StatKey.GOLD, 10, StatAction.DECREASE);
  handleStat(
    gladiator,
    StatKey.EXPERIENCE,
    getActivityExp(TRAIN_EXP_BASE, gladiator.level),
    StatAction.INCREASE
  );
  checkForLevelUp(gladiator);
}

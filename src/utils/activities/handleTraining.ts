import type { Gladiator } from "@/types";
import {
  handleStat,
  setActivity,
  getActivityExp,
  checkForLevelUp,
} from "@/utils";
import { TRAIN_EXP_BASE } from "@/constants";

export default function handleTraining(gladiator: Gladiator) {
  if (gladiator.stamina <= 0 || gladiator.gold < 10) {
    return setActivity(gladiator, "idle");
  }

  handleStat(gladiator, "stamina", 5, "decrease");
  handleStat(gladiator, "gold", 10, "decrease");
  handleStat(
    gladiator,
    "experience",
    getActivityExp(TRAIN_EXP_BASE, gladiator.level),
    "increase"
  );
  checkForLevelUp(gladiator);
}

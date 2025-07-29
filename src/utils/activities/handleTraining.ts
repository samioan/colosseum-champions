import type { Gladiator } from "@/types";
import {
  handleStat,
  endActivity,
  getActivityExp,
  checkForLevelUp,
} from "@/utils";
import { TRAIN_EXP_BASE } from "@/constants";

export default function handleTraining(gladiator: Gladiator) {
  handleStat(gladiator, "stamina", 5, "decrement");
  handleStat(gladiator, "gold", 10, "decrement");
  handleStat(
    gladiator,
    "experience",
    getActivityExp(TRAIN_EXP_BASE, gladiator.level),
    "increment"
  );
  checkForLevelUp(gladiator);

  if (gladiator.stamina <= 0) {
    endActivity(gladiator, "isTraining");
  }
}

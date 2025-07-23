import type { Gladiator } from "@/types";
import { handleStat, endActivity } from "@/utils";

export default function handleTraining(gladiator: Gladiator) {
  handleStat(gladiator, "experience", 10, "increment");
  handleStat(gladiator, "stamina", 10, "decrement");
  handleStat(gladiator, "trainingDays", 1, "increment");
  handleStat(gladiator, "restingDays", 0, "set");
  handleStat(gladiator, "fightingMatches", 0, "set");

  if (
    gladiator.stamina < 0 ||
    gladiator.trainingDays >= gladiator.maxTrainingDays
  )
    endActivity(gladiator, "isTraining");
}

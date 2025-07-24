import type { Gladiator, Enemy } from "@/types";
import { endActivity, removeGladiator } from "@/utils";

import type { Ref } from "vue";

export default function handleFightingDefeat(
  gladiator: Gladiator,
  gladiators: Ref<Gladiator[]>,
  enemies: Ref<Enemy[]>
) {
  endActivity(gladiator, "isFighting");
  removeGladiator(gladiators, gladiator);
  removeGladiator(enemies as Ref<Gladiator[]>, gladiator);
}

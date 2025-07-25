import type { Gladiator, Enemy } from "@/types";
import {
  endActivity,
  removeGladiator,
  createMessage,
  removeEnemy,
} from "@/utils";
import { DEFEAT_MESSAGES } from "@/constants";

import type { Ref } from "vue";

export default function handleDefeat(
  gladiator: Gladiator,
  gladiators: Ref<Gladiator[]>,
  enemies: Ref<Enemy[]>
) {
  endActivity(gladiator, "isFighting");

  createMessage(
    gladiator.messages,
    DEFEAT_MESSAGES,
    gladiator.id,
    gladiator.name
  );

  setTimeout(() => {
    removeGladiator(gladiators, gladiator);
    removeEnemy(enemies, gladiator);
  }, 3000);
}

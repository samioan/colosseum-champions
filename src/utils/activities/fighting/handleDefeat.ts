import type { Gladiator } from "@/types";
import { setActivity, createMessage } from "@/utils";
import { DEFEAT_MESSAGES } from "@/constants";
import { ActivityState } from "@/enums";

export default function handleDefeat(gladiator: Gladiator) {
  setActivity(gladiator, ActivityState.IDLE);

  createMessage(
    gladiator.messages,
    DEFEAT_MESSAGES,
    gladiator.id,
    gladiator.name
  );
}

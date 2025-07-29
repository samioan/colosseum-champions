import type { Gladiator } from "@/types";
import { endActivity, createMessage } from "@/utils";
import { DEFEAT_MESSAGES } from "@/constants";

export default function handleDefeat(gladiator: Gladiator) {
  endActivity(gladiator, "isFighting");

  createMessage(
    gladiator.messages,
    DEFEAT_MESSAGES,
    gladiator.id,
    gladiator.name
  );
}

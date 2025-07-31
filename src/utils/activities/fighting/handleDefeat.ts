import type { Gladiator } from "@/types";
import { setActivity, createMessage } from "@/utils";
import { DEFEAT_MESSAGES } from "@/constants";

export default function handleDefeat(gladiator: Gladiator) {
  setActivity(gladiator, "idle");

  createMessage(
    gladiator.messages,
    DEFEAT_MESSAGES,
    gladiator.id,
    gladiator.name
  );
}

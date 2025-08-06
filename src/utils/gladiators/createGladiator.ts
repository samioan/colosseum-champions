import type { Gladiator } from "@/types";
import { ABILITIES, GLADIATOR_BASE_STATS, PERKS, ITEMS } from "@/constants";
import { v4 as uuidv4 } from "uuid";
import { createName } from "@/utils";
import { ActivityState } from "@/enums";

export default function createGladiator(): Gladiator {
  return {
    id: uuidv4(),
    name: createName(),
    stats: JSON.parse(JSON.stringify(GLADIATOR_BASE_STATS)),
    hasTurn: false,
    activity: ActivityState.IDLE,
    messages: [],
    abilities: JSON.parse(JSON.stringify(ABILITIES)),
    perks: JSON.parse(JSON.stringify(PERKS)),
    items: JSON.parse(JSON.stringify(ITEMS)),
  };
}

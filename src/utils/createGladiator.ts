import type { Gladiator } from "@/types";
import { ABILITIES, GLADIATOR_BASE_STATS, PERKS, ITEMS } from "@/constants";
import { createName } from "@/utils";

export default function createGladiator(): Gladiator {
  return {
    name: createName(),
    stats: JSON.parse(JSON.stringify(GLADIATOR_BASE_STATS)),
    hasTurn: false,
    abilities: JSON.parse(JSON.stringify(ABILITIES)),
    perks: JSON.parse(JSON.stringify(PERKS)),
    items: JSON.parse(JSON.stringify(ITEMS)),
  };
}

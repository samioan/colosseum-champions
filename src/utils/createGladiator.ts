import type { Gladiator } from "@/types";
import {
  ABILITIES,
  PLAYER_BASE_STATS,
  PERKS,
  ITEMS,
  EQUIPMENT,
  LABELS,
} from "@/constants";

export default function createGladiator(): Gladiator {
  return {
    name: LABELS.PLAYER_NAME,
    stats: JSON.parse(JSON.stringify(PLAYER_BASE_STATS)),
    abilities: JSON.parse(JSON.stringify(ABILITIES)),
    perks: JSON.parse(JSON.stringify(PERKS)),
    items: JSON.parse(JSON.stringify(ITEMS)),
    equipment: JSON.parse(JSON.stringify(EQUIPMENT)),
  };
}

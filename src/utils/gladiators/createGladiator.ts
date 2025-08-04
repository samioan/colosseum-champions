import type { Gladiator } from "@/types";
import { ABILITIES, GLADIATOR_BASE_STATS } from "@/constants";
import { v4 as uuidv4 } from "uuid";
import { createName } from "@/utils";

export default function createGladiator(): Gladiator {
  return {
    ...GLADIATOR_BASE_STATS,
    id: uuidv4(),
    name: createName(),
    abilities: JSON.parse(JSON.stringify(ABILITIES)),
  };
}

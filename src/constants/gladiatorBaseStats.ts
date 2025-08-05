import { ActivityState } from "@/enums";
import type { Gladiator } from "@/types";

export const GLADIATOR_BASE_STATS: Gladiator = {
  id: "",
  name: "",
  level: 1,
  health: 100,
  maxHealth: 100,
  stamina: 100,
  maxStamina: 100,
  rage: 0,
  maxRage: 100,
  strength: 10,
  dexterity: 10,
  defense: 10,
  experience: 0,
  maxExperience: 100,
  points: 15,
  gold: 0,
  activity: ActivityState.IDLE,
  intervalId: undefined,
  hasTurn: true,
  messages: [],
  abilities: [],
  perks: [],
};

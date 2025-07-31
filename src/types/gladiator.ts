import type { CombatMessage, ActivityState } from "@/types";

export type Gladiator = {
  id: string;
  name: string;
  level: number;
  health: number;
  maxHealth: number;
  stamina: number;
  maxStamina: number;
  strength: number;
  dexterity: number;
  defense: number;
  hasTurn: boolean;
  messages: CombatMessage[];
  experience: number;
  maxExperience: number;
  points: number;
  activity: ActivityState;
  intervalId?: number;
  gold: number;
  vitality: number;
  endurance: number;
};

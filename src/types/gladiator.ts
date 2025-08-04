import type { CombatMessage, ActivityState, Ability } from "@/types";

export type Gladiator = {
  id: string;
  gladiatorId?: string;
  name: string;
  level: number;
  health: number;
  rage: number;
  maxRage: number;
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
  abilities: Ability[];
  perks: [];
};

import type { BaseGladiator } from "@/types";

export interface Gladiator extends BaseGladiator {
  experience: number;
  maxExperience: number;
  points: number;
  isTraining: boolean;
  isFighting: boolean;
  isResting: boolean;
  intervalId?: number;
  trainingTime: number;
  restingTime: number;
  fightingTime: number;
  gold: number;
  vitality: number;
  endurance: number;
}

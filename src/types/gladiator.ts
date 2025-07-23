import type { BaseGladiator } from "@/types";

export interface Gladiator extends BaseGladiator {
  experience: number;
  maxExperience: number;
  level: number;
  points: number;
  isTraining: boolean;
  isFighting: boolean;
  isResting: boolean;
  intervalId?: number;
  trainingTime: number;
  restingTime: number;
  fightingTime: number;
  fightingMatches: number;
  trainingDays: number;
  restingDays: number;
  maxFightingMatches: number;
  maxTrainingDays: number;
  maxRestingDays: number;
}

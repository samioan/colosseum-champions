import { StatKey, AbilityType, Operator } from "@/enums";

type AbilityPayload = {
  type: AbilityType;
  stat: StatKey;
  value: {
    stat: StatKey;
    operator?: Operator;
    modifier?: number;
  };
};

export type Ability = {
  label: string;
  description: string;
  image: string;
  points: number;
  stamina: number;
  cooldown: number;
  maxCooldown: number;
  isUnlocked: boolean;
  isEquipped: boolean;
  isActive: boolean;
  payload: AbilityPayload[];
};

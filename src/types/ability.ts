import { StatKey, AbilityType, Operator, BonusStatus } from "@/enums";

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
  status: BonusStatus;
  payload: AbilityPayload[];
};

import { StatKey, AbilityType } from "@/enums";

type AbilityPayload = {
  type: AbilityType;
  stat: StatKey;
  value: {
    stat: StatKey;
    operator?: string;
    modifier?: number;
  };
};

export type Ability = {
  id: string;
  label: string;
  description: string;
  rage: number;
  isUnlocked: boolean;
  isSelected: boolean;
  isActive: boolean;
  payload: AbilityPayload[];
};

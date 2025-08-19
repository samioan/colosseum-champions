import { StatKey, Operator } from "@/enums";

type Requirement = {
  stat: StatKey;
  operator: Operator;
  value: number;
};

export type Bonus = {
  stat: StatKey;
  operator: Operator;
  value: number;
  requirements?: Requirement[];
};

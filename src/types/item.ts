import { StatKey } from "@/enums";

export type Item = {
  label: string;
  description: string;
  gold: number;
  amount: number;
  image: string;
  stats: StatKey[];
  modifier: number;
};

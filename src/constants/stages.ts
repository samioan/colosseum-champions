import {
  background01,
  background02,
  background03,
  background04,
  background05,
  background06,
  background07,
  background08,
  background09,
  background10,
  background11,
  background12,
} from "@/assets";
import type { Stage } from "@/types";

export const STAGES: Stage[] = [
  {
    label: "Whispering Forest",
    description: "Shadowy woods filled with wolves and lurking bandits.",
    image: background01,
    gold: 0,
    level: 1,
  },
  {
    label: "Forgotten Village",
    description: "Abandoned homes haunted by restless peasants and thieves.",
    image: background02,
    gold: 10,
    level: 11,
  },
  {
    label: "Misty Marshlands",
    description: "Treacherous swamps where giant insects and spirits dwell.",
    image: background03,
    gold: 20,
    level: 21,
  },
  {
    label: "Ancient Ruins",
    description:
      "Crumbling stone halls echoing with the steps of cursed guardians.",
    image: background04,
    gold: 30,
    level: 31,
  },
  {
    label: "Cavern of Echoes",
    description:
      "Endless darkness broken by crystal light and monstrous roars.",
    image: background05,
    gold: 40,
    level: 41,
  },
  {
    label: "Haunted Crypt",
    description: "A tomb of knights long dead, now restless and wrathful.",
    image: background06,
    gold: 50,
    level: 51,
  },
  {
    label: "Sunken Temple",
    description: "A sacred site drowned in corruption and guarded by zealots.",
    image: background07,
    gold: 60,
    level: 61,
  },
  {
    label: "Black Iron Mines",
    description:
      "Forges of greed, now crawling with mercenaries and flame-born horrors.",
    image: background08,
    gold: 70,
    level: 71,
  },
  {
    label: "Bloodfang Keep",
    description: "A fortress of war hounds, elite soldiers, and siegecraft.",
    image: background09,
    gold: 80,
    level: 81,
  },
  {
    label: "Infernal Chasm",
    description: "Fiery depths where chained demons hunger for release.",
    image: background10,
    gold: 90,
    level: 91,
  },
  {
    label: "Sanctum of Shadows",
    description:
      "A forbidden hall of assassins and dark paladins sworn to silence.",
    image: background11,
    gold: 100,
    level: 101,
  },
  {
    label: "Crimson Castle",
    description:
      "The final stronghold where the dark lord rules in blood and steel.",
    image: background12,
    gold: 110,
    level: 111,
  },
];

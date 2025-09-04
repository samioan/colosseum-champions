import gameBackground from "@/assets/gameBackground.png";
import titleBackground from "@/assets/titleBackground.gif";
import dungeonBackground from "@/assets/dungeonBackground.jpg";
import logo from "@/assets/logo.png";

import { shortSword, longSword } from "@/assets/equipment";
// -- ITEMS --
import {
  // HEALTH
  healthPotion,
  bigHealthPotion,
  giantHealthPotion,
  grandHealthPotion,
  // ENERGY
  energyPotion,
  bigEnergyPotion,
  giantEnergyPotion,
  grandEnergyPotion,
  // REJUVENATION
  rejuvenationPotion,
  bigRejuvenationPotion,
  giantRejuvenationPotion,
  grandRejuvenationPotion,
  // STRENGTH
  strengthPotion,
  bigStrengthPotion,
  giantStrengthPotion,
  grandStrengthPotion,
  // DEFENSE
  defensePotion,
  bigDefensePotion,
  giantDefensePotion,
  grandDefensePotion,
  // BONUS
  bonusHealthPotion,
  bonusEnergyPotion,
  bonusStrengthPotion,
  bonusDefensePotion,
  bonusPointsPotion,
} from "@/assets/items";
import { smash } from "@/assets/abilities";
import { defensive } from "@/assets/perks";
import {
  enemy1Death,
  enemy1Idle,
  enemy1Attack,
  enemy1Hurt,
} from "@/assets/enemies";
import { scene1, scene2 } from "@/assets/cutscenes";
import {
  perks,
  items,
  abilities,
  gold,
  equipment,
  arena,
  points,
  experience,
  defense,
  strength,
  health,
  energy,
} from "@/assets/ui";

export {
  gameBackground,
  titleBackground,
  logo,
  dungeonBackground,
  shortSword,
  longSword,
  // -- ITEMS --
  // HEALTH
  healthPotion,
  bigHealthPotion,
  giantHealthPotion,
  grandHealthPotion,
  // ENERGY
  energyPotion,
  bigEnergyPotion,
  giantEnergyPotion,
  grandEnergyPotion,
  // REJUVENATION
  rejuvenationPotion,
  bigRejuvenationPotion,
  giantRejuvenationPotion,
  grandRejuvenationPotion,
  // STRENGTH
  strengthPotion,
  bigStrengthPotion,
  giantStrengthPotion,
  grandStrengthPotion,
  // DEFENSE
  defensePotion,
  bigDefensePotion,
  giantDefensePotion,
  grandDefensePotion,
  // BONUS
  bonusHealthPotion,
  bonusEnergyPotion,
  bonusStrengthPotion,
  bonusDefensePotion,
  bonusPointsPotion,
  // -- ABILITIES --
  smash,
  // -- PERKS --
  defensive,
  enemy1Death,
  enemy1Idle,
  enemy1Attack,
  enemy1Hurt,
  scene1,
  scene2,
  perks,
  items,
  abilities,
  gold,
  equipment,
  arena,
  points,
  experience,
  defense,
  strength,
  health,
  energy,
};

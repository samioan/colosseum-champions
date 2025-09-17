import type { Gladiator } from "@/types";
import { getRandomRange } from "@/utils";
import { AbilityId, BonusStatus, EquipmentSlot } from "@/enums";

export default function calculateDamage(
  attacker: Gladiator,
  defender: Gladiator,
  abilityId?: AbilityId
) {
  const attackerWeapon = Object.values(attacker?.equipment)?.filter(
    (equip) =>
      equip.status === BonusStatus.EQUIPPED &&
      equip.slot === EquipmentSlot.WEAPON
  )[0]?.attack;

  const defenderArmor =
    Object.values(defender?.equipment)
      ?.filter(
        (equip) =>
          equip.status === BonusStatus.EQUIPPED &&
          equip.slot !== EquipmentSlot.WEAPON
      )
      .map((equip) => equip.armor)
      .reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0;

  const isCrit = getRandomRange(0, 100) >= 80;
  const didEvade = getRandomRange(0, 100) >= 80;

  const weaponDamage = attackerWeapon
    ? Math.floor(
        Math.random() * (attackerWeapon[1] - attackerWeapon[0] + 1) +
          attackerWeapon[0]
      )
    : 0;

  const minDamage = Math.max(
    1,
    Math.floor(attacker.stats.strength * 0.05 + attacker.stats.level)
  );

  const rawAttackPower = weaponDamage + minDamage;

  const mitigatedDamage =
    rawAttackPower * (100 / (100 + defender.stats.defense));

  const afterArmor = Math.max(0, mitigatedDamage - defenderArmor);

  let damage = Math.max(minDamage, Math.floor(afterArmor));

  switch (abilityId) {
    case AbilityId.TRIPLE_REND:
      damage *= 3;
      return Math.floor(damage);
    case AbilityId.PIERCING_THRUST:
      damage = rawAttackPower;
      return Math.floor(damage);
    default:
      if (isCrit) {
        damage *= 2;
      }
      if (didEvade) {
        damage = minDamage;
      }
      return Math.floor(damage);
  }
}

import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import type { Gladiator, Enemy } from "@/types";
import {
  setActivity,
  handleTraining,
  handleFighting,
  handleResting,
  createMessage,
  createEnemy,
  createGladiator,
  allocatePoint,
} from "@/utils";
import {
  INTRO_MESSAGES,
  ACTIVITY_TIMES,
  LABELS,
  COLORS,
  ROUTES,
} from "@/constants";

export const useGameStore = defineStore("game", () => {
  const router = useRouter();

  const gladiator = ref<Gladiator>(createGladiator());
  const enemy = ref<Enemy>(
    createEnemy(gladiator.value.id, gladiator.value.level)
  );
  const activityTimes = ref(ACTIVITY_TIMES);

  const gladiatorHeaderProps = computed(() => ({
    name: gladiator.value.name,
    level: gladiator.value.level,
  }));

  const gladiatorMainStats = computed(() => [
    {
      label: LABELS.HEALTH,
      stat: gladiator.value.health,
      maxStat: gladiator.value.maxHealth,
      colorClass: COLORS.HEALTH,
    },
    {
      label: LABELS.STAMINA,
      stat: gladiator.value.stamina,
      maxStat: gladiator.value.maxStamina,
      colorClass: COLORS.STAMINA,
    },
  ]);

  const gladiatorMainExtraStats = computed(() => [
    {
      label: LABELS.EXPERIENCE,
      stat: gladiator.value.experience,
      maxStat: gladiator.value.maxExperience,
      colorClass: COLORS.EXPERIENCE,
    },
    {
      label: LABELS.GOLD,
      stat: gladiator.value.gold,
      colorClass: COLORS.GOLD,
    },
  ]);

  const gladiatorSecondaryStats = computed(() => [
    {
      label: LABELS.VITALITY,
      stat: gladiator.value.vitality,
      showLevelUp: gladiator.value.points > 0,
      onClick: () =>
        allocatePoint(gladiator.value, [
          { statKey: "vitality", value: 1 },
          { statKey: "maxHealth", value: 10 },
          { statKey: "health", value: 10 },
        ]),
    },
    {
      label: LABELS.ENDURANCE,
      stat: gladiator.value.endurance,
      showLevelUp: gladiator.value.points > 0,
      onClick: () =>
        allocatePoint(gladiator.value, [
          { statKey: "endurance", value: 1 },
          { statKey: "maxStamina", value: 10 },
          { statKey: "stamina", value: 10 },
        ]),
    },
    {
      label: LABELS.STRENGTH,
      stat: gladiator.value.strength,
      showLevelUp: gladiator.value.points > 0,
      onClick: () =>
        allocatePoint(gladiator.value, [{ statKey: "strength", value: 1 }]),
    },
    {
      label: LABELS.DEFENSE,
      stat: gladiator.value.defense,
      showLevelUp: gladiator.value.points > 0,
      onClick: () =>
        allocatePoint(gladiator.value, [{ statKey: "defense", value: 1 }]),
    },
    {
      label: LABELS.DEXTERITY,
      stat: gladiator.value.dexterity,
      showLevelUp: gladiator.value.points > 0,
      onClick: () =>
        allocatePoint(gladiator.value, [{ statKey: "dexterity", value: 1 }]),
    },
  ]);

  const gladiatorActivityButtons = computed(() => [
    {
      disabled:
        gladiator.value.activity === "fighting" ||
        gladiator.value.activity === "resting" ||
        gladiator.value.stamina < 5 ||
        gladiator.value.gold < 10,
      onClick:
        gladiator.value.activity === "training"
          ? () => setActivity(gladiator.value, "idle")
          : () => train(),
      label: LABELS[gladiator.value.activity === "training" ? "STOP" : "TRAIN"],
      colorClasses: COLORS.TRAIN_BUTTON,
    },
    {
      disabled:
        gladiator.value.activity === "training" ||
        gladiator.value.activity === "resting" ||
        gladiator.value.stamina < 5,
      onClick:
        gladiator.value.activity === "fighting"
          ? () => setActivity(gladiator.value, "idle")
          : () => {
              router.push(ROUTES.combat);
              fight(gladiator.value.id);
            },
      label: LABELS[gladiator.value.activity === "fighting" ? "STOP" : "FIGHT"],
      colorClasses: COLORS.FIGHT_BUTTON,
    },
    {
      disabled:
        gladiator.value.activity === "fighting" ||
        gladiator.value.activity === "training" ||
        gladiator.value.gold < 10 ||
        (gladiator.value.health === gladiator.value.maxHealth &&
          gladiator.value.stamina === gladiator.value.maxStamina),
      onClick:
        gladiator.value.activity === "resting"
          ? () => setActivity(gladiator.value, "idle")
          : () => rest(),
      label: gladiator.value.activity === "resting" ? LABELS.STOP : LABELS.REST,
      colorClasses: COLORS.REST_BUTTON,
    },
  ]);

  const enemyHeaderProps = computed(() => ({
    name: enemy.value.name,
    level: enemy.value.level,
  }));

  const enemyMainStats = computed(() => [
    {
      label: LABELS.HEALTH,
      stat: enemy.value.health,
      maxStat: enemy.value.maxHealth,
      colorClass: COLORS.HEALTH,
    },
    {
      label: LABELS.STAMINA,
      stat: enemy.value.stamina,
      maxStat: enemy.value.maxStamina,
      colorClass: COLORS.STAMINA,
    },
  ]);

  const combatMessages = computed(() => {
    const msgs = [
      ...gladiator.value.messages,
      ...(enemy.value?.messages ?? []),
    ].sort((a, b) => b.time - a.time);

    return {
      gladiatorId: gladiator.value.id,
      messages: msgs.slice(0, 1),
    };
  });

  const combatModalProps = computed(() => ({
    isVisible:
      gladiator.value.health <= 0 ||
      gladiator.value.stamina <= 0 ||
      enemy.value?.health <= 0 ||
      enemy.value?.stamina <= 0,
    onClick: () =>
      router.push(
        ROUTES[
          gladiator.value.health <= 0 || gladiator.value.stamina <= 0
            ? "home"
            : "gladiator"
        ]
      ),
  }));

  const combatModalMessage = computed(
    () => combatMessages.value.messages[0].text
  );

  function train() {
    setActivity(
      gladiator.value,
      "training",
      () => handleTraining(gladiator.value),
      activityTimes.value.training
    );
  }

  function fight(id: string) {
    enemy.value = createEnemy(gladiator.value.id, gladiator.value.level);
    createMessage(
      gladiator.value.messages,
      INTRO_MESSAGES,
      id,
      gladiator.value.name
    );
    setActivity(
      gladiator.value,
      "fighting",
      () => handleFighting(gladiator.value, enemy),
      activityTimes.value.fighting
    );
  }

  function rest() {
    setActivity(
      gladiator.value,
      "resting",
      () => handleResting(gladiator.value),
      activityTimes.value.resting
    );
  }

  function init() {
    gladiator.value = createGladiator();
  }

  return {
    gladiator,
    enemy,
    activityTimes,
    gladiatorHeaderProps,
    gladiatorMainStats,
    gladiatorMainExtraStats,
    gladiatorSecondaryStats,
    gladiatorActivityButtons,
    enemyHeaderProps,
    enemyMainStats,
    combatMessages,
    combatModalProps,
    combatModalMessage,
    train,
    fight,
    rest,
    init,
  };
});

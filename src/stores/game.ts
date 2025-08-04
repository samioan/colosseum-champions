import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import type { Gladiator, DrawerState } from "@/types";
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

  const perks = [
    {
      name: "Skilled",
      description: "Get +5 Points per LVL",
      requirements: [
        gladiator.value.maxHealth > 200,
        gladiator.value.stamina > 200,
      ],
    },
    {
      name: "Agile",
      description: "DEX * 2 when below 25% HP",
      requirements: [gladiator.value.dexterity >= 50],
    },
  ];
  const enemy = ref<Gladiator>(
    createEnemy(gladiator.value.id, gladiator.value.level)
  );
  const activityTimes = ref(ACTIVITY_TIMES);
  const drawer = ref<{ isOpen: boolean; state: DrawerState; title: string }>({
    isOpen: false,
    state: "empty",
    title: "",
  });

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
    {
      label: LABELS.RAGE,
      stat: gladiator.value.rage,
      maxStat: gladiator.value.maxRage,
      colorClass: COLORS.RAGE,
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
      onClick: () =>
        allocatePoint(gladiator.value, [{ statKey: "strength", value: 1 }]),
    },
    {
      label: LABELS.DEFENSE,
      stat: gladiator.value.defense,
      onClick: () =>
        allocatePoint(gladiator.value, [{ statKey: "defense", value: 1 }]),
    },
    {
      label: LABELS.DEXTERITY,
      stat: gladiator.value.dexterity,
      onClick: () =>
        allocatePoint(gladiator.value, [{ statKey: "dexterity", value: 1 }]),
    },
  ]);

  const gladiatorAbilities = computed(() => {
    return gladiator.value.abilities.map((ability) => ({
      ...ability,
      onSelect: () => {
        if (!ability.isUnlocked) {
          if (gladiator.value.points >= 5) {
            ability.isUnlocked = true;
            gladiator.value.points -= 5;
          } else return;
        }
        const selectedAbilities = gladiator.value.abilities.filter(
          (a) => a.isSelected === true
        );
        if (selectedAbilities.length > 2 && !ability.isSelected) {
          return;
        } else {
          ability.isSelected = !ability.isSelected;
          if (!ability.isSelected) ability.isActive = false;
        }
      },
      onActivate: () => {
        if (ability.isActive) ability.isActive = false;
        else {
          gladiator.value.abilities.forEach((a) => (a.isActive = false));
          ability.isActive = true;
        }
      },
    }));
  });

  const gladiatorSelectedAbilities = computed(() =>
    gladiator.value.abilities
      .filter((ability) => ability.isSelected)
      .map((ability) => ({
        label: ability.label,
        isActive: ability.isActive,
        onActivate: () => {
          if (ability.isActive) ability.isActive = false;
          else {
            gladiator.value.abilities.forEach((a) => (a.isActive = false));
            ability.isActive = true;
          }
        },
      }))
  );

  const gladiatorActivityButtons = computed(() => [
    {
      onClick: () => toggleDrawer("character", "Codex"),
      label: LABELS.CODEX,
      colorClasses: COLORS.STATS_BUTTON,
    },
    {
      onClick: () => toggleDrawer("armory", "Armory"),
      label: LABELS.ARMORY,
      colorClasses: COLORS.STATS_BUTTON,
    },
    {
      onClick: () => toggleDrawer("items", "Items"),
      label: LABELS.ITEMS,
      colorClasses: COLORS.STATS_BUTTON,
    },
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
    {
      label: LABELS.RAGE,
      stat: enemy.value.rage,
      maxStat: enemy.value.maxRage,
      colorClass: COLORS.RAGE,
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

  function toggleDrawer(state: DrawerState, title: string) {
    drawer.value.isOpen = !drawer.value.isOpen;
    drawer.value.state = state;
    drawer.value.title = title;
  }

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
    gladiator.value.messages = [];
    createMessage(
      gladiator.value.messages,
      INTRO_MESSAGES,
      id,
      gladiator.value.name
    );
    setActivity(
      gladiator.value,
      "fighting",
      () => handleFighting(gladiator.value, enemy.value),
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
    drawer,
    gladiatorAbilities,
    gladiatorSelectedAbilities,
    perks,
    toggleDrawer,
    train,
    fight,
    rest,
    init,
  };
});

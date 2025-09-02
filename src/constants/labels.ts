import { Label, Language } from "@/enums";

export const LABELS: Record<Language, Record<Label, string>> = {
  [Language.ENGLISH]: {
    [Label.COLOSSEUM_CHAMPIONS]: "Colosseum Champions",
    [Label.TUTORIAL]: "Tutorial",
    [Label.QUEST_FOR_GLORY]: "Quest for Glory",
    [Label.OPTIONS]: "Options",
    [Label.CONTINUE]: "Continue",
    [Label.LEVEL]: "Lv",
    [Label.STATS]: "STATS",
    [Label.ABILITIES]: "ABILITIES",
    [Label.PERKS]: "PERKS",
    [Label.EQUIPMENT]: "EQUIPMENT",
    [Label.ITEMS]: "ITEMS",
  },
  [Language.GREEK]: {
    [Label.COLOSSEUM_CHAMPIONS]: "Πρωταθλητές του Κολοσσαίου",
    [Label.TUTORIAL]: "Εκπαίδευση",
    [Label.QUEST_FOR_GLORY]: "Αναζήτηση της Δόξας",
    [Label.OPTIONS]: "Επιλογές",
    [Label.CONTINUE]: "Συνέχισε",
    [Label.LEVEL]: "Επ",
    [Label.STATS]: "ΣΤΑΤΙΣΤΙΚΑ",
    [Label.ABILITIES]: "ΙΚΑΝΟΤΗΤΕΣ",
    [Label.PERKS]: "ΠΡΟΝΟΜΙΑ",
    [Label.EQUIPMENT]: "ΕΞΟΠΛΙΣΜΟΣ",
    [Label.ITEMS]: "ΑΝΤΙΚΕΙΜΕΝΑ",
  },
};

import { NAMES, SURNAMES } from "@/constants";

export default function createName() {
  return `${NAMES[Math.floor(Math.random() * NAMES.length)]} ${
    SURNAMES[Math.floor(Math.random() * SURNAMES.length)]
  }`;
}

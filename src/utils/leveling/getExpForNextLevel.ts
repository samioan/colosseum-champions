export default function getExpForNextLevel(
  baseXP: number,
  growth: number,
  level: number
) {
  return Math.floor(baseXP * Math.pow(level, growth));
}

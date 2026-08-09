export function matchColor(match: number) {
  if (match >= 90) return "text-emerald-400";
  if (match >= 75) return "text-lime-400";
  if (match >= 60) return "text-amber-400";
  return "text-zinc-400";
}
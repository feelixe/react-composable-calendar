export function range(length: number) {
  return [...new Array(length)].map((_, i) => i);
}

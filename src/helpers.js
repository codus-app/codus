export function clip(val, low, high) {
  return Math.max(Math.min(val, high), low);
}

export function clip(val, low, high) {
  return Math.max(Math.min(val, high), low);
}

export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

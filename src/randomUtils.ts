export function convertRandomToRandomInt(
  rand: number,
  min: number,
  max: number
): number {
  return Math.floor(rand * (max - min + 1)) + min;
}

export function getRandomList(n_elements: number): number[] {
  return Array.from({ length: 5 }, () => Math.random());
}

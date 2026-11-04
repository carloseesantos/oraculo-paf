import type { OracleMessage } from '../types/message.types';

export function pickRandomMessage(
  pool: readonly OracleMessage[],
  random: () => number = Math.random,
): OracleMessage | null {
  if (pool.length === 0) return null;
  const index = Math.min(Math.floor(random() * pool.length), pool.length - 1);
  return pool[index];
}

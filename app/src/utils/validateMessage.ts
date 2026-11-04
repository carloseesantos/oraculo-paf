import type { MessageTone, OracleMessage } from '../types/message.types';

// Duplicated from MESSAGE_TONES so this file has no runtime imports and can be
// executed directly by `node scripts/check-messages.ts`.
const ALLOWED_TONES: readonly string[] = ['poetica', 'mistica', 'humoristica'] satisfies MessageTone[];

export type RejectedMessage = {
  index: number;
  id: string | null;
  reason: string;
};

export type ValidationResult = {
  valid: OracleMessage[];
  rejected: RejectedMessage[];
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function isOptionalString(value: unknown): boolean {
  return value === undefined || typeof value === 'string';
}

export function getMessageProblem(value: unknown): string | null {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return 'registro não é um objeto';
  }
  const item = value as Record<string, unknown>;

  if (!isNonEmptyString(item.id)) return 'id ausente ou vazio';
  if (!isNonEmptyString(item.text)) return 'text ausente ou vazio';
  if (typeof item.tone !== 'string' || !ALLOWED_TONES.includes(item.tone)) {
    return 'tone ausente ou fora de poetica | mistica | humoristica';
  }
  if (!isNonEmptyString(item.category)) return 'category ausente ou vazia';
  if (!Array.isArray(item.tags) || !item.tags.every((tag) => typeof tag === 'string')) {
    return 'tags não é um array de strings';
  }
  if (typeof item.shareable !== 'boolean') return 'shareable não é boolean';
  if (!isOptionalString(item.author) || !isOptionalString(item.createdAt) || !isOptionalString(item.version)) {
    return 'campo opcional com tipo inválido';
  }
  return null;
}

export function isOracleMessage(value: unknown): value is OracleMessage {
  return getMessageProblem(value) === null;
}

/**
 * Keeps only schema-valid messages. When an id repeats, the first valid
 * occurrence is kept and later ones are rejected.
 */
export function validateMessages(raw: unknown): ValidationResult {
  if (!Array.isArray(raw)) {
    return { valid: [], rejected: [{ index: -1, id: null, reason: 'conteúdo não é um array' }] };
  }

  const valid: OracleMessage[] = [];
  const rejected: RejectedMessage[] = [];
  const seenIds = new Set<string>();

  raw.forEach((item: unknown, index) => {
    const rawId = (item as { id?: unknown } | null)?.id;
    const id = typeof rawId === 'string' ? rawId : null;
    const problem = getMessageProblem(item);

    if (problem) {
      rejected.push({ index, id, reason: problem });
      return;
    }
    const message = item as OracleMessage;
    if (seenIds.has(message.id)) {
      rejected.push({ index, id, reason: 'id duplicado' });
      return;
    }
    seenIds.add(message.id);
    valid.push(message);
  });

  return { valid, rejected };
}

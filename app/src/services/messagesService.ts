import rawMessages from '../data/messages.json';
import type { OracleMessage } from '../types/message.types';
import { validateMessages, type RejectedMessage } from '../utils/validateMessage';

export type MessagesPool = {
  messages: readonly OracleMessage[];
  rejected: readonly RejectedMessage[];
};

let cachedPool: MessagesPool | null = null;

export function buildMessagesPool(raw: unknown): MessagesPool {
  const { valid, rejected } = validateMessages(raw);

  if (__DEV__ && rejected.length > 0) {
    console.warn(`[messagesService] ${rejected.length} registro(s) fora do pool:`, rejected);
  }
  if (__DEV__ && valid.length === 0) {
    console.error('[messagesService] Pool de mensagens vazio: nenhuma mensagem válida em messages.json.');
  }

  return { messages: valid, rejected };
}

export function getMessagesPool(): MessagesPool {
  if (!cachedPool) {
    cachedPool = buildMessagesPool(rawMessages);
  }
  return cachedPool;
}

export function getMessages(): readonly OracleMessage[] {
  return getMessagesPool().messages;
}

export function getMessageById(id: string): OracleMessage | undefined {
  return getMessages().find((message) => message.id === id);
}

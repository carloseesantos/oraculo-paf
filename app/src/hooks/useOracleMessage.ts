import { useCallback, useMemo, useState } from 'react';

import { getMessages } from '../services/messagesService';
import type { OracleMessage } from '../types/message.types';
import { pickRandomMessage } from '../utils/randomMessage';

export type OracleStatus = 'ready' | 'unavailable';

export function useOracleMessage() {
  const pool = useMemo(() => getMessages(), []);
  const [currentMessage, setCurrentMessage] = useState<OracleMessage | null>(null);

  const status: OracleStatus = pool.length > 0 ? 'ready' : 'unavailable';

  const consult = useCallback(() => {
    const next = pickRandomMessage(pool);
    if (next) setCurrentMessage(next);
  }, [pool]);

  return { status, currentMessage, consult };
}

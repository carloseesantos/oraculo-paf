export const MESSAGE_TONES = ['poetica', 'mistica', 'humoristica'] as const;

export type MessageTone = (typeof MESSAGE_TONES)[number];

export type OracleMessage = {
  id: string;
  text: string;
  tone: MessageTone;
  category: string;
  tags: string[];
  shareable: boolean;
  author?: string;
  createdAt?: string;
  version?: string;
};

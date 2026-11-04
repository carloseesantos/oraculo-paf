// Proposed defaults from docs/UX_UI_Especificacao_Minima.md §4 — pending human approval.
export const colors = {
  background: '#111827',
  onBackground: '#F9FAFB',
  muted: '#CBD5E1',
  primary: '#5B3CC4',
  onPrimary: '#FFFFFF',
  card: '#F9FAFB',
  onCard: '#111827',
  outline: '#CBD5E1',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const radius = {
  button: 12,
  card: 16,
} as const;

export const sizes = {
  minTouchTarget: 48,
  primaryButtonHeight: 52,
  cardMaxWidth: 360,
} as const;

export const type = {
  title: { fontSize: 24, lineHeight: 30, fontWeight: '600' },
  body: { fontSize: 16, lineHeight: 24, fontWeight: '400' },
  cardMessage: { fontSize: 26, lineHeight: 36, fontWeight: '400' },
  cardBrand: { fontSize: 12, lineHeight: 16, fontWeight: '600' },
  button: { fontSize: 16, lineHeight: 22, fontWeight: '600' },
} as const;

export const theme = { colors, spacing, radius, sizes, type } as const;

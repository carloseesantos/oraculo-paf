# ADR-004 — Histórico local limitado às últimas 10 mensagens

## Status

Aprovada.

## Data

2026-07-30

## Contexto

O ORÁCULO PAF terá uma experiência de consulta de mensagens.

Permitir que o usuário revisite mensagens recentes pode melhorar a experiência, mas histórico pode facilmente puxar novas funcionalidades, como favoritos, coleção, perfil, sincronização, filtros e nuvem.

Essas funcionalidades não fazem parte do MVP.

## Decisão

Implementar histórico local limitado às últimas 10 mensagens consultadas.

O histórico será salvo apenas no dispositivo.

Estratégia sugerida:

- usar armazenamento local;
- manter no máximo 10 registros;
- ordenar do mais recente para o mais antigo;
- remover o item mais antigo ao ultrapassar o limite;
- não sincronizar com nuvem;
- não exigir login.

## Justificativa

O histórico local entrega continuidade mínima sem comprometer a simplicidade do MVP.

O limite de 10 mensagens evita que o histórico vire uma funcionalidade central ou social.

## Consequências positivas

- melhora experiência sem login;
- mantém funcionamento offline;
- reduz escopo;
- evita backend;
- evita sincronização;
- é simples de testar.

## Consequências negativas

- histórico será perdido se o app for desinstalado;
- não haverá sincronização entre dispositivos;
- não haverá recuperação em nuvem;
- usuário não terá favoritos persistentes fora do dispositivo.

## Mitigações

- comunicar visualmente apenas como histórico recente;
- não tratar histórico como coleção;
- não adicionar favoritos no MVP;
- manter histórico como apoio, não como fluxo principal.

## Alternativas consideradas

### Histórico em nuvem

Descartado por exigir login, backend e sincronização.

### Favoritos locais

Movido para backlog futuro.

### Histórico ilimitado

Descartado para evitar complexidade e perda de foco.

## Relação com documentos

- `docs/PROJECT_CONTEXT.md`
- `docs/BACKLOG.md`
- `docs/ARCHITECTURE.md`
- `docs/RISKS.md`
- `docs/DECISIONS.md`

## Observação

O histórico existe para apoiar a experiência, não para transformar o MVP em uma plataforma de coleção de mensagens.

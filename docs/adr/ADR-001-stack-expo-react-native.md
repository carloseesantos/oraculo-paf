# ADR-001 — Stack Expo, React Native e TypeScript

## Status

Aprovada.

## Data

2026-07-30

## Contexto

O ORÁCULO PAF será um MVP mobile de experiência rápida, visual e compartilhável.

O produto precisa permitir:

- tela principal simples;
- consulta de mensagem;
- card visual;
- compartilhamento;
- histórico local;
- build interna para teste em dispositivo real.

A stack precisa favorecer velocidade de desenvolvimento, simplicidade e evolução futura sem exigir infraestrutura complexa.

## Decisão

Usar:

- Expo;
- React Native;
- TypeScript;
- EAS Build para build interna.

## Justificativa

Expo e React Native permitem criar rapidamente um app mobile com uma base única.

TypeScript ajuda a manter contratos claros para mensagens, histórico, services e componentes.

EAS Build permite preparar build interna para teste em dispositivo real, alinhado ao objetivo do MVP.

## Consequências positivas

- acelera início do desenvolvimento;
- permite foco em experiência mobile;
- reduz setup nativo inicial;
- facilita teste em Android real;
- mantém código tipado;
- permite evolução futura.

## Consequências negativas

- algumas integrações nativas podem exigir cuidado;
- compartilhamento/captura de card precisa ser validado cedo;
- dependências Expo-compatible devem ser escolhidas com atenção.

## Alternativas consideradas

### React Native CLI

Descartada para o MVP por exigir mais setup nativo e aumentar custo inicial de configuração.

### Flutter

Descartada porque o projeto seguirá a trilha Expo/React Native já alinhada à arquitetura proposta.

### App web/PWA

Descartada porque o objetivo é validar experiência mobile instalável e compartilhamento nativo.

## Relação com documentos

- `docs/PROJECT_CONTEXT.md`
- `docs/BACKLOG.md`
- `docs/ARCHITECTURE.md`
- `docs/DECISIONS.md`

## Observação

A stack não deve justificar inclusão de backend, login ou arquitetura complexa no MVP.
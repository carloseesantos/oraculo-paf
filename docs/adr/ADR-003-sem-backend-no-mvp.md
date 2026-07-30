# ADR-003 — Sem backend no MVP

## Status

Aprovada.

## Data

2026-07-30

## Contexto

O ORÁCULO PAF poderia evoluir futuramente para uma arquitetura com backend, Supabase, painel de conteúdo, analytics, autenticação e atualização remota.

Porém, o MVP precisa validar uma hipótese menor:

> Usuários irão se identificar com mensagens rápidas a ponto de compartilhar o card gerado.

Essa hipótese pode ser validada sem backend.

## Decisão

O MVP será client-only.

Não serão implementados no MVP:

- backend;
- Supabase;
- API remota;
- banco de dados remoto;
- autenticação;
- painel administrativo;
- atualização remota de conteúdo;
- analytics avançado.

## Justificativa

Backend no MVP adicionaria:

- custo;
- tempo de implementação;
- infraestrutura;
- deploy;
- dependência de rede;
- segurança;
- autenticação ou gestão de chaves;
- mais pontos de falha.

Nada disso é necessário para validar o fluxo principal:

```text
Abrir app → Consultar → Ver card → Compartilhar
````

## Consequências positivas

* reduz complexidade;
* acelera entrega;
* permite funcionamento offline;
* diminui riscos técnicos iniciais;
* preserva foco nas histórias Must;
* evita desvio para arquitetura prematura.

## Consequências negativas

* sem atualização remota de mensagens;
* sem métricas automáticas avançadas;
* sem sincronização entre dispositivos;
* sem painel de conteúdo;
* feedback inicial será manual.

## Mitigações

* registrar backend no backlog futuro;
* usar feedback manual no teste interno;
* versionar mensagens no Git;
* manter estrutura que permita futura troca de fonte de dados.

## Alternativas consideradas

### Supabase desde o início

Descartado no MVP. Pode ser avaliado após validação inicial.

### API simples apenas para conteúdo

Descartada porque ainda criaria dependência de infraestrutura.

### Analytics remoto no MVP

Descartado. Métricas iniciais podem ser qualitativas e manuais.

## Relação com documentos

* `docs/PROJECT_CONTEXT.md`
* `docs/BACKLOG.md`
* `docs/ARCHITECTURE.md`
* `docs/DECISIONS.md`
* `docs/RISKS.md`

## Observação

A ausência de backend é uma decisão de foco, não uma limitação definitiva do produto.
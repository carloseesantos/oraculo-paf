# ADR-002 — Uso de JSON local para mensagens no MVP

## Status

Aprovada.

## Data

2026-07-30

## Contexto

O ORÁCULO PAF depende de uma base de mensagens poéticas, místicas e humorísticas.

No MVP, a hipótese principal é validar se o usuário se identifica com uma mensagem rápida a ponto de compartilhar o card gerado.

Essa validação não exige conteúdo remoto, painel administrativo ou atualização dinâmica.

## Decisão

Armazenar a base inicial de mensagens em um arquivo JSON local versionado no repositório.

Arquivo sugerido:

```text
app/src/data/messages.json
````

Schema mínimo sugerido:

```json
{
  "id": "msg-001",
  "text": "O universo cochicha, mas só quem respira devagar consegue ouvir.",
  "tone": "mistica",
  "category": "oraculo",
  "tags": ["universo", "intuição", "calma"],
  "shareable": true
}
```

## Justificativa

JSON local permite:

* funcionamento offline;
* simplicidade técnica;
* ausência de backend;
* curadoria manual;
* versionamento no Git;
* separação entre conteúdo e interface;
* validação rápida da hipótese principal.

## Consequências positivas

* reduz dependências;
* acelera implementação;
* simplifica testes;
* elimina latência de rede;
* permite foco no card e no compartilhamento;
* mantém o MVP controlado.

## Consequências negativas

* alterações de conteúdo exigem nova versão do app;
* não há atualização remota de mensagens;
* não há personalização dinâmica;
* exige cuidado com schema e curadoria.

## Mitigações

* criar schema mínimo;
* validar campos obrigatórios;
* evitar mensagens longas;
* garantir IDs únicos;
* usar Storyteller Agent para gerar e classificar mensagens;
* revisar conteúdo antes da build interna.

## Alternativas consideradas

### Backend para mensagens

Descartado no MVP porque adiciona infraestrutura sem ser necessário para validar a hipótese.

### Supabase

Mantido como possibilidade futura, mas fora do MVP.

### IA generativa em runtime

Descartada no MVP por adicionar custo, latência, dependência de API e risco de moderação.

## Relação com documentos

* `docs/PROJECT_CONTEXT.md`
* `docs/BACKLOG.md`
* `docs/ARCHITECTURE.md`
* `docs/RISKS.md`
* `docs/DECISIONS.md`

## Observação

O uso de JSON local não impede evolução futura para backend. Apenas protege a primeira validação.

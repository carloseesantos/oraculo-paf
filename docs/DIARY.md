# DIARY.md

# ORÁCULO PAF — Diário de Bordo

## Objetivo deste documento

Registrar a evolução do projeto ORÁCULO PAF de forma simples, objetiva e útil.

Este diário não deve virar burocracia.
Ele serve para manter rastreabilidade entre decisões, agentes executados, artefatos criados e próximos passos.

---

# Linha do tempo do projeto

## Etapa 0 — Definição da série

**Status:** concluído

O projeto ORÁCULO PAF foi escolhido como produto real da série “Do Zero ao Produto”, publicada na newsletter Papo de Gerente.

A proposta da série é construir um app real com apoio de IA em várias etapas do processo, mostrando decisões, prompts, artefatos, código, erros, ajustes e aprendizados.

**Artefatos relacionados:**

* EP.00 — apresentação da série
* roadmap editorial da série
* definição inicial do ORÁCULO PAF como produto principal

**Decisão relevante:**

O projeto não será apenas conteúdo editorial.
Ele deverá gerar um produto funcional ao final da série.

---

## Etapa 1 — Discovery e definição do problema

**Status:** concluído

Foi definido que o ORÁCULO PAF será um micro-app mobile de experiência rápida, emocional e compartilhável.

A hipótese principal do MVP foi estabelecida:

> Usuários irão se identificar com mensagens rápidas, poéticas, místicas ou humorísticas a ponto de querer compartilhar o card gerado em redes sociais ou aplicativos de mensagem.

**Artefatos relacionados:**

* EP.01 — O problema antes do código

**Decisões relevantes:**

* O MVP deverá ser simples.
* A experiência deve ter baixo atrito.
* O usuário não precisará de login.
* O app não terá backend no MVP.
* O foco inicial será validar identificação e compartilhamento.

---

## Etapa 2 — Sprint 0

**Status:** concluído

A Sprint 0 organizou as decisões iniciais de produto e tecnologia antes da implementação.

Foram discutidos:

* stack inicial;
* escopo do MVP;
* riscos técnicos;
* critérios de pronto;
* estrutura inicial de repositório;
* limites claros para evitar aumento de escopo.

**Artefatos relacionados:**

* EP.02 — Sprint 0 com IA
* definição inicial de stack
* critérios iniciais de pronto
* riscos técnicos iniciais

**Decisões relevantes:**

* Usar Expo / React Native / TypeScript.
* Usar JSON local no MVP.
* Não usar backend no MVP.
* Não usar IA generativa em tempo real dentro do app.
* Priorizar geração e compartilhamento de card.
* Limitar histórico local às últimas 10 mensagens.

---

## Etapa 3 — Criação do contexto do projeto

**Status:** concluído

Foi criado o documento central de contexto do projeto.

**Artefato criado:**

* `docs/PROJECT_CONTEXT.md`

**Objetivo do artefato:**

Consolidar a visão do produto, hipótese principal, escopo do MVP, fora do escopo, decisões técnicas, riscos, critérios de pronto e princípios de decisão.

**Decisão relevante:**

Todos os agentes IA devem considerar `docs/PROJECT_CONTEXT.md` antes de gerar recomendações, backlog, arquitetura, código ou documentação.

---

## Etapa 4 — Definição dos agentes IA

**Status:** concluído

Foi criado o documento oficial de agentes do projeto.

**Artefato criado:**

* `docs/AGENTS.md`

**Agentes definidos:**

* Product Owner Agent
* Software Architect Agent
* Frontend Mobile Agent
* UX/UI Agent
* QA Agent
* Storyteller Agent
* PMO / Project Manager Agent
* DevOps / Build Agent

**Decisão relevante:**

O projeto utilizará agentes especializados, e não um único chat genérico para todas as tarefas.

---

## Etapa 5 — Execução do Product Owner Agent

**Status:** concluído

O Product Owner Agent foi executado para transformar a visão do produto em backlog inicial.

**Artefato criado:**

* `docs/BACKLOG.md`

**Observação importante:**

Foram comparadas duas saídas:

* uma gerada aqui no ChatGPT;
* outra gerada no Cursor.

A versão final consolidou:

* a profundidade de produto da saída do ChatGPT;
* a objetividade operacional da saída do Cursor.

**Decisão relevante:**

O backlog oficial adotou uma estrutura enxuta, com foco em MVP, épicos claros, user stories priorizadas, riscos de escopo e backlog futuro.

---

## Etapa 6 — Execução do PMO / Project Manager Agent

**Status:** em andamento

O PMO Agent foi acionado para organizar a execução inicial do MVP com rastreabilidade simples.

**Artefatos criados nesta etapa:**

* `docs/DIARY.md`
* `docs/DECISIONS.md`
* `docs/RISKS.md`

**Objetivo da etapa:**

Criar uma base leve de acompanhamento para registrar:

* linha do tempo;
* decisões tomadas;
* riscos ativos;
* próximos passos;
* rastreabilidade entre agentes, artefatos e execução.

---

# Agentes executados até agora

## Product Owner Agent

**Status:** executado

**Objetivo:**
Criar o backlog inicial do MVP.

**Saída gerada:**
`docs/BACKLOG.md`

**Resultado:**
Backlog consolidado com épicos, user stories, prioridades, critérios de aceite, riscos de escopo e backlog futuro.

---

## PMO / Project Manager Agent

**Status:** executado

**Objetivo:**
Organizar rastreabilidade inicial do projeto.

**Saídas geradas:**

* `docs/DIARY.md`
* `docs/DECISIONS.md`
* `docs/RISKS.md`

**Resultado:**
Projeto passa a ter histórico, decisões e riscos registrados de forma simples.

---

# Artefatos criados até agora

| Artefato                  | Status | Objetivo                                 |
| ------------------------- | ------ | ---------------------------------------- |
| `docs/PROJECT_CONTEXT.md` | Criado | Documento central de contexto do projeto |
| `docs/AGENTS.md`          | Criado | Definição oficial dos agentes IA         |
| `docs/BACKLOG.md`         | Criado | Backlog inicial consolidado do MVP       |
| `docs/DIARY.md`           | Criado | Diário de bordo do projeto               |
| `docs/DECISIONS.md`       | Criado | Registro de decisões tomadas             |
| `docs/RISKS.md`           | Criado | Registro de riscos atuais                |

---

# Decisões relevantes até agora

* O ORÁCULO PAF será um MVP mobile simples.
* A hipótese principal é validar identificação e compartilhamento.
* O MVP não terá login.
* O MVP não terá backend.
* O MVP não terá IA generativa em tempo real.
* O conteúdo inicial será local, em JSON.
* O histórico será local e limitado às últimas 10 mensagens.
* A stack inicial será Expo, React Native e TypeScript.
* O compartilhamento do card é parte central da validação.
* O projeto usará agentes IA especializados.
* ChatGPT será usado preferencialmente para estratégia, produto, PMO, documentação e conteúdo.
* Cursor será usado preferencialmente para arquitetura, implementação, QA técnico e build.
* O backlog oficial será a versão consolidada entre ChatGPT e Cursor.

---

# Próximos passos recomendados

## Próximo agente

Executar o **Software Architect Agent**.

## Objetivo

Gerar o documento:

* `docs/ARCHITECTURE.md`

## O arquiteto deve considerar

* `docs/PROJECT_CONTEXT.md`
* `docs/AGENTS.md`
* `docs/BACKLOG.md`
* `docs/DECISIONS.md`
* `docs/RISKS.md`

## Saída esperada

* arquitetura inicial;
* estrutura técnica;
* organização de pastas;
* decisões de stack;
* estratégia para JSON local;
* estratégia para histórico local;
* estratégia para compartilhamento de card;
* riscos técnicos;
* possíveis ADRs.

---

# Próximos artefatos sugeridos

Após `ARCHITECTURE.md`, considerar criar:

* `docs/adr/ADR-001-stack-expo-react-native.md`
* `docs/adr/ADR-002-json-local-no-mvp.md`
* `docs/adr/ADR-003-sem-backend-no-mvp.md`
* `docs/QA_CHECKLIST.md`
* `app/src/data/messages.json`

---

---

## 2026-07-30 — Execução do Software Architect Agent

Objetivo:
Criar o documento inicial de arquitetura do MVP (`docs/ARCHITECTURE.md`).


Saída gerada:

- `docs/ARCHITECTURE.md`

Resumo da saída:

O Software Architect Agent consolidou uma arquitetura inicial client-only para o MVP do ORÁCULO PAF, baseada em:

- Expo;
- React Native;
- TypeScript;
- JSON local;
- armazenamento local para histórico;
- compartilhamento nativo;
- EAS Build para teste interno.

Decisão tomada:

A arquitetura inicial do MVP foi confirmada como simples, mobile-first e client-only.

O app continuará sem backend, sem login, sem Supabase e sem IA generativa em tempo real no runtime.

Principais pontos definidos:

- estrutura inicial de pastas em `app/src`;
- schema inicial de mensagens;
- estratégia para JSON local;
- estratégia para histórico local limitado a 10 mensagens;
- estratégia de compartilhamento de card com fallback para texto;
- dependências essenciais e dependências a evitar;
- riscos técnicos arquiteturais;
- ADRs iniciais sugeridos.

Impacto no projeto:

O risco de iniciar implementação sem arquitetura mínima foi parcialmente mitigado.

Próximo passo:

1. Criar ADRs iniciais em `docs/adr/`.
2. Executar UX/UI Agent para definir fluxo e hierarquia visual mínima.
3. Executar Storyteller Agent para gerar a base inicial de mensagens.
4. Depois executar Frontend Mobile Agent para iniciar scaffold e implementação.

---

# Status atual da jornada

✅ Problema definido
✅ Hipótese principal definida
✅ MVP delimitado
✅ Fora do escopo registrado
✅ Stack inicial escolhida
✅ Agentes IA definidos
✅ Backlog inicial consolidado
✅ Diário de bordo iniciado
✅ Decisões registradas
✅ Riscos iniciais registrados
✅ Arquitetura inicial do MVP (`docs/ARCHITECTURE.md`)
⏳ Próximo passo: criar ADRs iniciais e preparar UX/UI Agent + Storyteller Agent

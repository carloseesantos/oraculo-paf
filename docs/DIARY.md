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

## 2026-08-25 — Execução do QA Agent

Objetivo:
Revisar as histórias Must do backlog atualizado e transformar critérios de aceite em cenários testáveis + checklist de QA.

Saída gerada:

- `docs/QA_CHECKLIST.md`

Resumo da saída:

O QA Agent concluiu que o backlog Must é testável para teste interno manual em Android real, com lacunas principais em critérios subjetivos de UX/conteúdo e na persistência (US-09 Must) sem UI de histórico (US-10 Should).

Cobertura Must: US-01, US-02, US-04, US-05, US-06, US-07, US-09, US-12, US-13.

Incluiu: cenários positivos/negativos/edge, riscos de qualidade, heurísticas operacionais para critérios ambíguos, checklist go/no-go e recomendações de ajuste de aceite ao PO (sem ampliar escopo).

Decisão tomada:

`docs/QA_CHECKLIST.md` passa a ser o checklist oficial mínimo para validar build interna (US-13). Should/Could não bloqueiam go/no-go. Share em Android real permanece prioridade #1 de teste.

Próximo passo:

1. PO revisar ajustes sugeridos de critérios (seção 8 do QA_CHECKLIST).
2. Storyteller Agent gerar JSON inicial (US-05).
3. PMO detalhar tarefas de implementação.
4. Não iniciar Frontend sem alinhar evidência mínima de US-09 (storage/debug ou US-10).

---

## 2026-08-27 — Execução do Software Architect Agent

Objetivo:
Mapear histórias Must e tarefas de `docs/TASKS.md` para estrutura técnica inicial (`docs/IMPLEMENTATION_MAP.md`).

Saída gerada:

- `docs/IMPLEMENTATION_MAP.md`

Resumo da saída:

Mapa User Story → componentes/screens/services/hooks/types/arquivos; Task → arquivos; cadeia técnica JSON → consulta → card → share → histórico → build; riscos por US ligados a `RISKS.md` e QA; instruções objetivas para o Frontend Mobile Agent; lista de ajustes recomendados em docs (sem alteração automática).

Decisão tomada:

Projeto pronto para scaffold Frontend. Sem bloqueio técnico de arquitetura. `HistoryScreen` fora do Must inicial. Share em Android permanece spike precoce. Primeira tarefa de código: scaffold Expo + `messagesService`.

Próximo passo:

1. Storyteller: `messages.json` (≥5 por tom).
2. Frontend: scaffold + cadeia Must.
3. UX: composição mínima Home/card em paralelo.
4. PMO/QA: fechar evidência US-09.

---

## 2026-11-03 — EP.05: do backlog à execução (consolidação v5.0)

### Contexto

**Objetivo da rodada:** sair do planejamento e chegar à primeira implementação técnica, colocando quatro agentes especializados para trabalhar a partir do backlog, do mapa técnico e dos ADRs.

**Estado de entrada (v4.5):** planejamento completo (backlog revisado, tarefas, arquitetura, ADR-001 a ADR-005, mapa de implementação, checklist de QA). Não existia scaffold em `app/`, nem base curada de mensagens, especificação visual ou método de evidência da US-09.

**Agentes envolvidos:** Storyteller, UX/UI, QA e Frontend Mobile (Cursor). O PMO / Project Manager Agent auditou e consolidou os resultados.

### Execução

- **Storyteller Agent** — produziu 18 mensagens originais, seis por tom (poética, mística, humorística), no schema de `ARCHITECTURE.md`. O JSON passou por validação estrutural programática (contagem, formato, unicidade). O agente sinalizou quatro mensagens para atenção editorial. A data exata da execução não está registrada nos artefatos; o arquivo entrou no Git em 03/11/2026 (commit `ea9f2bc`).
- **Aprovação humana** — em 03/11/2026, o responsável pelo produto revisou e aprovou as 18 mensagens, incluindo as quatro sinalizadas, sem substituições (DEC-018). A curadoria editorial da base atual está concluída.
- **UX/UI Agent** — entregou `docs/UX_UI_Especificacao_Minima.md`: três estados da Home (inicial, mensagem, falha segura), um único `MessageCard` 4:5 com área capturável sem botões, Compartilhar fora da captura, tokens mínimos com contrastes calculados e orientações de acessibilidade. Defaults propostos, pendentes de aprovação humana.
- **QA Agent** — entregou `docs/QA_US09_Estrategia_Evidencia_EP05.md`: método de evidência da US-09 com AsyncStorage real em desenvolvimento, fixtures determinísticas e dez casos (US09-QA01…QA10), todos NOT RUN. Identificou que o histórico registra **eventos de consulta**, não mensagens únicas.
- **Frontend Mobile Agent (Cursor)** — gerou o template `blank-typescript` fora do repositório e copiou para `app/` sem `.git` aninhado, sem `LICENSE` e sem o `AGENTS.md` do template (que impunha Expo Router). Implementou tipos, validação, `messagesService`, sorteio, `useOracleMessage`, `HomeScreen` com três estados, `ConsultButton`, `MessageCard` e `theme.ts` com os tokens propostos. Adicionou apenas `react-native-safe-area-context`. Não implementou US-07, US-09 nem US-13. Commit `353b898`.
- **PMO** — confrontou os relatos com o repositório local, reexecutou as verificações estáticas, atualizou `TASKS.md`, `DECISIONS.md`, `RISKS.md`, `QA_CHECKLIST.md`, `ARCHITECTURE.md`, `IMPLEMENTATION_MAP.md` e `README.md`, criou `docs/EP05_EXECUTION_REPORT.md` e promoveu `app.version` para 5.0.

**Verificações reproduzidas pelo PMO:** `npm run typecheck` (exit 0), `npm run check:messages` (17/17), `npx expo-doctor` (20/20), `npx expo install --check` (dependências atualizadas), export Android em diretório temporário (634 módulos). Metro servindo o bundle de desenvolvimento (HTTP 200) foi relatado pelo Frontend e não reexecutado.

### Problemas encontrados

- O gerador anunciou template SDK 57 e instalou SDK 58. O SDK 58 foi mantido (DEC-019); a compatibilidade com o Expo Go do Android físico não foi verificada (RISK-014).
- `npm audit`: 5 vulnerabilidades moderadas no tooling do Expo. A correção `--force` instalaria `expo@53.0.11` e foi recusada (RISK-015).
- Não havia `adb`, emulador nem Android físico disponível: a interface nunca foi vista rodando (RISK-016).
- Pendentes de decisão humana: aprovação da identidade visual (DEC-024) e da política de IDs duplicados (DEC-021).
- Divergência documental corrigida: o cenário US09-P02 exigia "10 mensagens distintas (IDs)"; o requisito é de dez eventos de consulta.

### Aprendizados

- Planejar, implementar e validar são estados diferentes. O EP.05 entregou código e verificação estática, não validação em execução.
- A curadoria humana funcionou como portão antes da integração: o Storyteller entregou um arquivo tecnicamente verificável, e a aprovação do responsável pelo produto concluiu a curadoria.
- Avaliações estáticas (typecheck, scripts, bundle) não detectam problemas de layout, toque ou compatibilidade com o aparelho.
- A rastreabilidade entre agentes permitiu identificar a divergência SDK 57/58 e a regra de eventos da US-09 antes que virassem retrabalho.

### Decisão tomada

Consolidar o EP.05 na versão documental 5.0 (DEC-025), sem declarar MVP concluído nem validação em Android.

### Próximo passo

1. Abrir o app em emulador, Expo Go ou build de desenvolvimento e executar os cenários iniciais de US-01/US-02.
2. Spike de compartilhamento (US-07) em Android físico.
3. Implementar o histórico (US-09) e executar US09-QA01…QA10.

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
✅ Checklist de QA Must (`docs/QA_CHECKLIST.md`)
✅ Mapa de implementação (`docs/IMPLEMENTATION_MAP.md`)
✅ Base de 18 mensagens aprovada pelo responsável pelo produto (EP.05)
✅ Especificação UX/UI mínima (`docs/UX_UI_Especificacao_Minima.md`) — pendente de aprovação humana
✅ Estratégia de evidência da US-09 (`docs/QA_US09_Estrategia_Evidencia_EP05.md`) — casos NOT RUN
✅ Scaffold Expo SDK 58 + primeira fatia Must (consulta offline na Home) — apenas verificação estática
✅ Consolidação EP.05 e versão documental 5.0 (`docs/EP05_EXECUTION_REPORT.md`)
⏳ Próximo passo (EP.06): primeira execução observada do app, spike de compartilhamento em Android e histórico local

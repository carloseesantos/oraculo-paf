# ORÁCULO PAF

Repositório do **ORÁCULO PAF**, um micro-app mobile de experiência rápida, emocional e compartilhável.

Este projeto faz parte da série **Do Zero ao Produto**, da newsletter **Papo de Gerente**. A série documenta a construção real de um produto com apoio de agentes de IA na gestão, produto, arquitetura, desenvolvimento, QA e aprendizado. Documentação, implementação e validação são etapas diferentes: nenhuma funcionalidade é considerada pronta apenas porque foi planejada.

---

## Visão do produto e hipótese do MVP

O usuário abre o aplicativo, toca em **Consultar**, recebe uma mensagem poética, mística ou humorística, visualiza um card e pode compartilhá-lo.

```text
Abrir app → Consultar → Mensagem → Card → Compartilhar
                              ↓
                    Persistir histórico local
```

**Hipótese principal:** usuários irão se identificar com mensagens rápidas, poéticas, místicas ou humorísticas a ponto de querer compartilhar o card gerado.

O MVP busca testar a experiência central com o menor atrito possível, e não criar uma plataforma completa.

---

## Escopo e prioridades

### Must

- US-01 — Tela principal clara.
- US-02 — Consultar mensagem aleatória.
- US-04 — JSON local com tons.
- US-05 — Mensagens curtas, legíveis e compartilháveis.
- US-06 — Card visual da mensagem.
- US-07 — Compartilhar o card (imagem preferencial; fallback em texto).
- US-09 — Persistir últimas 10 consultas localmente.
- US-12 — Identidade visual mínima e consistente.
- US-13 — Build interna para teste.

### Should / Could

- **Should:** US-03 (evitar repetição consecutiva), US-10 (visualizar histórico), US-11 (compartilhar a partir do histórico, somente se reutilizar o fluxo existente).
- **Could:** US-08 (microinteração ao consultar).

**Regra de escopo:** US-09 é Must; US-10 não é. A persistência pode ser comprovada tecnicamente sem criar uma tela de histórico.

### Fora do MVP

Login, cadastro, perfil de usuário, backend, Supabase, sincronização em nuvem, IA generativa em runtime, ranking, comentários, curtidas, seguidores, rede social, notificações push, monetização, analytics avançado, gamificação pesada e personalização avançada.

Nenhum item fora do escopo deve entrar sem decisão explícita.

---

## Stack e arquitetura aprovadas

- **Expo + React Native + TypeScript** para o aplicativo mobile.
- **JSON local** como fonte das mensagens; três tons: `poetica`, `mistica`, `humoristica`.
- **AsyncStorage** para persistência local das últimas 10 consultas.
- **Compartilhamento nativo**, priorizando a imagem do card e mantendo fallback em texto.
- **EAS Build** para distribuição interna e teste em dispositivo Android físico.

O MVP é **client-only**: não há backend, login ou geração de mensagens por IA no aplicativo. A IA atua no processo de construção, não no runtime.

O contrato de dados, as responsabilidades dos services/hooks e as dependências técnicas estão em `docs/ARCHITECTURE.md` e `docs/IMPLEMENTATION_MAP.md`.

---

## Marco EP.05 — Versão 5.0

> **A versão 5.0 é o fechamento auditável do EP.05, não o término do desenvolvimento.** O MVP não está concluído, não há release publicado e nenhuma funcionalidade foi validada em Android físico ou observada em execução.

- **Episódio:** EP.05 — Do backlog à execução: colocando nosso time de agentes IA para trabalhar.
- **Data de consolidação:** 03/11/2026 (versão de entrada 4.5).
- **Relatório completo:** `docs/EP05_EXECUTION_REPORT.md`.

### Stack efetivamente utilizada

Expo SDK 58 (`expo@58.0.23`), React Native 0.88.1, React 19.3.0, TypeScript 6.0.3 (modo estrito), `react-native-safe-area-context` 5.11.1 e `expo-status-bar`. Sem Expo Router nem React Navigation: uma única Home. AsyncStorage, `expo-sharing`, biblioteca de captura e EAS ainda **não** estão instalados/configurados.

### Entregáveis produzidos

| Agente | Entregável | Situação |
|---|---|---|
| Storyteller | `app/src/data/messages.json` — 18 mensagens, 6 por tom | **Curadoria editorial aprovada** pelo responsável pelo produto (18/18, incluindo 4 inicialmente sinalizadas) e integrada |
| UX/UI | `docs/UX_UI_Especificacao_Minima.md` | Especificação concluída; identidade visual pendente de aprovação |
| QA | `docs/QA_US09_Estrategia_Evidencia_EP05.md` | Método de evidência da US-09 definido; 10 casos NOT RUN |
| Frontend Mobile | Scaffold `app/` + primeira fatia Must | Implementado; verificado apenas de forma estática |
| PMO | `docs/EP05_EXECUTION_REPORT.md` e atualização da documentação | Consolidado |

### Funcionalidades implementadas (código, sem validação em execução)

- **US-04** — JSON local tipado e validado; registros inválidos ficam fora do pool; pool vazio leva a um estado de falha segura.
- **US-05** — base de 18 mensagens aprovadas integrada sem alterações.
- **US-01** — Home única: título, subtítulo, botão Consultar e placeholder; sem login, onboarding ou navegação.
- **US-02** — consulta aleatória local, sem rede.
- **US-06 (parcial)** — `MessageCard` único e adaptável a fonte ampliada; ainda sem `ref` para captura.
- **US-12 (parcial)** — tokens visuais propostos aplicados em `theme.ts`.

**Não implementado:** US-07 (compartilhamento), US-09 (histórico local), US-13 (build EAS).

### Verificações técnicas executadas

Reproduzidas na consolidação, a partir de `app/`: `npm run typecheck` (exit 0), `npm run check:messages` (17/17), `npx expo-doctor` (20/20), `npx expo install --check` (dependências atualizadas) e export do bundle Android (634 módulos). O Frontend também relatou o Metro servindo o bundle de desenvolvimento (HTTP 200). Tudo isso é verificação estática ou de empacotamento.

### Testes ainda pendentes

Primeira execução do app (emulador, Expo Go ou build de desenvolvimento); cenários de UI de US-01, US-02, US-05, US-06 e US-12; casos US09-QA01…QA10; compartilhamento em Android físico; acessibilidade com fonte ampliada; seção 9 (go/no-go) do `docs/QA_CHECKLIST.md`.

### Riscos principais

- Interface nunca observada em execução (RISK-016).
- Compartilhamento, núcleo da hipótese, ainda sem código (RISK-009).
- Histórico ainda sem código; reentrância nas gravações assíncronas futuras (RISK-017).
- Compatibilidade do SDK 58 com o Expo Go do aparelho não verificada (RISK-014).
- 5 vulnerabilidades moderadas no tooling do Expo; a correção `--force` rebaixaria o SDK e não foi aplicada (RISK-015).
- Identidade visual pendente de aprovação (RISK-008) e legibilidade/captura com fonte ampliada (RISK-018).

### Próximos passos (EP.06)

1. Abrir o app e executar os cenários iniciais de US-01 e US-02, com registro de evidência.
2. Spike de compartilhamento (US-07) em Android físico, com fallback em texto.
3. Histórico local (US-09) e execução dos 10 casos de QA.
4. Decisões humanas: identidade visual e política de IDs duplicados.
5. `eas.json`, build interna e checklist go/no-go (US-13).

---

## Estrutura de arquivos existente

```text
oraculo-paf/
  README.md
  app.version                  # versão do repositório/série (5.0)
  docs/
    PROJECT_CONTEXT.md
    AGENTS.md
    BACKLOG.md
    BACKLOG_REVIEW.md
    QA_CHECKLIST.md
    QA_US09_Estrategia_Evidencia_EP05.md
    UX_UI_Especificacao_Minima.md
    TASKS.md
    ARCHITECTURE.md
    IMPLEMENTATION_MAP.md
    DECISIONS.md
    RISKS.md
    DIARY.md
    EP05_EXECUTION_REPORT.md
    adr/
      ADR-001-stack-expo-react-native.md
      ADR-002-json-local-no-mvp.md
      ADR-003-sem-backend-no-mvp.md
      ADR-004-historico-local-limitado.md
      ADR-005-compartilhamento-card.md
  app/                         # projeto Expo SDK 58 (versão técnica 1.0.0)
    .gitignore
    App.tsx
    index.ts
    app.json
    package.json
    package-lock.json
    tsconfig.json
    assets/                    # ícones e splash padrão do template
    scripts/
      check-messages.mjs
    src/
      components/
        ConsultButton.tsx
        MessageCard.tsx
      data/
        messages.json
      hooks/
        useOracleMessage.ts
      screens/
        HomeScreen.tsx
      services/
        messagesService.ts
      theme/
        theme.ts
      types/
        message.types.ts
      utils/
        randomMessage.ts
        validateMessage.ts
```

Ainda não existem: `app/eas.json`, `history.types.ts`, `historyService.ts`, `shareService.ts`, `useHistory.ts`, `ShareButton.tsx`. A existência de um arquivo não prova funcionalidade validada. `node_modules/` e `.expo/` são locais e ignorados pelo Git.

### Executar as verificações locais

```bash
cd app
npm ci
npm run typecheck
npm run check:messages   # requer Node >= 22.18
npx expo start
```

---

## Documentos e fontes de verdade

| Documento | Finalidade |
|---|---|
| `docs/PROJECT_CONTEXT.md` | Visão, hipótese, restrições e princípios |
| `docs/AGENTS.md` | Papéis, limites e orientações dos agentes |
| `docs/BACKLOG.md` | User stories, MoSCoW e critérios de aceite |
| `docs/BACKLOG_REVIEW.md` | Revisão crítica já realizada pelo PO |
| `docs/QA_CHECKLIST.md` | Cenários, riscos e checklist go/no-go |
| `docs/QA_US09_Estrategia_Evidencia_EP05.md` | Método de evidência da US-09 e casos US09-QA01…QA10 |
| `docs/UX_UI_Especificacao_Minima.md` | Estados da Home, card único e tokens visuais mínimos |
| `docs/TASKS.md` | Tarefas, dependências e acompanhamento da execução |
| `docs/ARCHITECTURE.md` | Arquitetura e contratos de dados |
| `docs/IMPLEMENTATION_MAP.md` | Mapeamento de histórias/tarefas para arquivos e ordem técnica |
| `docs/DECISIONS.md` | Decisões aprovadas |
| `docs/RISKS.md` | Riscos e mitigação |
| `docs/DIARY.md` | Histórico real de execução e aprendizados |
| `docs/EP05_EXECUTION_REPORT.md` | Relatório consolidado do EP.05 e handoff editorial |
| `docs/adr/` | ADR-001 a ADR-005, já existentes e aprovados |
| `app.version` | Versão do repositório e da série de episódios |

O conteúdo histórico de revisões e diários não deve ser reescrito para parecer que atividades futuras já aconteceram.

---

## Agentes e execução

| Agente | Responsabilidade |
|---|---|
| Product Owner | Escopo, valor, backlog e critérios de aceite |
| Software Architect | Arquitetura, contratos e decisões técnicas |
| Storyteller | Mensagens e curadoria de conteúdo |
| UX/UI | Home, card e legibilidade mínima |
| QA | Cenários, estratégia de evidência e testes |
| Frontend Mobile | Scaffold e implementação em Expo/React Native |
| PMO / Project Manager | Status, riscos, rastreabilidade e diário de bordo |
| DevOps / Build | Configuração e execução das builds internas |

ChatGPT e Cursor são ferramentas complementares. A seleção deve seguir a tarefa: análise/curadoria/gestão no ChatGPT; leitura e alteração efetiva de arquivos/código no Cursor, quando aplicável. Saídas de agentes devem ser revisadas antes da incorporação.

### Sequência operacional do EP.05 (executada em 03/11/2026)

1. **Storyteller:** gerou 18 mensagens (seis por tom) no schema existente; o responsável pelo produto aprovou todas.
2. **UX/UI:** definiu Home, card único e tokens visuais mínimos.
3. **QA:** escolheu o método de evidência técnica da US-09, sem tornar a US-10 obrigatória.
4. **Frontend Mobile:** executou `TASK-SCAFFOLD-01` no Cursor, integrou as mensagens aprovadas e implementou a consulta offline na Home.
5. **PMO:** auditou o repositório, reproduziu as verificações e consolidou status, decisões, riscos, diário e versão 5.0.

A ordem de implementação Must, os critérios de pronto e as dependências detalhadas continuam em `docs/TASKS.md` (status EP.05 na seção 18.1; sequência do EP.06 na seção 20) e `docs/IMPLEMENTATION_MAP.md`.

---

## Como trabalhar neste repositório

Antes da execução, leia os documentos aplicáveis ao papel, começando por:

```text
docs/PROJECT_CONTEXT.md
docs/AGENTS.md
docs/BACKLOG.md
docs/DECISIONS.md
docs/RISKS.md
```

Para implementação, leia também:

```text
docs/ARCHITECTURE.md
docs/IMPLEMENTATION_MAP.md
docs/TASKS.md
docs/QA_CHECKLIST.md
docs/adr/
```

Regras operacionais:

- Cada alteração deve estar vinculada a uma user story/tarefa ou a uma correção justificada.
- Registre comandos executados, resultados, erros e limitações sem inventar evidências.
- Diferencie **planejado**, **implementado**, **testado** e **validado em Android real**.
- Não acrescente recursos fora do MVP para resolver conveniências de implementação.
- Prefira uma entrega vertical pequena e demonstrável a várias camadas incompletas.
- Atualize o diário após a execução, não antecipadamente.

---

## Série editorial

A série **Do Zero ao Produto**, da newsletter **Papo de Gerente**, relata prompts, respostas, decisões, erros, código e validações reais. O EP.04 cobriu a transformação do backlog em critérios testáveis, tarefas e mapa técnico. O EP.05 registrou a passagem à execução: quatro agentes especializados transformaram o backlog em uma primeira implementação, e ficaram explícitas as decisões, riscos e validações que ainda exigem atuação humana. O EP.06 começa pela primeira execução observada do app e pelo compartilhamento em Android.

**Frase guia:** “Antes de acelerar com IA, organize o caminho.”

**Princípio central:** IA acelera. Mas, se o caminho estiver errado, ela só ajuda você a errar mais rápido.

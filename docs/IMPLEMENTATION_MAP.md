# IMPLEMENTATION_MAP.md

# ORÁCULO PAF — Mapa de implementação (MVP Must)

**Agente:** Software Architect Agent  
**Status:** pronto para orientar o Frontend Mobile Agent  
**Escopo:** histórias Must + tarefas Must de `docs/TASKS.md`  
**Não faz parte deste mapa como bloqueador:** US-03, US-08, US-10, US-11  

---

## 1. Visão geral do mapa de implementação

### 1.1 Objetivo deste documento

Traduzir backlog Must, tarefas e arquitetura em um mapa técnico acionável: o que criar, em que ordem, em quais arquivos, com quais dependências e riscos — sem implementar código ainda.

### 1.2 Escopo considerado

| Incluído | Excluído |
|----------|----------|
| US-01, US-02, US-04, US-05, US-06, US-07, US-09, US-12, US-13 | Login, backend, Supabase, IA runtime, analytics |
| Tasks Must de `TASKS.md` | Tasks Should/Could como pré-requisito |
| Estrutura `app/src/*` client-only | Camadas DDD, repositórios, BFF |
| Evidência mínima de histórico (US-09) | UI completa de histórico (US-10) como Must |

### 1.3 Relação com outros documentos

| Documento | Papel neste mapa |
|-----------|------------------|
| `BACKLOG.md` | Fonte de prioridade Must / Should / Could |
| `BACKLOG_REVIEW.md` | Justifica US-05 Must e US-10 Should |
| `TASKS.md` | Decomposição executável; este mapa liga task → arquivo |
| `QA_CHECKLIST.md` | Critérios de validação por história; go/no-go |
| `ARCHITECTURE.md` | Stack, pastas, schema, fluxos, libs |
| `DECISIONS.md` / `adr/` | Decisões congeladas (client-only, JSON, histórico, share) |
| `RISKS.md` | Riscos técnicos por história |

**Regra:** se houver conflito, priorizar `PROJECT_CONTEXT.md` + `BACKLOG.md` Must; usar este mapa para execução; não reinventar decisões dos ADRs.

---

## 2. Premissas técnicas

| Premissa | Implicação de implementação |
|----------|----------------------------|
| **Expo** | Scaffold e APIs nativas via Expo; EAS para build |
| **React Native** | UI mobile; componentes em `src/components` e `src/screens` |
| **TypeScript** | Contratos em `src/types`; sem `any` em dados de mensagem/histórico |
| **JSON local** | `app/src/data/messages.json` embarcado; sem fetch remoto |
| **Armazenamento local** | AsyncStorage para histórico ≤ 10 (ADR-004) |
| **Compartilhamento nativo** | `expo-sharing` + captura de view; fallback texto (ADR-005) |
| **EAS Build** | Build interna Android; validação em device real |
| **Sem backend** | Nenhum HTTP de produto no MVP (ADR-003) |
| **Sem login** | Home direta; sem auth screens |
| **Sem Supabase** | Fora do MVP |
| **Sem IA generativa em runtime** | Conteúdo curado no JSON; IA só no processo (Storyteller) |

---

## 3. Estrutura técnica recomendada

```text
oraculo-paf/
  docs/                          # produto, QA, tasks, mapa (este arquivo)
  app/                           # projeto Expo (ainda a criar no scaffold)
    App.tsx                      # entry: renderiza Home (navegação mínima)
    app.json
    eas.json
    package.json
    src/
      components/                # UI reutilizável, sem I/O
      screens/                   # composição de fluxo
      data/                      # JSON estático
      services/                  # side effects + regras de dados
      hooks/                     # orquestração UI ↔ services
      utils/                     # funções puras
      theme/                     # tokens visuais mínimos
      types/                     # contratos TypeScript
```

### Responsabilidade de cada pasta

| Pasta | Responsabilidade | Pode | Não deve |
|-------|------------------|------|----------|
| `components/` | Peças visuais (botão, card, share CTA) | Receber props tipadas; usar theme | Importar AsyncStorage; carregar JSON; chamar share direto |
| `screens/` | Compor fluxo da tela | Usar hooks + components | Conter validação de schema ou FIFO |
| `data/` | Conteúdo estático versionado | `messages.json` | Lógica |
| `services/` | Carga/validação, histórico, share | I/O local; regras de pool/FIFO/share | Importar React components |
| `hooks/` | Estado de caso de uso | Chamar services; expor API simples à UI | Duplicar regras do service |
| `utils/` | Helpers puros | Sorteio, formatadores leves | Side effects |
| `theme/` | Cores, tipo, espaço | Tokens estáveis | Múltiplos “temas de card” |
| `types/` | Contratos | `OracleMessage`, `HistoryEntry` | Tipos de UI desnecessários |

### Regras de dependência

```text
screens → hooks → services → data | types | utils
screens → components → theme | types
```

- UI não lê AsyncStorage direto.
- Services não importam components.
- Sem pastas `domain/`, `repositories/`, `use-cases/` no MVP.

### Navegação no Must

Para Must, **uma tela (`HomeScreen`) basta**.

`HistoryScreen` fica reservada a US-10 (Should). Para evidência de US-09, preferir: log de debug temporário, inspeção de storage, ou lista mínima **não navegável** só se QA exigir — sem promover US-10 a Must.

---

## 4. Mapa User Story → Artefatos técnicos

| ID | Nome | Components | Screens | Services | Hooks | Types | Utils | Arquivos prováveis | Observações técnicas |
|----|------|------------|---------|----------|-------|-------|-------|--------------------|----------------------|
| **US-04** | JSON local com tons | — | — | `messagesService` | — | `OracleMessage`, `MessageTone` | `validateMessage` (opcional em utils ou dentro do service) | `data/messages.json`, `types/message.types.ts`, `services/messagesService.ts`, `utils/validateMessage.ts` | Schema ADR-002; inválidas fora do pool; sem backend |
| **US-05** | Mensagens curtas, legíveis e compartilháveis | (valida no `MessageCard` depois) | — | — (conteúdo no JSON) | — | mesmos de US-04 | — | `data/messages.json` | Conteúdo: Storyteller; ≥5 por tom (DEC-017); QA editorial |
| **US-01** | Tela principal clara | `ConsultButton` | `HomeScreen` | — | — | — | — | `screens/HomeScreen.tsx`, `components/ConsultButton.tsx`, `App.tsx` | Sem onboarding/login; CTA na 1ª viewport |
| **US-02** | Consultar mensagem aleatória | `ConsultButton` | `HomeScreen` | `messagesService` | `useOracleMessage` | `OracleMessage` | `randomMessage` (`pickRandomMessage`) | `hooks/useOracleMessage.ts`, `utils/randomMessage.ts` | Offline; sem loading de rede; US-03 **não** obrigatória |
| **US-06** | Card visual da mensagem | `MessageCard` | `HomeScreen` | — | `useOracleMessage` (consome) | `OracleMessage` | — | `components/MessageCard.tsx` | 1 template; legibilidade > polish; estável para captura |
| **US-07** | Compartilhar o card | `ShareButton` (ou CTA no card/Home), `MessageCard` (ref) | `HomeScreen` | `shareService` | hook leve opcional ou chamada direta no screen via service | — | `formatShareText` (opcional) | `services/shareService.ts`, `components/ShareButton.tsx` | Imagem preferencial; fallback texto; Android real; ADR-005 |
| **US-09** | Persistir últimas 10 | — | `HomeScreen` (dispara save pós-consulta) | `historyService` | `useHistory` (e integração em `useOracleMessage`) | `HistoryEntry` | — | `services/historyService.ts`, `hooks/useHistory.ts`, `types/history.types.ts` | FIFO 10; sem UI Must; evidência QA definida em TASK-US09-03 |
| **US-12** | Identidade visual mínima | `ConsultButton`, `MessageCard`, `ShareButton` | `HomeScreen` | — | — | — | — | `theme/theme.ts` | 1 paleta; 1 tipografia base; não atrasar share |
| **US-13** | Build interna | — | — | — | — | — | — | `app/app.json`, `app/eas.json`, `app/package.json` | EAS Android; checklist QA seção 9 |

### Componentes Must (resumo)

| Componente | Responsabilidade |
|------------|------------------|
| `ConsultButton` | CTA principal “Consultar” |
| `MessageCard` | Exibe mensagem; alvo de captura de share |
| `ShareButton` | Dispara `shareService` após haver mensagem atual |

### Hooks Must (resumo)

| Hook | Responsabilidade |
|------|------------------|
| `useOracleMessage` | Carrega pool válido, sorteia, expõe `currentMessage` / `consult()`, coordena save no histórico |
| `useHistory` | Lê/escreve via `historyService` (mesmo sem UI de lista) |

### Services Must (resumo)

| Service | Responsabilidade |
|---------|------------------|
| `messagesService` | Importa JSON, valida, expõe pool válido |
| `shareService` | Captura card → share nativo; fallback texto; erros não bloqueantes |
| `historyService` | add + trim 10 + ordem recente→antigo + persistência |

---

## 5. Mapa Task → Arquivo(s) provável(is)

### Must — US-04

| Task | User Story | Arquivo(s) provável(is) | Agente principal | Dependências | Observação |
|------|------------|-------------------------|------------------|--------------|------------|
| TASK-US04-01 | US-04 | `types/message.types.ts`, docs (ARCHITECTURE/ADR-002) | Architect | ADR-002 | Confirmar tons: `poetica` \| `mistica` \| `humoristica` |
| TASK-US04-02 | US-04 | `data/messages.json` | Storyteller | US04-01 | ≥3 tons; IDs únicos |
| TASK-US04-03 | US-04 | `services/messagesService.ts` e/ou `utils/validateMessage.ts` | Architect + QA | US04-01 | Sem `id`/`text`/`tone` → fora do pool |
| TASK-US04-04 | US-04 | `services/messagesService.ts` | Architect / Frontend | US04-01, US04-03 | Só JSON local |

### Must — US-05

| Task | User Story | Arquivo(s) provável(is) | Agente principal | Dependências | Observação |
|------|------------|-------------------------|------------------|--------------|------------|
| TASK-US05-01 | US-05 | `data/messages.json` | Storyteller | US04-01 | ≥5 por tom (DEC-017) |
| TASK-US05-02 | US-05 | `data/messages.json` | PO + Storyteller | US05-01 | Curadoria editorial |
| TASK-US05-03 | US-05 | `components/MessageCard.tsx` + device | QA + UX | US-06 | Após card existir |

### Must — US-01

| Task | User Story | Arquivo(s) provável(is) | Agente principal | Dependências | Observação |
|------|------------|-------------------------|------------------|--------------|------------|
| TASK-US01-01 | US-01 | (spec UX; depois `HomeScreen`) | UX | BACKLOG, QA | Composição mínima |
| TASK-US01-02 | US-01 | `screens/HomeScreen.tsx` | Frontend | US01-01 | Sem regra de schema na tela |
| TASK-US01-03 | US-01 | `QA_CHECKLIST.md` (execução) | QA | US01-01 | ≤5s; CTA sem scroll |

### Must — US-02

| Task | User Story | Arquivo(s) provável(is) | Agente principal | Dependências | Observação |
|------|------------|-------------------------|------------------|--------------|------------|
| TASK-US02-01 | US-02 | `hooks/useOracleMessage.ts` | Frontend | US04-04 | Offline |
| TASK-US02-02 | US-02 | `utils/randomMessage.ts` | Frontend | US02-01 | Não implementar US-03 como Must |
| TASK-US02-03 | US-02 | `hooks/useOracleMessage.ts`, `ConsultButton.tsx` | Frontend + QA | US02-01 | Spam de toques |

### Must — US-06

| Task | User Story | Arquivo(s) provável(is) | Agente principal | Dependências | Observação |
|------|------------|-------------------------|------------------|--------------|------------|
| TASK-US06-01 | US-06 | (spec UX) → `MessageCard.tsx` | UX | US05-01 | 1 template |
| TASK-US06-02 | US-06 | `components/MessageCard.tsx` | Frontend | US06-01 | Props only |
| TASK-US06-03 | US-06 | `MessageCard` + JSON real | QA + UX | US06-02, US05-02 | Android |

### Must — US-07

| Task | User Story | Arquivo(s) provável(is) | Agente principal | Dependências | Observação |
|------|------------|-------------------------|------------------|--------------|------------|
| TASK-US07-01 | US-07 | ADR-005 + `shareService.ts` (contrato) | Architect | ADR-005 | Já conceitualmente fechado |
| TASK-US07-02 | US-07 | `services/shareService.ts`, `ShareButton.tsx` | Frontend | US07-01, US06-02 | Fallback texto |
| TASK-US07-03 | US-07 | build + device | QA + Frontend | US07-02 | Bloqueador RISK-009 |

### Must — US-09

| Task | User Story | Arquivo(s) provável(is) | Agente principal | Dependências | Observação |
|------|------------|-------------------------|------------------|--------------|------------|
| TASK-US09-01 | US-09 | ADR-004; AsyncStorage nos deps | Architect | ADR-004 | Confirmado |
| TASK-US09-02 | US-09 | `services/historyService.ts`, `types/history.types.ts`, `hooks/useHistory.ts` | Frontend | US09-01 | FIFO 10 |
| TASK-US09-03 | US-09 | (método QA: log/storage; opcional debug UI) | QA + PMO | US09-02 | Não elevar US-10 |

### Must — US-12

| Task | User Story | Arquivo(s) provável(is) | Agente principal | Dependências | Observação |
|------|------------|-------------------------|------------------|--------------|------------|
| TASK-US12-01 | US-12 | `theme/theme.ts` | UX | US01-01, US06-01 | Mínimo |
| TASK-US12-02 | US-12 | `HomeScreen`, `ConsultButton`, `MessageCard`, `theme.ts` | Frontend | US12-01 | Aplicar tokens |
| TASK-US12-03 | US-12 | device + QA | QA + UX | US12-02 | Legibilidade > polish |

### Must — US-13

| Task | User Story | Arquivo(s) provável(is) | Agente principal | Dependências | Observação |
|------|------------|-------------------------|------------------|--------------|------------|
| TASK-US13-01 | US-13 | `app/` Expo, `package.json`, `app.json` | DevOps + Frontend | Must principais | Pré-requisitos |
| TASK-US13-02 | US-13 | `eas.json`, docs de comando | DevOps | US13-01 | Android |
| TASK-US13-03 | US-13 | `QA_CHECKLIST.md` §9 | QA | US13-02 | GO/NO-GO |

### Scaffold (implícito em TASKS §15 — Etapa 1)

| Task implícita | User Story | Arquivo(s) | Agente | Dependências | Observação |
|----------------|------------|------------|--------|--------------|------------|
| Scaffold Expo + pastas `src/` | — (desbloqueia todas) | `app/App.tsx`, `app/package.json`, árvore `src/*` | Frontend | IMPLEMENTATION_MAP | Primeira tarefa de código |

### Should / Could (não bloqueiam; referência apenas)

| Task | US | Arquivos se/quando | Observação |
|------|----|--------------------|------------|
| TASK-US03-01 | US-03 | `utils/randomMessage.ts`, `useOracleMessage.ts` | Após Must |
| TASK-US10-01 | US-10 | `screens/HistoryScreen.tsx` ou lista na Home | Should |
| TASK-US11-01 | US-11 | reutilizar `shareService` | Só se US-10 existir |
| TASK-US08-01 | US-08 | animação leve | Could; libs pesadas evitadas |

---

## 6. Dependências técnicas entre histórias

### 6.1 Cadeia de arquivos (ordem técnica)

```text
Scaffold Expo (app/)
  ↓
messages.json
  ↓
message.types.ts (+ history.types.ts quando US-09)
  ↓
validateMessage (utils ou service) + messagesService.ts
  ↓
randomMessage.ts
  ↓
useOracleMessage.ts
  ↓
theme.ts (mínimo cedo; polish depois)
  ↓
ConsultButton.tsx + HomeScreen.tsx
  ↓
MessageCard.tsx
  ↓
shareService.ts + ShareButton.tsx
  ↓
historyService.ts + useHistory.ts  (integrar no consult)
  ↓
EAS Build (eas.json)
  ↓
QA_CHECKLIST.md §9 em Android real
```

### 6.2 Ordem por user story Must (alinhada a BACKLOG + TASKS)

```text
US-04 → US-05 → US-01 → US-02 → US-06 → US-07 → US-09 → US-12 → US-13
         ↑ conteúdo        ↑ spike de share o mais cedo possível após card mínimo
```

**Nota:** US-12 pode começar tokens cedo (`theme.ts`), mas polish não bloqueia US-07. Validar share (US-07) em Android **antes** de refinar identidade.

### 6.3 Grafo resumido tarefa crítica

```text
US04-01 → US04-02 / US05-01 → US05-02
US04-01 → US04-03 → US04-04 → US02-01 → US02-02 / US02-03
US01-01 → US01-02
US05-02 → US06-01 → US06-02 → US07-02 → US07-03
US09-01 → US09-02 → US09-03
US12-01 → US12-02 → US12-03
Must fluxo → US13-01 → US13-02 → US13-03
```

---

## 7. Arquivos iniciais recomendados

### 7.1 Criar na primeira implementação (Must)

| Arquivo | Responsabilidade |
|---------|------------------|
| `app/App.tsx` | Entry; monta `HomeScreen` |
| `app/app.json` | Config Expo |
| `app/eas.json` | Perfil de build interna (pode vir na onda build) |
| `app/package.json` | Dependências Expo/RN/TS |
| `app/src/data/messages.json` | Base local de mensagens |
| `app/src/types/message.types.ts` | `OracleMessage`, `MessageTone` |
| `app/src/types/history.types.ts` | `HistoryEntry` |
| `app/src/utils/validateMessage.ts` | Type guard / regras de validade |
| `app/src/utils/randomMessage.ts` | `pickRandomMessage(pool)` puro |
| `app/src/services/messagesService.ts` | Carga + filtro de válidas |
| `app/src/services/shareService.ts` | Share imagem + fallback texto |
| `app/src/services/historyService.ts` | Persistência FIFO 10 |
| `app/src/hooks/useOracleMessage.ts` | Consulta + estado atual |
| `app/src/hooks/useHistory.ts` | API de histórico para o hook/tela |
| `app/src/screens/HomeScreen.tsx` | Fluxo principal |
| `app/src/components/ConsultButton.tsx` | CTA Consultar |
| `app/src/components/MessageCard.tsx` | Card + ref para captura |
| `app/src/components/ShareButton.tsx` | CTA Compartilhar |
| `app/src/theme/theme.ts` | Tokens mínimos |

### 7.2 Ajustes em relação à lista do prompt

| Item do prompt | Decisão deste mapa |
|----------------|-------------------|
| `randomMessage.ts` | Manter arquivo; export nomeado `pickRandomMessage` (ARCHITECTURE) |
| Sem `history.types.ts` na lista original | **Incluir** — contrato do ADR-004 / ARCHITECTURE |
| Sem `ShareButton` / `validateMessage` | **Incluir** — clareza de UI e validação |
| `HistoryScreen.tsx` | **Não** na lista Must inicial (US-10 Should) |
| `eas.json` | Incluir na onda US-13 (não bloqueia scaffold inicial) |

### 7.3 Não criar no scaffold Must

- `HistoryScreen.tsx` (Should)
- stores Redux/Zustand
- clients HTTP / Supabase
- múltiplos templates de card
- onboarding / auth screens
- analytics SDKs

---

## 8. Riscos técnicos por user story

| US | Risco técnico principal | Impacto | Mitigação | RISKS.md | Atenção QA |
|----|-------------------------|---------|-----------|----------|------------|
| US-01 | Home poluída / onboarding “só mais uma tela” | Alto (atrito) | Composição mínima; CTA único | RISK-003, RISK-008 | US01-P02/P03; ≤5s |
| US-02 | Pool vazio/inválido ou race em toques | Alto | Validar no service; estado consistente | RISK-013 | Spam toques; offline &lt;1s |
| US-04 | JSON inválido / IDs duplicados | Alto | Schema + type guard; inválidas fora | RISK-013 | US04-N01–N03 |
| US-05 | Mensagens genéricas/longas → hipótese falsa | Alto | ≥5/tom; curadoria; testar no card | RISK-005, RISK-013 | Editorial + overflow |
| US-06 | Card complexo atrasa share | Alto | 1 template; texto foco | RISK-001, RISK-006 | Hierarquia; Android |
| US-07 | Share diferente em device real | **Bloqueador** | Spike cedo; fallback texto | RISK-009, RISK-001 | US07 obrigatório em Android físico |
| US-09 | Escopo de histórico / QA sem UI | Médio–Alto | FIFO só no service; evidência sem US-10 Must | RISK-002 | Método em TASK-US09-03 |
| US-12 | Polish atrasa validação | Médio | Tokens mínimos após share estável | RISK-008, RISK-006 | Legibilidade; 1 template |
| US-13 | Build ok, fluxo falha offline/share | Alto | Checklist §9 completo | RISK-009, RISK-010 | GO/NO-GO explícito |

---

## 9. Recomendações para o Frontend Mobile Agent

### 9.1 Por onde começar

1. **Scaffold Expo** em `app/` + pastas `src/*`.  
2. **Types + `messages.json` + `messagesService`** (mesmo com JSON placeholder se Storyteller atrasar — trocar depois).  
3. **`useOracleMessage` + Home + ConsultButton`** (consulta offline).  
4. **`MessageCard` mínimo**.  
5. **`shareService` + spike Android real** (não esperar polish).  
6. **`historyService` + integração no consult**.  
7. **Theme mínimo** se ainda não aplicado.  
8. **EAS + QA_CHECKLIST §9**.

### 9.2 O que não fazer

- Backend, login, Supabase, IA runtime, analytics.  
- Tratar US-03 / US-10 / US-11 / US-08 como bloqueadores.  
- Redux, React Query, ORM, design system pesado.  
- Múltiplos templates de card.  
- Ler AsyncStorage ou JSON direto na UI.  
- Adiar share “até o card ficar bonito”.

### 9.3 Arquivos criar primeiro

```text
1. scaffold (App.tsx, package.json, pastas)
2. message.types.ts + messages.json
3. messagesService.ts (+ validateMessage.ts)
4. randomMessage.ts + useOracleMessage.ts
5. HomeScreen.tsx + ConsultButton.tsx
6. MessageCard.tsx
7. shareService.ts + ShareButton.tsx
8. history.types.ts + historyService.ts + useHistory.ts
9. theme.ts (se ainda stub)
```

### 9.4 Dependências a usar vs evitar

**Usar (essenciais):** `expo`, `react`, `react-native`, `typescript`, `@react-native-async-storage/async-storage`, `expo-sharing`, lib Expo-compatível de captura de view (ex. `react-native-view-shot`).

**Navegação:** no Must, pode omitir React Navigation se só existir Home. Adicionar stack só se US-10 entrar.

**Evitar:** Supabase/Firebase/Auth, Axios/React Query “por padrão”, Redux, SDKs de IA, analytics pesado, SQLite/ORM, Reanimated (exceto Could US-08 com justificativa).

### 9.5 Como manter o escopo do MVP

- Cada PR/entrega deve mapear a uma US Must ou task Must.  
- Pergunta guia: “isso ajuda abrir → consultar → card → compartilhar agora?”  
- Should só após fluxo Must estável e decisão explícita.

### 9.6 Como validar antes de avançar

| Antes de… | Validar |
|-----------|---------|
| Card | Consulta offline com JSON válido |
| Share | Card mínimo renderiza texto |
| Histórico | Consulta estável |
| Theme polish | Share sheet abre em Android (ou fallback texto ok) |
| Build GO | `QA_CHECKLIST.md` §9 |

### 9.7 Como respeitar o `QA_CHECKLIST.md`

- Severidades B/A do checklist = bugs a corrigir antes de GO.  
- Share e offline são bloqueadores.  
- Não falhar o MVP por ausência de tela de histórico.  
- Documentar método de evidência US-09 no registro de QA.  
- Não exigir automação E2E neste momento.

---

## 10. Ajustes recomendados antes da implementação

**Não aplicados automaticamente.** Revisar manualmente:

### 10.1 `ARCHITECTURE.md`

| Item | Problema | Ajuste sugerido |
|------|----------|-----------------|
| §14.1 ordem Must | Ainda cita `US-09/10` juntos | Separar: US-09 Must; US-10 Should |
| §12.1 ADRs | Checkbox “ADRs iniciais criados” ainda aberto | Marcar feito (ADR-001…005 existem) |
| §4 `HistoryScreen` | Aparece como exemplo padrão | Deixar explícito: Should / pós-Must |
| Nome do util | `pickRandomMessage` vs `randomMessage.ts` | Padronizar como neste mapa |

### 10.2 `TASKS.md`

| Item | Problema | Ajuste sugerido |
|------|----------|-----------------|
| Scaffold | Etapa 1 descrita, sem TASK-ID | Criar `TASK-SCAFFOLD-01` ou aceitar como pré-task do Frontend |
| TASK-US07-01 | “Definir estratégia” | Marcar como concluída conceitualmente (ADR-005 + este mapa) |
| TASK-US04-01 / US09-01 | Idem decisões já em ADR | Fechar checklist de planejamento ou apontar para ADR |

### 10.3 `QA_CHECKLIST.md`

| Item | Problema | Ajuste sugerido |
|------|----------|-----------------|
| ≥5 por tom | Heurística QA | Já confirmada em DEC-017 — referenciar DEC-017 explicitamente |
| Evidência US-09 | Em aberto | PMO/QA fechar método (log vs storage vs debug) **antes** do GO |

### 10.4 `BACKLOG.md`

| Item | Status |
|------|--------|
| US-05 Must / US-10 Should | Já alinhado à review — ok |
| Seção 9 “próxima ação” | Ainda fala em acionar QA antes de tasks — desatualizado; atualizar para Frontend/Storyteller |

### 10.5 `RISKS.md`

| Item | Ajuste sugerido |
|------|-----------------|
| RISK-011 | Pode ir para mitigado (ARCHITECTURE + ADRs + TASKS + este mapa) |
| RISK-009 | Manter Ativo até US07-03 passar em Android real |

### 10.6 ADRs

| Item | Status |
|------|--------|
| ADR-001…005 | Coerentes com ARCHITECTURE — ok |
| Nada a criar agora | Não criar ADR de Supabase/auth/IA |

### 10.7 Nomenclatura de tons

Usar no código/JSON: `poetica` | `mistica` | `humoristica` (sem acento), alinhado a ARCHITECTURE — garantir que Storyteller e BACKLOG usem os mesmos literals.

---

## 11. Critérios de pronto para iniciar o Frontend Mobile Agent

| Critério | Status atual |
|----------|--------------|
| `TASKS.md` criado | ✅ |
| `IMPLEMENTATION_MAP.md` criado | ✅ (este documento) |
| `ARCHITECTURE.md` + ADRs | ✅ |
| `QA_CHECKLIST.md` conhecido | ✅ |
| Estratégia de share conceitual (ADR-005) | ✅ |
| Estratégia de histórico (ADR-004) | ✅ |
| Estrutura de pastas validada | ✅ |
| Base mínima de mensagens definida/planejada | ⚠️ Planejada (DEC-017); **arquivo JSON ainda não criado** |
| UX mínima da Home/card | ⚠️ Spec em TASKS; UX Agent pode rodar em paralelo, não bloqueia scaffold |
| Evidência QA para US-09 fechada | ⚠️ Definir método na 1ª sprint de histórico |
| Scaffold `app/` existente | ❌ Ainda não |

### Bloqueios reais vs paralelizáveis

| Bloqueia scaffold? | Item |
|--------------------|------|
| Não | JSON final do Storyteller (usar fixture mínima e substituir) |
| Não | Polish de UX |
| Não | US-10 |
| Sim (para share final) | Device Android para spike US-07 |
| Sim (para GO) | EAS + checklist §9 |

---

## 12. Conclusão

### O projeto está pronto para o Frontend Mobile Agent?

**Sim, para iniciar o scaffold e a cadeia Must**, com este mapa + ARCHITECTURE + ADRs + TASKS + QA_CHECKLIST.

### Existe bloqueio técnico antes do scaffold?

**Não.** Não há bloqueio de arquitetura, backend ou decisão pendente crítica.

Pendências **não bloqueantes do scaffold**, mas necessárias em paralelo:

1. Storyteller gerar `messages.json` (≥15 válidas, DEC-017).  
2. UX fechar composição mínima Home/card (TASK-US01-01 / US06-01).  
3. QA/PMO fechar método de evidência US-09.

### Qual deve ser a primeira tarefa de implementação?

**Scaffold Expo em `app/` + árvore `src/` (Etapa 1 de `TASKS.md` §15)** — em seguida imediatamente:

```text
message.types.ts → messages.json (mínimo) → messagesService.ts
```

Primeira prova de valor técnico após o scaffold: **consulta offline na Home**.  
Primeira prova da hipótese: **share em Android real com card mínimo (US-07)**.

---

## Referência rápida — contrato de dados

```ts
// message.types.ts
type MessageTone = "poetica" | "mistica" | "humoristica";

type OracleMessage = {
  id: string;
  text: string;
  tone: MessageTone;
  category: string;
  tags: string[];
  shareable: boolean;
};

// history.types.ts
type HistoryEntry = {
  messageId: string;
  text: string;
  tone: MessageTone;
  consultedAt: string; // ISO
};
```

---

> Mapa bom neste projeto é o que faz o Frontend começar pelo JSON e terminar com share estável em Android — sem inventar plataforma no caminho.

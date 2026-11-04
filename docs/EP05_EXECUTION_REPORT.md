# EP.05 — Relatório consolidado de execução

- **Projeto:** ORÁCULO PAF · **Série:** Do Zero ao Produto / Papo de Gerente
- **Episódio:** EP.05 — Do backlog à execução: colocando nosso time de agentes IA para trabalhar
- **Consolidação:** PMO / Project Manager Agent (Cursor) · **Data:** 03/11/2026
- **Versão de entrada:** 4.5 · **Versão consolidada:** 5.0 (`app.version`)
- **Referência:** repositório local `oraculo-paf`, branch `main`, commits `ea9f2bc` e `353b898` + alterações documentais desta consolidação (não commitadas no momento da redação)

---

## 1. Resumo executivo

O EP.05 levou o ORÁCULO PAF do planejamento à primeira implementação técnica. Quatro agentes especializados trabalharam a partir do backlog, do mapa de implementação e dos ADRs:

- o **Storyteller** entregou 18 mensagens originais em JSON, validadas por script e **aprovadas integralmente pelo responsável pelo produto** antes da integração;
- o **UX/UI** especificou a Home, o card único e os tokens visuais mínimos;
- o **QA** definiu como provar a persistência da US-09 sem criar tela de histórico;
- o **Frontend Mobile** criou o projeto Expo SDK 58 + TypeScript em `app/` e implementou a primeira fatia Must: dados validados, sorteio, Home com três estados e card.

**Situação geral:** existe código para US-04, US-01, US-02 e parte de US-06 e US-12, e ele passou em todas as verificações estáticas (reproduzidas pelo PMO). **O aplicativo nunca foi visto em execução**: não houve emulador, Expo Go nem Android físico. Compartilhamento (US-07), histórico (US-09) e build interna (US-13) não foram implementados.

A versão 5.0 é o fechamento auditável do EP.05. Não representa MVP concluído, release publicado nem funcionalidade validada em dispositivo.

---

## 2. Objetivo do EP.05

Fazer a transição do backlog para a primeira implementação técnica, com quatro entregas paralelas (`TASKS.md` §17):

1. conteúdo curado e JSON válido (≥ 15 mensagens, ≥ 5 por tom — DEC-017);
2. especificação mínima de Home, card e tokens (TASK-US01-01, US06-01, US12-01);
3. método de evidência da US-09 sem tornar a US-10 obrigatória (TASK-US09-03);
4. scaffold Expo e primeira fatia Must no Cursor (TASK-SCAFFOLD-01 em diante).

Regra explícita da rodada: o scaffold podia começar em paralelo; integração de conteúdo e UX só com versões revisadas; nada seria declarado validado sem evidência.

---

## 3. Execução dos agentes

O texto integral dos prompts de Storyteller, UX/UI e QA não está versionado no repositório; os objetivos abaixo vêm de `TASKS.md` §17, `README.md` (v4.5) e dos próprios entregáveis.

### 3.1 Storyteller Agent

| Item | Registro |
|---|---|
| Missão | Criar e organizar mensagens poéticas, místicas e humorísticas curtas e compartilháveis (`AGENTS.md` §9) |
| Objetivo da rodada | TASK-US05-01/02 e TASK-US04-02: base curada, mínimo 15 válidas, 5 por tom, no schema de `ARCHITECTURE.md` §5 |
| Arquivo produzido | `app/src/data/messages.json` |
| Resultados reais | 18 mensagens (`msg-001`…`msg-018`), 6 por tom; todos os registros com `id`, `text`, `tone`, `category`, `tags`, `shareable: true`; mais longas com 59 caracteres (`msg-009`, mística; `msg-013`, humorística) |
| Evidências | Validação estrutural programática do agente (contagem, formato, unicidade); `npm run check:messages` reproduzido pelo PMO: 18 registros, 18 válidos, 0 rejeitados, `{ poetica: 6, mistica: 6, humoristica: 6 }` |
| Curadoria | 4 mensagens sinalizadas pelo agente para atenção editorial. **Em 03/11/2026, o responsável pelo produto aprovou as 18 mensagens, incluindo as 4 sinalizadas, sem substituições** (DEC-018). A identificação das 4 mensagens sinalizadas não está registrada no repositório |
| Integração | Feita pelo Frontend, sem alterar o conteúdo |
| Pendências | Nenhuma pendência editorial. Teste visual/funcional do texto no card em Android: pendente (TASK-US05-03) |

### 3.2 UX/UI Agent

| Item | Registro |
|---|---|
| Missão | Experiência simples, emocional, clara e compartilhável (`AGENTS.md` §7) |
| Objetivo da rodada | TASK-US01-01, TASK-US06-01, TASK-US12-01 |
| Arquivo produzido | `docs/UX_UI_Especificacao_Minima.md` |
| Resultados reais | Três estados da Home (inicial, mensagem exibida, falha segura) com wireframe; `MessageCard` único 4:5 com área capturável contendo apenas fundo, marca e texto; Compartilhar fora da captura; tokens (cores, espaçamento, raio, tipografia do sistema, alvo de toque 48 dp); contrastes calculados (≥ 7,27:1); orientações de acessibilidade, toque repetido e cancelamento de share; handoff ao Frontend |
| Evidências | Documento versionado (commit `ea9f2bc`). Contrastes são cálculos sobre valores hexadecimais, não medições em tela |
| O que o código implementou | Estados A e C completos; estado B parcial (card sim, botão Compartilhar não); textos da spec reproduzidos literalmente; tokens em `theme.ts`; card com `minHeight` 4:5 que cresce com fonte ampliada; `collapsable={false}` no card. Não implementado: `forwardRef`/`ref` de captura, `ShareButton` |
| Pendências | Aprovação humana da identidade visual e dos defaults; testes de acessibilidade (TalkBack, fonte 130%/150%, larguras 320/360/412 dp) |

### 3.3 QA Agent

| Item | Registro |
|---|---|
| Missão | Garantir testabilidade e validação contra critérios de pronto (`AGENTS.md` §8) |
| Objetivo da rodada | TASK-US09-03: método de evidência da US-09 sem US-10 |
| Arquivo produzido | `docs/QA_US09_Estrategia_Evidencia_EP05.md` |
| Resultados reais | Método principal (diagnóstico `__DEV__` com `historyService` real, fixtures determinísticas, AsyncStorage real, force-stop e reabertura) e alternativo (inspeção direta do storage); 7 pré-requisitos para o Frontend; massa E01…E11, R01/R02; 10 casos (vazio, uma consulta, dez, 11ª/FIFO, IDs repetidos, reabertura, entrada inválida, storage corrompido, falha de I/O, consultas rápidas); separação em camadas serviço / integração / Android físico; modelo de relatório |
| Evidências | Documento versionado. **Todos os casos NOT RUN** — não existe `historyService` |
| Achado relevante | O histórico guarda **eventos de consulta**: a 11ª consulta remove o evento mais antigo mesmo que repita um `messageId`. O cenário US09-P02 do checklist pedia "10 mensagens distintas (IDs)" — corrigido nesta consolidação |
| Pendências | Execução dos 10 casos após TASK-US09-02; política de recuperação de falhas de storage ainda provisória |

### 3.4 Frontend Mobile Agent (Cursor)

| Item | Registro |
|---|---|
| Missão | Implementar o app em Expo/React Native/TypeScript com código simples (`AGENTS.md` §6) |
| Objetivo da rodada | TASK-SCAFFOLD-01 e primeira fatia Must: tipos, JSON integrado, validação/service e consulta offline visível |
| Execução | `create-expo-app` (template `blank-typescript`) gerado em `/tmp` e copiado para `app/`, excluindo `.git`, `node_modules`, `LICENSE` e o `AGENTS.md` do template (que mandava usar Expo Router "para toda navegação") |
| Arquivos produzidos | Ver seção 4 (commit `353b898`) |
| Resultados reais | Expo SDK 58 (`expo@58.0.23`, `react-native@0.88.1`, `react@19.3.0`, `typescript@6.0.3`); única biblioteca adicionada: `react-native-safe-area-context`; Home única com estados inicial, mensagem e falha segura; consulta síncrona sem rede; tokens aplicados |
| Evidências relatadas | typecheck exit 0; 17/17 checagens; `expo-doctor` 20/20; `expo install --check` ok; export Android 634 módulos com mensagens e textos da Home dentro do bundle; Metro servindo bundle de desenvolvimento HTTP 200 (762 módulos) |
| Não implementado | US-07 (share), US-09 (histórico), US-13 (EAS), `ref` de captura do card, execução em Android real ou emulador |
| Problemas relatados | SDK 57 anunciado × 58 instalado; Expo Go do aparelho não verificado; 5 vulnerabilidades moderadas no `npm audit`, cujo `--force` rebaixaria o Expo; política de IDs duplicados sem confirmação arquitetural; reentrância necessária quando o histórico assíncrono entrar; interface nunca observada |

### 3.5 PMO / Project Manager Agent

Auditou o repositório, reexecutou as verificações, atualizou a documentação de gestão, criou este relatório e promoveu `app.version` para 5.0. Não alterou código-fonte, `messages.json`, `package.json` nem `app.json`.

---

## 4. Entregáveis técnicos

### 4.1 Commit `ea9f2bc` — entregáveis dos agentes para o Frontend (03/11/2026)

| Arquivo | Finalidade |
|---|---|
| `app/src/data/messages.json` | Base aprovada de 18 mensagens (Storyteller) |
| `docs/UX_UI_Especificacao_Minima.md` | Especificação mínima de Home, card e tokens (UX/UI) |
| `docs/QA_US09_Estrategia_Evidencia_EP05.md` | Estratégia de evidência da US-09 (QA) |
| `app.version` | Versionador do repositório (4.5) |
| Demais documentos de `docs/` e `README.md` | Base v4.5 consolidada para o Frontend |

### 4.2 Commit `353b898` — scaffold e primeira fatia Must (03/11/2026)

| Arquivo | Finalidade |
|---|---|
| `app/package.json`, `app/package-lock.json` | Dependências Expo SDK 58; scripts `typecheck` e `check:messages` |
| `app/app.json` | Configuração Expo (nome "ORÁCULO PAF", retrato, ícones padrão do template) |
| `app/tsconfig.json` | TypeScript estrito sobre `expo/tsconfig.base` |
| `app/index.ts`, `app/App.tsx` | Entrada; `SafeAreaProvider` + `HomeScreen` |
| `app/.gitignore` | Ignora `node_modules/`, `.expo/`, `dist/`, chaves, `.env*.local`, pastas nativas |
| `app/assets/*` | Ícones e splash padrão do template (não são identidade aprovada) |
| `app/src/types/message.types.ts` | `MessageTone`, `OracleMessage`, `MESSAGE_TONES` |
| `app/src/utils/validateMessage.ts` | Regras de validade; rejeita duplicados após a primeira ocorrência |
| `app/src/utils/randomMessage.ts` | `pickRandomMessage(pool, random)` puro |
| `app/src/services/messagesService.ts` | Import estático do JSON, pool validado em cache, logs em `__DEV__` |
| `app/src/hooks/useOracleMessage.ts` | `status`, `currentMessage`, `consult()` |
| `app/src/screens/HomeScreen.tsx` | Home única com três estados |
| `app/src/components/ConsultButton.tsx` | CTA primário acessível, estado desabilitado |
| `app/src/components/MessageCard.tsx` | Card único 4:5 adaptável a fonte ampliada |
| `app/src/theme/theme.ts` | Tokens propostos pelo UX/UI (marcados como pendentes de aprovação) |
| `app/scripts/check-messages.mjs` | 17 checagens sem dependências (requer Node ≥ 22.18) |

### 4.3 Alterações desta consolidação (PMO)

Somente documentação e `app.version`; ver seção 11.

---

## 5. Matriz de rastreabilidade

| User Story | Tarefa | Agente | Arquivo | Evidência | Estado |
|---|---|---|---|---|---|
| US-05 | TASK-US05-01 | Storyteller | `messages.json` | 18 mensagens, 6 por tom | `done` |
| US-05 | TASK-US05-02 | Responsável pelo produto + Storyteller | `messages.json`, DEC-018 | Aprovação humana integral (03/11/2026) | `done` |
| US-05 | TASK-US05-03 | QA + UX/UI | `MessageCard.tsx` | — | `todo` |
| US-04 | TASK-US04-01 | Architect (impl. Frontend) | `message.types.ts` | Alinhado a ARCHITECTURE §5 | `done` |
| US-04 | TASK-US04-02 | Storyteller | `messages.json` | `check:messages` 18/18 válidos | `done` |
| US-04 | TASK-US04-03 | Architect + QA (impl. Frontend) | `validateMessage.ts` | Checagens negativas PASS | `done` (duplicados: provisório) |
| US-04 | TASK-US04-04 | Frontend | `messagesService.ts` | typecheck + bundle | `done` (runtime não observado) |
| — | TASK-SCAFFOLD-01 | Frontend | `app/` | typecheck, doctor, export | `review` (runtime pendente) |
| US-01 | TASK-US01-01 | UX/UI | `UX_UI_Especificacao_Minima.md` §2 | Spec documentada | `review` (aprovação) |
| US-01 | TASK-US01-02 | Frontend | `HomeScreen.tsx` | Código + bundle | `done` (não observada) |
| US-02 | TASK-US02-01/02 | Frontend | `useOracleMessage.ts`, `randomMessage.ts` | Checagens de sorteio PASS | `done` (não observado) |
| US-02 | TASK-US02-03 | Frontend + QA | `useOracleMessage.ts` | Consulta síncrona | `in-progress` |
| US-06 | TASK-US06-01 | UX/UI | spec §3 | Spec documentada | `review` |
| US-06 | TASK-US06-02 | Frontend | `MessageCard.tsx` | Código + bundle | `in-progress` (sem `ref` de captura) |
| US-07 | TASK-US07-02/03 | Frontend + QA | — | — | `todo` |
| US-09 | TASK-US09-02 | Frontend | — | — | `todo` |
| US-09 | TASK-US09-03 | QA + PMO | `QA_US09_Estrategia_Evidencia_EP05.md` | 10 casos especificados, NOT RUN | `done` (método) |
| US-12 | TASK-US12-01 | UX/UI | spec §4 | Tokens + contrastes calculados | `review` (identidade) |
| US-12 | TASK-US12-02 | Frontend | `theme.ts` | Tokens aplicados | `review` |
| US-13 | TASK-US13-01…03 | DevOps + QA | — | — | `todo` |

Tabela completa, com pendências por tarefa, em `docs/TASKS.md` §18.1.

---

## 6. Verificações e testes

### 6.1 Reproduzidas pelo PMO (03/11/2026, Node v24.13.0, npm 11.6.2, a partir de `app/`)

| Comando | Resultado |
|---|---|
| `npm run typecheck` | exit 0 |
| `npm run check:messages` | 17/17 PASS; 18 registros, 18 válidos, 0 rejeitados; mais longa `msg-009` (59 caracteres); 0 com `shareable=false`. Aviso não bloqueante do Node `MODULE_TYPELESS_PACKAGE_JSON` |
| `npx expo-doctor` | 20/20 checks passed |
| `npx expo install --check` | Dependencies are up to date |
| `npm audit` (somente leitura) | 5 moderadas (`glob`, `minimatch`, `@expo/cli`, `@expo/fingerprint`, `expo`); correção `--force` "will install expo@53.0.11" |
| `npx expo export --platform android --output-dir /tmp/oraculo-ep05-export` | "Android Bundled … (634 modules)"; bundle Hermes 1,6 MB, gerado fora do repositório |

### 6.2 Relatadas pelo Frontend e não reexecutadas

| Verificação | Resultado relatado |
|---|---|
| `npx expo start` + `curl` | `packager-status:running`; bundle Android de desenvolvimento HTTP 200 (762 módulos); servidor encerrado |
| Busca no bundle exportado | Mensagens e textos da Home presentes |
| ReadLints | Sem erros |

A diferença 634 × 762 módulos é esperada: export de produção × bundle de desenvolvimento do Metro.

### 6.3 Não executados

- Qualquer cenário com o app aberto: US01-*, US02-*, US05-P01/P03/UX01, US06-*, US12-*.
- US09-QA01…QA10 (sem código) e US07-* (sem código).
- Seção 9 do `QA_CHECKLIST.md` (go/no-go): sem build.
- Acessibilidade (TalkBack, fonte ampliada), larguras de tela, modo avião.

Existir bundle não prova que a interface funciona. Detalhamento por camada em `docs/QA_CHECKLIST.md` §13.

---

## 7. Decisões tomadas

| ID | Decisão | Status |
|---|---|---|
| DEC-018 | Aprovação editorial integral das 18 mensagens, incluindo as 4 sinalizadas | **Aprovada (decisão humana, 03/11/2026)** |
| DEC-019 | Manter Expo SDK 58; não executar `npm audit fix --force` | Aprovada, com revisão no primeiro teste Android |
| DEC-020 | Template sem Expo Router; `App.tsx` monta a Home única | Aprovada |
| DEC-021 | Import estático + validação + falha segura | Aprovada; **política de IDs duplicados provisória** |
| DEC-022 | `react-native-safe-area-context` | Aprovada |
| DEC-023 | Estratégia de evidência da US-09; unidade = evento de consulta | Aprovada como método; execução pendente |
| DEC-024 | Tokens visuais propostos aplicados | **Provisória — identidade pendente de aprovação** |
| DEC-025 | `app.version` 5.0 sem alterar versão técnica do app | Aprovada |

Nenhum ADR novo: as decisões cabem nos ADR-001 a ADR-005.

**Pendentes de decisão humana:** identidade visual (DEC-024) e política de IDs duplicados (DEC-021).

---

## 8. Problemas e riscos

| Problema real | Consequência | Ação proposta | Risco |
|---|---|---|---|
| Gerador anunciou SDK 57 e instalou SDK 58 | Expo Go do aparelho pode não abrir o projeto | Verificar versão do Expo Go; se incompatível, build de desenvolvimento/EAS, sem rebaixar SDK | RISK-014 |
| 5 vulnerabilidades moderadas no tooling | Exposição baixa em ferramentas de build | Não usar `--force`; reavaliar a cada patch do SDK 58 | RISK-015 |
| Interface nunca observada (sem `adb`/emulador/aparelho) | Defeitos de layout/toque podem estar ocultos | Primeira execução observada como item 1 do EP.06 | RISK-016 |
| US-07 sem código | Núcleo da hipótese não testável | Spike de share em Android físico | RISK-009, RISK-001 |
| US-09 sem código; futura escrita assíncrona | GO bloqueado; possível perda de eventos | `historyService` com serialização; US09-QA01…QA10 | RISK-017 |
| Card cresce com fonte ampliada | Captura pode sair da proporção | Testar 59 caracteres em 100/130/150% e capturar | RISK-018 |
| Identidade visual não aprovada | Retrabalho em `theme.ts` | Uma rodada de aprovação, sem bloquear US-07 | RISK-008 |
| Política de IDs duplicados sem confirmação | Comportamento implícito em edições futuras do JSON | Confirmar com Architect/PO | RISK-013 |

A curadoria editorial **não** é risco aberto nem pendência: foi concluída pela DEC-018. RISK-005 segue mitigado parcialmente apenas porque a hipótese ainda não foi testada com usuários.

### 8.1 Observações menores (não corrigidas; código fora do escopo do PMO)

- `app/src/utils/validateMessage.ts` cita `node scripts/check-messages.ts`, mas o script real é `scripts/check-messages.mjs`.
- `check:messages` emite o aviso `MODULE_TYPELESS_PACKAGE_JSON` do Node; não afeta o resultado.
- `app.json` e `app/assets/` mantêm ícones, splash e cor do ícone adaptativo (`#E6F4FE`) padrão do template.

---

## 9. Estado do MVP

**Implementado (código + verificação estática):**

- US-04 — JSON local validado; inválidos fora do pool; pool vazio → estado seguro.
- US-05 — 18 mensagens aprovadas e integradas.
- US-01 — Home com título, subtítulo, Consultar e placeholder; sem login, onboarding ou navegação.
- US-02 — consulta aleatória local, sem rede.
- US-06 (parcial) — card único legível, sem `ref` de captura.
- US-12 (parcial) — tokens propostos aplicados; identidade não aprovada.

**Falta implementar:** US-07 (compartilhamento com fallback em texto), US-09 (histórico local), US-13 (configuração EAS e build), `ref` de captura no card, botão Compartilhar.

**Precisa ser validado:** tudo o que foi implementado — abertura do app, consulta, modo avião, layout em larguras e fontes diferentes, contraste em tela, estado de falha segura renderizado — e, depois, share e histórico em Android físico, com a seção 9 do checklist.

O MVP **não está concluído**. Nenhuma funcionalidade foi validada em execução.

---

## 10. HANDOFF EDITORIAL — EP.05

Material para o chat editorial da newsletter. Não é o artigo.

### 10.1 Principais acontecimentos

1. Quatro agentes trabalharam a partir dos mesmos documentos (backlog, tarefas, arquitetura, mapa, ADRs). Três deles (Storyteller, UX/UI, QA) produziram insumos; o quarto (Frontend, no Cursor) os consumiu para criar código.
2. O Storyteller entregou um arquivo **tecnicamente verificável**: um JSON que um script consegue validar (18 registros, 6 por tom, sem IDs duplicados, todos os campos obrigatórios). Ele mesmo sinalizou 4 mensagens para atenção editorial.
3. O responsável pelo produto revisou e aprovou as 18 mensagens, incluindo as 4 sinalizadas, **antes** da integração. A IA escreveu e checou o formato; a decisão editorial foi humana.
4. O UX/UI separou explicitamente o que era proposta (P), condicionado (C) e teste pendente (T), e recomendou ao PMO não chamar nada de "implementado" ou "validado".
5. O QA descobriu, antes de existir código, que o histórico guarda eventos de consulta e não mensagens únicas.
6. O Frontend criou o projeto, encontrou e registrou uma divergência no gerador (SDK 57 anunciado, 58 instalado), recusou uma "correção" automática que rebaixaria o SDK e implementou a primeira fatia Must.
7. O PMO reexecutou as verificações e confirmou os números do Frontend, sem conseguir — e sem afirmar — que o app roda na tela.

### 10.2 Acertos

- **Curadoria humana como portão.** O conteúdo passou por validação automática (formato) e aprovação humana (qualidade) antes de entrar no app.
- **Honestidade de status.** Os agentes separaram "documentado", "implementado" e "testado". O QA marcou os 10 casos como NOT RUN; o UX/UI rotulou contrastes como cálculo, não medição.
- **Recusa do atalho perigoso.** `npm audit fix --force` resolveria 5 alertas moderados instalando `expo@53.0.11`, cinco versões abaixo. O Frontend não aplicou.
- **Proteção do escopo.** O `AGENTS.md` do template mandava usar Expo Router para toda a navegação; isso contradizia a decisão de uma Home única e o arquivo foi deixado de fora. Só uma biblioteca nova entrou (safe area), com justificativa.
- **Paralelismo planejado.** O scaffold começou sem esperar conteúdo e UX, como previsto no EP.04.
- **Falha segura desde o início.** Se o JSON vier inválido ou vazio, a Home mostra "Não foi possível carregar as mensagens desta versão." e desabilita Consultar, em vez de quebrar.

### 10.3 Erros e limitações

- **Nenhuma tela foi vista.** Não havia `adb`, emulador nem aparelho no ambiente do Frontend. Typecheck, 17/17 checagens, `expo-doctor` 20/20 e bundle de 634 módulos dizem que o código compila e empacota; não dizem que o botão aparece, que o texto cabe ou que o toque funciona.
- **O núcleo da hipótese ficou para depois.** Compartilhamento é o sinal principal do MVP e ainda não tem código.
- **Divergência no próprio checklist.** O cenário US09-P02 pedia "10 mensagens distintas (IDs)", o que contradiz o requisito; só foi corrigido nesta consolidação.
- **Defeito de formatação antigo.** Um bloco de código não fechado no `QA_CHECKLIST.md` (seção US-05) fazia todo o conteúdo de US-06 até a seção 9 aparecer como código. Corrigido agora.

### 10.4 Divergências encontradas

| Divergência | Como foi tratada |
|---|---|
| SDK 57 anunciado × SDK 58 instalado | Mantido o 58 (DEC-019); Expo Go não verificado (RISK-014) |
| `AGENTS.md` do template exige Expo Router × arquitetura com Home única | Arquivo não copiado (DEC-020) |
| US09-P02 "10 IDs distintos" × US-09 "10 consultas" | Redação corrigida para eventos de consulta |
| Card: spec pede `aspectRatio` 4:5 × código usa `minHeight` 4:5 | Escolha do Frontend para não cortar texto com fonte ampliada, coerente com a exceção de acessibilidade da própria spec |
| Spec prevê `forwardRef` no card × código sem `ref` | Pendente com US-07 |
| UX e QA leram os documentos no espelho do Google Drive × referência é o repositório local | Conteúdo conferido: mesmas 18 mensagens e mesmas medidas. Divergências apenas nominais nos pedidos (`app/source/data/...`, `messagens.json`) |
| Espelho do Drive inclui `node_modules` (≈ 411 MB locais) × Git não versiona a pasta | Sem impacto no Git; recomendação na seção 11.3 |
| README v4.5 dizia que `app/` não existia | Corrigido no README v5.0 |

### 10.5 Decisões humanas

**Realizadas:**

- Aprovação integral das 18 mensagens, incluindo as 4 sinalizadas (DEC-018, 03/11/2026).
- Promoção da versão documental para 5.0 sem tocar na versão técnica do app (DEC-025), conforme orientação do responsável na consolidação.

**Necessárias:**

- Aprovar ou ajustar a identidade visual proposta (DEC-024).
- Confirmar a política de IDs duplicados (DEC-021).
- Disponibilizar um Android físico (ou emulador) para a primeira execução e para o spike de share.
- Autorizar commit e tag `ep05-v5.0`.

### 10.6 Trade-offs

- **SDK mais novo × compatibilidade com Expo Go:** ficar no 58 evita rebaixar e passa em todas as checagens, mas pode exigir build de desenvolvimento para testar no aparelho.
- **Card que cresce × proporção fixa para captura:** priorizou-se não cortar texto com fonte ampliada; o custo é uma captura possivelmente fora de 4:5 (RISK-018).
- **Validação por script × testes em tela:** rápido e reproduzível, mas cego para layout e interação.
- **Diagnóstico em `__DEV__` × tela de histórico:** prova a US-09 sem inflar o escopo com a US-10; exige disciplina para remover a instrumentação antes da build.
- **Tokens provisórios aplicados × esperar aprovação:** destrava a implementação; o retrabalho fica concentrado em um arquivo (`theme.ts`).

### 10.7 Aprendizados aplicáveis a outros projetos

1. Peça a agentes de conteúdo um formato que uma máquina consiga checar (schema + script). Isso separa o debate de formato do debate de qualidade, que continua humano.
2. Exija rótulos de status nos entregáveis: proposto, implementado, testado, validado. Sem isso, "pronto" vira opinião.
3. Leia os arquivos que o gerador de projeto traz. O `AGENTS.md` do template carregava uma regra de arquitetura contrária à decisão do projeto.
4. Desconfie de correções automáticas de segurança: leia o que o `--force` vai instalar.
5. Defina a unidade de medida antes de escrever o teste ("consulta" ou "mensagem"?).
6. Verificação estática não substitui ver o app rodando. Planeje o ambiente de execução (aparelho, emulador) como dependência da rodada, não como detalhe.
7. Um PMO que reexecuta os comandos transforma "o agente disse" em "foi reproduzido".

### 10.8 Evidências disponíveis para o artigo

- `app/src/data/messages.json` — exemplos: `msg-013` "Pedi uma resposta ao universo. Ele mandou um 'visualizado'." (humorística, 59 caracteres); `msg-001` "Até a janela fechada guarda um pedaço de céu." (poética); `msg-009` "Se uma palavra insistir em aparecer, talvez mereça atenção." (mística, 59 caracteres).
- Saída de `npm run check:messages` (seção 6.1).
- Saída do `npm audit` com a linha "Will install expo@53.0.11, which is a breaking change".
- `docs/UX_UI_Especificacao_Minima.md` — wireframe textual e tabela de tokens.
- `docs/QA_US09_Estrategia_Evidencia_EP05.md` — fixture E11 que reutiliza `msg-001` para provar FIFO por evento.
- `app/src/components/MessageCard.tsx` — comentário sobre `minHeight` em vez de `aspectRatio`.
- `app/src/theme/theme.ts` — comentário "pending human approval".
- Commits `ea9f2bc` e `353b898`; `docs/TASKS.md` §18.1; `docs/DECISIONS.md` DEC-018 a DEC-025; `docs/RISKS.md` RISK-014 a RISK-018.

Não há capturas de tela do app: ele nunca foi aberto.

### 10.9 Continuidade técnica sugerida para o EP.06

1. Primeira execução observada (emulador, Expo Go ou build de desenvolvimento) com capturas de tela; fechar TASK-SCAFFOLD-01.
2. Spike de compartilhamento em Android físico: `ref` no card, captura, `expo-sharing`, fallback em texto.
3. Histórico local com serialização de gravações e execução dos 10 casos do QA.
4. Aprovação da identidade visual e da política de IDs duplicados.
5. `eas.json`, build interna e checklist go/no-go.

---

## 11. Encerramento e versionamento

### 11.1 Versões

| Item | Valor |
|---|---|
| Versão de entrada (`app.version`) | 4.5 |
| Versão consolidada (`app.version`) | 5.0 |
| Versão técnica do app (`app/package.json`, `app/app.json`) | 1.0.0 — inalterada (DEC-025) |

### 11.2 Arquivos atualizados nesta consolidação

| Arquivo | Alteração |
|---|---|
| `app.version` | 4.5 → 5.0 |
| `README.md` | Marco EP.05 — Versão 5.0; estado real; árvore de diretórios; novos documentos |
| `docs/TASKS.md` | Avaliação da TASK-SCAFFOLD-01; seção 18.1 (status EP.05); seção 20 (sequência EP.06) |
| `docs/DECISIONS.md` | DEC-018 a DEC-025 e quadro de situação |
| `docs/RISKS.md` | Atualizações de RISK-001/005/008/009/011/013; RISK-014 a RISK-018; resumo |
| `docs/QA_CHECKLIST.md` | US09-P02 corrigido; método da US-09 referenciado; bloco de código fechado; título 9.4 duplicado removido; seção 13 (estado de execução) |
| `docs/ARCHITECTURE.md` | Critério "scaffold criado" marcado, com ressalva de runtime |
| `docs/IMPLEMENTATION_MAP.md` | Seção 11.1 com o estado após o EP.05 |
| `docs/DIARY.md` | Entrada de 03/11/2026 e status da jornada |
| `docs/EP05_EXECUTION_REPORT.md` | Criado (este documento) |

Não alterados: código em `app/`, `messages.json`, `package.json`, `app.json`, ADRs, `UX_UI_Especificacao_Minima.md`, `QA_US09_Estrategia_Evidencia_EP05.md`.

Documentos com trechos desatualizados, mantidos como registro e com atualização proposta para uma próxima rodada: `docs/BACKLOG.md` §9 (próximos passos anteriores ao EP.05) e `docs/PROJECT_CONTEXT.md` §17–18 (o roteiro editorial original chama o EP.05 de "Organizando backlog e board", e o diário interno ainda aponta "criar os agentes IA").

### 11.3 Higiene do repositório

- Não existe `.gitignore` na raiz; `app/.gitignore` cobre `node_modules/`, `.expo/`, `dist/`, `web-build/`, chaves (`*.jks`, `*.p8`, `*.p12`, `*.key`, `*.pem`), `.env*.local` e pastas nativas `/ios` e `/android`.
- Verificado: nenhum `node_modules`, `.expo`, `.env`, chave ou credencial rastreado no Git.
- Lacunas propostas (não aplicadas): ignorar também `.env` (sem sufixo `.local`) e artefatos de build local (`*.apk`, `*.aab`) em `app/.gitignore`; avaliar um `.gitignore` mínimo na raiz.
- Para os próximos episódios, compartilhar com o chat editorial um pacote gerado a partir do Git, contendo apenas arquivos versionados — por exemplo, `git archive --format=zip -o oraculo-paf-ep05.zip HEAD` após o commit — em vez de copiar a pasta de trabalho com `node_modules`.

### 11.4 Testes executados nesta consolidação

typecheck, `check:messages`, `expo-doctor`, `expo install --check`, `npm audit` (leitura) e export Android em `/tmp`. Todos detalhados na seção 6.1. Nenhum teste funcional, de UI ou em Android.

### 11.5 Situação do Git

As alterações desta consolidação estão no diretório de trabalho, **sem commit, sem tag e sem push**. Sugestão, mediante aprovação:

- commit: `docs(ep05): consolidate EP.05 and promote app.version to 5.0`
- tag anotada: `ep05-v5.0`

A versão documental 5.0 é válida localmente independentemente da tag.

### 11.6 Pendências que seguem para o EP.06

Execução observada do app; US-07; US-09 com os 10 casos do QA; aprovação da identidade visual; confirmação da política de IDs duplicados; verificação do Expo Go com SDK 58; US-13 e seção 9 do checklist.

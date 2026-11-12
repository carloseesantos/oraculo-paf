# EP.05 — Handoff editorial do capítulo 5

- **Projeto:** ORÁCULO PAF · **Série:** Do Zero ao Produto · **Newsletter:** Papo de Gerente
- **Episódio:** EP.05 — Do backlog à execução: colocando nosso time de agentes IA para trabalhar
- **Preparado por:** PMO / Project Manager Agent (Cursor), em 12/11/2026
- **Base auditada:** branch `main`, HEAD `2ce3ffa`, tag `ep05-v5.0`, `app.version = 5.0`
- **Uso:** material de apoio para escrever o capítulo 5 em outro chat. **Não é o artigo.** Todas as afirmações abaixo têm classificação de evidência; na dúvida, consulte a matriz da seção 12 e a lista de afirmações proibidas da seção 13.

Documentos relacionados: `docs/EP05_EXECUTION_REPORT.md` (registro operacional e auditoria), `docs/TASKS.md` §18.1–18.2 (estado por tarefa), `docs/DECISIONS.md` (DEC-018 a DEC-025), `docs/RISKS.md` (RISK-014 a RISK-018).

---

## 1. Identificação e tese narrativa

**Produto.** Micro-app mobile: o usuário abre o aplicativo, toca em **Consultar**, recebe uma mensagem poética, mística ou humorística em um card e pode compartilhá-lo. Sem login, sem backend, sem IA generativa no aplicativo; a IA atua no processo de construção.

**Hipótese do MVP.** Usuários irão se identificar com mensagens rápidas, poéticas, místicas ou humorísticas a ponto de querer compartilhar o card gerado (DEC-002).

**Objetivo do EP.05.** Sair do planejamento e chegar à primeira implementação técnica, com quatro agentes especializados trabalhando a partir do backlog, do mapa de implementação e dos ADRs, e um PMO consolidando o resultado.

**Título de trabalho (sugestão, não decisão editorial aprovada):**
*Do backlog ao primeiro código: cinco agentes, um produto e uma lição sobre evidências.*

**Tese narrativa proposta.** O EP.05 produziu avanço técnico real: conteúdo aprovado, especificação visual, estratégia de teste e código que compila e empacota. O mesmo episódio mostrou a distância entre "existe código" e "o produto funciona para alguém". O app nunca foi visto rodando, e o recurso que testa a hipótese, o compartilhamento, ainda não existe.

---

## 2. Resumo factual

1. Em 13/07/2026 o repositório recebeu um commit inicial mínimo (`ee8fb67`). *(Git)*
2. Em 30/07/2026 entraram contexto, agentes, backlog, arquitetura, decisões, riscos, diário e ADR-001 a ADR-005 (`3090728`, merge `1597bcc`). *(Git)*
3. Segundo o diário, o QA Agent criou o checklist em 25/08/2026 e o Architect criou o mapa de implementação em 27/08/2026. Esses arquivos só entraram no Git em 03/11/2026. *(relatado; datas não confirmáveis pelo Git)*
4. O planejamento chegou à versão documental 4.5. A data da passagem de 4.4 para 4.5 é desconhecida; `app.version` aparece pela primeira vez no Git já com 4.5.
5. No EP.05, o Storyteller gerou 18 mensagens, seis por tom, e sinalizou quatro para atenção editorial. A data exata da geração não está registrada.
6. Em 03/11/2026 o responsável pelo produto aprovou as 18 mensagens, incluindo as quatro sinalizadas, sem substituições (DEC-018). *(registro do PMO)*
7. Também com data de 03/11/2026, UX/UI e QA entregaram suas especificações. *(data escrita nos próprios documentos)*
8. Às 21:01 de 03/11/2026, o commit `ea9f2bc` versionou os três entregáveis e a base documental 4.5. *(Git)*
9. O Frontend criou o projeto Expo SDK 58 e a primeira fatia Must. Os arquivos locais têm horários entre 19:23 e 19:36; o commit `353b898` é das 21:27. *(Git; horários de arquivo são apenas indício)*
10. O PMO reexecutou as verificações estáticas, atualizou a documentação e promoveu a versão para 5.0. Commit `2ce3ffa` às 22:02 e tag `ep05-v5.0` às 22:02:14, ambos do responsável e depois publicados no remoto. *(Git)*
11. Ninguém abriu o aplicativo em emulador, Expo Go ou Android físico. *(relatado e confirmado pela ausência de evidência e de ferramentas)*
12. Em 12/11/2026, a auditoria do PMO confirmou o Git e reproduziu typecheck, script de checagens e export Android. Ela encontrou patches do SDK 58 desatualizados e criou este handoff. *(execução nesta auditoria)*

---

## 3. Contexto de entrada

**O que existia no fim do planejamento (versão 4.5):** visão e hipótese (`PROJECT_CONTEXT.md`), oito agentes com papéis e limites (`AGENTS.md`), backlog revisado com MoSCoW (`BACKLOG.md`, `BACKLOG_REVIEW.md`), tarefas e dependências (`TASKS.md`), checklist de QA (`QA_CHECKLIST.md`), arquitetura client-only (`ARCHITECTURE.md`), mapa história → arquivos (`IMPLEMENTATION_MAP.md`), DEC-001 a DEC-017 e ADR-001 a ADR-005.

**O que não existia:** pasta `app/`, base de mensagens, especificação visual e método para provar a US-09 sem tela de histórico.

**Escopo Must:** US-01, US-02, US-04, US-05, US-06, US-07, US-09, US-12, US-13. **Should:** US-03, US-10, US-11. **Could:** US-08. Regra explícita: US-09 (persistir 10 consultas) é Must; US-10 (visualizar histórico) é Should e não é pré-requisito para validar a US-09.

**Propósito de cada agente na rodada (`TASKS.md` §17):**

| Agente | Tarefa | Dependência |
|---|---|---|
| Storyteller | TASK-US05-01/02, TASK-US04-02: base curada, mínimo de 15 mensagens e 5 por tom (DEC-017) | Schema de `ARCHITECTURE.md` §5 |
| UX/UI | TASK-US01-01, TASK-US06-01, TASK-US12-01: Home, card único, tokens | Backlog, arquitetura, mensagens reais |
| QA | TASK-US09-03: como provar persistência, limite 10 e FIFO sem US-10 | ADR-004 e contrato `HistoryEntry` (sem esperar o código) |
| Frontend Mobile (Cursor) | TASK-SCAFFOLD-01 e primeira fatia Must | Pode começar em paralelo; integra conteúdo/UX revisados |
| PMO | Consolidar sem marcar nada como pronto sem evidência | Saídas dos quatro agentes |

**Primeira fatia técnica escolhida:** `scaffold → tipos → JSON curado → messagesService → consulta offline na Home` (`TASKS.md` §19). A prova da hipótese, o compartilhamento em Android real, ficou explicitamente para depois.

**Limite deste handoff:** o conteúdo editorial do EP.04 não está no repositório. O README apenas resume que o EP.04 tratou da transformação do backlog em critérios testáveis, tarefas e mapa técnico. Não há como confirmar aqui o que foi publicado.

---

## 4. Cinco handoffs individuais

### 4.1 Storyteller Agent

| Item | Registro |
|---|---|
| Missão | Criar e organizar mensagens curtas, poéticas, místicas e humorísticas, compartilháveis (`AGENTS.md` §9) |
| Insumos | `TASKS.md` §17; schema de `ARCHITECTURE.md` §5; DEC-017. O texto do prompt não está versionado |
| Artefatos | `app/src/data/messages.json`: 18 registros, IDs `msg-001`…`msg-018`, 16 categorias, todos `shareable: true` |
| Evidências | Commit `ea9f2bc`; `npm run check:messages` 17/17 em 03/11 (PMO) e de novo em 12/11 (auditoria); contagem independente em 12/11 |
| Problemas | O próprio agente sinalizou quatro mensagens para atenção editorial. Quais foram não está registrado |
| Correções | Nenhuma alteração de conteúdo; o arquivo não mudou desde `ea9f2bc` |
| Decisões humanas | **DEC-018:** aprovação integral das 18 mensagens, incluindo as quatro sinalizadas, em 03/11/2026 |
| Concluído | Base curada, aprovada e integrada ao app; 18 contra o mínimo de 15 |
| Pendente | Legibilidade no card e em Android (TASK-US05-03); teste da hipótese com pessoas |

### 4.2 UX/UI Agent

| Item | Registro |
|---|---|
| Missão | Experiência simples, emocional, clara e compartilhável (`AGENTS.md` §7) |
| Insumos | Contexto, agentes, backlog, arquitetura, mapa, tarefas, checklist, riscos e mensagens aprovadas, lidos no espelho do Google Drive (§1 da especificação) |
| Artefatos | `docs/UX_UI_Especificacao_Minima.md`: três estados da Home, wireframe textual, `MessageCard` único 4:5, área capturável só com fundo, marca e texto, Compartilhar fora da captura, tokens, acessibilidade e handoff ao Frontend |
| Evidências | Documento no commit `ea9f2bc`. Contrastes calculados a partir dos valores hexadecimais (16,98:1; 11,95:1; 7,27:1), não medidos em tela. Os tokens aparecem com os mesmos valores em `app/src/theme/theme.ts` |
| Problemas | Divergências nominais no pedido (`app/source/data/...`). Para não cortar texto com fonte ampliada, o código usa `minHeight` 4:5 em vez de `aspectRatio`, como a própria exceção de acessibilidade da especificação permite. A `ref` de captura (`forwardRef`) não foi implementada |
| Correções | Nenhuma na especificação; as adaptações foram feitas no código |
| Decisões humanas | **Nenhuma.** Os tokens foram aplicados como defaults provisórios (DEC-024) |
| Concluído | Especificação documentada. Estados A (inicial) e C (falha segura) implementados; estado B (mensagem) parcial, sem botão Compartilhar |
| Pendente | Aprovação da identidade; testes com TalkBack, fonte em 130% e 150% e larguras de 320, 360 e 412 dp; `ShareButton`; `ref` |

### 4.3 QA Agent

| Item | Registro |
|---|---|
| Missão | Testabilidade e validação contra critérios de pronto (`AGENTS.md` §8) |
| Insumos | ADR-004, contrato `HistoryEntry`, checklist, tarefas, especificação UX e mensagens aprovadas, lidos no espelho do Google Drive |
| Artefatos | `docs/QA_US09_Estrategia_Evidencia_EP05.md`: método principal (diagnóstico em `__DEV__` com AsyncStorage real, fixtures e force-stop/reabertura) e alternativo (inspeção do storage); 7 pré-requisitos ao Frontend; fixtures E01…E11, R01 e R02; 10 casos; 3 camadas de evidência; modelo de relatório |
| Evidências | Documento no commit `ea9f2bc`. **Os 10 casos estão NOT RUN** porque não existe `historyService` |
| Problemas | Descobriu que a unidade do histórico é o **evento de consulta**, não a mensagem; o cenário US09-P02 do checklist pedia "10 mensagens distintas (IDs)". A política para falhas de storage não consta dos ADRs |
| Correções | O PMO corrigiu US09-P02 para "eventos de consulta" em 03/11 (commit `2ce3ffa`) |
| Decisões humanas | Nenhuma registrada. O método foi adotado pelo PMO como DEC-023 |
| Concluído | Estratégia de evidência documentada, sem promover US-10 a Must |
| Pendente | Execução dos 10 casos depois da TASK-US09-02; confirmar a política de falhas |

### 4.4 Frontend Mobile Agent (Cursor)

| Item | Registro |
|---|---|
| Missão | Implementar o app em Expo, React Native e TypeScript com código simples (`AGENTS.md` §6) |
| Insumos | `TASKS.md` §17 e §15, `IMPLEMENTATION_MAP.md`, `ARCHITECTURE.md`, ADRs e os três entregáveis de `ea9f2bc` |
| Artefatos | Commit `353b898` com 23 arquivos: configuração Expo, 6 assets do template, `scripts/check-messages.mjs` e 9 arquivos-fonte em `app/src` (380 linhas): tipos, validação, sorteio, `messagesService`, `useOracleMessage`, `HomeScreen`, `ConsultButton`, `MessageCard`, `theme` |
| Evidências | Relatadas pelo agente: typecheck exit 0; 17/17; `expo-doctor` 20/20; `expo install --check` ok; export Android de 634 módulos; Metro com HTTP 200 (762 módulos). Reproduzidas pelo PMO em 03/11, exceto o Metro. Reproduzidas de novo em 12/11: typecheck, 17/17 e export |
| Problemas | O gerador anunciou SDK 57 e instalou SDK 58. O `AGENTS.md` do template exigia Expo Router. `npm audit` apontou 5 alertas moderados, cuja correção `--force` instalaria `expo@53.0.11`. Não havia `adb`, emulador nem aparelho. Haverá risco de reentrância quando o histórico assíncrono entrar |
| Correções e escolhas | Manteve o SDK 58 (DEC-019); deixou de fora o `AGENTS.md` do template (DEC-020); validação com falha segura (DEC-021); adicionou só `react-native-safe-area-context` (DEC-022); card com `minHeight` |
| Decisões humanas | Nenhuma registrada item a item; houve aceite implícito pelo commit do responsável |
| Concluído | Scaffold e primeira fatia Must implementados e verificados estaticamente |
| Pendente | Primeira execução observada; US-07, US-09 e US-13; `ref` de captura |

### 4.5 PMO / Project Manager Agent

| Item | Registro |
|---|---|
| Missão | Rastreabilidade entre decisões, riscos, tarefas, entregáveis e diário (`AGENTS.md` §10) |
| Insumos | Repositório local, relatos dos agentes e documentos de gestão |
| Artefatos (03/11) | `EP05_EXECUTION_REPORT.md`; DEC-018 a DEC-025; RISK-014 a RISK-018; `TASKS.md` §18.1 e §20; correções no checklist (US09-P02, bloco de código não fechado, título 9.4 duplicado); `app.version` 4.5 → 5.0. Commit `2ce3ffa` |
| Artefatos (12/11) | Seção 12 do relatório, `TASKS.md` §18.2, quadro de origem das decisões, atualização de RISK-015 e RISK-016 e este handoff |
| Evidências | Comandos reexecutados (seção 10); `git log`, `git show` e `git ls-remote` |
| Problemas | Em 03/11 o relatório registrou "sem commit e sem tag", mas o responsável versionou depois. Tarefas apareciam como `done` sem execução no app |
| Correções | Reclassificação por estados explícitos e registro da situação real do Git, sem apagar o histórico |
| Decisões humanas | **DEC-025** (versão 5.0); commit e tag feitos pelo responsável |
| Concluído | Consolidação versionada e auditoria documental |
| Pendente | Ratificação humana de DEC-019 a DEC-023; revisão e commit desta auditoria |

---

## 5. Linha do tempo auditável

### 5.1 Antecedentes e execução original

| Data e hora (-0300) | Responsável | Evento | Artefato ou commit | Fonte |
|---|---|---|---|---|
| 13/07/2026 22:53 | Responsável | Commit inicial | `ee8fb67` | Git |
| 30/07/2026 15:34–15:36 | Responsável + agentes de planejamento | Base documental e ADRs | `3090728`, `1597bcc` (PR #1) | Git |
| 25/08/2026 | QA Agent | `QA_CHECKLIST.md` | entrou no Git em `ea9f2bc` | `DIARY.md` (relatado) |
| 27/08/2026 | Software Architect | `IMPLEMENTATION_MAP.md` | entrou no Git em `ea9f2bc` | `DIARY.md` (relatado) |
| Desconhecida | — | Passagem da versão 4.4 para 4.5 | `app.version` 4.5 em `ea9f2bc` | Git (só o resultado) |
| Desconhecida (até 03/11) | Storyteller | 18 mensagens e 4 sinalizadas | `messages.json` | Relatório EP.05 |
| 03/11/2026 | Responsável pelo produto | Aprovação das 18 mensagens | DEC-018 | Registro do PMO |
| 03/11/2026 | UX/UI Agent | Especificação mínima | `UX_UI_Especificacao_Minima.md` | Data no documento |
| 03/11/2026 | QA Agent | Estratégia da US-09 | `QA_US09_Estrategia_Evidencia_EP05.md` | Data no documento |
| 03/11/2026 ~19:23–19:36 | Frontend Mobile | Scaffold e verificações | arquivos em `app/` | Horários de arquivo (indício) |
| 03/11/2026 21:01 | Responsável | Versiona entregáveis e base 4.5 | `ea9f2bc` | Git |
| 03/11/2026 21:27 | Responsável | Versiona o scaffold e a primeira fatia | `353b898` | Git |
| 03/11/2026 22:02 | Responsável (sobre trabalho do PMO) | Consolidação; `app.version` 5.0 | `2ce3ffa` | Git |
| 03/11/2026 22:02 | Responsável | Tag anotada | `ep05-v5.0` (também no remoto) | Git |

### 5.2 Auditoria posterior

| Data | Responsável | Evento | Artefato | Fonte |
|---|---|---|---|---|
| 12/11/2026 | PMO (Cursor) | Auditoria do Git; reexecução de typecheck, 17/17, export e `expo install --check` | `EP05_EXECUTION_REPORT.md` §12 | Execução nesta auditoria |
| 12/11/2026 | PMO (Cursor) | Reconciliação documental e este handoff | diff não commitado | Working tree |

---

## 6. Participação humana

**Registrada:**

- **Aprovação integral das 18 mensagens pelo responsável pelo produto**, incluindo as quatro sinalizadas pelo Storyteller, sem substituições, em 03/11/2026 (DEC-018). A IA escreveu e verificou o formato; a decisão editorial foi humana.
- Orientação para consolidar a versão documental 5.0 sem alterar a versão técnica do app (DEC-025).
- Autoria dos três commits do EP.05 e da tag `ep05-v5.0`, e publicação no remoto.

**Não atribuir ao humano sem nova evidência:**

- Aprovação dos tokens visuais e da identidade (DEC-024 é provisória).
- Aprovação da política de IDs duplicados (provisória em DEC-021).
- Aprovação item a item das decisões técnicas DEC-019 a DEC-023. O commit indica aceite do conjunto, não revisão de cada decisão.
- Qualquer teste manual do app: não houve.

---

## 7. Exemplos concretos do produto

Três mensagens reais de `app/src/data/messages.json`, uma por tom:

| ID | Tom | Categoria | Texto literal | Caracteres |
|---|---|---|---|---|
| `msg-001` | poética (`poetica`) | possibilidades | "Até a janela fechada guarda um pedaço de céu." | 45 (a mais curta) |
| `msg-007` | mística (`mistica`) | sinais | "O próximo sinal pode chegar vestido de coincidência." | 52 |
| `msg-015` | humorística (`humoristica`) | sorte | "A sorte está a caminho. Pegou trânsito, aparentemente." | 54 |

**Referências de comprimento (contagem confirmada em 12/11/2026):**

- `msg-009` (mística): "Se uma palavra insistir em aparecer, talvez mereça atenção." — 59 caracteres.
- `msg-013` (humorística): "Pedi uma resposta ao universo. Ele mandou um 'visualizado'." — 59 caracteres.

São as duas mais longas da base. O UX/UI as definiu como textos de teste obrigatórios para o card, e elas sustentam a RISK-018 (fonte ampliada e captura). A contagem é de caracteres Unicode com espaços e pontuação; não é um limite de produto.

Outros elementos citáveis: a falha segura da Home exibe "Não foi possível carregar as mensagens desta versão." e desabilita Consultar; o estado inicial exibe "Sua mensagem aparecerá aqui." (`HomeScreen.tsx`).

---

## 8. Principal conflito narrativo

O episódio deve separar seis níveis de evidência que costumam ser confundidos:

| Nível | O que significa | Onde o EP.05 chegou |
|---|---|---|
| 1. Gerar artefatos | Documentos, JSON, especificações | **Sim:** mensagens, especificação UX, estratégia QA |
| 2. Implementar código | O código existe no repositório | **Sim, em parte:** US-01, US-02, US-04, US-05; US-06 e US-12 parciais |
| 3. Passar por verificações estáticas | Compila, valida dados, empacota | **Sim:** typecheck, 17/17, bundle de 634 módulos (reproduzidos em 12/11) |
| 4. Executar o aplicativo | Alguém vê a tela e toca no botão | **Não** |
| 5. Validar em dispositivo | Critérios aceitos em Android físico | **Não** |
| 6. Comprovar a hipótese | Pessoas se identificam e compartilham | **Não**, e o compartilhamento ainda não tem código |

O avanço técnico foi real: os níveis 1 a 3 foram atingidos com evidência reproduzível. O MVP **não** foi validado. O conflito é exatamente esse: o projeto estava organizado para não confundir os níveis, e ainda assim a documentação de status chegou a marcar tarefas como `done` sem execução no app. A auditoria corrigiu isso com estados explícitos.

---

## 9. Acertos, erros e aprendizados

**Curadoria automática seguida de aprovação humana.** O Storyteller entregou um formato que uma máquina consegue checar (schema e script). Isso separou o debate de formato, resolvido por script, do debate de qualidade, decidido pelo humano. O agente também sinalizou as quatro mensagens sobre as quais tinha dúvida.

**Base mínima superada.** DEC-017 exigia 15 mensagens, 5 por tom. Vieram 18, com 6 por tom, todas aprovadas.

**UX concentrado em uma Home e um card.** Três estados, um template e tokens mínimos, com a ressalva escrita de que os contrastes eram cálculo, não medição. A especificação rotulou cada decisão como proposta, condicionada ou teste pendente.

**QA da persistência sem tela de histórico.** Antes de existir código, o QA definiu a unidade do histórico (evento de consulta) e encontrou uma contradição no próprio checklist. Também evitou que a US-10 virasse obrigatória só para servir de prova.

**Primeira implementação Expo.** O scaffold seguiu a árvore planejada e ficou restrito à cadeia Must. Entrou uma única dependência além do template, com justificativa.

**Divergências e restrições do ambiente.** O gerador anunciou SDK 57 e instalou o 58. O `AGENTS.md` do template impunha Expo Router, contrário à decisão de uma Home única. O ambiente não tinha aparelho nem emulador. Em 12/11, a mesma verificação de dependências que passava em 03/11 passou a acusar patches novos: o ambiente muda mesmo sem ninguém mexer no código.

**Decisões para evitar expansão de escopo.** O agente recusou o `npm audit fix --force`, que rebaixaria o Expo cinco versões, e deixou de fora o Expo Router. Não criou tela de histórico nem navegação.

**Limites das verificações estáticas.** Typecheck, 17/17 e bundle dizem que o código compila e empacota. Não dizem que o botão aparece, que o texto cabe ou que o toque funciona.

**Erros reais registrados:**

- A interface nunca foi vista.
- O núcleo da hipótese (US-07) ficou sem código.
- O checklist tinha uma contradição (US09-P02) e um bloco de código não fechado; o PMO corrigiu os dois em 03/11.
- O relatório de 03/11 afirmou "sem commit e sem tag", situação superada no mesmo dia.
- O status `done` foi usado para código não executado.
- A terminologia ficou inconsistente: "10 mensagens" em DEC-008 e ADR-004, contra "10 eventos de consulta" em DEC-023.

**Aprendizados aplicáveis:**

1. Peça a agentes de conteúdo um formato verificável por máquina.
2. Use estados explícitos (documentado, implementado, verificado estaticamente, testado em runtime, validado) em vez de `done`.
3. Leia os arquivos que o gerador de projeto traz.
4. Leia o que um `--force` vai instalar.
5. Defina a unidade de medida antes de escrever o teste.
6. Trate o ambiente de execução (aparelho ou emulador) como dependência da rodada.
7. Reexecutar os comandos transforma "o agente disse" em "foi reproduzido"; reexecutar dias depois revela deriva.

---

## 10. Quadro numérico

Somente números sustentados por arquivo, Git ou comando executado.

| Métrica | Valor | Fonte |
|---|---|---|
| Mensagens na base | 18 | `messages.json`; `check:messages` (12/11) |
| Por tom (poética / mística / humorística) | 6 / 6 / 6 | idem |
| IDs válidos / únicos / rejeitados | 18 / 18 / 0 | idem e contagem independente |
| Categorias distintas | 16 | contagem independente (12/11) |
| Maior e menor mensagem | 59 (`msg-009`, `msg-013`) / 45 (`msg-001`) | contagem independente (12/11) |
| Mínimo exigido pela DEC-017 | 15 (5 por tom) | `DECISIONS.md` |
| Mensagens aprovadas pelo humano | 18 de 18 (4 sinalizadas, 0 substituídas) | DEC-018 |
| Checagens do script | 17: 3 sobre o JSON real, 11 de validação, 3 de sorteio; 17 PASS | `check-messages.mjs`; execução em 12/11 |
| Casos de QA planejados para a US-09 | 10, todos NOT RUN | `QA_US09_Estrategia_Evidencia_EP05.md` |
| Fixtures / pré-requisitos / camadas de QA | 13 (E01–E11, R01, R02) / 7 / 3 | idem |
| Estados da Home / templates de card | 3 / 1 | especificação UX; `HomeScreen.tsx` |
| Módulos no export Android | 634 (03/11 e 12/11) | execução |
| Módulos no bundle de desenvolvimento | 762 | relatado pelo Frontend; não reexecutado |
| `expo-doctor` | 20/20 | relatado em 03/11; não reexecutado |
| Vulnerabilidades moderadas (`npm audit`) | 5 | relatado em 03/11; não reexecutado |
| Expo / React Native / React / TypeScript | 58.0.23 / 0.88.1 / 19.3.0 / 6.0.3 | `package.json` |
| Patches esperados em 12/11 | `expo ~58.0.25`, `expo-status-bar ~58.0.5` | `expo install --check` |
| Dependências adicionadas além do template | 1 (`react-native-safe-area-context`) | `package.json`; DEC-022 |
| Versão documental / versão técnica do app | 5.0 / 1.0.0 | `app.version`; `package.json`, `app.json` |
| Commits do EP.05 / tags | 3 (`ea9f2bc`, `353b898`, `2ce3ffa`) / 1 (`ep05-v5.0`) | Git |
| Arquivos por commit | 14 / 23 / 10 | `git show --stat` |
| Arquivos-fonte em `app/src` (TS/TSX) | 9 arquivos, 380 linhas | `wc -l` |
| Decisões registradas no EP.05 | 8 (DEC-018 a DEC-025), 2 com aprovação humana registrada | `DECISIONS.md` |
| Riscos criados no EP.05 | 5 (RISK-014 a RISK-018) | `RISKS.md` |
| Testes em runtime / em Android / com usuários | 0 / 0 / 0 | ausência de evidência |
| Cenários da seção 9 do checklist preenchidos | 0 | `QA_CHECKLIST.md` |

Não existem números de usuários, conversões, compartilhamentos, retenção, tempo de execução por agente ou desempenho.

---

## 11. Rastreabilidade das decisões

| Decisão | User stories | Tarefas | Riscos | Fonte |
|---|---|---|---|---|
| DEC-017: mínimo de 5 por tom | US-05 | TASK-US05-01 | RISK-005 | `DECISIONS.md` |
| DEC-018: aprovação das 18 mensagens | US-04, US-05 | TASK-US05-01/02, TASK-US04-02 | RISK-005, RISK-013 | `DECISIONS.md`; `ea9f2bc` |
| DEC-019: manter o SDK 58, sem `--force` | US-13 (indireto) | TASK-SCAFFOLD-01 | RISK-014, RISK-015 | `353b898` |
| DEC-020: sem Expo Router; Home única | US-01; US-10 fora | TASK-SCAFFOLD-01, TASK-US01-02 | RISK-003 | `App.tsx`; `353b898` |
| DEC-021: import estático validado; política de duplicados provisória | US-04, US-02 | TASK-US04-03/04 | RISK-013 | `validateMessage.ts`, `messagesService.ts` |
| DEC-022: safe area | US-01 | TASK-US01-02 | RISK-016 | `package.json` |
| DEC-023: evidência da US-09 por evento de consulta | US-09 (Must); US-10 (Should, fora) | TASK-US09-02/03 | RISK-002, RISK-017 | `QA_US09_Estrategia_Evidencia_EP05.md`; `2ce3ffa` |
| DEC-024: tokens provisórios | US-12, US-06 | TASK-US12-01/02 | RISK-008, RISK-018 | `theme.ts` |
| DEC-025: versão 5.0 separada da 1.0.0 | US-13 (futuro alinhamento) | — | — | `app.version`; tag `ep05-v5.0` |
| ADR-005: share de imagem com fallback em texto | US-07 | TASK-US07-01…03 | RISK-001, RISK-009 | ADR-005 (sem código ainda) |

---

## 12. Matriz de evidências

| Afirmação | Classificação | Evidência | Caminho ou commit | Ressalva |
|---|---|---|---|---|
| A base tem 18 mensagens, 6 por tom | Verificado por execução | `check:messages` em 12/11 | `app/src/data/messages.json` | — |
| O responsável aprovou as 18 mensagens | Aprovado pelo humano | Registro do PMO | DEC-018; `DIARY.md` 03/11 | A conversa de aprovação não está versionada |
| Quatro mensagens foram sinalizadas pelo Storyteller | Relatado anteriormente | Relatório e DEC-018 | `EP05_EXECUTION_REPORT.md` §3.1 | Quais foram não está registrado |
| `msg-009` e `msg-013` têm 59 caracteres | Verificado por execução | Contagem em 12/11 | `messages.json` | Contagem Unicode |
| O JSON não mudou desde a integração | Verificado por execução | `git diff --stat ea9f2bc HEAD` vazio | `ea9f2bc` | — |
| O app usa Expo SDK 58 com TypeScript estrito | Verificado em arquivo | `package.json`, `tsconfig.json` | `353b898` | — |
| O código compila | Verificado por execução | `npm run typecheck` rc 0 (12/11) | `app/` | Não prova comportamento |
| O bundle Android é gerado | Verificado por execução | Export de 634 módulos (12/11) | `/tmp`, fora do repositório | Não é build instalável nem execução |
| A Home tem três estados | Verificado em arquivo | `HomeScreen.tsx` | `353b898` | Nunca renderizada em execução |
| Pool vazio leva à falha segura | Verificado por execução (função) e em arquivo (UI) | Checagem "só inválidas → pool vazio"; `useOracleMessage` | `validateMessage.ts`, `HomeScreen.tsx` | Estado da UI não observado |
| Existe compartilhamento | Não comprovado (inexistente) | Sem `shareService`, `ShareButton` ou `expo-sharing` | `app/src` | US-07 pendente |
| Existe histórico local | Não comprovado (inexistente) | Sem `historyService` nem AsyncStorage | `app/src` | US-09 pendente |
| Existe configuração de build EAS | Não comprovado (inexistente) | `app/eas.json` ausente | — | US-13 pendente |
| O app foi aberto em algum dispositivo | Não comprovado | Nenhum registro; sem `adb` ou emulador | — | — |
| `expo-doctor` 20/20 | Relatado anteriormente | Relatório de 03/11 | §6.1 do relatório | Não reexecutado em 12/11 |
| Metro serviu o bundle (HTTP 200) | Relatado anteriormente | Relato do Frontend | §6.2 do relatório | Nem o PMO reexecutou |
| `npm audit`: 5 moderadas; `--force` instalaria `expo@53.0.11` | Relatado anteriormente | Relatório de 03/11 | §6.1 do relatório | Não reexecutado |
| As dependências estão em dia com o SDK | **Desatualizado** | `expo install --check` rc 1 (12/11) | `app/package.json` | Era verdade em 03/11 |
| O gerador anunciou SDK 57 e instalou o 58 | Relatado anteriormente | Relato do Frontend | DEC-019 | Saída original do gerador não versionada |
| O `AGENTS.md` do template exigia Expo Router | Relatado anteriormente | Relato do Frontend | DEC-020 | Arquivo não versionado (de propósito) |
| Tokens de UX aplicados | Verificado em arquivo | Mesmos valores da especificação | `theme.ts` | Provisórios (DEC-024) |
| Identidade visual aprovada | Proposto | — | DEC-024 | Sem aprovação humana |
| Contrastes ≥ 7,27:1 | Proposto (cálculo) | Especificação §4 | `UX_UI_Especificacao_Minima.md` | Não medidos em tela |
| Estratégia de evidência da US-09 definida | Verificado em arquivo | Documento do QA | DEC-023 | 10 casos NOT RUN |
| US-09 é Must e US-10 é Should | Verificado em arquivo | Backlog | `BACKLOG.md` §4 | — |
| Versão documental 5.0 | Verificado em arquivo + aprovado pelo humano | `app.version`; tag do responsável | `2ce3ffa`, `ep05-v5.0` | Não é release funcional |
| A consolidação foi publicada no remoto | Verificado por execução | `git status -sb`, `git ls-remote --tags` | `origin/main` | — |
| Datas de 25/08 e 27/08 dos artefatos do EP.04 | Relatado anteriormente | `DIARY.md` | — | Entraram no Git só em 03/11 |
| O Frontend trabalhou entre ~19:23 e 19:36 de 03/11 | Relatado (indício) | Horários de arquivo locais | `app/` | Horários podem mudar ao copiar arquivos |

---

## 13. Afirmações proibidas sem novas evidências

Não escrever que:

- o aplicativo está pronto;
- o MVP foi validado;
- a build Android foi instalada e testada;
- o compartilhamento está funcionando;
- o histórico local funciona;
- foram realizados testes com usuários;
- US-10 é Must;
- a versão 5.0 equivale a um release funcional.

Também evitar, pelos mesmos motivos:

- "o app roda no celular" ou "o app abre no Expo Go";
- "a identidade visual foi aprovada" ou "os contrastes foram testados";
- "todas as decisões foram aprovadas pelo responsável";
- "as dependências estão atualizadas";
- qualquer número de usuários, compartilhamentos, conversão ou desempenho;
- "a IA aprovou as mensagens" (a aprovação foi humana).

---

## 14. Roteiro editorial sugerido

Estrutura proposta, a ser decidida no chat editorial:

1. **A proposta de colocar agentes especializados para trabalhar.** Ponto de partida: planejamento completo na versão 4.5, sem nenhuma linha de código. Regra da rodada: nada é declarado validado sem evidência. Citar `TASKS.md` §17.
2. **O que cada agente recebeu e entregou.** Os quatro handoffs da seção 4, com um exemplo concreto por agente: as três mensagens da seção 7, o wireframe dos três estados, a fixture E11 que reutiliza `msg-001` para provar FIFO por evento, e a Home com "Consultar".
3. **A primeira implementação no Cursor.** SDK 57 anunciado e 58 instalado; o `AGENTS.md` do template com Expo Router; a linha "Will install expo@53.0.11"; uma única dependência nova.
4. **Problemas, escolhas e correções.** `minHeight` em vez de `aspectRatio`; US09-P02; política de duplicados provisória; tokens provisórios; patches que ficaram desatualizados em nove dias.
5. **A consolidação do PMO.** Reexecução dos comandos, versão 5.0, commit e tag, e a auditoria que encontrou `done` sem execução e "sem commit" já superado.
6. **A diferença entre entregar código e validar produto.** A escada da seção 8, como fecho conceitual.
7. **O gancho para o EP.06.** Abrir o app pela primeira vez e compartilhar o primeiro card em um Android de verdade.

---

## 15. Continuidade técnica (EP.06)

0. **Alinhar os patches do SDK 58, com autorização:** avaliar `npx expo install --fix` e reexecutar typecheck, 17/17, `expo-doctor` e `npm audit`, sem rebaixar o SDK (RISK-015, DEC-019).
1. **Primeira execução visual observada:** emulador, Expo Go (se compatível com o SDK 58, RISK-014) ou build de desenvolvimento; US01-P01…P03 e US02-P01…P03 com modo avião; capturas de tela. Fecha TASK-SCAFFOLD-01.
2. **Share e captura do card (US-07):** `ref` no `MessageCard`, `shareService`, `ShareButton` fora da área capturável e dependências via `npx expo install`; Android físico; fallback em texto (TASK-US07-02/03; RISK-009, RISK-018).
3. **Histórico local (US-09):** `history.types.ts` e `historyService.ts`, com gravações serializadas; executar US09-QA01…QA10 (TASK-US09-02/03; RISK-017). Sem tela de histórico.
4. **Build EAS e validação Android (US-13):** `eas.json`, build interna, seção 9 do checklist e decisão GO/NO-GO.
5. **Acessibilidade e legibilidade:** `msg-009`, `msg-013` e `msg-001` em fonte de 100%, 130% e 150%; larguras de 320, 360 e 412 dp; TalkBack (TASK-US05-03, TASK-US12-03).
6. **Decisões humanas pendentes:** identidade visual (DEC-024), política de IDs duplicados (DEC-021), ratificação de DEC-019 a DEC-023, disponibilização de aparelho ou emulador e alinhamento de patches.

---

## 16. Lacunas editoriais

Dados que não existem no repositório. Não preencher com suposições:

- Texto integral dos prompts usados com Storyteller, UX/UI e QA.
- Ferramenta ou modelo usado por Storyteller, UX/UI e QA. Sabe-se apenas que UX/UI e QA leram o espelho do Google Drive.
- Quais foram as quatro mensagens sinalizadas e o motivo de cada sinalização.
- Data e hora exatas da geração das mensagens e da aprovação humana.
- Tempo gasto por agente e tempo de revisão humana.
- Data da passagem de 4.4 para 4.5 e conteúdo publicado do EP.04.
- Se e quando o EP.05 foi publicado na newsletter.
- Capturas de tela do app: não existem, porque ele nunca foi aberto.
- Saída original do `create-expo-app` (SDK 57 contra 58) e do `npm audit`, que não estão versionadas.
- Métricas de uso, compartilhamento ou validação: inexistentes por definição nesta fase.

A ausência desses dados não bloqueia o capítulo. Basta apresentá-los como desconhecidos ou omiti-los.

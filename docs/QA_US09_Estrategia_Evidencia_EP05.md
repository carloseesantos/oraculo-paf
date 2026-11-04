# QA — Estratégia de evidência da US-09 | EP.05

**Projeto:** ORÁCULO PAF · **Agente:** QA Agent · **Data da especificação:** 03/11/2026  
**Versão de referência:** `app.version = 4.5` · **Situação:** método definido; testes empíricos **NOT RUN**.  
**Escopo:** US-09 (Must: persistir últimas dez consultas) sem exigir US-10 (Should: visualizar histórico).

## 1. Fontes verificadas e limites

Documentos consultados no Google Drive: `docs/PROJECT_CONTEXT.md`, `docs/AGENTS.md` (QA Agent), `docs/BACKLOG.md` (US-09/US-10), `docs/ARCHITECTURE.md` (HistoryEntry, fluxos 6.7/6.8 e seção 8), `docs/IMPLEMENTATION_MAP.md`, `docs/TASKS.md` (TASK-US09-01/02/03), `docs/QA_CHECKLIST.md` (US-09 e seção 9), `docs/adr/ADR-004-historico-local-limitado.md`, `docs/UX_UI_Especificacao_Minima.md` e `app/src/data/messages.json`.

**Divergências nominais resolvidas:** o pedido mencionou `app/src/data/messagens.json`, mas o arquivo oficial se chama `messages.json`. A especificação UX/UI foi localizada no Drive com o nome indicado acima. O conteúdo aprovado reúne 18 mensagens, seis por tom.

**Contrato aprovado:** cada `HistoryEntry` contém exatamente os atributos de domínio `messageId: string`, `text: string` (snapshot), `tone: "poetica" | "mistica" | "humoristica"` e `consultedAt: string` (ISO). AsyncStorage local; mais recente na posição 0; até dez eventos de consulta; a 11ª entrada remove a mais antiga; sem login, backend ou sincronização. A chave `@oraculo/history` é **exemplo da arquitetura**, não uma constante já implementada.

**Atenção:** o cenário `US09-P02` do checklist menciona “10 mensagens distintas (IDs)”. Para a US-09, a unidade correta é o **evento de consulta**: IDs repetidos são válidos em registros diferentes. Isso não altera a prioridade de US-03 nem transforma IDs únicos em requisito.

## 2. Método principal — diagnóstico de serviço com AsyncStorage real

**Escolha:** executar, exclusivamente em ambiente `__DEV__` e em instalação descartável, um roteiro temporário que chame o `historyService` real com **fixtures determinísticas** e produza snapshots estruturados de seus resultados e da chave efetivamente persistida no AsyncStorage. Uma etapa de **force-stop/reabertura**, sem limpar dados, comprova sobrevivência do armazenamento à reinicialização do processo.

- **Por que basta para a evidência técnica:** observa o mesmo serviço e o mesmo mecanismo local previstos para produção, com entrada e ordem controladas; demonstra diretamente FIFO, duplicatas, validação e readback de storage, sem depender da aleatoriedade da US-02.
- **Não basta sozinho para o GO do MVP:** também serão necessários teste de integração do fluxo real Consultar→salvar, e testes em build instalada em Android físico, conforme seção 9 do `QA_CHECKLIST.md`.
- **Sem UI:** logs de desenvolvimento e leitura do storage são mecanismos de prova; não há `HistoryScreen`, navegação adicional nem novo recurso visível ao usuário.
- **Método alternativo:** se o roteiro não puder ser executado, inspecionar a chave real do AsyncStorage via ferramenta de debug disponível, após consultas no app de desenvolvimento, registrando snapshots antes/depois de 10, 11 e reabertura. Essa alternativa deve indicar que a sequência é menos determinística e comparar eventos por `consultedAt`, não por unicidade de `messageId`.

**Formato sugerido de evidência** (somente saída esperada, não produzida):
`[US09-QA][US09-04][after-add-11] count=10 newest=2026-11-03T12:00:11.000Z oldest=2026-11-03T12:00:02.000Z ids=[msg-001,msg-010,...,msg-002]`.

## 3. Pré-requisitos solicitados ao Frontend Mobile Agent

1. Implementar `app/src/types/history.types.ts` e `app/src/services/historyService.ts` conforme a arquitetura; `add(entry)` e `getHistory()` (nomes sugeridos; adaptar aos nomes realmente implementados). O serviço deve fazer `prepend + slice(0, 10)` e gravar/readback pelo AsyncStorage; a UI não manipula storage diretamente.
2. Validar entradas antes da gravação (quatro campos, valores não vazios, `tone` permitido, `consultedAt` ISO válido). Não deduplicar por `messageId`. O snapshot de `text` precisa sobreviver sem lookup do JSON atual.
3. Expor para diagnóstico **apenas em `__DEV__`** um caminho de execução controlada que invoque o serviço e registre snapshots (`caseId`, etapa, `count`, sequência de `messageId + consultedAt`, resultado de readback e erros). Pode ser uma função temporária invocada pelo ponto de entrada de desenvolvimento, **sem botão ou tela**. O mecanismo de reset deve afetar exclusivamente uma instalação de QA ou uma chave isolada de testes.
4. Usar a **chave efetiva do serviço**, não assumir que o exemplo `@oraculo/history` já esteja implementado. Se a chave de produção for usada no teste, executar apenas em instalação descartável; nunca apagar o histórico real de usuários. Não registrar dados pessoais.
5. Permitir injeção controlada de JSON inválido e simulação de falhas de `getItem`/`setItem` **somente em desenvolvimento** (mock/stub pontual, se necessário). Não adicionar interface de produção ou biblioteca pesada por causa disso.
6. Garantir serialização de gravações ou proteção mínima contra reentrância de consultas rápidas; caso contrário, read-modify-write concorrente pode perder eventos. A escolha técnica exata cabe ao Frontend.
7. Remover/desativar o diagnóstico antes da build de distribuição. Preservar os logs brutos e o relatório de QA no repositório **após** a execução e autorização.

**Política segura proposta para falhas (ainda dependente da implementação):** entrada inválida é rejeitada sem escrita; JSON corrompido ou falha na leitura retorna histórico vazio *em memória* e registra erro de desenvolvimento, sem crash; uma próxima gravação válida pode reconstruir a lista quando o storage estiver operacional. Se `setItem` falhar, a consulta/card não deve travar e **não se deve reportar persistência bem-sucedida**. A política de recuperação não consta detalhadamente dos ADRs; tratar como decisão de implementação a confirmar, não como comportamento já validado.

## 4. Massa de dados determinística

Usar registros controlados e realmente derivados do contrato de `HistoryEntry`, nunca do sorteio da US-02:

- `E01`: `messageId=msg-001`, `text` igual à mensagem aprovada `msg-001`, `tone=poetica`, `consultedAt=2026-11-03T12:00:01.000Z`.
- `E02...E10`: `messageId=msg-002...msg-010`, `text` e `tone` correspondentes ao JSON oficial, `consultedAt=2026-11-03T12:00:02.000Z` até `...10.000Z` em ordem crescente.
- `E11`: **reutilizar `messageId=msg-001`**, o mesmo texto e tom de E01, mas `consultedAt=2026-11-03T12:00:11.000Z`.
- `R01` e `R02`: ambos `messageId=msg-009`, com mesmo snapshot de texto/tom oficial e horários `2026-11-03T12:01:01.000Z` / `2026-11-03T12:01:02.000Z`.

O **identificador do evento para comparação nos testes** será a combinação `messageId + consultedAt`, sem adicionar esse identificador como campo ao `HistoryEntry`. E01 e E11 são consultas distintas apesar de possuírem o mesmo `messageId`.

## 5. Casos executáveis — todos NOT RUN

**Procedimento comum:** em instalação de QA, limpar a chave controlada antes de cada caso independente; não limpar na passagem entre as etapas de reabertura; chamar o serviço real; obter tanto o retorno de `getHistory()` quanto um readback de `AsyncStorage.getItem(chaveReal)`; registrar logs/JSON e número da build. A inspeção não depende de `HistoryScreen`.

| ID | Pré-condição e passos controlados | Resultado esperado | Evidência a anexar | Status |
|---|---|---|---|---|
| **US09-QA01 — vazio** | Chave de teste ausente; chamar `getHistory()` | `[]`, sem exceção; nenhuma entrada fantasma | snapshot `empty`, readback `null` ou representação documentada | **NOT RUN** |
| **US09-QA02 — uma consulta** | Reset; chamar `add(E01)`; readback | 1 registro com os quatro campos completos e snapshot de texto igual a E01 | `after-add-E01`, valor persistido | **NOT RUN** |
| **US09-QA03 — dez consultas** | Reset; chamar `add(E01)` a `add(E10)` sequencialmente | `count=10`; ordem exata E10,E09,...,E01; sem perdas | lista `messageId+consultedAt`, readback bruto | **NOT RUN** |
| **US09-QA04 — 11ª/FIFO** | Após QA03, chamar `add(E11)` | `count=10`; sequência E11,E10,...,E02; **E01 removida**, ainda que E11 use mesmo ID | snapshot antes/depois + diferença pelo timestamp | **NOT RUN** |
| **US09-QA05 — IDs repetidos** | Reset; `add(R01)` e `add(R02)` | Dois registros, ambos `msg-009`, ordem R02,R01; nenhum colapso por ID | readback de dois eventos com horários diferentes | **NOT RUN** |
| **US09-QA06 — reabertura** | Após QA04, capturar snapshot; **force-stop** do processo; reabrir a mesma instalação sem limpar dados; chamar `getHistory()` | Mesma lista de dez eventos, ordem e textos preservados | snapshot pré/pós, identificação da instalação, horário de reabertura | **NOT RUN** |
| **US09-QA07 — entrada inválida** | Reset; `add(E01)`; tentar `add` com `messageId=""` ou `text=""`/`tone` inválido/`consultedAt` malformado | Inválidas não são gravadas; E01 permanece; nenhum crash | log de rejeição + storage antes/depois | **NOT RUN** |
| **US09-QA08 — storage corrompido** | Em ambiente de teste, gravar texto JSON inválido diretamente na chave; chamar `getHistory()`, depois consultar/salvar E02 | UI/serviço não crasha; erro observável em dev; recuperação segura segundo política implementada | conteúdo corrompido fictício, log de erro, resultado posterior | **NOT RUN** |
| **US09-QA09 — falha de I/O** | Em dev, simular rejeição de `getItem` ou `setItem` em chamada isolada | Nenhum crash no fluxo Consultar; falha sinalizada, não declarada como persistência; retomar quando storage voltar | falha simulada + log + estado do card | **NOT RUN** |
| **US09-QA10 — consultas rápidas** | Após integração com Home, fazer 11 acionamentos rápidos e identificáveis | Sem perda decorrente de corrida; histórico corresponde às consultas efetivamente concluídas, até dez | sequência de eventos da aplicação + snapshot do storage | **NOT RUN** |

**Atenção ao QA06:** atualizar a tela com Fast Refresh, recarregar o JS ou enviar o app ao background **não substitui** o teste de encerramento/reabertura do processo. Em Android, `adb shell am force-stop <package.id>` pode ser usado **após identificar o applicationId real**, seguido de abertura manual. Não executar `pm clear`, desinstalar ou remover dados durante esse caso.

## 6. Separação das evidências por camada

| Camada | O que comprova | O que não comprova | Situação |
|---|---|---|---|
| **A — Serviço, desenvolvimento** | Contrato de `HistoryEntry`, limite, FIFO, duplicatas, rejeição, comportamento de erro, write/readback no AsyncStorage do ambiente de teste | Que a ação real Consultar aciona o salvamento corretamente | **NOT RUN** |
| **B — Integração, aplicativo** | Consultar cria uma entrada correspondente ao card atual, sem depender de rede; falha de storage não trava interface | Persistência e estabilidade em device Android físico específico | **NOT RUN** |
| **C — Build Android físico** | Kill/reabrir, persistência real, 11ª consulta/FIFO, offline, integridade e ausência de crash em aparelho | Validação de experiência com usuários finais por si só | **NOT RUN** |

**Critério de aceite técnico US-09:** dados efetivamente persistidos, máximo dez eventos, ordem recente→antigo, FIFO na 11ª, duplicatas aceitas, invalidez/erro sem crash e sobrevivência à reabertura. **US-10 não participa do go/no-go.** Para GO geral do MVP, seguir os demais bloqueadores da seção 9 do `QA_CHECKLIST.md` (build Android, consulta, compartilhamento etc.).

## 7. Modelo compacto do relatório de execução

Preencher **somente após executar**; preservar o nome do arquivo de evidência e, quando disponível, o commit/build.

| Campo | Valor |
|---|---|
| Data/hora de execução | **NÃO EXECUTADO** |
| Testador | **NÃO ATRIBUÍDO** |
| Versão do GitRepo / commit | referência 4.5; commit de execução **NÃO DISPONÍVEL** |
| Ambiente (Expo SDK, Android, modelo, build) | **NÃO EXECUTADO** |
| Chave de storage utilizada | **PENDENTE — confirmar com Frontend** |
| Método | Diagnóstico `__DEV__` + AsyncStorage real + fixtures; alternativa: inspeção manual |
| Arquivo/log de evidência | **NÃO GERADO** |
| Defeitos/bloqueios | **NÃO AVALIADOS** |
| Decisão QA | **PENDENTE — US-09 NÃO VALIDADA** |

| Teste | Resultado (`PASS`/`FAIL`/`NOT RUN`) | Artefato/log | Observação |
|---|---|---|---|
| US09-QA01 | NOT RUN | — | — |
| US09-QA02 | NOT RUN | — | — |
| US09-QA03 | NOT RUN | — | — |
| US09-QA04 | NOT RUN | — | — |
| US09-QA05 | NOT RUN | — | — |
| US09-QA06 | NOT RUN | — | — |
| US09-QA07 | NOT RUN | — | — |
| US09-QA08 | NOT RUN | — | — |
| US09-QA09 | NOT RUN | — | — |
| US09-QA10 | NOT RUN | — | — |

**Regra de classificação:** `PASS` somente com passo executado e evidência verificável; `FAIL` com desvio e log; `NOT RUN` para não executado, inclusive testes impossibilitados por falta de implementação. Não converter “roteiro pronto” em `PASS`.

## 8. Ajuste mínimo proposto a TASK-US09-03

**Não alterar `QA_CHECKLIST.md` inteiro nem repriorizar US-10.** A TASK-US09-03 já admite storage e debug temporário; recomenda-se apenas registrar uma decisão operacional, após aprovação:

> **Método de evidência selecionado (QA Agent, EP.05):** diagnóstico temporário em desenvolvimento que invoca `historyService` com fixtures determinísticas, grava no AsyncStorage real e registra snapshots de ordem/limite/FIFO; confirmar persistência com force-stop e reabertura. Método alternativo: inspeção direta do AsyncStorage em ambiente de desenvolvimento. Aceitar consultas com IDs repetidos, diferenciadas por `consultedAt`. Para execução, depende de TASK-US09-02 implementada; US-10 não é bloqueadora.

**Correção pontual futura recomendada** à redação do cenário US09-P02: “Consultar 10 vezes, admitindo IDs repetidos; validar dez **eventos de consulta**.” Isso alinha o checklist ao requisito sem reescrever sua estrutura.

## 9. Resultado do agente e handoff

**Documentado:** método principal e alternativo, pré-requisitos para instrumentação de desenvolvimento, fixtures, dez casos reproduzíveis, modelo de evidência e proposta pontual para a TASK-US09-03.

**Não implementado / não testado:** `historyService`, instrumentação, scripts, builds, logs, execução de consultas e reabertura em dispositivo. Todos os casos permanecem **NOT RUN**.

**Para Frontend Mobile Agent (Cursor):** implementar serviço e integração, preparar diagnóstico temporário sem UI, executar os casos com storage real, registrar logs e retirar/desativar instrumentação de distribuição. Não deduplicar por ID.

**Para PMO:** classificar TASK-US09-03 como **método especificado, evidência de execução pendente**; não declarar US-09 concluída. Registrar dependência de TASK-US09-02 e da build Android, quando disponível.

### HANDOFF EDITORIAL — EP.05

O QA Agent encontrou uma distinção decisiva: o histórico armazena **consultas**, não um conjunto de mensagens únicas. Por isso, a 11ª consulta elimina o evento mais antigo, mesmo se o mesmo `messageId` reaparecer posteriormente. Foi escolhido um mecanismo de observação temporário, sem inflar a interface com uma tela de histórico. A estratégia foi documentada antes de existir código e **não deve ser apresentada como teste executado ou funcionalidade validada**.

# TASKS.md

# ORÁCULO PAF — Plano inicial de execução do MVP

## 1. Objetivo deste documento

Este documento transforma o backlog atualizado e o checklist de QA do MVP do ORÁCULO PAF em um plano inicial de execução.

A proposta é manter uma base leve, rastreável e útil para orientar a execução. O mapeamento do Software Architect Agent já foi concluído em `docs/IMPLEMENTATION_MAP.md`; os próximos agentes de execução são:

* UX/UI Agent
* Storyteller Agent
* Frontend Mobile Agent
* QA Agent
* DevOps / Build Agent

Este documento não inicia implementação.
Ele organiza o caminho para que a implementação comece com clareza.

---

## 2. Contexto considerado

Este plano considera os seguintes documentos:

* `docs/PROJECT_CONTEXT.md`
* `docs/AGENTS.md`
* `docs/BACKLOG.md`
* `docs/BACKLOG_REVIEW.md`
* `docs/QA_CHECKLIST.md`
* `docs/DECISIONS.md`
* `docs/RISKS.md`
* `docs/ARCHITECTURE.md`
* `docs/IMPLEMENTATION_MAP.md`
* `docs/adr/`

---

## 3. Hipótese principal do MVP

O MVP do ORÁCULO PAF existe para validar a seguinte hipótese:

> Usuários se identificam com mensagens rápidas, poéticas, místicas ou humorísticas a ponto de querer compartilhar o card gerado.

O fluxo principal do MVP é:

```text
Abrir app → Consultar → JSON local → Card visual → Compartilhar
                              ↓
                    Persistir histórico local
                              ↓
                    Build interna para teste
```

---

## 4. Restrições permanentes do MVP

O plano de execução deve respeitar as restrições abaixo:

* não adicionar login;
* não adicionar backend;
* não adicionar Supabase;
* não adicionar IA generativa em runtime;
* não adicionar ranking;
* não adicionar comentários;
* não adicionar rede social;
* não adicionar notificações push;
* não adicionar analytics avançado;
* não tratar histórias Should ou Could como bloqueadoras;
* manter foco nas histórias Must.

---

## 5. Visão geral do plano de execução

O MVP será executado em seis ondas principais:

| Onda | Foco                    | Objetivo                                      |
| ---- | ----------------------- | --------------------------------------------- |
| 0    | Preparação técnica      | Garantir estrutura mínima para execução       |
| 1    | Dados e conteúdo        | Criar base local validável                    |
| 2    | Experiência principal   | Abrir app e consultar mensagem                |
| 3    | Card e compartilhamento | Validar núcleo da hipótese                    |
| 4    | Histórico local         | Persistir últimas 10 consultas                |
| 5    | Identidade, build e QA  | Gerar build interna e validar em Android real |

A prioridade é entregar primeiro o caminho mínimo:

```text
JSON local → Home → Consultar → Card → Compartilhar → Histórico local → Build interna
```

---

## 6. Ordem recomendada de execução

## 6.1 Ordem macro

1. Executar `TASK-SCAFFOLD-01` para preparar o projeto Expo (pode ocorrer em paralelo à curadoria e ao UX).
2. Criar e curar base inicial de mensagens.
3. Validar schema e conteúdo.
4. Criar tela principal.
5. Implementar consulta aleatória.
6. Criar card visual.
7. Implementar compartilhamento.
8. Implementar persistência local do histórico.
9. Aplicar identidade visual mínima.
10. Gerar build interna.
11. Executar checklist QA em Android real.
12. Registrar bugs e decisão go/no-go.

---

## 6.2 Ordem por user story Must

| Ordem | User Story                                           | Motivo                           |
| ----- | ---------------------------------------------------- | -------------------------------- |
| 1     | US-04 — JSON local com tons                          | Desbloqueia consulta             |
| 2     | US-05 — Mensagens curtas, legíveis e compartilháveis | Evita falso negativo da hipótese |
| 3     | US-01 — Tela principal clara                         | Cria ponto de entrada            |
| 4     | US-02 — Consultar mensagem aleatória                 | Implementa experiência central   |
| 5     | US-06 — Card visual da mensagem                      | Dá forma visual ao valor         |
| 6     | US-07 — Compartilhar o card                          | Núcleo da validação              |
| 7     | US-09 — Persistir últimas 10 consultas               | Continuidade local sem login     |
| 8     | US-12 — Identidade visual mínima e consistente       | Evita aparência improvisada      |
| 9     | US-13 — Build interna para teste                     | Permite validação real           |

---

## 6.3 Tarefa transversal de preparação técnica

### TASK-SCAFFOLD-01 — Criar scaffold Expo e estrutura `app/src`

**Tipo:** preparação técnica; habilita as histórias Must, mas não substitui nenhuma delas.  
**Agente principal:** Frontend Mobile Agent (Cursor).  
**Dependências:** `ARCHITECTURE.md`, ADR-001 e `IMPLEMENTATION_MAP.md` (já disponíveis).  
**Status na base v4.4:** `todo` — não existe pasta `app/`.

**Critérios de pronto:**

* [ ] Projeto Expo criado em `app/` e TypeScript configurado.
* [ ] Árvore mínima `app/src` criada de acordo com o mapa técnico.
* [ ] Aplicação inicial executa ao menos em ambiente de desenvolvimento, ou a impossibilidade é registrada com comandos e erros reais.
* [ ] Pacotes, comandos e arquivos criados são inventariados.
* [ ] Nenhum login, backend, Supabase, IA em runtime ou US-10 é adicionado.

**Observação:** o scaffold não depende do JSON curado, da especificação visual final nem da definição de evidência US-09. Essas entregas são necessárias para as respectivas integrações/validações posteriores.

---

# 7. Tarefas por user story Must

---

## US-04 — JSON local com tons

**Prioridade:** Must
**Agentes principais:** Storyteller Agent, Frontend Mobile Agent, QA Agent
**Riscos associados:** RISK-005, RISK-013
**Labels sugeridas:** `priority:must`, `type:data`, `type:content`, `agent:storyteller`, `agent:frontend`, `risk:json`

### Tarefas

## TASK-US04-01 — Definir schema final da mensagem

**Descrição:**
Confirmar o schema mínimo das mensagens locais.

Schema mínimo:

```json
{
  "id": "msg-001",
  "text": "Mensagem do oráculo",
  "tone": "mistica",
  "category": "oraculo",
  "tags": ["tag1", "tag2"],
  "shareable": true
}
```

**Agente responsável sugerido:** Software Architect Agent
**Dependências:** `docs/ARCHITECTURE.md`, `docs/adr/ADR-002-json-local-no-mvp.md`
**Critérios de pronto:**

* [ ] Campos obrigatórios definidos.
* [ ] Tons válidos definidos.
* [ ] Estratégia para mensagens inválidas definida.
* [ ] Schema compatível com `docs/ARCHITECTURE.md`.

---

## TASK-US04-02 — Criar arquivo inicial `messages.json`

**Descrição:**
Criar o arquivo local de mensagens.

Caminho planejado:

```text
app/src/data/messages.json
```

**Agente responsável sugerido:** Storyteller Agent
**Dependências:** TASK-US04-01, TASK-US05-01 e TASK-US05-02 (conteúdo gerado e curado antes de sua integração definitiva no JSON)
**Critérios de pronto:**

* [ ] Arquivo criado no caminho planejado.
* [ ] Contém mensagens nos três tons: poética, mística e humorística.
* [ ] Todas as mensagens seguem o schema mínimo.
* [ ] Não há mensagens sem `id`, `text` ou `tone`.
* [ ] Não há IDs duplicados.

---

## TASK-US04-03 — Definir regra de validação de mensagens

**Descrição:**
Definir como o app deve tratar mensagens inválidas.

**Agente responsável sugerido:** Software Architect Agent + QA Agent
**Dependências:** TASK-US04-01
**Critérios de pronto:**

* [ ] Mensagem sem `id` é inválida.
* [ ] Mensagem sem `text` é inválida.
* [ ] Mensagem sem `tone` é inválida ou recebe fallback documentado.
* [ ] Mensagem inválida não entra no pool de consulta.
* [ ] Critérios alinhados ao `QA_CHECKLIST.md`.

---

## TASK-US04-04 — Planejar service de mensagens

**Descrição:**
Definir a responsabilidade do futuro service de mensagens.

Caminho sugerido:

```text
app/src/services/messagesService.ts
```

**Agente responsável sugerido:** Software Architect Agent
**Dependências:** TASK-US04-01, TASK-US04-03
**Critérios de pronto:**

* [ ] Responsabilidade do service definida.
* [ ] Service não depende de backend.
* [ ] Service carrega apenas JSON local.
* [ ] Service expõe somente mensagens válidas.
* [ ] Service permite evolução futura sem mudar o fluxo principal.

---

## US-05 — Mensagens curtas, legíveis e compartilháveis

**Prioridade:** Must
**Agentes principais:** Storyteller Agent, Product Owner Agent, QA Agent
**Riscos associados:** RISK-005, RISK-013
**Labels sugeridas:** `priority:must`, `type:content`, `agent:storyteller`, `agent:qa`, `risk:content`

### Tarefas

## TASK-US05-01 — Gerar base mínima de mensagens

**Descrição:**
Gerar a base inicial de mensagens para o MVP.

Regra mínima:

```text
5 mensagens válidas por tom
3 tons iniciais
mínimo total: 15 mensagens válidas
```

Tons:

* poética;
* mística;
* humorística.

**Agente responsável sugerido:** Storyteller Agent
**Dependências:** TASK-US04-01 (schema e tons já documentados em ARCHITECTURE.md)
**Critérios de pronto:**

* [ ] Pelo menos 5 mensagens válidas por tom.
* [ ] Pelo menos 15 mensagens totais.
* [ ] Mensagens são curtas.
* [ ] Mensagens têm potencial de identificação.
* [ ] Mensagens não dependem de IA em runtime.
* [ ] Mensagens não contêm conteúdo ofensivo ou discriminatório.

---

## TASK-US05-02 — Curar mensagens contra checklist editorial

**Descrição:**
Revisar mensagens geradas para evitar baixa qualidade editorial.

**Agente responsável sugerido:** Product Owner Agent + Storyteller Agent
**Dependências:** TASK-US05-01
**Critérios de pronto:**

* [ ] Mensagens genéricas demais removidas.
* [ ] Mensagens longas demais ajustadas ou removidas.
* [ ] Tons coerentes com classificação.
* [ ] Conteúdo revisado manualmente.
* [ ] Mensagens compatíveis com card visual.

---

## TASK-US05-03 — Validar mensagens no card

**Descrição:**
Após criação do card, testar as mensagens mais longas no layout.

**Agente responsável sugerido:** QA Agent + UX/UI Agent
**Dependências:** US-06
**Critérios de pronto:**

* [ ] Mensagens não quebram layout.
* [ ] Mensagens não ficam cortadas de forma ilegível.
* [ ] Contraste permanece aceitável.
* [ ] Textos funcionam em dispositivo real.

---

## US-01 — Tela principal clara

**Prioridade:** Must
**Agentes principais:** UX/UI Agent, Frontend Mobile Agent, QA Agent
**Riscos associados:** RISK-003, RISK-008
**Labels sugeridas:** `priority:must`, `type:ux`, `type:frontend`, `agent:ux`, `agent:frontend`

### Tarefas

## TASK-US01-01 — Definir composição mínima da Home

**Descrição:**
Definir os elementos essenciais da tela principal.

Elementos esperados:

* título ou identificação do app;
* mensagem inicial ou instrução curta;
* botão principal “Consultar”;
* área para card após consulta;
* sem login;
* sem onboarding obrigatório;
* sem excesso de opções.

**Agente responsável sugerido:** UX/UI Agent
**Dependências:** `docs/BACKLOG.md`, `docs/QA_CHECKLIST.md`
**Critérios de pronto:**

* [ ] Elementos mínimos definidos.
* [ ] CTA principal visível na primeira viewport.
* [ ] Nenhum fluxo bloqueante antes da consulta.
* [ ] Experiência compreensível em até 5 segundos.

---

## TASK-US01-02 — Planejar `HomeScreen`

**Descrição:**
Definir responsabilidades da tela principal.

Caminho sugerido:

```text
app/src/screens/HomeScreen.tsx
```

**Agente responsável sugerido:** Frontend Mobile Agent
**Dependências:** TASK-US01-01
**Critérios de pronto:**

* [ ] Responsabilidade da tela definida.
* [ ] Tela não contém regra de negócio complexa.
* [ ] Tela consome hooks/services.
* [ ] Tela prioriza ação “Consultar”.

---

## TASK-US01-03 — Criar critério de validação da primeira tela

**Descrição:**
Transformar critérios subjetivos em validação operacional.

**Agente responsável sugerido:** QA Agent
**Dependências:** TASK-US01-01
**Critérios de pronto:**

* [ ] CTA visível sem scroll.
* [ ] Observador identifica ação principal em até 5 segundos.
* [ ] Sem login, onboarding ou tutorial obrigatório.
* [ ] Critério alinhado ao `QA_CHECKLIST.md`.

---

## US-02 — Consultar mensagem aleatória

**Prioridade:** Must
**Agentes principais:** Frontend Mobile Agent, QA Agent
**Riscos associados:** RISK-013
**Labels sugeridas:** `priority:must`, `type:frontend`, `type:logic`, `agent:frontend`, `risk:json`

### Tarefas

## TASK-US02-01 — Planejar hook de consulta

**Descrição:**
Definir hook responsável pela consulta da mensagem.

Caminho sugerido:

```text
app/src/hooks/useOracleMessage.ts
```

**Agente responsável sugerido:** Software Architect Agent + Frontend Mobile Agent
**Dependências:** TASK-US04-04
**Critérios de pronto:**

* [ ] Hook consome mensagens válidas.
* [ ] Hook retorna mensagem atual.
* [ ] Hook permite nova consulta.
* [ ] Hook não depende de rede.
* [ ] Hook não depende de backend.

---

## TASK-US02-02 — Definir estratégia de seleção aleatória

**Descrição:**
Definir lógica simples de sorteio.

**Agente responsável sugerido:** Frontend Mobile Agent
**Dependências:** TASK-US02-01
**Critérios de pronto:**

* [ ] Seleção usa pool local válido.
* [ ] Funciona offline.
* [ ] Não exige sessão remota.
* [ ] Não implementa US-03 como obrigatória.
* [ ] Pode evoluir para evitar repetição consecutiva depois.

---

## TASK-US02-03 — Planejar proteção contra toques rápidos

**Descrição:**
Evitar inconsistência no estado quando o usuário toca repetidamente em “Consultar”.

**Agente responsável sugerido:** Frontend Mobile Agent + QA Agent
**Dependências:** TASK-US02-01
**Critérios de pronto:**

* [ ] Comportamento esperado definido.
* [ ] App não trava com múltiplos toques.
* [ ] Estado da mensagem permanece consistente.
* [ ] Cenário coberto no QA.

---

## US-06 — Card visual da mensagem

**Prioridade:** Must
**Agentes principais:** UX/UI Agent, Frontend Mobile Agent, QA Agent
**Riscos associados:** RISK-001, RISK-006, RISK-008
**Labels sugeridas:** `priority:must`, `type:ui`, `type:frontend`, `agent:ux`, `agent:frontend`, `risk:card`

### Tarefas

## TASK-US06-01 — Definir estrutura mínima do card

**Descrição:**
Definir o conteúdo mínimo do card.

Elementos esperados:

* texto da mensagem;
* identidade mínima do ORÁCULO PAF;
* contraste adequado;
* sem excesso visual;
* um único template no MVP.

**Agente responsável sugerido:** UX/UI Agent
**Dependências:** TASK-US05-01
**Critérios de pronto:**

* [ ] Mensagem é foco principal.
* [ ] Card tem estrutura simples.
* [ ] Apenas um template definido para o MVP.
* [ ] Legibilidade tem prioridade sobre sofisticação.

---

## TASK-US06-02 — Planejar componente `MessageCard`

**Descrição:**
Definir responsabilidade do componente visual da mensagem.

Caminho sugerido:

```text
app/src/components/MessageCard.tsx
```

**Agente responsável sugerido:** Frontend Mobile Agent
**Dependências:** TASK-US06-01
**Critérios de pronto:**

* [ ] Componente recebe mensagem como propriedade.
* [ ] Componente não acessa dados diretamente.
* [ ] Componente é reutilizável para consulta e possível histórico.
* [ ] Layout suporta mensagens curtas e médias.

---

## TASK-US06-03 — Validar card com mensagens reais

**Descrição:**
Testar o card com a base real de mensagens.

**Agente responsável sugerido:** QA Agent + UX/UI Agent
**Dependências:** TASK-US06-02, TASK-US05-02
**Critérios de pronto:**

* [ ] Mensagens longas da base cabem no card.
* [ ] Texto não fica ilegível.
* [ ] Card funciona em Android real.
* [ ] Visual não compete com a mensagem.

---

## US-07 — Compartilhar o card

**Prioridade:** Must
**Agentes principais:** Frontend Mobile Agent, QA Agent, Software Architect Agent
**Riscos associados:** RISK-001, RISK-009
**Labels sugeridas:** `priority:must`, `type:share`, `type:frontend`, `agent:frontend`, `agent:qa`, `risk:share`

### Tarefas

## TASK-US07-01 — Definir estratégia de compartilhamento

**Descrição:**
Definir abordagem inicial para compartilhar card.

Estratégia recomendada:

1. tentar compartilhar imagem do card, se viável;
2. manter fallback obrigatório para texto;
3. validar em Android real cedo.

**Agente responsável sugerido:** Software Architect Agent
**Dependências:** `docs/adr/ADR-005-compartilhamento-card.md`
**Critérios de pronto:**

* [ ] Estratégia principal definida.
* [ ] Fallback em texto definido.
* [ ] Sem backend.
* [ ] Sem login.
* [ ] Risco de share documentado.

---

## TASK-US07-02 — Planejar `shareService`

**Descrição:**
Definir responsabilidade do serviço de compartilhamento.

Caminho sugerido:

```text
app/src/services/shareService.ts
```

**Agente responsável sugerido:** Frontend Mobile Agent
**Dependências:** TASK-US07-01
**Critérios de pronto:**

* [ ] Serviço centraliza lógica de compartilhamento.
* [ ] Serviço aceita mensagem/card como entrada.
* [ ] Serviço trata cancelamento.
* [ ] Serviço trata falha sem travar app.
* [ ] Serviço possui fallback em texto.

---

## TASK-US07-03 — Validar compartilhamento cedo em Android real

**Descrição:**
Planejar validação técnica antecipada do share.

**Agente responsável sugerido:** QA Agent + Frontend Mobile Agent
**Dependências:** TASK-US07-02
**Critérios de pronto:**

* [ ] Share sheet abre em Android real.
* [ ] Conteúdo compartilhado corresponde à mensagem atual.
* [ ] Cancelamento não trava o app.
* [ ] Falha de imagem aciona fallback ou erro não bloqueante.
* [ ] Evidência registrada no QA.

---

## US-09 — Persistir últimas 10 consultas

**Prioridade:** Must
**Agentes principais:** Frontend Mobile Agent, QA Agent, Software Architect Agent
**Riscos associados:** RISK-002
**Labels sugeridas:** `priority:must`, `type:storage`, `type:frontend`, `agent:frontend`, `agent:qa`, `risk:history`

### Tarefas

## TASK-US09-01 — Confirmar estratégia de armazenamento local

**Descrição:**
Confirmar dependência e abordagem para persistência local.

Estratégia esperada:

* armazenamento local;
* limite de 10 mensagens;
* FIFO;
* sem nuvem;
* sem login.

**Agente responsável sugerido:** Software Architect Agent
**Dependências:** `docs/adr/ADR-004-historico-local-limitado.md`
**Critérios de pronto:**

* [ ] Estratégia confirmada.
* [ ] Dependência definida.
* [ ] Sem backend.
* [ ] Sem login.
* [ ] Sem sincronização.

---

## TASK-US09-02 — Planejar `historyService`

**Descrição:**
Definir responsabilidade do serviço de histórico.

Caminho sugerido:

```text
app/src/services/historyService.ts
```

**Agente responsável sugerido:** Frontend Mobile Agent
**Dependências:** TASK-US09-01
**Critérios de pronto:**

* [ ] Serviço salva nova consulta.
* [ ] Serviço limita histórico a 10 itens.
* [ ] Serviço remove a mais antiga ao inserir a 11ª.
* [ ] Serviço mantém ordem do mais recente para o mais antigo.
* [ ] Serviço ignora mensagens inválidas.

---

## TASK-US09-03 — Definir evidência de QA para histórico sem UI obrigatória

**Descrição:**
Como visualizar histórico é Should, definir como QA validará persistência sem depender da UI final.

Possíveis evidências:

* tela simples temporária;
* log de debug;
* inspeção de storage;
* implementação de US-10 se couber sem risco.

**Agente responsável sugerido:** QA Agent + PMO Agent
**Dependências para escolher o método:** ADR-004, `docs/QA_CHECKLIST.md` e contrato de `historyService` (sem esperar o código existir). **Para executar e comprovar a persistência:** TASK-US09-02 implementada.
**Critérios de pronto:**

* [ ] Método de evidência definido antes do teste de US-09.
* [ ] QA consegue validar FIFO.
* [ ] QA consegue validar persistência após reabrir app.
* [ ] Validação não transforma US-10 em Must.

---

## US-12 — Identidade visual mínima e consistente

**Prioridade:** Must
**Agentes principais:** UX/UI Agent, Frontend Mobile Agent, QA Agent
**Riscos associados:** RISK-006, RISK-008
**Labels sugeridas:** `priority:must`, `type:ux`, `type:ui`, `agent:ux`, `risk:visual`

### Tarefas

## TASK-US12-01 — Definir tema visual mínimo

**Descrição:**
Definir paleta, tipografia base e espaçamentos mínimos.

Caminho sugerido:

```text
app/src/theme/theme.ts
```

**Agente responsável sugerido:** UX/UI Agent
**Dependências:** TASK-US01-01, TASK-US06-01
**Critérios de pronto:**

* [ ] Paleta mínima definida.
* [ ] Tipografia base definida.
* [ ] Espaçamentos básicos definidos.
* [ ] Visual apoia a validação.
* [ ] Não há refinamento visual avançado.

---

## TASK-US12-02 — Aplicar tema nos componentes principais

**Descrição:**
Aplicar tema mínimo em Home, botão e card.

**Agente responsável sugerido:** Frontend Mobile Agent
**Dependências:** TASK-US12-01
**Critérios de pronto:**

* [ ] Home usa tema definido.
* [ ] Botão principal usa tema definido.
* [ ] Card usa tema definido.
* [ ] Interface não possui excesso de opções.
* [ ] Há apenas um template de card no MVP.

---

## TASK-US12-03 — Validar legibilidade acima de sofisticação

**Descrição:**
Validar que o visual não compromete leitura, consulta ou compartilhamento.

**Agente responsável sugerido:** QA Agent + UX/UI Agent
**Dependências:** TASK-US12-02
**Critérios de pronto:**

* [ ] Texto legível em Android real.
* [ ] Contraste aceitável.
* [ ] CTA claro.
* [ ] Mensagem continua sendo foco.
* [ ] Nenhum refinamento visual bloqueia share ou build.

---

## US-13 — Build interna para teste

**Prioridade:** Must
**Agentes principais:** DevOps / Build Agent, QA Agent, Frontend Mobile Agent
**Riscos associados:** RISK-009, RISK-010
**Labels sugeridas:** `priority:must`, `type:build`, `type:qa`, `agent:devops`, `agent:qa`

### Tarefas

## TASK-US13-01 — Confirmar pré-requisitos de build

**Descrição:**
Definir pré-requisitos para build interna.

**Agente responsável sugerido:** DevOps / Build Agent
**Dependências:** implementação das histórias Must principais
**Critérios de pronto:**

* [ ] Projeto Expo configurado.
* [ ] Dependências essenciais instaladas.
* [ ] App roda localmente.
* [ ] Configuração de build definida.
* [ ] Nenhum backend exigido.

---

## TASK-US13-02 — Planejar build interna Android

**Descrição:**
Definir fluxo para gerar build interna Android com EAS.

**Agente responsável sugerido:** DevOps / Build Agent
**Dependências:** TASK-US13-01
**Critérios de pronto:**

* [ ] Comando de build documentado.
* [ ] Target Android definido.
* [ ] Build interna planejada.
* [ ] Instalação em dispositivo real considerada.

---

## TASK-US13-03 — Executar checklist QA em build interna

**Descrição:**
Executar checklist oficial do QA em dispositivo Android real.

Referência:

```text
docs/QA_CHECKLIST.md
```

**Agente responsável sugerido:** QA Agent
**Dependências:** TASK-US13-02
**Critérios de pronto:**

* [ ] Build instalada em Android real.
* [ ] Fluxo principal testado.
* [ ] Modo avião testado.
* [ ] Compartilhamento testado.
* [ ] Histórico local testado.
* [ ] Bugs registrados.
* [ ] Decisão GO/NO-GO registrada.

---

# 8. Tarefas para histórias Should

As histórias Should não bloqueiam o MVP.
Elas só devem entrar depois que o fluxo Must estiver funcional e sem bloqueadores críticos.

---

## US-03 — Evitar repetição consecutiva

**Prioridade:** Should
**Agentes principais:** Frontend Mobile Agent, QA Agent
**Dependências:** US-02
**Labels sugeridas:** `priority:should`, `type:logic`

### Tarefas

## TASK-US03-01 — Implementar regra simples de não repetir consecutivamente

**Critérios de pronto:**

* [ ] Se houver 2 ou mais mensagens, a próxima é diferente da anterior.
* [ ] Se houver apenas 1 mensagem, repetição é permitida.
* [ ] Não exige backend.
* [ ] Não exige perfil.
* [ ] Não adiciona complexidade ao sorteio.

---

## US-10 — Visualizar histórico

**Prioridade:** Should
**Agentes principais:** UX/UI Agent, Frontend Mobile Agent, QA Agent
**Dependências:** US-09
**Labels sugeridas:** `priority:should`, `type:history`, `type:ux`

### Tarefas

## TASK-US10-01 — Definir forma simples de visualizar histórico

Opções aceitáveis:

* lista abaixo do card;
* área recolhível;
* tela simples.

**Critérios de pronto:**

* [ ] Exibe no máximo 10 mensagens.
* [ ] Mostra estado vazio.
* [ ] Não inclui favoritos.
* [ ] Não inclui filtros.
* [ ] Não inclui busca.
* [ ] Não inclui coleção.
* [ ] Não vira fluxo principal.

---

## US-11 — Compartilhar a partir do histórico

**Prioridade:** Should condicionado
**Agentes principais:** Frontend Mobile Agent, QA Agent
**Dependências:** US-07, US-10
**Labels sugeridas:** `priority:should`, `type:share`, `type:history`

### Tarefas

## TASK-US11-01 — Reutilizar fluxo de compartilhamento no histórico

**Critérios de pronto:**

* [ ] Usa o mesmo `shareService` da US-07.
* [ ] Não cria fluxo novo.
* [ ] Não exige backend.
* [ ] Não exige login.
* [ ] Se exigir fluxo próprio, deve ser reclassificada como Could.

---

# 9. História Could

---

## US-08 — Microinteração ao consultar

**Prioridade:** Could
**Agentes principais:** UX/UI Agent, Frontend Mobile Agent
**Dependências:** todas as histórias Must concluídas
**Labels sugeridas:** `priority:could`, `type:ux`, `type:animation`

### Tarefa

## TASK-US08-01 — Avaliar microinteração leve pós-MVP funcional

**Critérios de pronto:**

* [ ] Só considerada após Must concluídos.
* [ ] Não usa biblioteca pesada sem justificativa.
* [ ] Não atrasa leitura da mensagem.
* [ ] Não prejudica performance.
* [ ] Pode ser descartada sem impacto no MVP.

---

# 10. Dependências entre tarefas

## Dependências críticas

| Dependência                      | Motivo                                     |
| -------------------------------- | ------------------------------------------ |
| TASK-US04-01 → TASK-US05-01      | Schema antes da geração de conteúdo        |
| TASK-US05-01 → TASK-US05-02      | Curadoria após geração                     |
| TASK-US05-02 → TASK-US04-02      | JSON definitivo recebe conteúdo curado     |
| TASK-US04-04 → TASK-US02-01      | Consulta depende do service de mensagens   |
| TASK-US02-01 → TASK-US02-02      | Sorteio depende do hook                    |
| TASK-US05-02 → TASK-US06-01      | Card precisa considerar mensagens reais    |
| TASK-US06-02 → TASK-US07-02      | Share depende do card ou conteúdo atual    |
| TASK-US07-02 → TASK-US07-03      | Validação depende do service de share      |
| TASK-US09-01 → TASK-US09-02      | Histórico depende de estratégia de storage |
| Método US-09 definido → TASK-US09-02 | Método orienta instrumentação sem criar UI Must |
| TASK-US09-02 → teste de US-09    | Evidência real só após código implementado |
| TASK-US12-01 → TASK-US12-02      | Tema antes de aplicar UI                   |
| TASK-SCAFFOLD-01 → TASK-US13-01 | Configuração de build exige projeto Expo   |
| Fluxo Must implementado → teste US-13 | GO/NO-GO exige funcionalidade real     |
| TASK-US13-02 → TASK-US13-03      | QA em build depende de build instalada     |

---

## Dependências funcionais

```text
JSON local
  ↓
Mensagens curadas
  ↓
Home + Consultar
  ↓
Card
  ↓
Compartilhar
  ↓
Histórico local
  ↓
Build interna
  ↓
QA Go/No-Go
```

---

# 11. Agentes responsáveis sugeridos

| Área                           | Agente principal         | Apoio                    |
| ------------------------------ | ------------------------ | ------------------------ |
| Produto e escopo               | Product Owner Agent      | PMO Agent                |
| Planejamento e rastreabilidade | PMO Agent                | Product Owner Agent      |
| Arquitetura                    | Software Architect Agent | Frontend Mobile Agent    |
| Conteúdo                       | Storyteller Agent        | Product Owner Agent      |
| UX/UI                          | UX/UI Agent              | QA Agent                 |
| Frontend                       | Frontend Mobile Agent    | Software Architect Agent |
| QA                             | QA Agent                 | PMO Agent                |
| Build                          | DevOps / Build Agent     | QA Agent                 |

---

# 12. Labels sugeridas

## Prioridade

* `priority:must`
* `priority:should`
* `priority:could`

## Tipo

* `type:data`
* `type:content`
* `type:frontend`
* `type:ux`
* `type:ui`
* `type:logic`
* `type:share`
* `type:storage`
* `type:qa`
* `type:build`
* `type:docs`

## Agente

* `agent:po`
* `agent:pmo`
* `agent:architect`
* `agent:frontend`
* `agent:ux`
* `agent:qa`
* `agent:storyteller`
* `agent:devops`

## Risco

* `risk:scope`
* `risk:json`
* `risk:content`
* `risk:card`
* `risk:share`
* `risk:history`
* `risk:performance`
* `risk:build`

## Status

* `status:todo`
* `status:in-progress`
* `status:blocked`
* `status:review`
* `status:done`

---

# 13. Critérios de pronto gerais

Uma tarefa só deve ser considerada pronta quando:

* [ ] respeita o escopo do MVP;
* [ ] não adiciona login;
* [ ] não adiciona backend;
* [ ] não adiciona Supabase;
* [ ] não adiciona IA generativa em runtime;
* [ ] está conectada a uma user story;
* [ ] possui critério de validação claro;
* [ ] risco associado foi considerado;
* [ ] não transforma Should ou Could em bloqueador;
* [ ] está alinhada ao `QA_CHECKLIST.md`, quando aplicável.

---

# 14. Riscos associados ao plano

| Risco                                         | Onde aparece        | Mitigação no plano                          |
| --------------------------------------------- | ------------------- | ------------------------------------------- |
| RISK-001 — Card virar projeto visual complexo | US-06, US-07        | Card mínimo, um template, share cedo        |
| RISK-002 — Histórico inflar em escopo         | US-09, US-10, US-11 | Histórico local limitado, US-10 Should      |
| RISK-003 — Só mais uma tela                   | US-01, US-10        | Evitar onboarding, filtros e telas extras   |
| RISK-005 — Pool de mensagens pobre            | US-05               | Storyteller Agent + curadoria mínima        |
| RISK-006 — Visual prejudicar performance      | US-08, US-12        | Microinteração Could, legibilidade > polish |
| RISK-008 — Identidade atrasar validação       | US-12               | Identidade mínima, sem múltiplos templates  |
| RISK-009 — Share falhar em Android real       | US-07, US-13        | Validar cedo em device físico               |
| RISK-010 — Backlog perder foco                | Todas               | PMO + PO protegem Must                      |
| RISK-013 — JSON inválido quebrar experiência  | US-04, US-05        | Schema + validação + curadoria              |

---

# 15. Sequência recomendada para o Frontend Mobile Agent

O Frontend Mobile Agent não deve começar pela tela visual completa.

A sequência recomendada é:

## Etapa 1 — Scaffold e estrutura

Objetivo:

* criar app Expo;
* configurar TypeScript;
* criar estrutura `app/src`;
* criar pastas base;
* não implementar funcionalidades fora do escopo.

Pastas planejadas:

```text
app/src/
  components/
  screens/
  data/
  services/
  hooks/
  utils/
  theme/
  types/
```

---

## Etapa 2 — Dados e tipos

Objetivo:

* integrar `messages.json` validado do Storyteller (quando disponível);
* criar tipos de mensagem;
* criar validação mínima;
* criar service de mensagens.

Arquivos prováveis:

```text
app/src/data/messages.json
app/src/types/message.types.ts
app/src/services/messagesService.ts
```

---

## Etapa 3 — Consulta

Objetivo:

* criar hook de consulta;
* sortear mensagem do pool local;
* funcionar offline;
* proteger estado contra toques rápidos.

Arquivos prováveis:

```text
app/src/hooks/useOracleMessage.ts
app/src/utils/randomMessage.ts
```

---

## Etapa 4 — Home e card

Objetivo:

* criar tela principal;
* criar botão consultar;
* criar card visual;
* aplicar tema mínimo.

Arquivos prováveis:

```text
app/src/screens/HomeScreen.tsx
app/src/components/ConsultButton.tsx
app/src/components/MessageCard.tsx
app/src/theme/theme.ts
```

---

## Etapa 5 — Compartilhamento

Objetivo:

* criar share service;
* abrir share nativo;
* tratar cancelamento;
* manter fallback em texto;
* validar Android real cedo.

Arquivo provável:

```text
app/src/services/shareService.ts
```

---

## Etapa 6 — Histórico local

Objetivo:

* criar service de histórico;
* persistir últimas 10 mensagens;
* aplicar FIFO;
* definir evidência de QA.

Arquivos prováveis:

```text
app/src/services/historyService.ts
app/src/hooks/useHistory.ts
```

---

## Etapa 7 — Build e QA

Objetivo:

* configurar build interna;
* gerar build Android;
* executar `docs/QA_CHECKLIST.md`;
* registrar bugs;
* decidir GO/NO-GO.

---

# 16. Tarefas que não devem começar agora

Não iniciar sem nova decisão explícita:

* login;
* backend;
* Supabase;
* IA generativa em runtime;
* analytics;
* ranking;
* comentários;
* rede social;
* notificações push;
* favoritos;
* filtros por tom;
* múltiplos templates de card;
* microinterações avançadas;
* publicação pública em loja.

---

# 17. Próximo passo recomendado — início da execução do EP.05

O Software Architect Agent **já produziu** `docs/IMPLEMENTATION_MAP.md`. Não repetir o mapeamento sem necessidade técnica nova.

Execuções propostas para a transição do EP.04 ao EP.05:

1. **Storyteller Agent** — TASK-US05-01/02 e preparação de TASK-US04-02: entregar conteúdo curado e JSON válido, mínimo 15 mensagens (DEC-017).
2. **UX/UI Agent** — TASK-US01-01, TASK-US06-01 e TASK-US12-01: especificar Home, card único e tokens mínimos, com foco em legibilidade.
3. **QA Agent** — definir o método operacional de evidência de TASK-US09-03: observar persistência, limite de 10, FIFO e reabertura sem US-10. O método é planejamento; testes vêm após o código.
4. **Frontend Mobile Agent (Cursor)** — executar TASK-SCAFFOLD-01 e a primeira fatia técnica Must: tipos, JSON integrado, validação/service e, se houver insumos aprovados, consulta offline visível. Relatar exatamente o que executou e o que testou.
5. **PMO / Project Manager Agent** — consolidar resultados, tarefas/board, riscos e diário depois da execução. Não registrar tarefas como prontas sem evidência.

**Paralelismo:** o Frontend pode começar o scaffold enquanto Storyteller, UX/UI e QA definem seus entregáveis. A integração do JSON/UX deve aguardar versões revisadas; testes de US-09 e de compartilhamento em Android dependem da implementação e do dispositivo.

**Fora desta rodada, salvo evidência de execução adicional:** build EAS validada, QA final do MVP, Android físico, histórico com interface, publicação pública. Esses itens não devem ser dados como concluídos automaticamente no EP.05.

---

# 18. Controle de status — linha de base para o EP.05

Os checklists detalhados das seções anteriores descrevem **critérios de pronto** e não constituem, por si sós, evidência de execução.

Situação confirmada ao receber a base v4.4:

| Item | Estado | Evidência / condição |
|---|---|---|
| `ARCHITECTURE.md` e ADR-001…005 | `done` (documentação) | Arquivos existentes e decisões aprovadas |
| `IMPLEMENTATION_MAP.md` | `done` (planejamento) | Mapa técnico existente |
| `TASK-SCAFFOLD-01` | `todo` | Pasta `app/` ausente |
| TASK-US05-01/02 | `todo` | Mensagens ainda não entregues/curadas |
| TASK-US04-02 | `todo` | `messages.json` final não existe |
| TASK-US01-01/US06-01/US12-01 | `todo` | UX/UI mínima ainda não entregue |
| TASK-US09-03 — escolha do método QA | `todo` | Método específico ainda não escolhido |
| Implementação e testes das histórias Must | `todo` | Sem código, build ou validação confirmados |

Estados operacionais usados no acompanhamento: `todo`, `in-progress`, `blocked`, `review`, `done`. Os status acima são **fotografia da base v4.4**; após cada agente, o PMO atualiza a situação com arquivos, commits, comandos, testes e bloqueios realmente observados.

Uma decisão em ADR pode estar `done` como documentação, enquanto sua implementação continua `todo`. Da mesma forma, escolher a estratégia de QA não comprova que o teste passou.

---

# 19. Resumo executivo

O planejamento técnico necessário para **iniciar o scaffold Expo** está concluído: arquitetura, ADRs, tarefas, checklist QA e mapa de implementação já existem.

Não há bloqueio de arquitetura para começar `TASK-SCAFFOLD-01`. As pendências são entregáveis de conteúdo, UX e evidência de QA que podem avançar em paralelo.

A primeira fatia demonstrável desejada é:

```text
Scaffold Expo → tipos → JSON curado → messagesService → consulta offline inicial
```

A cadeia completa Must, a ser percorrida em etapas posteriores, permanece:

```text
JSON local → Consultar → Card → Compartilhar → Histórico local → Build interna → QA Android real
```

**Não confundir scaffold concluído com MVP concluído, nem teste local com validação em dispositivo físico.** Should, Could e backlog futuro não são bloqueadores.

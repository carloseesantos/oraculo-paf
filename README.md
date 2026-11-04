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

## Estado confirmado do repositório (base v4.5, preparação do EP.05)

### Concluído como planejamento/documentação

- Contexto, hipótese, restrições e backlog consolidados.
- Time de agentes definido em `docs/AGENTS.md`.
- Revisão crítica do backlog em `docs/BACKLOG_REVIEW.md`.
- Checklist de QA preparado em `docs/QA_CHECKLIST.md`.
- Plano de tarefas em `docs/TASKS.md`.
- Arquitetura, cinco ADRs iniciais e mapa técnico aprovados/documentados.
- Decisões, riscos e diário de bordo registrados.

### Ainda não concluído como execução

- Base final curada em `app/src/data/messages.json` (Storyteller).
- Especificação visual mínima da Home e do card (UX/UI).
- Definição operacional de evidência para US-09 (QA, antes da validação).
- Scaffold Expo em `app/` e arquivos de implementação.
- Execução de testes, build interna e validação em Android físico.

**Importante:** os artefatos de planejamento existem, mas **a pasta** `app/` **ainda não consta na base v4.4**. Nenhum teste funcional ou build deve ser declarado realizado até existir evidência correspondente.

---

## Estrutura de arquivos existente

```text
oraculo-paf/
  README.md
  docs/
    PROJECT_CONTEXT.md
    AGENTS.md
    BACKLOG.md
    BACKLOG_REVIEW.md
    QA_CHECKLIST.md
    TASKS.md
    ARCHITECTURE.md
    IMPLEMENTATION_MAP.md
    DECISIONS.md
    RISKS.md
    DIARY.md
    adr/
      ADR-001-stack-expo-react-native.md
      ADR-002-json-local-no-mvp.md
      ADR-003-sem-backend-no-mvp.md
      ADR-004-historico-local-limitado.md
      ADR-005-compartilhamento-card.md
```

Estrutura técnica planejada (ainda não implementada nesta base):

```text
app/
  src/
    components/
    screens/
    data/
    services/
    hooks/
    utils/
    theme/
    types/
```

Arquivos técnicos detalhados estão mapeados em `docs/IMPLEMENTATION_MAP.md`. As pastas não devem ser usadas como prova de funcionalidade pronta.

---

## Documentos e fontes de verdade

| Documento | Finalidade |
|---|---|
| `docs/PROJECT_CONTEXT.md` | Visão, hipótese, restrições e princípios |
| `docs/AGENTS.md` | Papéis, limites e orientações dos agentes |
| `docs/BACKLOG.md` | User stories, MoSCoW e critérios de aceite |
| `docs/BACKLOG_REVIEW.md` | Revisão crítica já realizada pelo PO |
| `docs/QA_CHECKLIST.md` | Cenários, riscos e checklist go/no-go |
| `docs/TASKS.md` | Tarefas, dependências e acompanhamento da execução |
| `docs/ARCHITECTURE.md` | Arquitetura e contratos de dados |
| `docs/IMPLEMENTATION_MAP.md` | Mapeamento de histórias/tarefas para arquivos e ordem técnica |
| `docs/DECISIONS.md` | Decisões aprovadas |
| `docs/RISKS.md` | Riscos e mitigação |
| `docs/DIARY.md` | Histórico real de execução e aprendizados |
| `docs/adr/` | ADR-001 a ADR-005, já existentes e aprovados |

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

### Sequência operacional do EP.05

1. **Storyteller:** gerar e curar pelo menos 15 mensagens válidas, com no mínimo cinco por tom, seguindo o schema existente.
2. **UX/UI:** definir Home, card único e tokens visuais mínimos.
3. **QA:** escolher o método de evidência técnica de US-09, sem tornar US-10 obrigatória; testes reais ocorrerão depois da implementação.
4. **Frontend Mobile:** iniciar `TASK-SCAFFOLD-01` no Cursor. O scaffold pode começar em paralelo às três preparações anteriores; integrar os artefatos aprovados assim que disponíveis e avançar para a primeira consulta offline.
5. **PMO:** consolidar somente entregas e resultados efetivamente observados; atualizar status, decisões e diário de bordo.

**Não exigir que Storyteller, UX/UI e QA terminem para iniciar apenas o scaffold.** São dependências da integração/validação correspondente, não da criação do projeto Expo.

A ordem de implementação Must, os critérios de pronto e as dependências detalhadas continuam em `docs/TASKS.md` e `docs/IMPLEMENTATION_MAP.md`.

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

A série **Do Zero ao Produto**, da newsletter **Papo de Gerente**, relata prompts, respostas, decisões, erros, código e validações reais. O EP.04 cobriu a transformação do backlog em critérios testáveis, tarefas e mapa técnico. O EP.05 acompanhará a passagem à execução, com o board mínimo como instrumento de gestão e não como finalidade.

**Frase guia:** “Antes de acelerar com IA, organize o caminho.”

**Princípio central:** IA acelera. Mas, se o caminho estiver errado, ela só ajuda você a errar mais rápido.

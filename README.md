# ORÁCULO PAF

Repositório de desenvolvimento do **ORÁCULO PAF**, um micro-app mobile de experiência rápida, emocional e compartilhável.

O projeto faz parte da série **“Do Zero ao Produto”**, publicada na newsletter **Papo de Gerente**, com o objetivo de documentar a construção real de um produto usando IA como apoio em etapas de gestão, produto, arquitetura, backlog, desenvolvimento, QA e publicação.

---

## Visão do produto

O ORÁCULO PAF é um app mobile simples:

> O usuário abre o app, toca em um botão e recebe uma mensagem poética, mística ou humorística, visualmente bonita e com potencial de compartilhamento.

A experiência principal deve ser:

```text
Abrir app → Consultar → Ver card → Compartilhar
                         ↓
              Histórico local simples
                         ↓
              Validar hipótese principal
```

---

## Hipótese principal do MVP

O MVP existe para validar a seguinte hipótese:

> Usuários irão se identificar com mensagens rápidas, poéticas, místicas ou humorísticas a ponto de querer compartilhar o card gerado em redes sociais ou aplicativos de mensagem.

O objetivo inicial não é construir uma plataforma completa.

O objetivo é validar uma experiência simples, de baixo atrito, com potencial emocional e compartilhável.

---

## Escopo do MVP

O MVP deverá conter:

* tela principal;
* botão de consulta;
* seleção aleatória de mensagem;
* mensagens em JSON local;
* card visual para exibição da mensagem;
* compartilhamento do card;
* histórico local limitado às últimas 10 mensagens;
* identidade visual mínima e consistente;
* build interna para teste em dispositivo real.

---

## Fora do escopo do MVP

Os itens abaixo **não fazem parte da primeira versão**:

* login;
* cadastro;
* perfil de usuário;
* backend;
* Supabase;
* banco de dados remoto;
* sincronização em nuvem;
* IA generativa em tempo real dentro do app;
* ranking;
* comentários;
* curtidas;
* seguidores;
* rede social;
* notificações push;
* monetização;
* analytics avançado;
* gamificação pesada;
* personalização avançada.

Esses itens podem ser avaliados futuramente, mas não devem interferir na validação inicial do MVP.

---

## Stack planejada

Stack inicial definida para o MVP:

* Expo;
* React Native;
* TypeScript;
* JSON local;
* armazenamento local;
* compartilhamento nativo;
* EAS Build para testes internos.

A arquitetura inicial é **client-only**, sem backend no MVP.

---

## Estado atual do projeto

Status atual:

* documentação de contexto criada;
* agentes IA definidos;
* backlog inicial consolidado;
* decisões registradas;
* riscos iniciais registrados;
* arquitetura inicial criada;
* ADRs iniciais em preparação;
* app ainda não scaffoldado.

O repositório está, neste momento, na fase de **preparação estruturada antes da implementação**.

---

## Estrutura atual do repositório

```text
oraculo-paf/
  docs/
    AGENTS.md
    ARCHITECTURE.md
    BACKLOG.md
    DECISIONS.md
    DIARY.md
    PROJECT_CONTEXT.md
    RISKS.md

  README.md
```

Estrutura planejada para a aplicação:

```text
oraculo-paf/
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

---

## Documentação principal

### `docs/PROJECT_CONTEXT.md`

Documento central de contexto do projeto.

Contém:

* visão do produto;
* hipótese principal;
* escopo do MVP;
* fora do escopo;
* stack planejada;
* riscos;
* critérios de pronto;
* princípios de decisão.

Todos os agentes devem considerar este documento antes de gerar qualquer saída.

---

### `docs/AGENTS.md`

Define os agentes IA oficiais do projeto:

* Product Owner Agent;
* Software Architect Agent;
* Frontend Mobile Agent;
* UX/UI Agent;
* QA Agent;
* Storyteller Agent;
* PMO / Project Manager Agent;
* DevOps / Build Agent.

Cada agente possui missão, responsabilidades, limites, formato de resposta e prompt base.

---

### `docs/BACKLOG.md`

Backlog inicial consolidado do MVP.

Contém:

* épicos;
* user stories;
* critérios de aceite;
* prioridades MoSCoW;
* ordem sugerida de implementação;
* riscos de escopo;
* backlog futuro.

---

### `docs/ARCHITECTURE.md`

Documento inicial de arquitetura.

Contém:

* visão arquitetural;
* stack técnica;
* estrutura sugerida de pastas;
* modelo de dados;
* fluxos principais;
* estratégia para JSON local;
* estratégia para histórico local;
* estratégia para compartilhamento;
* dependências sugeridas;
* riscos técnicos;
* ADRs recomendados.

---

### `docs/DECISIONS.md`

Registro leve de decisões do projeto.

Contém decisões de produto, arquitetura, gestão e execução.

---

### `docs/RISKS.md`

Registro dos riscos atuais do MVP.

Cada risco contém:

* descrição;
* impacto;
* probabilidade;
* plano de mitigação;
* dono sugerido;
* status.

---

### `docs/DIARY.md`

Diário de bordo do projeto.

Registra:

* linha do tempo;
* agentes executados;
* artefatos criados;
* decisões relevantes;
* próximos passos.

---

## Agentes IA

Este projeto utiliza agentes IA especializados.

A proposta não é usar um único chat genérico para todas as tarefas.

A proposta é trabalhar com agentes com papel, contexto e responsabilidade específicos.

Exemplo de agentes:

| Agente                      | Função                                                        |
| --------------------------- | ------------------------------------------------------------- |
| Product Owner Agent         | Transformar visão em backlog, histórias e critérios de aceite |
| Software Architect Agent    | Definir arquitetura simples e evolutiva                       |
| PMO / Project Manager Agent | Registrar decisões, riscos, diário e próximos passos          |
| UX/UI Agent                 | Orientar fluxo, hierarquia visual e experiência               |
| Storyteller Agent           | Criar e curar mensagens do Oráculo                            |
| Frontend Mobile Agent       | Implementar o app em Expo/React Native                        |
| QA Agent                    | Criar cenários de teste e validar critérios                   |
| DevOps / Build Agent        | Apoiar build interna e publicação inicial                     |

---

## Estratégia de execução

Ordem inicial recomendada:

1. Contexto do projeto;
2. Definição dos agentes;
3. Backlog inicial;
4. Registro de decisões e riscos;
5. Arquitetura inicial;
6. ADRs;
7. UX/UI;
8. Storyteller / mensagens;
9. Scaffold Expo;
10. Implementação frontend;
11. QA;
12. Build interna.

---

## ADRs planejados

Os primeiros ADRs previstos são:

```text
docs/adr/ADR-001-stack-expo-react-native.md
docs/adr/ADR-002-json-local-no-mvp.md
docs/adr/ADR-003-sem-backend-no-mvp.md
docs/adr/ADR-004-historico-local-limitado.md
docs/adr/ADR-005-compartilhamento-card.md
```

---

## Princípios do MVP

Toda decisão deve respeitar os seguintes princípios:

* simplicidade antes de sofisticação;
* baixo atrito para o usuário;
* sem login no MVP;
* sem backend no MVP;
* sem IA generativa em runtime no MVP;
* foco no fluxo principal;
* compartilhamento como principal sinal de validação;
* documentação útil, não burocrática;
* decisões registradas de forma rastreável;
* evolução apenas após validação.

---

## Como trabalhar neste repositório

Antes de qualquer nova tarefa, o agente ou colaborador deve ler:

```text
docs/PROJECT_CONTEXT.md
docs/AGENTS.md
docs/BACKLOG.md
docs/DECISIONS.md
docs/RISKS.md
```

Para tarefas técnicas, considerar também:

```text
docs/ARCHITECTURE.md
```

Nenhuma implementação deve adicionar backend, login, Supabase ou IA generativa em runtime sem revisão explícita de escopo.

---

## Status resumido

```text
✅ Contexto definido
✅ Agentes definidos
✅ Backlog consolidado
✅ PMO inicial executado
✅ Decisões registradas
✅ Riscos registrados
✅ Arquitetura inicial criada
⏳ ADRs iniciais em criação
⏳ UX/UI Agent pendente
⏳ Storyteller Agent pendente
⏳ Scaffold Expo pendente
```

---

## Próximos passos

Próximos passos imediatos:

1. Criar ADRs iniciais em `docs/adr/`;
2. Atualizar `DIARY.md`, `DECISIONS.md` e `RISKS.md` após execução do Software Architect Agent;
3. Executar UX/UI Agent;
4. Executar Storyteller Agent;
5. Criar scaffold Expo;
6. Iniciar implementação das histórias Must.

---

## Série editorial

Este projeto é documentado publicamente na série **“Do Zero ao Produto”**, da newsletter **Papo de Gerente**.

A série acompanha:

* decisões reais;
* prompts usados;
* respostas dos agentes;
* análises críticas;
* erros e ajustes;
* artefatos de projeto;
* código;
* QA;
* build;
* aprendizados sobre uso prático de IA em projetos de tecnologia.

---

## Frase guia

> Antes de acelerar com IA, organize o caminho.

E também:

> IA acelera. Mas se o caminho estiver errado, ela só ajuda você a errar mais rápido.

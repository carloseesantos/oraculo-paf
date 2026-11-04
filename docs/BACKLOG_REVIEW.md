# BACKLOG_REVIEW.md

# ORÁCULO PAF — Revisão do Backlog pelo Product Owner Agent

## 1. Objetivo deste documento

Este documento registra a revisão do backlog oficial do MVP do ORÁCULO PAF a partir da perspectiva do **Product Owner Agent**.

A revisão considera os documentos:

* `docs/PROJECT_CONTEXT.md`
* `docs/AGENTS.md`
* `docs/BACKLOG.md`
* `docs/DECISIONS.md`
* `docs/RISKS.md`

A análise verifica se as user stories estão conectadas à hipótese principal do MVP:

> Usuários irão se identificar com mensagens rápidas, poéticas, místicas ou humorísticas a ponto de querer compartilhar o card gerado.

---

## 2. Avaliação geral do backlog

O backlog atual está bem estruturado para um MVP.

Ele apresenta:

* cinco épicos claros;
* treze user stories;
* priorização MoSCoW;
* restrições explícitas do MVP;
* foco em experiência rápida;
* ausência de login, backend e IA generativa em runtime;
* risco de escopo mapeado;
* ordem inicial de implementação.

A estrutura geral está coerente com a hipótese principal.

O fluxo de valor está bem definido:

```text
Abrir app → Consultar → JSON local → Card visual → Compartilhar
                              ↓
                    Histórico local simples
                              ↓
                    Validar hipótese principal
```

O backlog evita o erro comum de transformar o MVP em plataforma.

Não há stories para rede social, ranking, comentários, login, backend, Supabase, analytics avançado ou IA generativa em tempo real.

Essa é uma boa decisão de produto.

---

## 3. Avaliação contra a hipótese principal

A hipótese principal depende de três pilares:

1. A mensagem precisa gerar identificação.
2. O card precisa apresentar a mensagem com valor visual.
3. O compartilhamento precisa funcionar com baixo atrito.

As histórias mais diretamente conectadas à hipótese são:

* US-02 — Consultar mensagem aleatória
* US-04 — JSON local com tons
* US-05 — Mensagens curtas e legíveis
* US-06 — Card visual da mensagem
* US-07 — Compartilhar o card

Essas histórias formam o núcleo real do MVP.

O histórico local, a identidade visual e a build interna são importantes, mas têm papéis diferentes:

* histórico local melhora continuidade;
* identidade visual melhora percepção;
* build interna permite validação real.

Nenhuma delas deve competir com consulta, card e compartilhamento.

---

## 4. Histórias Must realmente essenciais

As histórias abaixo devem permanecer como **Must**, pois são necessárias para validar o MVP.

### US-01 — Tela principal clara

**Avaliação:** manter como Must.

Sem uma tela principal clara, o usuário não entende a experiência.

A história está bem conectada ao princípio de baixo atrito.

### US-02 — Consultar mensagem aleatória

**Avaliação:** manter como Must.

Esta é a ação central do produto.

Sem consulta, não existe experiência do ORÁCULO PAF.

### US-04 — JSON local com tons

**Avaliação:** manter como Must.

O JSON local viabiliza o MVP sem backend e sem dependência de rede.

Também preserva a decisão arquitetural já registrada.

### US-05 — Mensagens curtas e legíveis

**Avaliação:** recomenda-se elevar de Should para Must.

Justificativa:

A qualidade mínima das mensagens não é apenas refinamento.

Ela é parte central da hipótese.

Se as mensagens forem longas, genéricas, mal classificadas ou pouco compartilháveis, o MVP pode falhar mesmo com a parte técnica funcionando.

Recomendação:

Alterar prioridade para **Must**, mas com escopo bem controlado:

* não significa criar grande volume de conteúdo;
* não significa curadoria avançada;
* não significa IA generativa em runtime;
* significa garantir uma base mínima de mensagens adequadas ao card e ao compartilhamento.

### US-06 — Card visual da mensagem

**Avaliação:** manter como Must.

O card é o formato visual da experiência.

Sem card, o produto vira apenas um sorteador de frases.

### US-07 — Compartilhar o card

**Avaliação:** manter como Must.

Essa é a história mais importante para validar a hipótese principal.

O compartilhamento é o principal sinal de identificação e potencial orgânico.

### US-09 — Persistir últimas 10 consultas

**Avaliação:** manter como Must, com atenção ao escopo.

O histórico local faz parte da proposta inicial, mas deve permanecer simples.

A persistência local é aceitável como Must desde que não gere nova complexidade visual ou social.

### US-12 — Identidade visual consistente

**Avaliação:** manter como Must, mas renomear para identidade visual mínima e consistente.

A palavra “consistente” pode abrir espaço para refinamento visual excessivo.

Recomendação:

Ajustar para:

**US-12 — Identidade visual mínima e consistente**

Critério importante:

* a identidade deve apoiar a validação, não atrasá-la.

### US-13 — Build interna para teste

**Avaliação:** manter como Must.

Sem build interna em dispositivo real, não há validação prática do fluxo.

---

## 5. Histórias Should que podem ser adiadas

As histórias abaixo são importantes, mas podem ser adiadas se ameaçarem prazo, foco ou simplicidade.

### US-03 — Evitar repetição consecutiva

**Avaliação:** manter como Should.

É uma melhoria simples e útil, mas não deve bloquear o primeiro fluxo funcional.

Pode ser implementada após a consulta básica estar funcionando.

### US-10 — Visualizar histórico

**Avaliação:** recomenda-se alterar de Must para Should.

Justificativa:

Persistir as últimas 10 mensagens é útil.

Mas criar uma tela ou lista acessível de histórico pode adicionar fluxo, UI e testes.

A hipótese principal é validada principalmente por:

```text
consultar → ver card → compartilhar
```

A visualização do histórico melhora a experiência, mas não deve competir com o fluxo principal.

Recomendação:

Alterar prioridade para **Should**.

### US-11 — Compartilhar a partir do histórico

**Avaliação:** manter como Should apenas se reutilizar o mesmo mecanismo de compartilhamento.

Se exigir fluxo novo, deve cair para Could.

Critério recomendado:

* não criar uma experiência separada para compartilhamento a partir do histórico;
* reutilizar o mecanismo já criado em US-07.

---

## 6. Histórias Could que não devem entrar se houver risco de prazo

### US-08 — Microinteração ao consultar

**Avaliação:** manter como Could.

Essa história não deve entrar se houver qualquer risco de:

* atraso;
* dependência visual pesada;
* perda de performance;
* distração do fluxo principal;
* aumento do retrabalho.

Microinteração é melhoria de experiência, não base do MVP.

Ela só deve entrar depois de:

* consulta funcionando;
* card funcionando;
* compartilhamento validado;
* histórico local implementado;
* build interna gerada.

---

## 7. Histórias grandes demais ou ambíguas

### US-12 — Identidade visual consistente

Esta história pode ser interpretada de forma ampla demais.

Risco:

* transformar identidade visual em uma rodada grande de design;
* atrasar a validação;
* buscar sofisticação antes de funcionamento.

Recomendação:

Renomear para:

**US-12 — Identidade visual mínima e consistente**

E reforçar nos critérios:

* visual inicial simples;
* sem múltiplos templates;
* sem refinamento avançado antes do teste interno;
* legibilidade acima de sofisticação.

---

### US-13 — Build interna para teste

A história é necessária, mas pode ficar ampla.

Risco:

* misturar build, QA, distribuição, publicação e validação em uma única story.

Recomendação:

Manter como Must, mas transformar em tarefas menores no `docs/TASKS.md`.

Exemplos de tarefas futuras:

* configurar projeto Expo;
* validar execução local;
* configurar EAS;
* gerar build Android interna;
* instalar em dispositivo real;
* executar checklist mínimo.

Não é necessário quebrar a user story agora, apenas detalhar em tarefas.

---

### US-10 — Visualizar histórico

A história pode gerar nova tela, navegação, estado vazio e novos fluxos.

Recomendação:

Rebaixar para Should e manter implementação simples.

Possíveis formatos aceitáveis:

* lista simples abaixo do card;
* área recolhível;
* tela simples sem complexidade visual.

Evitar:

* favoritos;
* filtros;
* busca;
* coleção;
* perfil;
* sincronização.

---

## 8. Critérios de aceite que precisam melhorar

### US-04 — JSON local com tons

Critérios atuais são bons, mas precisam incluir validação mínima.

Adicionar critérios sugeridos:

* mensagens sem `id` não devem ser consideradas válidas;
* mensagens sem `text` não devem ser exibidas;
* mensagens sem `tone` devem ser classificadas como inválidas ou fallback;
* IDs duplicados devem ser evitados na curadoria;
* a estrutura do JSON deve permitir evolução futura sem alterar o fluxo principal.

---

### US-05 — Mensagens curtas e legíveis

Adicionar critérios mais conectados à hipótese:

* cada mensagem deve caber no card sem quebrar layout;
* cada mensagem deve ter potencial de identificação ou compartilhamento;
* mensagens genéricas demais devem ser removidas na curadoria;
* cada tom deve ter quantidade mínima inicial de mensagens;
* a base inicial deve conter exemplos dos três tons: poética, mística e humorística.

---

### US-07 — Compartilhar o card

Adicionar critérios técnicos de validação:

* compartilhamento deve ser testado em Android real;
* falha de compartilhamento deve ter tratamento simples;
* se imagem do card falhar, fallback em texto pode ser usado;
* o compartilhamento não deve depender de backend;
* o compartilhamento não deve exigir login;
* o fluxo deve ser validado cedo, antes de refinamentos visuais.

---

### US-09 — Persistir últimas 10 consultas

Adicionar critérios de comportamento:

* ao inserir a 11ª mensagem, a mais antiga deve ser removida;
* histórico deve manter ordem do mais recente para o mais antigo;
* mensagens inválidas não devem ser salvas;
* persistência deve sobreviver ao fechamento e reabertura do app.

---

### US-13 — Build interna para teste

Adicionar critérios de validação:

* build deve ser instalada em pelo menos um dispositivo Android real;
* fluxo principal deve ser executado na build;
* problemas críticos devem ser registrados;
* checklist mínimo de QA deve ser executado antes de considerar a build validada.

---

## 9. Riscos de escopo identificados

### Risco 1 — Histórico ganhar importância demais

O histórico é útil, mas não é o centro da hipótese.

Se US-10 permanecer como Must, pode puxar mais UI e navegação do que o necessário.

Mitigação:

* manter US-09 como Must;
* alterar US-10 para Should;
* manter US-11 como Should condicionado ou Could.

---

### Risco 2 — Identidade visual atrasar o MVP

A história de identidade visual pode gerar discussões de design antes de termos fluxo validado.

Mitigação:

* renomear para identidade visual mínima;
* limitar escopo visual;
* priorizar legibilidade;
* evitar múltiplos templates de card no MVP.

---

### Risco 3 — Qualidade das mensagens ser tratada como secundária

US-05 está como Should, mas conteúdo ruim pode invalidar o teste.

Mitigação:

* elevar US-05 para Must;
* acionar Storyteller Agent antes da implementação final do card;
* testar mensagens reais no card;
* criar curadoria mínima.

---

### Risco 4 — Compartilhamento ser validado tarde demais

Como compartilhamento é núcleo da hipótese, qualquer problema técnico descoberto tarde pode comprometer o MVP.

Mitigação:

* validar US-07 cedo;
* aceitar card simples inicialmente;
* manter fallback em texto;
* testar em Android real antes de refinamento visual.

---

### Risco 5 — Should virar compromisso implícito

Histórias Should podem começar a ser tratadas como obrigatórias.

Mitigação:

* preservar Must como núcleo real do MVP;
* implementar Should apenas depois do fluxo principal;
* registrar qualquer inclusão adicional como decisão explícita.

---

## 10. Recomendações de ajuste

## Ajuste 1 — Elevar US-05 para Must

Alterar:

```text
US-05 — Mensagens curtas e legíveis
Prioridade: Should
```

Para:

```text
US-05 — Mensagens curtas, legíveis e compartilháveis
Prioridade: Must
```

Justificativa:

Sem conteúdo minimamente bom, a hipótese não é testada corretamente.

---

## Ajuste 2 — Rebaixar US-10 para Should

Alterar:

```text
US-10 — Visualizar histórico
Prioridade: Must
```

Para:

```text
US-10 — Visualizar histórico
Prioridade: Should
```

Justificativa:

Persistir histórico é útil, mas visualizar histórico pode ser simplificado ou adiado.

---

## Ajuste 3 — Manter US-11 como Should condicionado

US-11 pode permanecer como Should desde que reutilize US-07.

Caso exija fluxo próprio, deve virar Could.

---

## Ajuste 4 — Renomear US-12

Alterar:

```text
US-12 — Identidade visual consistente
```

Para:

```text
US-12 — Identidade visual mínima e consistente
```

Justificativa:

Evita interpretação de refinamento visual amplo.

---

## Ajuste 5 — Reforçar critérios técnicos de US-07

Adicionar critérios sobre:

* teste em Android real;
* fallback em texto;
* ausência de login;
* ausência de backend;
* tratamento de falhas.

---

## Ajuste 6 — Adicionar validação mínima ao JSON

Adicionar critérios em US-04 ou US-05 sobre:

* campos obrigatórios;
* IDs únicos;
* mensagens sem texto;
* mensagens longas demais;
* tons válidos.

---

## 11. Priorização recomendada após revisão

### Must recomendado

| ID    | História                                     | Observação            |
| ----- | -------------------------------------------- | --------------------- |
| US-01 | Tela principal clara                         | Manter                |
| US-02 | Consultar mensagem aleatória                 | Manter                |
| US-04 | JSON local com tons                          | Manter                |
| US-05 | Mensagens curtas, legíveis e compartilháveis | Elevar para Must      |
| US-06 | Card visual da mensagem                      | Manter                |
| US-07 | Compartilhar o card                          | Manter                |
| US-09 | Persistir últimas 10 consultas               | Manter                |
| US-12 | Identidade visual mínima e consistente       | Manter com renomeação |
| US-13 | Build interna para teste                     | Manter                |

---

### Should recomendado

| ID    | História                           | Observação                                  |
| ----- | ---------------------------------- | ------------------------------------------- |
| US-03 | Evitar repetição consecutiva       | Manter                                      |
| US-10 | Visualizar histórico               | Rebaixar para Should                        |
| US-11 | Compartilhar a partir do histórico | Manter condicionado à reutilização do share |

---

### Could recomendado

| ID    | História                    | Observação |
| ----- | --------------------------- | ---------- |
| US-08 | Microinteração ao consultar | Manter     |

---

## 12. Conclusão: o backlog está pronto para execução?

Sim, o backlog está quase pronto para execução.

Ele está bem conectado à hipótese principal, protege o MVP contra aumento de escopo e evita funcionalidades prematuras.

Porém, antes de avançar para tarefas e implementação, recomenda-se aplicar os ajustes abaixo:

1. Elevar US-05 para Must.
2. Rebaixar US-10 para Should.
3. Renomear US-12 para identidade visual mínima.
4. Reforçar critérios de aceite de US-04, US-05, US-07, US-09 e US-13.
5. Garantir que US-11 só entre se reaproveitar o compartilhamento já criado.
6. Manter US-08 como Could e fora do caminho crítico.

Depois desses ajustes, o backlog estará adequado para seguir para:

* QA Agent;
* PMO Agent;
* `docs/QA_CHECKLIST.md`;
* `docs/TASKS.md`;
* `docs/IMPLEMENTATION_MAP.md`.

---

## 13. Recomendação de próxima ação

Próxima ação recomendada:

Atualizar `docs/BACKLOG.md` com os ajustes desta revisão.

Depois disso, executar o **QA Agent** para transformar as histórias Must em cenários testáveis.

O foco do QA Agent deve ser:

* fluxo principal;
* JSON local;
* qualidade das mensagens;
* card visual;
* compartilhamento;
* histórico local;
* build interna.

Não iniciar implementação antes dessa revisão de QA.

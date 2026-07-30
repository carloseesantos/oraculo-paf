# PROJECT_CONTEXT.md

# ORÁCULO PAF — Project Context

## 1. Visão geral do produto

O ORÁCULO PAF é um micro-app mobile de experiência rápida, emocional e compartilhável.

A proposta é simples:

> O usuário abre o app, toca em um botão e recebe uma mensagem poética, mística ou humorística, visualmente bonita e com potencial de compartilhamento.

O produto faz parte da iniciativa PAF Mini, uma linha de pequenas experiências digitais com baixo atrito, uso instantâneo e forte apelo visual.

O ORÁCULO PAF será o primeiro app desenvolvido nesta série prática do Papo de Gerente, usando IA como apoio em várias etapas do processo: discovery, gestão, arquitetura, backlog, desenvolvimento, QA, documentação e tomada de decisão.

---

## 2. Objetivo da série

Esta série documenta a construção real do ORÁCULO PAF, do zero ao produto funcional.

A proposta não é criar um tutorial genérico nem um projeto fictício.

A proposta é mostrar:

* decisões reais de produto;
* uso prático de IA;
* prompts utilizados;
* respostas analisadas criticamente;
* artefatos gerados;
* evolução do backlog;
* criação de agentes IA;
* código produzido;
* erros, ajustes e retrabalho;
* validação e publicação inicial.

A série tem valor editorial, técnico e profissional.

Ela deve reforçar a visão de que IA não substitui gestão, produto ou experiência técnica, mas potencializa profissionais que sabem estruturar contexto, fazer boas perguntas e tomar decisões melhores.

---

## 3. Hipótese principal do MVP

A hipótese central do ORÁCULO PAF é:

> Usuários irão se identificar com mensagens rápidas, poéticas, místicas ou humorísticas a ponto de querer compartilhar o card gerado em redes sociais ou aplicativos de mensagem.

O MVP não existe apenas para provar que conseguimos criar um app.

Ele existe para testar se a experiência principal gera identificação, repetição e compartilhamento.

---

## 4. Experiência principal do usuário

Fluxo esperado:

1. Usuário abre o app.
2. Visualiza a tela principal.
3. Toca no botão “consultar”.
4. Recebe uma mensagem aleatória.
5. Visualiza a mensagem em um card bonito.
6. Pode compartilhar o card.
7. O app salva localmente as últimas mensagens consultadas.

A experiência deve ser:

* rápida;
* clara;
* visualmente marcante;
* emocional;
* leve;
* compartilhável;
* sem necessidade de explicação.

Se o usuário precisar de tutorial para entender o app, a experiência falhou.

---

## 5. Escopo do MVP

O MVP deverá conter:

* tela principal;
* botão “consultar”;
* seleção aleatória de mensagem;
* base de mensagens em JSON local;
* mensagens classificadas por tom/categoria;
* card visual para exibição da mensagem;
* funcionalidade de compartilhamento do card;
* histórico local das últimas 10 mensagens;
* identidade visual simples e consistente;
* funcionamento offline básico;
* build para teste interno.

---

## 6. Fora do escopo do MVP

Os seguintes itens não fazem parte da primeira versão:

* login;
* cadastro;
* perfil de usuário;
* backend;
* Supabase;
* sincronização em nuvem;
* IA generativa em tempo real dentro do app;
* ranking;
* comentários;
* curtidas;
* seguidores;
* comunidade;
* monetização;
* notificações push;
* analytics avançado;
* personalização avançada;
* favoritos em nuvem;
* gamificação pesada;
* assinatura;
* loja interna;
* múltiplas trilhas complexas.

Esses itens podem ser considerados no futuro, mas não devem interferir na validação inicial do MVP.

---

## 7. Decisões de produto já tomadas

### 7.1 Decisão: experiência sem login

Motivo:

O ORÁCULO PAF precisa ser uma experiência de baixo atrito. Solicitar login no primeiro uso aumentaria fricção e desviaria o foco da hipótese principal.

### 7.2 Decisão: conteúdo em JSON local no MVP

Motivo:

A base inicial de mensagens pode ser embarcada no app. Isso reduz complexidade, elimina dependência de backend e acelera a primeira validação.

### 7.3 Decisão: sem IA generativa em tempo real no MVP

Motivo:

Apesar da série usar IA intensamente no processo, a primeira versão do app não precisa depender de geração em tempo real.

A IA será usada para:

* discovery;
* curadoria;
* geração e refinamento de mensagens;
* documentação;
* arquitetura;
* backlog;
* QA;
* automação de tarefas;
* suporte ao desenvolvimento.

Mas não será obrigatória dentro da experiência final do usuário no MVP.

### 7.4 Decisão: histórico local limitado

Motivo:

O histórico será simples e local, com as últimas 10 mensagens consultadas. Isso evita backend, login e sincronização prematura.

### 7.5 Decisão: foco em compartilhamento

Motivo:

A hipótese principal depende da identificação do usuário com a mensagem e da vontade de compartilhar o card.

Portanto, a experiência visual do card e o fluxo de compartilhamento são partes centrais do MVP.

---

## 8. Stack inicial

Stack planejada para o MVP:

* Expo;
* React Native;
* TypeScript;
* JSON local;
* armazenamento local para histórico;
* geração de card compartilhável;
* EAS Build para testes internos.

Possíveis evoluções futuras:

* Supabase;
* analytics;
* atualização remota de conteúdo;
* autenticação;
* notificações;
* distribuição pública em loja.

Essas evoluções não fazem parte do MVP.

---

## 9. Estrutura inicial sugerida do projeto

Estrutura base sugerida:

```text
oraculo-paf/
  docs/
    PROJECT_CONTEXT.md
    AGENTS.md
    BACKLOG.md
    ARCHITECTURE.md
    RISKS.md
    DECISIONS.md
    QA_CHECKLIST.md
    DIARY.md

  prompts/
    agents/
      po-agent.md
      architect-agent.md
      frontend-agent.md
      ux-agent.md
      qa-agent.md
      storyteller-agent.md
      pmo-agent.md

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

  README.md
```

---

## 10. Estrutura técnica sugerida dentro do app

```text
app/
  src/
    components/
      MessageCard.tsx
      ConsultButton.tsx

    screens/
      HomeScreen.tsx
      HistoryScreen.tsx

    data/
      messages.json

    services/
      historyService.ts
      shareService.ts

    hooks/
      useOracleMessage.ts
      useHistory.ts

    utils/
      randomMessage.ts
      formatMessage.ts

    theme/
      theme.ts

    types/
      message.types.ts
```

Essa estrutura deve ser simples o suficiente para começar, mas clara o suficiente para crescer.

---

## 11. Modelo inicial de mensagem

Sugestão de schema para mensagens:

```json
{
  "id": "msg-001",
  "text": "O universo cochicha, mas só quem respira devagar consegue ouvir.",
  "tone": "mistica",
  "category": "oraculo",
  "tags": ["universo", "intuição", "calma"],
  "shareable": true
}
```

Tons iniciais sugeridos:

* poetica;
* mistica;
* humoristica.

Campos possíveis:

* id;
* text;
* tone;
* category;
* tags;
* shareable;
* author;
* createdAt;
* version.

Para o MVP, manter schema simples.

---

## 12. Critérios de pronto do MVP

### 12.1 Critérios funcionais

* Usuário consegue abrir o app.
* Usuário consegue consultar uma mensagem.
* Botão principal gera nova mensagem.
* Mensagens vêm da base local.
* Histórico salva as últimas 10 mensagens.
* Usuário consegue visualizar histórico.
* Usuário consegue compartilhar um card.

### 12.2 Critérios técnicos

* App roda sem erros críticos.
* Código usa TypeScript.
* Dados estão separados da interface.
* Estrutura de pastas está organizada.
* Histórico local funciona corretamente.
* Dependências externas são mínimas.
* Código permite evolução futura sem refatoração pesada.

### 12.3 Critérios de UX

* Usuário entende o fluxo sem tutorial.
* Botão principal é evidente.
* Mensagem tem boa legibilidade.
* Card compartilhável tem visual agradável.
* Experiência acontece em poucos segundos.
* Interface não possui excesso de opções.

### 12.4 Critérios de qualidade

* Fluxo principal testado em Android.
* Geração do card validada.
* Histórico validado.
* Mensagens não quebram layout.
* App não trava no fluxo principal.
* Comportamento offline básico validado.

### 12.5 Critérios de publicação/teste interno

* Build interna gerada com sucesso.
* App instalado em dispositivo real.
* Checklist de teste executado.
* Screenshots iniciais preparados.
* Feedback inicial registrado.

---

## 13. Riscos conhecidos

### 13.1 Risco: compartilhamento do card não funcionar bem

Impacto: alto
Probabilidade: média

Mitigação:

* testar compartilhamento cedo;
* começar com layout simples;
* validar em Android;
* evitar card visualmente complexo no início.

### 13.2 Risco: excesso visual prejudicar performance

Impacto: médio
Probabilidade: média

Mitigação:

* limitar animações;
* otimizar imagens;
* testar em dispositivo intermediário;
* priorizar fluxo principal.

### 13.3 Risco: JSON mal estruturado dificultar evolução

Impacto: médio
Probabilidade: média

Mitigação:

* definir schema simples;
* validar mensagens;
* separar dados de lógica;
* evitar categorias excessivas.

### 13.4 Risco: histórico local crescer em escopo

Impacto: médio
Probabilidade: alta

Mitigação:

* limitar às últimas 10 mensagens;
* não incluir favoritos em nuvem;
* não criar perfil;
* não adicionar login por causa do histórico.

### 13.5 Risco: escopo crescer durante execução

Impacto: alto
Probabilidade: alta

Mitigação:

* manter lista explícita de fora do escopo;
* criar backlog futuro separado;
* revisar novas ideias contra a hipótese principal;
* proteger o MVP.

---

## 14. Princípios de decisão

Toda decisão do projeto deve ser avaliada com base nestas perguntas:

1. Isso fortalece a experiência rápida e compartilhável?
2. Isso ajuda a validar a hipótese principal?
3. Isso reduz ou aumenta atrito?
4. Isso exige backend, login ou dependência externa agora?
5. Isso pode ficar para uma versão futura?
6. Isso melhora o MVP ou apenas o deixa mais “completo”?
7. Isso acelera aprendizado ou apenas aumenta escopo?

Quando houver dúvida, priorizar:

* simplicidade;
* clareza;
* velocidade de validação;
* baixo atrito;
* experiência emocional;
* compartilhamento.

---

## 15. Agentes planejados

A série utilizará agentes IA especializados.

Agentes previstos:

1. Product Owner Agent
2. Software Architect Agent
3. Frontend Mobile Agent
4. UX/UI Agent
5. QA Agent
6. Storyteller Agent
7. PMO / Project Manager Agent
8. DevOps / Build Agent

Cada agente terá:

* missão;
* contexto;
* responsabilidades;
* limites;
* formato de resposta;
* critérios de qualidade;
* prompt base.

Os agentes devem respeitar este `PROJECT_CONTEXT.md`.

---

## 16. Estratégia de execução dos agentes

### Agentes preferenciais no ChatGPT

Usar para:

* Product Owner;
* PMO;
* Storyteller;
* QA conceitual;
* documentação;
* backlog;
* critérios de aceite;
* análise de riscos.

### Agentes preferenciais no Cursor

Usar para:

* Arquiteto;
* Frontend Mobile;
* QA técnico;
* DevOps/Build;
* revisão de código;
* implementação;
* refatoração.

Sempre que possível, agentes no Cursor devem ler:

* `docs/PROJECT_CONTEXT.md`;
* `docs/AGENTS.md`;
* documentos específicos da etapa atual.

---

## 17. Roadmap editorial da série

### EP.00 — Do Zero ao Produto

Apresentação da série e da proposta de construir um app real com IA.

### EP.01 — O problema antes do código

Discovery, definição do MVP, hipótese principal, público e fora do escopo.

### EP.02 — Sprint 0

Stack, arquitetura inicial, riscos técnicos, critérios de pronto e estrutura base.

### EP.03 — Criando um time de agentes IA

Definição dos agentes, papéis, prompts e estratégia de uso no ChatGPT/Cursor.

### EP.04 — User Stories com IA

Criação de épicos, histórias, critérios de aceite e backlog inicial.

### EP.05 — Organizando backlog e board

Priorização, labels, fluxo de trabalho e preparação de execução.

### EP.06 — Planejamento técnico real

Estrutura técnica, componentes, navegação, serviços e estratégia de implementação.

### EP.07 — O primeiro código gerado por IA

Primeira implementação, prompts reais, erros, ajustes e refatorações.

### EP.08 — Design emocional e experiência

Tom, UI, microinterações, mensagens e card compartilhável.

### EP.09 — Bugs, retrabalho e decisões difíceis

Erros reais, ajustes de escopo, decisões técnicas e lições aprendidas.

### EP.10 — Build, testes e publicação

Build interno, testes, EAS e preparação para publicação.

### EP.11 — O que a IA realmente acelerou?

Análise de produtividade, limites, ganhos e dificuldades.

### EP.12 — O futuro do desenvolvimento com IA

Fechamento da série, aprendizados e próximos passos.

---

## 18. Diário de bordo atual

Status da jornada:

* EP.00 publicado.
* EP.01 publicado.
* EP.02 publicado.
* Problema definido.
* Hipótese principal mapeada.
* MVP delimitado.
* Fora do escopo definido.
* Stack inicial validada.
* Riscos técnicos levantados.
* Critérios de pronto definidos.
* Estrutura inicial sugerida.
* Próximo passo: criar os agentes IA oficiais.

---

## 19. Instrução para agentes IA

Sempre que atuar neste projeto, considere:

* o ORÁCULO PAF é um MVP;
* simplicidade é prioridade;
* evitar overengineering;
* não adicionar backend sem justificativa;
* não adicionar login no MVP;
* proteger a experiência rápida e compartilhável;
* respeitar decisões registradas;
* questionar aumento de escopo;
* propor soluções simples primeiro;
* explicar decisões;
* indicar riscos;
* sugerir próximos passos objetivos.

Quando houver conflito entre uma ideia nova e o escopo do MVP, priorizar o MVP.

---

## 20. Frase guia do projeto

> Antes de acelerar com IA, organize o caminho.

E também:

> IA acelera. Mas se o caminho estiver errado, ela só ajuda você a errar mais rápido.

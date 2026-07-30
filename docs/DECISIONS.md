# DECISIONS.md

# ORÁCULO PAF — Registro de Decisões

## Objetivo deste documento

Registrar decisões relevantes do projeto ORÁCULO PAF de forma simples, rastreável e útil.

Cada decisão deve conter:

* contexto;
* justificativa;
* impacto no MVP;
* status.

Este documento não substitui ADRs técnicos detalhados.
Ele funciona como um registro leve de decisões de produto, gestão e arquitetura inicial.

---

# DEC-001 — Construir o ORÁCULO PAF como produto real da série

## Contexto

A série “Do Zero ao Produto” do Papo de Gerente foi criada para mostrar o uso prático de IA na construção de um produto real.

Era necessário escolher um produto pequeno o suficiente para ser viável, mas interessante o suficiente para gerar aprendizados reais de produto, gestão, arquitetura, desenvolvimento e QA.

## Decisão

O ORÁCULO PAF será o produto principal da série.

## Justificativa

O ORÁCULO PAF permite trabalhar:

* discovery;
* MVP;
* experiência mobile;
* conteúdo;
* design emocional;
* compartilhamento;
* arquitetura simples;
* desenvolvimento com IA;
* uso de agentes;
* QA;
* build;
* publicação inicial.

## Impacto no MVP

O projeto terá compromisso real de entrega, não apenas conteúdo editorial.

## Status

Aprovada.

---

# DEC-002 — Validar identificação e compartilhamento como hipótese principal

## Contexto

O ORÁCULO PAF pode evoluir para muitas direções: frases diárias, personalização, comunidade, IA generativa, categorias, gamificação e notificações.

Porém, no MVP, é necessário validar a menor hipótese relevante.

## Decisão

A hipótese principal do MVP será:

> Usuários irão se identificar com mensagens rápidas, poéticas, místicas ou humorísticas a ponto de querer compartilhar o card gerado.

## Justificativa

Essa hipótese conecta diretamente:

* valor emocional;
* experiência visual;
* comportamento de compartilhamento;
* potencial orgânico do produto.

## Impacto no MVP

Todas as funcionalidades devem ser avaliadas contra essa hipótese.

## Status

Aprovada.

---

# DEC-003 — Não incluir login no MVP

## Contexto

Login pode permitir personalização, histórico persistente, favoritos e sincronização.

Porém, também adiciona atrito e complexidade.

## Decisão

O MVP não terá login, cadastro ou perfil de usuário.

## Justificativa

O ORÁCULO PAF precisa ser uma experiência rápida e sem fricção.

A primeira validação deve permitir que o usuário abra o app e use imediatamente.

## Impacto no MVP

* reduz escopo;
* reduz dependências;
* acelera implementação;
* simplifica testes;
* reforça baixo atrito.

## Status

Aprovada.

---

# DEC-004 — Não incluir backend no MVP

## Contexto

Backend poderia permitir atualização remota de mensagens, métricas, histórico em nuvem e integração futura com Supabase.

Porém, não é necessário para validar a hipótese inicial.

## Decisão

O MVP não terá backend.

## Justificativa

A base de mensagens pode ser local.
O histórico pode ser local.
A validação inicial pode ser feita sem infraestrutura remota.

## Impacto no MVP

* reduz complexidade técnica;
* reduz custo;
* elimina dependência de rede;
* acelera entrega;
* permite foco no fluxo principal.

## Status

Aprovada.

---

# DEC-005 — Usar JSON local para mensagens

## Contexto

O app precisa exibir mensagens poéticas, místicas e humorísticas.

A primeira versão não precisa buscar conteúdo remoto.

## Decisão

As mensagens iniciais serão armazenadas em arquivo JSON local.

## Justificativa

JSON local permite:

* simplicidade;
* funcionamento offline;
* facilidade de curadoria;
* separação entre conteúdo e interface;
* evolução futura para backend se houver validação.

## Impacto no MVP

O app poderá funcionar sem conexão no fluxo principal.

## Status

Aprovada.

---

# DEC-006 — Não incluir IA generativa em tempo real dentro do app

## Contexto

A série usa IA como parte central do processo de construção.

Isso poderia gerar expectativa de que o app também use IA generativa no runtime.

## Decisão

O MVP não terá IA generativa em tempo real dentro do app.

## Justificativa

IA generativa em runtime adicionaria:

* custo;
* latência;
* dependência de API;
* necessidade de backend ou chave segura;
* riscos de conteúdo;
* complexidade de moderação.

A IA será usada no processo, não obrigatoriamente dentro do produto final.

## Impacto no MVP

O conteúdo será previamente curado e embarcado no app.

## Status

Aprovada.

---

# DEC-007 — Usar Expo, React Native e TypeScript

## Contexto

O ORÁCULO PAF será um app mobile com experiência simples, visual e compartilhável.

É desejável acelerar desenvolvimento e manter possibilidade de Android e iOS.

## Decisão

A stack inicial será:

* Expo;
* React Native;
* TypeScript.

## Justificativa

Essa stack favorece:

* velocidade;
* prototipação;
* base única mobile;
* boa integração com build interno;
* organização com tipagem;
* evolução futura.

## Impacto no MVP

A implementação será mobile-first e preparada para teste em dispositivo real.

## Status

Aprovada.

---

# DEC-008 — Limitar histórico às últimas 10 mensagens

## Contexto

Histórico pode ser útil para revisitar mensagens.

Porém, pode crescer facilmente para favoritos, coleções, perfil, sincronização e nuvem.

## Decisão

O histórico será local e limitado às últimas 10 mensagens.

## Justificativa

Esse limite entrega continuidade mínima sem criar complexidade.

## Impacto no MVP

* sem login;
* sem nuvem;
* sem perfil;
* sem favoritos no MVP;
* baixo risco técnico.

## Status

Aprovada.

---

# DEC-009 — Priorizar compartilhamento do card

## Contexto

A hipótese principal depende da vontade do usuário de compartilhar a mensagem.

Logo, compartilhar não é uma funcionalidade secundária.

## Decisão

O card compartilhável será parte central do MVP.

## Justificativa

O compartilhamento é o melhor sinal inicial de identificação, valor emocional e potencial orgânico.

## Impacto no MVP

O fluxo de compartilhamento deve ser validado cedo no desenvolvimento.

## Status

Aprovada.

---

# DEC-010 — Usar agentes IA especializados

## Contexto

Usar um único chat para produto, arquitetura, código, QA e conteúdo pode gerar respostas genéricas e inconsistentes.

## Decisão

O projeto utilizará agentes IA especializados.

## Justificativa

Agentes especializados permitem:

* melhor contexto;
* papéis claros;
* responsabilidades definidas;
* saídas mais consistentes;
* rastreabilidade;
* melhor uso de IA no processo.

## Impacto no MVP

Foram definidos agentes para PO, arquitetura, frontend, UX, QA, conteúdo, PMO e build.

## Status

Aprovada.

---

# DEC-011 — Usar ChatGPT e Cursor de forma complementar

## Contexto

O projeto precisa tanto de estratégia e documentação quanto de execução técnica no repositório.

## Decisão

Usar:

* ChatGPT para produto, PMO, documentação, conteúdo e análise;
* Cursor para arquitetura, implementação, QA técnico e build.

## Justificativa

Cada ambiente tem pontos fortes diferentes.

ChatGPT é melhor para raciocínio amplo e documentação.
Cursor é melhor para atuar diretamente sobre o código e arquivos do repositório.

## Impacto no MVP

O fluxo de trabalho será híbrido.

## Status

Aprovada.

---

# DEC-012 — Consolidar outputs do ChatGPT e Cursor para o backlog

## Contexto

O Product Owner Agent foi executado em dois ambientes, gerando duas versões de backlog.

A saída do ChatGPT foi mais detalhada e explicativa.
A saída do Cursor foi mais enxuta e operacional.

## Decisão

Criar uma versão consolidada do `docs/BACKLOG.md`.

## Justificativa

A versão consolidada aproveita:

* profundidade de produto;
* objetividade operacional;
* estrutura implementável;
* proteção de escopo;
* ordem sugerida de execução.

## Impacto no MVP

O backlog oficial passa a ser mais claro, enxuto e útil para execução.

## Status

Aprovada.

---

# DEC-013 — Executar PMO antes do Arquiteto

## Contexto

Após o backlog, seria possível seguir diretamente para arquitetura.

Porém, registrar decisões e riscos antes ajuda o Arquiteto a trabalhar com mais contexto.

## Decisão

Executar o PMO / Project Manager Agent antes do Software Architect Agent.

## Justificativa

Isso cria rastreabilidade inicial e organiza:

* decisões;
* riscos;
* diário de bordo;
* próximos passos.

## Impacto no MVP

O Architect Agent terá insumos mais claros para gerar `docs/ARCHITECTURE.md`.

## Status

Aprovada.

---

# DEC-014 — Manter documentação leve

## Contexto

O projeto precisa de documentação suficiente para orientar agentes, série e execução.

Mas documentação excessiva pode virar burocracia.

## Decisão

Manter documentação leve, útil e diretamente conectada à execução.

## Justificativa

O objetivo é apoiar entrega, não criar um processo pesado.

## Impacto no MVP

Documentos devem ser atualizados quando ajudarem a tomar decisões, reduzir risco ou orientar implementação.

## Status

Aprovada.

---

# DEC-015 — Confirmar arquitetura client-only para o MVP

## Contexto

Após a criação do backlog consolidado, o Software Architect Agent foi executado no Cursor considerando os documentos do projeto.

O objetivo era transformar o contexto, backlog, decisões e riscos em uma arquitetura prática para orientar a implementação.

## Decisão

Confirmar que o MVP do ORÁCULO PAF será um app client-only.

A arquitetura inicial será baseada em:

- Expo;
- React Native;
- TypeScript;
- JSON local;
- armazenamento local;
- compartilhamento nativo;
- EAS Build.

## Justificativa

A hipótese principal do MVP pode ser validada sem backend, login, Supabase ou IA generativa em runtime.

A arquitetura client-only reduz complexidade, custo, dependências externas e tempo até o teste interno.

## Impacto no MVP

- acelera implementação;
- mantém o fluxo offline;
- reduz risco de overengineering;
- preserva baixo atrito;
- mantém foco nas histórias Must do backlog.

## Status

Aprovada.

---

# DEC-016 — Criar ADRs técnicos curtos antes da implementação

## Contexto

O Software Architect Agent sugeriu que as principais decisões técnicas fossem registradas em ADRs simples.

As decisões já estavam parcialmente documentadas em `DECISIONS.md` e `ARCHITECTURE.md`, mas os ADRs ajudam a deixar explícito o racional técnico antes do início da implementação.

## Decisão

Criar ADRs curtos em `docs/adr/` para registrar as principais decisões arquiteturais do MVP.

ADRs iniciais:

- `ADR-001-stack-expo-react-native.md`
- `ADR-002-json-local-no-mvp.md`
- `ADR-003-sem-backend-no-mvp.md`
- `ADR-004-historico-local-limitado.md`
- `ADR-005-compartilhamento-card.md`

## Justificativa

Os ADRs ajudam a:

- evitar rediscussão de decisões já tomadas;
- orientar agentes futuros;
- dar rastreabilidade técnica ao projeto;
- manter coerência entre backlog, arquitetura e implementação.

## Impacto no MVP

A implementação poderá começar com decisões técnicas mínimas já registradas, sem criar documentação excessiva.

## Status

Aprovada.
# [DECISIONS.md](http://DECISIONS.md)

# ORÁCULO PAF — Registro de Decisões

## Objetivo deste documento

Registrar decisões relevantes do projeto ORÁCULO PAF de forma simples, rastreável e útil.

Cada decisão deve conter:

- contexto;
- justificativa;
- impacto no MVP;
- status.

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

- discovery;
- MVP;
- experiência mobile;
- conteúdo;
- design emocional;
- compartilhamento;
- arquitetura simples;
- desenvolvimento com IA;
- uso de agentes;
- QA;
- build;
- publicação inicial.



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

- valor emocional;
- experiência visual;
- comportamento de compartilhamento;
- potencial orgânico do produto.



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

- reduz escopo;
- reduz dependências;
- acelera implementação;
- simplifica testes;
- reforça baixo atrito.



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

- reduz complexidade técnica;
- reduz custo;
- elimina dependência de rede;
- acelera entrega;
- permite foco no fluxo principal.



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

- simplicidade;
- funcionamento offline;
- facilidade de curadoria;
- separação entre conteúdo e interface;
- evolução futura para backend se houver validação.



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

- custo;
- latência;
- dependência de API;
- necessidade de backend ou chave segura;
- riscos de conteúdo;
- complexidade de moderação.

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

- Expo;
- React Native;
- TypeScript.



## Justificativa

Essa stack favorece:

- velocidade;
- prototipação;
- base única mobile;
- boa integração com build interno;
- organização com tipagem;
- evolução futura.



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

- sem login;
- sem nuvem;
- sem perfil;
- sem favoritos no MVP;
- baixo risco técnico.



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

- melhor contexto;
- papéis claros;
- responsabilidades definidas;
- saídas mais consistentes;
- rastreabilidade;
- melhor uso de IA no processo.



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

- ChatGPT para produto, PMO, documentação, conteúdo e análise;
- Cursor para arquitetura, implementação, QA técnico e build.



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

- profundidade de produto;
- objetividade operacional;
- estrutura implementável;
- proteção de escopo;
- ordem sugerida de execução.



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

- decisões;
- riscos;
- diário de bordo;
- próximos passos.



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

# DEC-017 — Definir base mínima de mensagens por tom



## Contexto

O QA Agent apontou que “quantidade mínima por tom” estava ambígua na US-05.

## Decisão

A base inicial do MVP deverá conter pelo menos 5 mensagens válidas por tom: poética, mística e humorística.

## Justificativa

Isso torna a curadoria inicial mensurável sem ampliar demais o escopo.

## Impacto no MVP

O Storyteller Agent deverá gerar e curar no mínimo 15 mensagens válidas para a primeira base local.

## Status

Aprovada.

---

# Decisões registradas na consolidação do EP.05 (v5.0 — 03/11/2026)

Legenda de status usada a partir daqui:

- **Aprovada** — decisão tomada e válida para o escopo atual.
- **Provisória** — adotada na implementação, mas ainda sujeita a confirmação.
- **Pendente de aprovação** — proposta existente, sem decisão humana.

---

# DEC-018 — Aprovar integralmente a base inicial de 18 mensagens

## Contexto

O Storyteller Agent produziu 18 mensagens originais (seis por tom), validadas estruturalmente por verificações de contagem, formato e unicidade. Quatro mensagens foram sinalizadas pelo próprio agente para atenção editorial.

## Decisão

O responsável pelo produto revisou e aprovou as 18 mensagens, **incluindo as quatro inicialmente sinalizadas**, sem substituições nesta etapa. Confirmação expressa em 03/11/2026.

## Justificativa

A base atende à DEC-017 (≥ 5 válidas por tom) e passou por curadoria humana antes da integração ao aplicativo, como exigem TASK-US05-02 e o checklist editorial de US-05.

## Impacto no MVP

- TASK-US05-01, TASK-US05-02 e TASK-US04-02 concluídas.
- Não há pendência de curadoria para a base atual; as observações iniciais do Storyteller foram superadas por esta decisão.
- Alterações futuras no conteúdo exigem nova solicitação explícita.
- A aprovação editorial não substitui o teste de legibilidade no card (TASK-US05-03) nem a validação da hipótese com usuários.

## Status

Aprovada (decisão humana).

---

# DEC-019 — Manter o Expo SDK 58 efetivamente instalado

## Contexto

O gerador `create-expo-app` (template `blank-typescript`) anunciou um template SDK 57, mas instalou o SDK 58 (`expo@58.0.23`, `react-native@0.88.1`, `react@19.3.0`, `typescript@6.0.3`). O `npm audit` aponta cinco vulnerabilidades moderadas em ferramentas do Expo (`glob`, `minimatch`, via `@expo/cli` e `@expo/fingerprint`); a correção automática `npm audit fix --force` instalaria `expo@53.0.11`.

## Decisão

Manter o SDK 58 instalado e não executar `npm audit fix --force`.

## Justificativa

O SDK 58 passou em `expo-doctor` (20/20) e `expo install --check`. Rebaixar cinco versões de SDK para corrigir alertas moderados em ferramentas de desenvolvimento traria mais risco que benefício. A decisão está dentro do ADR-001 (Expo); não há mudança arquitetural que justifique novo ADR.

## Impacto no MVP

- Compatibilidade do Expo Go instalado no Android físico com o SDK 58 **não verificada** (RISK-014).
- Vulnerabilidades permanecem abertas e monitoradas (RISK-015).
- Reavaliar se o Expo Go não suportar SDK 58: alternativa é build de desenvolvimento ou build interna EAS, não rebaixamento automático.

## Status

Aprovada para o estado atual, com gatilho de revisão no primeiro teste em Android.

---

# DEC-020 — Usar scaffold sem Expo Router, com uma única Home

## Contexto

O template gerado trazia um `AGENTS.md` que determinava Expo Router para toda a navegação. `ARCHITECTURE.md` e `IMPLEMENTATION_MAP.md` estabelecem que uma única `HomeScreen` basta para as histórias Must e que navegação só entra com US-10 (Should).

## Decisão

Usar o template `blank-typescript`, sem Expo Router nem React Navigation. `App.tsx` monta diretamente `HomeScreen`. O `AGENTS.md` do template não foi copiado para o repositório.

## Justificativa

Evita dependência e estrutura de rotas sem necessidade no Must. Se a US-10 entrar, a escolha entre Expo Router e React Navigation continua aberta, conforme `ARCHITECTURE.md` §4.

## Impacto no MVP

Uma tela, sem navegação. Nenhum fluxo extra criado.

## Status

Aprovada.

---

# DEC-021 — Integrar mensagens locais por import estático validado

## Contexto

`ARCHITECTURE.md` §7 recomenda import estático do JSON e um service único; a UI não deve importar o JSON diretamente.

## Decisão

- `messagesService` importa `messages.json`, valida cada registro com `validateMessage` e mantém em cache somente as mensagens válidas.
- Registros inválidos ficam fora do pool e são registrados em desenvolvimento.
- Pool vazio leva a Home ao estado de falha segura (Consultar desabilitado, sem crash).
- **Política de IDs duplicados:** a primeira ocorrência válida é mantida e as seguintes são rejeitadas.

## Justificativa

Atende US-04 e RISK-013 sem bibliotecas de schema. A base aprovada não tem IDs duplicados; a política só se aplica a edições futuras do JSON.

## Impacto no MVP

Consulta offline sem I/O em runtime. A política de duplicados é comportamento implementado, não regra arquitetural confirmada.

## Status

- Import estático, validação e falha segura: **Aprovada** (alinhadas a `ARCHITECTURE.md` §5.5 e §7).
- Política de IDs duplicados: **Provisória — pendente de confirmação do Software Architect / PO.** Não promover a regra definitiva sem essa confirmação.

---

# DEC-022 — Usar `react-native-safe-area-context` para áreas seguras

## Contexto

A especificação UX/UI exige respeitar barras de status e navegação do Android. O `SafeAreaView` nativo do React Native atende apenas iOS e está obsoleto; no Android atual o layout é edge-to-edge.

## Decisão

Adicionar `react-native-safe-area-context` (instalado via `expo install`) e usar `SafeAreaProvider` em `App.tsx` e `SafeAreaView` na Home.

## Justificativa

É a única dependência adicionada além do template, com justificativa funcional direta. Não altera arquitetura.

## Impacto no MVP

Conteúdo da Home dentro da área segura. Comportamento em aparelho ainda não observado.

## Status

Aprovada.

---

# DEC-023 — Adotar a estratégia de evidência técnica da US-09

## Contexto

US-09 (Must) exige persistência das últimas 10 consultas sem depender da US-10 (Should). TASK-US09-03 pedia a escolha do método antes da implementação.

## Decisão

Adotar o método do QA Agent em `docs/QA_US09_Estrategia_Evidencia_EP05.md`:

- **principal:** diagnóstico temporário em `__DEV__` que chama o `historyService` real com fixtures determinísticas, grava no AsyncStorage real e registra snapshots de ordem, limite e FIFO; persistência confirmada por force-stop e reabertura;
- **alternativo:** inspeção direta do AsyncStorage após consultas no app de desenvolvimento;
- a unidade do histórico é o **evento de consulta**: o mesmo `messageId` pode aparecer em registros diferentes, distinguidos por `consultedAt`;
- separação de evidências em serviço, integração e build Android físico;
- US-10 não participa do aceite da US-09.

## Justificativa

Observa o mesmo serviço e o mesmo armazenamento de produção, sem criar tela de histórico.

## Impacto no MVP

- TASK-US09-03 concluída como planejamento; os 10 casos US09-QA01…QA10 continuam **NOT RUN**.
- O cenário US09-P02 do `QA_CHECKLIST.md` foi corrigido para "dez eventos de consulta".
- A política de recuperação de falhas de storage (seção 3 do documento de QA) continua **provisória** até a implementação.

## Status

Aprovada como método de evidência; execução pendente.

---

# DEC-024 — Aplicar os tokens visuais propostos como defaults provisórios

## Contexto

O UX/UI Agent propôs paleta, tipografia, espaçamentos e dimensões mínimas (seção 4 da especificação), marcados como defaults para implementação inicial, não como identidade aprovada.

## Decisão

O Frontend aplicou os tokens em `app/src/theme/theme.ts` (Home, botão Consultar e card), com comentário indicando aprovação humana pendente.

## Justificativa

Permite que a primeira implementação já siga uma identidade coerente sem bloquear a execução.

## Impacto no MVP

Se a identidade for alterada, basta ajustar `theme.ts`. Contrastes foram calculados a partir dos valores hexadecimais, não medidos em tela.

## Status

Provisória — **identidade visual pendente de aprovação humana** (TASK-US12-01).

---

# DEC-025 — Consolidar a versão documental 5.0 sem alterar a versão técnica do app

## Contexto

`app.version` versiona o repositório e a série de episódios. `app/package.json` e `app/app.json` têm seu próprio campo `version` (`1.0.0`), associado ao pacote e ao aplicativo.

## Decisão

Promover `app.version` de 4.5 para 5.0 ao fechar o EP.05, sem alterar `version` em `app/package.json` ou `app/app.json`.

## Justificativa

A versão 5.0 marca o fechamento auditável do EP.05. Não representa MVP concluído, release publicado nem validação em Android físico.

## Impacto no MVP

Dois sistemas de versionamento coexistem. Qualquer alinhamento entre eles deve ser proposto separadamente (provavelmente junto da primeira build interna, US-13).

## Status

Aprovada.

---

# Situação das decisões após o EP.05

| ID | Tema | Status |
|---|---|---|
| DEC-018 | Aprovação editorial das 18 mensagens | Aprovada (decisão humana) |
| DEC-019 | Manter Expo SDK 58 | Aprovada, com revisão no primeiro teste Android |
| DEC-020 | Scaffold sem Expo Router; Home única | Aprovada |
| DEC-021 | Import estático validado das mensagens | Aprovada; **política de IDs duplicados provisória** |
| DEC-022 | `react-native-safe-area-context` | Aprovada |
| DEC-023 | Estratégia de evidência da US-09 | Aprovada como método; execução pendente |
| DEC-024 | Tokens visuais propostos aplicados | **Provisória — identidade pendente de aprovação** |
| DEC-025 | Versão documental 5.0 separada da versão técnica | Aprovada |

Nenhum ADR novo foi criado no EP.05: as decisões acima cabem nos ADR-001 a ADR-005 e não alteram arquitetura, escopo ou estratégia de validação.
# RISKS.md

# ORÁCULO PAF — Registro de Riscos

## Objetivo deste documento

Registrar os riscos atuais do MVP do ORÁCULO PAF de forma simples e prática.

Cada risco deve ter:

* descrição;
* impacto;
* probabilidade;
* plano de mitigação;
* dono sugerido;
* status.

Este documento deve ser atualizado conforme o projeto evoluir.

---

# Matriz simples de classificação

## Impacto

* **Alto:** pode comprometer a validação do MVP.
* **Médio:** pode gerar retrabalho ou atraso relevante.
* **Baixo:** pode causar ajuste menor.

## Probabilidade

* **Alta:** há grande chance de ocorrer.
* **Média:** pode ocorrer dependendo das decisões.
* **Baixa:** pouco provável no momento.

## Status

* **Ativo:** risco ainda precisa ser acompanhado.
* **Mitigado:** ações reduziram o risco.
* **Aceito:** risco conhecido e tolerado.
* **Encerrado:** risco não é mais relevante.

---

# RISK-001 — Card de compartilhamento virar projeto visual complexo

## Descrição

O card compartilhável é essencial para validar a hipótese principal, mas pode virar um esforço visual excessivo antes de o fluxo estar funcionando.

## Impacto

Alto.

## Probabilidade

Alta.

## Plano de mitigação

* Criar primeiro uma versão simples do card.
* Priorizar legibilidade.
* Validar compartilhamento cedo em Android.
* Evitar múltiplos templates no MVP.
* Refinamento visual avançado deve ir para backlog futuro.

## Dono sugerido

UX/UI Agent + Frontend Mobile Agent.

## Status

Ativo.

## Atualização EP.05 (03/11/2026)

O card implementado é mínimo (fundo sólido, marca discreta, mensagem; um template). A captura de imagem ainda não existe e o card não expõe `ref`. O risco continua ativo até o compartilhamento funcionar em Android.

---

# RISK-002 — Histórico local inflar em escopo

## Descrição

O histórico pode crescer para favoritos, coleção, perfil, nuvem, sincronização ou filtros.

## Impacto

Médio.

## Probabilidade

Alta.

## Plano de mitigação

* Limitar histórico às últimas 10 mensagens.
* Não incluir favoritos no MVP.
* Não incluir perfil.
* Não incluir sincronização em nuvem.
* Não criar fluxo social para histórico.

## Dono sugerido

Product Owner Agent.

## Status

Ativo.

---

# RISK-003 — “Só mais uma tela” virar padrão de decisão

## Descrição

Ideias como onboarding, configurações, escolha de tom, trilhas ou tela de perfil podem parecer simples, mas aumentar o escopo rapidamente.

## Impacto

Alto.

## Probabilidade

Alta.

## Plano de mitigação

* Revisar qualquer nova tela contra a hipótese principal.
* Manter o backlog futuro separado.
* Usar a pergunta guia: “isso ajuda a validar compartilhamento agora?”
* Evitar telas que não sejam essenciais para consulta, card, histórico simples ou teste.

## Dono sugerido

Product Owner Agent + PMO Agent.

## Status

Ativo.

---

# RISK-004 — Backend ou analytics entrarem cedo demais

## Descrição

Pode surgir a tentação de incluir backend, Supabase ou analytics para medir melhor o uso.

## Impacto

Alto.

## Probabilidade

Média.

## Plano de mitigação

* Manter JSON local no MVP.
* Registrar backend como backlog futuro.
* Usar feedback manual nos testes internos.
* Considerar analytics apenas após fluxo principal validado.

## Dono sugerido

Product Owner Agent + Software Architect Agent.

## Status

Ativo.

---

# RISK-005 — Pool de mensagens pobre reduzir identificação

## Descrição

Se as mensagens forem genéricas, longas, repetitivas ou pouco compartilháveis, a hipótese principal pode parecer inválida mesmo que a experiência técnica funcione.

## Impacto

Alto.

## Probabilidade

Alta.

## Plano de mitigação

* Executar Storyteller Agent.
* Criar mensagens curtas e classificadas por tom.
* Fazer curadoria manual.
* Remover clichês excessivos.
* Testar mensagens em cards reais.
* Não depender de IA generativa em runtime no MVP.

## Dono sugerido

Storyteller Agent + Product Owner Agent.

## Status

Mitigado parcialmente.

## Atualização EP.05 (03/11/2026)

A curadoria editorial foi **concluída**: 18 mensagens originais, seis por tom, aprovadas integralmente pelo responsável pelo produto, incluindo as quatro inicialmente sinalizadas (DEC-018). Não há pendência editorial na base atual.

O que resta deste risco é o teste da hipótese em si: só o teste interno com usuários mostrará se as mensagens geram identificação e compartilhamento. A legibilidade no card é tratada em RISK-018.

---

# RISK-006 — Visual ou animação prejudicar performance

## Descrição

A proposta visual é importante, mas animações, imagens pesadas ou microinterações podem deixar a experiência lenta.

## Impacto

Médio.

## Probabilidade

Média.

## Plano de mitigação

* Limitar microinterações.
* Evitar bibliotecas pesadas sem justificativa.
* Testar em dispositivo real.
* Priorizar leitura e compartilhamento.
* Remover animações se impactarem fluidez.

## Dono sugerido

UX/UI Agent + Frontend Mobile Agent + QA Agent.

## Status

Ativo.

---

# RISK-007 — IA generativa parecer obrigatória por causa da série

## Descrição

Como a série fala sobre IA, pode haver pressão para incluir IA generativa dentro do app.

## Impacto

Alto.

## Probabilidade

Média.

## Plano de mitigação

* Reforçar que IA será usada no processo, não no runtime do MVP.
* Manter mensagens curadas em JSON local.
* Avaliar IA generativa apenas em fase futura.
* Registrar a decisão em `DECISIONS.md`.

## Dono sugerido

Product Owner Agent + PMO Agent.

## Status

Ativo.

---

# RISK-008 — Identidade visual atrasar validação

## Descrição

Buscar uma identidade visual refinada demais pode atrasar a validação do fluxo principal.

## Impacto

Médio.

## Probabilidade

Média.

## Plano de mitigação

* Definir identidade mínima.
* Priorizar clareza e consistência.
* Refinamento visual avançado deve ir para backlog futuro.
* Evitar múltiplas rodadas de design antes do fluxo funcionar.

## Dono sugerido

UX/UI Agent.

## Status

Ativo.

## Atualização EP.05 (03/11/2026)

O UX/UI Agent entregou tokens mínimos e o Frontend os aplicou como defaults provisórios (DEC-024). A **aprovação humana da identidade visual continua pendente**. Mitigação: aprovar ou ajustar os tokens em uma única rodada, sem bloquear a US-07.

---

# RISK-009 — Compartilhamento funcionar mal em dispositivo real

## Descrição

O fluxo de compartilhamento pode funcionar de forma diferente entre simulador, Android real, iOS e apps de destino.

## Impacto

Alto.

## Probabilidade

Média.

## Plano de mitigação

* Testar compartilhamento cedo em Android real.
* Começar com abordagem simples.
* Registrar falhas.
* Evitar depender de comportamento não validado.
* Criar fallback se necessário.

## Dono sugerido

Frontend Mobile Agent + QA Agent.

## Status

Ativo.

## Atualização EP.05 (03/11/2026)

O compartilhamento (US-07) **não foi implementado**: não há `shareService`, `ShareButton`, `expo-sharing` nem biblioteca de captura instaladas. O risco não diminuiu; a probabilidade permanece média e o spike em Android físico passa a ser o primeiro item funcional do EP.06.

---

# RISK-010 — Backlog perder foco durante execução

## Descrição

Mesmo com backlog consolidado, novas ideias podem surgir durante implementação e competir com histórias Must.

## Impacto

Alto.

## Probabilidade

Alta.

## Plano de mitigação

* Usar prioridades MoSCoW.
* Proteger histórias Must.
* Registrar ideias novas no backlog futuro.
* PMO deve revisar desvios.
* PO deve aprovar qualquer mudança de escopo.

## Dono sugerido

PMO Agent + Product Owner Agent.

## Status

Mitigado parcialmente.

## Observação

O risco foi parcialmente mitigado com a criação de `docs/ARCHITECTURE.md`.

Ainda resta criar os ADRs iniciais e validar a estrutura técnica antes da execução do Frontend Mobile Agent.


---

# RISK-011 — Implementação começar antes da arquitetura mínima

## Descrição

Existe risco de começar código antes de definir estrutura técnica mínima, organização de pastas e decisões básicas.

## Impacto

Médio.

## Probabilidade

Média.

## Plano de mitigação

* Executar Software Architect Agent antes do Frontend Mobile Agent.
* Criar `docs/ARCHITECTURE.md`.
* Registrar ADRs simples.
* Definir estrutura inicial do app.

## Dono sugerido

Software Architect Agent + PMO Agent.

## Status

Mitigado.

## Observação

O risco foi reduzido com a criação de `ARCHITECTURE.md`, ADRs, `TASKS.md` e `IMPLEMENTATION_MAP.md`.

Ainda será encerrado totalmente após o scaffold seguir a estrutura proposta e não iniciar implementação fora da cadeia Must.

## Atualização EP.05 (03/11/2026)

O scaffold seguiu a árvore de `IMPLEMENTATION_MAP.md` e a implementação ficou restrita à cadeia Must (tipos → JSON → service → sorteio → hook → Home → card → tema). Nenhuma navegação, backend ou funcionalidade fora do MVP foi adicionada. Status alterado para **Mitigado**; não foi encerrado porque a regra continua valendo para as próximas implementações.

---

# RISK-012 — Documentação virar burocracia

## Descrição

A documentação pode crescer demais e consumir energia que deveria ir para execução.

## Impacto

Médio.

## Probabilidade

Média.

## Plano de mitigação

* Manter documentos curtos e úteis.
* Atualizar apenas quando apoiar decisão ou execução.
* Evitar cerimônia excessiva.
* PMO deve priorizar rastreabilidade simples.

## Dono sugerido

PMO Agent.

## Status

Ativo.

---

# RISK-013 — JSON local inválido quebrar a experiência principal

## Descrição

Como o MVP depende de mensagens em JSON local, erros de estrutura, campos ausentes, IDs duplicados ou mensagens longas demais podem quebrar a consulta, o card ou o compartilhamento.

## Impacto

Médio.

## Probabilidade

Média.

## Plano de mitigação

- Definir schema mínimo de mensagem.
- Validar campos obrigatórios no `messagesService`.
- Garantir IDs únicos.
- Evitar mensagens sem texto.
- Evitar mensagens longas demais para o card.
- Criar curadoria inicial com Storyteller Agent.
- Testar mensagens reais no layout do card.

## Dono sugerido

Storyteller Agent + Frontend Mobile Agent + QA Agent.

## Status

Mitigado parcialmente.

## Atualização EP.05 (03/11/2026)

- Schema tipado (`message.types.ts`) e validação em `validateMessage.ts` implementados; registros inválidos ficam fora do pool e pool vazio leva a um estado seguro na Home.
- `npm run check:messages`: 17/17 checagens PASS, reproduzidas pelo PMO (18 válidas, 0 rejeitadas, mais longa com 59 caracteres).
- Ainda pendente: observar o estado de falha segura em runtime (US04-E03) e confirmar a política de IDs duplicados (DEC-021, provisória).

---

# RISK-014 — Expo SDK 58 incompatível com o Expo Go do Android físico

## Descrição

O projeto usa Expo SDK 58 (o gerador anunciou SDK 57 e instalou SDK 58). Não foi verificado se o Expo Go instalado no Android físico de teste suporta o SDK 58. Se não suportar, o teste rápido em aparelho via Expo Go não será possível.

## Impacto

Médio.

## Probabilidade

Média.

## Plano de mitigação

- Verificar a versão do Expo Go no aparelho antes do primeiro teste.
- Se incompatível, usar build de desenvolvimento ou build interna EAS (US-13), em vez de rebaixar o SDK.
- Registrar o resultado em `DIARY.md` e revisar DEC-019.

## Dono sugerido

Frontend Mobile Agent + DevOps / Build Agent.

## Status

Ativo.

---

# RISK-015 — Vulnerabilidades moderadas nas ferramentas de desenvolvimento do Expo

## Descrição

`npm audit` aponta 5 vulnerabilidades moderadas (`glob` e `minimatch`, via `@expo/cli` e `@expo/fingerprint`). A correção automática `npm audit fix --force` instalaria `expo@53.0.11`, rebaixando o SDK.

## Impacto

Baixo — afeta ferramentas de desenvolvimento e build, não o conteúdo do app.

## Probabilidade

Baixa.

## Plano de mitigação

- Não executar `npm audit fix --force` (DEC-019).
- Reavaliar com `npm audit` e `npx expo install --check` a cada atualização de patch do SDK 58.
- Não executar scripts de fontes desconhecidas no ambiente de desenvolvimento.

## Dono sugerido

Frontend Mobile Agent + DevOps / Build Agent.

## Status

Ativo (monitorado).

---

# RISK-016 — Implementação sem validação em runtime

## Descrição

Todo o código do EP.05 foi verificado apenas de forma estática (typecheck, script de checagens, `expo-doctor`, export do bundle, Metro servindo o bundle). A interface nunca foi observada em execução: não havia `adb`, emulador ou Android físico disponível. Problemas de layout, safe area, fonte ampliada ou comportamento em toque podem existir sem serem detectados.

## Impacto

Alto.

## Probabilidade

Média.

## Plano de mitigação

- Primeira tarefa do EP.06: abrir a Home em emulador, Expo Go ou build de desenvolvimento e executar US01-P01…P03 e US02-P01…P03.
- Não marcar TASK-SCAFFOLD-01 nem histórias como validadas sem essa evidência.
- Registrar capturas de tela e ambiente usado.

## Dono sugerido

Frontend Mobile Agent + QA Agent.

## Status

Ativo.

---

# RISK-017 — Persistência da US-09 não implementada e reentrância em operações assíncronas

## Descrição

A US-09 (Must) não tem código: `historyService`, `history.types.ts`, `useHistory` e a dependência AsyncStorage ainda não existem. Quando o salvamento assíncrono entrar, toques rápidos em Consultar podem disparar gravações concorrentes do tipo ler-modificar-gravar e perder eventos.

## Impacto

Alto — sem evidência de persistência, limite 10 e FIFO, o GO do MVP fica bloqueado.

## Probabilidade

Média.

## Plano de mitigação

- Implementar o serviço seguindo ADR-004 e o contrato `HistoryEntry`.
- Serializar gravações ou proteger a ação contra reentrância.
- Executar US09-QA01…QA10 (inclui QA10, consultas rápidas) e US02-N01.
- Não deduplicar por `messageId` (DEC-023).

## Dono sugerido

Frontend Mobile Agent + QA Agent.

## Status

Ativo.

---

# RISK-018 — Legibilidade e captura do card com fonte ampliada

## Descrição

O card usa texto de 26 sp em formato 4:5 e cresce verticalmente quando a fonte do sistema é ampliada, para não cortar a mensagem. As mensagens mais longas da base têm 59 caracteres (`msg-009`, `msg-013`). Com fonte ampliada, o card pode sair da proporção prevista e a imagem capturada para compartilhamento pode ficar desproporcional ou exigir rolagem.

## Impacto

Médio.

## Probabilidade

Média.

## Plano de mitigação

- Testar `msg-009`, `msg-013` e uma mensagem curta em 100%, 130% e 150% de fonte, em larguras próximas de 320, 360 e 412 dp.
- Validar a captura do card nesses cenários durante o spike da US-07.
- Não truncar texto nem reduzir a escala configurada pelo usuário.

## Dono sugerido

UX/UI Agent + Frontend Mobile Agent + QA Agent.

## Status

Ativo.

---

# Resumo dos riscos ativos

| ID       | Risco                                      | Impacto | Probabilidade | Dono sugerido      | Status |
| -------- | ------------------------------------------ | ------- | ------------- | ------------------ | ------ |
| RISK-001 | Card virar projeto visual complexo         | Alto    | Alta          | UX/UI + Frontend   | Ativo  |
| RISK-002 | Histórico inflar em escopo                 | Médio   | Alta          | Product Owner      | Ativo  |
| RISK-003 | “Só mais uma tela” virar padrão            | Alto    | Alta          | PO + PMO           | Ativo  |
| RISK-004 | Backend/analytics entrarem cedo            | Alto    | Média         | PO + Arquiteto     | Ativo  |
| RISK-005 | Pool de mensagens pobre                    | Alto    | Alta          | Storyteller + PO   | Mitigado parcialmente (curadoria concluída; hipótese ainda não testada) |
| RISK-006 | Visual/animação prejudicar performance     | Médio   | Média         | UX + Frontend + QA | Ativo  |
| RISK-007 | IA generativa parecer obrigatória          | Alto    | Média         | PO + PMO           | Ativo  |
| RISK-008 | Identidade visual atrasar validação        | Médio   | Média         | UX/UI              | Ativo (identidade pendente de aprovação) |
| RISK-009 | Compartilhamento falhar em device real     | Alto    | Média         | Frontend + QA      | Ativo (US-07 não implementada) |
| RISK-010 | Backlog perder foco                        | Alto    | Alta          | PMO + PO           | Mitigado parcialmente |
| RISK-011 | Código começar antes da arquitetura mínima | Médio   | Média         | Arquiteto + PMO    | Mitigado |
| RISK-012 | Documentação virar burocracia              | Médio   | Média         | PMO                | Ativo  |
| RISK-013 | JSON local inválido quebrar experiência | Médio | Média | Storyteller + Frontend + QA | Mitigado parcialmente |
| RISK-014 | SDK 58 incompatível com Expo Go no Android | Médio | Média | Frontend + DevOps | Ativo |
| RISK-015 | Vulnerabilidades moderadas no tooling Expo | Baixo | Baixa | Frontend + DevOps | Ativo (monitorado) |
| RISK-016 | Implementação sem validação em runtime | Alto | Média | Frontend + QA | Ativo |
| RISK-017 | US-09 não implementada / reentrância assíncrona | Alto | Média | Frontend + QA | Ativo |
| RISK-018 | Legibilidade e captura com fonte ampliada | Médio | Média | UX + Frontend + QA | Ativo |

A linha da RISK-010 foi alinhada ao status já registrado na seção do próprio risco ("Mitigado parcialmente").

---

# Próxima revisão de riscos

Revisar este documento após:

1. criação dos ADRs iniciais;
2. execução do UX/UI Agent;
3. execução do Storyteller Agent;
4. criação do scaffold inicial pelo Frontend Mobile Agent.

A próxima revisão deve verificar se:

- RISK-011 pode ser considerado mitigado;
- RISK-013 foi reduzido com schema e curadoria;
- riscos de compartilhamento precisam ser reclassificados;
- surgiram riscos técnicos durante o scaffold Expo;
- algum risco deve virar tarefa de QA.

**Revisão realizada no EP.05 (03/11/2026):** RISK-011 passou a Mitigado; RISK-005 e RISK-013 a Mitigado parcialmente; RISK-001, RISK-008 e RISK-009 receberam atualização sem mudança de status; RISK-014 a RISK-018 foram criados a partir dos problemas reais do scaffold.

**Próxima revisão:** após a primeira execução observada do app (RISK-016), o spike de compartilhamento em Android (RISK-009, RISK-018) e a implementação do histórico (RISK-017).

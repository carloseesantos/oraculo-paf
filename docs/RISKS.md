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

Ativo.

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

Mitigado parcialmente.

## Observação

O risco foi reduzido com a criação de `ARCHITECTURE.md`, ADRs, `TASKS.md` e `IMPLEMENTATION_MAP.md`.

Ainda será encerrado totalmente após o scaffold seguir a estrutura proposta e não iniciar implementação fora da cadeia Must.

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

Ativo.

---

# Resumo dos riscos ativos

| ID       | Risco                                      | Impacto | Probabilidade | Dono sugerido      | Status |
| -------- | ------------------------------------------ | ------- | ------------- | ------------------ | ------ |
| RISK-001 | Card virar projeto visual complexo         | Alto    | Alta          | UX/UI + Frontend   | Ativo  |
| RISK-002 | Histórico inflar em escopo                 | Médio   | Alta          | Product Owner      | Ativo  |
| RISK-003 | “Só mais uma tela” virar padrão            | Alto    | Alta          | PO + PMO           | Ativo  |
| RISK-004 | Backend/analytics entrarem cedo            | Alto    | Média         | PO + Arquiteto     | Ativo  |
| RISK-005 | Pool de mensagens pobre                    | Alto    | Alta          | Storyteller + PO   | Ativo  |
| RISK-006 | Visual/animação prejudicar performance     | Médio   | Média         | UX + Frontend + QA | Ativo  |
| RISK-007 | IA generativa parecer obrigatória          | Alto    | Média         | PO + PMO           | Ativo  |
| RISK-008 | Identidade visual atrasar validação        | Médio   | Média         | UX/UI              | Ativo  |
| RISK-009 | Compartilhamento falhar em device real     | Alto    | Média         | Frontend + QA      | Ativo  |
| RISK-010 | Backlog perder foco                        | Alto    | Alta          | PMO + PO           | Ativo  |
| RISK-011 | Código começar antes da arquitetura mínima | Médio   | Média         | Arquiteto + PMO    | Mitigado parcialmente |
| RISK-012 | Documentação virar burocracia              | Médio   | Média         | PMO                | Ativo  |
| RISK-013 | JSON local inválido quebrar experiência | Médio | Média | Storyteller + Frontend + QA | Ativo |

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

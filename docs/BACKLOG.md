# BACKLOG.md

# ORÁCULO PAF — Backlog inicial do MVP

## 1. Visão geral do backlog

Este backlog transforma a hipótese principal do ORÁCULO PAF em épicos e user stories enxutas.

**Hipótese a validar:** usuários se identificam com mensagens rápidas (poéticas, místicas ou humorísticas) a ponto de querer compartilhar o card gerado.

O caminho mínimo para essa prova é:

> abrir → consultar → ver card → compartilhar → histórico local → build interna

O backlog prioriza validação rápida da hipótese, não completude do produto. Cinco épicos e treze histórias cobrem o MVP. Prioridade MoSCoW indica o que é indispensável (Must), desejável (Should) ou opcional se sobrar tempo (Could).

**Restrições permanentes do MVP:** sem login, sem backend, sem IA generativa em tempo real, sem ranking, comentários ou rede social.

---

## 2. Épicos do MVP

| ID | Épico | Objetivo |
|----|--------|----------|
| E1 | Experiência de consulta | Abrir o app e receber mensagem aleatória em segundos, sem tutorial |
| E2 | Base de mensagens local | JSON embarcado com tons (poética, mística, humorística), offline |
| E3 | Card visual e compartilhamento | Exibir e compartilhar o card — núcleo da hipótese |
| E4 | Histórico local | Últimas 10 consultas no dispositivo, sem nuvem/login |
| E5 | Identidade, qualidade e build | Visual consistente, fluxo estável e build interna para teste |

---

## 3. User stories, critérios de aceite e prioridades

### E1 — Experiência de consulta

#### US-01 — Tela principal clara

**Prioridade:** Must

**História:** Como visitante, quero ver uma tela principal clara ao abrir o app, para entender o que fazer sem tutorial.

**Critérios de aceite:**

- O app abre sem erro crítico.
- O botão “Consultar” é evidente na primeira tela.
- Não há onboarding, login nem tutorial obrigatório.
- O fluxo principal é compreensível em poucos segundos.

---

#### US-02 — Consultar mensagem aleatória

**Prioridade:** Must

**História:** Como visitante, quero tocar em “Consultar” e receber uma mensagem aleatória, para viver a experiência principal.

**Critérios de aceite:**

- O toque em “Consultar” gera uma nova mensagem.
- A mensagem vem da base JSON local.
- A resposta é imediata (sem dependência de rede).
- Não há loading de rede no fluxo principal.

---

#### US-03 — Evitar repetição consecutiva

**Prioridade:** Should

**História:** Como visitante, quero evitar a mesma mensagem em consultas consecutivas, para manter frescor.

**Critérios de aceite:**

- Quando o pool tiver 2 ou mais mensagens, a nova mensagem é diferente da anterior.
- Se o pool tiver apenas 1 mensagem, a repetição é permitida.

---

### E2 — Base de mensagens local

#### US-04 — JSON local com tons

**Prioridade:** Must

**História:** Como produto, quero mensagens em JSON local com tom e categoria, para operar offline e sem backend.

**Critérios de aceite:**

- Schema mínimo inclui: `id`, `text`, `tone`, `category`, `tags`, `shareable`.
- Há pelo menos três tons: poética, mística e humorística.
- Dados ficam separados da interface.
- O app funciona sem internet no fluxo de consulta.

---

#### US-05 — Mensagens curtas e legíveis

**Prioridade:** Should

**História:** Como visitante, quero mensagens curtas e legíveis no card, para identificar-me e querer compartilhar.

**Critérios de aceite:**

- Textos são curtos e adequados a card.
- Layout não quebra com as mensagens da base.
- Tons são coerentes com a classificação.
- Não há conteúdo ofensivo ou discriminatório.

---

### E3 — Card visual e compartilhamento

Este épico é crítico para a hipótese principal.

#### US-06 — Card visual da mensagem

**Prioridade:** Must

**História:** Como visitante, quero ver a mensagem em um card visualmente bonito, para sentir valor emocional.

**Critérios de aceite:**

- Após a consulta, a mensagem aparece em um card.
- O texto é legível.
- A identidade visual do card é consistente com o app.
- Não há excesso de elementos competindo com a mensagem.

---

#### US-07 — Compartilhar o card

**Prioridade:** Must

**História:** Como visitante, quero compartilhar o card, para validar a hipótese de compartilhamento.

**Critérios de aceite:**

- A ação de compartilhar é acessível após a consulta.
- O fluxo abre o compartilhamento nativo do dispositivo.
- O compartilhamento inclui o conteúdo do card (texto e/ou imagem).
- Falhas de compartilhamento são tratadas sem travar o app.

---

#### US-08 — Microinteração ao consultar

**Prioridade:** Could

**História:** Como visitante, quero uma microinteração leve ao consultar, para reforçar o momento místico sem atrasar o fluxo.

**Critérios de aceite:**

- A animação é curta e não bloqueia a leitura da mensagem.
- Pode ser removida ou simplificada se prejudicar performance.
- Não atrasa o acesso ao compartilhamento.

---

### E4 — Histórico local

#### US-09 — Persistir últimas 10 consultas

**Prioridade:** Must

**História:** Como visitante, quero que as últimas 10 consultas sejam salvas no aparelho, para revisitar sem conta.

**Critérios de aceite:**

- Consultas são persistidas localmente.
- O histórico limita-se às últimas 10 mensagens (FIFO).
- Não há sincronização em nuvem nem login.
- O histórico sobrevive ao reabrir o app.

---

#### US-10 — Visualizar histórico

**Prioridade:** Must

**História:** Como visitante, quero ver o histórico das últimas mensagens, para revisitar o que me marcou.

**Critérios de aceite:**

- Há tela ou lista acessível de histórico.
- A lista mostra no máximo 10 mensagens.
- Estado vazio é claro quando o usuário ainda não consultou.

---

#### US-11 — Compartilhar a partir do histórico

**Prioridade:** Should

**História:** Como visitante, quero compartilhar uma mensagem do histórico, para compartilhar depois da consulta.

**Critérios de aceite:**

- Ação de compartilhar disponível no item do histórico.
- Usa o mesmo fluxo de compartilhamento da consulta atual.
- Não exige rede além do compartilhamento nativo.

---

### E5 — Identidade, qualidade e build

#### US-12 — Identidade visual consistente

**Prioridade:** Must

**História:** Como visitante, quero uma identidade visual simples e consistente, para a experiência parecer intencional e compartilhável.

**Critérios de aceite:**

- Tipografia, cores e espaçamento são coerentes.
- Botão principal e card estão alinhados à identidade.
- A interface não possui excesso de opções.

---

#### US-13 — Build interna para teste

**Prioridade:** Must

**História:** Como time, quero build interna instalável em dispositivo real, para validar o fluxo com usuários reais.

**Critérios de aceite:**

- Build interna (EAS) é gerada com sucesso.
- App instala em dispositivo Android de teste.
- Fluxo principal funciona com offline básico.
- Checklist mínimo de teste interno é executado.

---

## 4. Resumo de prioridades

### Must

| ID | História |
|----|----------|
| US-01 | Tela principal clara |
| US-02 | Consultar mensagem aleatória |
| US-04 | JSON local com tons |
| US-06 | Card visual da mensagem |
| US-07 | Compartilhar o card |
| US-09 | Persistir últimas 10 consultas |
| US-10 | Visualizar histórico |
| US-12 | Identidade visual consistente |
| US-13 | Build interna para teste |

### Should

| ID | História |
|----|----------|
| US-03 | Evitar repetição consecutiva |
| US-05 | Mensagens curtas e legíveis |
| US-11 | Compartilhar a partir do histórico |

### Could

| ID | História |
|----|----------|
| US-08 | Microinteração ao consultar |

---

## 5. Ordem sugerida de implementação

1. **US-04** — base de mensagens (desbloqueia o restante)
2. **US-01** e **US-02** — tela e consulta
3. **US-06** — card visual
4. **US-07** — compartilhamento (núcleo da hipótese)
5. **US-09** e **US-10** — histórico
6. **US-12** — identidade visual
7. **US-13** — build interna
8. Should: **US-03**, **US-05**, **US-11**
9. Could: **US-08** apenas se sobrar tempo

---

## 6. Riscos de escopo

| Risco | Impacto | Mitigação |
|-------|---------|-----------|
| Card de compartilhamento virar projeto visual complexo | Alto | Layout simples primeiro; validar share cedo em Android |
| Histórico inflar para favoritos, filtros ou perfil | Médio | Limite rígido de 10; sem favoritos/nuvem no MVP |
| “Só mais uma tela” (onboarding, settings, trilhas) | Alto | Revisar novas ideias contra a hipótese principal |
| Analytics/backend “só para medir” no MVP | Alto | Medir feedback manual no teste interno |
| Pool de mensagens pobre → baixa identificação | Alto | Curadoria via Storyteller Agent; não IA runtime |
| Animação/visual excessivo degradar performance | Médio | Limitar microinterações; priorizar fluxo Must |

---

## 7. Itens explicitamente fora do MVP

Os itens abaixo **não** fazem parte deste backlog de MVP:

- login, cadastro, perfil de usuário
- backend, Supabase, sincronização em nuvem
- IA generativa em tempo real dentro do app
- ranking, comentários, curtidas, seguidores, comunidade
- notificações push
- monetização, assinatura, loja interna
- gamificação pesada
- favoritos em nuvem
- personalização avançada
- analytics avançado
- múltiplas trilhas complexas
- filtro por tom na interface (fica no backlog futuro)

---

## 8. Backlog futuro

Itens candidatos **após** evidência de identificação e compartilhamento no MVP:

- atualização remota de conteúdo
- analytics leve de uso e compartilhamento
- favoritos locais
- filtro por tom na UI
- novos tons e trilhas
- splash / branding avançado
- distribuição pública (lojas)
- Supabase / autenticação
- notificações
- personalização
- features sociais leves

Nenhuma dessas ideias deve entrar na sprint do MVP sem revalidação explícita da hipótese.

---

## 9. Recomendação de próxima ação

1. Considerar este backlog aprovado como fonte de priorização do MVP.
2. Acionar o **PMO / Project Manager Agent** para organizar board, diário de bordo e rastreabilidade — ou o **Software Architect Agent** para gerar `docs/ARCHITECTURE.md` alinhado às histórias Must.
3. Em paralelo de conteúdo, acionar o **Storyteller Agent** para gerar o JSON inicial de mensagens (qualidade de US-05).
4. **Não** iniciar implementação Frontend antes de backlog aprovado e estrutura técnica mínima.

---

## Referência rápida do fluxo de valor

```text
Abrir app → Consultar → JSON local → Card visual → Compartilhar
                              ↓
                    Histórico local (últimas 10)
                              ↓
                    Validar hipótese principal
```

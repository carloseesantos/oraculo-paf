# BACKLOG.md

# ORÁCULO PAF — Backlog inicial do MVP

## 1. Visão geral do backlog

Este backlog transforma a hipótese principal do ORÁCULO PAF em épicos e user stories enxutas.

**Hipótese a validar:** usuários se identificam com mensagens rápidas (poéticas, místicas ou humorísticas) a ponto de querer compartilhar o card gerado.

O caminho mínimo para essa prova é:

> abrir → consultar → ver card → compartilhar → persistir histórico local → build interna

A visualização do histórico melhora a continuidade, mas não faz parte do núcleo Must. O backlog prioriza validação rápida da hipótese, não completude do produto. Cinco épicos e treze histórias cobrem o MVP. Prioridade MoSCoW indica o que é indispensável (Must), desejável (Should) ou opcional se sobrar tempo (Could).

**Restrições permanentes do MVP:** sem login, sem backend, sem IA generativa em tempo real, sem ranking, comentários ou rede social.

---

## 2. Épicos do MVP

| ID | Épico | Objetivo |
|----|--------|----------|
| E1 | Experiência de consulta | Abrir o app e receber mensagem aleatória em segundos, sem tutorial |
| E2 | Base de mensagens local | JSON embarcado com tons (poética, mística, humorística), offline |
| E3 | Card visual e compartilhamento | Exibir e compartilhar o card — núcleo da hipótese |
| E4 | Histórico local | Últimas 10 consultas no dispositivo, sem nuvem/login |
| E5 | Identidade, qualidade e build | Identidade visual mínima e consistente, fluxo estável e build interna para teste |

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
- Mensagens sem `id` não devem ser consideradas válidas.
- Mensagens sem `text` não devem ser exibidas.
- Mensagens sem `tone` devem ser classificadas como inválidas ou receber fallback definido.
- IDs duplicados devem ser evitados na curadoria.
- A estrutura do JSON deve permitir evolução futura sem alterar o fluxo principal.

---

#### US-05 — Mensagens curtas, legíveis e compartilháveis

**Prioridade:** Must

**História:** Como visitante, quero mensagens curtas, legíveis e com potencial de compartilhamento no card, para identificar-me e querer compartilhar.

**Critérios de aceite:**

- Textos são curtos e adequados a card.
- Cada mensagem deve caber no card sem quebrar layout.
- Cada mensagem deve ter potencial de identificação ou compartilhamento.
- Mensagens genéricas demais devem ser removidas na curadoria.
- Cada tom deve ter quantidade mínima inicial de mensagens: pelo menos 5 mensagens válidas por tom.
- A base inicial deve conter exemplos dos três tons: poética, mística e humorística.
- Tons são coerentes com a classificação.
- Não há conteúdo ofensivo ou discriminatório.
- Escopo controlado: base mínima adequada ao card e ao compartilhamento — sem grande volume, sem curadoria avançada e sem IA generativa em runtime.

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
- Compartilhamento deve ser testado em Android real.
- Se a imagem do card falhar, fallback em texto pode ser usado.
- O compartilhamento não deve depender de backend.
- O compartilhamento não deve exigir login.
- O fluxo deve ser validado cedo, antes de refinamentos visuais.

---

#### US-08 — Microinteração ao consultar

**Prioridade:** Could

**História:** Como visitante, quero uma microinteração leve ao consultar, para reforçar o momento místico sem atrasar o fluxo.

**Critérios de aceite:**

- A animação é curta e não bloqueia a leitura da mensagem.
- Pode ser removida ou simplificada se prejudicar performance.
- Não atrasa o acesso ao compartilhamento.
- Só entra depois de consulta, card, compartilhamento, histórico local e build interna estarem prontos.
- Não deve entrar se houver risco de atraso, dependência visual pesada, perda de performance ou distração do fluxo principal.

---

### E4 — Histórico local

#### US-09 — Persistir últimas 10 consultas

**Prioridade:** Must

**História:** Como visitante, quero que as últimas 10 consultas sejam salvas no aparelho, para revisitar sem conta.

**Critérios de aceite:**

- Consultas são persistidas localmente.
- O histórico limita-se às últimas 10 mensagens (FIFO).
- Ao inserir a 11ª mensagem, a mais antiga deve ser removida.
- O histórico deve manter ordem do mais recente para o mais antigo.
- Mensagens inválidas não devem ser salvas.
- Persistência deve sobreviver ao fechamento e reabertura do app.
- Não há sincronização em nuvem nem login.

---

#### US-10 — Visualizar histórico

**Prioridade:** Should

**História:** Como visitante, quero ver o histórico das últimas mensagens, para revisitar o que me marcou.

**Critérios de aceite:**

- Há tela ou lista acessível de histórico.
- A lista mostra no máximo 10 mensagens.
- Estado vazio é claro quando o usuário ainda não consultou.
- Implementação deve permanecer simples (lista abaixo do card, área recolhível ou tela leve).
- Evitar: favoritos, filtros, busca, coleção, perfil ou sincronização.

---

#### US-11 — Compartilhar a partir do histórico

**Prioridade:** Should (condicionado)

**História:** Como visitante, quero compartilhar uma mensagem do histórico, para compartilhar depois da consulta.

**Critérios de aceite:**

- Ação de compartilhar disponível no item do histórico.
- Usa o mesmo fluxo de compartilhamento da consulta atual (reutiliza US-07).
- Não cria experiência separada de compartilhamento.
- Não exige rede além do compartilhamento nativo.
- Se exigir fluxo próprio novo, esta história deve ser tratada como Could.

---

### E5 — Identidade, qualidade e build

#### US-12 — Identidade visual mínima e consistente

**Prioridade:** Must

**História:** Como visitante, quero uma identidade visual mínima, simples e consistente, para a experiência parecer intencional e compartilhável sem atrasar a validação.

**Critérios de aceite:**

- Tipografia, cores e espaçamento são coerentes.
- Botão principal e card estão alinhados à identidade.
- A interface não possui excesso de opções.
- Visual inicial é simples.
- Não há múltiplos templates de card no MVP.
- Não há refinamento visual avançado antes do teste interno.
- Legibilidade tem prioridade sobre sofisticação.
- A identidade deve apoiar a validação, não atrasá-la.

---

#### US-13 — Build interna para teste

**Prioridade:** Must

**História:** Como time, quero build interna instalável em dispositivo real, para validar o fluxo com usuários reais.

**Critérios de aceite:**

- Build interna (EAS) é gerada com sucesso.
- Build deve ser instalada em pelo menos um dispositivo Android real.
- Fluxo principal deve ser executado na build.
- Fluxo principal funciona com offline básico.
- Problemas críticos devem ser registrados.
- Checklist mínimo de QA deve ser executado antes de considerar a build validada.

---

## 4. Resumo de prioridades

### Must

| ID | História |
|----|----------|
| US-01 | Tela principal clara |
| US-02 | Consultar mensagem aleatória |
| US-04 | JSON local com tons |
| US-05 | Mensagens curtas, legíveis e compartilháveis |
| US-06 | Card visual da mensagem |
| US-07 | Compartilhar o card |
| US-09 | Persistir últimas 10 consultas |
| US-12 | Identidade visual mínima e consistente |
| US-13 | Build interna para teste |

### Should

| ID | História |
|----|----------|
| US-03 | Evitar repetição consecutiva |
| US-10 | Visualizar histórico |
| US-11 | Compartilhar a partir do histórico (condicionado à reutilização de US-07) |

### Could

| ID | História |
|----|----------|
| US-08 | Microinteração ao consultar |

---

## 5. Ordem sugerida de implementação

1. **US-04** — base de mensagens (desbloqueia o restante)
2. **US-05** — conteúdo mínimo curto, legível e compartilhável
3. **US-01** e **US-02** — tela e consulta
4. **US-06** — card visual
5. **US-07** — compartilhamento (núcleo da hipótese; validar cedo em Android)
6. **US-09** — persistir histórico local
7. **US-12** — identidade visual mínima
8. **US-13** — build interna
9. Should: **US-03**, **US-10**, **US-11** (US-11 só se reutilizar US-07)
10. Could: **US-08** apenas se sobrar tempo e sem risco ao fluxo principal

---

## 6. Riscos de escopo

| Risco | Impacto | Mitigação |
|-------|---------|-----------|
| Card de compartilhamento virar projeto visual complexo | Alto | Layout simples primeiro; validar share cedo em Android |
| Histórico ganhar importância demais (UI/navegação) | Médio | US-09 Must; US-10 Should; US-11 Should condicionado ou Could |
| Identidade visual atrasar o MVP | Médio | Renomear para mínima; legibilidade; sem múltiplos templates |
| Qualidade das mensagens tratada como secundária | Alto | US-05 Must; Storyteller Agent; curadoria mínima; testar no card |
| Compartilhamento validado tarde demais | Alto | Validar US-07 cedo; card simples; fallback texto; Android real |
| Should virar compromisso implícito | Alto | Proteger Must; Should só após fluxo principal; inclusão = decisão explícita |
| “Só mais uma tela” (onboarding, settings, trilhas) | Alto | Revisar novas ideias contra a hipótese principal |
| Analytics/backend “só para medir” no MVP | Alto | Medir feedback manual no teste interno |
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

1. Considerar este backlog pós-revisão como fonte oficial de priorização do MVP.
2. O QA Agent já transformou as histórias Must em cenários testáveis em `docs/QA_CHECKLIST.md`.
3. O PMO Agent já detalhou o plano inicial de execução em `docs/TASKS.md`.
4. O Software Architect Agent já criou o mapa técnico em `docs/IMPLEMENTATION_MAP.md`.
5. Próximos passos:
   - executar Storyteller Agent para gerar o JSON inicial de mensagens;
   - executar UX/UI Agent para definir Home e card mínimos;
   - iniciar scaffold com Frontend Mobile Agent.
---

## Referência rápida do fluxo de valor

```text
Abrir app → Consultar → JSON local → Card visual → Compartilhar
                              ↓
                    Persistir histórico local (últimas 10)
                              ↓
                    Validar hipótese principal

Visualizar histórico e share a partir do histórico = Should
```

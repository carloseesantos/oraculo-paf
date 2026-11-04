# QA_CHECKLIST.md

# ORÁCULO PAF — Checklist de QA (MVP Must)

**Agente:** QA Agent  
**Escopo:** histórias Must do backlog atualizado  
**Ambiente alvo:** build interna + dispositivo Android real  
**Automação:** não exigida neste momento  
**Fora do escopo de validação obrigatória:** US-03, US-08, US-10, US-11 e backlog futuro  

---

## 0. Premissas de teste

| Premissa | Implicação para QA |
|----------|-------------------|
| Sem login | Não testar autenticação, conta ou sync de usuário |
| Sem backend | Não testar API, nuvem ou atualização remota de conteúdo |
| Sem IA em runtime | Mensagens vêm só do JSON embarcado |
| Offline básico | Consulta e histórico local devem funcionar sem internet |
| Hipótese | Identificação + vontade de compartilhar o card |
| Fluxo principal | Abrir → Consultar → Card → Compartilhar → Persistência local → Build |

**Severidade usada neste checklist**

| Código | Significado | Efeito no MVP |
|--------|-------------|----------------|
| B | Bloqueador | Impede teste interno / hipótese |
| A | Alto | Fluxo principal degradado; deve corrigir antes de validar build |
| M | Médio | Aceitável com registro; corrigir na sequência |
| Bxo | Baixo | Melhoria; não bloqueia |

---

## 1. Avaliação geral da testabilidade do backlog

### Veredicto

O backlog Must é **testável o suficiente para teste interno manual**, com foco claro no fluxo principal. A maioria das histórias tem critérios observáveis em dispositivo. Os pontos fracos são critérios subjetivos de UX/conteúdo e a **persistência sem UI de histórico (US-09 Must vs US-10 Should)**.

### Pontos fortes

- Fluxo de valor curto e linear (poucos caminhos felizes).
- US-02, US-04, US-07, US-09 e US-13 têm critérios majoritariamente objetivos.
- Restrições do MVP (offline, sem login, sem backend) reduzem superfície de teste.
- BACKLOG atualizado reforçou schema, FIFO, share em Android e fallback — melhora a verificabilidade.

### Lacunas de testabilidade

| Lacuna | Histórias | Risco | Mitigação QA |
|--------|-----------|-------|--------------|
| Critérios subjetivos (“evidente”, “bonito”, “poucos segundos”) | US-01, US-06, US-12 | Interpretação divergente | Heurísticas operacionais abaixo |
| Qualidade editorial (“potencial de compartilhamento”) | US-05 | Falso negativo da hipótese | Checklist de curadoria (humano) |
| Persistência sem tela de histórico | US-09 | Difícil provar FIFO/ordem só na UI | Smoke via reabertura + evidência indireta; se US-10 entrar, revalidar; senão, inspeção de storage ou log de debug temporário |
| Quantidade mínima por tom | US-05 | Aceite agora mensurável | Usar DEC-017: ≥ 5 mensagens válidas por tom |
| “Imediata” sem limiar | US-02 | Discussão sem dado | Aceite: resposta percebida &lt; 1s em device intermediário, sem spinner de rede |

### Escopo explícito do que NÃO testar como Must

- Evitar repetição consecutiva (US-03)
- Visualizar histórico na UI (US-10)
- Compartilhar a partir do histórico (US-11)
- Microinteração (US-08)
- Login, backend, IA generativa, analytics, filtros por tom

---

## 2. Ordem recomendada de execução dos testes

1. **Smoke de build (US-13)** — app instala e abre  
2. **Tela e consulta (US-01, US-02)** — fluxo mínimo  
3. **Dados e conteúdo (US-04, US-05)** — JSON + legibilidade no card  
4. **Card (US-06) + identidade (US-12)** — visual mínimo  
5. **Compartilhar (US-07)** — núcleo da hipótese em Android real  
6. **Histórico persistido (US-09)** — FIFO e reabertura  
7. **Offline** — repetir fluxo principal sem rede  
8. **Checklist de go/no-go** — seção 9  

---

## 3. Cenários de teste por user story Must

Formato: **ID | Tipo | Passos | Resultado esperado | Severidade se falhar**

Tipos: `P` positivo · `N` negativo · `E` edge · `UX` experiência · `T` técnico

---

### US-01 — Tela principal clara

#### Critérios de aceite → verificação operacional

| Critério original | Como verificar |
|-------------------|----------------|
| App abre sem erro crítico | Cold start até Home estável, sem crash/tela branca |
| Botão “Consultar” evidente | Visível sem scroll na primeira viewport; maior CTA da tela |
| Sem onboarding/login/tutorial | Nenhum step obrigatório antes da Home |
| Fluxo compreensível em poucos segundos | Observador novo identifica a ação principal em ≤ 5s |

#### Cenários

| ID | Tipo | Passos | Esperado | Sev. |
|----|------|--------|----------|------|
| US01-P01 | P | Instalar build, abrir app | Home carrega sem crash | B |
| US01-P02 | P | Observar primeira tela | Botão “Consultar” visível e destacado | B |
| US01-P03 | P | Verificar ausência de fluxos | Não há login, onboarding nem tutorial bloqueante | B |
| US01-UX01 | UX | Pedir a pessoa de teste: “o que você faria agora?” | Resposta aponta para Consultar em ≤ 5s | A |
| US01-N01 | N | Abrir com memória baixa / cold start lento | Não fica em estado quebrado permanente; se lento, ainda chega na Home | A |
| US01-E01 | E | Rotacionar tela (se permitido) | Layout não esconde o CTA principal | M |
| US01-E02 | E | Abrir em fonte do sistema aumentada | Texto do CTA permanece legível e acionável | M |

---

### US-02 — Consultar mensagem aleatória

#### Critérios → verificação

| Critério | Como verificar |
|----------|----------------|
| Toque gera nova mensagem | Card/texto atualiza após toque |
| Vem do JSON local | Conteúdo bate com base embarcada; funciona offline |
| Resposta imediata | Sem espera de rede; &lt; 1s percebido |
| Sem loading de rede | Nenhum spinner/indicador de fetch remoto no fluxo |

#### Cenários

| ID | Tipo | Passos | Esperado | Sev. |
|----|------|--------|----------|------|
| US02-P01 | P | Abrir app → tocar Consultar | Mensagem exibida | B |
| US02-P02 | P | Tocar Consultar novamente | Nova consulta ocorre (texto pode repetir — US-03 não é Must) | B |
| US02-P03 | P | Modo avião ON → Consultar | Mensagem ainda aparece | B |
| US02-T01 | T | Observar UI durante consulta | Sem loading de rede / dependência de API | A |
| US02-N01 | N | Toques rápidos consecutivos (spam) | App não trava; estado permanece consistente | A |
| US02-E01 | E | Consultar logo após cold start | Primeira consulta funciona | A |
| US02-E02 | E | App em background → foreground → Consultar | Continua funcionando | M |

---

### US-04 — JSON local com tons

#### Critérios → verificação

| Critério | Como verificar |
|----------|----------------|
| Schema mínimo | Arquivo `messages` contém `id`, `text`, `tone`, `category`, `tags`, `shareable` |
| Três tons | Existem entradas `poetica`, `mistica`, `humoristica` (ou nomes equivalentes definidos) |
| Dados separados da UI | Mensagens não hardcodadas na tela |
| Offline | Consulta sem internet |
| Sem `id` / sem `text` / sem `tone` | Itens inválidos não entram no pool exibível |
| IDs únicos | Curadoria sem duplicatas |
| Evolução futura | Campos extras não quebram o fluxo se presentes |

#### Cenários

| ID | Tipo | Passos | Esperado | Sev. |
|----|------|--------|----------|------|
| US04-P01 | P | Revisar JSON embarcado | Schema mínimo presente nas mensagens válidas | B |
| US04-P02 | P | Contar tons | ≥ 1 mensagem válida por tom (ideal ≥ 5 — ver US-05) | B |
| US04-P03 | P | Localizar arquivo de dados vs componentes | Conteúdo fora da UI | A |
| US04-P04 | P | Offline + várias consultas | Pool local responde | B |
| US04-N01 | N | (build/dev) Mensagem sem `id` | Não exibida / não selecionável | A |
| US04-N02 | N | Mensagem sem `text` | Não exibida | A |
| US04-N03 | N | Mensagem sem `tone` | Inválida ou fallback documentado; não quebra app | A |
| US04-E01 | E | Campo extra no JSON (ex.: `author`) | App ignora e segue | M |
| US04-E02 | E | `shareable: false` | Mensagem pode aparecer; share pode cair em texto (não crash) | M |
| US04-E03 | E | Pool só com inválidas (cenário de teste controlado) | Erro amigável / estado seguro, sem crash | A |

---

### US-05 — Mensagens curtas, legíveis e compartilháveis

#### Critérios → verificação operacional

| Critério | Heurística QA |
|----------|---------------|
| Curtas / cabem no card | Sem overflow, corte ilegível ou scroll interno obrigatório no card |
| Potencial de identificação | Review editorial: frase específica, não slogan genérico vazio |
| Mínimo por tom | **≥ 5 válidas por tom** (mínimo operacional sugerido ao PO) |
| Três tons representados | Amostras reais no card |
| Tom coerente | Humorística não parece só “mística mal classificada” (amostra) |
| Sem ofensa/discriminação | Review humano da base |
| Escopo controlado | Base enxuta; sem IA runtime |

#### Cenários

| ID | Tipo | Passos | Esperado | Sev. |
|----|------|--------|----------|------|
| US05-P01 | P | Consultar várias vezes e amostrar tons | Aparecem exemplos dos três tons ao longo das consultas | A |
| US05-P02 | P | Inspecionar contagem no JSON | ≥ 5 válidas por tom (heurística) | A |
| US05-P03 | P | Exibir mensagens mais longas da base no card | Layout não quebra; texto legível | B |
| US05-UX01 | UX | Ler mensagem no card a ~40–50 cm | Contraste e tamanho adequados | A |
| US05-N01 | N | Review de conteúdo | Zero mensagens ofensivas/discriminatórias | B |
| US05-N02 | N | Review de genericidade | Frases genéricas demais removidas/marcadas | M |
| US05-E01 | E | Mensagem com caracteres especiais / aspas / emoji (se houver) | Render sem quebra | M |
| US05-E02 | E | Mensagem no limite superior de comprimento da base | Ainda cabe / não estoura card | A |

### Decisão aplicada

A quantidade mínima inicial foi definida pela DEC-017:

```text
mínimo de 5 mensagens válidas por tom
tons iniciais: poetica, mistica, humoristica
mínimo total: 15 mensagens válidas
```

---

### US-06 — Card visual da mensagem

#### Critérios → verificação

| Critério | Como verificar |
|----------|----------------|
| Mensagem no card | Após Consultar, conteúdo está em container de card |
| Texto legível | Contraste ok; sem truncar meio da frase sem indicação |
| Identidade consistente | Mesma família visual do app (cor/tipo) |
| Sem excesso | Hierarquia: mensagem é o foco; poucos elementos secundários |

#### Cenários

| ID | Tipo | Passos | Esperado | Sev. |
|----|------|--------|----------|------|
| US06-P01 | P | Consultar | Card aparece com a mensagem | B |
| US06-P02 | P | Comparar card vs Home | Identidade alinhada (não parece outro app) | A |
| US06-UX01 | UX | Avaliar hierarquia | Mensagem é o elemento dominante | A |
| US06-N01 | N | Card com muitos ícones/badges | Se competir com texto → falha de aceite | M |
| US06-E01 | E | Mensagens de tons diferentes | Um único template de card (sem múltiplos templates) | A |
| US06-E02 | E | Texto curto vs longo | Ambos legíveis no mesmo template | A |

---

### US-07 — Compartilhar o card

**Prioridade de validação:** máxima (hipótese + RISK-009).

#### Critérios → verificação

| Critério | Como verificar |
|----------|----------------|
| Ação acessível | Botão/ação de share visível após consulta |
| Sheet nativo | Abre share do Android |
| Conteúdo do card | Imagem do card e/ou texto da mensagem |
| Falha sem travar | Cancelar share / erro → app segue |
| Android real | Obrigatório (não só emulador) |
| Fallback texto | Se imagem falhar, texto ainda compartilha |
| Sem backend/login | Sem tela de conta no caminho |

#### Cenários

| ID | Tipo | Passos | Esperado | Sev. |
|----|------|--------|----------|------|
| US07-P01 | P | Consultar → Compartilhar | Sheet nativo abre | B |
| US07-P02 | P | Compartilhar para app de mensagem (WhatsApp/Telegram/etc.) | Destino recebe imagem e/ou texto coerente | B |
| US07-P03 | P | Verificar conteúdo recebido | Mensagem consultada está presente | B |
| US07-P04 | P | Confirmar ausência de login no fluxo | Share não pede conta do ORÁCULO | B |
| US07-N01 | N | Abrir share e cancelar | App não trava; volta ao estado usável | B |
| US07-N02 | N | Forçar falha de captura de imagem (se possível em build de teste) | Fallback texto OU mensagem de erro não bloqueante | A |
| US07-E01 | E | Share com rede off (só sheet local) | Sheet abre; envio depende do app destino | M |
| US07-E02 | E | Share imediatamente após consulta | Sem delay artificial longo | A |
| US07-E03 | E | Consultar de novo → share da nova mensagem | Conteúdo compartilhado corresponde à mensagem atual | A |
| US07-T01 | T | Validar em **Android real** (não só emulador) | Mesmo resultado do P01–P03 | B |

---

### US-09 — Persistir últimas 10 consultas

#### Critérios → verificação

| Critério | Como verificar |
|----------|----------------|
| Persistência local | Sobrevive a kill do app |
| Limite 10 + FIFO | 11ª remove a mais antiga |
| Ordem recente→antiga | Primeiro item = última consulta |
| Inválidas não salvam | Itens rejeitados pelo schema não entram |
| Sem nuvem/login | Sem sync; dados no device |

**Nota de testabilidade:** como a US-10 é Should, a validação da US-09 não deve depender obrigatoriamente de uma tela de histórico.

Para o MVP Must, o método oficial de evidência será:

1. inspeção de storage local; ou
2. log/debug temporário em build interna; ou
3. tela técnica temporária apenas para QA, sem entrar no fluxo do usuário final.

A criação de `HistoryScreen` não é obrigatória para aprovar a US-09 no MVP Must.

O QA deve registrar qual método foi usado na seção 9.4.

**Método selecionado no EP.05 (DEC-023):** diagnóstico temporário em `__DEV__` com `historyService` real, fixtures determinísticas e AsyncStorage real, mais force-stop/reabertura; alternativa: inspeção direta do storage. Casos detalhados US09-QA01…QA10 em `docs/QA_US09_Estrategia_Evidencia_EP05.md` (todos NOT RUN).

**Unidade do histórico:** cada entrada é um **evento de consulta**. O mesmo `messageId` pode aparecer em entradas diferentes, distinguidas por `consultedAt`. Unicidade de IDs não é requisito da US-09.

#### Cenários

| ID | Tipo | Passos | Esperado | Sev. |
|----|------|--------|----------|------|
| US09-P01 | P | Consultar 1× → fechar app (kill) → reabrir | Registro da consulta permanece no storage/histórico | B |
| US09-P02 | P | Consultar 10 vezes (IDs podem repetir) | Existem 10 entradas, uma por evento de consulta | B |
| US09-P03 | P | Consultar a 11ª | Permanecem 10; a mais antiga saiu (FIFO) | B |
| US09-P04 | P | Verificar ordem | Mais recente primeiro | A |
| US09-N01 | N | Tentar persistir mensagem inválida (ambiente de teste) | Não salva | A |
| US09-N02 | N | Confirmar ausência de sync | Sem login/nuvem no fluxo | B |
| US09-E01 | E | Consultas muito rápidas | Contagem final coerente (sem duplicar indevido por race) | A |
| US09-E02 | E | Desinstalar app | Histórico some (aceitável no MVP) | Bxo |
| US09-E03 | E | Reabrir após várias sessões | Últimas 10 corretas | A |

---

### US-12 — Identidade visual mínima e consistente

#### Critérios → verificação

| Critério | Como verificar |
|----------|----------------|
| Tipografia/cores/espaço coerentes | Mesma paleta e tipo na Home e no card |
| Botão e card alinhados | Mesmo “sistema” visual |
| Sem excesso de opções | Poucos CTAs; sem menu complexo |
| Visual simples / sem multi-templates | Um card template |
| Legibilidade &gt; sofisticação | Texto legível em device real |
| Não atrasa validação | Polish não bloqueia US-07/US-13 |

#### Cenários

| ID | Tipo | Passos | Esperado | Sev. |
|----|------|--------|----------|------|
| US12-P01 | P | Percorrer Home + card | Coerência visual básica | A |
| US12-P02 | P | Contar ações principais na Home | Poucas opções; Consultar/Share claros | A |
| US12-UX01 | UX | Screenshot em device | Identidade mínima intencional, não “placeholder caótico” | M |
| US12-N01 | N | Procurar múltiplos templates de card | Não devem existir no MVP | A |
| US12-E01 | E | Tema claro do sistema / contraste | Legibilidade mantida | M |

---

### US-13 — Build interna para teste

#### Critérios → verificação

| Critério | Como verificar |
|----------|----------------|
| EAS build OK | Artefato gerado sem erro |
| Android real | Instalação em ≥ 1 device físico |
| Fluxo principal na build | Abrir→Consultar→Card→Share |
| Offline básico | Fluxo sem internet |
| Problemas críticos registrados | Lista no diário / este checklist |
| Checklist QA executado | Seção 9 preenchida |

#### Cenários

| ID | Tipo | Passos | Esperado | Sev. |
|----|------|--------|----------|------|
| US13-P01 | P | Gerar build interna (EAS) | Sucesso | B |
| US13-P02 | P | Instalar em Android real | App abre | B |
| US13-P03 | P | Executar fluxo principal na build | Completo sem crash | B |
| US13-P04 | P | Modo avião + fluxo principal | Consulta + card OK; share sheet abre | A |
| US13-N01 | N | Registrar bugs críticos encontrados | Há registro (mesmo que lista vazia consciente) | A |
| US13-E01 | E | Reinstalar build | Instalação repetível | M |

---

## 4. Casos positivos (resumo executivo)

Fluxo feliz mínimo a passar em Android real:

1. Instalar build interna.  
2. Abrir app → Home clara com “Consultar”.  
3. Consultar → mensagem no card (JSON local).  
4. Repetir consulta offline.  
5. Compartilhar card (imagem e/ou texto) via sheet nativo.  
6. Cancelar share sem travar.  
7. Acumular &gt; 10 consultas → histórico limitado a 10 (FIFO).  
8. Kill app → reabrir → persistência ok.  
9. Identidade mínima coerente; sem login/backend.  

---

## 5. Casos negativos (resumo)

| Caso | Esperado |
|------|----------|
| Cancelar compartilhamento | App segue usável |
| Falha na captura de imagem do card | Fallback texto ou erro não bloqueante |
| Mensagem JSON sem `id`/`text`/`tone` | Não entra no fluxo / não quebra app |
| Spam de toques em Consultar | Sem freeze/crash |
| Sem internet | Consulta e card OK |
| Tentativa implícita de “precisar de login” | Não existe no fluxo |

---

## 6. Edge cases (resumo)

| Edge | Esperado |
|------|----------|
| 11ª consulta | Remove a mais antiga |
| Texto no limite de comprimento | Card legível |
| `shareable: false` | Não crasha; share pode ser só texto |
| Campo extra no JSON | Ignorado |
| Fonte do sistema grande | CTA e mensagem usáveis |
| App background/foreground | Fluxo continua |
| Desinstalação | Histórico perdido (ok no MVP) |
| Pool degradado (só inválidas) | Estado seguro, sem crash |

---

## 7. Riscos de qualidade

| ID | Risco | Sev. | Ligação | Ação QA |
|----|-------|------|---------|---------|
| Q-01 | Share OK no emulador e falha no device | B | RISK-009, US-07 | Validar cedo em Android real |
| Q-02 | Card “bonito” atrasa share | A | RISK-001 | Aceitar card mínimo se share passar |
| Q-03 | Mensagens genéricas → hipótese falsa | A | RISK-005, US-05 | Review editorial antes do teste com usuários |
| Q-04 | JSON inválido em runtime | A | RISK-013, US-04 | Validar schema + estado de erro |
| Q-05 | Persistência não observável sem US-10 | A | US-09 | Usar evidência por storage, debug temporário ou tela técnica de QA; não promover US-10 a Must |
| Q-06 | Critérios subjetivos de UX geram debate | M | US-01/06/12 | Usar heurísticas deste doc |
| Q-07 | Performance/animação no device intermediário | M | RISK-006 | Medir fluxo Must sem microinteração (US-08 out) |
| Q-08 | Identidade visual excessiva atrasa build | M | RISK-008, US-12 | Legibilidade &gt; polish |
| Q-09 | Should tratado como Must no teste | A | BACKLOG | Não bloquear go/no-go por US-03/10/11/08 |
| Q-10 | Offline não testado na build interna | A | US-13 | Incluir modo avião no smoke |

**Bloqueadores típicos de go/no-go**

- Crash no abrir ou no Consultar  
- Share não abre / trava o app em Android real  
- Consulta depende de rede  
- US-09 não possui evidência técnica suficiente de persistência, limite 10 e FIFO
- Build não instala em device real  

---

## 8. Critérios de aceite que precisam ser ajustados (recomendação ao PO)

Não ampliam escopo; só tornam o aceite **mensurável**.

| História | Critério atual | Ajuste sugerido |
|----------|----------------|-----------------|
| US-01 | “compreensível em poucos segundos” | Observador novo identifica Consultar em **≤ 5s**, sem scroll |
| US-01 | “botão evidente” | CTA **visível na primeira viewport** e é a ação primária |
| US-02 | “resposta imediata” | Percebido **&lt; 1s**; **sem** indicador de loading de rede |
| US-04 | fallback de `tone` “definido” | Explicitar: **inválida (preferencial)** ou tom default documentado |
| US-05 | “quantidade mínima” | Fixar **≥ 5 mensagens válidas por tom** (ou outro número do PO) |
| US-05 | “potencial de identificação” | Checklist editorial: específica, curta, não ofensiva, cabe no card |
| US-05 | “caber no card” | **Sem overflow/corte ilegível** nas mensagens da base |
| US-07 | “texto e/ou imagem” | Preferência: **imagem do card**; fallback obrigatório: **texto** |
| US-09 | persistência sem UI | Aceite Must: evidência de storage **ou** revalidação com US-10; documentar método usado |
| US-09 | “ordem recente→antiga” | Só exigível na UI se US-10 existir; senão validar na camada de dados |
| US-12 | “coerente / intencional” | Checklist: 1 paleta, 1 tipografia base, 1 template de card, ≤ N ações na Home |
| US-13 | “checklist mínimo” | Este documento (seção 9) é o checklist oficial |

---

## 9. Checklist executável de teste interno (go / no-go)

Preencher em device Android real. Marcar `[x]` / `[ ]`.

### 9.1 Ambiente

- [ ] Build interna gerada (EAS) — US-13  
- [ ] Instalada em Android físico — modelo: ________  
- [ ] Versão/build: ________  
- [ ] Testador: ________ Data: ________  

### 9.2 Fluxo principal (bloqueadores)

- [ ] App abre sem crash — US-01  
- [ ] “Consultar” visível sem tutorial/login — US-01  
- [ ] Consultar exibe mensagem — US-02  
- [ ] Consulta funciona em modo avião — US-02/US-04/US-13  
- [ ] Mensagem aparece em card legível — US-06  
- [ ] Compartilhar abre sheet nativo — US-07  
- [ ] Conteúdo compartilhado coerente (imagem e/ou texto) — US-07  
- [ ] Cancelar share não trava o app — US-07  
- [ ] Sem pedido de login/backend no fluxo — restrição MVP  

### 9.3 Dados e conteúdo

- [ ] JSON com schema mínimo e 3 tons — US-04  
- [ ] Mensagens curtas cabem no card — US-05  
- [ ] Sem conteúdo ofensivo na base amostrada — US-05  
- [ ] Contagem mínima por tom atingida (meta: ≥ 5) — US-05  

### 9.4 Histórico local

- [ ] Persistência sobrevive a kill/reabrir — US-09  
- [ ] Limite 10 + FIFO validado — US-09  
- [ ] Ordem recente → antiga validada — US-09  
- [ ] Método de evidência usado: storage / debug temporário / tela técnica de QA — ________  
- [ ] Confirmação: US-10 não foi tratada como bloqueadora para aprovar US-09  

### 9.5 Identidade e estabilidade

- [ ] Identidade mínima consistente (1 template de card) — US-12  
- [ ] Sem excesso de opções na Home — US-12  
- [ ] Sem erros críticos no fluxo principal — US-13  

### 9.6 Registro de problemas

| ID | Descrição | Sev. (B/A/M/Bxo) | História | Status |
|----|-----------|------------------|----------|--------|
| | | | | |

### 9.7 Decisão

- [ ] **GO** — fluxo principal validado para teste interno com usuários  
- [ ] **NO-GO** — bloqueador aberto (listar IDs)  

**Observações:**

```
(escrever aqui)
```

---

## 10. Matriz rápida: critério de pronto × teste

| Critério de pronto (PROJECT_CONTEXT) | Cobertura Must |
|--------------------------------------|----------------|
| Abrir app | US01-P01 |
| Consultar mensagem | US02-P01 |
| Botão gera nova mensagem | US02-P02 |
| Mensagens da base local | US04-P04 |
| Histórico últimas 10 | US09-P02/P03 |
| Visualizar histórico | **Should (US-10)** — não obrigatório neste checklist |
| Compartilhar card | US07-P01–P03 |
| Offline básico | US02-P03, US13-P04 |
| Build interna + device real | US13-P01–P03 |
| Sem tutorial | US01-P03 |

---

## 11. Separação por tipo de teste (visão do QA Agent)

### Funcionais

US-02, US-04 (runtime), US-07, US-09, US-13 — comportamento observável e bloqueadores.

### UX

US-01, US-05 (legibilidade), US-06, US-12 — heurísticas + observação humana; não confundir com polish.

### Técnicos / dados

Schema JSON, separação dados/UI, offline, FIFO, fallback de share, build EAS.

### Não obrigatórios agora

Automação E2E, testes de regressão amplos, US Should/Could, iOS (salvo interesse futuro).

---

## 12. Recomendação de prioridade de teste

| Ordem | Foco | Motivo |
|-------|------|--------|
| 1 | US-07 em Android real | Núcleo da hipótese (RISK-009) |
| 2 | US-02 + offline | Experiência principal |
| 3 | US-06 card mínimo legível | Pré-requisito do share |
| 4 | US-04/US-05 base | Evita hipótese “falsa negativa” |
| 5 | US-09 FIFO/persistência | Continuidade local |
| 6 | US-01/US-12 clareza visual mínima | Baixo atrito |
| 7 | US-13 go/no-go | Porta de saída do MVP interno |

**Próximo passo sugerido:** PMO detalha tarefas; Storyteller entrega JSON (US-05); Frontend implementa Must; QA executa seção 9 na primeira build Android.

---

## 13. Estado de execução — EP.05 (consolidação v5.0, 03/11/2026)

Os cenários acima continuam válidos e com os mesmos IDs. Esta seção registra apenas o que foi efetivamente verificado até o EP.05. A seção 9 (go/no-go) **não foi preenchida**: não existe build interna.

| Camada | Situação | Cenários / evidência |
|---|---|---|
| **Especificados** | Documentados | Todos os cenários da seção 3; US09-QA01…QA10 em `docs/QA_US09_Estrategia_Evidencia_EP05.md` |
| **Revisão editorial humana** | Concluída | US05-N01 e US05-N02 atendidos pela aprovação integral das 18 mensagens (DEC-018) |
| **Verificações estáticas executadas** | PASS (reproduzidas pelo PMO) | `npm run check:messages` 17/17: schema e contagem (apoiam US04-P01, US04-P02, US05-P02); rejeição de registros sem `id`, `text` vazio, `tone` ausente ou inválido (US04-N01…N03, **no nível da função** `validateMessages`); campo extra aceito (US04-E01); `shareable: false` continua válida (parte de US04-E02); só inválidas → pool vazio sem exceção (US04-E03, **no nível da função**); sorteio dentro do pool. Inspeção de código: dados fora da UI (US04-P03) e um único template de card (apoia US06-E01, US12-N01). `npm run typecheck` exit 0; `expo-doctor` 20/20; export Android 634 módulos |
| **Integração no app** | NOT RUN | Estado de falha segura renderizado (US04-E03 na UI), US02-N01, camada B da US-09, fluxo Consultar → card → share |
| **Funcionais de UI** | NOT RUN | US01-*, US02-*, US05-P01/P03/UX01/E01/E02, US06-*, US12-* — a interface ainda não foi observada em execução |
| **Android físico** | NOT RUN | US07-* (inclui US07-T01), US09-P01…E03 e camada C, US13-*, seção 9 inteira |
| **Não implementado** | Sem código para testar | US-07 (compartilhamento), US-09 (histórico), US-13 (build EAS) |

Verificações estáticas apoiam, mas não substituem, os cenários de runtime e de Android físico. Nenhum cenário da seção 3 foi marcado como aprovado em dispositivo.

---

## Referências

- `docs/PROJECT_CONTEXT.md` — hipótese e critérios de pronto  
- `docs/BACKLOG.md` — histórias Must atualizadas  
- `docs/RISKS.md` — RISK-001, 005, 006, 008, 009, 013  
- `docs/DECISIONS.md` — DEC-003 a DEC-009, DEC-015  
- `docs/ARCHITECTURE.md` — schema, share fallback, FIFO  

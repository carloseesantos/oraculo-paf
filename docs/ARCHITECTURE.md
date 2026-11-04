# ARCHITECTURE.md

# ORÁCULO PAF — Arquitetura inicial do MVP

## Objetivo deste documento

Definir a arquitetura mínima, prática e evolutiva do MVP do ORÁCULO PAF.

Este documento orienta implementação. Não é um tratado acadêmico.

Fonte de verdade do produto: `docs/PROJECT_CONTEXT.md`.  
Priorização funcional: `docs/BACKLOG.md` (histórias Must).  
Decisões já tomadas: `docs/DECISIONS.md`.  
Riscos ativos: `docs/RISKS.md`.

---

# 1. Visão geral da arquitetura

## 1.1 Objetivo da arquitetura

Permitir construir rapidamente um app mobile instalável que valide a hipótese:

> Usuários se identificam com mensagens rápidas (poéticas, místicas ou humorísticas) a ponto de querer compartilhar o card gerado.

O caminho técnico mínimo é:

```text
abrir → carregar JSON local → consultar → card → compartilhar → histórico local → build interna
```

## 1.2 Princípios arquiteturais do MVP

1. **Simplicidade primeiro** — uma camada de app, sem backend.
2. **Offline por padrão** — consulta e histórico não dependem de rede.
3. **Baixo atrito** — sem login, cadastro ou onboarding.
4. **Separação conteúdo × interface** — mensagens em JSON; UI só consome.
5. **Validar o núcleo cedo** — compartilhamento do card antes de polish visual.
6. **Evolutivo, não prematuro** — estrutura clara para crescer; sem abstrações antecipadas.
7. **Dependências mínimas** — cada lib precisa justificar valor no MVP.
8. **Proteger o escopo** — Must do backlog; backlog futuro fica fora.

## 1.3 Restrições principais

| Restrição | Motivo |
|-----------|--------|
| Sem backend | DEC-004; não valida hipótese |
| Sem login | DEC-003; atrito |
| Sem Supabase | Evolução futura, não MVP |
| Sem IA generativa em runtime | DEC-006; custo, latência, moderação |
| Sem microserviços / arquitetura corporativa | Overengineering |
| Histórico ≤ 10 mensagens, local | DEC-008; RISK-002 |
| Foco Android real no teste interno | US-13; RISK-009 |

---

# 2. Stack técnica recomendada

| Camada | Escolha | Papel no MVP |
|--------|---------|--------------|
| Runtime / tooling | **Expo** | Scaffold, APIs nativas, EAS Build |
| UI | **React Native** | Telas e componentes mobile |
| Linguagem | **TypeScript** | Tipos para mensagem, histórico e serviços |
| Conteúdo | **JSON local** | Pool de mensagens embarcado |
| Persistência | **Armazenamento local** (`AsyncStorage` compatível com Expo) | Últimas 10 consultas |
| Share | **Compartilhamento nativo** (`expo-sharing` + captura de view) | Card para apps externos |
| Distribuição | **EAS Build** | Build interna Android |

### Justificativa resumida (DEC-007)

Expo + RN + TS acelera prototipação, tipagem e teste em device real, sem forçar infraestrutura.

### O que não entra na stack do MVP

- API HTTP / BFF / microserviços
- Supabase, Firebase Auth, Auth0
- Redux / Zustand / React Query (estado local + hooks bastam)
- SDKs de IA no client
- Analytics avançado

---

# 3. Decisões arquiteturais iniciais

## 3.1 Por que não usar backend no MVP

**Decisão:** app 100% client-side.  
**Base:** DEC-004, RISK-004.

**Justificativa:** mensagens e histórico locais bastam para provar identificação + share. Backend adiciona custo, deploy, rede e atraso sem validar a hipótese.

**Alternativa descartada:** API mínima “só para conteúdo” — adia build e cria dependência desnecessária.

## 3.2 Por que não usar login

**Decisão:** anônimo, sem conta.  
**Base:** DEC-003.

**Justificativa:** o valor está em abrir → consultar → compartilhar em segundos. Login aumenta fricção e puxa perfil/nuvem.

**Alternativa descartada:** login “opcional” — ainda assim exige fluxos e testes extras.

## 3.3 Por que usar JSON local

**Decisão:** `messages.json` embarcado.  
**Base:** DEC-005, US-04.

**Justificativa:** offline, curadoria versionada no repo, separação conteúdo/UI, zero latência de rede.

**Alternativa descartada:** CMS ou fetch remoto no MVP.

## 3.4 Por que usar armazenamento local

**Decisão:** persistir histórico no device.  
**Base:** DEC-008, US-09.

**Justificativa:** revisitar mensagens sem conta. Limite de 10 + FIFO evita produto de “coleção/favoritos”.

**Alternativa descartada:** SQLite/ORM no MVP — overhead para uma lista curta de JSON.

## 3.5 Por que validar compartilhamento cedo

**Decisão:** share é Must e spike técnico precoce.  
**Base:** DEC-009, US-07, RISK-001, RISK-009.

**Justificativa:** a hipótese cai se o card não sair do aparelho. Differe entre simulador e Android real; falhar tarde custa caro.

**Alternativa descartada:** polish do card antes do share funcionar.

## 3.6 Por que evitar IA generativa em runtime

**Decisão:** conteúdo curado; IA só no processo (Storyteller, agentes).  
**Base:** DEC-006, RISK-007.

**Justificativa:** runtime IA implica chave, rede, custo, latência e moderação — o oposto de micro-app offline.

**Alternativa descartada:** “gerar frase a cada toque” via API.

---

# 4. Estrutura sugerida de pastas

Alinha-se a `PROJECT_CONTEXT.md` e ao artefato do Storyteller (`app/src/data/messages.json`).

```text
oraculo-paf/
  docs/
    ARCHITECTURE.md
    PROJECT_CONTEXT.md
    BACKLOG.md
    DECISIONS.md
    RISKS.md
    AGENTS.md
    DIARY.md
    adr/                         # ADRs (criar sob demanda)
  app/                           # projeto Expo (raiz do app mobile)
    App.tsx                      # ou entry Expo Router — manter uma navegação simples
    app.json / eas.json
    package.json
    src/
      components/                # UI reutilizável
      screens/                   # telas (Home, History)
      data/                      # JSON e fixtures estáticos
      services/                  # regras de acesso a dados / side effects
      hooks/                     # orquestração UI ↔ services
      utils/                     # helpers puros
      theme/                     # tokens visuais
      types/                     # tipos TypeScript compartilhados
```

### Responsabilidades

| Pasta | Responsabilidade | Exemplos MVP |
|-------|------------------|--------------|
| `app/` | Projeto Expo: config, entry, assets, build | `app.json`, ícones, splash mínima |
| `src/` | Código da aplicação | tudo abaixo |
| `components/` | Peças visuais sem I/O pesado | `MessageCard`, `ConsultButton` |
| `screens/` | Composição de fluxo por tela | `HomeScreen`; `HistoryScreen` somente se US-10 entrar como Should |
| `data/` | Conteúdo estático | `messages.json` |
| `services/` | Persistência, share, carga/validação de mensagens | `historyService`, `shareService`, `messagesService` |
| `hooks/` | Estado de tela e casos de uso | `useOracleMessage`, `useHistory` |
| `utils/` | Funções puras | `pickRandomMessage`, validadores leves |
| `theme/` | Cores, tipografia, espaçamento | `theme.ts` |
| `types/` | Contratos de dados | `message.types.ts`, `history.types.ts` |

### Regras de dependência (simples)

```text
screens → hooks → services → data/types/utils
screens → components → theme/types
```

- UI não lê `AsyncStorage` direto.
- Services não importam componentes.
- Não criar `domain/`, `repositories/`, `use-cases/` no MVP.

### Navegação

Para as histórias Must do MVP, **uma tela é suficiente**: `HomeScreen`.

A tela de histórico visual (`HistoryScreen`) está associada à US-10, classificada como Should. Portanto, ela não é requisito obrigatório para iniciar o scaffold nem para validar o fluxo principal do MVP.

A US-09 exige persistência local das últimas 10 consultas, mas não exige uma tela de histórico como parte do Must. A evidência de QA para US-09 pode ser feita por inspeção de storage, log/debug temporário ou mecanismo técnico controlado, sem promover US-10 a bloqueador.

Se a US-10 entrar depois, usar navegação simples e manter apenas uma escolha: React Navigation ou Expo Router. Não misturar abordagens no MVP.

---

# 5. Modelo de dados inicial

## 5.1 Schema da mensagem

```ts
type MessageTone = "poetica" | "mistica" | "humoristica";

type OracleMessage = {
  id: string;
  text: string;
  tone: MessageTone;
  category: string;
  tags: string[];
  shareable: boolean;
  // opcionais — não exigidos no MVP
  author?: string;
  createdAt?: string;
  version?: string;
};
```

## 5.2 Exemplo de objeto JSON

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

Arquivo sugerido:

```text
app/src/data/messages.json
```

Formato do arquivo: array de mensagens.

```json
[
  { "id": "msg-001", "text": "...", "tone": "mistica", "category": "oraculo", "tags": [], "shareable": true }
]
```

## 5.3 Campos obrigatórios

| Campo | Regra |
|-------|--------|
| `id` | string única, estável |
| `text` | string não vazia, curta (adequada a card) |
| `tone` | um de: `poetica`, `mistica`, `humoristica` |
| `category` | string não vazia |
| `tags` | array (pode ser vazio) |
| `shareable` | boolean |

## 5.4 Campos opcionais

`author`, `createdAt`, `version` — ignorados pela UI do MVP se ausentes.

## 5.5 Validações mínimas

No boot / carga (`messagesService`):

1. JSON parseável e array não vazio.
2. Cada item tem os campos obrigatórios com tipos corretos.
3. `id` único no array.
4. `tone` ∈ conjunto permitido.
5. `text.trim().length > 0`.
6. Preferir `shareable === true` no fluxo de share; se `false`, ainda pode exibir, mas share pode cair para texto puro.

Falha de schema: log claro em dev; em produção, não crashar a UI — mostrar estado de erro amigável na Home.

### Histórico (persistido)

```ts
type HistoryEntry = {
  messageId: string;
  text: string;       // snapshot para não depender de JSON futuro
  tone: MessageTone;
  consultedAt: string; // ISO
};
```

Snapshot do texto evita quebra se o JSON mudar entre builds.

---

# 6. Fluxos principais

## 6.1 Abrir app

1. App inicia (Expo).
2. Theme e navegação sobem.
3. Home renderiza botão **Consultar** evidente (US-01).
4. Sem login, tutorial ou rede obrigatória.

## 6.2 Carregar mensagens locais

1. `messagesService` importa/carrega `messages.json`.
2. Valida schema mínimo.
3. Expõe lista em memória para hooks.

## 6.3 Consultar mensagem aleatória

1. Usuário toca **Consultar** (US-02).
2. Hook chama util de seleção aleatória sobre o pool.
3. Mensagem atual atualiza estado da Home.
4. Resposta imediata; sem spinner de rede.

## 6.4 Evitar repetição consecutiva

1. Guardar `lastMessageId` em memória (US-03 — Should).
2. Se pool ≥ 2, sortear até `id !== lastMessageId` (ou filtrar e sortear).
3. Se pool = 1, permitir repetição.

## 6.5 Renderizar card

1. `MessageCard` recebe texto, tom e tokens do theme (US-06).
2. Hierarquia: mensagem > ações; poucos elementos.
3. Card estável o suficiente para captura de share.

## 6.6 Compartilhar card

1. Usuário aciona compartilhar (US-07).
2. `shareService` captura a view do card (imagem) **ou**, em fallback, compartilha texto.
3. Abre sheet nativo (`expo-sharing` / Share API).
4. Erro de share: feedback não bloqueante; app segue usable.

## 6.7 Persistir histórico local

1. Após consulta bem-sucedida, `historyService.add(entry)` (US-09).
2. Prepend + trim para 10 (FIFO: remove o mais antigo).
3. Grava em AsyncStorage.
4. Sem nuvem.

## 6.8 Visualizar histórico local

A visualização do histórico pertence à US-10, classificada como Should.

Ela não bloqueia o MVP Must.

Para a US-09, o requisito obrigatório é apenas persistir localmente as últimas 10 consultas, respeitando limite, ordem e FIFO.

A evidência de QA para US-09 deve ser feita por um destes métodos:

1. inspeção de storage local;
2. log/debug temporário durante teste interno;
3. tela mínima temporária de diagnóstico;
4. implementação posterior da US-10, desde que não atrase US-07 e US-13.

A US-11, compartilhar a partir do histórico, continua Should condicionado e só deve reutilizar o `shareService` já criado para US-07.

---

# 7. Estratégia para JSON local

## 7.1 Onde armazenar

```text
app/src/data/messages.json
```

Versionado no Git. Curadoria pelo Storyteller Agent + revisão humana.

## 7.2 Como carregar

- Import estático do JSON no bundle (preferido no MVP), ou `require`.
- Service único: `getMessages()` / `getMessageById()`.
- Screens/hooks não importam o JSON direto (facilita troca futura).

## 7.3 Como validar

- Validação leve em TypeScript (type guard) no service.
- Opcional: script Node simples de CI/local para checar schema antes do commit — sem framework pesado.
- Não adicionar Zod/Yup só por hábito; se quiser schema runtime, uma lib pequena é aceitável **depois** do fluxo Must funcionar.

## 7.4 Evolução futura para backend (sem implementar agora)

Contrato estável:

```ts
interface MessagesSource {
  getAll(): Promise<OracleMessage[]>;
}
```

MVP: `LocalJsonMessagesSource`.  
Futuro: `RemoteMessagesSource` (HTTP/Supabase) atrás da mesma interface.

Até validar a hipótese: **não** criar a implementação remota.

---

# 8. Estratégia para histórico local

| Regra | Detalhe |
|-------|---------|
| Limite | 10 mensagens |
| Persistência | AsyncStorage (chave única, ex. `@oraculo/history`) |
| Ordem | Mais recente primeiro |
| FIFO | Ao passar de 10, remove a mais antiga |
| Login | Nenhum |
| Nuvem | Nenhuma |

### Comportamentos

- Sobrevive a reabrir o app.
- Limpar app / desinstalar apaga histórico (aceitável no MVP).
- Não: favoritos, filtros, busca, sync, merge entre devices.

Isso mitiga **RISK-002** e materializa **DEC-008**.

---

# 9. Estratégia para compartilhamento de card

## 9.1 Abordagem inicial simples

1. Card em componente com `ref` (view estável).
2. Capturar como imagem (`react-native-view-shot` ou equivalente Expo-compatível).
3. Compartilhar arquivo via `expo-sharing`.
4. Se captura falhar: fallback para texto da mensagem (+ marca “ORÁCULO PAF” se couber).

Ordem de implementação alinhada ao backlog: card mínimo → share funcionando em Android → só então polish (RISK-001).

## 9.2 Riscos técnicos

| Risco | Relação |
|-------|---------|
| Captura/share diferente em device real | RISK-009 |
| Card complexo demais atrasar MVP | RISK-001 |
| Libs de animação/imagem pesadas | RISK-006 |

## 9.3 Validação cedo em Android real

- Spike de share na mesma sprint da US-07, antes de templates múltiplos.
- Testar ao menos um destino real (WhatsApp / Instagram Stories / Files).
- Checklist QA deve incluir share como bloqueador do MVP.

## 9.4 Fallback

Se imagem for instável: **compartilhar texto** e seguir. Hipótese ainda se observa (vontade de compartilhar); qualidade visual melhora depois.

Não criar gerador de PDF, deep links ou share server-side no MVP.

---

# 10. Dependências sugeridas

## 10.1 Essenciais

| Dependência | Uso |
|-------------|-----|
| `expo` | Plataforma |
| `react` / `react-native` | UI |
| `typescript` | Tipagem |
| `@react-native-async-storage/async-storage` | Histórico |
| `expo-sharing` | Share nativo |
| lib de captura de view (ex. `react-native-view-shot`) | Imagem do card |


## 10.2 Opcionais (só com justificativa)

| Dependência | Quando |
|-------------|--------|
| `expo-font` | Tipografia custom mínima (US-12) |
| lib leve de animação / Reanimated | Apenas US-08 (Could), se não degradar |
| schema validator leve | Se validação manual ficar frágil |
| navegação mínima (`@react-navigation/native` + stack **ou** Expo Router) | Home ↔ History |

## 10.3 Evitar no MVP

- Supabase, Firebase, Amplify
- Axios/React Query “por padrão”
- Redux Toolkit, MobX, estados globais pesados
- SDKs de OpenAI/Anthropic no app
- Analytics pesado / crashlytics complexo (feedback manual no teste interno)
- Design systems grandes não usados
- ORM / SQLite para 10 itens

---

# 11. Riscos técnicos arquiteturais

| ID local | Risco | Impacto | Mitigação | Relação RISKS.md |
|----------|-------|---------|-----------|------------------|
| A-01 | Share de imagem instável | Alto | Spike cedo + fallback texto | RISK-009, RISK-001 |
| A-02 | Escopo puxar backend/analytics | Alto | Stack client-only; medir manual | RISK-004 |
| A-03 | Histórico virar “produto social” | Médio | Limite 10, sem favoritos/nuvem | RISK-002 |
| A-04 | JSON sem schema travar evolução | Médio | Types + validação mínima + snapshot no histórico | PROJECT_CONTEXT 13.3 |
| A-05 | Overengineering de pastas/camadas | Médio | Estrutura flat em `src/`; sem DDD | RISK-011 |
| A-06 | Animações/libs pesadas | Médio | Must antes de Could; testar device | RISK-006 |
| A-07 | Pressão por IA no runtime | Alto | Conteúdo curado; DEC-006 | RISK-007 |
| A-08 | Código antes da arquitetura | Médio | Este documento; ADRs leves | RISK-011 |

**RISK-011** fica parcialmente mitigado com a existência deste `ARCHITECTURE.md`. Status final deve ser atualizado pelo PMO após revisão.

Novos riscos descobertos na implementação devem voltar para `docs/RISKS.md`, não só para conversas.

---

# 12. Critérios arquiteturais de pronto

## 12.1 Definido antes do Frontend Mobile Agent

- [x] Stack Expo + RN + TS confirmada
- [x] Sem backend / login / Supabase / IA runtime no MVP
- [x] Estrutura de pastas acordada
- [x] Schema de mensagem e histórico
- [x] Fluxos Must descritos
- [x] Estratégia JSON, histórico e share
- [x] Lista do que não instalar
- [x] ADRs iniciais criados em `docs/adr/`
- [x] Scaffold Expo criado na pasta `app/` (primeira tarefa do Frontend Mobile Agent) — EP.05, 03/11/2026: Expo SDK 58, sem Expo Router (DEC-019, DEC-020); execução em runtime ainda não observada (TASK-SCAFFOLD-01 em `review`)

## 12.2 Pode evoluir depois

- Interface `MessagesSource` remota
- Filtro por tom na UI
- Favoritos locais
- Múltiplos templates de card
- Analytics
- iOS como alvo primário de teste (Android primeiro no MVP)
- Microinteração (US-08)
- Tipografia/branding avançados além do mínimo (US-12)

---

# 13. ADRs registrados

Os ADRs iniciais já foram criados em `docs/adr/` e representam as decisões arquiteturais aprovadas para o MVP.

| ADR | Decisão | Status |
|-----|---------|--------|
| `ADR-001-stack-expo-react-native.md` | Usar Expo, React Native e TypeScript como base do app mobile | Aprovado |
| `ADR-002-json-local-no-mvp.md` | Usar JSON local como fonte inicial de mensagens | Aprovado |
| `ADR-003-sem-backend-no-mvp.md` | Manter o MVP sem backend | Aprovado |
| `ADR-004-historico-local-limitado.md` | Persistir histórico local limitado às últimas 10 consultas | Aprovado |
| `ADR-005-compartilhamento-card.md` | Priorizar compartilhamento do card com fallback em texto | Aprovado |

## 13.1 Regra para novos ADRs

Novos ADRs só devem ser criados quando houver uma decisão arquitetural relevante que altere escopo, dependências, estrutura técnica ou estratégia de validação.

Não criar ADR para detalhes triviais de implementação.

---

# 14. Recomendações para o próximo agente

## 14.1 Frontend Mobile Agent

- Scaffold Expo em `app/` seguindo a árvore deste documento.
- Ordem Must do backlog: US-04/05 → US-01/02 → US-06 → US-07 → US-09 → US-12 → US-13. **US-10 é Should, não bloqueia o Must.**
- Spike de share em Android o mais cedo possível após o card mínimo.
- Não introduzir backend, login nem estado global pesado.
- Types + services antes de “frameworkizar”.

## 14.2 UX/UI Agent

- Uma composição: Consultar evidente, card legível, share acessível.
- Identidade mínima (US-12), sem atrasar share (RISK-008).
- Card simples o bastante para captura estável (RISK-001).
- Sem onboarding, settings ou escolha de tom no MVP.

## 14.3 QA Agent

- Checklist centrado no fluxo: abrir → consultar → card → share → histórico → reopen.
- Casos: pool vazio/inválido, 1 mensagem, share cancelado, histórico vazio, 11ª consulta (FIFO).
- Share em **Android real** como bloqueador (RISK-009).
- Offline básico no fluxo de consulta.

## 14.4 Próximo agente a executar

Para o início da execução do EP.05:

1. **Storyteller Agent** — gerar e curar o JSON inicial (≥5 mensagens válidas por tom).
2. **UX/UI Agent** — fechar a composição mínima de Home, card e tema, sem múltiplos templates.
3. **QA Agent** — definir método técnico de evidência para US-09 sem exigir US-10; executar testes apenas quando houver implementação.
4. **Frontend Mobile Agent** — iniciar o scaffold Expo `app/` no Cursor e avançar, de forma incremental, pela cadeia Must. **O scaffold pode iniciar em paralelo às etapas 1–3.** Integrar conteúdo e UX aprovados quando estiverem disponíveis.
5. **PMO / Project Manager Agent** — consolidar evidências reais, atualizar tarefas/status e registrar o diário após os trabalhos.

**DevOps / Build Agent** entra quando houver fluxo mínimo integrável e necessidade de configurar/gerar build interna. A validação efetiva de compartilhamento exige Android físico; a estratégia de QA não substitui esse teste.

Os cinco ADRs da seção 13 **já existem**. O PMO não deve criá-los novamente; deve registrar apenas novas decisões que surgirem da execução.

---

# Resumo executivo

| Tema | Decisão |
|------|---------|
| Forma | App Expo client-only |
| Dados | JSON local + AsyncStorage para histórico local limitado a 10 consultas |
| Núcleo | Consulta rápida + card visual + share nativo |
| Tela Must | `HomeScreen` |
| Histórico visual | `HistoryScreen` somente se US-10 entrar como Should |
| Proibido no MVP | Backend, login, Supabase, IA runtime |
| Sucesso arquitetural | Hipótese testável em build interna Android com fluxo Must estável |

A cadeia técnica Must é:

```text
messages.json
→ message.types.ts
→ messagesService.ts
→ useOracleMessage.ts
→ HomeScreen
→ MessageCard
→ shareService
→ historyService
→ EAS Build
→ QA em Android real
```

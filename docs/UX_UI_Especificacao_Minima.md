# UX/UI — Especificação mínima EP.05

**Produto:** ORÁCULO PAF · **Série:** Do Zero ao Produto / Papo de Gerente  
**Agente:** UX/UI Agent · **Referência:** `app.version = 4.5` · **Data:** 03/11/2026  
**Status:** proposta de especificação para revisão humana e implementação; **não validada em aplicativo ou Android físico**.

## 1. Base de decisão e escopo

**Fontes lidas no Google Drive:** `docs/PROJECT_CONTEXT.md`, `docs/AGENTS.md` (UX/UI), `docs/BACKLOG.md` (US-01/06/12), `docs/ARCHITECTURE.md`, `docs/IMPLEMENTATION_MAP.md`, `docs/TASKS.md` (TASK-US01-01/06-01/12-01), `docs/QA_CHECKLIST.md` e `docs/RISKS.md` (RISK-001/006/008). Também foi conferida a base aprovada de mensagens e o `app.version`.

**Fonte de conteúdo:** `app/src/data/messages.json` (caminho oficial; `app/source/data/messages.json` no pedido é apenas divergência de escrita). São 18 mensagens aprovadas, seis por tom. `msg-009` e `msg-013` têm **59 caracteres medidos cada** — contagem de caracteres Unicode incluindo espaços e pontuação, não um limite de produto. Todas as 18 entradas existentes têm `shareable: true`.

**Decisões já aprovadas e preservadas:** uma Home para as histórias Must; fluxo Abrir → Consultar → Card → Compartilhar; JSON local e sem IA no runtime; histórico persistido de dez consultas (US-09 Must), sem exigir a tela de histórico (US-10 Should); um template de card; compartilhamento nativo com imagem preferencial e fallback em texto.

**Legenda:** **P = decisão proposta pelo UX/UI Agent**, dependente de revisão; **C = condicionado à curadoria/integração**, sem alterar conteúdo por este agente; **T = teste pendente**, não alegar resultado.

## 2. Home: três estados (US-01)

### Estado A — Inicial / pronta para consulta [P]

- Cabeçalho textual: **ORÁCULO PAF**.
- Subtítulo de orientação: **“Uma mensagem para este momento.”**
- Botão primário de largura disponível: **Consultar**. Visível na primeira viewport, sem rolagem.
- Abaixo do botão: texto discreto **“Sua mensagem aparecerá aqui.”**; sem card fictício, sem botão Compartilhar.
- Sem menu, filtros ou navegação obrigatória.

### Estado B — Mensagem exibida [P]

- Manter cabeçalho, subtítulo e **Consultar** na mesma posição lógica (continua permitindo nova consulta).
- Substituir apenas a área de placeholder pelo **MessageCard** contendo a mensagem retornada.
- Apresentar botão secundário **Compartilhar** **fora** da área capturável, imediatamente após o card, somente com uma mensagem atual compartilhável.
- Nova consulta atualiza o card e a referência compartilhada; não cria nova tela.

### Estado C — Falha segura / nenhum registro válido [P]

- Manter marca e contexto da Home.
- Mostrar texto legível: **“Não foi possível carregar as mensagens desta versão.”**
- Deixar **Consultar** desabilitado com estado visual e semântico de indisponibilidade; não mostrar card nem Compartilhar.
- Erro de validação do JSON fica registrado para desenvolvimento; sem crash, tela branca, spinner de rede ou tentativas de rede. Não introduzir retry que repita indefinidamente a leitura do mesmo bundle inválido.

### Wireframe textual (ordem vertical) [P]

```text
┌─────────────────────────────────┐
│ [área segura / respiro]         │
│ ORÁCULO PAF                     │
│ Uma mensagem para este momento. │
│                                 │
│ [       CONSULTAR        ]      │  ← CTA primário
│                                 │
│ Inicial: Sua mensagem ...       │
│      OU                         │
│ ┌─────────────────────────────┐ │
│ │        ORÁCULO PAF          │ │  ← somente após consulta
│ │                             │ │
│ │     Mensagem em destaque    │ │  ← componente capturável
│ │                             │ │
│ └─────────────────────────────┘ │
│ [       Compartilhar      ]     │  ← fora da captura
│      OU                         │
│ Falha: mensagem de erro         │
│ [ Consultar desabilitado ]      │
└─────────────────────────────────┘
```

Na falha, a referência ao CTA desabilitado é o **mesmo botão Consultar** da posição principal: não renderizar dois botões. A Home pode rolar após a consulta em telas pequenas; a exigência de “primeira viewport” aplica-se ao CTA inicial.

## 3. Um único `MessageCard` (US-06) [P]

- **Formato-base:** retrato **4:5**, responsivo; referência de largura `min(larguraDisponível - 48 dp, 360 dp)` e altura derivada de `aspectRatio = 4/5` em condições regulares. Não fixar dimensões em pixels de imagem nem impor altura rígida que corte texto.
- **Exceção de acessibilidade:** com fonte ampliada ou texto que não caiba, permitir expansão vertical do card e rolagem da Home; **não truncar, ocultar, achatar ou reduzir a escala configurada pelo usuário**. Isso mantém um único componente/template, mesmo quando a proporção final varia.
- **Margens da tela:** 24 dp nas laterais; mínimo de 16 dp entre blocos. **Padding interno do card:** 24 dp; em viewport muito estreita, aceitar 20 dp como fallback simples.
- **Estrutura do card capturável:** fundo sólido claro; marca “ORÁCULO PAF” discreta (12 sp, sem competir); mensagem central, cor escura, corpo 26 sp, line-height aproximada de 36 sp, peso regular ou medium do sistema. Sem aspas decorativas, gradientes, imagens, badges, categoria, tom, tags, ações, status ou botões no interior da captura.
- **Alinhamento:** conteúdo centralizado horizontalmente e verticalmente com espaço flexível; leitura integral antes de decoração. Espaçamento entre marca e frase ≥ 24 dp na apresentação regular.
- **Área capturável:** somente a view do card com **fundo, marca e texto**; aplicar a `ref` à view interna estável. Não incluir botão Compartilhar, margens da Home, notificações ou informações de debug. Captura de imagem preferencial via mecanismo compatível com Expo, conforme arquitetura; fallback em texto coordenado pelo `shareService`.
- **Card único para os três tons**; não variar template ou paleta de acordo com `tone` neste MVP. O campo `tone` continua no contrato, mas não exige controle visual nem filtro.
- **Sem comprimento máximo arbitrário:** testar os conteúdos reais, especialmente os dois exemplos de 59 caracteres e as fontes ampliadas. Se o texto for maior no futuro, priorizar crescimento natural do card/área rolável e teste de captura, não truncamento.

**Textos de teste obrigatórios [T]:**

- `msg-009` (mística): “Se uma palavra insistir em aparecer, talvez mereça atenção.” — **59 caracteres medidos**.
- `msg-013` (humorística): “Pedi uma resposta ao universo. Ele mandou um 'visualizado'.” — **59 caracteres medidos**.

Validar ainda uma mensagem poética curta, por exemplo `msg-001`, para assegurar que o template não fique visualmente desequilibrado.

## 4. Tokens mínimos de identidade (US-12) [P]

Os valores seguintes são **defaults propostos para implementação inicial, não uma identidade aprovada**. Apenas um tema visual, sem bibliotecas de fontes ou temas extras.

| Token | Valor proposto | Aplicação |
|---|---|---|
| `colors.background` | `#111827` | Fundo da Home |
| `colors.onBackground` | `#F9FAFB` | Título/legendas principais na Home |
| `colors.muted` | `#CBD5E1` | Texto secundário na Home |
| `colors.primary` | `#5B3CC4` | Fundo do botão Consultar |
| `colors.onPrimary` | `#FFFFFF` | Texto do botão Consultar |
| `colors.card` | `#F9FAFB` | Fundo capturável do card |
| `colors.onCard` | `#111827` | Mensagem e marca do card |
| `colors.outline` | `#CBD5E1` | Contorno do botão secundário |
| `spacing` | `4, 8, 12, 16, 24, 32` dp | Escala única de espaçamento |
| `radius.button` | `12` dp | Botões |
| `radius.card` | `16` dp | Card |
| `sizes.minTouchTarget` | `48` dp | Altura mínima de área tocável |
| `type.family` | **fonte padrão do sistema** | Android/iOS; sem `expo-font` inicialmente |
| `type.title` | `24 sp / 30 sp`, semibold | Marca na Home |
| `type.body` | `16 sp / 24 sp` | Subtítulo, mensagens de estado |
| `type.cardMessage` | `26 sp / 36 sp` | Texto principal dentro do card |
| `type.cardBrand` | `12 sp / 16 sp`, semibold | Marca discreta capturável |
| `type.button` | `16 sp / 22 sp`, semibold | Labels dos botões |

**Contrastes calculados dos pares propostos:** `onBackground/background ≈ 16,98:1`; `muted/background ≈ 11,95:1`; `onPrimary/primary ≈ 7,27:1`; `onCard/card ≈ 16,98:1`. São cálculos das cores hexadecimais, **não testes visuais em Android**. Manter mínimo de 4,5:1 para texto comum e 3:1 para texto grande; conferir estados desabilitados e foco. Evitar opacidade que torne o texto essencial ilegível.

**Botões:** Consultar preenchido e proeminente, altura mínima 52 dp; Compartilhar secundário contornado, altura mínima 48 dp. Ambos com largura disponível; estados pressed/desabilitado de forma nativa e acessível. Não adicionar iconografia apenas para decoração.

## 5. Responsividade, acessibilidade e interação [P/T]

- **Áreas seguras:** respeitar barras de status e navegação do Android; fundo da Home ocupa toda a tela, conteúdo dentro da safe area. Usar `ScrollView` apenas para acomodar expansão sem empurrar ou cortar o CTA da apresentação inicial.
- **Viewport:** iniciar validação em larguras aproximadas de 320, 360 e 412 dp; avaliar orientação permitida e teclado/fonte ampliada onde aplicável. Esses números são **cenários sugeridos de QA**, não suporte já verificado.
- **Fontes:** respeitar dimensionamento de texto do sistema; verificar 100%, 130% e 150% conforme configuração disponível. Não usar `numberOfLines` para cortar a mensagem; manter quebras naturais.
- **Acessibilidade:** ordem de leitura: marca → subtítulo → Consultar → mensagem/card → Compartilhar; nomes acessíveis dos botões em português; mensagem tratada como texto acessível; estado desabilitado comunicado semanticamente; área de toque ≥48 dp.
- **Toque repetido em Consultar:** feedback de pressed imediato; não adicionar delay de suspense. Durante o processamento de **uma** consulta/salvamento, impedir concorrência/reentrância na camada de ação, preservando estado consistente e evitando duplicidade acidental. Não exigir mensagem diferente a cada toque: US-03 é Should.
- **Carregamento local:** JSON embarcado, sem spinner de rede nem indicador de requisição. Se validação falhar ou pool ficar vazio, usar Estado C. Não inventar loading remoto.
- **Compartilhar:** habilitar após mensagem válida e `shareable: true`; a base atual satisfaz esta condição. Se uma versão futura contiver `shareable: false`, **não decidir unilateralmente a semântica**: sinalizar ao PO/Arquitetura; o documento de arquitetura permite exibir e sugere possível fallback em texto. Não bloquear o scaffold por esse caso futuro.
- **Cancelamento do compartilhamento:** fechar sheet nativo e retornar à mesma mensagem, sem toast de sucesso e sem perder card. Se a captura falhar, `shareService` tenta texto; se a operação falhar por completo, mostrar feedback não bloqueante como “Não foi possível compartilhar agora.” e permitir nova tentativa, sem travar Consultar.
- **Histórico:** a persistência de US-09 é responsabilidade de hook/service e não aparece no wireframe. US-10 não é requisito para testar a Home; não desenhar navegação de histórico como Must.

## 6. Rastreabilidade e critérios verificáveis

| Escolha proposta | US / task | Evidência de aceite ainda necessária |
|---|---|---|
| Marca, subtítulo e CTA evidentes na primeira viewport | US-01 / TASK-US01-01 | Observador identifica “Consultar” em até 5 s, sem tutorial; `US01-P02`, `US01-UX01` |
| Home com três estados e falha segura | US-01 / TASK-US01-01; apoio US-04 | Sem tela branca/crash, CTA desabilitado quando pool inválido; teste negativo |
| Card aparece somente após consultar | US-06 / TASK-US06-01 | `US06-P01`, mensagem correta |
| Um template 4:5 preferencial com texto adaptável | US-06 / TASK-US06-01 | `US06-E01`, `US06-E02`, sem cortes em telas menores e fonte ampliada |
| Captura só do card, ação fora | US-06 + US-07 / TASK-US06-01 | Captura sem UI operacional; sheet nativo e fallback verificados em Android real |
| Paleta/tipografia/espaçamentos únicos | US-12 / TASK-US12-01 | `US12-P01`, `US12-N01`; consistência entre Home, botão e card |
| Legibilidade acima de efeitos | US-06 + US-12 / RISK-001/006/008 | Mensagens legíveis sem overflow; nenhuma animação pesada ou biblioteca de polish |
| Sem histórico visual como bloqueador | US-01/06/12 e limite US-09/10 | Nenhuma tela extra para completar fluxo Must |

**Testes ainda pendentes [T]:** `US01-P01/P02/P03/UX01/E02`, `US06-P01/P02/UX01/E01/E02`, `US12-P01/P02/UX01/N01/E01`, `US05-P03/E02` e testes reais de compartilhamento `US07-*`. Ver `docs/QA_CHECKLIST.md` para os critérios formais. Nenhum foi executado por este agente.

## 7. Não implementar no EP.05 / MVP

- Onboarding, login, conta, perfil, tutorial obrigatório ou menu de configurações.
- Filtro/seletor por tom ou categoria, múltiplas telas de consulta ou múltiplos templates de card.
- Temas dinâmicos, assets pesados, vídeos, gradientes complexos, animação pesada, bibliotecas visuais extras ou fontes personalizadas sem justificativa.
- Tela de histórico US-10 **por obrigação** para comprovar US-09; favoritos, feed, reações, métricas avançadas ou rede social.
- Backend, IA generativa em runtime, sincronização e qualquer fluxo que exija conexão para Consultar.

## 8. Handoff para Frontend Mobile Agent (Cursor)

**Arquivos de destino esperados (não criados por este agente):**

- `app/src/screens/HomeScreen.tsx` — compor os três estados, a ordem visual e acessibilidade; consultar via hook, sem ler JSON diretamente.
- `app/src/components/MessageCard.tsx` — somente apresentação do card, sem acesso a dados nem ações; **um único template**.
- `app/src/components/ConsultButton.tsx` e opcional `ShareButton.tsx` — controles simples; não criar biblioteca de componentes.
- `app/src/theme/theme.ts` — tokens da seção 4 como constantes centrais.
- `app/src/data/messages.json` — consumir **sem alterar o conteúdo aprovado**; a base já está no Drive.

**Interface sugerida, não implementação:**

```ts
// MessageCard.tsx — API proposta
// forwardRef<View, MessageCardProps> para captura apenas da view do card
// import type { OracleMessage } from '../types/message.types';
type MessageCardProps = {
  message: OracleMessage;
  testID?: string;
};
```

- `message.text` é a única fonte do texto de destaque. `tone`, `category` e `tags` não geram filtros, badges ou variações de template.
- Receber `message` da `HomeScreen`/hook; `shareService` recebe a `ref` e a mensagem corrente. O componente não importa JSON, não grava AsyncStorage e não abre o compartilhamento.
- `ShareButton` fica **fora** da view capturável. Ao consultar novamente, o share precisa usar o **mesmo objeto de mensagem** atualmente exibido.
- Não acrescentar dependências de design. Bibliotecas de captura e compartilhamento só as já previstas em `ARCHITECTURE.md`, quando necessárias à US-07.
- Scaffold Expo pode começar sem esperar acabamento visual; as decisões [P] são defaults implementáveis que aguardam revisão humana, não um redesenho aprovado da marca.

## 9. Aprovação e registro da execução

**Produzido [documentado]:** estados da Home, wireframe textual, `MessageCard` único, paleta/tokens de referência, comportamento, rastreabilidade e handoff.  
**Condicionado [C]:** revisão humana dos tokens/defaults e eventuais alterações futuras na curadoria. As 18 mensagens existentes já foram aprovadas pelo responsável do produto.  
**Não implementado / não testado [T]:** componentes React Native, captura real, breakpoints reais, TalkBack, fonte ampliada, captura Android, compartilhamento ou pesquisa com usuários.  
**Recomendação para PMO:** marcar TASK-US01-01, TASK-US06-01 e TASK-US12-01 como **especificadas pelo agente / aguardando aprovação**, nunca “implementadas” ou “validadas”; registrar o risco de clipping em acessibilidade e o spike de compartilhamento da US-07.

### HANDOFF EDITORIAL — EP.05

O UX/UI Agent usou backlog, arquitetura, tarefas, QA, riscos e a base real aprovada para produzir uma primeira especificação visual de baixo custo. O principal trade-off é **priorizar leitura e captura confiável** em vez de temas, efeitos ou múltiplos layouts. O ponto ainda sujeito a julgamento humano é a paleta e o tamanho de apresentação; o ponto ainda sujeito à evidência técnica é a captura/compartilhamento em Android físico. **Nenhuma tela foi implementada ou testada nesta execução.**

# ADR-005 — Compartilhamento de card com fallback para texto

## Status

Aprovada.

## Data

2026-07-30

## Contexto

A hipótese principal do ORÁCULO PAF depende do compartilhamento.

O usuário precisa se identificar com a mensagem a ponto de querer compartilhar o card em redes sociais ou aplicativos de mensagem.

Por isso, o compartilhamento não é uma funcionalidade periférica. Ele é parte central do MVP.

## Decisão

Implementar compartilhamento de card usando abordagem simples e validável em dispositivo real.

Estratégia inicial:

1. renderizar a mensagem em um componente de card;
2. capturar o card como imagem, se tecnicamente viável;
3. compartilhar usando o compartilhamento nativo do dispositivo;
4. se a captura da imagem apresentar instabilidade, usar fallback de compartilhamento em texto.

## Justificativa

O compartilhamento precisa ser validado cedo porque é o principal sinal de identificação com a experiência.

Captura de imagem pode variar entre simulador, Android real, iOS e aplicativos de destino. Portanto, o MVP não deve depender de uma solução visual sofisticada antes de provar que o fluxo funciona.

## Consequências positivas

- valida cedo a parte mais crítica da hipótese;
- reduz risco de descobrir problemas de share tarde demais;
- mantém experiência alinhada ao comportamento real do usuário;
- permite evolução visual posterior;
- fallback reduz risco de bloqueio.

## Consequências negativas

- captura de imagem pode exigir dependência adicional;
- qualidade visual inicial pode ser simples;
- alguns destinos de compartilhamento podem se comportar de forma diferente;
- fallback de texto não valida completamente o card visual.

## Mitigações

- testar em Android real cedo;
- começar com card simples;
- evitar múltiplos templates no MVP;
- priorizar legibilidade;
- manter fallback em texto;
- registrar falhas para o QA Agent.

## Alternativas consideradas

### Compartilhar apenas texto

Pode ser usado como fallback, mas não é a experiência ideal do MVP.

### Compartilhar imagem sofisticada desde o início

Descartado porque pode atrasar validação e aumentar risco técnico.

### Gerar PDF ou imagem server-side

Descartado por exigir complexidade desnecessária e possivelmente backend.

## Relação com documentos

- `docs/PROJECT_CONTEXT.md`
- `docs/BACKLOG.md`
- `docs/ARCHITECTURE.md`
- `docs/RISKS.md`
- `docs/DECISIONS.md`

## Observação

O primeiro objetivo não é ter o card mais bonito possível.  
O primeiro objetivo é validar que o card pode ser compartilhado de forma estável.

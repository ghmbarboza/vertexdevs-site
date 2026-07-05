# Vertex — Playbook de CRM ponta a ponta

> v1.0 · 2026-07-05 · Sessão A (estratégia). Do primeiro contato ao fechamento e à recorrência. Também é o spec de operação da plataforma interna (implementação = Sessão B). Deriva de STRATEGY.md.

## Filosofia (boutique high-ticket, não volume)
Poucos leads, alto valor. **Velocidade + personalização batem automação de volume.** A IA garante resposta instantânea e qualificação; o fundador entra nos momentos humanos (Cartografia, proposta, fechamento). **Nenhum lead qualificado esfria. Nenhum lead órfão** (todo lead tem próxima ação + data).

North star operacional: **consultas qualificadas/semana**. North star financeira: **receita contratada** (rampa jul 50k → dez 1M).

---

## O ciclo de vida do lead (as etapas do pipe)

| # | Etapa | Entra quando | Sai quando | Prob. | Dono |
|---|-------|--------------|------------|-------|------|
| 0 | **Nova consulta** | lead chega (site /consulta ou /cartografia, DM, outbound, indicação) | primeira resposta enviada | 5% | IA |
| 1 | **Qualificado** | passou nos 4 Sinais | Cartografia agendada | 20% | IA→Fundador |
| 2 | **Cartografia agendada** | call de descoberta marcada | Cartografia paga (T1) fechada | 40% | Fundador |
| 3 | **Cartografia em andamento** | T1 pago (R$7,5k), 2 semanas | blueprint entregue | 70% | Fundador |
| 4 | **Proposta** | proposta do sistema (T2) enviada | aceite ou recusa | 60% | Fundador |
| 5 | **Fechado — Sistema** | T2 assinado (~R$35k) | projeto entregue | 100% | — |
| 6 | **Operação** | T3 recorrente (R$2,5k/mês) | — | — | — |
| — | **Nutrição** | não-agora, mas fit | reengajou | — | IA |
| — | **Perdido** | recusa / não-fit (com motivo) | — | 0% | — |

---

## 1. Atendimento — a primeira resposta (o momento que mais converte)
**SLA: < 5 minutos, 24/7.** (Lead respondido em 5min converte ~10× mais que em 30min.) Quem faz: **atendente IA**.

**Postura da IA** (tom maison, nunca vendedor afobado):
- Confirma o recebimento com elegância e nome da pessoa.
- Faz 2–3 perguntas de qualificação de forma conversacional (não questionário).
- Oferece o próximo passo natural: a conversa de Cartografia.
- **Escala lead quente** pro fundador na hora (notificação) — humano assume em < 24h.

**Roteiro-base da IA (primeiro toque):**
> "Obrigado por procurar a Vertex, [nome]. Trabalhamos com poucos projetos por vez, então gosto de entender antes se faz sentido. Me conta: o que na sua operação hoje mais consome tempo ou dinheiro? E você é quem decide sobre esse tipo de projeto?"

**Captura obrigatória** (todo lead): nome, empresa, WhatsApp, origem (canal), dor declarada, score dos 4 Sinais.

## 2. Qualificação — os 4 Sinais (framework próprio)
Não é BANT genérico. Para estúdio boutique, o que importa:

| Sinal | Pergunta que revela | Vale |
|-------|---------------------|------|
| **Operação real** | "Como funciona sua operação hoje?" — tem negócio/processo real, não ideia/hobby | 1 |
| **Dor nomeável** | "O que mais consome tempo ou dinheiro?" — articula dor específica e custosa | 1 |
| **Poder de decisão** | "Você decide sobre esse tipo de projeto?" — é ou acessa o decisor | 1 |
| **Horizonte de investimento** | reage bem a ser um trabalho pago (não busca de graça) | 1 |

- **4/4 = quente** → escala pro fundador, call em < 24h.
- **2–3 = morno** → conduz pra Cartografia; se hesitar, entra em nutrição.
- **0–1 = frio/não-fit** → arquiva com gentileza + oferece a newsletter (não descarta, semeia).

## 3. Pipeline — regras de movimento
- **Todo lead tem próxima ação + data.** Sem isso, ele aparece vermelho no painel (lead órfão = falha de processo).
- Avança só com **critério de saída cumprido** (coluna acima), nunca por otimismo.
- **Cadência de follow-up por etapa** (a IA lembra/dispara):
  - Nova consulta sem resposta do lead: toque em +1h, +1 dia, +3 dias → depois nutrição.
  - Qualificado sem agendar: +2 dias, +5 dias → nutrição.
  - Proposta enviada: +48h, +5 dias, +10 dias → depois "porta aberta" (nutrição). **Nunca mais de 3 toques sem decisão** — maison não persegue.

## 4. Nutrição — o lead que não é "agora"
Objetivo: manter calor sem queimar. **Valor primeiro, pedido leve.** Nunca "oi, fechou?".
- **WhatsApp**: toque pontual e útil — um case relevante, um insight sobre a dor dele. Cadência: dia 3, 10, 21, 45, depois mensal.
- **E-mail / Diário do Estúdio**: ensaio quinzenal (autoridade, não venda).
- **Retarget (Pixel)**: entra no público que vê o carrossel de consulta.
- **Gatilho de volta ao ativo**: qualquer resposta/engajamento → re-qualifica e reabre o pipe.

## 5. Fechamento — a Cartografia É a venda
Não se vende R$35k a frio. Vende-se o **diagnóstico de R$7,5k**, entrega-se valor absurdo, e a proposta do sistema **se escreve sozinha**.
1. **Call de descoberta** (grátis, 30–45min): entender a operação, confirmar fit, apresentar a Cartografia.
2. **Cartografia paga** (T1, 2 semanas): imersão → mapa → diagnóstico → blueprint.
3. **Apresentação do blueprint + proposta do sistema** (T2) na mesma reunião — o cliente já viu o valor.
4. **Reversão de risco**: o valor da Cartografia é abatido do projeto. O mapa é dele de qualquer forma.
5. **Cadência de proposta**: 48h, 5d, 10d. Fechou → Operação (T3) ofertada sem lock-in. Não fechou → nutrição, porta aberta.

## 6. Automação × humano (quem faz o quê)
- **IA (atendente)**: resposta < 5min, qualificação (4 Sinais), agendamento, sequências de nutrição, lembretes de follow-up, captura de dados/origem, escala de quente.
- **Fundador**: call de descoberta, Cartografia, proposta, fechamento, relacionamento. A assinatura humana onde o cheque é grande.

## 7. Rituais e SLAs
- 1ª resposta **< 5 min** (IA) · call de quente **< 24h** (fundador).
- **Diário**: fundador limpa DMs quentes + aprova próximos passos.
- **Sexta (semanal)**: revisão de pipe — scorecard por etapa e por canal, leads travados, forecast do mês vs rampa.
- **Mensal**: contratado vs meta; se 2 meses < 80%, muda o mix de canal (não a meta).

## 8. Metas de conversão por etapa (para calibrar o funil do R$1M)
| Transição | Meta |
|-----------|------|
| Consulta → Qualificado | ~50% |
| Qualificado → Cartografia agendada | ~40% |
| Cartografia agendada → paga (T1) | ~70% |
| Cartografia → Proposta (T2) | ~90% |
| Proposta → Fechado (T2) | ~50% |
| **Consulta → Sistema (ponta a ponta)** | ~6–8% |

Com ~140 consultas no semestre → ~10–11 sistemas diretos + Cartografias que compõem + T3 recorrente = trilho do R$1M (ver STRATEGY.md §1).

## 9. Dados que o CRM precisa registrar (para tudo acima funcionar)
`origem` (rede/linkedin/outbound/instagram/ads/site-consulta/site-cartografia) · `score_4sinais` · `etapa` · `valor` (T1 7,5k / T2 ~35k / T3 2,5k-mês) · `proxima_acao` + `data` · `motivo_perda`. **Atribuição de origem em TODO lead — sem isso, não sabemos qual canal paga.**

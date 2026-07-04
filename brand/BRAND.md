# Vertex — Kit de Marca

> Versão 1.0 · 2026-07-04 · Fonte da verdade para toda comunicação da Vertex: site, Instagram, propostas, artes e prompts de imagem.

---

## 1. Essência

**Vertex é uma casa de alta engenharia de software & IA.**
Pensa como estrategista, constrói como engenheiro. Poucos projetos por vez, todos sob medida, todos em produção.

- **Tagline:** Engenharia no seu ponto mais alto.
- **Tese:** Estratégia e código são um único movimento.
- **Manifesto:** Poucos projetos por vez. Cada um, uma peça única.
- **Prova:** Mais de 300 projetos sob medida · operações em 2 países · 100% de handoff.

## 2. Tom de voz

Escrevemos como uma maison: sóbrio, declarativo, seguro. A grandiosidade vem da precisão, nunca do exagero.

**Regras:**
1. Frases curtas, declarativas. Ponto final é um instrumento.
2. Vocabulário de ateliê: *peça, coleção, lapidação, cartografia, consulta privada, sob medida, acabamento*.
3. Nunca fixar nome de produto ("Agente CFO"). Falar de **capacidades no plural**: "Construímos agentes financeiros conversacionais…"
4. Prova concreta como lastro, não como vitrine: "Já orquestramos dezesseis integrações num único agente."
5. Sem metáfora literal de relojoaria em headlines principais — o luxo está no *como*, não no *sobre o quê*. (Referências sutis em textos internos são aceitáveis.)
6. Emojis: no máximo um por peça de conteúdo, e apenas quando discreto (⚡ ◆). Nunca em títulos.
7. Hashtags: máximo 3, sempre no fim, nunca genéricas demais. `#VertexDevs` + 2 contextuais.
8. Jamais: "🚀 GARANTA JÁ", promessas percentuais inventadas, urgência artificial, "revolucionário".

**Antes/depois:**
- ❌ "Somos especialistas em IA! Automatize tudo 🚀"
- ✅ "IA onde há julgamento, código determinístico onde há regra."

## 3. Identidade visual

### Paleta
| Papel | Valor | Uso |
|---|---|---|
| Preto OLED | `oklch(7.5% 0.012 264)` ≈ `#0A0B10` | fundo dominante |
| Superfície | `oklch(14% 0.02 260)` ≈ `#171922` | cards |
| Platina | `oklch(88% 0.008 250)` ≈ `#D9DBE1` | títulos, botões primários |
| Safira | `oklch(58% 0.16 255)` ≈ `#3D6EDB` | acento principal, gradientes de ênfase |
| Ouro champagne | `oklch(80% 0.08 85)` ≈ `#D9BE8C` | hairlines, labels, numeração — SEMPRE em dose mínima |
| Cinza texto | `oklch(66% 0.015 252)` ≈ `#9BA0AD` | corpo de texto |

### Tipografia
- **Display:** Cormorant Garamond (400/500, itálica para ênfase) — títulos, números grandes.
- **Labels/corpo:** Inter (400/500) — labels em CAPS com tracking 0.3–0.5em.
- Ênfase em headlines: palavra-chave em *itálica serif* com gradiente platina→safira.

### Elementos
- Guilhochê: anéis concêntricos finos, opacidade baixa, atrás de heros.
- Hairline dourada (1px, gradiente para transparente) sob títulos de seção.
- Numeração de maison: `№ 01`, algarismos romanos (I, II, III) em serif itálica.
- Grain/ruído fino sobre tudo (opacidade ~3%).
- Fotografia/arte: sempre a série "mecanismo de precisão" (ver §5).

## 4. Instagram (@vertex.devs)

**Nome:** Vertex — Engenharia & IA
**Bio oficial** (a bio é a fachada do ateliê — afirma, não explica; o site responde):
```
Alta engenharia de software & IA.
Cada sistema, uma peça única.
Consultas privadas ↓
```
**Link:** https://vertexdevs.org · **Categoria:** Empresa de tecnologia da informação

**Estrutura de legenda (fórmula maison):**
1. **Tese** — uma frase declarativa forte, sozinha na primeira linha.
2. **Desenvolvimento** — 1–2 parágrafos curtos; capacidade no plural + prova concreta.
3. **Fecho** — frase-manifesto ou convite sóbrio ("As consultas são privadas.").
4. Até 3 hashtags.

**Exemplo:**
```
Engenharia não é commodity.

Construímos agentes que atendem por voz em tempo real — qualificação,
agendamento e follow-up, do primeiro toque ao registro no CRM. Mais de
sessenta funções em nuvem num único sistema, em dois continentes.

Poucos projetos por vez. Cada um, uma peça única.

#VertexDevs #EngenhariaDeSoftware #IA
```

## 5. Prompt-base gpt-image-2

Toda arte da Vertex sai deste template. Variar apenas o `[TEMA]`; o estilo é fixo.

```
[TEMA — descrever a capacidade como mecanismo abstrato, ex.: "Abstract vision
of real-time AI voice: flowing audio waveforms rendered as engraved metal
filaments converging into a jeweled receiver."]

Macro photography of an abstract precision mechanism, haute horlogerie and
high jewelry aesthetic, deep pure black background, sapphire blue luminous
accents, platinum and subtle champagne gold metallic details, extreme fine
detail like a luxury watch movement, cinematic lighting, elegant, no text,
no letters, no numbers. Consistent visual series.
```

- **Tamanhos:** 1536×1024 (feed/site), 1024×1024 (quadrado), 1024×1536 (stories).
- **Qualidade:** `high`. **Regra de ouro:** nada de texto dentro da imagem; sem pessoas; sem UI literal de dashboard — sempre o mecanismo abstrato.
- Para arte com o logo: usar `/v1/images/edits` com `assets/vertex-logo.png` como referência e instruir "use this exact logo as the centerpiece, unchanged".

## 6. Ativos

| Ativo | Caminho |
|---|---|
| Logo master (800px) | `assets/vertex-logo.png` |
| Favicons squircle (32/64/180) | `assets/favicon-{32,64,180}.png` |
| Apple touch icon | `assets/apple-touch-icon.png` |
| OG image | `assets/og-image.jpg` |
| Série de artes (10) | `assets/cases/*.jpg` |

## 7. Aplicação rápida (checklist)

- [ ] Headline tem no máximo 6 palavras e uma ênfase em itálica serif?
- [ ] O ouro está em dose mínima (hairlines/labels), nunca em blocos?
- [ ] A capacidade está no plural, sem nome fixo de produto?
- [ ] Existe uma prova concreta ("já orquestramos…")?
- [ ] Zero urgência artificial, zero emoji em título, ≤3 hashtags?
- [ ] A arte segue o prompt-base §5?

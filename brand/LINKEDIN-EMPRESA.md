# LinkedIn da Vertex Devs — Estratégia da Página (v1, 21/07/2026)

Página: `linkedin.com/company/vertex-devs` (URN 136164237). Estado no diagnóstico: 1 seguidor, 0 posts, About já no tom maison, sem banner definido, sem funcionários vinculados visíveis.

## A tese: vitrine primeiro, canal depois

Página de empresa no LinkedIn tem alcance orgânico ruim por natureza; ninguém constrói audiência ali. Mas ela tem um papel que o perfil pessoal não cobre: **é a página que o prospect visita antes de responder o convite, aceitar a Cartografia ou assinar a proposta.** Hoje essa visita encontra 1 seguidor e nenhum post, o que desfaz em 10 segundos a autoridade que o resto do funil constrói.

Divisão editorial permanente:

| Superfície | Voz | Conteúdo |
|---|---|---|
| Perfil do Guilherme | eu | TESE: opinião, visão, engenharia em 1ª pessoa |
| Página Vertex Devs | nós | PROVA: cases, produto rodando, método, números |

A página nunca opina; ela demonstra. O perfil nunca vende; ele pensa. Quem quiser o produto atravessa de um pro outro.

## Fase 0 — Vitrine (esta semana)

1. **Tagline** (campo slogan): `Alta engenharia de software & IA para operações que não podem errar.`
2. **Banner 1128x191**: preto OLED `#0A0B10`, vértice safira `#3D6EDB` à esquerda, tagline em Georgia itálico, hairline champagne `#D9BE8C`. Gerar com o pipeline chrome-headless-shell do kit (ver BRAND.md e memória do motor de conteúdo).
3. **Botão da página**: "Visitar site" → vertexdevs.org.
4. **Funcionários**: Guilherme e o sócio com cargo atual na Vertex Devs (2 perfis vinculados; página com funcionários visíveis passa em due diligence).
5. **3 posts de fundação** (textos prontos abaixo; publicar via Zernio na conta org após aprovação, 1 por dia).
6. **Convites pra seguir**: a página tem crédito mensal de convites (~250). Convidar TODAS as conexões atuais do Guilherme e, daqui pra frente, cada aceite novo da rotina diária. É o único mecanismo de crescimento de página que funciona de graça.

## Fase 1 — Rotina (contínua, plugada no que já existe)

- **Cadência: 1 a 2 posts/semana na página**, agendados via Zernio (accountId org `6a49b5ac9d9472faae7d1a70`). Fontes, em ordem: (a) case de entrega real, (b) produto em mockup floating estilo ateliê (Ápex, telas reais), (c) port institucional de post pessoal que performou (adaptar eu→nós), (d) método (Cartografia, doutrina de engenharia).
- **Toda entrega de projeto fechada no CRM gera um case** na página (com número e screenshot tratado no template "prova"). Sem case no ar, o projeto não acabou.
- **Repost dos sócios**: todo post da página recebe repost/comentário do Guilherme e do sócio nas primeiras 2 horas (é o que fura o teto de alcance de página).
- **Cross-post IG**: post da página adaptado pro @vertex.devs (mesma voz "nós", arte 1080x1350), mesma chamada REST/MCP trocando o accountId.
- **Sexta-feira**: convidar os aceites da semana pra seguir a página (teto 25/semana pra não queimar o crédito mensal de uma vez).
- **Aprovação**: regra de ouro inalterada. TODO post da página passa pelo Guilherme antes (fila de conteúdo/artifact). A automação prepara; não publica sozinha.

## Métricas (rever no 1º dia útil do mês)

- Seguidores da página: meta 100 em 60 dias, 300 em 6 meses.
- Visitantes da página/semana (Analytics da página; escopo `r_organization_followers` já concedido no Zernio).
- A única que paga: consultas qualificadas que citam ter visto a página/case.

## Mecânica técnica (pronta, verificada em 21/07)

- Zernio conta Vertex Devs: token healthy até 09/09, `canPost: true`, escopos org completos (`w_organization_social`, admin, analytics). Publicar via MCP `zernio-vertex` (`posts_create`) ou REST (`POST /api/v1/posts`, Bearer `sk_e5f30...` do cofre) com `platforms:[{platform:"linkedin", accountId:"6a49b5ac9d9472faae7d1a70"}]`.
- Imagem: `POST /api/v1/media/upload-direct` → usar a URL retornada.
- Agendar: `scheduledFor` + `timezone: America/Sao_Paulo`.
- Cards/banner: pipeline HTML→PNG via chrome-headless-shell (BRAND.md; templates de ouro no scratchpad da sessão do motor de conteúdo).

## Posts de fundação (prontos pra aprovação)

**#1 Manifesto**
> A Vertex nasceu de uma convicção simples: software para operação que não pode errar se constrói com engenharia, não com pressa.
>
> Somos uma casa de alta engenharia de software e IA. Sistemas sob medida que nascem de análise estratégica de processos: primeiro a cartografia da operação, depois o código. IA onde há gargalo, código determinístico onde há regra, e nenhuma linha antes de entender o processo.
>
> Agentes de IA, automações críticas e produtos completos, do conceito ao deploy. Menos projetos, mais profundidade.

**#2 Prova (CRM hands-off / Ápex)**
> Construímos um CRM onde a IA não sugere. Age.
>
> O agente opera por ferramentas estruturadas: move etapa, prioriza lead, grava a próxima ação, com o rigor de uma API interna. Onde há regra, código determinístico. Onde há julgamento, o modelo. Falha sempre visível, ação reversível por padrão.
>
> Na prática: o dono não abre o CRM pra ver o pipeline. Pergunta o foco do dia e recebe os cinco negócios que importam, com os órfãos já resolvidos.
>
> Foi construído para a nossa própria operação comercial. É a régua do que entregamos sob medida.
>
> (arte: mockup floating do Ápex, template "prova")

**#3 Método (Cartografia)**
> Todo projeto da Vertex começa sem escrever código. Começa com a Cartografia: duas semanas mapeando a operação de verdade, onde o valor anda e onde ele vaza.
>
> O resultado é um diagnóstico com arquitetura, prioridades e números, que vale por si só. Só depois dele decidimos, junto com o cliente, o que merece virar sistema.
>
> Por que nessa ordem? Porque os dados são teimosos: a maioria dos pilotos de IA que falham não erra o modelo, erra o processo. Automatizar o caos só entrega caos mais rápido.

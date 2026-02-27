# Tasks — PostHog Clone

## Status
- [ ] = pendente
- [x] = concluído
- [~] = em progresso

---

## Fase 1 — Setup ✅

- [x] Scaffold: `pnpm create next-app@latest` com TypeScript + Tailwind + App Router
- [x] Next.js 16.1.6 + React 19 + Tailwind CSS 4.2.1 + TypeScript 5.9.3
- [x] Instalar `lucide-react`
- [x] Estrutura de pastas: `components/os/`, `components/sections/`, `components/ui/`, `lib/`

**Nota:** Tailwind 4 não usa `tailwind.config.ts` — design tokens ficam em `app/globals.css` via `@theme {}`

---

## Fase 2 — OS Shell ✅

- [x] `components/os/Desktop.tsx` — background cream + container
- [x] `components/os/MenuBar.tsx` — barra macOS com logo + nav + botões
- [x] `components/os/AppWindow.tsx` — janela com chrome (3 círculos + título)
- [x] Integrado em `app/layout.tsx` com IBM Plex Sans via `next/font/google`

---

## Fase 3 — Homepage `/` ✅

- [x] `components/sections/Hero.tsx` — headline, CTAs, hedgehog Max SVG, badge YC
- [x] `components/sections/Products.tsx` — grid 6 produtos com ícones Lucide
- [x] `components/sections/Footer.tsx` — links por categoria + social + copyright
- [x] `app/page.tsx` — homepage montada

---

## Fase 4 — Pricing `/pricing` ✅

- [x] `app/pricing/page.tsx` — 4 planos (Free, Boost, Scale, Enterprise)
- [x] Cards com features, CTA, destaque "Most popular" no Scale
- [x] FAQ teaser com links para docs e community

---

## Fase 5 — UI Components ✅

- [x] `components/ui/Button.tsx` — variants: primary (orange), outline, ghost
- [x] `components/ui/Logo.tsx` — SVG do hedgehog + texto "PostHog"

---

## Fase 6 — Assets

- [ ] Adicionar SVG do hedgehog Max em `public/images/hedgehog/` (atualmente inline no Hero)
- [ ] Favicon PostHog personalizado

---

## Fase 7 — Verificação ✅

- [x] `pnpm build` — build limpo, zero erros TypeScript
- [x] Rotas geradas: `/` e `/pricing` (static)
- [ ] Visual comparado lado a lado com posthog.com no browser
- [ ] Testar em mobile 375px e desktop 1440px

---

---

## Fase 8 — Portfolio v2 + OS Polishing ✅

- [x] Transformar de PostHog clone → portfólio do Lucas Rubo
- [x] MenuBar com branding LR (logo LR + nav + GitHub/LinkedIn/Hire me)
- [x] Animação spring de abertura de janela (scale 0.88→1 + opacity)
- [x] Janelas abertas centradas na tela (calcCenter no WindowContext)
- [x] Taskbar no rodapé (lista de tabs abertas: emoji + título + close)
- [x] DesktopIcons atualizados para portfólio (about.mdx, projects/, etc.)
- [x] AboutApp · ProjectsApp · SkillsApp · ExperienceApp · ContactApp
- [x] RoteirumApp · ERPApp (detalhe de cada projeto)

## Próximos passos (V3)

- [ ] Animação de fechamento (scale out + fade)
- [ ] Minimizar com animação (janela "cai" para Taskbar)
- [ ] Isometric illustration no desktop (estilo PostHog)
- [ ] Mobile fallback (< 768px mostra versão simplificada)
- [ ] Foto real no AboutApp (substituir avatar LR)
- [ ] Internacionalização PT/EN
- [ ] Deploy na Vercel (vercel.com)

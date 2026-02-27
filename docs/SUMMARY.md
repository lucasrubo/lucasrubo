# Summary — PostHog Clone

## O que foi decidido

Clonar o site marketing do **PostHog.com** em **Next.js 14 (App Router)**, com fidelidade visual ao design original.

## Por que esse projeto existe

O usuário achou o design do PostHog.com impressionante — em especial a ideia de um site que parece um **sistema operacional de desktop** (OS-like interface), com janelas arrastáveis, barra de menu estilo macOS e ícones de apps. O objetivo é replicar esse conceito fielmente para estudo/portfólio.

## O que o PostHog.com é

PostHog é uma plataforma open-source de product analytics. O site original usa:
- **Gatsby** + TypeScript + Tailwind CSS + MDX
- Hospedado na Vercel
- Design "OS-like": janelas (AppWindow), barra macOS (MenuBar), desktop com background

## Decisões técnicas tomadas

| Decisão | Escolha | Motivo |
|---------|---------|--------|
| Framework | Next.js 14 (App Router) | Pedido do usuário |
| Estilo | Tailwind CSS 3 | Mesma stack do original |
| Fontes | IBM Plex Sans + Source Code Pro | Fontes usadas pelo PostHog |
| Package manager | pnpm | Mesmo do original |
| Ícones | Lucide React | Moderno, leve |
| Deploy | Vercel | Melhor integração com Next.js |

## Escopo definido

- **Só o site/landing page** (sem backend de analytics)
- **Cópia fiel** do PostHog (mesmo branding, para estudo)
- Páginas: Homepage (`/`) e Pricing (`/pricing`)

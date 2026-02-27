# Memory — Lucas Rubo Portfolio OS

## Projeto
**Portfolio do Lucas Gabriel Rubo** como um OS simulado (desktop OS-like), inspirado visualmente no PostHog.com.

## Dono
- **Nome:** Lucas Gabriel Rubo · Valinhos, SP, Brasil
- **Cargo:** Mid-level Development Analyst @ Areco
- **Email:** lucasrubo1@gmail.com | **Tel:** +55 (19) 9940-1980
- **GitHub:** github.com/lucasrubo | **LinkedIn:** linkedin.com/in/lucas-rubo | **IG:** instagram.com/lucas.rubo
- **Portfolio v1:** https://lucasrubo.github.io/lucasrubo/

## Stack
- **Next.js 16.1.6** (App Router) + React 19 + TypeScript 5.9.3
- **Tailwind CSS 4.2.1** — tokens via `@theme {}` em `app/globals.css` (sem tailwind.config.ts!)
- lucide-react · IBM Plex Sans + Source Code Pro via `next/font/google`
- pnpm · `pnpm dev` (3000) · `pnpm build`

## Estrutura de arquivos
```
contexts/WindowContext.tsx   ← estado: open/close/min/max/focus/drag + calcCenter
components/os/
  Desktop.tsx     ← fundo sandy + ícones esq/dir + janelas + Taskbar
  MenuBar.tsx     ← LR logo + nav + GitHub/LinkedIn + "Hire me" (ph-orange)
  AppWindow.tsx   ← drag por titlebar + animação spring + toolbar editor
  DesktopIcon.tsx ← ícones macOS (mdx, folder, mov, app, trash)
  Taskbar.tsx     ← tabs no rodapé (emoji + título + close)
components/apps/
  AboutApp        projects/   skills/    experience/  contact/
  RoteirumApp     ERPApp       SignupApp
lib/desktopIcons.ts   ← LEFT_ICONS + RIGHT_ICONS
```

## Design
| Token | Valor |
|-------|-------|
| ph-orange | #f54e00 |
| ph-dark | #1d1b17 |
| Desktop bg | #c8b89a + SVG fractalNoise |
| MenuBar | #1a1815 |
| Taskbar | #111009 |

## Animação de janela
- Mount: opacity 0 → 1 + scale 0.88 → 1
- Timing: 280ms `cubic-bezier(0.34, 1.56, 0.64, 1)` (spring leve)
- Posição padrão: **centrada na tela** com cascade +28px por janela aberta

## Desktop icons
- **Esquerda:** about.mdx · projects/ · skills.txt · experience.mdx · contact.mdx · Roteirum.app · ERP.app · larissa-portfolio
- **Direita:** GitHub (nova aba) · LinkedIn (nova aba) · resume.pdf · Trash

## Projetos do portfólio
| App | Projeto | Demo |
|-----|---------|------|
| roteirum | Roteirum (social cinematográfica + AI) | lucasrubo.github.io/Roteirum/ |
| erp | ERP Multi-Empresa (dashboard admin) | lucasrubo.github.io/ERP/dashboard |
| larissa | Larissa Arendt Portfolio | — |

## Skills top (por nível)
C# 90% · Tailwind 90% · Blazor 85% · Next.js 85% · React 80% · TS 80% · PHP 80% · SQL 80%

## Experiência
Areco (2024–atual) · Areco (2023) · IBM (2021–22) · NB41 (2019–21)

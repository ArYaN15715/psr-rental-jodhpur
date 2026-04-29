# Design Brief — PSR Rental

## Purpose & Context
High-speed rental property network for Jodhpur — conversion-focused platform generating instant WhatsApp and phone inquiries through trust signals, speed cues, and energetic interaction.

## Tone & Aesthetic
Fast, energetic, trustworthy, modern. App-like interface — not static website. Bold use of deep blue foundation with bright accent highlights. Clean, minimal card system with subtle depth and motion.

## Color Palette

| Token | OKLCH | Semantic | Usage |
| --- | --- | --- | --- |
| Primary | 0.25 0.08 263 | Deep Blue | Primary actions, headers, text hierarchy |
| Accent | 0.68 0.17 258 | Bright Blue | CTAs, active states, highlights, trust elements |
| Background | 1.0 0 0 | White | Main surface |
| Card | 0.97 0.01 240 | Light Grey | Elevated content surface |
| Border | 0.92 0.01 240 | Grey | Subtle dividers, input borders |
| Muted | 0.88 0.02 250 | Pale Grey | Secondary text, disabled states |
| Destructive | 0.58 0.19 15 | Red | Errors, warnings |

## Typography
**Display:** General Sans (bold, 56–28px) — headings, hero text  
**Body:** General Sans (regular, 16px) — body copy, interface labels  
**Mono:** JetBrains Mono (14px) — reference, codes, timestamps  
Type scale: XL/56px, L/40px, M/28px, Base/16px, Small/14px

## Shape Language
Border radius: 14px (cards, buttons), 8px (small controls), 0 (utility). Spacing density: 16px base unit. Shadows: subtle (0.08 primary) → elevated (0.15 primary). Motion: smooth cubic-bezier(0.4, 0, 0.2, 1), 0.3s default.

## Structural Zones

| Zone | Background | Border | Shadows | Notes |
| --- | --- | --- | --- | --- |
| Header/Nav | Primary (0.25 0.08 263) | None | Elevated | Deep blue foundation, white text, sticky |
| Hero | Primary gradient | None | Elevated | Gradient overlay, animated trust strip |
| Content | Background (1.0 0 0) | Border grey | Subtle | Clean white surface |
| Cards | Card (0.97 0.01 240) | Border grey | Subtle → Elevated on hover | Lift effect on interaction |
| CTA Section | Primary gradient | None | Elevated | Dark gradient, high contrast white text |
| Footer | Sidebar (0.17 0.02 265) | Border grey | None | Dark blue, white text |

## Component Patterns
**Buttons:** Primary (deep blue bg, white text), Secondary (light grey bg, blue text), Accent (bright blue bg, white text). Hover: lift + shadow-elevated + scale(1.02).  
**Cards:** Light grey bg, subtle border, hover lift effect (translateY -4px, shadow-elevated).  
**Tabs:** Accent underline on active, smooth transition-smooth.  
**Inputs:** Light grey border, focus ring with accent color, 12px radius.  
**Trust Indicators:** Icon + metric, animated counter on scroll, icon color accent-blue.

## Motion & Micro-interactions
**Entrance:** slide-up 0.3s (hero text, cards on scroll)  
**Hover:** card-lift (translateY -4px), button scale(1.02) + shadow-elevated  
**Focus:** accent ring glow (cta-pulse animation)  
**Transitions:** All 0.3s ease-out (smooth, never janky)  
**Disabled:** opacity 0.5, no hover effects

## Key Differentiator
Energetic CTA pulse animation on primary actions. Bright accent blue dominates CTAs and trust badges. Speed cues: "Available Now" badges, animated counters, instant WhatsApp/call buttons. Card system feels like native app, not web.

## Constraints
- No heavy animations or lag (max 0.3s transitions)
- Always accent on CTAs (no grey submit buttons)
- Card lift on hover across all interactive surfaces
- Trust indicators animated and visually prominent
- Mobile-first (tap targets ≥48px)
- High contrast text on all backgrounds (AA+)

## Signature Detail
Bright blue (#1DA1F2) CTA button with pulse glow animation on primary hero section. Creates sense of urgency + availability. Combined with trust strip (rating + client count + speed badge), signals speed and reliability instantly.

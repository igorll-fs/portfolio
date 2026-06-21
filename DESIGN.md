# DESIGN.md — Igor Luiz Portfolio

## Theme
Dark. Premium tech aesthetic. Developer working late with a glowing screen in a dim room. Gold accents provide warmth against the void.

## Color Palette
| Role | OKLCH | Hex |
|------|-------|-----|
| Background | oklch(0.13 0.005 250) | #0a0a0c |
| Surface | oklch(0.16 0.005 250) | #121216 |
| Border | oklch(0.22 0.005 250) | #1e1e24 |
| Text Primary | oklch(0.96 0.002 80) | #f5f5f5 |
| Text Secondary | oklch(0.68 0.008 80) | #a0a0a8 |
| Accent | oklch(0.75 0.12 80) | #c8a45a |
| Accent Light | oklch(0.82 0.12 80) | #e0c478 |
| Accent Dark | oklch(0.62 0.1 80) | #a8873d |

**Color strategy**: Committed — gold carries 30-40% of visual emphasis on dark neutrals. Tinted neutrals (slight warm hue) instead of pure gray.

## Typography
- **Display/Headings**: Inter 700-800, tight tracking (-0.02em)
- **Body**: Inter 400, 16px base, 1.6 line-height
- **Scale ratio**: 1.25 (Major Third)
- **Max line length**: 65ch

## Layout
- **Grid**: Single column mobile, max-width 1200px desktop
- **Spacing scale**: 4px base, multiply by 2/3/4/6/8/12
- **Section padding**: 80px vertical (mobile: 48px)
- **Cards**: Glass effect (backdrop-filter: blur(12px)), subtle gold border on hover

## Motion
- **Scroll animations**: Fade up + 60px translate, 0.6s ease-out-quart
- **Hover**: Scale 1.02, shadow increase, 0.2s ease-out
- **Stagger**: 0.1s between sibling elements
- **No bounce, no elastic** — exponential easing only

## Components
- **Service cards**: Glass-card with icon, title, description. Hover: gold border glow
- **CTA buttons**: Gold background, dark text, hover: scale + shadow
- **Section headings**: Large, gold shimmer effect on key words
- **Contact cards**: Glass with icon + text, hover: accent border

## Responsiveness
- Mobile: single column, stacked cards, hamburger nav
- Tablet: 2-column grid for cards
- Desktop: 4-column grid for services, side-by-side demos

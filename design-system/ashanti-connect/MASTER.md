# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** Ashanti Connect
**Generated:** 2026-06-21 03:29:00
**Category:** Government/Public Service (Premium Civic Theme)

---

## Global Rules

### Color Palette (Glow & Heritage)

| Role | HSL Token / Hex | CSS Variable |
|------|-----------------|--------------|
| Primary | `hsl(162 72% 46%)` | `--color-primary` |
| Secondary | `hsl(160 25% 12%)` | `--color-secondary` |
| CTA/Accent | `hsl(38 92% 50%)` | `--color-cta` / `--color-gold` |
| Background | `hsl(160 40% 4%)` | `--color-background` |
| Text | `hsl(0 0% 96%)` | `--color-text` |
| Muted Foreground | `hsl(160 12% 58%)` | `--color-muted-foreground` |

**Color Notes:** Premium Dark Theme tailored to the Ashanti Region. Deep Forest Background (`hsl(160 40% 4%)`), vibrant Emerald Green (`hsl(162 72% 46%)`) for growth and digital connectivity, and Ashanti Gold (`hsl(38 92% 50%)`) representing the mineral wealth, royalty, and civic pride.

### Typography

- **Heading Font:** Lexend (modern, geometry-informed display sans)
- **Body Font:** Source Sans 3 (high legibility, humanistic system body font)
- **Mood:** premium, professional, culturally-informed, digital gateway, dashboard
- **Google Fonts:** [Lexend + Source Sans 3](https://fonts.google.com/share?selection.family=Lexend:wght@300;400;500;600;700;800%7CSource+Sans+3:wght@300;400;500;600;700)

**CSS Import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700;800&family=Source+Sans+3:wght@300;400;500;600;700&display=swap');
```

### Spacing Variables

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `4px` / `0.25rem` | Tight gaps, badge padding |
| `--space-sm` | `8px` / `0.5rem` | Icon-to-text spacing, small margins |
| `--space-md` | `16px` / `1rem` | Standard internal component padding |
| `--space-lg` | `24px` / `1.5rem` | Card padding, standard grid gaps |
| `--space-xl` | `32px` / `2rem` | Section block spacing |
| `--space-2xl` | `48px` / `3rem` | Large margins, major separations |
| `--space-3xl` | `64px` / `4rem` | Hero component padding |

### Shadow & Glow Depths

| Level | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.2)` | Subtle depth on tiny elements |
| `--shadow-md` | `0 4px 12px rgba(0,0,0,0.4)` | Standard card lift |
| `--shadow-lg` | `0 12px 24px rgba(0,0,0,0.5)` | Modals, menu dropdowns |
| `--shadow-xl` | `0 24px 48px rgba(0,0,0,0.6)` | Hero frames, carousels |
| `--glow-emerald` | `0 0 40px -8px hsl(162 72% 46% / 0.35)` | Emerald branding glow |
| `--glow-gold` | `0 0 40px -8px hsl(38 92% 50% / 0.35)` | Gold highlight glow |
| `--glow-sm-emerald` | `0 0 16px -4px hsl(162 72% 46% / 0.4)` | Subtle active glow |

---

## Component Specs

### Buttons

```css
/* Primary Button (Emerald/Green) */
.btn-primary {
  background: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  padding: 12px 24px;
  border-radius: var(--radius);
  font-weight: 600;
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--glow-emerald-sm);
  cursor: pointer;
}

.btn-primary:hover {
  filter: brightness(1.1);
  box-shadow: var(--glow-emerald);
}

/* Secondary Button (Gold/Yellow) */
.btn-gold {
  background: hsl(var(--gold));
  color: hsl(var(--gold-foreground));
  padding: 12px 24px;
  border-radius: var(--radius);
  font-weight: 600;
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--glow-gold-sm);
  cursor: pointer;
}

.btn-gold:hover {
  filter: brightness(1.05);
  box-shadow: var(--glow-gold);
}

/* Outline Button */
.btn-outline {
  background: transparent;
  color: hsl(var(--foreground));
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 12px 24px;
  border-radius: var(--radius);
  font-weight: 500;
  transition: all 200ms ease;
  cursor: pointer;
}

.btn-outline:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.2);
}
```

### Cards

```css
/* Premium Glassmorphic Card */
.glass-card {
  background: hsl(160 30% 7% / 0.55);
  backdrop-filter: blur(16px) saturate(1.4);
  -webkit-backdrop-filter: blur(16px) saturate(1.4);
  border: 1px solid hsl(160 30% 20% / 0.4);
  box-shadow: 0 4px 24px -8px hsl(0 0% 0% / 0.4),
              inset 0 1px 0 hsl(0 0% 100% / 0.04);
  border-radius: 16px;
  padding: 24px;
  transition: all 300ms cubic-bezier(0.2, 0.8, 0.2, 1);
  cursor: pointer;
}

.glass-card:hover {
  border-color: hsl(var(--primary) / 0.25);
  box-shadow: var(--glow-emerald-sm);
  transform: translateY(-2px);
}
```

### Inputs

```css
/* Glassmorphic Search / Input Field */
.input-glass {
  background: hsl(var(--secondary) / 0.5);
  backdrop-filter: blur(8px);
  border: 1px solid hsl(var(--primary) / 0.2);
  border-radius: 16px;
  padding: 16px 20px;
  color: hsl(var(--foreground));
  transition: all 250ms ease;
}

.input-glass:focus {
  border-color: hsl(var(--primary) / 0.4);
  outline: none;
  box-shadow: 0 0 0 3px hsl(var(--primary) / 0.15);
}
```

### Navigation & Header

```css
/* Glassmorphic Nav Pill Bar */
.glass-nav {
  background: hsl(160 40% 4% / 0.75);
  backdrop-filter: blur(24px) saturate(1.6);
  -webkit-backdrop-filter: blur(24px) saturate(1.6);
  border-bottom: 1px solid hsl(160 22% 14% / 0.8);
  box-shadow: 0 1px 0 hsl(162 72% 46% / 0.06),
              0 4px 16px -4px hsl(0 0% 0% / 0.3);
}
```

---

## Style Guidelines

**Style:** Dark Mode Glassmorphism with Heritage Overlays

**Keywords:** Glassmorphism, deep dark background, emerald and gold branding, Kente grid patterns, floating navigation, ambient blur orbs, spring transitions, typewriters.

**Key Effects:**
- **Kente Texture Pattern:** Background grid pattern representing local culture.
- **Ambient Blurs:** Radial gradients behind content acting as light sources (`.ambient-orb-emerald`, `.ambient-orb-gold`).
- **Focus Rings:** Clear `3px` solid `--primary` rings on focus.
- **Reduced Motion:** Automatic transition overrides using `@media (prefers-reduced-motion: reduce)`.

### Page Pattern

**Pattern Name:** Multi-Workspace Portal & Bento Hub

- **Conversion Strategy:** Provide quick path selection (Citizens vs. Government Operations vs. Regional Leadership). Deliver immediate civic tools (AI Assistant query bar, live project tracker, opportunity listings).
- **CTA Placement:** Above fold (Citizen Portal primary, AI Assistant search bar), repeated inside bento cards and final footer sections.
- **Section Order:**
  1. Hero with Interactive Carousel & AI Search
  2. Governance Model comparison (Old vs. New)
  3. Bento Grid of Capabilities
  4. How it Works (Report > Route > Resolve > Reflect)
  5. Connected Departments Showcase
  6. Live Project watch list (Budgets & Progress)
  7. AI Layer highlight band
  8. Opportunity Hub cards
  9. Workspaces portal navigation
  10. Final Call to Action

---

## Anti-Patterns (Do NOT Use)

- ❌ **Emojis as icons** — Use SVG icons (Lucide / Heroicons)
- ❌ **Flat White Light Mode** — Theme is strictly dark-mode-first to support the rich cultural glowing gradients
- ❌ **Low Contrast Muted Text** — Keep body text above `#CBD5E1` and muted text above `#64748B` for AA/AAA compliance
- ❌ **Layout-Shifting Scale Hovers** — Ensure hover states use padding/color shifts rather than layout-breaking sizing
- ❌ **Instant State Shifts** — Use `transition-all duration-200` to prevent jarring jumps

---

## Pre-Delivery Checklist

Before delivering any UI code, verify:

- [x] No emojis used as icons (use SVG instead)
- [x] Consistent icon library used (Lucide)
- [x] `cursor-pointer` explicitly added to all clickable cards and buttons
- [x] Hover states utilize smooth, springy transitions (150-300ms)
- [x] Text elements maintain accessible contrast (4.5:1 minimum)
- [x] Clear focus states visible for keyboard navigation
- [x] `prefers-reduced-motion` animations media query is respected
- [x] Responsive layout tested at 375px, 768px, 1024px, and 1440px
- [x] No layout overlap or content hiding behind fixed/floating navbars
- [x] No horizontal scroll overflows on mobile screens

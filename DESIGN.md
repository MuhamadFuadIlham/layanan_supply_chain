---
name: Supply Chain Oracle
colors:
  surface: '#0f1321'
  surface-dim: '#0f1321'
  surface-bright: '#353849'
  surface-container-lowest: '#0a0d1c'
  surface-container-low: '#171b2a'
  surface-container: '#1b1f2e'
  surface-container-high: '#262939'
  surface-container-highest: '#303444'
  on-surface: '#dfe1f6'
  on-surface-variant: '#c3c5d7'
  inverse-surface: '#dfe1f6'
  inverse-on-surface: '#2c303f'
  outline: '#8d90a0'
  outline-variant: '#434654'
  surface-tint: '#b5c4ff'
  primary: '#b5c4ff'
  on-primary: '#00297b'
  primary-container: '#648aff'
  on-primary-container: '#00236d'
  inverse-primary: '#1a53d6'
  secondary: '#c4c0ff'
  on-secondary: '#2000a4'
  secondary-container: '#3826cd'
  on-secondary-container: '#b4b0ff'
  tertiary: '#1de0b2'
  on-tertiary: '#00382a'
  tertiary-container: '#00a481'
  on-tertiary-container: '#003024'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#b5c4ff'
  on-primary-fixed: '#00164d'
  on-primary-fixed-variant: '#003cad'
  secondary-fixed: '#e3dfff'
  secondary-fixed-dim: '#c4c0ff'
  on-secondary-fixed: '#100069'
  on-secondary-fixed-variant: '#3622ca'
  tertiary-fixed: '#50fdcd'
  tertiary-fixed-dim: '#1de0b2'
  on-tertiary-fixed: '#002117'
  on-tertiary-fixed-variant: '#00513e'
  background: '#0f1321'
  on-background: '#dfe1f6'
  surface-variant: '#303444'
typography:
  display-lg:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '500'
    lineHeight: 14px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1440px
  gutter: 24px
  margin-desktop: 40px
  margin-tablet: 24px
  margin-mobile: 16px
  stack-xs: 4px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
  stack-xl: 64px
---

## Brand & Style
The design system is engineered for **The Supply Chain Oracle**, an AI-powered intelligence platform. The brand personality is authoritative yet visionary—blending the reliability of enterprise logistics with the cutting-edge precision of predictive AI. 

The visual style is a **Premium Dark-First Tech** aesthetic, heavily influenced by modern developer-centric interfaces (Linear/Vercel). It utilizes a sophisticated **Glassmorphic** approach where data surfaces emerge from a deep-space background through light-refracting borders and subtle glow effects. The emotional response should be one of "calm control" amidst complex global data.

Key principles:
- **Depth through Translucency:** Layers are defined by varying levels of opacity and background blurs rather than heavy shadows.
- **Precision Typography:** High legibility and tight tracking to mirror the accuracy of the underlying AI.
- **Functional Accents:** Vibrant colors are reserved for actionable insights, status indicators, and predictive trends.

## Colors
The palette is rooted in a deep, nocturnal base to minimize eye strain during prolonged data analysis. 

- **The Void (#050816):** The primary background, providing a high-contrast foundation for light-based elements.
- **The Core (#0B1D3A):** Used for panel backgrounds and structural gradients to create a sense of atmospheric depth.
- **Primary Accent (Blue/Purple):** A cool-toned duo used for primary actions, selection states, and AI-driven "hero" elements.
- **Status Highlights:** Green, Yellow, and Red are strictly utilitarian, used to signal supply chain health (Optimized, At Risk, or Disrupted).
- **Glass Borders:** Semi-transparent strokes that define geometry without closing off the interface, maintaining a sense of fluidity.

## Typography
The system uses a tri-font approach to balance technical precision with modern aesthetics.

1.  **Geist (Headlines):** A geometric sans-serif with a technical edge, used for prominent headings and data titles. It feels engineered and purposeful.
2.  **Inter (Body):** The workhorse for all long-form text, descriptions, and dashboard values. Chosen for its exceptional legibility in dark mode and high x-height.
3.  **JetBrains Mono (Labels/Metadata):** Used for SKU numbers, coordinates, timestamps, and AI confidence scores. The monospaced nature emphasizes the "code-like" accuracy of the intelligence platform.

**Scale:** Headline sizes are aggressively reduced for mobile to maintain the density required for complex data visualization.

## Layout & Spacing
This design system utilizes an **8pt Grid System** for absolute mathematical harmony. 

- **Layout Model:** A 12-column fluid grid for desktop, transitioning to 8 columns for tablet and 4 columns for mobile. 
- **The "Glass Panel" Philosophy:** Instead of traditional margins, components are often housed in edge-to-edge containers or floating glass cards with consistent 24px internal padding.
- **Density:** To accommodate the high-information needs of supply chain logistics, vertical rhythm is kept tight (8px-16px between related items) while larger sections are separated by 64px to provide visual breathing room.
- **Adaptive Reflow:** On mobile, sidebars collapse into a bottom navigation bar or a "Command + K" style search menu to maximize the viewport for data charts.

## Elevation & Depth
Elevation is not conveyed through shadows, but through **Tonal Stacking** and **Backdrop Blurs**.

- **Level 0 (Background):** The base `#050816` layer.
- **Level 1 (Panels):** `#0B1D3A` at 60% opacity with a 20px backdrop blur. This level uses a 1px solid border (`rgba(255, 255, 255, 0.08)`).
- **Level 2 (Popovers/Tooltips):** A slightly lighter blue-tinted fill with 80% opacity and 40px backdrop blur. These elements feature a subtle "outer glow" using the primary accent color at 10% opacity.
- **Interactive States:** On hover, glass cards increase their border opacity and the internal background color shifts slightly towards the primary accent, creating a "lifting" effect without changing physical elevation.

## Shapes
The shape language is sophisticated and modern, favoring generous curves to offset the "coldness" of the dark tech aesthetic.

- **Standard Elements (Buttons, Inputs):** Use `rounded-md` (0.5rem) for a crisp, functional look.
- **Container Surfaces (Cards, Panels):** Use `rounded-xl` (1rem) or `rounded-2xl` (1.5rem) to create the signature "premium" feel. 
- **Icons:** Must be minimalist line icons (2px stroke) with slightly rounded terminals to match the font geometry.
- **Progress Bars/Tags:** Use pill shapes (full rounded) to differentiate them from structural layout components.

## Components
Consistent implementation of these components ensures the system remains cohesive:

- **Glass Cards:** The primary container. Must have a 1px border (`white/8%`), a background blur (`20px`), and a subtle top-down linear gradient.
- **Primary Button:** Solid `#4F7CFF` fill with white text. Apply a soft glow effect (Box Shadow: `0 0 15px rgba(79, 124, 255, 0.3)`) on hover.
- **Ghost Button:** Glass border with no fill; text is the primary accent color.
- **Input Fields:** Darker than the panel background (`#050816`), with a subtle inset shadow to indicate "emptiness" and a 1px border that glows blue on focus.
- **Status Chips:** Small, monospaced text with a 10% opacity background of the status color (Green/Yellow/Red) and a matching 100% opacity dot indicator.
- **Supply Chain Map:** Utilize custom map styles with dark-navy landmasses and glowing Primary Blue lines for routes.
- **AI Insight Component:** A special card variant with a `secondary_accent` (Purple) border glow and a subtle "shimmer" animation to denote live AI processing.
# Existing Design Tokens

Extracted from `assets/css/style.css`. These tokens document and centralize the current site's visual language; they are not a redesign.

## Color Palette

| Token | Value | Use |
|---|---|---|
| `--navy-950` | `#071527` | Deep page, navigation, and footer background |
| `--navy-900` | `#0b2340` | Secondary dark surfaces and controls |
| `--navy-800` | `#123055` | Dark accent and gradients |
| `--ice-400` | `#5FD8E8` | Bright cyan accent and focus/hover details |
| `--ice-300` | `#9AEAF2` | Light cyan text accents |
| `--amber-500` | `#E8A23D` | Primary warm accent and buttons |
| `--amber-600` | `#D68A22` | Darker amber hover state |
| `--paper-50` | `#F4F8FB` | Main page background and soft surfaces |
| `--paper-100` | `#E8EFF5` | Borders and dividers |
| `--slate-700` | `#33455A` | Main body text |
| `--slate-500` | `#5E7387` | Muted text |
| `--white` | `#FFFFFF` | Cards and foreground surfaces |

## Typography

- Body family: `--font-body`, currently `'Inter', sans-serif`.
- Display/headings family: `--font-display`, currently `'Space Grotesk', sans-serif`.
- Shared role sizes: `--font-size-small` (`.82rem`), `--font-size-body` (`.94rem`), `--font-size-lead` (`1.05rem`), and `--font-size-heading` (`1.35rem`).
- Existing page headings use responsive `clamp()` sizes; the home hero reaches `3.45rem`, inner-page headings reach `2.9rem`, and display numerals reach `3.4rem`.

## Spacing

The root scale runs from `--space-1` (`4px`) through `--space-8` (`64px`) in 4/8/12/16/24/32/48/64px increments. `--space-section` is `88px`, preserving standard desktop section padding; the mobile rule reduces section padding to `60px`. The content width is `--maxw: 1200px`, with the shared `.wrap` using `24px` horizontal padding (adjusted at responsive breakpoints).

## Shape and Shadows

- `--radius-sm: 4px`, `--radius-md: 10px`, `--radius-button: 8px`, `--radius-card: 14px`, and `--radius-panel: 18px`.
- Pill badges use a fully rounded `100px` radius; circular controls use `50%`.
- `--shadow-dropdown`: `0 18px 40px rgba(0,0,0,0.35)`.
- `--shadow-card-hover`: `0 18px 40px rgba(7,21,39,0.08)`.
- `--shadow-backtop`: `0 10px 24px rgba(0,0,0,0.3)`.
- Featured sponsor tiers use a restrained amber shadow: `0 20px 44px rgba(232,162,61,0.16)`.

## Components

- **Buttons:** amber solid and transparent outline variants; typically `.94rem`, 12-13px vertical and 22px horizontal padding, with an 8px radius. The home hero overrides both main button variants to white surfaces with a 4px radius.
- **Cards:** white surface, `--paper-100` border, 14px radius, and 26px padding for `.simple-card`. Tier panels use an 18px radius and 30px padding. Hover lift/shadow is used on simple cards.
- **Header:** sticky translucent deep navy surface (`--color-header`) with a subtle white border, blur, and responsive navigation drawer below 1100px.
- **Footer:** deep navy surface (`--color-footer`), muted white text, three-column desktop layout collapsing to one column on narrower screens.
- **Motion/accessibility:** focus-visible outline uses amber; reduced-motion preferences disable transitions and smooth scrolling. Hero content has a staggered entrance, and the partner strip scrolls horizontally.

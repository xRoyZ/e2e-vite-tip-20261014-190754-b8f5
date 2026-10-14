# Design — Project Identity

> This document is project-long-lived. Tokens are not changed without
> the Architect's approval. Developers MUST use these tokens
> instead of improvising their own colors/spacings.

## Style Direction

Calm, light, single-purpose surface: a centered card on a soft off-white canvas, one restrained deep-green accent for money, generous whitespace and tabular figures — clear and trustworthy like a banking utility, not decorative.

## Colors

- `--color-bg`: **#F7F8FA**
- `--color-surface`: **#FFFFFF**
- `--color-fg`: **#111827**
- `--color-muted`: **#6B7280**
- `--color-border`: **#E5E7EB**
- `--color-border-strong`: **#D1D5DB**
- `--color-accent`: **#0E7C66**
- `--color-accent-hover`: **#0B6353**
- `--color-accent-active`: **#084D41**
- `--color-accent-soft`: **#E6F4F0**
- `--color-accent-ring`: **#99E0D1**
- `--color-error`: **#B42318**
- `--color-error-bg`: **#FEF3F2**
- `--color-error-border`: **#FDA29B**
- `--color-disabled-bg`: **#E5E7EB**
- `--color-disabled-fg`: **#9CA3AF**

## Typography

- `font_family`: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif
- `font_family_numeric`: Inter, 'SF Mono', 'Segoe UI Mono', ui-monospace, monospace
- `heading_weight`: 600
- `body_weight`: 400
- `label_weight`: 500
- `size_page_title`: 22px
- `size_section`: 15px
- `size_body`: 16px
- `size_label`: 14px
- `size_helper`: 13px
- `size_result`: 24px
- `line_height`: 1.5
- `numeric_features`: font-variant-numeric: tabular-nums lining-nums (all amounts and percentages)

## Spacing Scale

- `--space-0`: 4px
- `--space-1`: 8px
- `--space-2`: 12px
- `--space-3`: 16px
- `--space-4`: 24px
- `--space-5`: 32px
- `--space-6`: 48px

## Border-Radii

- `--radius-sm`: 6px
- `--radius-md`: 10px
- `--radius-lg`: 16px
- `--radius-pill`: 999px

## Components

### Page / Container

Full-viewport background = bg (#F7F8FA). Content centered in a single column, max-width 480px, horizontally centered, vertical padding 48px (32px on small screens). One h1 'Trinkgeld-Rechner' (22px, weight 600, fg) at the top with 8px gap above the card. No nav, no sidebar, no header bar — one page only.

### Card

bg=surface (#FFFFFF), radius=lg (16px), padding=24px (16px on small screens), border 1px solid border (#E5E7EB), shadow: 0 1px 2px rgba(16,24,40,0.04), 0 4px 12px rgba(16,24,40,0.06). Inside: inputs block, 24px vertical gap, then result block.

### Label

Block, 14px, weight 500, color fg (#111827), margin-bottom 6px, connected to its input via htmlFor/id. Required fields carry no asterisk; the unit is part of the label: 'Betrag (€)', 'Trinkgeld (%)', 'Personenzahl'.

### Input (TextField)

height min 44px (touch target), width 100%, padding 12px 14px, radius=md (10px), border 1px solid border (#E5E7EB), bg=surface, fg=#111827, 16px body weight 400, tabular-nums, placeholder color muted (#6B7280). $font_family_numeric. States — default: border #E5E7EB; hover: border #D1D5DB; focus: border accent (#0E7C66) + ring 3px accent-ring (#99E0D1) offset 0, no default outline; disabled: bg #E5E7EB, fg #9CA3AF, cursor not-allowed. Input modes: Betrag + Trinkgeld% → inputmode='decimal' (accepts ',' and '.'), Personenzahl → inputmode='numeric'. Placeholders: Betrag 'z. B. 100,00', Trinkgeld 'z. B. 10', Personenzahl 'z. B. 4'.

### Input — Error State

border 1px solid error-border (#FDA29B), bg=error-bg (#FEF3F2), fg=#111827; focus ring 3px rgba(180,35,24,0.18). aria-invalid='true' and aria-describedby pointing at the error text. Error text directly under the field: 13px, weight 500, color error (#B42318), margin-top 6px, role='alert', rendered by React as a text node only (never innerHTML). Only one concise German message per field, e.g. Betrag: 'Bitte einen gültigen Betrag eingeben.' — Trinkgeld: 'Bitte einen gültigen Prozentsatz eingeben.' — Personen: 'Bitte eine ganze Zahl größer als 0 eingeben.'

### Button

Base: min-height 44px, padding 12px 20px, radius=md (10px), 15px weight 600, inline-flex centered, gap 8px, transition background-color 120ms ease. Primary — default: bg=accent (#0E7C66), fg=#FFFFFF; hover: bg=accent-hover (#0B6353); active: bg=accent-active (#084D41) + translateY(1px); focus-visible: ring 3px accent-ring (#99E0D1); disabled: bg=disabled-bg (#E5E7EB), fg=disabled-fg (#9CA3AF), cursor not-allowed, no shadow. Secondary/Ghost — default: bg transparent, fg=accent, border 1px solid border (#E5E7EB); hover: bg=accent-soft (#E6F4F0); active: bg=accent-soft + translateY(1px); disabled: fg #9CA3AF, border #E5E7EB. NOTE: the calculator itself has NO submit button (live calculation) — Button exists only for non-core actions such as an optional 'Zurücksetzen' (Secondary/Ghost, right-aligned under the results).

### Result Block

Separated from the inputs by a 1px divider line (border #E5E7EB) with 24px margin above and below. Contains three rows in this fixed order: 'Trinkgeld', 'Gesamt', 'Pro Person'. Row — label left (15px, weight 400, color muted #6B7280), value right (24px, weight 600, tabular-nums, fg #111827), row min-height 44px, vertical padding 8px, label and value share one baseline. Highlight the 'Pro Person' row: bg=accent-soft (#E6F4F0), radius=md (10px), padding 12px 14px, value color accent (#0E7C66), 24px weight 600. 12px gap between rows.

### Result Value — Empty / Invalid

Without fully valid input NO numeric value is shown. Render the placeholder character '—' (em dash) in color muted (#6B7280), same size/weight/tabular slot as a real value so the layout never jumps. Never NaN, Infinity, empty string or a bare currency symbol. As soon as all three fields are valid, every one of the three values switches to a formatted amount in the same frame.

### Divider

1px solid border (#E5E7EB), full card width, no margin of its own — spacing is supplied by the surrounding blocks (24px above/below the result divider, 16px between input fields).

## Layout Principles

- Container max-width 480px, single column, horizontally centered on a full-height bg (#F7F8FA) canvas; no multi-column layout, no nav.
- Breakpoints: base up to 479px (card padding 16px, page padding top/bottom 32px), sm 480px+ (card padding 24px, page padding 48px), md 768px+ (container stays capped at 480px and centered — the layout does not stretch).
- Vertical rhythm from the spacing scale: 8px label→input, 16px between input fields, 24px between the inputs block and the result block, 8px between result rows, 12px inside the highlighted 'Pro Person' row.
- Single readable column, mobile-first widths, desktop-first data density: the 480px cap keeps line lengths short and the calculator readable without horizontal scrolling at any width ≥320px.
- ONE number format for every amount the UI shows: German locale via Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }) → thousands dot, comma as decimal separator, exactly two decimals, Euro sign followed by a non-breaking space: 1.234,50 €. Example: 27,50 €, 110,00 €. Percentages use the same rules with '%', no currency.
- All amounts and percentages in tabular-nums so digits and the decimal separator stay column-aligned and values do not shift while typing.
- Every interactive element (inputs, buttons) has a minimum touch target of 44×44px and is reachable by keyboard in DOM order: Betrag → Trinkgeld (%) → Personenzahl → results.
- Color carries meaning in one direction only: the deep green accent marks money/result, the red error palette marks validation problems — accent and error never appear in the same element at the same time.
- Focus is always visible (3px accent-ring) and never removed without a replacement; no motion beyond a 120ms background-color transition, no animation that could distract while typing.

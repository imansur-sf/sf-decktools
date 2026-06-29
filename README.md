# sf-decktools — Salesforce Narrative Deck Design System

Public mirror of the SF Decktools design system. Hosts the CSS/JS/asset files so they can be loaded via jsDelivr CDN from generated decks (e.g. the Slackbot `3D Deck Creator` skill).

## CDN

Reference any file via:

```
https://cdn.jsdelivr.net/gh/imansur-sf/sf-decktools@main/{filename}
```

For example:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/imansur-sf/sf-decktools@main/tokens.css" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/imansur-sf/sf-decktools@main/components.css" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/imansur-sf/sf-decktools@main/animation.css" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/imansur-sf/sf-decktools@main/animation-interactions.css" />
<script src="https://cdn.jsdelivr.net/gh/imansur-sf/sf-decktools@main/animation.js"></script>
<img src="https://cdn.jsdelivr.net/gh/imansur-sf/sf-decktools@main/assets/icons/2d/data-cloud.svg" alt="Data Cloud">
```

## What's here

| File | Purpose |
|---|---|
| `tokens.css` | Design tokens — colour, typography, gradients, spacing |
| `components.css` | Reusable component classes (hero, KPI cards, beach-cards, etc.) |
| `animation.css` | Base animation primitives (countUp, fade-in, etc.) |
| `animation-interactions.css` | Slide-specific animation styles (typewriter chat, data pipeline, architecture reveal) |
| `animation.js` | Animation engine that hooks into the slide engine |
| `sf-composer.html` | Canonical 12-slide reference deck — the template every customer deck is forked from |
| `assets/` | Fonts (Salesforce Sans, Avant Garde SFDC Demi), 2D product icons, logos, characters, graphics |
| `STYLE-GUIDE.md` | Brand rules — voice, colour, typography, Bowden persuasion framework |
| `SLIDE-PRINCIPLES.md` | Slide architecture rules — section order, component constraints |
| `architecture-diagram.html` / `architecture-diagram-3d.html` | Standalone architecture diagram templates |
| `feedback-widget.js` | Visitor feedback widget (requires a Cloudflare Worker backend to fully function) |
| `gate.js` | Optional password gate + visit tracking (requires a Cloudflare Worker backend) |
| `decktools-tracker.js` | Lightweight usage tracker (requires the matching Worker) |

## Brand rules (2026)

- Salesforce Sans body, Avant Garde SFDC Demi display. Max weight 700.
- 80/20 colour rule: 80% primary blues, 20% accent max.
- One `--accent` per deck, set in the deck's inline `<style>` block.
- 2D icons only in narrative pages.
- `--grad-evening` for hero backgrounds. Never gradient inside a card.

Full rules: see `STYLE-GUIDE.md` and `SLIDE-PRINCIPLES.md`.

## License

Internal Salesforce use. Customer logos belong to their respective companies. Astro and Einstein characters are Salesforce-owned — do not ship them to customer-branded deliverables without checking.

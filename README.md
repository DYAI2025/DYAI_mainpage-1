# DYAI Mainpage

Augmented-Intelligence-Experience: Hero · Manifest · ProjectCards.

## Lokal starten

Einfach `DYAI Mainpage.html` öffnen — keine Build-Schritte nötig.

Optional mit Server:
```bash
npx serve .
```

## Railway Deployment

Das Projekt deployt direkt aus diesem Repo:

1. Repo bei Railway als neues Service verbinden.
2. Railway erkennt das `Dockerfile` automatisch — kein weiteres Setup nötig.
3. Nach dem ersten Build ist die App unter der Railway-Domain erreichbar.

`Caddyfile` listened auf `$PORT` (Railway-Konvention). Static files werden mit Caching und Kompression serviert; `/` redirected auf `DYAI Mainpage.html`.

### Custom Domain
In Railway → Settings → Domains → Custom Domain hinzufügen. DNS auf den von Railway angezeigten CNAME zeigen.

## Neues Projekt hinzufügen

In `data/projects.js` ein neues Objekt am Ende des `window.DYAI_PROJECTS`-Arrays anhängen. Felder:

| Feld | Beispiel |
|---|---|
| `id` | `"p07"` |
| `number` | `"07"` |
| `slug` | `"new-system"` |
| `title` | `"New System"` |
| `category` | `"X · Y"` (vor `·` wird zur Filter-Kategorie) |
| `status` | `"Live"` |
| `claim` | Ein Satz |
| `description` | Absatz |
| `howItWorks` / `forWhom` / `aiLayer` | Array von Strings |
| `capabilities` / `tags` | Array von Strings |
| `links` | Array `{ label, url, type }` (`repo` / `live` / `docs` / `dashboard` / `subrepo`) |
| `thumbnailCategory` | Eine der existierenden Renderer-Kategorien (`Bazodiac` / `FuFirE` / `WhatsInIt` / `WhatsOrga` / `CoupleTime` / `AugmentedOps`) — oder neue in `data/thumbnails.js` ergänzen |
| `thumbnailSeed` | Beliebiger String für Variation |

## Tech

- React 18 + Babel (UMD via CDN)
- Three.js für die Hero-Szene
- Procedurale SVG-Thumbnails (kein Bildbedarf)
- CSS Custom Properties für Tokens
- Reduced-Motion respektiert
# DYAI_mainpage-1

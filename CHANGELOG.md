# Changelog

## 0.2.1

### Added

- `KPICard` forwards `sparklineLabelLeft` / `sparklineLabelRight` to the sparkline.

### Fixed

- Sparkline y-scale uses the series min/max (no longer floors at 1 or always includes 0), so small ranges like µg/m³ traces stay readable.

## 0.2.0

### Added

- `Sparkline` component: compact D3 area + line chart (`values`, optional `color`, `height`, `labelLeft` / `labelRight`). Solid fill, no fade.
- `KPICard` optional `sparkline` (`number[]`) and `sparklineColor` — renders a trend under the value when at least two points are provided.

## 0.1.0

### Breaking

- Chrome (`AppHeader`, `NavBar`, `NavLinks`, `SiteFooter`, default layout) is driven by `app.config` → `dashboard`. Playground demo routes are no longer hardcoded in the layer components.
- Preferred consume path is a package dependency pinned to a tag (e.g. `#v0.1.0`) plus `extends` to `node_modules/bs-dashboard-base`.
- `nuxt` / `vue` / `vue-router` are peer dependencies.

### Added

- `app.config` dashboard chrome API (`showNavBar`, `navItems`, `navLinksSections`, footer links, etc.)
- Accordion `#item` slot and `openAll` prop
- Optional Table sort/filter (`filterOptions`, `defaultSort`, per-column `sortable` / `sortKey`)
- Hardened `useBsApi` (local `/data/{id}.json` fallback + Apikey) and server util `fetchDatasetJson` / `resolveBsApiKey`
- Layer ships `public/icons/github-mark.svg`

### Fixed

- Nav / sticky navbar CSS no longer relies on Tailwind `@apply` (more reliable under Docker / differing content paths)

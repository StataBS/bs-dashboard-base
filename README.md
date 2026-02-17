# dashboard_base

A [Nuxt layer](https://nuxt.com/docs/guide/going-further/layers) providing reusable dashboard components and layouts for Kanton Basel-Stadt, built on the official [Digital Design System](https://github.com/kanton-basel-stadt/designsystem).

This layer is intended to be used in dashboard projects at the [Statistisches Amt Basel-Stadt](https://www.statistik.bs.ch). It follows the development guidelines of the [Data Competence Center Basel-Stadt (DCC-BS)](https://dcc-bs.github.io/documentation/) and is designed to work alongside the [DCC-BS Nuxt Layers](https://github.com/DCC-BS/nuxt-layers).

## What This Layer Provides

### Components

| Component | Description |
|---|---|
| `Accordion` | Expandable sections with optional links and icons |
| `AppHeader` | Page header with Basel-Stadt logo |
| `Box` | Info box with variants (warning, info, highlight) |
| `BSLogo` | Basel-Stadt logo with Baselstab icon |
| `Contact` | Contact card with name, phone, and email |
| `DatePicker` | Date picker with v-calendar, DD.MM.YYYY format, and event indicators |
| `FeedbackControlLocal` | Feedback form with rating, text, and email submission |
| `IconDownload` | Animated SVG download icon |
| `KPICard` | Key performance indicator card with title, description, and value |
| `LinkItem` | Link with automatic icon detection (internal/external/download) |
| `NavBar` | Sticky navigation bar with scroll-based show/hide |
| `NavLinks` | Sidebar navigation for sub-sections |
| `SiteFooter` | Footer with feedback control, links, and copyright |
| `Table` | Data table with mobile stacking and scoped slots |
| `Tabs` | Tab component with v-model support |

### Layout

- **`default`** -- Default layout with `AppHeader`, `NavBar`, main content slot, and `SiteFooter`.

### Composables

- **`useBsApi`** -- Composable for fetching datasets from the [Basel-Stadt Open Data API](https://data.bs.ch).

### Styling

- Tailwind CSS integration via the `@kanton-basel-stadt/designsystem` unplugin
- 20+ component-specific CSS files in `app/assets/css/components/`

### Plugins

- **v-calendar** -- Client-side plugin for `VDatePicker` and `VCalendar` components

## Prerequisites

- [Node.js](https://nodejs.org/) v20 or later
- A package manager -- [bun](https://bun.sh/) is recommended (following [DCC-BS conventions](https://dcc-bs.github.io/documentation/)), but npm, yarn, and pnpm work as well

## Installation

Add this layer as a dependency in your dashboard project:

```sh
# bun (recommended)
bun add bs-dashboard-base

# npm
npm install bs-dashboard-base

# yarn
yarn add bs-dashboard-base

# pnpm
pnpm add bs-dashboard-base
```

All required dependencies, including `@kanton-basel-stadt/designsystem`, are bundled with the layer.

## Usage as a Nuxt Layer

Extend this layer in your project's `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  extends: ['bs-dashboard-base'],
})
```

Or directly from GitHub:

```ts
export default defineNuxtConfig({
  extends: [
    ['github:StatA-BS/dashboard_base', { install: true }],
  ],
})
```

### Combining with DCC-BS Nuxt Layers

This layer is designed to work alongside the [DCC-BS Nuxt Layers](https://github.com/DCC-BS/nuxt-layers) for authentication, backend communication, health checks, logging, and feedback. A typical dashboard `nuxt.config.ts` might look like this:

```ts
export default defineNuxtConfig({
  extends: [
    ['github:StatA-BS/dashboard_base', { install: true }],
    ['github:DCC-BS/nuxt-layers/auth', { install: true }],
    ['github:DCC-BS/nuxt-layers/health_check', { install: true }],
    ['github:DCC-BS/nuxt-layers/backend_communication', { install: true }],
    ['github:DCC-BS/nuxt-layers/logger', { install: true }],
    ['github:DCC-BS/nuxt-layers/feedback-control', { install: true }],
  ],
})
```

For details on configuring the DCC-BS layers (environment variables, auth switching, etc.), see the [DCC-BS Nuxt Layers documentation](https://dcc-bs.github.io/documentation/nuxt-layers/).

## Running the Playground

The `.playground/` directory contains a demo application that showcases all components and serves as a development environment.

```sh
# Install dependencies
bun install        # or: npm install

# Start the dev server
bun run dev        # or: npm run dev
```

The playground will be available at `http://localhost:3000` and includes the following pages:

| Route | Description |
|---|---|
| `/` | Home page with KPI cards and overview |
| `/info` | Information page |
| `/grafiken` | Charts section with sidebar navigation |
| `/grafiken/42` | Example sub-page |
| `/grafiken/primzahlen` | Example sub-page |
| `/grafiken/motivation` | Example sub-page |
| `/grafiken/kaffeepausen` | Example sub-page |
| `/grafiken/zahlensysteme` | Example sub-page |
| `/grafiken/sechs-sieben` | Example sub-page |

### Other scripts

```sh
bun run build       # Build the playground for production
bun run generate    # Generate a static site
bun run preview     # Preview the production build
```

## Design System and Storybook

This layer builds upon the official **Digital Design System by Kanton Basel-Stadt**. The designsystem provides all CSS, Tailwind configuration, and icons via an unplugin -- but intentionally does not provide framework-specific components (see [designsystem README](https://github.com/kanton-basel-stadt/designsystem#purpose-and-idea)). This layer fills that gap by providing **Vue 3 component implementations** of the design system patterns.

When building or modifying components, always refer to the Storybook instance for the correct markup, class names, and design patterns:

- **Storybook**: [kanton-basel-stadt.github.io/storybook](https://kanton-basel-stadt.github.io/storybook)
- **Design System repository**: [github.com/kanton-basel-stadt/designsystem](https://github.com/kanton-basel-stadt/designsystem)

The components in this layer follow the Storybook markup as closely as possible, but are extended for dashboard-specific use cases (e.g., `KPICard`, `NavLinks`, `Table` with alternate mobile stacking).

## Background

Many of the components in this layer are inspired by dashboards originally built with [R Shiny](https://shiny.posit.co/) at the Statistisches Amt Basel-Stadt. A key example is the [Dashboard Haeusliche Gewalt](https://statistik.bs.ch/haeusliche-gewalt/), which visualizes data on domestic violence in the canton.

This Nuxt layer enables the same dashboard patterns to be built as modern, server-rendered web applications while maintaining the established look and feel from the design system.

A documentation on how to build dashboards in R Shiny will follow soon.

## Related Projects and Links

| Resource | Link |
|---|---|
| Design System (unplugin) | [github.com/kanton-basel-stadt/designsystem](https://github.com/kanton-basel-stadt/designsystem) |
| Storybook | [kanton-basel-stadt.github.io/storybook](https://kanton-basel-stadt.github.io/storybook) |
| DCC-BS Nuxt Layers | [github.com/DCC-BS/nuxt-layers](https://github.com/DCC-BS/nuxt-layers) |
| DCC-BS Development Guidelines | [dcc-bs.github.io/documentation](https://dcc-bs.github.io/documentation/) |
| Basel-Stadt Open Data | [data.bs.ch](https://data.bs.ch) |
| Dashboard Haeusliche Gewalt | [statistik.bs.ch/haeusliche-gewalt](https://statistik.bs.ch/haeusliche-gewalt/) |

## License

This project is licensed under the **GPL-3.0 License** -- see the [LICENSE](LICENSE) file for details.

This is required because the project builds upon [`@kanton-basel-stadt/designsystem`](https://github.com/kanton-basel-stadt/designsystem), which is licensed under GPL-3.0. As a combined work, this layer must use a GPL-3.0-compatible license.

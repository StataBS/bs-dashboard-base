# bs-dashboard-base

> **Repository**: [github.com/StatA-BS/bs-dashboard-base](https://github.com/StatA-BS/bs-dashboard-base)

A [Nuxt Layer](https://nuxt.com/docs/guide/going-further/layers) providing reusable dashboard components, layouts, and styling for Kanton Basel-Stadt, built on top of the official [Digital Design System](https://github.com/kanton-basel-stadt/designsystem).

This layer is intended to be used in dashboard projects at the [Statistisches Amt Basel-Stadt](https://www.statistik.bs.ch). It follows the development guidelines of the [Data Competence Center Basel-Stadt (DCC-BS)](https://dcc-bs.github.io/documentation/) and is designed to work alongside the [DCC-BS Nuxt Layers](https://github.com/DCC-BS/nuxt-layers).

## What is a Nuxt Layer?

Nuxt Layers allow you to share and reuse partial Nuxt applications (components, layouts, composables, plugins, configuration) across multiple projects. When you extend a layer, Nuxt automatically scans and integrates its directories into your application. Your project files always take priority over layer files, so you can override any component or layout locally.

For more background, see the [Nuxt Layers documentation](https://nuxt.com/docs/guide/going-further/layers) and the [DCC-BS Nuxt Layers guide](https://dcc-bs.github.io/documentation/nuxt-layers/).

## What This Layer Provides

### Components

| Component | Description |
| --- | --- |
| `Accordion` | Expandable sections with optional links and icons |
| `AppHeader` | Page header with Basel-Stadt logo |
| `Box` | Info box with variants (warning, info, highlight) |
| `BSLogo` | Basel-Stadt logo with Baselstab icon |
| `Contact` | Contact card with name, phone, and email |
| `DatePicker` | Date picker with v-calendar, DD.MM.YYYY format, and event indicators |
| `FeedbackControl` | Feedback form provided by the DCC-BS feedback-control layer |
| `IconDownload` | Animated SVG download icon |
| `KPICard` | Key performance indicator card with title, description, and value |
| `LinkItem` | Link with automatic icon detection (internal/external/download) |
| `NavBar` | Sticky navigation bar with scroll-based show/hide |
| `NavLinks` | Sidebar navigation for sub-sections |
| `SiteFooter` | Footer with feedback control, links, and copyright |
| `Table` | Data table with mobile stacking and scoped slots |
| `TableOfContents` | Reusable table of contents with responsive columns and sticky mode |
| `Tabs` | Tab component with v-model support |

### Layout

- **`default`** -- Default layout with `AppHeader`, `NavBar`, main content slot, and `SiteFooter`.

### Composables

- **`useBsApi`** -- Composable for fetching datasets from the [Basel-Stadt Open Data API](https://data.bs.ch).

### Styling

- Tailwind CSS integration via the `@kanton-basel-stadt/designsystem` unplugin
- Tailwind content scanning includes both layer files and consuming app files (`app`, `pages`, `components`, `layouts`, `composables`, `plugins`)
- Guaranteed utility safelist for `text-primary-*`, `bg-primary-*`, and `border-primary-*` shades
- 20+ component-specific CSS files in `app/assets/css/components/`

### Plugins

- **v-calendar** -- Client-side plugin for `VDatePicker` and `VCalendar` components

## Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) v20 or later
- A package manager -- [bun](https://bun.sh/) is recommended (following [DCC-BS conventions](https://dcc-bs.github.io/documentation/)), but npm, yarn, and pnpm work as well

### 1. Extend the Layer

Add the layer to your project's `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  extends: [
    ['github:StatA-BS/bs-dashboard-base', { install: true }],
  ],
})
```

The `{ install: true }` flag tells Nuxt to automatically install the layer's dependencies when cloning.

### 2. Use Layer Features

All components, layouts, composables, and plugins are available immediately -- no imports needed. For example:

```vue
<template>
  <KPICard title="Gesamtbevölkerung" description="Basel-Stadt" value="210'529" />
</template>
```

The `default` layout (with `AppHeader`, `NavBar`, and `SiteFooter`) is applied automatically.

### Component Examples

#### `Table` mobile behavior controls

```vue
<script setup lang="ts">
const columns = [
  { key: 'name', label: 'Name' },
  { key: 'value', label: 'Wert' },
]

const rows = [
  { name: 'Basel-Stadt', value: '210529' },
]
</script>

<template>
  <Table
    :columns="columns"
    :rows="rows"
    mobile-stack-style="compact"
    :mobile-show-head-labels="false"
    :mobile-cell-separators="false"
    :mobile-row-separators="false"
  />
</template>
```

`Table` props for mobile configuration:

- `mobile` (`boolean`, default `true`)
- `mobileShowHeadLabels` (`boolean`, default `true`)
- `mobileCellSeparators` (`boolean`, default `true`)
- `mobileRowSeparators` (`boolean`, default `true`)
- `mobileStackStyle` (`'default' | 'compact' | 'none'`, default `'default'`)

#### `TableOfContents`

```vue
<script setup lang="ts">
const tocItems = [
  { label: 'Einleitung', to: '#einleitung' },
  { label: 'Methodik', to: '#methodik' },
  { label: 'Resultate', to: '#resultate' },
]
</script>

<template>
  <TableOfContents
    :items="tocItems"
    :columns-by-breakpoint="{ base: 1, md: 2, lg: 3 }"
    :sticky="true"
    spacing="compact"
    color-variant="neutral"
  />
</template>
```

### Combining with DCC-BS Nuxt Layers

This layer is designed to work alongside the [DCC-BS Nuxt Layers](https://github.com/DCC-BS/nuxt-layers) for authentication, backend communication, health checks, logging, and feedback. A typical dashboard `nuxt.config.ts` might look like this:

```ts
export default defineNuxtConfig({
  extends: [
    ['github:StatA-BS/bs-dashboard-base', { install: true }],
    ['github:DCC-BS/nuxt-layers/auth', { install: true }],
    ['github:DCC-BS/nuxt-layers/health_check', { install: true }],
    ['github:DCC-BS/nuxt-layers/backend_communication', { install: true }],
    ['github:DCC-BS/nuxt-layers/logger', { install: true }],
    ['github:DCC-BS/nuxt-layers/feedback-control', { install: true }],
  ],
})
```

For details on configuring the DCC-BS layers (environment variables, auth switching, etc.), see the [DCC-BS Nuxt Layers documentation](https://dcc-bs.github.io/documentation/nuxt-layers/).

### Environment Configuration

Set the GitHub token for the feedback control integration as an environment variable:

```sh
GITHUB_TOKEN=ghp_xxxxxxxxxxxx
```

Then configure your `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  extends: [
    ['github:StatA-BS/bs-dashboard-base', { install: true }],
  ],

  runtimeConfig: {
    feedback: {
      repo: 'Feedback_your-project',
      repoOwner: 'YourGitHubOrg',
      project: 'your-project-name',
      githubToken: process.env.GITHUB_TOKEN || '',
    },
  },
})
```

You can then access these values in your app with:

```ts
const config = useRuntimeConfig()
console.log(config.feedback.githubToken)
console.log(config.feedback.repo)
// ...
```

See the [Nuxt runtimeConfig docs](https://nuxt.com/docs/guide/essentials/runtime-config) for more details.

## Development

### Repository Structure

```text
bs-dashboard-base/
├── app/
│   ├── components/       # Vue components (auto-imported)
│   ├── composables/      # Composables (auto-imported)
│   ├── layouts/          # Nuxt layouts
│   ├── plugins/          # Nuxt plugins
│   └── assets/css/       # Tailwind + component CSS
├── .playground/          # Development playground app
├── nuxt.config.ts        # Layer configuration
├── postcss.config.js     # PostCSS configuration
└── package.json
```

### Running the Playground

The `.playground/` directory contains a demo application that showcases all components and serves as a development environment.

```sh
# Clone the repository
git clone https://github.com/StatA-BS/bs-dashboard-base.git
cd bs-dashboard-base

# Install dependencies
bun install

# Start the dev server
bun run dev
```

The playground will be available at `http://localhost:3000` and includes the following pages:

| Route | Description |
| --- | --- |
| `/` | Home page with KPI cards and overview |
| `/info` | Information page |
| `/grafiken` | Charts section with sidebar navigation |
| `/grafiken/42` | Example sub-page |
| `/grafiken/primzahlen` | Example sub-page |
| `/grafiken/motivation` | Example sub-page |
| `/grafiken/kaffeepausen` | Example sub-page |
| `/grafiken/zahlensysteme` | Example sub-page |
| `/grafiken/sechs-sieben` | Example sub-page |

### Other Scripts

```sh
bun run build       # Build the playground for production
bun run generate    # Generate a static site
bun run preview     # Preview the production build
```

## Design System and Storybook

This layer builds upon the official **Digital Design System by Kanton Basel-Stadt**. The design system provides all CSS, Tailwind configuration, and icons via an unplugin -- but intentionally does not provide framework-specific components (see [designsystem README](https://github.com/kanton-basel-stadt/designsystem#purpose-and-idea)). This layer fills that gap by providing **Vue 3 component implementations** of the design system patterns.

When building or modifying components, refer to the Storybook instance for the correct markup, class names, and design patterns:

- **Storybook**: [kanton-basel-stadt.github.io/storybook](https://kanton-basel-stadt.github.io/storybook)
- **Design System repository**: [github.com/kanton-basel-stadt/designsystem](https://github.com/kanton-basel-stadt/designsystem)

The components in this layer follow the Storybook markup as closely as possible, but are extended for dashboard-specific use cases (e.g., `KPICard`, `NavLinks`, `Table` with alternate mobile stacking).

## Background

Many of the components in this layer are inspired by dashboards originally built with [R Shiny](https://shiny.posit.co/) at the Statistisches Amt Basel-Stadt. A key example is the [Dashboard Haeusliche Gewalt](https://statistik.bs.ch/haeusliche-gewalt/), which visualizes data on domestic violence in the canton.

This Nuxt layer enables the same dashboard patterns to be built as modern, server-rendered web applications while maintaining the established look and feel from the design system.

## Related Projects and Links

| Resource | Link |
| --- | --- |
| Design System (unplugin) | [github.com/kanton-basel-stadt/designsystem](https://github.com/kanton-basel-stadt/designsystem) |
| Storybook | [kanton-basel-stadt.github.io/storybook](https://kanton-basel-stadt.github.io/storybook) |
| DCC-BS Nuxt Layers | [github.com/DCC-BS/nuxt-layers](https://github.com/DCC-BS/nuxt-layers) |
| DCC-BS Development Guidelines | [dcc-bs.github.io/documentation](https://dcc-bs.github.io/documentation/) |
| Basel-Stadt Open Data | [data.bs.ch](https://data.bs.ch) |
| Dashboard Haeusliche Gewalt | [statistik.bs.ch/haeusliche-gewalt](https://statistik.bs.ch/haeusliche-gewalt/) |

## License

This project is licensed under the **GPL-3.0 License** -- see the [LICENSE](LICENSE) file for details.

This is required because the project builds upon [`@kanton-basel-stadt/designsystem`](https://github.com/kanton-basel-stadt/designsystem), which is licensed under GPL-3.0. As a combined work, this layer must use a GPL-3.0-compatible license.

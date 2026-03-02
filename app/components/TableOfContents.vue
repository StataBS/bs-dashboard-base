<script setup lang="ts">
import { computed } from 'vue'

type TocItem = {
  label: string
  to: string
  exact?: boolean
  external?: boolean
}

type ColumnsByBreakpoint = {
  base?: 1 | 2 | 3
  md?: 1 | 2 | 3
  lg?: 1 | 2 | 3
  xl?: 1 | 2 | 3
}

const props = withDefaults(defineProps<{
  items: TocItem[]
  columnsByBreakpoint?: ColumnsByBreakpoint
  sticky?: boolean
  fullBleed?: boolean
  spacing?: 'default' | 'compact'
  colorVariant?: 'primary' | 'neutral'
  ariaLabel?: string
}>(), {
  columnsByBreakpoint: () => ({ base: 1, md: 2, lg: 3 }),
  sticky: false,
  fullBleed: false,
  spacing: 'default',
  colorVariant: 'primary',
  ariaLabel: 'Inhaltsverzeichnis',
})

const isNavBarVisible = useState('headerVisible', () => true)
const navBarHeight = useState('headerHeight', () => 0)

const stickyTop = computed(() => {
  if (isNavBarVisible.value)
    return `${navBarHeight.value + 15}px`
  return '15px'
})

const columns = computed(() => ({
  base: props.columnsByBreakpoint.base ?? 1,
  md: props.columnsByBreakpoint.md ?? props.columnsByBreakpoint.base ?? 1,
  lg: props.columnsByBreakpoint.lg ?? props.columnsByBreakpoint.md ?? props.columnsByBreakpoint.base ?? 1,
  xl: props.columnsByBreakpoint.xl ?? props.columnsByBreakpoint.lg ?? props.columnsByBreakpoint.md ?? props.columnsByBreakpoint.base ?? 1,
}))

const baseColumnClassMap: Record<1 | 2 | 3, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
}
const mdColumnClassMap: Record<1 | 2 | 3, string> = {
  1: 'md:grid-cols-1',
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
}
const lgColumnClassMap: Record<1 | 2 | 3, string> = {
  1: 'lg:grid-cols-1',
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
}
const xlColumnClassMap: Record<1 | 2 | 3, string> = {
  1: 'xl:grid-cols-1',
  2: 'xl:grid-cols-2',
  3: 'xl:grid-cols-3',
}

const columnClasses = computed(() => [
  baseColumnClassMap[columns.value.base],
  mdColumnClassMap[columns.value.md],
  lgColumnClassMap[columns.value.lg],
  xlColumnClassMap[columns.value.xl],
])
</script>

<template>
  <nav
    class="table-of-contents"
    :class="[
      `table-of-contents--${spacing}`,
      `table-of-contents--${colorVariant}`,
      { 'table-of-contents--sticky': sticky, 'table-of-contents--full-bleed': fullBleed },
    ]"
    :style="sticky ? { top: stickyTop } : {}"
    :aria-label="ariaLabel"
  >
    <ul :class="['table-of-contents__list', ...columnClasses]">
      <li
        v-for="item in items"
        :key="`${item.label}-${item.to}`"
        class="table-of-contents__item"
      >
        <NuxtLink
          :to="item.to"
          :external="item.external"
          class="table-of-contents__link"
          active-class="table-of-contents__link--active"
          :exact-active-class="item.exact ? 'table-of-contents__link--active' : ''"
        >
          {{ item.label }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

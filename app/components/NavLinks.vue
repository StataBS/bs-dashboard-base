<script setup lang="ts">
import { computed } from 'vue'

const route = useRoute()

const sections = [
  { to: '/grafiken', label: 'Übersicht' },
  { to: '/grafiken/42', label: 'Die Antwort' },
  { to: '/grafiken/primzahlen', label: 'Primzahlen' },
  { to: '/grafiken/zahlensysteme', label: 'Zahlensysteme' },
  { to: '/grafiken/kaffeepausen', label: 'Kaffeepausen' },
  { to: '/grafiken/motivation', label: 'Montags-Motivation' },
  { to: '/grafiken/sechs-sieben', label: '6-7 Meme' },
]

// Read shared NavBar state to position sticky elements below it
const isNavBarVisible = useState('headerVisible', () => true)
const navBarHeight = useState('headerHeight', () => 0)

const stickyTop = computed(() => {
  if (isNavBarVisible.value) {
    return `${navBarHeight.value + 15}px`
  }
  return '15px'
})
</script>

<template>
  <!--
    Mobile: display:contents makes the links direct layout children of the
    parent flex container, so the active link can stick within the full page height.
    Desktop (xl+): the nav is a proper sticky sidebar column.
  -->
  <nav
    class="sidebar-nav"
    :style="{ top: stickyTop }"
    aria-label="Grafiken-Navigation"
  >
    <NuxtLink
      v-for="section in sections"
      :key="section.to"
      :to="section.to"
      class="sidebar-link"
      :class="{
        'sidebar-link--exact': route.path === section.to,
        'sidebar-link--active-sticky': route.path === section.to,
      }"
      :style="route.path === section.to ? { top: stickyTop } : {}"
      active-class=""
      exact-active-class=""
    >
      {{ section.label }}
    </NuxtLink>
  </nav>
</template>

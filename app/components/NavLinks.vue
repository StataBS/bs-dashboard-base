<script setup lang="ts">
import { computed, ref, watch, onMounted, onUnmounted } from 'vue'
import IconSymbolCaret from '@kanton-basel-stadt/designsystem/icons/symbol/caret'

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

const isNavBarVisible = useState('headerVisible', () => true)
const navBarHeight = useState('headerHeight', () => 0)

/** Sticky offset: below main nav when visible; flush to viewport top when it hides on scroll. */
const stickyTopStyle = computed(() => {
  if (isNavBarVisible.value)
    return `${navBarHeight.value + 15}px`
  return '0px'
})
const isPinnedToTop = computed(() => !isNavBarVisible.value)

const dropdownOpen = ref(false)
const dropdownRoot = ref<HTMLElement | null>(null)

const currentLabel = computed(() => {
  const match = sections.find(s => s.to === route.path)
  return match?.label ?? 'Abschnitt wählen'
})

watch(() => route.path, () => {
  dropdownOpen.value = false
})

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value
}

function onDocPointerDown(ev: MouseEvent | TouchEvent) {
  if (!dropdownOpen.value || !dropdownRoot.value)
    return
  const target = ev.target as Node
  if (!dropdownRoot.value.contains(target))
    dropdownOpen.value = false
}

function onKeydown(ev: KeyboardEvent) {
  if (ev.key === 'Escape')
    dropdownOpen.value = false
}

onMounted(() => {
  document.addEventListener('pointerdown', onDocPointerDown, true)
  document.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  document.removeEventListener('pointerdown', onDocPointerDown, true)
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <!-- Narrow: DDS-style dropdown (form-elements/dropdown), sticky below main nav -->
  <div
    ref="dropdownRoot"
    :class="['nav-links-dropdown-root', { 'nav-links-dropdown-root--at-top': isPinnedToTop }]"
    :style="{ top: stickyTopStyle }"
  >
    <div
      class="nav-links-dropdown"
      :data-expanded="dropdownOpen"
    >
      <button
        id="nav-links-dropdown-button"
        type="button"
        class="nav-links-dropdown__trigger"
        :aria-expanded="dropdownOpen"
        aria-controls="nav-links-dropdown-panel"
        aria-haspopup="listbox"
        @click.stop="toggleDropdown"
      >
        <span class="min-w-0 truncate text-left">{{ currentLabel }}</span>
        <component
          :is="IconSymbolCaret"
          aria-hidden="true"
          class="nav-links-dropdown__caret"
          :class="{ 'nav-links-dropdown__caret--open': dropdownOpen }"
        />
      </button>

      <ul
        v-show="dropdownOpen"
        id="nav-links-dropdown-panel"
        class="nav-links-dropdown__panel"
        role="listbox"
        aria-labelledby="nav-links-dropdown-button"
      >
        <li
          v-for="section in sections"
          :key="section.to"
          role="none"
          class="nav-links-dropdown__item"
        >
          <NuxtLink
            :to="section.to"
            class="nav-links-dropdown__link dropdown-option"
            :class="{ 'nav-links-dropdown__link--current': route.path === section.to }"
            role="option"
            :aria-selected="route.path === section.to"
            active-class=""
            exact-active-class=""
            @click="dropdownOpen = false"
          >
            {{ section.label }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>

  <!-- Wide (≥1580px): sidebar links -->
  <nav
    class="sidebar-nav"
    :style="{ top: stickyTopStyle }"
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
      :style="route.path === section.to ? { top: stickyTopStyle } : {}"
      active-class=""
      exact-active-class=""
    >
      {{ section.label }}
    </NuxtLink>
  </nav>
</template>

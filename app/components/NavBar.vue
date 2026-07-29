<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'

const route = useRoute()
const { dashboard } = useAppConfig()

const isNavBarVisible = useState('headerVisible', () => true)
const navBarHeight = useState('headerHeight', () => 0)

const navBarEl = ref<HTMLElement | null>(null)
const navItems = computed(() => dashboard?.navItems ?? [])

let lastScrollY = 0
let ticking = false

function isItemActive(item: { to: string; exact?: boolean; matchPrefix?: boolean }) {
  if (item.matchPrefix) {
    return route.path === item.to || route.path.startsWith(`${item.to}/`)
  }
  if (item.exact) {
    return route.path === item.to || route.path === `${item.to}/`
  }
  return route.path === item.to || route.path.startsWith(`${item.to}/`)
}

function onScroll() {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const currentScrollY = window.scrollY

      if (currentScrollY <= 0) {
        isNavBarVisible.value = true
      } else if (currentScrollY > lastScrollY && currentScrollY > 300) {
        isNavBarVisible.value = false
      } else if (currentScrollY < lastScrollY) {
        isNavBarVisible.value = true
      }

      lastScrollY = currentScrollY
      ticking = false
    })
    ticking = true
  }
}

onMounted(async () => {
  window.addEventListener('scroll', onScroll, { passive: true })

  await nextTick()
  if (navBarEl.value) {
    navBarHeight.value = navBarEl.value.offsetHeight
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <div
    v-if="navItems.length"
    ref="navBarEl"
    class="sticky-navbar"
    :class="{ 'sticky-navbar--hidden': !isNavBarVisible }"
  >
    <div class="bg-green-100">
      <nav class="container flex items-stretch" aria-label="Hauptnavigation">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="nav-link"
          :class="{ 'is-active': isItemActive(item) }"
          active-class=""
          exact-active-class=""
          :aria-current="isItemActive(item) ? 'page' : undefined"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>
    </div>
  </div>
</template>

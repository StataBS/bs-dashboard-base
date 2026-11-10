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
let anchorJumping = false
let anchorJumpTimer: ReturnType<typeof setTimeout> | undefined

function isItemActive(item: { to: string; exact?: boolean; matchPrefix?: boolean }) {
  if (item.matchPrefix) {
    return route.path === item.to || route.path.startsWith(`${item.to}/`)
  }
  if (item.exact) {
    return route.path === item.to || route.path === `${item.to}/`
  }
  return route.path === item.to || route.path.startsWith(`${item.to}/`)
}

/** An anchor jump ends once scrolling has been idle for `ms`; the router may start the (smooth) scroll with a delay. */
function extendAnchorJump(ms: number) {
  clearTimeout(anchorJumpTimer)
  anchorJumpTimer = setTimeout(() => {
    anchorJumping = false
  }, ms)
}

function onScroll() {
  if (anchorJumping) extendAnchorJump(200)
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const currentScrollY = window.scrollY

      if (anchorJumping) {
        isNavBarVisible.value = currentScrollY <= 0
      } else if (currentScrollY <= 0) {
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

/** Keeps the navbar hidden during same-page anchor jumps, also upwards, so it never covers the target. */
function onAnchorClick(event: MouseEvent) {
  const link = (event.target as Element | null)?.closest?.('a[href*="#"]') as HTMLAnchorElement | null
  if (!link?.hash || link.pathname !== window.location.pathname) return
  anchorJumping = true
  extendAnchorJump(1500)
  isNavBarVisible.value = false
}

onMounted(async () => {
  window.addEventListener('scroll', onScroll, { passive: true })
  document.addEventListener('click', onAnchorClick, { capture: true })

  await nextTick()
  if (navBarEl.value) {
    navBarHeight.value = navBarEl.value.offsetHeight
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  document.removeEventListener('click', onAnchorClick, { capture: true })
  clearTimeout(anchorJumpTimer)
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

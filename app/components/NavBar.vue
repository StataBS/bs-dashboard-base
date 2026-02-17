<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

// Shared state so sidebar NavLinks can position below the sticky NavBar
const isNavBarVisible = useState('headerVisible', () => true)
const navBarHeight = useState('headerHeight', () => 0)

const navBarEl = ref<HTMLElement | null>(null)

let lastScrollY = 0
let ticking = false

function onScroll() {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const currentScrollY = window.scrollY

      if (currentScrollY <= 0) {
        isNavBarVisible.value = true
      } else if (currentScrollY > lastScrollY && currentScrollY > 300) {
        // Scrolling down past threshold — hide
        isNavBarVisible.value = false
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up — show
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
    ref="navBarEl"
    class="sticky-navbar"
    :class="{ 'sticky-navbar--hidden': !isNavBarVisible }"
  >
    <div class="bg-green-100">
      <nav class="container flex items-stretch" aria-label="Hauptnavigation">
        <NuxtLink to="/" class="nav-link" exact-active-class="is-active">Start</NuxtLink>
        <NuxtLink to="/grafiken" class="nav-link" active-class="is-active">Grafiken</NuxtLink>
        <NuxtLink to="/info" class="nav-link" active-class="is-active">Info</NuxtLink>
      </nav>
    </div>
  </div>
</template>

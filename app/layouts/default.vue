<script setup lang="ts">
const { dashboard } = useAppConfig()
</script>

<template>
  <div>
    <AppHeader />
    <NavBar v-if="dashboard?.showNavBar !== false" />
    <main class="container py-30 lg:py-50">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>

<!-- layouts/default.vue -->
<template>
  <div>
    <AppHeader />
    <NavBar />
    <main class="container py-30 lg:py-50">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>

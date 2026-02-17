<template>
  <div>
    <div class="grafiken-layout">
      <NavLinks />

      <!-- Content area -->
      <div class="content-area">
        <NuxtPage />
      </div>
    </div>
  </div>
</template>

<style scoped>
.grafiken-layout {
  @apply flex flex-col;
}

.content-area {
  @apply flex-1 min-w-0 mt-20;
}

/* Side-by-side only when NavLinks fits to the left of the container */
@media (min-width: 1580px) {
  .grafiken-layout {
    @apply flex-row gap-30;
    margin-left: -250px; /* 220px nav + 30px gap */
  }

  .content-area {
    @apply mt-0;
  }
}
</style>

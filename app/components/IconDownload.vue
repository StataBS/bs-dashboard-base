<template>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" v-bind="$attrs">
    <!-- Horizontal line at bottom — stays still -->
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 16.667h10" />
    <!-- Arrow stem + chevron — animates -->
    <g class="download-arrow">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 3.333v10m0 0 2.917-2.916M10 13.333l-2.917-2.916" />
    </g>
  </svg>
</template>

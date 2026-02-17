<script setup lang="ts">
import IconSymbolBaselstab from '@kanton-basel-stadt/designsystem/icons/symbol/baselstab'
const props = withDefaults(defineProps<{
  href: string
  targetBlank?: boolean
  ariaLabel?: string
}>(), {
  targetBlank: true,
  ariaLabel: 'Logo - Kanton Basel-Stadt',
})
</script>

<template>
  <a
      :href="href"
      :target="targetBlank ? '_blank' : undefined"
      :aria-label="ariaLabel"
      class="inline-block hover:opacity-80 no-underline"
  >
    <div class="flex whitespace-nowrap leading-none relative text-base lg:text-lg xl:text-2xl">
      <IconSymbolBaselstab
          data-symbol="baselstab"
          aria-hidden="true"
          class="mt-[0.18em] text-[0.59em] w-[1em] h-[1.7em]"
      />
      <span
          class="h-[1.2083em] ml-[0.3em] pl-[0.25em] leading-[1.2em] border-l border-gray-900 font-bold"
      >
        <span class="sr-only">Herausgeber/Éditeur/Editore/Publisher:</span>
        Kanton Basel-Stadt
      </span>
    </div>
  </a>
</template>

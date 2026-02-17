<script setup lang="ts">
import { computed } from 'vue'
import IconDownload from './IconDownload.vue'

export type LinkIconType = 'auto' | 'internal' | 'external' | 'download'

const props = withDefaults(defineProps<{
  href: string
  title?: string
  description?: string
  icon?: LinkIconType
  inverted?: boolean
}>(), {
  icon: 'auto',
  inverted: false,
})

const isExternal = computed(() => {
  if (props.href.startsWith('http')) return true
  if (props.icon === 'external') return true
  return false
})

const isDownload = computed(() => {
  if (props.icon === 'download') return true
  return /\.(pdf|docx|qdf)(\?|#|$)/i.test(props.href)
})
</script>

<template>
  <a
    :href="href"
    class="link with-icon lg:text-lg"
    :class="{ 'is-inverted': inverted, 'link--download-icon': isDownload }"
    :target="isExternal ? '_blank' : undefined"
    :rel="isExternal ? 'noopener noreferrer' : undefined"
  >
    <component
      v-if="isDownload"
      :is="IconDownload"
      data-symbol="download"
      aria-hidden="true"
      class="col-start-1 row-start-1 w-[1em] h-[1em]"
    />
    <span class="hyphens-auto font-bold" style="grid-column: 2">
      <slot>{{ title }}</slot>
    </span>
    <p
      v-if="description"
      class="col-start-2 row-start-2 mt-5 hyphens-auto text-base font-normal"
    >
      {{ description }}
    </p>
  </a>
</template>

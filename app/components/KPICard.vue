<script setup lang="ts">
import Sparkline from './Sparkline.vue'

const props = defineProps<{
  title: string
  description?: string
  value: string | number
  href?: string
  to?: string
  sparkline?: number[]
  sparklineColor?: string
  sparklineLabelLeft?: string
  sparklineLabelRight?: string
}>()

const tag = computed(() => {
  if (props.to) return resolveComponent('NuxtLink')
  if (props.href) return 'a'
  return 'div'
})

const linkAttrs = computed(() => {
  if (props.to) return { to: props.to }
  if (props.href) return { href: props.href, target: '_blank', rel: 'noopener noreferrer' }
  return {}
})

const hasSparkline = computed(
  () => Array.isArray(props.sparkline) && props.sparkline.length >= 2,
)
</script>

<template>
  <component
    :is="tag"
    v-bind="linkAttrs"
    :class="['kpi-card', { 'kpi-card--clickable': href || to }]"
  >
    <div class="kpi-card__intro">
      <strong class="text-base font-bold">{{ title }}</strong>
      <p v-if="description" class="text-xs mt-5">{{ description }}</p>
    </div>
    <p class="kpi-card__value">{{ value }}</p>
    <div
      v-if="hasSparkline"
      class="kpi-card__sparkline"
    >
      <Sparkline
        :values="sparkline!"
        :color="sparklineColor"
        :label-left="sparklineLabelLeft"
        :label-right="sparklineLabelRight"
      />
    </div>
  </component>
</template>

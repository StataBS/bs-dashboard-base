<script setup lang="ts">
import { useSlots, computed } from 'vue'
import IconSymbolHinweiseNoRounded from '@kanton-basel-stadt/designsystem/icons/symbol/hinweise_no_rounded'

const slots = useSlots()

const props = withDefaults(defineProps<{
  title: string
  titleAddon?: string | null
  variant?: 'warning' | 'info' | 'highlight'
  hideWhenEmpty?: boolean
}>(), {
  titleAddon: null,
  variant: 'info',
  hideWhenEmpty: true,
})

const hasContent = computed(() => !!slots.default)
</script>

<template>
  <div
      v-if="!hideWhenEmpty || hasContent"
      :class="[
      'box',
      variant === 'warning' ? 'box--warning'
      : variant === 'highlight' ? 'box--highlight'
      : 'box--info'
    ]"
  >
    <div class="box__icon" aria-hidden="true">
      <slot name="icon">
        <IconSymbolHinweiseNoRounded
            :class="variant === 'warning' ? 'rotate-180' : ''"
        />
      </slot>
    </div>
    <!-- Title row -->
    <div class="box__header">
      <strong class="box__title">{{ title }}</strong>
      <span v-if="titleAddon" class="box__addon">({{ titleAddon }})</span>
    </div>

    <!-- Body -->
    <div class="box__content">
      <slot />
    </div>
  </div>
</template>

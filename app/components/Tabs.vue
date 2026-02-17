<script setup lang="ts">
export interface TabItem {
  label: string
  value: string
  slot?: string
}

const props = withDefaults(defineProps<{
  items: TabItem[]
  modelValue?: string
}>(), {
  modelValue: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

function selectTab(value: string) {
  emit('update:modelValue', value)
}
</script>

<template>
  <div class="tabs">
    <div class="tabs__list">
      <button
        v-for="item in items"
        :key="item.value"
        type="button"
        :class="['tabs__trigger', { 'tabs__trigger--active': modelValue === item.value }]"
        @click="selectTab(item.value)"
      >
        {{ item.label }}
      </button>
    </div>

    <div class="tabs__content">
      <slot />
    </div>
  </div>
</template>

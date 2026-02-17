<script setup lang="ts">
import { ref } from 'vue'
import IconSymbolCaret from '@kanton-basel-stadt/designsystem/icons/symbol/caret'
export interface AccordionLink {
  title: string
  description?: string
  href: string
  icon?: 'auto' | 'internal' | 'external' | 'download'
}

export interface AccordionItem {
  title: string
  content: string
  links?: AccordionLink[]
}

const props = defineProps<{
  items: AccordionItem[]
}>()

const openItems = ref<Set<number>>(new Set())

function toggle(index: number) {
  const newSet = new Set(openItems.value)
  if (newSet.has(index)) {
    newSet.delete(index)
  } else {
    newSet.add(index)
  }
  openItems.value = newSet
}

function isOpen(index: number): boolean {
  return openItems.value.has(index)
}
</script>

<template>
  <div class="grid gap-10 md:gap-15 grid-cols-1 items-start">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="accordion-item"
    >
      <h3 class="accordion-header">
        <button
          type="button"
          class="accordion-trigger"
          :aria-expanded="isOpen(index)"
          :aria-controls="`accordion-content-${index}`"
          @click="toggle(index)"
        >
          <span>{{ item.title }}</span>
          <component
            :is="IconSymbolCaret"
            aria-hidden="true"
            class="accordion-caret"
            :class="{ 'accordion-caret--open': isOpen(index) }"
          />
        </button>
      </h3>

      <div
        v-show="isOpen(index)"
        :id="`accordion-content-${index}`"
        role="region"
        :aria-labelledby="`accordion-toggle-${index}`"
      >
        <div class="p-10 md:p-20">
          <div class="mb-20">
            {{ item.content }}
          </div>

          <div v-if="item.links?.length" class="grid gap-5">
            <LinkItem
              v-for="(link, linkIndex) in item.links"
              :key="linkIndex"
              :href="link.href"
              :title="link.title"
              :description="link.description"
              :icon="link.icon ?? 'auto'"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

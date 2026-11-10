<script setup lang="ts">
type OnThisPageItem = {
  label: string
  /** Element id of the target section, without `#`. */
  id: string
}

defineOptions({ inheritAttrs: false })

withDefaults(defineProps<{
  items: OnThisPageItem[]
  title?: string
  id?: string
  sticky?: boolean
}>(), {
  title: 'Auf dieser Seite',
  id: 'table-of-contents',
  sticky: true,
})
</script>

<!-- Two root nodes: the sticky bar must be a sibling of the page content so `bottom-0` can pin it while the list is still below the fold. -->
<template>
  <div
    v-if="items.length"
    class="on-this-page__bar"
    :class="{ 'on-this-page__bar--sticky': sticky }"
  >
    <a
      :href="`#${id}`"
      class="on-this-page__bar-link pre-heading container"
    >
      {{ title }}
    </a>
  </div>
  <div
    v-if="items.length"
    :id="id"
    v-bind="$attrs"
    class="on-this-page"
  >
    <nav
      class="container"
      :aria-label="title"
    >
      <ul class="on-this-page__list">
        <li
          v-for="item in items"
          :key="item.id"
        >
          <a
            :href="`#${item.id}`"
            class="link with-icon on-this-page__link"
          >
            <span>{{ item.label }}</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

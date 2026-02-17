<script setup lang="ts">
import IconSymbolPhone from '@kanton-basel-stadt/designsystem/icons/symbol/phone'
import IconSymbolMail from '@kanton-basel-stadt/designsystem/icons/symbol/mail'

defineProps<{
  name: string
  description?: string
  phone?: string
  email?: string
}>()
</script>

<template>
  <div class="mt-10">
    <h3 class="font-bold text-lg md:text-xl">{{ name }}</h3>
    <div v-if="description" class="mt-5">
      {{ description }}
    </div>

    <div class="mt-15 flex gap-10 flex-wrap">
      <a
        v-if="phone"
        class="button is-action group/phone"
        :href="`tel:${phone}`"
      >
        <IconSymbolPhone
          aria-hidden="true"
          class="w-20 h-20 transition-transform group-hover/phone:animate-wiggle"
        />
        <span>{{ phone }}</span>
      </a>
      <a
        v-if="email"
        class="button is-action group/mail"
        :href="`mailto:${email}`"
      >
        <IconSymbolMail
          aria-hidden="true"
          class="w-20 h-20 transition-transform group-hover/mail:animate-jump-scale"
        />
        <span>{{ email }}</span>
      </a>
    </div>
  </div>
</template>

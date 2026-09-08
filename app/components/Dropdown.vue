<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, useId, watch } from 'vue'
import IconSymbolCaret from '@kanton-basel-stadt/designsystem/icons/symbol/caret'
import IconSymbolClose from '@kanton-basel-stadt/designsystem/icons/symbol/close'

export type DropdownOption = {
  value: string
  label: string
  disabled?: boolean
}

const model = defineModel<string>({ default: '' })

const props = withDefaults(defineProps<{
  options: Array<string | DropdownOption>
  label?: string
  placeholder?: string
  disabled?: boolean
  clearable?: boolean
  id?: string
  name?: string
}>(), {
  label: '',
  placeholder: 'Bitte wählen',
  disabled: false,
  clearable: true,
})

const autoId = useId()
const selectId = computed(() => props.id || `select-${autoId.replace(/[^a-zA-Z0-9_-]/g, '')}`)

const root = ref<HTMLElement | null>(null)
const expanded = ref(false)
const activeIndex = ref(-1)

const normalizedOptions = computed<DropdownOption[]>(() =>
  props.options.map(option => (
    typeof option === 'string' ? { value: option, label: option } : option
  )),
)

const listOptions = computed<DropdownOption[]>(() => {
  const items = normalizedOptions.value
  if (items.some(item => item.value === ''))
    return items
  return [{ value: '', label: props.placeholder }, ...items]
})

const selectedOption = computed(() =>
  normalizedOptions.value.find(item => item.value === model.value),
)

const displayLabel = computed(() => selectedOption.value?.label ?? props.placeholder)
const isPlaceholder = computed(() => !selectedOption.value)
const canClear = computed(() => props.clearable && !props.disabled && !isPlaceholder.value)

function open() {
  if (props.disabled)
    return
  expanded.value = true
  const selected = listOptions.value.findIndex(item => item.value === model.value)
  activeIndex.value = selected >= 0 ? selected : 0
}

function close() {
  expanded.value = false
  activeIndex.value = -1
}

function toggle() {
  if (expanded.value)
    close()
  else
    open()
}

function selectOption(option: DropdownOption) {
  if (option.disabled)
    return
  model.value = option.value
  close()
}

function clear(event: Event) {
  event.preventDefault()
  event.stopPropagation()
  model.value = ''
  close()
}

function onTriggerKeydown(event: KeyboardEvent) {
  if (props.disabled)
    return

  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault()
    if (!expanded.value)
      open()
    else
      moveActive(event.key === 'ArrowDown' ? 1 : -1)
    return
  }

  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    if (!expanded.value) {
      open()
      return
    }
    const option = listOptions.value[activeIndex.value]
    if (option)
      selectOption(option)
    return
  }

  if (event.key === 'Home' && expanded.value) {
    event.preventDefault()
    activeIndex.value = 0
    return
  }

  if (event.key === 'End' && expanded.value) {
    event.preventDefault()
    activeIndex.value = listOptions.value.length - 1
    return
  }

  if (event.key === 'Escape' && expanded.value) {
    event.preventDefault()
    close()
  }
}

function moveActive(delta: number) {
  const count = listOptions.value.length
  if (!count)
    return
  let next = activeIndex.value
  do {
    next = (next + delta + count) % count
  } while (listOptions.value[next]?.disabled && next !== activeIndex.value)
  activeIndex.value = next
}

function onDocPointerDown(event: PointerEvent) {
  if (!expanded.value || !root.value)
    return
  if (!root.value.contains(event.target as Node))
    close()
}

function onDocKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && expanded.value)
    close()
}

watch(expanded, async (isOpen) => {
  if (!isOpen)
    return
  await nextTick()
  const active = root.value?.querySelector('[data-is-active="true"]')
  if (active instanceof HTMLElement)
    active.scrollIntoView({ block: 'nearest' })
})

onMounted(() => {
  document.addEventListener('pointerdown', onDocPointerDown, true)
  document.addEventListener('keydown', onDocKeydown)
})

onUnmounted(() => {
  document.removeEventListener('pointerdown', onDocPointerDown, true)
  document.removeEventListener('keydown', onDocKeydown)
})
</script>

<template>
  <div
    ref="root"
    class="dropdown"
    data-multiple=""
    :data-expanded="expanded"
    :data-disabled="disabled ? 'true' : undefined"
  >
    <div
      class="dropdown-wrapper"
      :class="{ 'dropdown-wrapper--unlabelled': !label }"
    >
      <label
        v-if="label"
        class="label"
        :for="selectId"
        :id="`${selectId}_label`"
      >
        {{ label }}
      </label>

      <div
        class="dropdown-inner"
        :id="`${selectId}_inner`"
      >
        <button
          class="dropdown-trigger"
          type="button"
          tabindex="0"
          aria-haspopup="listbox"
          :id="selectId"
          :name="name || selectId"
          :aria-expanded="expanded"
          :aria-controls="`${selectId}_listbox`"
          :aria-labelledby="label ? `${selectId}_label` : undefined"
          :disabled="disabled"
          @click="toggle"
          @keydown="onTriggerKeydown"
        >
          <div
            class="dropdown-option"
            :class="{ placeholder: isPlaceholder }"
          >
            {{ displayLabel }}
          </div>
          <span class="dropdown-icons">
            <span
              v-if="canClear"
              class="dropdown-clear"
              role="button"
              aria-label="Auswahl zurücksetzen"
              @pointerdown.stop
              @click="clear"
            >
              <component
                :is="IconSymbolClose"
                aria-hidden="true"
              />
            </span>
            <span
              class="dropdown-caret"
              :class="{ 'dropdown-caret--open': expanded }"
            >
              <component
                :is="IconSymbolCaret"
                aria-hidden="true"
              />
            </span>
          </span>
        </button>

        <div
          v-show="expanded"
          class="dropdown-listbox"
          :id="`${selectId}_popover`"
        >
          <ul
            role="listbox"
            :id="`${selectId}_listbox`"
            :aria-labelledby="label ? `${selectId}_label` : selectId"
          >
            <li
              v-for="(option, index) in listOptions"
              :key="`${option.value}-${index}`"
              class="dropdown-list-item"
              role="option"
              :aria-selected="option.value === model"
              :aria-disabled="option.disabled ? 'true' : undefined"
              :id="`${selectId}_listitem_${index}`"
              :data-value="option.value"
              :data-is-active="index === activeIndex"
              @pointerenter="activeIndex = index"
              @click="selectOption(option)"
            >
              <div class="dropdown-option">
                {{ option.label }}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

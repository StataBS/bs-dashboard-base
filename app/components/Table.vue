<script setup lang="ts">
import { computed, ref } from 'vue'

type Column = {
  key: string
  label: string
  hidden?: boolean
  thClass?: string
  tdClass?: string
  sortable?: boolean
  sortKey?: string
}

type SortDir = 'asc' | 'desc'

type FilterOption = {
  key: string
  label: string
  options: string[]
}

const props = withDefaults(defineProps<{
  columns: Column[]
  rows?: Record<string, any>[]
  caption?: string
  /** applies the mobile stack style from the .table CSS */
  mobile?: boolean
  tableClass?: string
  getRowKey?: (row: any, index: number) => string | number
  filterOptions?: FilterOption[]
  defaultSort?: { key: string; dir: SortDir }
}>(), {
  rows: () => [],
  mobile: true,
  tableClass: '',
  filterOptions: () => [],
})

const filters = ref<Record<string, string>>({})
const sortKey = ref(props.defaultSort?.key ?? '')
const sortDir = ref<SortDir>(props.defaultSort?.dir ?? 'desc')

const hasSortableColumns = computed(() =>
  props.columns.some(col => col.sortable !== false && (col.sortable === true || col.sortKey)),
)

const enableSorting = computed(() =>
  Boolean(props.defaultSort) || hasSortableColumns.value || props.filterOptions.length > 0,
)

function initFilters() {
  for (const f of props.filterOptions) {
    if (!(f.key in filters.value)) {
      filters.value[f.key] = ''
    }
  }
}
initFilters()

function isSortable(col: Column) {
  if (!enableSorting.value)
    return false
  return col.sortable !== false
}

function toggleSort(col: Column) {
  if (!isSortable(col))
    return
  const key = col.sortKey ?? col.key
  if (sortKey.value !== key) {
    sortKey.value = key
    sortDir.value = 'asc'
    return
  }
  if (sortDir.value === 'asc') {
    sortDir.value = 'desc'
    return
  }
  sortKey.value = ''
}

function sortIconClass(col: Column, direction: 'asc' | 'desc') {
  const key = col.sortKey ?? col.key
  const isActive = sortKey.value === key && sortDir.value === direction
  return isActive ? 'text-primary-600' : 'text-green-200'
}

const displayRows = computed(() => {
  let result = [...(props.rows ?? [])]
  for (const f of props.filterOptions) {
    const val = filters.value[f.key]
    if (val) {
      result = result.filter(r => r[f.key] === val)
    }
  }
  if (sortKey.value) {
    const key = sortKey.value
    const dir = sortDir.value === 'asc' ? 1 : -1
    result.sort((a, b) => {
      const av = a[key]
      const bv = b[key]
      if (typeof av === 'number' && typeof bv === 'number') {
        return (av - bv) * dir
      }
      return String(av ?? '').localeCompare(String(bv ?? ''), 'de-CH') * dir
    })
  }
  return result
})
</script>

<template>
  <div :class="{ 'filterable-table': filterOptions.length || enableSorting }">
    <div
      v-if="filterOptions.length"
      class="filter-grid"
    >
      <div
        v-for="f in filterOptions"
        :key="f.key"
        class="filter-field"
      >
        <label
          :for="`table-filter-${f.key}`"
          class="label"
        >
          {{ f.label }}
        </label>
        <select
          :id="`table-filter-${f.key}`"
          v-model="filters[f.key]"
          class="input"
        >
          <option value="">
            Alle
          </option>
          <option
            v-for="opt in f.options"
            :key="opt"
            :value="opt"
          >
            {{ opt }}
          </option>
        </select>
      </div>
    </div>

    <table
      :class="[
        'table',
        { 'has-mobile-style': mobile },
        tableClass,
      ]"
    >
      <caption v-if="caption">{{ caption }}</caption>

      <thead>
        <tr>
          <th
            v-for="col in columns"
            :key="col.key"
            :class="[
              'table__col',
              `table__col--${col.key}`,
              col.hidden ? 'table__col--hidden' : '',
              col.thClass,
            ]"
          >
            <button
              v-if="isSortable(col)"
              type="button"
              class="sort-header"
              @click="toggleSort(col)"
            >
              <span>{{ col.label }}</span>
              <span class="sort-icons" aria-hidden="true">
                <span :class="sortIconClass(col, 'asc')">▲</span>
                <span :class="sortIconClass(col, 'desc')">▼</span>
              </span>
            </button>
            <template v-else>
              {{ col.label }}
            </template>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(row, idx) in displayRows"
          :key="getRowKey ? getRowKey(row, idx) : idx"
        >
          <td
            v-for="col in columns"
            :key="col.key"
            :data-head-label="col.label"
            :class="[
              'table__col',
              `table__col--${col.key}`,
              col.hidden ? 'table__col--hidden' : '',
              col.tdClass,
            ]"
          >
            <slot
              :name="`cell-${col.key}`"
              :row="row"
              :value="row[col.key]"
              :col="col"
            >
              {{ row[col.key] ?? '–' }}
            </slot>
          </td>
        </tr>

        <tr v-if="!displayRows.length">
          <td
            v-for="col in columns"
            :key="col.key"
            :data-head-label="col.label"
            :class="['table__col', `table__col--${col.key}`, col.tdClass]"
          >
            –
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.filter-grid {
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr;
  margin-bottom: 1.25rem;
}

.filter-field {
  display: flex;
  flex-direction: column;
}

.filter-field .input {
  width: 100%;
}

@media (min-width: 768px) {
  .filter-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.sort-header {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  font-weight: inherit;
  color: inherit;
  cursor: pointer;
}

.sort-icons {
  display: inline-flex;
  flex-direction: column;
  font-size: 0.5rem;
  line-height: 0.65;
}
</style>

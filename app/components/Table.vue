<script setup lang="ts">
import { computed } from 'vue'

type Column = {
  key: string
  label: string
  hidden?: boolean
  thClass?: string
  tdClass?: string
}
const props = withDefaults(defineProps<{
  columns: Column[]
  rows?: Record<string, any>[]
  caption?: string
  /** applies the mobile stack style from the .table CSS */
  mobile?: boolean
  mobileShowHeadLabels?: boolean
  mobileCellSeparators?: boolean
  mobileRowSeparators?: boolean
  mobileStackStyle?: 'default' | 'compact' | 'none'
  tableClass?: string
  getRowKey?: (row: any, index: number) => string | number
}>(), {
  rows: () => [],
  mobile: true,
  mobileShowHeadLabels: true,
  mobileCellSeparators: true,
  mobileRowSeparators: true,
  mobileStackStyle: 'default',
  tableClass: '',
})

const mobileStackEnabled = computed(() => props.mobile && props.mobileStackStyle !== 'none')
</script>

<template>
  <table
    :class="[
      'table',
      {
        'has-mobile-style': mobileStackEnabled,
        'table--mobile-compact': mobileStackEnabled && mobileStackStyle === 'compact',
        'table--mobile-no-head-labels': mobileStackEnabled && !mobileShowHeadLabels,
        'table--mobile-no-cell-separators': mobileStackEnabled && !mobileCellSeparators,
        'table--mobile-no-row-separators': mobileStackEnabled && !mobileRowSeparators,
      },
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
            col.thClass
          ]"
      >
        {{ col.label }}
      </th>
    </tr>
    </thead>

    <tbody>
    <tr
        v-for="(row, idx) in rows"
        :key="getRowKey ? getRowKey(row, idx) : idx"
    >
      <td
          v-for="col in columns"
          :key="col.key"
          :data-head-label="mobileShowHeadLabels ? col.label : undefined"
          :class="[
            'table__col',
            `table__col--${col.key}`,
            col.hidden ? 'table__col--hidden' : '',
            col.tdClass
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

    <tr v-if="!rows || rows.length === 0">
      <td
          v-for="col in columns"
          :key="col.key"
          :data-head-label="mobileShowHeadLabels ? col.label : undefined"
          :class="['table__col', `table__col--${col.key}`, col.tdClass]"
      />
    </tr>
    </tbody>
  </table>
</template>

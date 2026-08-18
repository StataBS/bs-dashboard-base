<script setup lang="ts">
import { max, min } from 'd3-array'
import { scaleLinear } from 'd3-scale'
import { select } from 'd3-selection'
import { area, line } from 'd3-shape'

const props = withDefaults(
  defineProps<{
    values: number[]
    color?: string
    height?: number
    labelLeft?: string
    labelRight?: string
  }>(),
  {
    color: '#2A9749',
    height: 90,
  },
)

const rootEl = ref<HTMLElement | null>(null)
const svgEl = ref<SVGSVGElement | null>(null)
const width = ref(0)

const ariaLabel = computed(() => {
  if (props.labelLeft && props.labelRight) {
    return `Trend von ${props.labelLeft} bis ${props.labelRight}`
  }
  return 'Trend'
})

function draw() {
  const svgNode = svgEl.value
  if (!svgNode || width.value <= 0) return

  const values = props.values
  const h = props.height
  const w = width.value
  const padX = 4
  const padTop = 8
  const hasLabels = Boolean(props.labelLeft || props.labelRight)
  const labelH = hasLabels ? 18 : 0
  const chartBottom = h - labelH

  const svg = select(svgNode)
  svg.selectAll('*').remove()
  svg.attr('width', w).attr('height', h).attr('viewBox', `0 0 ${w} ${h}`)

  if (values.length < 2) return

  const yMinVal = min(values) ?? 0
  const yMaxVal = max(values) ?? 0
  const span = yMaxVal - yMinVal
  const pad = span > 0 ? span * 0.12 : Math.max(Math.abs(yMaxVal), Number.EPSILON) * 0.08
  const xMax = Math.max(values.length - 1, 1)
  const x = scaleLinear().domain([0, xMax]).range([padX, w - padX])
  const y = scaleLinear()
    .domain([yMinVal - pad, yMaxVal + pad])
    .range([chartBottom, padTop])

  const areaGen = area<number>()
    .x((_, i) => x(i))
    .y0(chartBottom)
    .y1(d => y(d))

  const lineGen = line<number>()
    .x((_, i) => x(i))
    .y(d => y(d))

  svg
    .append('path')
    .datum(values)
    .attr('fill', props.color)
    .attr('fill-opacity', 0.22)
    .attr('d', areaGen)

  svg
    .append('path')
    .datum(values)
    .attr('fill', 'none')
    .attr('stroke', props.color)
    .attr('stroke-width', 2)
    .attr('stroke-linejoin', 'round')
    .attr('stroke-linecap', 'round')
    .attr('d', lineGen)

  if (!hasLabels) return

  const labelY = h - 4
  if (props.labelLeft) {
    svg
      .append('text')
      .attr('x', padX)
      .attr('y', labelY)
      .attr('text-anchor', 'start')
      .attr('fill', '#949494')
      .attr('font-size', 11)
      .text(props.labelLeft)
  }
  if (props.labelRight) {
    svg
      .append('text')
      .attr('x', w - padX)
      .attr('y', labelY)
      .attr('text-anchor', 'end')
      .attr('fill', '#949494')
      .attr('font-size', 11)
      .text(props.labelRight)
  }
}

let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  if (!rootEl.value) return
  resizeObserver = new ResizeObserver((entries) => {
    const entry = entries[0]
    if (!entry) return
    const next = Math.floor(entry.contentRect.width)
    if (next > 0 && next !== width.value) {
      width.value = next
    }
  })
  resizeObserver.observe(rootEl.value)
  width.value = Math.floor(rootEl.value.clientWidth)
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  resizeObserver = null
})

watch(
  () =>
    [
      props.values,
      props.color,
      props.height,
      props.labelLeft,
      props.labelRight,
      width.value,
    ] as const,
  () => draw(),
  { deep: true },
)
</script>

<template>
  <div
    ref="rootEl"
    class="sparkline"
    role="img"
    :aria-label="ariaLabel"
  >
    <svg ref="svgEl" class="sparkline__svg" />
  </div>
</template>

<template>
  <div>
    <canvas id="container" :width="width" :height="height"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, h, PropType } from 'vue'

import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
  Plugin
} from 'chart.js'

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale
)
export default defineComponent( {
  name: "LineChart",
  components: {
    Line
  },
  props: {
    chartId: {
      type: String,
      default: 'line-chart'
    },
    width: {
      type: Number,
      default: 800
    },
    height: {
      type: Number,
      default: 275
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object as PropType<Partial<CSSStyleDeclaration>>,
      default: () => {}
    },
    plugins: {
      type: Array as PropType<Plugin<'line'>[]>,
      default: () => []
    },
    chartData: {
      type: Object ,
      default: () => {}
    }
  },
  setup(props) {
    const chartData = {
      labels: props.chartData.chartLabels,
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#ff0000',
          borderColor: 'rgb(0, 192, 0)',
          data: props.chartData.chartDataArray
        }
      ]
    }

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false
    }

    return () =>
        h(Line, {
          chartData,
          chartOptions,
          chartId: props.chartId,
          width: props.width,
          height: props.height,
          cssClasses: props.cssClasses,
          styles: props.styles,
          plugins: props.plugins
        })
  }
})
</script>

<style scoped>

</style>
<template>
  <div>
    <canvas id="container" :width="width" :height="height"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, h, PropType } from 'vue'

import { Doughnut } from 'vue-chartjs'
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  Plugin
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, ChartDataLabels)
export default defineComponent({
  name: 'DoughnutChart',
  components: {
    Doughnut
  },
  props: {
    chartId: {
      type: String,
      default: 'doughnut-chart'
    },
    width: {
      type: Number,
      default: 600
    },
    height: {
      type: Number,
      default: 600
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
      type: Array as PropType<Plugin<'doughnut'>[]>,
      default: () => []
    }
  },

  setup(props) {
    const chartData = {
      labels: ['VueJs', 'EmberJs'],
      datasets: [
        {
          backgroundColor: ['#DD1B16', '#41B883'],
          data: [40, 10],
        }
      ],
    }

    const options = {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            // Change options for ALL labels of THIS CHART
            datalabels: {
              color: '#0be83f',
              font: {
                  size: 30
              },


            }
          }
        }



    return () =>
        h(Doughnut, {
          chartData,
          chartOptions: options,
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
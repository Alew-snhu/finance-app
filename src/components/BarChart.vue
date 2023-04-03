<template>
  <div id="chart">
    <apex-charts type="bar" height="300" :options="data.chartOptions" :series="data.series"></apex-charts>
  </div>
</template>

<script lang="ts">
import ApexCharts from 'vue3-apexcharts'
export default {
  components: {
    ApexCharts,
  },
  data() {
    return {
      data: {
        series: [{
          data: [44, 55, 41, 64, 22, 43, 21, 41, 21, 64, 210, 4300]
        },
          {
          data: [53, 32, 33, 52, 13, 44, 32, 13, 33, 44, 320, 1300  ]
        }],
        chartOptions: {
          chart: {
            theme: 'dark',
            type: 'bar',
            toolbar: {
              show: false,
            },
          },
          title: {
            text: 'Product Trends by Month',
            align: 'left'
          },
          colors:['#4fff6e'],
          plotOptions: {
            bar: {
              borderRadius: 4,
              barHeight:'60%',
            }
          },
          dataLabels: {
            enabled: true,
          },
          tooltip: {
            enabled: true,
            fillSeriesColor: true,
            theme: 'dark',
          },
          xaxis: {
            labels: {
              style: {
                colors: ['white'],
              }
            },
          },
          yaxis: {
            labels: {
              style: {
                colors:['white']
              }
            },
          },
        },
      }
    }
  }
}

</script>

<style scoped>

</style>
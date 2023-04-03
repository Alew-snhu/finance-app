<template>
  <div id="chart">
    <apex-charts type="line" height="300" :options="data.chartOptions" :series="data.series"></apex-charts>
  </div>
</template>

<script lang="ts">
import ApexCharts from 'vue3-apexcharts'
export default {
  components: {
    ApexCharts,
  },
  data(){
    return{
      data: {
        series: [{
          name: "Desktops",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }],
        chartOptions: {
          chart: {
            toolbar:{
              show:false,
            },
            type: 'line',
            zoom: {
              enabled: false
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'straight'
          },
          title: {
            text: 'Product Trends by Month',
            align: 'left'
          },
          grid: {

          },
          xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
          }
        },
      },
    }
  }
}
</script>

<style scoped>

</style>
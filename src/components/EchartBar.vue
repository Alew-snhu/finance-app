<template>
  <div>
    <canvas  id="chart" height="400" width="600"></canvas>
  </div>
</template>

<script lang="ts">

import {defineComponent} from "vue";
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  TitleComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  LegendComponent,
  LegendComponentOption
} from 'echarts/components';
import { PieChart, PieSeriesOption } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout
]);

type EChartsOption = echarts.ComposeOption<
    | TitleComponentOption
    | TooltipComponentOption
    | LegendComponentOption
    | PieSeriesOption
    >;

export default defineComponent({

  async mounted() {
    const chartDom = document.getElementById('chart')!;
    const myChart = echarts.init(chartDom);
    let option: EChartsOption;

    option = {
      title: {
        text: 'Referer of a Website',
        subtext: 'Fake Data',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',

      },
      legend: {
        orient: 'horizontal',
        bottom: 'bottom',
        backgroundColor: 'grey',

      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '70%',
          label: {
            position: "outer"
          },
          data: [
            {
              value: 1048,
              name: 'Income',
              itemStyle: {
                color: 'rgba(100, 255, 150, 1.0)'
                },
            },
            { value: 735, name: 'Expenses', itemStyle: {color: 'rgba(255, 0, 0, 1.0)'}   },
          ],

          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };


    myChart.setOption(option)

  },
  data(){


    return{

    }
  }
})
</script>

<style scoped>
canvas {
  width: 100%;
  height: 100%;
}
</style>
<template>
     <div class="chart-view">
         <chart 
         :options="polar"
         auto-resize
         ></chart>
     </div>
</template>

<script>
import Vue from 'vue';
import ECharts from 'vue-echarts/components/ECharts.vue';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
// import 'echarts/lib/component/polar';

// 注册组件后即可使用
Vue.component('chart', ECharts);
/* eslint no-mixed-operators: 0 */
/* eslint no-plusplus: 0 */
export default {
  name: 'charts',
  data() {
    return {
      polar: {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
          type: 'value',
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          smooth: true,
        }],
      },
    };
  },
  created() {

  },
};
</script>

<style>
.echarts {
  width: 100%!important;
  height: 300px;
}
</style>

<template>
  <div class="app-container home">
    <el-row :gutter="20">
      <el-col :sm="24" :lg="12" style="padding-left: 20px">
        <h2>自来水供应监控系统</h2>
      </el-col>

    </el-row>
    <div style="display: flex; gap: 20px; justify-content: center;">
      <div id="Source-Water-Mean-Pressure" style="flex: 1; max-width: 600px; height: 400px;"></div>
      <div id="Discharge" style="flex: 1; max-width: 600px; height: 400px;"></div>

    </div>
    <div style="display: flex; gap: 20px; justify-content: center;">
      <div id="pjsz" style="flex: 1; max-width: 600px; height: 500px;"></div>
    <div id="category" style="flex: 1; max-width: 600px; height: 500px;"></div>
    </div>
    <el-divider />
  </div>
</template>

<script setup name="Index" lang="ts">
import * as echarts from 'echarts';

onMounted(() => {
  type EChartsOption = echarts.EChartsOption;

  var chartDom = document.getElementById('pjsz')!;
  var myChart = echarts.init(chartDom);
  var option: EChartsOption;
  option = {
    title: {
      text: '平均水质'
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true
      }
    ]
  };

  option && myChart.setOption(option);

})


onMounted(() => {

  type EChartsOption = echarts.EChartsOption;

  var chartDom = document.getElementById('category')!;
  var myChart = echarts.init(chartDom);
  var option: EChartsOption;

  option = {
    title: {
      text: '水质评分'
    },
    xAxis: {
      type: 'category',
      data: ['1号传感器', '2号传感器', '3号传感器', '4号传感器', '5号传感器']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [99, 20, 30, 50, 60, 40, 40],
        type: 'bar'
      }
    ]
  };

  option && myChart.setOption(option);

})

onMounted(() => {

  type EChartsOption = echarts.EChartsOption;

  var chartDom = document.getElementById('Discharge')!;
  var myChart = echarts.init(chartDom);
  var option: EChartsOption;

  option = {
    title: {
      text: '当前水流量'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: '传感器名称',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: '1号传感器' },
          { value: 735, name: '2号传感器' },
          { value: 580, name: '3号传感器' },
          { value: 484, name: '4号传感器' },
          { value: 300, name: '5号传感器' }
        ]
      }
    ]
  };

  option && myChart.setOption(option);




})


onMounted(() => {
  type EChartsOption = echarts.EChartsOption;

  var chartDom = document.getElementById('Source-Water-Mean-Pressure')!;
  var myChart = echarts.init(chartDom);
  var option: EChartsOption;
  option = {
    title: {
      text: '水源平均水压'
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true
      }
    ]
  };

  option && myChart.setOption(option);

})
const goTarget = (url: string) => {
  window.open(url, '__blank');
};


</script>

<style lang="scss" scoped>
.home {
  blockquote {
    padding: 10px 20px;
    margin: 0 0 20px;
    font-size: 17.5px;
    border-left: 5px solid #eee;
  }
  hr {
    margin-top: 20px;
    margin-bottom: 20px;
    border: 0;
    border-top: 1px solid #eee;
  }
  .col-item {
    margin-bottom: 20px;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  font-family: 'open sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 13px;
  color: #676a6c;
  overflow-x: hidden;

  ul {
    list-style-type: none;
  }

  h4 {
    margin-top: 0px;
  }

  h2 {
    margin-top: 10px;
    font-size: 26px;
    font-weight: 100;
  }

  p {
    margin-top: 10px;

    b {
      font-weight: 700;
    }
  }

  .update-log {
    ol {
      display: block;
      list-style-type: decimal;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0;
      margin-inline-end: 0;
      padding-inline-start: 40px;
    }
  }
}
</style>

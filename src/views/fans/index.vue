<template>
  <el-card>
    <!-- 面包屑组件 -->
    <bread-crumb slot="header">
      <template slot="title">图文数据</template>
    </bread-crumb>

    <el-row type="flex" justify="space-between">
      <!-- 工作图标 -->
      <div ref="workChart" class="echarts"></div>
      <!-- 生活图表 -->
      <div ref="liftChart" class="echarts"></div>
    </el-row>
  </el-card>
</template>

<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      liftData: [10, 52, 200, 334, 390, 330, 220],
      workData: [820, 932, 901, 934, 1290, 1330, 1320]
    }
  },
  created () {
    setInterval(() => {
      this.updateData()
    }, 1000)
  },
  methods: {
    updateData () {
      //   更新数据
      this.liftData = this.liftData.map(item => {
        return item * (Math.random() + 0.5)
      })

      this.workData = this.workData.map(item => {
        return item * (Math.random() + 0.5)
      })
    },
    setWorkOption () {
      this.workChart.setOption({
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: this.workData,
            type: 'line'
          }
        ]
      })
    },
    setLiftOption () {
      this.liftChart.setOption({
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: this.liftData
          }
        ]
      })
    }

  },
  watch: {
    liftData (newValue) {
      //   重新setOption
      this.setLiftOption()
    },
    workData (newValue) {
      //   重新setOption
      this.setWorkOption()
    }
  },
  // 要在页面渲染之后 才能获取dom元素
  mounted () {
    //   图表的初始化
    // echarts.init(dom对象) 得到一个图表的实例
    // init（）方法是图表的方法
    this.workChart = echarts.init(this.$refs.workChart)
    this.liftChart = echarts.init(this.$refs.liftChart)
    // 用得到的图表实例来进行图表的渲染 setOption 设置图表的数据样式以及配置
    // option来源于 教程实例中的数据 或者查阅API所得 一般直接看教程示例即可
    this.setLiftOption()
    this.setWorkOption()
  }
}
</script>

<style lang='less' scoped>
.echarts {
  width: 600px;
  height: 400px;
}
</style>

<template>
  <div class="date">
      <div class="hour" :style="hourStyle"></div>
      <div class="min" :style="minStyle"></div>
      <div class="secound" :style="secondStyle"></div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      hour: 12,
      min: 60,
      second: 60
    }
  },
  created () {
    this.updateTime()
    setInterval(() => {
      this.updateTime()
    }, 1000)
  },
  computed: {
    //   时针的样式
    hourStyle () {
      let hour = this.hour - 12 ? this.hour - 12 : this.hour
      // 时针至少转的角度
      let rowDeg = 30 * hour + this.min / 60 * 30 // 时针至少转的角度 + 分针转的角度 /除以百分比
      return { transform: `rotate(${rowDeg}deg)` }
    },
    minStyle () {
      let rowDeg = this.min * 6
      return { transform: `rotate(${rowDeg}deg)` }
    },
    secondStyle () {
      let rowDeg = this.second * 6
      return { transform: `rotate(${rowDeg}deg)` }
    }
  },
  methods: {
    updateTime () {
      let currentDate = new Date() // 获取当前时间对象
      this.hour = currentDate.getHours() // 获取当前的小时
      this.min = currentDate.getMinutes()// 获取当前的分钟
      this.second = currentDate.getSeconds()// 获取当前的秒
    }
  }
}
</script>

<style lang='less' scoped>
    .date{
        position: relative;
        background-image: url('../../assets/imgs/back.png');
        width: 400px;
        height: 400px;
        background-size: cover;
        display: flex;
        justify-content: center;
        .hour,.min,.secound {
            position: absolute;
            bottom: 200px;
            transform-origin: 0 100%;
        }
        .hour{
            background-image: url('../../assets/imgs/hou.png');
            width: 8px;
            height: 100px;
        }
        .min{
            background-image: url('../../assets/imgs/min.png');
            width: 6px;
            height: 120px;
        }
        .secound{
            background-image: url('../../assets/imgs/sec.png');
            width: 4px;
            height: 160px;
        }
    }
</style>

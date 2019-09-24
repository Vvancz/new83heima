<template>
  <div class="cover-img">
      <!-- v-for循环生成封面图片 -->
      <!-- 封面组件{{images}} -->
      <div class="cover-item" v-for="(item,index) in images" :key="index">
          <img :src="item? item:defaultImg" alt="">
      </div>

  </div>
</template>

<script>
export default {
  props: ['images'],
  data () {
    return {
      defaultImg: require('../../assets/imgs/pic_bg.png')
    }
  }
}
</script>

<style lang='less' scoped>
.cover-img{
    display: flex;
    margin: 10px 0;
    margin-left: 100px;
    .cover-item{
        border: 1px solid #ccc;
        padding: 10px;
    }
}

</style>

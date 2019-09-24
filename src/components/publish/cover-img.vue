<template>
  <div class="cover-img">
      <!-- v-for循环生成封面图片 -->
      <!-- 封面组件{{images}} -->
      <div @click="openLayer(index)" class="cover-item" v-for="(item,index) in images" :key="index">
          <img :src="item? item:defaultImg" alt="">
      </div>
      <!-- 弹层组件 -->
      <!-- @close="dialogVisible=false" 关闭弹层 -->
      <el-dialog @close="dialogVisible=false" :visible="dialogVisible">
          <!-- 监听谁的事件就在谁的标签上写监听 -->
          <select-img @selectOneImg="receiveImg"></select-img>
      </el-dialog>

  </div>
</template>

<script>
export default {
  props: ['images'],
  data () {
    return {
      defaultImg: require('../../assets/imgs/pic_bg.png'),
      dialogVisible: false, // 默认不显示 弹层
      selectIndex: -1
    }
  },
  methods: {
    //   打开层
    openLayer (index) {
      this.dialogVisible = true
      //   将当前点击的图片的索引值 给data中的一个属性
      this.selectIndex = index
    },
    receiveImg (url) {
      // 接收子组件传过来的值
      // 自定义事件 参数
      this.$emit('selectImg', url, this.selectIndex)
      this.dialogVisible = false
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
        width: 220px;
        height: 220px;
        img{
            width: 100%;
            height: 100%;
        }
    }
}

</style>

<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">素材管理</template>
    </bread-crumb>
    <!--
        el-tabs el-tab-pane 组成页签
        v-model="activeName"绑定的是el-tab-pane的name属性
        显示的是当前选中的name
    -->
    <el-tabs v-model="activeName" @tab-click="getMaterial">
      <el-tab-pane label="全部素材" name="all">
        <div class="img-list">
          <el-card class="img-item" v-for="item in list " :key="item.id">
            <img :src="item.url" alt />
            <div class="operate">
              <i class="el-icon-star-on" :style="{color:item.is_collected ? 'red':'black'}"></i>
              <i class="el-icon-delete-solid"></i>
            </div>
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane label="收藏素材" name="collect">
        <div class="img-list">
          <el-card class="img-item" v-for="item in list " :key="item.id">
            <img :src="item.url" alt />
            <div class="operate">
              <i class="el-icon-star-on" :style="{color:item.is_collected ? 'red':'black'}"></i>
              <i class="el-icon-delete-solid"></i>
            </div>
          </el-card>
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all', // 默认选中全部
      list: [] // 定义一个list接收数据
      //   collectList: []
    }
  },
  methods: {
    getMaterial () {
      // this.activeName === 'collect'相当于找收藏的数据
    //   this.activeName === !'collect' 不等于collect false 相当于全部数据
      this.$axios({
        url: '/user/images',
        params: { collect: this.activeName === 'collect' }
      }).then(result => {
        this.list = result.data.results
      })
    }
    // handleClick () {
    //   if (this.activeName === 'all') {
    //     // 加载全部数据
    //     this.getMaterial(false)
    //   }
    //   if (this.activeName === 'collect') {
    //     //   去加载收藏数据
    //     this.getMaterial(true)
    //   }
    // }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang='less' scoped>
.img-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  .img-item {
    position: relative;
    height: 180px;
    width: 180px;
    border-radius: 6px;
    margin: 30px;

    img {
      width: 100%;
      height: 100%;
    }
    .operate {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      background-color: #f4f5f6;
      height: 30px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      i {
        font-size: 18px;
      }
    }
  }
}
</style>

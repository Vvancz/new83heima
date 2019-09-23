<template>
  <el-card>
    <!-- 面包屑组件 -->
    <bread-crumb slot="header">
      <template slot="title">内容列表</template>
    </bread-crumb>

    <!-- 搜索工具栏 -->
    <!-- 表单 -->
    <el-form style="margin-left:50px">
      <!-- el-form-item 有一个标题属性label="" -->

      <el-form-item label="文章状态 :">
        <el-radio-group v-model="select">
          <el-radio :label="3">全部</el-radio>
          <el-radio :label="6">草稿</el-radio>
          <el-radio :label="9">待审核</el-radio>
          <el-radio :label="9">审核通过</el-radio>
          <el-radio :label="9">审核失败</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="频道列表 :">
        <el-select v-model="value" placeholder="请选择">
          <!-- 显示值默认从label中取  value是存储值 -->
          <!-- v-model的值来源于value  -->
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="时间选择 :">
        <!--  range-separator="至"去掉 -->
        <!-- 绑定的值是个数组 -->
        <div class="block">
          <span class="demonstration"></span>
          <el-date-picker
            v-model="value1"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </div>
      </el-form-item>
    </el-form>

    <!-- 主体内容 -->
    <div class="total">共找到条符合条件的内容</div>

    <div class="article-item" v-for="(item,index) in list" :key="index">
      <!-- 布局 -->
      <!-- 左侧 -->
      <div class="left">
        <img :src="item.cover.images.length?item.cover.images[0]:defaultImg" alt />
        <div class="info">
          <span class="title">{{item.title}}</span>
          <!-- 插值表达式 使用过滤器 -->
          <el-tag class="status" :type="item.status|statusType">{{item.status|statusText}}</el-tag>
          <span class="date">{{item.pubdate}}</span>
        </div>
      </div>

      <!-- 右侧 -->
      <div class="right">
        <span>
          <i class="el-icon-edit">修改</i>
        </span>
        <span>
          <i class="el-icon-delete">删除</i>
        </span>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      //   将图片地址转成base64
      defaultImg: require('../../assets/imgs/homea.jpg')
      // radio:
      //   select: ''
    }
  },
  methods: {
    getArticles () {
      this.$axios({
        url: '/articles'
      }).then(result => {
        this.list = result.data.results // 获取文章列表
      })
    }
  },
  created () {
    this.getArticles()
  },
  filters: {
    //   定义一个过滤器v-bind:或者插值表达式|
    statusText (value) {
      // 过滤器的第一个值永远是前面传过来的
      switch (value) {
        case 0:
          return '草稿'

        case 1:
          return '待审核'
        case 2:
          return '审核通过'
        case 3:
          return '审核失败'
        case 4:
          return '已删除'
      }
    },
    statusType (value) {
      // 处理状态的显示样式
      switch (value) {
        case 0:
          return 'warning'

        case 1:
          return 'info'
        case 2:
          return 'success'
        case 3:
          return 'danger'
        case 4:
          return 'danger'
      }
    }
  }
}
</script>

<style lang='less' scoped>
.total {
  border-bottom: 1px dashed #ccc;
  height: 50px;
  line-height: 50px;
}
.article-item {
  display: flex;
  justify-content: space-between;
  padding: 20px 10px;
  border-bottom: 1px solid #f2f3f5;
  .left {
    display: flex;
    img {
      width: 180px;
      height: 100px;
      border-radius: 4px;
    }
    .info {
      height: 100px;
      display: flex;
      flex-direction: column;
      margin-left: 10px;
      justify-content: space-around;
      .date {
        color: #999;
        font-size: 12px;
      }
      .title {
        font-size: 14px;
      }
      .status {
        width: 100px;
        text-align: center;
      }
    }
  }
  .right {
    font-size: 12px;
    span {
      margin-right: 8px;
    }
  }
}
</style>

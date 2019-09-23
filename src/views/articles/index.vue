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
          <!-- v-model来源于el-radio中label属性 -->
        <el-radio-group @change="changeCondition" v-model="formData.status">
          <el-radio :label="5">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="频道列表 :">
        <el-select v-model="formData.channel_id" placeholder="请选择" @change="changeCondition">
          <!-- 显示值默认从label中取  value是存储值 -->
          <!-- v-model的值来源于value  -->
          <!-- <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option> -->
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="时间选择 :">
        <!--  range-separator="至"去掉 -->
        <!-- 绑定的值是个数组 -->
        <div class="block">
          <span class="demonstration"></span>
          <el-date-picker
          @change="changeCondition"
            v-model="formData.date"
            value-format="yyyy-MM-dd"
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
          <!-- v-bind 使用过滤器 -->
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
      formData: {
        status: 5,
        // 空字符串和null的区别： 空字符串有值但值是空字符串  null没有值
        channel_id: null,
        date: []
      },
      list: [],
      channels: [], // 定义一个频道数组接收传过来的值
      //   将图片地址转成base64
      defaultImg: require('../../assets/imgs/homea.jpg')
      // radio:
      //   select: ''
    }
  },
  methods: {
    getArticles (params) {
      this.$axios({
        url: '/articles',
        // params:params
        params
      }).then(result => {
        this.list = result.data.results // 获取文章列表
      })
    },
    getChannels () {
      // 获取频道列表
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    },
    // 状态变化事件
    changeCondition () {
      // 因为值改变时 formdata已经是最新的值 所以直接可以用formdata的值请求
      //   开始时间
    //   let beginDate = this.formData.date.length ? this.formData.date[0] : null
    //   let endDate = this.formData.date.length > 1 ? this.formData.date[1] : null
      let params = {
        //   状态 如果为5时就是全部 接口要求如果为全部时就什么都不传 null就是什么都不传
        status: this.formData.status === 5 ? null : this.formData.status,
        channel_id: this.formData.channel_id,
        begin_pubdate: this.formData.date.length ? this.formData.date[0] : null,
        end_pubdate: this.formData.date.length > 1 ? this.formData.date[1] : null
      }
      this.getArticles(params)
    }
    // changeSelect () {
    //   this.changeCondition()
    // }
  },
  created () {
    // 获取文章
    this.getArticles()
    // 获取频道
    this.getChannels()
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
        width: 70px;
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

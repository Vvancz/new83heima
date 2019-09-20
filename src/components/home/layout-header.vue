<template>
  <!-- 头部最外侧 放置一个el-row -->
  <!-- justify="space-between"两端对齐   type="flex"开启flex布局-->
  <el-row type="flex" justify="space-between" class="layout-header" align="middle">
    <!-- 不加冒号是字符串  加了冒号是变量 -->
    <!-- 左侧 -->
    <!-- :span="" 占了多少份 -->
    <el-col :span="6">
      <i class="el-icon-s-unfold"></i>
      <span class="title">江苏传智播客教育科技有限公司</span>
    </el-col>
    <!-- 右侧 -->
    <el-col :span="4">
        <!-- 用户头像 -->
      <img class="head-img" :src="userInfo.photo?userInfo.phpto:defaultImg" alt />
      <!-- <img class="head-img" src="../../assets/imgs/avatar.jpg" alt /> -->

      <!-- 下拉菜单组件  -->
      <el-dropdown trigger="click">
        <!-- 匿名插槽 -->
        <span class="el-dropdown-link">
          {{userInfo.name}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <!-- 具名插槽 -->
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item>git地址</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {
        defaultImg: require('../../assets/imgs/avatar.jpg')// 转成base64
      }
    }
  },
  methods: {
    // 获取用户个人资料
    getUserInfo () {
      let token = window.localStorage.getItem('user-token')
      this.$axios({
        url: '/user/profile',
        headers: { 'Authorization': `Bearer${token}` }
      }).then(result => {
        this.userInfo = result.data.data
      })
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style lang="less" scoped>
    .layout-header{
        height: 50px;
        .el-icon-s-unfold{
            font-size: 22px;
        }
        .title{
            vertical-align: top;
            margin-left: 4px;
        }
        .head-img{
            width: 40px;
            height: 40px;
            border-radius: 50%;
            vertical-align: middle;
            margin-right: 4px;
        }
    }
</style>

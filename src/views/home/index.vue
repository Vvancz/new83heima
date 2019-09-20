<template>
  <el-container>
    <!-- 先定义一个大容器 -->
    <!-- 先放置一个左侧容器 -->
    <el-aside style="width:200px">
      <layout-aside></layout-aside>
    </el-aside>
    <!-- 右侧大容器 -->
    <el-container>
      <!-- 头部 -->
      <el-header>
        <!-- 头部组件 -->
        <layout-header></layout-header>
      </el-header>
      <!-- 中部区域 -->
      <el-main>
        <!-- 二级路由容器 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// 因为注册了全局的所以这里不需要了
// import layoutAside from '../../components/home/layout-aside'
// import layoutHeader from '../../components/home/layout-header'

export default {
  // 因为注册了全局的所以这里不需要了
  // components: {
  //   'layout-aside': layoutAside,
  //   'layout-header': layoutHeader
  // }
}
</script>

<style>
</style>

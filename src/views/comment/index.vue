<template>
  <div>
      <el-card>
          <!--  slot="header" 是给el-card的插槽 -->
          <!-- 面包屑组件bread-crumb -->
          <bread-crumb slot="header">
          <!-- slot="title" 是给面包屑组件的插槽 -->
            <template slot="title">评论列表</template>
          </bread-crumb>
      </el-card>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>

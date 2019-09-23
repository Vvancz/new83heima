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
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      // radio:
      //   select: ''
    }
  }
}
</script>

<style>
</style>

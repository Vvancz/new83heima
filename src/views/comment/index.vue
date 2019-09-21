<template>
  <div>
    <el-card>
      <!--  slot="header" 是给el-card的插槽 -->
      <!-- 面包屑组件bread-crumb -->
      <bread-crumb slot="header">
        <!-- slot="title" 是给面包屑组件的插槽 -->
        <template slot="title">评论列表</template>
      </bread-crumb>

      <!-- <el-table 表格 -->
      <el-table :data="list">
        <!-- el-table-column 列 prop属性=>键名=>字段名 label属性 表头-->
        <el-table-column width="600ox" label="标题" prop="title"></el-table-column>
        <el-table-column
          :formatter="stateFormatter"
          align="center"
          label="评论状态"
          prop="comment_status"
        ></el-table-column>
        <el-table-column align="center" label="总评论数" prop="total_comment_count"></el-table-column>
        <el-table-column align="center" label="粉丝评论数" prop="fans_comment_count"></el-table-column>
        <el-table-column align="center" label="操作">
          <!-- 作用域插槽 父组件接收子组件的数据 接收el-table-column数据 row/column/$index/store -->
          <template slot-scope="obj">
            <!-- {{obj.row.comment_status}} -->

          <!--
            操作里面 需要根据评论状态决定显示的文字名称
            如果前面的评论状态是打开的情况下 就要显示关闭评论
            如果前面的评论状态是关闭的情况下 就要显示打开评论
            -->
            <!-- 自定义内容 获取其他列的数据 -->
          <el-button size="small" type="text">修改</el-button>
          <el-button size="small" type="text">
            {{obj.row.comment_status? '关闭评论':'打开评论'}}
            </el-button>
           </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    getComment () {
      // 获取评论列表
      this.$axios({
        //   query是路径参数
        url: '/articles',
        params: { response_type: 'comment' } // params是路径参数 也就是query参数
      }).then(result => {
        //   把返回的数据赋值给list
        this.list = result.data.results
      })
    },
    stateFormatter (row, column, cellValue, index) {
      // row行的数据 column列的信息 cellValue当前单元格的值 index下标
      // return的内容会显示在评论状态内容
      // row['comment_status']和cellValue是一样的
      return cellValue ? '正常' : '关闭'
    }
  },
  created () {
    this.getComment()
  }
}
</script>

<style>
</style>

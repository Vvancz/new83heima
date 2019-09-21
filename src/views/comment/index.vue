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
            <!-- :style="{color:obj.row.comment_status?'#E6A23C':'#409EFF'}"  -->
            <el-button size="small" type="text">修改</el-button>
            <el-button
              :style="{color:obj.row.comment_status?'#E6A23C':'#409EFF'}"
              @click="closeOrOpen(obj.row)"
              size="small"
              type="text"
            >
              <!-- 点击打开或关闭时要调用接口 -->
              {{obj.row.comment_status? '关闭评论':'打开评论'}}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页结构 -->
      <el-row>
        <el-pagination
        background
        class="paginatio"
        align="center"
        :page-size="page.pageSize"
        layout="prev, pager, next" :total="page.total" :current-page="page.currentPage" @current-change="changePage"></el-pagination>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      // 存放分页信息
      page: {

        total: 0, // 默认总条数
        currentPage: 1, // 默认第一页
        pageSize: 10
      }
    }
  },
  methods: {
    // newPage elementui 调用该事件时传出的一个参数
    changePage (newPage) {
      this.page.currentPage = newPage // 更新最新的页码给currentpage
      this.getComment()
    },
    getComment () {
      // 获取评论列表
      this.$axios({
        //   query是路径参数
        url: '/articles',
        params: { response_type: 'comment', per_page: this.page.pageSize, page: this.page.currentPage } // params是路径参数 也就是query参数
      }).then(result => {
        //   把返回的数据赋值给list
        this.list = result.data.results
        this.page.total = result.data.total_count// 把总条数给分页的总条数
      })
    },
    stateFormatter (row, column, cellValue, index) {
      // row行的数据 column列的信息 cellValue当前单元格的值 index下标
      // return的内容会显示在评论状态内容
      // row['comment_status']和cellValue是一样的
      return cellValue ? '正常' : '关闭'
    },
    closeOrOpen (row) {
      // row当前行数据
      // alert(JSON.stringify(row))
      let mess = row.comment_status ? '关闭' : '打开'
      this.$confirm(`您确定要${mess}吗？`, '提示').then(() => {
        // 确定调用接口
        this.$axios({
          url: 'comments/status',
          method: 'put',
          params: { article_id: row.id.toString() },
          data: { allow_comment: !row.comment_status }
        }).then(result => {
          // 成功之后会进入then
          // 重新拉取数据
          this.getComment()
          // Number.MAX_SAFE_INTEGER 最大安全整数 如果超过这个数字就会失真（计算偏差）json.pase（）转换不精确 axios自动调用的
          // json.pase()在处理大数字的 时候会出现计算偏差
          // json-bigint npm 第三方转化包 专门处理大数字
        })
      })
    }
  },
  created () {
    this.getComment() // 获取第一页每页十条数据
  }
}
</script>

<style lang='less' scoped>
.paginatio{
  margin-top: 20px;
}
</style>

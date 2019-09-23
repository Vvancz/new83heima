<template>
  <el-card v-loading="loading">
    <bread-crumb slot="header">
      <template slot="title">素材管理</template>
    </bread-crumb>
    <!-- http-request自定义上传 -->
    <el-upload class="too-difficult" action :http-request="uploadImg" :show-file-list="false">
      <el-button type="primary">上传</el-button>
    </el-upload>
    <!--
        el-tabs el-tab-pane 组成页签
        v-model="activeName"绑定的是el-tab-pane的name属性
        显示的是当前选中的name
    -->
    <el-tabs v-model="activeName" @tab-click="changeTab">
      <el-tab-pane label="全部素材" name="all">
        <div class="img-list">
          <el-card class="img-item" v-for="item in list " :key="item.id">
            <img :src="item.url" alt />
            <div class="operate">
              <!-- 收藏和取消收藏 -->
              <i @click="collectOrCancel(item)" class="el-icon-star-on" :style="{color:item.is_collected ? 'red':'black'}"></i>
              <!-- 删除 需要传入id-->
              <i @click="delImg(item.id)" class="el-icon-delete-solid"></i>
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

      <el-row type="flex" justify="center">
        <el-pagination
          background
          @current-change="changePage"
          :current-page="page.currentPage"
          :page-size="page.pageSize"
          layout="prev, pager, next"
          :total="page.total"
        ></el-pagination>
      </el-row>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all', // 默认选中全部
      list: [], // 定义一个list接收数据
      //   collectList: []
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      },
      loading: false
    }
  },
  methods: {
    // 收藏和取消收藏 要传参数 还要id和状态
    collectOrCancel (item) {
      // 提示 可以降低操作速度
      let mess = item.is_collected ? '取消' : ''
      this.$confirm(`您确定要${mess}收藏该图片吗`).then(() => {
        this.$axios({
          url: `/user/images/${item.id}`,
          method: 'put',
          // 收藏和取消收藏和当前的状态是反着的
          data: { collect: !item.is_collected }
        }).then(() => {
          // 收藏和取消收藏 成功要重新拉取数据
          this.getMaterial()
        })
      })
    },
    // 删除图片
    delImg (id) {
      // 在删除之前询问是否删除
      this.$confirm('您确定要删除该图片吗?').then(() => {
        // 点确定 相当于resolve 调用接口删除
        // 用箭头函数 是因为要this的指向
        this.$axios({
          // user/images/:target 冒号代表target是活动的值 这个值是id
          url: `/user/images/${id}`,
          method: 'delete'
        }).then(() => {
          // 如果成功一定进then
          // 重新拉取数据重新渲染
          this.getMaterial()
        })
      })
    },
    //   上传方法
    uploadImg (params) {
      const data = new FormData() // 定义一个新的表单
      data.append('image', params.file)

      this.$axios({
        url: '/user/images',
        method: 'post',
        data
      }).then(() => {
        this.$message({
          message: '上传成功',
          type: 'success'
        })
        this.getMaterial()
      })
    },
    //   当页码改变时会传入一个参数
    changePage (newPage) {
      this.page.currentPage = newPage // 将最新页码赋值给currentPage
      this.getMaterial() // 获取最新数据
    },
    changeTab () {
      // 首先要把页码归一
      this.page.currentPage = 1
      this.getMaterial()
    },
    getMaterial () {
      this.loading = true
      // this.activeName === 'collect'相当于找收藏的数据
      //   this.activeName === !'collect' 不等于collect false 相当于全部数据
      this.$axios({
        url: '/user/images',
        params: {
          collect: this.activeName === 'collect',
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count
        this.loading = false
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
.too-difficult {
  position: absolute;
  right: 20px;
  margin-top: -10px;
  z-index: 1;
}
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

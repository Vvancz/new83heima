<template>
  <!-- 页签组件 -->
  <el-tabs>
    <el-tab-pane label="素材库">
      <!-- 全部的素材数据 -->
      <div class="imgs-list">
        <el-card class="imgs-item" v-for="item in list" :key="item.id">
          <img @click="clickImg(item)" :src="item.url" alt />
        </el-card>
      </div>

      <el-row type="flex" justify="center">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="page.total"
          :current-page="page.currentPage"
          :page-size="page.pageSize"
          @current-change="changePage"
        ></el-pagination>
      </el-row>
    </el-tab-pane>
    <el-tab-pane label="上传图片">
      <el-upload
        class="avatar-uploader"
        action=""
        :http-request="uploadImg"
        :show-file-list="false"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      list: [], // 全部素材图片
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 12
      }
    }
  },
  methods: {
    uploadImg (params) {
      // 上传用户素材
      let data = new FormData()
      data.append('image', params.file)
      this.$axios({
        url: '/user/images',
        method: 'post',
        data
      }).then(result => {
        //   得到一个线上地址
        this.$emit('selectOneImg', result.url)
      })
    },
    //   点击图片素材时触发
    clickImg (item) {
      this.$emit('selectOneImg', item.url) // 自定义事件 后面可以跟若干参数
    },
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getAllImg()
    },
    getAllImg () {
      // 获取所有的图片
      this.$axios({
        url: '/user/images',
        params: {
          collect: false,
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    }
  },
  created () {
    this.getAllImg()
    // this.$on('selectOneImg', () => {

    // })
  }
}
</script>

<style lang='less' scoped>
.imgs-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .imgs-item {
    width: 140px;
    height: 100px;
    margin: 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

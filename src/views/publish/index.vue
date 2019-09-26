<template>
  <el-card v-loading="loading">
    <!-- 面包屑组件 -->
    <bread-crumb slot="header">
      <template slot="title">发布文章</template>
    </bread-crumb>

    <!-- 表单 -->
    <el-form ref="publishForm" :model="formData" :rules="publishRules" style="margin-left:100px" label-width="100px">
        <el-form-item label="标题" prop="title">
            <el-input v-model="formData.title" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
            <quill-editor v-model="formData.content" style="height:300px"></quill-editor>

        </el-form-item>
        <el-form-item label="封面" prop="cover" style="margin-top:150px">
            <el-radio-group @change="changeType" v-model="formData.cover.type">
                <el-radio :label="1">单图</el-radio>
                <el-radio :label="3">三图</el-radio>
                <el-radio :label="0">无图</el-radio>
                <el-radio :label="-1">自动</el-radio>
            </el-radio-group>
        </el-form-item>
        <!-- 封面组件 -->
        <!-- 传递父组件的值到子组件 -->
        <cover-img @selectImg="changeImg" :images="formData.cover.images"></cover-img>
        <el-form-item label="频道" prop="channel_id">
            <el-select v-model="formData.channel_id">
                <el-option v-for="item in channels" :key="item.id" :value="item.id" :label="item.name">

                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="publish(false)">发布文章</el-button>
            <el-button @click="publish(true)">存入草稿</el-button>

        </el-form-item>

    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      channels: [],
      formData: {
        // 表单数据对象
        title: '', // 标题
        content: '', // 内容
        channel_id: null, // 文章所属频道id
        // 封面类型 -1:自动，0-无图，1-1张，3-3张
        cover: {
          type: 0,
          images: []
        }
      },
      publishRules: {
        // 发布规则
        title: [{ required: true, message: '标题不能为空' }, { min: 5, max: 30, message: '标题长度要在5~30字符之间' }],
        content: [{ required: true, message: '内容不能为空' }],
        channel_id: [{ required: true, message: '频道不能为空' }]

      }
    }
  },
  methods: {
    // 接收子组件传过来的数据 更改images数据 images是数组
    changeImg (url, index) {
      // alert(url + '-' + index)
      // 第一种方法：
      // this.formData.cover.images = this.formData.cover.images.map(function (item, i) {
      //   if (index === i) {
      //     // 说明找到了要修改的值
      //     return url
      //   }
      //   return item
      // })
      // 第二种方法：
      this.formData.cover.images = this.formData.cover.images.map((item, i) => i === index ? url : item)
    },
    changeType () {
      // 类型改变事件
      // alert(this.formData.cover.type)
      // 这里可以获取到最新的type 根据type进行images的长度变化
      if (this.formData.cover.type === 1) {
        this.formData.cover.images = ['']// images 长度为1
      } else if (this.formData.cover.type === 3) {
        this.formData.cover.images = ['', '', '']
      } else {
        this.formData.cover.images = []
      }
    },
    // 获取频道数据
    getCannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels // 获取channels频
      })
    },
    // 根据文章id获取文章详情
    getArticleById (articleId) {
      this.loading = true
      this.$axios({
        // articleId已经是字符串了
        url: `/articles/${articleId}`
      }).then(result => {
        this.formData = result.data
        this.loading = false
      })
    },
    publish (draft) {
      // 发布文章
      this.$refs.publishForm.validate((isOk) => {
        if (isOk) {
          let { articleId } = this.$route.params // 有 articleId就是编辑 没articleId就是新增
          this.$axios({
            url: articleId ? `/articles/${articleId}` : '/articles',
            method: articleId ? 'put' : 'post',
            params: { draft }, // draft为true时是草稿 false时是正式内容
            data: this.formData
          }).then(() => {
            // 发布成功了 就回到内容列表
            this.$router.push('/home/articles')
          })
          // 原始代码
          // if (articleId) {
          //   // 修改
          //   this.$axios({
          //     url: `/articles/${articleId}`,
          //     params: { draft }, // draft为true时 是草稿 为false时 是正式内容
          //     method: 'put',
          //     data: this.formData
          //   }).then(result => {
          //     // 发布成功了 => 回到内容列表
          //     this.$router.push('/home/articles')
          //   })
          // } else {
          //   this.$axios({
          //     url: '/articles',
          //     method: 'post',
          //     params: { draft }, // draft为true时 是草稿 为false时 是正式内容
          //     data: this.formData
          //   }).then(() => {
          //   // 发布成功了 => 回到内容列表
          //     this.$router.push('/home/articles')
          //   })
          // }
        }
      })
    }
  },
  created () {
    this.getCannels() // 获取频道
    // 获取文章的id 解构赋值
    // 有articleId 就是编辑文章  没他就是新增文章
    let { articleId } = this.$route.params
    // 如果articleId存在才执行后面的逻辑
    articleId && this.getArticleById(articleId)
  }
}
</script>

<style>
</style>

<template>
  <el-card>
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
            <el-input v-model="formData.content" type="textarea" :rows="4"></el-input>

        </el-form-item>
        <el-form-item label="封面" prop="cover">
            <el-radio-group v-model="formData.cover.type">
                <el-radio :label="1">单图</el-radio>
                <el-radio :label="3">三图</el-radio>
                <el-radio :label="0">无图</el-radio>
                <el-radio :label="-1">自动</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="频道" prop="channel_id">
            <el-select v-model="formData.channel_id">
                <el-option v-for="item in channels" :key="item.id" :value="item.id" :label="item.name">

                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="publish">发布文章</el-button>
            <el-button>存入草稿</el-button>

        </el-form-item>

    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: [],
      formData: {
        // 表单数据对象
        title: '', // 标题
        content: '', // 内容
        // 封面类型 -1:自动，0-无图，1-1张，3-3张
        cover: {
          type: 0,
          images: []
        },
        channel_id: null // 文章所属频道id
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
    getCannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels // 获取channels频
      })
    },
    publish () {
      // 发布文章
      this.$refs.publishForm.validate((isOk) => {
        if (isOk) {
          this.$axios({
            url: 'articles',
            method: 'post',
            params: { draft: false }, // draft为true时是草稿
            data: this.formData
          }).then(() => {
            // 发布成功了 就回到内容列表
            this.$router.push('/home/articles')
          })
        }
      })
    }
  },
  created () {
    this.getCannels() // 获取频道
  }
}
</script>

<style>
</style>

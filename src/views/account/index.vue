<template>
  <el-card v-loading="loading">
    <!-- 面包屑组件 -->
    <bread-crumb slot="header">
      <template slot="title">账户信息</template>
    </bread-crumb>

    <!-- 表单 -->
    <el-form
      ref="accountForm"
      :model="formDate"
      :rules="accountRules"
      style="margin-left:60px"
      label-width="100px"
    >
      <el-form-item label="用户名" prop="name">
        <el-input v-model="formDate.name" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item label="简介">
        <el-input v-model="formDate.intro" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="emial">
        <el-input v-model="formDate.email" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="formDate.mobile" disabled style="width:300px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveUser">保存信息</el-button>
      </el-form-item>
    </el-form>
        <!--上传  http-request-->

    <el-upload action="" :http-request="uploadImg" :show-file-list="false">

    <img class="head-img" :src="formDate.photo?formDate.photo:defaultImg" alt />
    </el-upload>
  </el-card>
</template>
<script>
import eventBus from '../../utils/eventBus.js'

export default {
  data () {
    return {
      loading: false,
      defaultImg: require('../../assets/imgs/homea.jpg'),
      formDate: {
        // {pattern：/^\w+@[a-z0-9]+\.[a-z]{2,4}$/}
      },
      // 账户规则
      accountRules: {
        name: [
          { required: true, message: '用户名不能为空' },
          { min: 1, max: 7, message: '用户名要控制到1~7个字符' }
        ],
        email: [{ required: true, message: '邮箱不能为空' },
          { pattern: /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/, message: '邮箱格式不正确' }]
      }

    }
  },
  methods: {
    uploadImg (params) {
      this.loading = true

      let data = new FormData()
      data.append('photo', params.file)
      this.$axios({
        url: '/user/photo',
        method: 'patch',
        data
      }).then(result => {
        eventBus.$emit('updateUserInfo') // 抛出一个事件
        this.formDate.photo = result.data.photo // 成功上传的头像更新给当前的页面数据
        this.loading = false
      })
    },
    //   保存用户的个人信息
    saveUser () {
      this.$refs.accountForm.validate((isOk) => {
        if (isOk) {
          this.$axios({
            url: '/user/profile',
            method: 'patch',
            data: this.formDate
          }).then(() => {
            // 提示别的组件要更新数据
            eventBus.$emit('updateUserInfo') // 抛出一个事件
            //   成功提示消息
            this.$message({ message: '保存成功', type: 'success' })
          })
        }
      })
    },
    // 获取用户个人信息
    getUserInfo () {
      this.loading = true
      this.$axios({
        url: '/user/profile'
      }).then(result => {
        this.formDate = result.data
        this.loading = false
      })
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style lang='less' scoped>
.head-img {
  border-radius: 50%;
  width: 200px;
  height: 200px;
  position: absolute;
  top: 150px;
  right: 400px;
}
</style>

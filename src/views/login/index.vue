<template>
  <div class="login">
    <!--使用elementUI组件 el-card  -->
    <el-card class="login-card">
      <!-- 匿名插槽 -->
      <div class="title">
        <img src="../../assets/imgs/logo_index.png" alt />
      </div>
      <!-- status-icon="true" -->
      <!-- 表单el-form包裹 -->
      <el-form style="margin-top:20px" :model="loginForm" :rules="loginRules" ref="myForm">
        <el-form-item prop="mobile">
          <!-- 手机号 -->
          <el-input  placeholder="请输入手机号" v-model="loginForm.mobile"></el-input>
        </el-form-item>

        <el-form-item prop="code">
          <!-- 验证码 -->
          <el-input  style="width:65%" placeholder="请输入验证码" v-model="loginForm.code"></el-input>
          <el-button style="float:right">发送验证码</el-button>
        </el-form-item>

        <el-form-item prop="agree">
          <!-- 同意选项 -->
          <el-checkbox v-model="loginForm.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>

        <el-form-item>
          <!-- 登录按钮 -->
          <!-- 注册点击事件 -->
          <el-button type="primary" style="width:100%" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    let validator = function (rule, value, callBack) {
      // 第一种写法：
      // rule 当前规则 value当前表单的值 callback 回调函数
      //   if (value) {
      //     //   正确 勾选了协议
      //     callBack()// 一切ok请继续
      //   } else {
      //     //   如果不ok 就可以抛出一个错误 不对没勾选
      //     callBack(new Error('必须同意此协议'))
      //   }

      // 第二种方法：
      value ? callBack() : callBack(new Error('必须同意此协议'))
    }
    return {
      // 表单数据是一个对象
      loginForm: {
        mobile: '', // 手机号
        code: '', // 验证码
        agree: false
      },
      loginRules: {
        //   决定校验规则 key(要校验的字段名):value （value是个对象数组）一个对象就是一个校验规则
        //   登录规则集合对象
        mobile: [
          // required为true表示必填 如果不填就会提示消息
          { required: true, message: '请输入您的手机号' },
          //   校验格式
          {
            pattern: /^1[3456789]\d{9}$/,
            message: '请输入合法的手机号'
            // trigger: 'blur'
          }
        ],
        code: [
          { required: true, message: '请输入您的验证码' },
          { pattern: /^\d{6}$/, message: '验证码为6位数字' }
        ],
        agree: [{ validator }]
      }
      //   通过自定义形式去校验 validator (rule value callback)
    }
  },
  methods: {
    login () {
      // 校验整个表单的规则
      // validate 是一个方法 传入的是一个回调函数
      // 两个参数 一是否校验成功 二 未校验的字段
      this.$refs.myForm.validate((isOk) => {
        if (isOk) {
        //   console.log('说明校验成功')
        // 只有一切校验通过之后 才会进入请求
          this.$axios({
            method: 'post',
            url: '/authorizations',
            // /authorizations
            data: this.loginForm
          }).then(result => {
            console.log(result.data)
            // 将后台返回的token令牌 存储到前端缓存中
            window.localStorage.setItem('user-token', result.data.token)
            this.$router.push('/home')
          }).catch(() => {
            // console.log(error.message)
            this.$message({
              type: 'warning',
              message: '您的手机号或验证码错误'
            })
          })
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
.login {
  background-image: url("../../assets/imgs/login_bg.jpg");
  /* 将当前可视屏幕分成了一百份 */
  height: 100vh;
  background-size: cover;

  display: flex;
  justify-content: center;
  align-items: center;

  .login-card {
    width: 440px;
    height: 340px;

    .title {
      text-align: center;
      img {
        height: 45px;
      }
    }
  }
}
</style>

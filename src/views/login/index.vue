<template>
  <div class="login">
    <!--  -->
    <el-card class="login-card">
      <div class="title">
        <img src="../../assets/imgs/logo_index.png" alt />
      </div>
      <el-form style="margin-top:20px">
        <el-form-item>
          <!-- 手机号 -->
          <el-input></el-input>
        </el-form-item>

        <el-form-item>
          <!-- 验证码 -->
          <el-input style="width:65%"></el-input>
          <el-button style="float:right">发送验证码</el-button>
        </el-form-item>

        <el-form-item>
            <!-- 同意选项 -->
          <el-checkbox>我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>

        <el-form-item>
            <!-- 登录按钮 -->
          <el-button type="primary" style="width:100%">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {}
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

<template>
  <div class="login">
    <!--  -->
    <el-card class="login-card"></el-card>
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

  .login-card{
      width: 440px;
      height: 330px;
  }
}
</style>

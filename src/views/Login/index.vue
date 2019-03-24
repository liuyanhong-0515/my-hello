<template>
  <div class="login-wrap">
    <div class="login-container">
      <!--

      -->
      <el-form label-position="top" label-width="80px" :model="loginForm">
        <el-form-item label="用户名">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn" type="primary" @click.prevent="onSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      }
    };
  },
  methods: {
    async onSubmit() {
      const resData = await axios.post('http://localhost:8888/api/private/v1/login',this.loginForm)
      if (resData.data.meta.status === 200) {
        this.$message({
          message: '登录成功',
          type: 'success'
        })
      } else {
          this.$message.error('登录失败');
      }
    }
  }
};
</script>
<style scoped>
.login-wrap {
  height: 100%;
  background-color: #2f4050;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-container {
  width: 500px;
  padding: 50px;
  height: 300px;
  background-color: #fff;
  border-radius: 10px;
}
.login-btn {
  width: 100%;
}
</style>

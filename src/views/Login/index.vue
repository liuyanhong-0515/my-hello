<template>
  <div class="login-wrap">
    <div class="login-container">
      <!--
        el-form 表单组件
          label-position 设定label的方向
            left/top/right
        配置表单验证
          1. 为el-from组件添加:rules=“rules” 验证规则
          2. 为el-from-item组件添加 prop 验证的子段
          3. 提交表单的时候获取表单的验证状态（验证通过或者验证失败），根据成功与否进行提交表为
              el-from 添加ref = "loginForm"

      -->
      <el-form
        label-position="top"
        :rules="loginFormRules"
        label-width="80px"
        :model="loginForm"
        ref="loginFormEl">
        <el-form-item class="logo-img">
          <img src="./love.jpg" alt="">
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
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
import { login } from '@/api'
import { setToken } from '@/utils/auth'
export default {
  name: "Login",
  data () {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      loginFormRules: {
        username: [
          { required: true, message: "请输用户名", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输密码", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    onSubmit () {
      this.$refs.loginFormEl.validate(valid => {
        // valid是一个布尔值
        if (valid) {
          this.login()
        } else {
          return false
        }
      })
    },
    async login () {
      const { meta, data } = await login(this.loginForm)
      if (meta.status === 200) {
        this.$message({
          message: "登录成功",
          type: "success"
        })
        // 将用户名和密码交换到的身份
        setToken(data.token)
        this.$router.push('/')
      } else if (status === 400) {
        this.$message.error(`登录失败 : ${meta.msg}`)
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
.el-form {
  position: relative;
}
.logo-img {
  position: absolute;
  left: 40%;
  top: -120px;

}
.logo-img img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}
</style>

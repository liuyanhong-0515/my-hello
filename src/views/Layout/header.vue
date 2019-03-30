<template>
  <el-row :gutter="20" class="app-header">
    <el-col :span="4">
      <img src="./logo.png" alt="黑马程序员">
    </el-col>
    <el-col :span="16">黑马程序员</el-col>
    <el-col :span="4">
      <el-button type="primary" @click="hadleLogout">退出</el-button>
    </el-col>
  </el-row>
</template>

<script>
import { removeToken } from '@/utils/auth'
export default {
  name: 'AppHeader',
  data () {
    return {}
  },
  methods: {
    hadleLogout () {
      this.$confirm('确定退出吗', '确定提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {   // 确定
          // 清空token
          removeToken()
          // 跳转回登录页
          this.$router.replace('/login')
          this.$message({
            type: 'success',
            message: '退出成功!'
          })
        }).catch(() => {  // 取消
          this.$message({
            type: 'info',
            message: '已取消退出'
          })
        })
    }
  }
}
</script>

<style>
</style>

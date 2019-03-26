<template>
<div>
  <p>user</p>
</div>
</template>
<script>
import axios from 'axios'
export default {
  name:'UserList',
  data () {
    return {}
  },
  async created () {
    // 除了登录接口，其他接口都需要身份令牌
    const res = await axios({
      method: 'GET',
      url: 'http://localhost:8888/api/private/v1/users?pagenum=1&pagesize=5',
      headers: { // axios 支持通过headers选项添加
        Authorization: window.localStorage.getItem('token')
      }
    })
    if (res.data.meta.status === 401) {
      this.$router.push('/login')
    } else {
      console.log(res.data.data)
    }
  }
}
</script>

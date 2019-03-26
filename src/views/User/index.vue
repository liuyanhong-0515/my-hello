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
    // 2
    // 除了登录接口，其他接口都需要身份令牌
    // 所以有需要授权（提供token）的接口需要像下面
    const res = await request({
      method: 'GET',
      url: '/users?pagenum=1&pagesize=5',

    })
    if (res.data.meta.status === 401) {
      this.$router.push('/login')
    } else {
      // console.log(res.data.data)
    }
  }
}
</script>

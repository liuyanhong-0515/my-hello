/**
 * 封装axios
 *
 */
import axios from 'axios'
import router from '@/router'
import { getToken } from '@/utils/auth'


// axios 可以配置基础路径，这样的话就不需要每次请求的时候都写很多
// 最简单的方式不推荐
// 当有多个不同的请求接口路径的时候
// axios.defaults.baseURL = 'https://api.example.com';

// 建议方式就是调用愁人啊create方式
const http = axios.create({
  baseURL: 'http://localhost:8888/api/private/v1/',
});

/**
 * axios 请求拦截器
 * 所有使用axios 发起的请求都会经过这里
 * 我们可以在这里定制一些业务逻辑，例如统一给需要授权的API
 */
// Add a requerst interceptor
http.interceptors.request.use(function (config) {
  // 3
  window.console.log('3请求拦截')
  // console.log('请求经过这里',config)
  // Do something before request is sent

  if (config.url !== '/login') {
    config.headers.Authorization = getToken()

  }
  return config   //v请求通过的规则，如果不return config，则
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

/**
 * axios 响应拦截器
 * 所有请求收到响应结果，都会经过这里
 * 我们可以在这里做业务逻辑处理
 * 例如统一判断meta.staus == 401
 */
http.interceptors.response.use(function (response) {
  // 4
  window.console.log('4.响应拦截')
  // Do something with response data
  if (response.data.meta.staus === 401) {
    router.replace('/login')
  }
  return response  // 这里return回座位真正的
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})

export default http

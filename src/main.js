import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 注册ElementUI ·全局组件
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

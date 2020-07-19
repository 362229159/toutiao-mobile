import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入全局样式
import '@/css/index.css'
// 导入字体图标
import '@/css/icon.css'
// 导入vant
import Vant from 'vant'
import 'vant/lib/index.css'
// 引入amfe-flexible
import 'amfe-flexible/index.js'
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

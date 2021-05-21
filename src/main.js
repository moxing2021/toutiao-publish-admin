import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/style/index.less'//加载全局样式

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

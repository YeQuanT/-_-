import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import less from 'less'
import 'element-ui/lib/theme-chalk/index.css'



Vue.config.productionTip = true
Vue.use(Element)
Vue.use(less)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

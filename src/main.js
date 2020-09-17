import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';

import "element-ui/lib/theme-chalk/index.css"
import "reset-css/reset.css"
import "@/assets/css/bread.css"
import "nprogress/nprogress.css"

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

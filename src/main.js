import Vue from 'vue'
import App from './App'
import router from './router'
Vue.config.productionTip = false
import 'common/stylus/index.styl'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  data:{
    eventHub : new Vue()
  },
  render: h => h(App)
})

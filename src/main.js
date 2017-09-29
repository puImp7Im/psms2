// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import VueResource from 'vue-resource'
import dateformat from 'dateformat'

Vue.config.productionTip = false

Vue.use(Vuetify)
Vue.use(VueResource)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

Vue.filter('formatDate', function (ts, str = 'yyyy-MM-dd hh:mm:ss') {
  let date = new Date(ts)
  return dateformat(date, str)
})

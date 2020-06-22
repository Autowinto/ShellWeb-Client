import Vue from 'vue'
import 'bootstrap'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import('../src/assets/bootstrap/css/bootstrap.min.css')
import('../src/assets/fonts/fontawesome-all.min.css')
require('dotenv').config()
//import './assets/bootstrap/js/bootstrap.min.js'

Vue.config.productionTip = false

Vue.use(BootstrapVue)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');

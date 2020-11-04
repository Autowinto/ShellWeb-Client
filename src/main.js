import Vue from 'vue'
import App from './App.vue'
import router from './router'

import('../src/assets/bootstrap/css/bootstrap.min.css')
import('../src/assets/fonts/fontawesome-all.min.css')
import BootstrapVue from 'bootstrap-vue'
import VueCompositionAPI from '@vue/composition-api'
import VueFileAgent from 'vue-file-agent'
import 'vue-file-agent/dist/vue-file-agent.css'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import './config/axiosConfig'

Vue.config.productionTip = false

//Extra vue libraries registration
Vue.use(BootstrapVue)
Vue.use(VueCompositionAPI)
Vue.use(VueFileAgent)

import store from './auth/store'

dayjs.extend(duration)

//Initialize authentication before creating the app
new Vue({
  router,
  store: store,
  render: (h) => h(App),
}).$mount('#app')

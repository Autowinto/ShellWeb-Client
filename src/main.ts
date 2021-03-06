import Vue from 'vue'
import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import('../src/assets/bootstrap/css/bootstrap.min.css')
import('../src/assets/fonts/fontawesome-all.min.css')
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import VueCompositionAPI from '@vue/composition-api'
import VueFileAgent from 'vue-file-agent'
import 'vue-file-agent/dist/vue-file-agent.css'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'
import './config/axiosConfig'
import { CoolSelectPlugin } from 'vue-cool-select'
import 'vue-cool-select/dist/themes/bootstrap.css'

Vue.config.productionTip = false

Vue.use(CoolSelectPlugin)

//Extra vue libraries registration
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VueCompositionAPI)
Vue.use(VueFileAgent)

import store from './auth/store'

dayjs.extend(duration)
dayjs.extend(relativeTime)

//Initialize authentication before creating the app
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')

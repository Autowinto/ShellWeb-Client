import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap'
import('../src/assets/bootstrap/css/bootstrap.min.css')
import('../src/assets/fonts/fontawesome-all.min.css')
import BootstrapVue from 'bootstrap-vue'
import { authMixin } from './mixins/authMixin.js'
import Vuex from 'vuex'
import VueCompositionAPI from '@vue/composition-api'
import VueFileAgent from 'vue-file-agent'
import 'vue-file-agent/dist/vue-file-agent.css'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

Vue.config.productionTip = false

//Register global mixins
Vue.mixin(authMixin)

//Extra vue libraries registration
Vue.use(BootstrapVue)
Vue.use(Vuex)
Vue.use(VueCompositionAPI)
Vue.use(VueFileAgent)

dayjs.extend(duration)

//Initialize global storage with mutation functions. This is used for components to react to authentication
const store = new Vuex.Store({
  state: {
    isAuthenticated: false, //This authentication status doesn't have anything to do with accessing sensitive data. All it does is tell the front-end to render the page. In any case where this fails, no data is leaked.
    account: null,
  },
  mutations: {
    setAuthenticationStatus(state, status) {
      if (typeof status === 'boolean') {
        state.isAuthenticated = status
      } else {
        console.warn(
          'setAuthenticationStatus mutation only allows for boolean values'
        )
      }
    },
    setAccount(state, status) {
      state.account = status
    },
  },
})

//Initialize authentication before creating the app
new Vue({
  router,
  store: store,
  render: (h) => h(App),
}).$mount('#app')

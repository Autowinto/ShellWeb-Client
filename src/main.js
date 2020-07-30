import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap'
import('../src/assets/bootstrap/css/bootstrap.min.css')
import('../src/assets/fonts/fontawesome-all.min.css')
import BootstrapVue from 'bootstrap-vue';
import { authMixin } from './mixins/authMixin.js';
import Vuex from 'vuex';

Vue.config.productionTip = false

Vue.mixin(authMixin)


//Extra vue libraries registration
Vue.use(BootstrapVue)
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isAuthenticated: false, //Default to false
    user: {
      name: 'Magnus Test',
    }
  },
  mutations: {
    setAuthenticationStatus(state, status) {
      if (typeof(status) === 'boolean') {
        state.isAuthenticated = status;
      } else {
        console.warn('setAuthenticationStatus mutation only allows for boolean values')
      }
    }
  }
})

//Initialize authentication before creating the app
  new Vue({
    router,
    store: store,
    render: h => h(App)
  }).$mount('#app');
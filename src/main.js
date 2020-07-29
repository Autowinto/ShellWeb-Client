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
})

//Initialize authentication before creating the app
  new Vue({
    router,
    store: store,
    render: h => h(App)
  }).$mount('#app');
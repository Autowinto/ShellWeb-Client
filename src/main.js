import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap'
import('../src/assets/bootstrap/css/bootstrap.min.css')
import('../src/assets/fonts/fontawesome-all.min.css')
import BootstrapVue from 'bootstrap-vue';
import authentication from './authentication';

Vue.config.productionTip = false

Vue.use(BootstrapVue)
authentication.loadAuth()
.then(() => {
  //Initialize authentication before creating the app
  new Vue({
    router,
    render: h => h(App)
  }).$mount('#app');
})
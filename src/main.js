import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
// import('../src/assets/bootstrap/css/bootstrap.min.css')
// import('../src/assets/fonts/fontawesome-all.min.css')
// import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
// import VueFileAgent from 'vue-file-agent'
// import 'vue-file-agent/dist/vue-file-agent.css'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'
import './config/axiosConfig'

// import { CoolSelectPlugin } from 'vue-cool-select'
// import 'vue-cool-select/dist/themes/bootstrap.css'

// Vue.use(CoolSelectPlugin)

//Extra vue libraries registration
// Vue.use(BootstrapVue)
// Vue.use(BootstrapVueIcons)
// Vue.use(VueCompositionAPI)
// Vue.use(VueFileAgent)

// import store from './auth/store'

import PrimeVue from 'primevue/config'
import Card from 'primevue/card'
import Button from 'primevue/button'
import MenuBar from 'primevue/menubar'
import Panel from 'primevue/panel'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import ColumnGroup from 'primevue/columngroup'
import Paginator from 'primevue/paginator'

import store from './store'

dayjs.extend(duration)
dayjs.extend(relativeTime)

//Initialize authentication before creating the app
createApp(App)
  .use(router)
  .use(store)
  .use(PrimeVue)
  .component('p-button', Button)
  .component('p-card', Card)
  .component('p-menubar', MenuBar)
  .component('p-panel', Panel)
  .component('p-datatable', DataTable)
  .component('p-column', Column)
  .component('p-columngroup', ColumnGroup)
  .component('p-paginator', Paginator)
  .mount('#app')

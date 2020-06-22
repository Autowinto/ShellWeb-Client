import Vue from 'vue'
import Router from 'vue-router'
import Customers from '../components/views/Customers.vue'
import Dashboard from '../components/views/Dashboard.vue'
import Profile from '../components/views/Profile.vue'
import Customer from '../components/views/Customer.vue'
import Contact from '../components/views/Contact.vue'
import Login from '../components/views/Login.vue'
import NotFound from '../components/views/NotFound.vue'
import Tickets from '../components/views/Tickets.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/customers',
      name: 'customers',
      component: Customers
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/customer',
      name: 'customer',
      component: Customer
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact
    },
    {
      path: '/tickets',
      name: 'tickets',
      component: Tickets
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {hideNavBar: true}
    },
    {
      path: '*',
      name: '404',
      component: NotFound,
      meta: {hideNavBar: true}
    },
  ]
})
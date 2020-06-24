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
import Ticket from '../components/views/Ticket.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        title: 'Dashboard'
      }
    },
    {
      path: '/customers',
      name: 'customers',
      component: Customers,
      meta: {
        title: 'Customers'
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: {
        title: 'Profile'
      }
    },
    {
      path: '/customer',
      name: 'customer',
      component: Customer,
      meta: {
        title: 'Customer'
      }
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact,
      meta: {
        title: 'Contact'
      }
    },
    {
      path: '/tickets',
      name: 'tickets',
      component: Tickets,
      meta: {
        title: 'Tickets'
      }
    },
    {
      path: '/ticket',
      name: 'ticket',
      component: Ticket,
      meta: {
        title: 'Ticket'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        hideNavBar: true,
        title: 'Login'
      }
    },
    {
      path: '*',
      name: '404',
      component: NotFound,
      meta: {
        hideNavBar: true,
        title: '404'
      }
    },
  ]
})
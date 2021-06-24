import Vue from 'vue'
import Router from 'vue-router'
import Customers from '../components/views/Customers.vue'
import Dashboard from '../components/views/Dashboard.vue'
import Customer from '../components/views/Customer.vue'
import Contact from '../components/views/Contact.vue'
import Login from '../components/views/Login.vue'
import Tickets from '../components/views/Tickets.vue'
import Ticket from '../components/views/Ticket.vue'
import Invoices from '../components/views/Invoices.vue'
import TimeOverview from '../components/views/TimeOverview.vue'
import Administration from '../components/views/Administration.vue'
import Asset from '../components/views/Asset.vue'
import Authentication from '../components/views/Authentication.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        title: 'Dashboard',
        requireAuth: true,
      },
    },
    {
      path: '/customers',
      name: 'customers',
      component: Customers,
      meta: {
        title: 'Customers',
        requireAuth: true,
      },
    },
    {
      path: '/customer',
      name: 'customer',
      component: Customer,
      meta: {
        title: 'Customer',
        requireAuth: true,
      },
    },
    {
      path: '/invoices',
      name: 'invoices',
      component: Invoices,
      meta: {
        title: 'Invoices',
        requireAuth: true,
      },
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact,
      meta: {
        title: 'Contact',
        requireAuth: true,
      },
    },
    {
      path: '/tickets',
      name: 'tickets',
      component: Tickets,
      meta: {
        title: 'Tickets',
        requireAuth: true,
      },
    },
    {
      path: '/ticket',
      name: 'ticket',
      component: Ticket,
      meta: {
        title: 'Ticket',
        requireAuth: true,
      },
    },
    {
      path: '/invoices',
      name: 'invoices',
      component: Invoices,
      meta: {
        title: 'Invoices',
        requireAuth: true,
      },
    },
    {
      path: '/timeoverview',
      name: 'timeoverview',
      component: TimeOverview,
      meta: {
        title: 'Time Overview',
        requireAuth: true,
      },
    },
    {
      path: '/administration',
      name: 'administration',
      component: Administration,
      meta: {
        title: 'Administration',
        requireAuth: true,
      },
    },
    {
      path: '/asset',
      name: 'asset',
      component: Asset,
      meta: {
        title: 'Asset',
        requireAuth: true,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        hideNavBar: true,
        title: 'Login',
      },
    },
    {
      path: '/auth',
      name: 'authentication',
      component: Authentication,
      meta: {
        hideNavBar: true,
        title: 'Authentication',
      },
    },
    // {
    //   path: "*",
    //   name: "404",
    //   component: NotFound,
    //   meta: {
    //     hideNavBar: true,
    //     title: "404",
    //   },
    // },
  ],
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title + ' - IT-Confidence Shell' || 'Something Went Wrong'
  next()
})

export default router

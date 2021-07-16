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
import NavBar from '../components/NavBar.vue'
import store from '@/auth/store'
import * as auth from '@/auth/authHelper'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: NavBar,
      children: [
        {
          path: '',
          name: 'Dashboard',
          component: Dashboard,
        },
      ],
      meta: {
        title: 'Dashboard',
        requireAuth: true,
      },
    },
    {
      path: '/customers',
      component: NavBar,
      children: [
        {
          path: '',
          name: 'Customers',
          component: Customers,
        },
      ],
      meta: {
        title: 'Customers',
        requireAuth: true,
      },
    },
    {
      path: '/customer',
      component: NavBar,
      children: [
        {
          path: '',
          name: 'Customer',
          component: Customer,
        },
      ],
      meta: {
        title: 'Customer',
        requireAuth: true,
      },
    },
    {
      path: '/invoices',
      component: NavBar,
      children: [
        {
          path: '',
          name: 'Invoices',
          component: Invoices,
        },
      ],
      meta: {
        title: 'Invoices',
        requireAuth: true,
      },
    },
    {
      path: '/contact',
      component: NavBar,
      children: [
        {
          path: '',
          name: 'Contact',
          component: Contact,
        },
      ],
      meta: {
        title: 'Contact',
        requireAuth: true,
      },
    },
    {
      path: '/tickets',
      component: NavBar,
      children: [
        {
          path: '',
          name: 'Tickets',
          component: Tickets,
        },
      ],
      meta: {
        title: 'Tickets',
        requireAuth: true,
      },
    },
    {
      path: '/ticket',
      component: NavBar,
      children: [
        {
          path: '',
          name: 'Ticket',
          component: Ticket,
        },
      ],
      meta: {
        title: 'Ticket',
        requireAuth: true,
      },
    },
    {
      path: '/timeoverview',
      component: NavBar,
      children: [
        {
          path: '',
          name: 'Time Overview',
          component: TimeOverview,
        },
      ],
      meta: {
        title: 'Time Overview',
        requireAuth: true,
      },
    },
    {
      path: '/administration',
      component: NavBar,
      children: [
        {
          path: '',
          name: 'Administration',
          component: Administration,
        },
      ],
      meta: {
        title: 'Administration',
        requireAuth: true,
      },
    },
    {
      path: '/asset',
      component: NavBar,
      children: [
        {
          path: '',
          name: 'Asset',
          component: Asset,
        },
      ],
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

router.beforeEach(async (to, from, next) => {
  document.title = to?.name + ' - IT-Confidence Shell' || 'Something Went Wrong'
  next()
})

export default router

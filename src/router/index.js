import { createRouter, createWebHistory } from 'vue-router'
import Customers from '../views/Customers.vue'
import Dashboard from '../views/Dashboard.vue'
import Customer from '../views/Customer.vue'
import Contact from '../views/Contact.vue'
import Login from '../views/Login.vue'
import Tickets from '../views/Tickets.vue'
import Ticket from '../views/Ticket.vue'
import Invoices from '../views/Invoices.vue'
import TimeOverview from '../views/TimeOverview.vue'
import Administration from '../views/Administration.vue'
import Asset from '../views/Asset.vue'
import Authentication from '../views/Authentication.vue'
import Changelog from '../views/Changelog.vue'

const routes = [
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
  {
    path: '/changelog',
    name: 'changelog',
    component: Changelog,
    meta: {
      title: 'Changelog',
      requireAuth: false,
    },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router

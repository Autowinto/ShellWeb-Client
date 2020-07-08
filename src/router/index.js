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
import Invoices from '../components/views/Invoices.vue'
import TimeOverview from '../components/views/TimeOverview.vue'
import Administration from '../components/views/Administration.vue'

Vue.use(Router)

const router =  new Router({
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
      path: '/invoices',
      name: 'invoices',
      component: Invoices,
      meta: {
        title: 'Invoices'
      }
    },
    {
      path: '/timeoverview',
      name: 'timeoverview',
      component: TimeOverview,
      meta: {
        title: 'Time Overview'
      }
    },
    {
      path: '/administration',
      name: 'administration',
      component: Administration,
      meta: {
        title: 'Administration'
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

router.beforeEach((to, from, next) => {
  document.title = to.meta.title + ' - IT-Confidence Shell' || 'Something Went Wrong'
  next();
})

export default router
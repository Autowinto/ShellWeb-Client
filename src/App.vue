<template>
  <NavBar v-if="!$route.meta.hideNavBar">
    <router-view
      v-if="this.$store.state.isAuthenticated"
      :key="this.$store.state.isAuthenticated"
    ></router-view>
  </NavBar>
  <router-view v-else></router-view>
</template>

<script>
import NavBar from './components/NavBar'
import * as auth from './auth/authHelper'
import axios from 'axios'
import store from './auth/store'

export default {
  created() {
    auth
      .checkAuthenticationStatus()
      .then(() => {
        console.log('Successfully checked authentication')
        this.handleMSGraph(store.state.account)
      })
      .catch((error) => {
        console.log(error)
        auth.signIn()
      })
  },
  methods: {
    fetchRole(accountId) {
      axios
        .get(`${process.env.VUE_APP_URL}employees/${accountId}/role`)
        .then((response) => {
          auth.setRole(response.data)
        })
    },
    handleMSGraph(value) {
      if (value !== null) {
        this.fetchRole(value.homeAccountId)
        auth.getAccountGraph(value).then((response) => {
          auth.setDisplayName(response.data.displayName)
        })
      }
    },
  },
  computed: {
    authStatus() {
      return store.state.account
    },
  },
  watch: {
    authStatus(accountValue) {
      this.handleMSGraph(accountValue)
    },
  },
  name: 'App',
  components: {
    NavBar,
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

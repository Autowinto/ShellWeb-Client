<template>
  <router-view v-if="store.state.isAuthenticated"></router-view>
  <b-container style="height: 100vh; width: 100vh" v-else>
    <b-row class="h-100">
      <b-col class="d-flex justify-content-center align-items-center" cols="12">
        <b-spinner class="mr-2" variant="dark"></b-spinner>
        <h2 class="my-1">Authenticating...</h2>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import * as auth from './auth/authHelper'
import axios from 'axios'
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  setup(props, ctx) {
    const store = ctx.root.$store

    auth
      .checkSessionValidity()
      .then(() => {
        console.log('Valid session')
        store.state.isAuthenticated = true
      })
      .catch(() => {
        console.log('Need to sign in')
        auth.signInAzure().then(() => {
          auth.loginBackend().then(() => {
            auth.checkSessionValidity().then(() => {
              store.state.isAuthenticated = true
            })
          })
        })
      })

    return {
      store,
    }
  },
  // created() {
  //   auth
  //     .checkAuthenticationStatus()
  //     .then(() => {
  //       console.log('Successfully checked authentication')
  //       this.handleMSGraph(store.state.account)
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //       auth.signIn()
  //     })
  // },
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
        this.fetchRole(value.localAccountId)
        auth.getAccountGraph(value).then((response) => {
          auth.setDisplayName(response.data.displayName)
        })
      }
    },
  },
  computed: {
    // authStatus() {
    //   return store.state.account;
    // },
  },
  watch: {
    // authStatus(accountValue) {
    //   this.handleMSGraph(accountValue)
    // },
  },
})
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

<template>
  <div
    style="height: 100vh"
    class="d-flex justify-content-center align-items-center"
  >
    <h1>Signing you in...</h1>
    <b-btn @click="signIn">Test</b-btn>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import * as auth from '@/auth/authHelper.ts'
import store from '@/auth/store'
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
        auth.signInAzure().then((res) => {
          console.log(res)
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
})
</script>

<style></style>

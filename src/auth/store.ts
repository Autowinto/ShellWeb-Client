import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//Initialize global storage with mutation functions. This is used for components to react to authentication
export default new Vuex.Store({
  state: {
    isAuthenticated: false, //This authentication status doesn't have anything to do with accessing sensitive data. All it does is tell the front-end to render the page. In any case where this fails, no data is leaked.
    account: null,
    role: {},
    displayName: '',
  },
  mutations: {
    setAuthenticationStatus(state, status) {
      if (typeof status === 'boolean') {
        state.isAuthenticated = status
      } else {
        console.warn('setAuthenticationStatus mutation only allows for boolean values')
      }
    },
    setAccount(state, status) {
      state.account = status
    },
    setRole(state, status) {
      state.role = status
    },
    setDisplayName(state, status) {
      state.displayName = status
    },
  },
})

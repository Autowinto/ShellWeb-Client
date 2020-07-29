<template>
    <NavBar v-if="!$route.meta.hideNavBar">
        <router-view v-if="this.$isAuthenticated()"></router-view>
    </NavBar>
    <router-view v-else></router-view>
</template>

<script>
import NavBar from "./components/NavBar.vue";

export default {
  created() {
    if (!this.$isAuthenticated()) {
      this.$signIn();
    }
  },
  name: "App",
  components: {
    NavBar
  },
  watch: {
  }
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
.modal-backdrop {
     background-color: rgba(0,0,0,.5) !important;
}
</style>

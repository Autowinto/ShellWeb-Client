<template>
    <NavBar v-if="!$route.meta.hideNavBar">
        <router-view></router-view>
    </NavBar>
    <router-view v-else></router-view>
</template>

<script>
import NavBar from "./components/NavBar.vue";

export default {
  // data() {
  //   return {
  //     isLoading: true
  //   }
  // },
  name: "App",
  components: {
    NavBar
  }
};
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

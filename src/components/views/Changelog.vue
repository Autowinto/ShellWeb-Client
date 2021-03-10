<template>
  <div id="wrapper">
    <b-container fluid>
      <h3 class="text-dark mb-4">Changelog</h3>
      <b-card class="w-100">
        <div v-for="change in changelog" :key="change">
          <span class="font-weight-bold">{{ change.date }} - </span>
          <span>
            {{ change.text }}
          </span>
        </div>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import { ref } from '@vue/composition-api'
import axios from 'axios'

export default {
  setup() {
    let changelog = ref([])

    axios.get(`${process.env.VUE_APP_URL}changelog`).then((response) => {
      changelog.value = response.data
    })
    return { changelog }
  },
}
</script>

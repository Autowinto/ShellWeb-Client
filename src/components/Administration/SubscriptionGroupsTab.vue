<template>
  <div>
    <b-card bg-variant="light" class="mb-3">
      <b-col class="text-right"> </b-col>
    </b-card>
    <b-table :items="items" show-empty outlined hover> </b-table>
    <b-pagination></b-pagination>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from '@vue/composition-api'

export default Vue.extend({
  data() {
    return {
      items: [],
      creationForm: {},
    }
  },
  created() {
    this.loadItems()
  },
  methods: {
    async loadItems() {
      let data = await axios.get(`${process.env.VUE_APP_URL}subscriptionGroups`)

      this.items = data.data
    },
    submit() {
      axios
        .post(`${process.env.VUE_APP_URL}subscriptionGroups`, this.creationForm)
        .then(() => {
          this.loadItems()
          this.$refs['createGroupModal'].hide()
        })
    },
  },
})
</script>

<style></style>

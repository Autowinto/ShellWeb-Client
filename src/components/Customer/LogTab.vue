<template>
  <b-tab lazy title="Log">
    <paginated-table :url="url" :fields="fields"></paginated-table>
  </b-tab>
</template>

<script>
  import { defineComponent } from '@vue/composition-api'
  import PaginatedTable from '../PaginatedTable.vue'
  export default defineComponent({
    setup(props, { root }) {
      const customerId = root.$route.query.id
      const url = `${process.env.VUE_APP_URL}customers/${customerId}/logs`

      const fields = [
        {
          key: 'employeeName',
          label: 'Employee',
        },
        {
          key: 'typeName',
          label: 'Type',
        },
        {
          key: 'message',
        },
        {
          key: 'time',
          label: 'Time Logged',
        },
      ]

      return { url, fields }
    },

    components: {
      PaginatedTable,
    },
  })
</script>

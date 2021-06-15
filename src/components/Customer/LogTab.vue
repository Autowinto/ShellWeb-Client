<template>
  <b-tab title="Log">
    <paginated-table :url="url" :fields="fields"></paginated-table>
  </b-tab>
</template>

<script>
  import { defineComponent } from '@vue/composition-api'
  import PaginatedTable from '../PaginatedTable.vue'
  export default defineComponent({
    setup() {
      const url = `${process.env.VUE_APP_URL}customers/31750350/logs`

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

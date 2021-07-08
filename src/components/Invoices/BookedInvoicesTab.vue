<template>
  <b-tab title="Booked Invoices"
    ><paginated-table :results="10" :fields="fields" :url="url">
      <template #custom="{ scope }">
        <b-btn size="sm" variant="primary" @click="loadInvoicePDF(scope)"
          >View</b-btn
        >
      </template>
    </paginated-table>
    <b-modal hide-footer size="xl" ref="bookedInvoiceModal" title="Invoice">
      <b-embed :src="pdf" type="iframe" />
    </b-modal>
  </b-tab>
</template>

<script>
  import { defineComponent, reactive, ref } from '@vue/composition-api'
  import PaginatedTable from '../PaginatedTable.vue'
  import axios from 'axios'

  export default defineComponent({
    setup() {
      const url = `${process.env.VUE_APP_URL}invoices/booked`

      const fields = [
        {
          key: 'bookedInvoiceNumber',
          label: 'Invoice ID',
        },
        {
          key: 'customer.customerNumber',
          label: 'Customer',
        },
        {
          key: 'date',
        },
        {
          key: 'currency',
        },
        {
          key: 'netAmount',
        },
        {
          key: 'grossAmount',
        },
      ]

      let pdf = ref(null)
      let bookedInvoiceModal = ref(null)
      let currentScope = reactive({})

      function loadInvoicePDF(ctx) {
        axios
          .get(
            `${process.env.VUE_APP_URL}invoices/booked/${ctx.item.bookedInvoiceNumber}/pdf`,
            { responseType: 'blob' }
          )
          .then((res) => {
            Object.assign(currentScope, ctx)
            const blob = new Blob([res.data])
            const objectUrl = URL.createObjectURL(blob)
            pdf.value = objectUrl
            bookedInvoiceModal.value.show()
          })
          .catch((err) => {
            console.error(err)
          })
      }

      return { url, fields, loadInvoicePDF, bookedInvoiceModal, pdf }
    },
    components: {
      PaginatedTable,
    },
  })
</script>

<template>
  <b-tab title="Booked Invoices"
    ><paginated-table :results="10" :fields="fields" :url="url">
      <template #custom="{ scope }">
        <b-btn
          class="mr-2"
          size="sm"
          variant="primary"
          @click="loadInvoicePDF(scope)"
          >View</b-btn
        >
        <b-btn @click="openNotifyModal(scope)" size="sm" variant="primary">
          Notify
        </b-btn>
      </template>
    </paginated-table>
    <b-modal hide-footer size="xl" ref="bookedInvoiceModal" title="Invoice">
      <vue-pdf-app style="height: 79vh" :pdf="pdf"></vue-pdf-app>
    </b-modal>
    <b-modal
      body-bg-variant="light"
      ref="notifyConfirmationModal"
      hide-footer
      size="md"
      centered
      :title="`Notify customer of invoice ${currentScope.item.bookedInvoiceNumber}?`"
      ><b-row>
        <b-col cols="12" class="mb-3">
          Are you sure that you want to notify the customer of this invoice?
          This will send an e-mail to the customer's invoicing email and any
          associated employees.
        </b-col>
        <b-col cols="12">
          <b-btn class="mr-1" size="sm" variant="success" @click="notify"
            >Notify</b-btn
          >
          <b-btn size="sm" variant="danger" @click="closeNotifyModal"
            >Cancel</b-btn
          >
        </b-col>
      </b-row>
    </b-modal>
  </b-tab>
</template>

<script>
  import { defineComponent, reactive, ref } from '@vue/composition-api'
  import PaginatedTable from '../PaginatedTable.vue'
  import axios from 'axios'
  import VuePdfApp from 'vue-pdf-app'
  import 'vue-pdf-app/dist/icons/main.css'

  export default defineComponent({
    setup() {
      const url = `${process.env.VUE_APP_URL}invoices/booked`

      const fields = [
        {
          key: 'bookedInvoiceNumber',
          label: 'Invoice ID',
        },
        {
          key: 'customer.customerName',
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
      let currentScope = reactive({ item: { bookedInvoiceNumber: null } })

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

      const notifyConfirmationModal = ref(null)

      function openNotifyModal(scope) {
        Object.assign(currentScope, scope)
        notifyConfirmationModal.value.show()
      }

      function closeNotifyModal() {
        notifyConfirmationModal.value.hide()
      }

      function notify() {
        axios
          .post(
            `${process.env.VUE_APP_URL}invoices/booked/${currentScope.item.bookedInvoiceNumber}/notify`
          )
          .then(() => {
            notifyConfirmationModal.value.hide()
          })
      }

      return {
        url,
        fields,
        loadInvoicePDF,
        bookedInvoiceModal,
        pdf,
        openNotifyModal,
        currentScope,
        notifyConfirmationModal,
        closeNotifyModal,
        notify,
      }
    },
    components: {
      PaginatedTable,
      VuePdfApp,
    },
  })
</script>

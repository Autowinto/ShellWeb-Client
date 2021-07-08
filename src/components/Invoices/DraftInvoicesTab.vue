<template>
  <b-tab title="Draft Invoices">
    <div id="draft-table">
      <paginated-table ref="table" :results="10" :fields="fields" :url="url">
        <template #custom="{ scope }">
          <b-btn @click="loadInvoicePDF(scope)" size="sm" variant="primary"
            >Book
          </b-btn>
        </template>
      </paginated-table>
      <b-modal
        body-bg-variant="light"
        hide-footer
        lazy
        size="xl"
        id="book-invoice-modal"
        ref="bookInvoiceModal"
        :title="`Book Invoice`"
      >
        <b-overlay :show="isBooking">
          <div v-if="currentScope.item.recipient.ean">
            <h6>EAN Contact:</h6>
            <b-select
              v-model="selectedContact"
              :options="contacts"
              class="mb-3"
              size="sm"
            ></b-select>
          </div>
          <vue-pdf-app style="height: 79vh" :pdf="pdf"> </vue-pdf-app>
          <b-button
            @click="bookInvoice"
            class="my-2"
            size="sm"
            variant="success"
            >Book Invoice</b-button
          >
        </b-overlay>
      </b-modal>
    </div>
  </b-tab>
</template>

<script>
  import { defineComponent, ref, reactive } from '@vue/composition-api'
  import PaginatedTable from '../PaginatedTable.vue'
  import axios from 'axios'
  import * as auth from '../../auth/authHelper'
  import VuePdfApp from 'vue-pdf-app'
  import 'vue-pdf-app/dist/icons/main.css'

  export default defineComponent({
    setup() {
      const url = `${process.env.VUE_APP_URL}employees/${
        auth.getCurrentAccount().localAccountId
      }/invoices/drafts`
      const bookInvoiceModal = ref(null)
      const fields = [
        { key: 'draftInvoiceNumber', label: 'Invoice ID' },
        { key: 'customer.customerName', label: 'Customer' },
        { key: 'date', label: 'Date Created' },
      ]

      let currentScope = reactive({ item: { recipient: {} } })

      let pdf = ref('')

      let contacts = reactive([])

      let selectedContact = ref(null)

      let table = ref(null)
      function loadInvoicePDF(ctx) {
        axios
          .get(
            `${process.env.VUE_APP_URL}customers/${ctx.item.customer.customerNumber}/contacts`
          )
          .then((res) => {
            res.data.forEach((el) => {
              contacts.push({
                value: el.economicId,
                text: `${el.contactId} - ${el.firstName} ${el.lastName}`,
              })
            })
          })
        axios
          .get(
            `${process.env.VUE_APP_URL}invoices/drafts/${ctx.item.draftInvoiceNumber}/pdf`,
            { responseType: 'blob' }
          )
          .then((res) => {
            Object.assign(currentScope, ctx)
            const blob = new Blob([res.data])
            const objectUrl = URL.createObjectURL(blob)
            pdf.value = objectUrl
            bookInvoiceModal.value.show()
          })
          .catch(function () {
            console.error('Failed to fetch PDF')
          })
      }
      let isBooking = ref(false)

      function bookInvoice() {
        isBooking.value = true
        if (currentScope.item.recipient.ean) {
          if (selectedContact.value) {
            axios
              .post(`${process.env.VUE_APP_URL}invoices/booked`, {
                draftInvoiceId: currentScope.item.draftInvoiceNumber,
                economicContactId: selectedContact.value,
              })
              .then(() => {
                isBooking.value = false
                bookInvoiceModal.value.hide()
                table.value.loadData()
              })
              .catch((err) => {
                console.error(err)
              })
          }
        } else {
          axios
            .post(`${process.env.VUE_APP_URL}invoices/booked`, {
              draftInvoiceId: currentScope.item.draftInvoiceNumber,
            })
            .then(() => {
              bookInvoiceModal.value.hide()
            })
            .catch((err) => {
              console.error(err)
            })
        }
      }

      return {
        url,
        fields,
        loadInvoicePDF,
        pdf,
        bookInvoiceModal,
        bookInvoice,
        contacts,
        currentScope,
        selectedContact,
        isBooking,
        table,
      }
    },
    components: {
      PaginatedTable,
      VuePdfApp,
    },
  })
</script>

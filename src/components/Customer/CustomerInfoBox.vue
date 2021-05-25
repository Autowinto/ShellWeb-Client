<template>
  <div>
    <b-card no-body>
      <b-card-header>
        <b-row align-v="center">
          <b-col>
            <h6 v-if="customer.name" class="mb-0">
              {{ customer.name }} ({{ customer.customerNumber }})
            </h6>
            <b-skeleton width="100%" v-else></b-skeleton>
          </b-col> </b-row
      ></b-card-header>
      <b-card-body>
        <div class="row">
          <div class="col">
            <div class="mb-3">
              <h4 class="small font-weight-bold">Name</h4>
              <h4 class="small" v-if="customer.name">
                {{ customer.name }}
              </h4>
              <h4 v-else class="small">N/A</h4>
            </div>
            <div class="mb-3">
              <h4 class="small font-weight-bold">Currency</h4>
              <h4 class="small">
                {{ customer.currency }}
              </h4>
            </div>
            <div class="mb-3">
              <h4 class="small font-weight-bold">Sales Person</h4>
              <h4 v-if="customer.employee" class="small">
                {{ customer.employeeName }}
              </h4>
              <h4 v-else class="small">N/A</h4>
            </div>
            <div class="mb-3">
              <h4 class="small font-weight-bold">Invoice Tickets as Single</h4>
              <h4 v-if="customer.invoiceSingleTickets" class="small">
                {{ customer.invoiceSingleTickets }}
              </h4>
              <h4 v-else class="small">N/A</h4>
            </div>
          </div>
          <div class="col">
            <div class="mb-3">
              <h4 class="small font-weight-bold">Customer Group</h4>
              <h4 class="small">{{ customer.customerGroupName }}</h4>
            </div>
            <div class="mb-3">
              <h4 class="small font-weight-bold">Payment Terms</h4>
              <h4 class="small">{{ customer.paymentTermsName }}</h4>
            </div>
            <div class="mb-3">
              <h4 class="small font-weight-bold">Invoicing Frequency</h4>
              <h4 v-if="customer.invoiceFrequencyName" class="small">
                {{ customer.invoiceFrequencyName }}
              </h4>
              <h4 v-else class="small">N/A</h4>
            </div>
          </div>
        </div>
        <div class="card mb-3"></div>
        <div class="row">
          <div class="col">
            <div class="mb-3">
              <h4 class="small font-weight-bold">Phone Number</h4>
              <b-link v-if="customer.phone" class="small" :href="'tel:' + customer.phone">{{
                customer.phone
              }}</b-link>
              <h4 v-else class="small">N/A</h4>
            </div>
          </div>
          <div class="col">
            <div class="mb-3">
              <h4 class="small font-weight-bold">E-mail</h4>
              <b-link v-if="customer.phone" class="small" :href="'mailto:' + customer.email">{{
                customer.email
              }}</b-link>
            </div>
          </div>
        </div>
        <div class="card shadow mb-3"></div>
        <div class="row">
          <div class="col">
            <div class="mb-3">
              <h4 class="small font-weight-bold">Address</h4>
              <h4 class="small">
                {{ customer.address }}
              </h4>
            </div>
            <div class="mb-3">
              <h4 class="small font-weight-bold">ZIP Code</h4>
              <h4 class="small">{{ customer.zip }}</h4>
            </div>
          </div>
          <div class="col">
            <div class="mb-3">
              <h4 class="small font-weight-bold">City</h4>
              <h4 class="small">{{ customer.city }}</h4>
            </div>
            <div class="mb-3">
              <h4 class="small font-weight-bold">Country</h4>
              <h4 class="small">
                {{ customer.country }}
              </h4>
            </div>
          </div>
        </div>
        <div class="card shadow mb-2"></div>
        <div class="row mb-2">
          <div class="col">
            <button class="btn btn-sm btn-primary w-100" v-b-modal.customerEditModal>
              Edit Customer
            </button>
          </div>
        </div>
      </b-card-body>
    </b-card>
    <modal-form
      modalId="customerEditModal"
      modalTitle="Edit Customer"
      :submitUrl="customerEditUrl"
      :fields="formFields"
      fieldSize="sm"
      windowSize="xl"
      :baseData="customer"
      submitType="PUT"
      @submitted="submitted"
    ></modal-form>
  </div>
</template>

<script lang="ts">
  import ModalForm from '../ModalForm.vue'
  import axios from 'axios'
  import { ref, reactive } from '@vue/composition-api'
  export default {
    props: {
      customer: {
        type: Object,
        required: true,
      },
    },

    setup(props, { emit }) {
      let groupOptions = reactive([])
      let currencyOptions = reactive([])
      let paymentTermOptions = reactive([])
      let vatZoneOptions = reactive([])
      let employeeOptions = reactive([])
      const invoiceFrequencies = [
        { text: 'Weekly', value: 2 },
        { text: 'Biweekly', value: 3 },
        { text: 'Monthly', value: 4 },
      ]

      axios.get(`${process.env.VUE_APP_URL}invoices/customerGroups`).then((response) => {
        for (var item in response.data) {
          const group = response.data[item]
          groupOptions.push({
            value: group.customerGroupNumber,
            text: group.name,
          })
        }
      })

      axios.get(`${process.env.VUE_APP_URL}invoices/currencies`).then((response) => {
        for (var item in response.data) {
          const currency = response.data[item]
          currencyOptions.push({
            value: currency.code,
            text: currency.name,
          })
        }
      })
      axios.get(`${process.env.VUE_APP_URL}invoices/paymentTerms`).then((response) => {
        for (var item in response.data) {
          const term = response.data[item]
          paymentTermOptions.push({
            value: term.paymentTermsNumber,
            text: term.name,
          })
        }
      })
      axios.get(`${process.env.VUE_APP_URL}invoices/vatZones`).then((response) => {
        for (var item in response.data) {
          const vatZone = response.data[item]
          vatZoneOptions.push({
            value: vatZone.vatZoneNumber,
            text: vatZone.name,
          })
        }
      })
      axios.get(`${process.env.VUE_APP_URL}employees`).then((response) => {
        for (var item in response.data) {
          const employee = response.data[item]
          employeeOptions.push({
            value: employee.microsoftId,
            text: employee.name,
          })
        }
      })

      const formFields = reactive([
        {
          key: 'name',
          type: 'string',
          label: 'Name',
          required: true,
          cols: 6,
        },
        {
          key: 'domain',
          type: 'string',
          label: 'Domain',
          required: true,
          cols: 6,
        },
        {
          key: 'phone',
          type: 'string',
          label: 'Phone',
          cols: 3,
        },
        {
          key: 'employee',
          type: 'select',
          label: 'Employee',
          options: employeeOptions,
          required: true,
          cols: 3,
        },
        {
          key: 'customerGroupNumber',
          type: 'select',
          label: 'Customer Group',
          options: groupOptions,
          required: true,
          cols: 3,
        },
        {
          key: 'paymentTermsNumber',
          type: 'select',
          label: 'Payment Terms',
          options: paymentTermOptions,
          required: true,
          cols: 3,
        },

        {
          key: 'invoiceFrequency',
          type: 'select',
          label: 'Invoice Frequency',
          options: invoiceFrequencies,
          required: true,
          cols: 4,
        },
        {
          key: 'vatZoneNumber',
          type: 'select',
          label: 'VAT Zone',
          options: vatZoneOptions,
          required: true,
          cols: 4,
        },
        {
          key: 'currency',
          type: 'select',
          label: 'Currency',
          options: currencyOptions,
          required: true,
          cols: 4,
        },
        {
          key: 'address',
          type: 'string',
          label: 'Address',
          required: true,
          cols: 4,
        },
        {
          key: 'city',
          type: 'string',
          label: 'City',
          required: true,
          cols: 3,
        },
        {
          key: 'country',
          type: 'string',
          label: 'Country',
          required: true,
          cols: 3,
        },
        {
          key: 'zip',
          type: 'integer',
          label: 'Zip Code',
          required: true,
          cols: 2,
        },
        {
          key: 'invoiceSingleTickets',
          type: 'boolean',
          label: 'Invoice Tickets As Single',
          required: true,
          cols: 4,
        },
        {
          key: 'eInvoicingDisabledByDefault',
          type: 'boolean',
          label: 'Disable E-Invoicing',
          required: true,
          cols: 4,
        },
        {
          key: 'accessToOperationsCenter',
          type: 'boolean',
          label: 'Access To Operations Center',
          required: true,
          cols: 4,
        },
      ])

      function submitted() {
        emit('edited')
      }

      let editForm = ref({})
      const customerEditUrl = `${process.env.VUE_APP_URL}customers/${props.customer.customerNumber}`
      return { editForm, customerEditUrl, formFields, submitted }
    },
    data() {
      return {
        id: this.$route.query.id,
      }
    },
    components: {
      ModalForm,
    },
  }
</script>

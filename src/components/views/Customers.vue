<template>
  <div class="container-fluid">
    <b-card no-body>
      <b-card-header>
        <b-row align-v="center">
          <b-col>
            <h6 class="mb-0">Customers</h6>
          </b-col>
          <b-col>
            <div class="text-md-right">
              <b-button size="sm" v-b-modal.customerForm variant="primary"
                >Create Customer</b-button
              >
            </div>
          </b-col>
        </b-row>
      </b-card-header>
      <div class="card-body">
        <paginated-table
          ref="customersTable"
          :url="url"
          :results="10"
          :fields="fields"
          sortColumn="name"
          sortDirection="ASC"
          :searchableColumn="searchableColumn"
        >
        </paginated-table>
      </div>
    </b-card>
    <modal-form
      modalId="customerForm"
      modalTitle="Create Customer"
      :submitUrl="url"
      :fields="formFields"
      windowSize="lg"
      fieldSize="sm"
    ></modal-form>
  </div>
</template>

<script lang="ts">
  import axios from 'axios'
  import PaginatedTable from '../PaginatedTable.vue'
  import * as auth from '../../auth/authHelper'
  import ModalForm from '../ModalForm.vue'
  import { defineComponent, reactive } from '@vue/composition-api'

  export default defineComponent({
    setup() {
      interface SelectOption {
        text: string
        value: string
      }
      let paymentTerms: Array<SelectOption> = reactive([])
      let customerGroups: Array<SelectOption> = reactive([])
      let currencies: Array<SelectOption> = reactive([])
      let vatZones: Array<SelectOption> = reactive([])
      let employees: Array<SelectOption> = reactive([])
      let selectedEmployee = auth.getAccountId()
      let invoiceFrequencies = [
        { text: 'Weekly', value: 2 },
        { text: 'Biweekly', value: 3 },
        { text: 'Monthly', value: 4 },
      ]

      return {
        paymentTerms,
        customerGroups,
        currencies,
        vatZones,
        employees,
        invoiceFrequencies,
        selectedEmployee,
      }
    },
    // eslint-disable-next-line no-unused-vars
    data(this: any) {
      return {
        url: `${process.env.VUE_APP_URL}customers`,
        showError: false,
        form: {
          name: null,
          businessNumber: 0,
          domain: null,
          country: null,
          city: null,
          address: null,
          zip: null,
          phone: null,
          eInvoicingDisabledByDefault: null,
        },
        fields: [
          {
            key: 'customerId',
            label: 'CVR',
            sortable: true,
            thClass: 'idColumn',
          },
          {
            key: 'name',
            label: 'Name',
            sortable: true,
            typeOptions: {
              type: 'link',
              linkText: 'name',
              path: 'customer',
              idName: 'customerId',
            },
          },
        ],
        formFields: [
          {
            key: 'name',
            type: 'string',
            label: 'Name',
            cols: 6,
            required: true,
          },
          {
            key: 'cvr',
            type: 'integer',
            label: 'CVR',
            cols: 6,
            required: true,
          },
          {
            key: 'domain',
            type: 'string',
            label: 'Domain',
            cols: 6,
            required: true,
          },
          {
            key: 'phone',
            type: 'integer',
            label: 'Phone',
            cols: 6,
            required: true,
          },
          {
            key: 'employee',
            type: 'select',
            options: this.employees,
            label: 'Employee',
            cols: 4,
            required: true,
          },
          {
            key: 'group',
            type: 'select',
            label: 'Group',
            options: this.customerGroups,
            cols: 4,
            required: true,
          },
          {
            key: 'currency',
            type: 'select',
            label: 'Currency',
            options: this.currencies,
            cols: 4,
            required: true,
          },
          {
            key: 'paymentTerms',
            type: 'select',
            label: 'Payment Terms',
            options: this.paymentTerms,
            cols: 4,
            required: true,
          },
          {
            key: 'vatZone',
            type: 'select',
            label: 'VAT Zone',
            options: this.vatZones,
            cols: 4,
            required: true,
          },
          {
            key: 'invoiceFrequency',
            type: 'select',
            label: 'Invoice Frequency',
            options: this.invoiceFrequencies,
            cols: 4,
            required: true,
          },
        ],
        searchableColumn: 'name',
      }
    },
    created() {
      //Collect these calls in one axios.all call
      axios
        .get(`${process.env.VUE_APP_URL}invoices/customerGroups`)
        .then((response) => {
          for (var group of response.data) {
            this.customerGroups.push({
              value: group.customerGroupNumber,
              text: group.name,
            })
          }
        })
      axios
        .get(`${process.env.VUE_APP_URL}invoices/currencies`)
        .then((response) => {
          for (var currency of response.data) {
            this.currencies.push({
              value: currency.code,
              text: currency.name,
            })
          }
        })
      axios
        .get(`${process.env.VUE_APP_URL}invoices/paymentTerms`)
        .then((response) => {
          for (var term of response.data) {
            this.paymentTerms.push({
              value: term.paymentTermsNumber,
              text: term.name,
            })
          }
        })
      axios
        .get(`${process.env.VUE_APP_URL}invoices/vatZones`)
        .then((response) => {
          for (var vatZone of response.data) {
            this.vatZones.push({
              value: vatZone.vatZoneNumber,
              text: vatZone.name,
            })
          }
        })
      axios.get(`${process.env.VUE_APP_URL}employees`).then((response) => {
        for (var employee of response.data) {
          this.employees.push({
            value: employee.microsoftId,
            text: employee.name,
          })
        }
      })
    },
    components: {
      PaginatedTable,
      ModalForm,
    },
  })
</script>

<style lang="css">
  .form-row {
    color: black;
  }

  .idColumn {
    width: 15%;
  }
</style>

<template>
  <div class="container-fluid">
    <b-card no-body>
      <b-card-header>
        <h5 class="mb-0">Customers</h5>
      </b-card-header>
      <div class="card-body">
        <b-card bg-variant="light" class="mb-3">
          <div class="row">
            <div class="col-md-12">
              <div class="text-md-right">
                <b-button v-b-modal.customerForm variant="primary"
                  >Create Customer</b-button
                >
              </div>
            </div>
          </div>
        </b-card>
        <div>
          <paginated-table
            ref="customersTable"
            :url="url"
            :results="10"
            :fields="fields"
            :sortColumn="'name'"
          >
          </paginated-table>
        </div>
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

<script>
import axios from 'axios'
import PaginatedTable from '../PaginatedTable'
import * as auth from '../../auth/authHelper'
import ModalForm from '../ModalForm'
import { reactive } from '@vue/composition-api'

export default {
  setup() {
    let paymentTerms = reactive([])
    let customerGroups = reactive([])
    let currencies = reactive([])
    let vatZones = reactive([])
    let employees = reactive([])
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
    }
  },
  data() {
    console.log(this)
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
        selectedPaymentTerms: null,
        selectedGroup: null,
        selectedCurrency: null,
        selectedVatZone: null,
        eInvoicingDisabledByDefault: null,
        employee: null,
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
        { key: 'name', type: 'string', label: 'Name', cols: 6 },
        { key: 'cvr', type: 'integer', label: 'CVR', cols: 6 },
        { key: 'domain', type: 'string', label: 'Domain', cols: 6 },
        { key: 'phone', type: 'integer', label: 'Phone', cols: 6 },
        {
          key: 'employeeId',
          type: 'select',
          options: this.employees,
          label: 'Employee',
          cols: 4,
        },
        {
          key: 'groupId',
          type: 'select',
          label: 'Group',
          options: this.customerGroups,
          cols: 4,
        },
        {
          key: 'currencyId',
          type: 'select',
          label: 'Currency',
          options: this.currencies,
          cols: 4,
        },
        {
          key: 'paymentTermsId',
          type: 'select',
          label: 'Payment Terms',
          options: this.paymentTerms,
          cols: 4,
        },
        {
          key: 'vatZone',
          type: 'select',
          label: 'VAT Zone',
          options: this.vatZones,
          cols: 4,
        },
        {
          key: 'invoiceFrequency',
          type: 'select',
          label: 'Invoice Frequency',
          options: this.invoiceFrequencies,
          cols: 4,
        },
      ],
    }
  },
  created() {
    console.log(this)
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

    this.form.selectedEmployee = auth.getAccountId()
  },
  methods: {
    submitCustomer() {
      axios
        .post(`${process.env.VUE_APP_URL}customers`, this.form)
        .then(() => {
          //Refresh table of customers
          this.$refs['customerFormModal'].hide()
          this.$refs.customersTable.loadData()
        })
        .catch((error) => {
          console.log(error)
          if (error.response.status === 409) {
            //Code 409 is the code for duplicate resource
            this.showError = true
            this.scrollToModalTop()
          }
        })
    },
    scrollToModalTop() {
      var modal = document.getElementById('customerForm')
      modal.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    },
  },
  components: {
    PaginatedTable,
    ModalForm,
  },
}
</script>

<style lang="css">
.form-row {
  color: black;
}

.idColumn {
  width: 15%;
}
</style>
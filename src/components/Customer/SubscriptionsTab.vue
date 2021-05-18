<template>
  <div>
    <b-card class="text-right mb-3" bg-variant="light">
      <b-row>
        <!-- <b-col cols="8"><b-select></b-select></b-col> -->
        <b-col>
          <b-btn
            class="mr-2"
            v-if="role >= 4"
            @click="generateInvoice"
            variant="primary"
          >
            Generate Invoice
          </b-btn>
          <b-btn v-b-modal.customerSubscriptionModal variant="primary">
            Create Subscription
          </b-btn>
        </b-col>
      </b-row>
    </b-card>
    <paginated-table
      :url="url"
      ref="subTable"
      :uploadUrl="updateUrl"
      :deleteUrl="deleteUrl"
      :fields="fields"
      :sortColumn="'product'"
      :sortDirection="'DESC'"
      :editable="true"
      deletable
      :paginated="false"
      :deletableRole="4"
      description
    >
    </paginated-table>
    <modal-form
      :submitUrl="this.uploadUrl"
      modalId="customerSubscriptionModal"
      modalTitle="Create Subscription"
      :fields="formFields"
      windowSize="lg"
      fieldSize="sm"
      @submitted="handleCreated"
    ></modal-form>
  </div>
</template>

<script>
import axios from 'axios'
import dayjs from 'dayjs'
import PaginatedTable from '../PaginatedTable'
import ModalForm from '../ModalForm'
import store from '../../auth/store'

export default {
  data() {
    return {
      id: this.$route.query.id,
      url: `${process.env.VUE_APP_URL}subscriptions/instances/${this.$route.query.id}`,
      uploadUrl: `${process.env.VUE_APP_URL}customers/${this.$route.query.id}/subscriptions/instances`,
      updateUrl: `${process.env.VUE_APP_URL}subscriptions/instances`,
      deleteUrl: `${process.env.VUE_APP_URL}subscriptions/instances`,
      form: {},
      subscriptions: [],
      subscriptionInstances: [],
      currentPage: 1,
      totalItems: 0,
      results: 10,
      subscriptionOptions: [],
      billingEngineOptions: [],
      fields: [
        {
          key: 'name',
          sortable: true,
        },
        {
          key: 'subscriptionName',
          label: 'Subscription',
        },
        {
          key: 'units',
        },
        {
          key: 'unitPrice',
          typeOptions: {
            type: 'rate',
          },
        },
        {
          key: 'startDate',
          sortable: true,
          typeOptions: {
            type: 'date',
          },
        },
        {
          key: 'endDate',
          sortable: true,
          typeOptions: {
            type: 'date',
          },
        },
        {
          key: 'billingEngineName',
          label: 'Billing Engine',
          typeOptions: {
            type: 'constant', //Change this when adding more billing engine options
          },
        },
      ],
      formFields: [
        {
          key: 'subscriptionId',
          label: 'Subscription',
          type: 'lookup',
          textKeys: ['name'],
          lookupEndpoint: 'subscriptions',
          placeholder: 'Test',
          required: true,
          formOptions: {
            baseUrl: `${process.env.VUE_APP_URL}subscriptions`,
            keys: {
              name: 'name',
              unitPrice: 'price',
              startDate: 'startDate',
              endDate: 'endDate',
            },
          },
          cols: 12,
        },
        {
          key: 'name',
          type: 'string',
          label: 'Name',
          required: true,
          cols: 12,
        },
        {
          key: 'unitPrice',
          type: 'double',
          label: 'Unit Price',
          required: true,
        },
        {
          key: 'units',
          type: 'integer',
          label: 'Units',
          required: true,
        },
        {
          key: 'startDate',
          label: 'Start Date',
          type: 'date',
          required: true,
        },
        {
          key: 'endDate',
          label: 'End Date',
          type: 'date',
          required: false,
        },
      ],
    }
  },
  computed: {
    role() {
      return store.state.role.role
    },
  },
  created() {
    this.populateOptions()
    this.resetForm()
  },
  methods: {
    handleCreated() {
      this.$refs.subTable.loadData()
    },
    resetForm() {
      this.form = {
        customerId: this.$route.query.id,
      }
    },
    postSubscription() {
      axios
        .post(`${process.env.VUE_APP_URL}subscriptions/instances`, this.form)
        .then(() => {
          this.loadSubscriptionInstances()
          this.$refs['customerSubscriptionModal'].hide()
          this.resetForm()
        })
    },
    sendSubEdit(data) {
      axios
        .put(
          `${process.env.VUE_APP_URL}subscriptions/instances/${data.item.id}`,
          data.item
        )
        .then(() => {
          this.loadSubscriptionInstances()
          this.cancelEdit(data)
        })
    },
    doEdit(data) {
      data.toggleDetails()
      this.$set(data.item, 'editing', true)
    },
    cancelEdit(data) {
      this.$set(data.item, 'editing', false)
    },
    formatDate(date) {
      if (!dayjs(date).isValid()) return ''
      return dayjs(date).format('MMM D, YYYY')
    },
    pullFormData(value) {
      let object = this.subscriptions.find((obj) => {
        return obj.id == value
      })
      this.$set(this.form, 'name', object.name)
      this.$set(this.form, 'unitPrice', object.price)
      this.$set(this.form, 'startDate', object.startDate)
      this.$set(this.form, 'endDate', object.endDate)
    },
    async generateInvoice() {
      let response = await axios.post(
        `${process.env.VUE_APP_URL}endpoints/invoicing/subscriptions/customers/${this.id}`
      )
      console.log(response)
      alert('Invoice Generated') //Temporary alert solution
    },
    async populateOptions() {
      let subResponse = await axios.get(
        `${process.env.VUE_APP_URL}subscriptions`,
        {
          params: {
            sortColumn: 'id',
            sortDirection: 'ASC',
          },
        }
      )
      this.subscriptions = subResponse.data.collection

      for (let subscription of this.subscriptions) {
        this.subscriptionOptions.push({
          value: subscription.id,
          text: subscription.name,
        })
      }

      this.$set(this.formFields[0], 'options', this.subscriptionOptions)

      let engineResponse = await axios.get(
        `${process.env.VUE_APP_URL}subscriptions/info/billingEngines`
      )
      for (let engine of engineResponse.data) {
        this.billingEngineOptions.push({
          value: engine.id,
          text: engine.name,
        })
      }
    },
  },
  components: {
    PaginatedTable,
    ModalForm,
  },
}
</script>

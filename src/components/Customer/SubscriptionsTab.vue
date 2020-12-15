<template>
  <div>
    <b-card class="text-right mb-3" bg-variant="light">
      <b-btn v-b-modal.customerSubscriptionModal variant="success">
        Create Subscription
      </b-btn>
    </b-card>
    <b-table
      show-empty
      outlined
      hover
      :items="subscriptionInstances"
      :fields="fields"
    >
      <template #cell(id)>
        <b-btn class="fas fa-edit mr-2" variant="primary"> </b-btn>
        <b-btn variant="danger" class="fas fa-trash"> </b-btn>
      </template>
    </b-table>
    <b-modal
      id="customerSubscriptionModal"
      ref="customerSubscriptionModal"
      body-class="p-0"
      centered
      title="Create Subscription"
      size="lg"
      hide-footer
    >
      <b-card bg-variant="light">
        <b-form @submit="postSubscription">
          <b-form-group
            label-cols-sm="2"
            label="Name:"
            label-align-sm="right"
            description="Required"
          >
            <b-input type="text" required v-model="form.name"></b-input>
          </b-form-group>
          <b-form-group
            label-cols-sm="2"
            label="Subscription:"
            label-align-sm="right"
            description="Required"
          >
            <b-select
              @input="changeFormPrice"
              :options="subscriptionOptions"
              v-model="form.subscription"
            >
            </b-select>
          </b-form-group>
          <b-form-group
            label-cols-sm="2"
            label="Unit price:"
            label-align-sm="right"
            label-for="input-name"
            description="Required"
          >
            <b-input
              v-model="form.unitPrice"
              type="number"
              step="0.01"
              required
            ></b-input>
          </b-form-group>
          <b-form-group
            label-cols-sm="2"
            label="Units:"
            label-align-sm="right"
            description="Required"
          >
            <b-input
              v-model="form.units"
              type="number"
              step="1"
              required
            ></b-input>
          </b-form-group>
          <b-form-group
            label-cols-sm="2"
            label="Start Date:"
            label-align-sm="right"
            description="Required"
          >
            <b-datepicker
              v-model="form.startDate"
              id="start-picker"
              size="sm"
              calendar-width="100%"
              required
            ></b-datepicker>
          </b-form-group>
          <b-form-group
            label-cols-sm="2"
            label="End Date:"
            label-align-sm="right"
          >
            <b-datepicker
              v-model="form.endDate"
              id="end-picker"
              size="sm"
              calendar-width="100%"
            ></b-datepicker>
          </b-form-group>
          <b-btn type="submit" variant="success">Create</b-btn>
        </b-form>
      </b-card>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      form: {},
      subscriptions: [],
      subscriptionInstances: [],
      currentPage: 1,
      results: 10,
      subscriptionOptions: [],
      id: this.$route.query.customerID,
      fields: [
        {
          key: 'name',
        },
        {
          key: 'subscriptionName',
          label: 'Subscription',
        },
        {
          key: 'unitCount',
          label: 'Units',
        },
        {
          key: 'unitPrice',
        },
        {
          key: 'startDate',
        },
        {
          key: 'endDate',
        },
        {
          key: 'billingEngineName',
          label: 'Billing Type',
        },
        {
          key: 'id',
          label: 'Actions',
        },
      ],
    }
  },
  created() {
    this.loadSubscriptionInstances()
    this.populateOptions()
  },
  methods: {
    async loadSubscriptionInstances() {
      let response = await axios.get(
        `${process.env.VUE_APP_URL}subscriptions/instances/${this.id}`,
        {
          params: {
            page: this.currentPage,
            results: this.results,
          },
        }
      )
      this.subscriptionInstances = response.data
    },
    postSubscription() {
      axios
        .post(`${process.env.VUE_APP_URL}subscriptions/instances`, this.form)
        .then(() => {
          this.loadSubscriptionInstances()
        })
    },
    changeFormPrice(value) {
      let object = this.subscriptions.find((obj) => {
        return obj.id == value
      })
      this.$set(this.form, 'unitPrice', object.price)
      this.$set(this.form, 'startDate', object.startDate)
      this.$set(this.form, 'endDate', object.endDate)
    },
    async populateOptions() {
      let response = await axios.get(`${process.env.VUE_APP_URL}subscriptions`)
      this.subscriptions = response.data

      for (let subscription of response.data) {
        this.subscriptionOptions.push({
          value: subscription.id,
          text: subscription.name,
        })
      }
    },
  },
  watch: {
    currentPage() {
      this.loadData()
    },
  },
}
</script>
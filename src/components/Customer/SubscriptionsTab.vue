<template>
  <div>
    <b-card class="text-right mb-3" bg-variant="light">
      <b-btn v-b-modal.customerSubscriptionModal variant="success">
        Create Subscription
      </b-btn>
    </b-card>
    <b-table show-empty outlined hover :items="subscriptions" :fields="fields">
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
            label="Subscription:"
            label-align-sm="right"
            description="Required"
          >
            <b-select> </b-select>
          </b-form-group>
          <b-form-group
            label-cols-sm="2"
            label="Price:"
            label-align-sm="right"
            label-for="input-name"
            description="Required"
          >
            <b-input
              v-model="form.price"
              id="input-name"
              type="number"
              step="0.01"
              required
            ></b-input>
          </b-form-group>
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
      currentPage: 1,
      results: 10,
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
    this.loadSubscriptions()
  },
  methods: {
    async loadSubscriptions() {
      let response = await axios.get(
        `${process.env.VUE_APP_URL}subscriptions/instances/${this.id}`,
        {
          params: {
            page: this.currentPage,
            results: this.results,
          },
        }
      )
      this.subscriptions = response.data
    },
    postSubscription() {},
  },
}
</script>
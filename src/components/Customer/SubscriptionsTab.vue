<template>
  <div>
    <b-card class="text-right mb-3" bg-variant="light">
      <b-btn v-b-modal.customerSubscriptionModal variant="success">
        Create Subscription
      </b-btn>
    </b-card>
    <paginated-table
      :url="url"
      :uploadUrl="uploadUrl"
      :fields="fields"
      :results="10"
      :sortColumn="'product'"
      :sortDirection="'DESC'"
      :editable="true"
    >
    </paginated-table>
    <!-- <b-table
      show-empty
      outlined
      hover
      :items="subscriptionInstances"
      :fields="fields"
    >
      <template #cell(name)="data">
        <div v-if="!data.item.editing">
          {{ data.item.name }}
        </div>
        <div v-else-if="data.item.editing">
          <b-input v-model="data.item.name"></b-input>
        </div>
      </template>
      <template #cell(subscriptionName)="data">
        <div v-if="!data.item.editing">
          {{ data.item.subscriptionName }}
        </div>
        <div v-if="data.item.editing">
          <b-select
            required
            v-model="data.item.subscriptionId"
            :options="subscriptionOptions"
          ></b-select>
        </div>
      </template>
      <template #cell(units)="data">
        <div v-if="!data.item.editing">{{ data.item.units }}</div>
        <div v-if="data.item.editing">
          <b-input v-model="data.item.units" type="number"></b-input>
        </div>
      </template>
      <template #cell(unitPrice)="data">
        <div v-if="!data.item.editing">{{ data.item.unitPrice }}</div>
        <div v-if="data.item.editing">
          <b-input
            v-model="data.item.unitPrice"
            type="number"
            step="0.01"
          ></b-input>
        </div>
      </template>
      <template #cell(price)="data">
        <div v-if="!data.item.editing">{{ data.item.price }}DKK</div>
        <div v-else-if="data.item.editing">
          <b-input
            type="number"
            step="0.01"
            v-model="data.item.price"
          ></b-input>
        </div>
      </template>
      <template #cell(startDate)="data">
        <div v-if="!data.item.editing">
          {{ formatDate(data.item.startDate) }}
        </div>
        <div v-else-if="data.item.editing">
          <b-datepicker
            size="sm"
            calendar-width="350px"
            v-model="data.item.startDate"
          ></b-datepicker>
        </div>
      </template>
      <template #cell(endDate)="data">
        <div v-if="!data.item.editing">
          {{ formatDate(data.item.endDate) }}
        </div>
        <div v-else-if="data.item.editing">
          <b-datepicker
            size="sm"
            calendar-width="350px"
            v-model="data.item.endDate"
          ></b-datepicker>
        </div>
      </template>
      <template #cell(billingEngineName)="data">
        <div v-if="!data.item.editing">
          {{ data.item.billingEngineName }}
        </div>
        <div v-else-if="data.item.editing">
          <b-select
            required
            v-model="data.item.billingEngineId"
            :options="billingEngineOptions"
          ></b-select>
        </div>
      </template> -->
    <!-- <template #cell(id)="data">
        <div v-if="!data.item.editing">
          <b-btn
            variant="primary"
            class="fas fa-edit mr-2"
            @click="doEdit(data)"
          ></b-btn>
        </div>
        <div v-else-if="data.item.editing">
          <b-btn variant="success" class="mr-1" @click="sendSubEdit(data)"
            >Save</b-btn
          >
          <b-btn variant="danger" @click="cancelEdit(data)">Cancel</b-btn>
        </div>
      </template>
    </b-table>
    <b-pagination
      size="md"
      v-model="currentPage"
      :total-rows="totalItems"
      :per-page="results"
    ></b-pagination> -->
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
        <b-form @submit="postSubscription" onsubmit="return false;">
          <b-form-group
            label-cols-sm="2"
            label="Subscription:"
            label-align-sm="right"
            description="Required"
          >
            <b-select
              @change="pullFormData"
              :options="subscriptionOptions"
              v-model="form.subscription"
            >
            </b-select>
          </b-form-group>
          <b-card no-body class="mb-3"></b-card>
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
import dayjs from 'dayjs'
import PaginatedTable from '../PaginatedTable'

export default {
  data() {
    return {
      id: this.$route.query.id,
      url: `${process.env.VUE_APP_URL}subscriptions/instances/${this.$route.query.id}`,
      uploadUrl: `${process.env.VUE_APP_URL}subscriptions/instances`,
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
        },
      ],
    }
  },
  created() {
    this.populateOptions()
    this.resetForm()
  },
  methods: {
    resetForm() {
      this.form = {
        customerId: Number(this.$route.query.customerID),
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

      // let engineResponse = await axios.get(
      //   `${process.env.VUE_APP_URL}subscriptions/billingEngines`
      // )
      // for (let engine of engineResponse.data) {
      //   this.billingEngineOptions.push({
      //     value: engine.id,
      //     text: engine.name,
      //   })
      // }
    },
  },
  components: {
    PaginatedTable,
  },
}
</script>

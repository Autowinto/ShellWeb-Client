<template>
  <div>
    <b-card bg-variant="light" class="mb-3">
      <b-col class="text-right">
        <b-btn class="mr-3" variant="success" v-b-modal.createSubscriptionModal
          >Create Subscription</b-btn
        >
        <b-btn variant="success" v-b-modal.createGroupModal>Create Group</b-btn>
      </b-col>
    </b-card>
    <b-col class="p-0">
      <b-btn block class="mb-3" variant="primary" v-b-toggle.groupsAccordion
        >Groups</b-btn
      >
    </b-col>
    <b-collapse id="groupsAccordion" accordion="accordion">
      <b-table :items="groups" :fields="groupFields" outlined hover show-empty>
        <template #cell(name)="data">
          <div v-if="data.item.editing">
            <b-input v-model="data.item.name" type="text"></b-input>
          </div>
          <div v-else>
            {{ data.item.name }}
          </div>
        </template>
        <template #cell(id)="data">
          <div v-if="!data.item.editing">
            <b-btn
              variant="primary"
              class="fas fa-edit mr-2"
              @click="doEdit(data)"
            ></b-btn>
            <b-btn
              variant="danger"
              class="fas fa-trash"
              @click="deleteGroup(data.item)"
            ></b-btn>
          </div>
          <div v-else-if="data.item.editing">
            <b-btn variant="success" class="mr-1" @click="sendEdit(data)"
              >Save</b-btn
            >
            <b-btn variant="danger" @click="cancelEdit(data)">Cancel</b-btn>
          </div>
        </template>
      </b-table>
      <!-- <paginated-table></paginated-table> -->
    </b-collapse>
    <b-table
      :items="subscriptions"
      :fields="subscriptionFields"
      show-empty
      outlined
      hover
    >
      <template #cell(product)="data">
        <div v-if="!data.item.editing">
          {{ data.item.product }}
        </div>
        <div v-if="data.item.editing">
          <b-select
            v-model="data.item.product"
            :options="productOptions"
          ></b-select>
        </div>
      </template>
      <template #cell(name)="data">
        <div v-if="!data.item.editing">
          {{ data.item.name }}
        </div>
        <div v-else-if="data.item.editing">
          <b-input v-model="data.item.name"></b-input>
        </div>
      </template>
      <template #cell(billingEngineId)="data">
        <div v-if="!data.item.editing">
          {{ data.item.billingEngineName }}
        </div>
        <div v-if="data.item.editing">
          <b-select
            required
            v-model="data.item.billingEngineId"
            :options="billingEngineOptions"
          ></b-select>
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
      <template #cell(groupName)="data">
        <div v-if="!data.item.editing">
          {{ data.item.groupName }}
        </div>
        <div v-if="data.item.editing">
          <b-select
            v-model="data.item.groupId"
            :options="groupOptions"
          ></b-select>
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
      <template #cell(ticketFrequencyId)="data">
        <div v-if="!data.item.editing">
          {{ data.item.ticketFrequencyName }}
        </div>
        <div v-else-if="data.item.editing">
          <b-select
            v-model="data.item.ticketFrequencyId"
            :options="frequencyOptions"
          >
          </b-select>
        </div>
      </template>
      <template #cell(paymentFrequencyId)="data">
        <div v-if="!data.item.editing">
          {{ data.item.paymentFrequencyName }}
        </div>
        <div v-if="data.item.editing">
          <b-select
            v-model="data.item.paymentFrequencyId"
            :options="frequencyOptions"
          ></b-select>
        </div>
      </template>
      <template #cell(deactivated)="data">
        <div v-if="!data.item.editing">
          <div v-if="data.item.active == '1'">
            <b-badge size="sm" variant="success">Active</b-badge>
          </div>
          <div v-else>
            <b-badge size="sm" variant="danger">Inactive</b-badge>
          </div>
        </div>
        <div v-else>
          <b-checkbox v-model="data.item.active" value="1" unchecked-value="0">
          </b-checkbox>
        </div>
      </template>
      <template #cell(id)="data">
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
    <b-pagination></b-pagination>
    <b-modal
      id="createSubscriptionModal"
      centered
      body-class="p-0"
      ref="createSubscriptionModal"
      title="Create Subscription"
      hide-footer
      size="lg"
    >
      <b-card bg-variant="light">
        <b-form @submit="submitSubscription" onsubmit="return false;">
          <b-form-group
            label-cols-sm="3"
            label="Product:"
            label-align-sm="right"
            description="Required"
          >
            <b-select
              v-model="subscriptionCreationForm.product"
              :options="productOptions"
              required
            ></b-select>
          </b-form-group>
          <b-form-group
            label-cols-sm="3"
            label="Name:"
            label-align-sm="right"
            description="Required"
          >
            <b-input
              v-model="subscriptionCreationForm.name"
              type="text"
              required
            ></b-input>
          </b-form-group>
          <b-form-group
            label-cols-sm="3"
            label="Description:"
            label-align-sm="right"
          >
            <b-form-textarea v-model="subscriptionCreationForm.description">
            </b-form-textarea>
          </b-form-group>
          <b-form-group
            label-cols-sm="3"
            label="Billing Engine:"
            label-align-sm="right"
            description="Required"
          >
            <b-select
              :options="billingEngineOptions"
              v-model="subscriptionCreationForm.billingEngine"
              required
            ></b-select>
          </b-form-group>
          <b-form-group
            label-cols-sm="3"
            label="Price:"
            label-align-sm="right"
            description="Required"
          >
            <b-input
              required
              v-model="subscriptionCreationForm.price"
              type="number"
              step="0.01"
            >
            </b-input>
          </b-form-group>
          <b-form-group
            label-cols-sm="3"
            label="Payment Frequency:"
            label-align-sm="right"
            description="Required"
          >
            <b-select
              required
              :options="frequencyOptions"
              v-model="subscriptionCreationForm.paymentFrequencyId"
            ></b-select>
          </b-form-group>
          <b-form-group
            label-cols-sm="3"
            label="Ticket Frequency:"
            label-align-sm="right"
            description="Required"
          >
            <b-select
              required
              :options="frequencyOptions"
              v-model="subscriptionCreationForm.ticketFrequencyId"
            ></b-select>
          </b-form-group>
          <b-form-group
            label-cols-sm="3"
            label="Group:"
            label-align-sm="right"
            description="Required"
          >
            <b-select
              required
              :options="groupOptions"
              v-model="subscriptionCreationForm.group"
            ></b-select>
          </b-form-group>
          <b-form-group
            label-cols-sm="3"
            label="Start Date:"
            label-align-sm="right"
            description="Required"
          >
            <b-datepicker
              v-model="subscriptionCreationForm.startDate"
              id="start-picker"
              size="sm"
              calendar-width="100%"
              required
            ></b-datepicker>
          </b-form-group>
          <b-form-group
            label-cols-sm="3"
            label="End Date:"
            label-align-sm="right"
          >
            <b-datepicker
              v-model="subscriptionCreationForm.endDate"
              id="end-picker"
              size="sm"
              calendar-width="100%"
            ></b-datepicker>
          </b-form-group>
          <b-btn type="submit" variant="success">Create</b-btn>
        </b-form>
      </b-card>
    </b-modal>
    <b-modal
      id="createGroupModal"
      centered
      body-class="p-0"
      ref="createGroupModal"
      title="Create Group"
      hide-footer
      size="lg"
    >
      <b-card bg-variant="light">
        <b-form @submit="submitGroup" onsubmit="return false;">
          <b-form-group
            label-cols-sm="3"
            label="Group name:"
            label-align-sm="right"
            label-for="input-product"
            description="Required"
          >
            <b-input
              v-model="groupCreationForm.name"
              id="input-name"
              type="text"
              required
            ></b-input>
          </b-form-group>
          <b-btn type="submit" variant="success">Create</b-btn>
        </b-form>
      </b-card>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios'
// import PaginatedTable from '../PaginatedTable'
import dayjs from 'dayjs'

export default {
  components: {
    // PaginatedTable,
  },
  data() {
    return {
      subscriptions: [],
      groups: [],
      subscriptionCreationForm: {},
      groupCreationForm: {},
      groupFields: [
        {
          key: 'name',
        },
        {
          key: 'id',
          label: 'Actions',
          class: 'w-25',
        },
      ],
      subscriptionFields: [
        {
          key: 'product',
        },
        {
          key: 'name',
        },
        {
          key: 'billingEngineId',
          label: 'Billing',
        },
        {
          key: 'price',
        },
        {
          key: 'groupName',
          label: 'Group',
        },
        {
          key: 'startDate',
        },
        {
          key: 'endDate',
        },
        {
          key: 'ticketFrequencyId',
          label: 'Ticket Frequency',
        },
        {
          key: 'paymentFrequencyId',
          label: 'Payment Frequency',
        },
        {
          key: 'deactivated',
        },
        {
          key: 'id',
          label: 'Actions',
        },
      ],
      productOptions: [],
      billingEngineOptions: [],
      frequencyOptions: [],
      groupOptions: [],
    }
  },
  created() {
    this.loadGroups()
    this.loadSubscriptions()
    this.populateOptions()
  },
  methods: {
    formatDate(date) {
      if (!dayjs(date).isValid()) return ''
      return dayjs(date).format('MMM D, YYYY')
    },
    async populateOptions() {
      let products = await axios.get(
        `${process.env.VUE_APP_URL}products/1/1000`
      )

      let engines = await axios.get(`
        ${process.env.VUE_APP_URL}subscriptions/billingEngines
      `)

      let frequencies = await axios.get(
        `${process.env.VUE_APP_URL}subscriptions/paymentFrequencies`
      )

      for (let product of products.data.products.collection) {
        this.productOptions.push({
          value: product.productNumber,
          text: product.name,
        })
      }

      for (let engine of engines.data) {
        this.billingEngineOptions.push({
          value: engine.id,
          text: engine.name,
        })
      }

      for (let frequency of frequencies.data) {
        this.frequencyOptions.push({
          value: frequency.id,
          text: frequency.name,
        })
      }

      this.groupOptions = [] //This is a bad fix
      for (let group of this.groups) {
        this.groupOptions.push({
          value: group.id,
          text: group.name,
        })
      }
    },
    async loadGroups() {
      let data = await axios.get(`${process.env.VUE_APP_URL}subscriptionGroups`)

      this.groups = data.data
    },
    deleteGroup(item) {
      axios
        .delete(`${process.env.VUE_APP_URL}subscriptionGroups/${item.id}`)
        .then(() => {
          this.loadGroups()
        })
    },
    deleteSubscription(item) {
      axios
        .delete(`${process.env.VUE_APP_URL}subscriptions/${item.id}`)
        .then(() => {
          this.loadSubscriptions()
        })
    },
    async loadSubscriptions() {
      let response = await axios.get(`${process.env.VUE_APP_URL}subscriptions`)
      this.subscriptions = response.data
    },
    submitSubscription() {
      axios
        .post(
          `${process.env.VUE_APP_URL}subscriptions`,
          this.subscriptionCreationForm
        )
        .then(() => {
          this.loadSubscriptions()
          this.$refs['createSubscriptionModal'].hide()
        })
    },
    submitGroup() {
      axios
        .post(
          `${process.env.VUE_APP_URL}subscriptionGroups`,
          this.groupCreationForm
        )
        .then(() => {
          this.loadGroups()
          this.populateOptions()
          this.$refs['createGroupModal'].hide()
        })
    },
    sendEdit(data) {
      axios.put(
        `${process.env.VUE_APP_URL}subscriptionGroups/${data.item.id}`,
        data.item
      )
    },
    sendSubEdit(data) {
      axios
        .put(
          `${process.env.VUE_APP_URL}subscriptions/${data.item.id}`,
          data.item
        )
        .then(() => {
          this.loadSubscriptions()
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
  },
}
</script>

<style>
</style>

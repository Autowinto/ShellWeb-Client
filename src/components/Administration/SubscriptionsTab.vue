<template>
  <div>
    <b-card bg-variant="light" class="mb-3">
      <b-col class="text-right">
        <b-btn class="mr-3" variant="success" v-b-modal.createSubscriptionModal
          >Create Subscription</b-btn
        >
        <b-btn variant="success" v-b-modal.create-group-modal
          >Create Group</b-btn
        >
      </b-col>
    </b-card>
    <b-col class="p-0">
      <b-btn block class="mb-3" variant="primary" v-b-toggle.groupsAccordion
        >Groups</b-btn
      >
    </b-col>
    <b-collapse id="groupsAccordion" accordion="accordion">
      <paginated-table
        :url="subGroupUrl"
        ref="subGroupTable"
        :uploadUrl="subGroupUrl"
        :fields="groupFields"
        :results="10"
        :sortColumn="'name'"
        :sortDirection="'DESC'"
        :editable="true"
        :deletable="true"
        :deletableRole="0"
      ></paginated-table>
    </b-collapse>
    <paginated-table
      :url="subUrl"
      :uploadUrl="subUrl"
      :fields="subscriptionFields"
      :sortColumn="'product'"
      :sortDirection="'DESC'"
      :editable="true"
      :deletable="true"
      :deletableRole="0"
      :results="10"
    ></paginated-table>
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
    <modal-form
      :submitUrl="subGroupUrl"
      modalId="create-group-modal"
      :fields="groupFormFields"
      modalTitle="Create Subscription Group"
      windowSize="lg"
      fieldSize="sm"
      @submitted="handleCreated"
    ></modal-form>
    <!-- <b-modal
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
    </b-modal> -->
  </div>
</template>

<script>
import axios from 'axios'
import PaginatedTable from '../PaginatedTable'
import ModalForm from '../ModalForm'
import dayjs from 'dayjs'

export default {
  components: {
    PaginatedTable,
    ModalForm,
  },
  data() {
    return {
      subUrl: `${process.env.VUE_APP_URL}subscriptions`,
      subGroupUrl: `${process.env.VUE_APP_URL}subscriptionGroups`,
      subscriptions: [],
      groups: [],
      subscriptionCreationForm: {},
      groupCreationForm: {},
      groupFormFields: [
        {
          key: 'name',
          type: 'string',
          label: 'Group Name',
          cols: 12,
        },
      ],
      groupFields: [
        {
          key: 'name',
          sortable: true,
        },
      ],
      subscriptionFields: [
        {
          key: 'product',
          sortable: true,
          typeOptions: {
            type: 'select',
            options: this.productOptions,
          },
        },
        {
          key: 'name',
          sortable: true,
        },
        {
          key: 'billingEngineId',
          label: 'Billing',
          sortable: true,
          typeOptions: {
            type: 'select',
            options: this.billingEngineOptions,
          },
        },
        {
          key: 'price',
          sortable: true,
          typeOptions: {
            type: 'rate',
          },
        },
        {
          key: 'groupId',
          label: 'Group',
          sortable: true,
          typeOptions: {
            type: 'select',
            options: this.groupOptions,
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
          key: 'ticketFrequencyId',
          label: 'Ticket Frequency',
          sortable: true,
          typeOptions: {
            type: 'select',
            options: this.frequencyOptions,
          },
        },
        {
          key: 'paymentFrequencyId',
          label: 'Payment Frequency',
          sortable: true,
          typeOptions: {
            type: 'select',
            options: this.frequencyOptions,
          },
        },
        {
          key: 'active',
          label: 'Status',
          sortable: true,
          typeOptions: {
            type: 'status', //This is very custom and propably a good idea to rewrite sometime
          },
        },
      ],
      productOptions: [],
      billingEngineOptions: [],
      frequencyOptions: [],
      groupOptions: [],
      totalItems: 0,
      currentPage: 1,
    }
  },
  created() {
    this.loadGroups()
    this.populateOptions()
  },
  methods: {
    handleCreated() {
      this.$refs.subGroupTable.loadData()
    },
    formatDate(date) {
      if (!dayjs(date).isValid()) return ''
      return dayjs(date).format('MMM D, YYYY')
    },
    async populateOptions() {
      let products = await axios.get(
        `${process.env.VUE_APP_URL}products/1/1000`
      )

      for (let product of products.data.products.collection) {
        this.productOptions.push({
          value: product.productNumber,
          text: product.name,
        })
      }

      this.subscriptionFields[0].typeOptions.options = this.productOptions //This is a bit hacky. Might be a better solution

      let engines = await axios.get(`
        ${process.env.VUE_APP_URL}subscriptions/info/billingEngines
      `)

      for (let engine of engines.data) {
        this.billingEngineOptions.push({
          value: engine.id,
          text: engine.name,
        })
      }
      this.subscriptionFields[2].typeOptions.options = this.billingEngineOptions //This is a bit hacky. Might be a better solution

      let frequencies = await axios.get(
        `${process.env.VUE_APP_URL}subscriptions/info/paymentFrequencies`
      )

      for (let frequency of frequencies.data) {
        this.frequencyOptions.push({
          value: frequency.id,
          text: frequency.name,
        })
      }
      this.subscriptionFields[7].typeOptions.options = this.frequencyOptions //This is a bit hacky. Might be a better solution
      this.subscriptionFields[8].typeOptions.options = this.frequencyOptions //This is a bit hacky. Might be a better solution

      this.groupOptions = [] //This is a bad fix
      for (let group of this.groups) {
        this.groupOptions.push({
          value: group.id,
          text: group.name,
        })
      }

      this.subscriptionFields[4].typeOptions.options = this.groupOptions //This is a bit hacky. Might be a better solution
    },
    async loadGroups() {
      let response = await axios.get(
        `${process.env.VUE_APP_URL}subscriptionGroups`,
        {
          params: {
            page: 1,
            results: 1000,
            sortColumn: 'name',
            sortDirection: 'DESC',
          },
        }
      )

      this.groups = response.data.collection
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
      let response = await axios.get(
        `${process.env.VUE_APP_URL}subscriptions`,
        {
          params: {
            page: this.currentPage,
            results: 10,
          },
        }
      )
      console.log(response.data.collection)
      this.subscriptions = response.data.collection
      this.totalItems = response.data.totalItems
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
      axios
        .put(
          `${process.env.VUE_APP_URL}subscriptionGroups/${data.item.id}`,
          data.item
        )
        .then(() => {
          this.cancelEdit(data)
        })
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
  watch: {
    currentPage() {
      this.loadSubscriptions()
    },
  },
}
</script>

<style>
</style>

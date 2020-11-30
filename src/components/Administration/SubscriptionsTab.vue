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
        <template #cell(id)="data">
          <b-btn variant="primary" class="fas fa-edit mr-2"></b-btn>
          <b-btn
            variant="danger"
            class="fas fa-trash"
            @click="deleteGroup(data.item)"
          ></b-btn>
        </template>
      </b-table>
    </b-collapse>
    <b-table :items="subscriptions" show-empty outlined hover> </b-table>
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
        <b-form @submit="submitSubscription">
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
            label="Type:"
            label-align-sm="right"
            description="Required"
          >
            <b-select
              :options="typeOptions"
              v-model="subscriptionCreationForm.type"
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
            >
            </b-input>
          </b-form-group>
          <b-form-group
            label-cols-sm="3"
            label="Payment frequency:"
            label-align-sm="right"
            description="Required"
          >
            <b-select
              required
              :options="frequencyOptions"
              v-model="subscriptionCreationForm.frequency"
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
            label="Start date:"
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
            label="End date:"
            label-align-sm="right"
          >
            <b-datepicker
              v-model="subscriptionCreationForm.endDate"
              id="end-picker"
              size="sm"
              calendar-width="100%"
            ></b-datepicker>
          </b-form-group>
          <b-form-group
            v-model="subscriptionCreationForm.requiredTickets"
            label-cols-sm="3"
            label="Required tickets:"
            label-align-sm="right"
            description="Required"
          >
            <b-input required type="number"></b-input>
          </b-form-group>
          <b-btn type="submit" variant="success">Create</b-btn>
          <b-btn> </b-btn>
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

export default {
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
      subscriptionFields: [{}],
      productOptions: [],
      typeOptions: [],
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
    async populateOptions() {
      let products = await axios.get(
        `${process.env.VUE_APP_URL}products/1/1000`
      )

      let types = await axios.get(
        `${process.env.VUE_APP_URL}subscriptions/types`
      )
      let frequencies = await axios.get(
        `${process.env.VUE_APP_URL}subscriptions/paymentFrequencies`
      )
      console.log(frequencies)

      for (let product of products.data.products.collection) {
        this.productOptions.push({
          value: product.productNumber,
          text: product.name,
        })
      }
      for (let type of types.data) {
        this.typeOptions.push({
          value: type.id,
          text: type.name,
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
    async loadSubscriptions() {},
    submitSubscription() {
      axios
        .post(
          `${process.env.VUE_APP_URL}subscriptions`,
          this.subscriptionCreationForm
        )
        .then(() => {
          this.loadSubscriptions()
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
  },
}
</script>

<style>
</style>

<template>
  <b-card-text>
    <div>
      <b-table
        show-empty
        outlined
        hover
        ref="passTable"
        :items="items"
        :fields="fields"
        :per-page="0"
        :current-page="currentPage"
      >
        <template v-slot:cell(password)="data">
          <span v-if="data.item.password">{{ data.item.password }}</span>
          <span v-else>********</span>
        </template>
        <template v-slot:cell(togglePass)="data">
          <b-button
            v-if="role >= data.item.accessLevel"
            class="fas fa-eye"
            variant="primary"
            @click="getPassword(data.item.passwordId)"
          ></b-button>
          <b-button v-else class="fas fa-eye" disabled> </b-button>
        </template>
      </b-table>
      <b-pagination
        size="md"
        v-model="currentPage"
        :total-rows="totalItems"
        :per-page="results"
      >
      </b-pagination>
    </div>
  </b-card-text>
</template>

<script>
import axios from 'axios'
import * as auth from '../../auth/authHelper'
import store from '../../auth/store'

export default {
  data() {
    return {
      customerId: null,
      results: 10,
      currentPage: 1,
      totalItems: 10,
      items: [],
      fields: [
        {
          key: 'name',
          label: 'Name',
        },
        {
          key: 'domain',
        },
        {
          key: 'url',
          label: 'URL',
        },
        {
          key: 'username',
        },
        {
          key: 'password',
        },
        {
          key: 'accessLevel',
        },
        {
          key: 'togglePass',
          label: 'Actions',
        },
      ],
    }
  },
  async created() {
    this.customerId = this.$route.query.customerID //TODO: Change this to customerId
    this.accessLevel = store.state.role.role
    this.fetchPasswords()
  },
  methods: {
    async fetchPasswords() {
      let passwordRequest = await axios.get(
        `${process.env.VUE_APP_URL}customers/${this.customerId}/passwords`,
        {
          params: {
            page: this.currentPage,
            results: this.results,
          },
        }
      )
      console.log(passwordRequest)
      let passwordData = passwordRequest.data
      this.items = passwordData.passwords
      this.totalItems = passwordData.count
    },
    async getPassword(passwordId) {
      let request = await axios.get(
        `${process.env.VUE_APP_URL}passwords/${passwordId}`,
        {
          params: {
            employeeId: await auth.getAccountId(),
          },
        }
      )

      let passwords = this.items

      for (var password of passwords) {
        if (password.passwordId === passwordId) {
          password.password = request.data
          this.$refs.passTable.refresh()
        }
      }
    },
  },
  computed: {
    role() {
      return store.state.role.role
    },
  },
  watch: {
    currentPage() {
      this.fetchPasswords()
    },
  },
}
</script>

<style>
</style>
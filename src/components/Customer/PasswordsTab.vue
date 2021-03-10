<template>
  <b-container class="p-0">
    <b-card-text>
      <b-card bg-variant="light" class="mb-3">
        <b-btn
          class="float-right"
          variant="success"
          v-b-modal.createPasswordModal
        >
          Create Password
        </b-btn>
      </b-card>
      <paginated-table
        ref="passwordsTable"
        :url="url"
        :uploadUrl="uploadUrl"
        :fields="fields"
        :results="10"
        :sortColumn="'name'"
        :sortDirection="'DESC'"
        :editable="true"
      ></paginated-table>
    </b-card-text>
    <b-modal
      id="createPasswordModal"
      ref="createPasswordModal"
      body-class="p-0"
      centered
      title="Create Password"
      hide-footer
      size="lg"
    >
      <b-card bg-variant="light" body-class="p-0">
        <b-form @submit="submitPassword" onsubmit="return false;" class="p-3">
          <b-form-group
            label-cols-lg="3"
            label="Password Information:"
            label-size="lg"
            label-class="font-weight-bold pt-0 p-0 text-dark"
            class="mb-0"
          >
            <b-form-group
              label-cols-sm="3"
              label="Name:"
              label-align-sm="right"
              label-for="input-name"
              description="Required"
            >
              <b-input
                v-model="creationForm.name"
                id="input-name"
                type="text"
                required
              ></b-input>
            </b-form-group>
            <b-form-group
              label-cols-sm="3"
              label="Security Level:"
              label-align-sm="right"
              label-for="input-security"
              description="Required"
            >
              <b-select
                v-model="creationForm.securityLevel"
                :options="securityOptions"
              >
              </b-select>
            </b-form-group>
            <b-form-group
              label-cols-sm="3"
              label="Domain:"
              label-align-sm="right"
              label-for="input-domain"
            >
              <b-input
                id="input-domain"
                type="text"
                v-model="creationForm.domain"
              ></b-input>
            </b-form-group>
            <b-form-group
              label-cols-sm="3"
              label="Username:"
              label-align-sm="right"
              label-for="input-username"
            >
              <b-input
                id="input-username"
                v-model="creationForm.username"
                type="text"
                required
              ></b-input>
            </b-form-group>
            <b-form-group
              label-cols-sm="3"
              label="Password:"
              label-align-sm="right"
              label-for="input-password"
            >
              <b-input
                id="input-password"
                v-model="creationForm.password"
                type="text"
                required
              ></b-input>
            </b-form-group>
            <b-form-group
              label-cols-sm="3"
              label="URL:"
              label-align-sm="right"
              label-for="input-url"
            >
              <b-input
                id="input-url"
                v-model="creationForm.url"
                type="text"
              ></b-input>
            </b-form-group>
          </b-form-group>
          <b-btn-group>
            <b-btn type="submit" variant="success"> Save </b-btn>
          </b-btn-group>
        </b-form>
      </b-card>
    </b-modal>
  </b-container>
</template>

<script>
import axios from 'axios'
import * as auth from '../../auth/authHelper'
import store from '../../auth/store'
import PaginatedTable from '../PaginatedTable'

export default {
  data() {
    return {
      customerId: this.$route.query.id,
      url: `${process.env.VUE_APP_URL}customers/${this.$route.query.id}/passwords`,
      uploadUrl: `${process.env.VUE_APP_URL}passwords`,
      results: 10,
      currentPage: 1,
      totalItems: 10,
      items: [],
      creationForm: {
        securityLevel: 0,
      },
      securityOptions: [],
      fields: [
        {
          key: 'name',
          label: 'Name',
          sortable: true,
        },
        {
          key: 'domain',
          sortable: true,
        },
        {
          key: 'url',
          label: 'URL',
          sortable: true,
        },
        {
          key: 'username',
          sortable: true,
        },
        {
          key: 'password',
          sortable: true,
          typeOptions: {
            type: 'password',
            url: `${process.env.VUE_APP_URL}passwords`,
          },
        },
        {
          key: 'accessLevel',
          sortable: true,
          typeOptions: {
            type: 'select',
            options: this.securityOptions,
          },
        },
      ],
    }
  },
  async created() {
    this.customerId = this.$route.query.id
    // console.log(this.customerId)
    this.creationForm.customer = this.customerId
    this.accessLevel = store.state.role.role
    // this.fetchPasswords()
    this.fetchSecurityLevels()
  },
  methods: {
    async fetchPasswords() {
      try {
        let passwordRequest = await axios.get(
          `${process.env.VUE_APP_URL}customers/${this.customerId}/passwords`,
          {
            params: {
              page: this.currentPage,
              results: this.results,
            },
          }
        )
        let passwordData = passwordRequest.data
        this.items = passwordData.passwords
        this.totalItems = passwordData.count
      } catch (error) {
        console.log(error)
      }
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
    async fetchSecurityLevels() {
      let securityLevels = await axios.get(
        `${process.env.VUE_APP_URL}employees/securityLevels`
      )

      for (let role of securityLevels.data) {
        this.securityOptions.push({
          value: role.roleId,
          text: role.name,
        })
        this.fields[5].typeOptions.options = this.securityOptions
      }
    },
    async submitPassword() {
      axios
        .post(`${process.env.VUE_APP_URL}passwords`, this.creationForm)
        .then(() => {
          this.$refs['createPasswordModal'].hide()
          this.creationForm = { customer: this.customerId, securityLevel: 0 }
          this.$refs.passwordsTable.loadData()
        })
    },
    doEdit(data) {
      this.getPassword(data.item.passwordId)
      this.$set(data.item, 'editing', true)
    },
    cancelEdit(data) {
      this.fetchPasswords()
      this.$set(data.item, 'editing', false)
      this.$set(data, '_showDetails', false)
    },
    sendEdit(data) {
      axios
        .put(
          `${process.env.VUE_APP_URL}passwords/${data.item.passwordId}`,
          data.item
        )
        .then(() => {
          this.$set(data.item, 'editing', false)
        })
    },
    getOptionText(id) {
      let option = this.securityOptions.find((option) => option.value == id)
      if (option) return option.text
      else return 'Unknown'
    },
  },

  computed: {
    editableFields() {
      return this.fields.filter((field) => {
        return field.editable === true
      })
    },
    role() {
      return store.state.role.role
    },
  },
  watch: {
    currentPage() {
      this.fetchPasswords()
    },
  },
  components: {
    PaginatedTable,
  },
}
</script>

<style>
</style>

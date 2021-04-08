<template>
  <div>
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
    <modal-form
      modalId="createPasswordModal"
      windowSize="lg"
      fieldSize="sm"
      :fields="formFields"
      modalTitle="Create Password"
      :submitUrl="uploadUrl"
      @submitted="handleSubmitted"
    ></modal-form>
  </div>
</template>

<script>
import axios from 'axios'
import * as auth from '../../auth/authHelper'
import store from '../../auth/store'
import PaginatedTable from '../PaginatedTable'
import ModalForm from '../ModalForm'

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
      formFields: [
        {
          key: 'name',
          type: 'string',
          label: 'Name',
          required: true,
          cols: 8,
        },
        {
          key: 'securityLevel',
          type: 'select',
          label: 'Required Security Level',
          options: this.securityOptions,
          required: true,
          cols: 4,
        },
        {
          key: 'domain',
          type: 'string',
          label: 'Domain',
          required: true,
        },
        {
          key: 'url',
          type: 'string',
          label: 'URL',
          required: true,
        },
        {
          key: 'username',
          label: 'Username',
          type: 'string',
          required: true,
        },
        {
          key: 'password',
          label: 'Password',
          type: 'string',
          required: true,
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
    handleSubmitted() {
      this.$refs.passwordsTable.loadData()
    },
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
        this.formFields[1].options = this.securityOptions
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
    ModalForm,
  },
}
</script>

<style>
</style>

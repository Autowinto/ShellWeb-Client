<template>
  <div>
    <b-card-text>
      <div>
        <b-card bg-variant="light" class="mb-3">
          <b-col class="text-right">
            <b-btn variant="success" v-b-modal.createPasswordModal>
              Create Password
            </b-btn>
          </b-col>
        </b-card>
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
          <template
            v-for="field in editableFields"
            v-slot:[`cell(${field.key})`]="scope"
          >
            <span v-if="!scope.item.editing" :key="field.key">{{
              scope.item[field.key]
            }}</span>
            <b-input
              v-else
              :key="field.key"
              v-model="scope.item[field.key]"
            ></b-input>
          </template>
          <template #cell(password)="data">
            <div v-if="!data.item.editing">
              <span v-if="data.item.password">{{ data.item.password }}</span>
              <span v-else>********</span>
            </div>
            <div v-else>
              <b-input v-model="data.item.password"> </b-input>
            </div>
          </template>
          <template #cell(accessLevel)="data">
            <div v-if="!data.item.editing">
              {{ getOptionText(data.item.accessLevel) }}
            </div>
            <div v-else>
              <b-select
                v-model="data.item.accessLevel"
                :options="securityOptions"
              ></b-select>
            </div>
          </template>
          <template v-slot:cell(togglePass)="data">
            <div v-if="!data.item.editing">
              <b-col v-if="role >= data.item.accessLevel">
                <b-button
                  class="fas fa-edit mr-2"
                  variant="primary"
                  @click="doEdit(data)"
                ></b-button>
                <b-button
                  class="fas fa-eye"
                  variant="primary"
                  @click="getPassword(data.item.passwordId)"
                ></b-button>
              </b-col>
              <b-col v-else>
                <b-button class="fas fa-eye" disabled> </b-button>
              </b-col>
            </div>
            <div v-else>
              <b-btn @click="sendEdit(data)" variant="success">Save</b-btn>
              <b-btn @click="cancelEdit(data)" variant="danger">Cancel</b-btn>
            </div>
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
  </div>
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
      creationForm: {
        securityLevel: 0,
      },
      securityOptions: [],
      fields: [
        {
          key: 'name',
          label: 'Name',
          editable: true,
        },
        {
          key: 'domain',
          editable: true,
        },
        {
          key: 'url',
          label: 'URL',
          editable: true,
        },
        {
          key: 'username',
          editable: true,
        },
        {
          key: 'password',
          editable: true,
        },
        {
          key: 'accessLevel',
          editable: true,
        },
        {
          key: 'togglePass',
          label: 'Actions',
        },
      ],
    }
  },
  async created() {
    this.customerId = this.$route.query.id
    console.log(this.customerId)
    this.creationForm.customer = this.customerId
    this.accessLevel = store.state.role.role
    this.fetchPasswords()
    this.fetchSecurityLevels()
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
    async fetchSecurityLevels() {
      let securityLevels = await axios.get(
        `${process.env.VUE_APP_URL}employees/securityLevels`
      )

      for (let role of securityLevels.data) {
        this.securityOptions.push({
          value: role.roleId,
          text: role.name,
        })
      }
    },
    async submitPassword() {
      axios
        .post(`${process.env.VUE_APP_URL}passwords`, this.creationForm)
        .then(() => {
          this.$refs['createPasswordModal'].hide()
          this.creationForm = { customer: this.customerId, securityLevel: 0 }
          this.fetchPasswords()
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
}
</script>

<style>
</style>

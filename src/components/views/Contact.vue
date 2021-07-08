<template>
  <div id="wrapper">
    <div class="d-flex flex-column" id="content-wrapper">
      <div id="content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-3">
              <div class="card shadow mb-4">
                <div class="card-header p-0">
                  <div class="row">
                    <div class="col">
                      <h6 class="text-primary font-weight-bold mb-0 p-3">
                        {{
                          contactInfo.firstName + ' ' + contactInfo.lastName
                        }}: ({{ contactInfo.contactId }})
                      </h6>
                    </div>
                  </div>
                </div>
                <div class="card-body shadow">
                  <div class="row">
                    <div class="col">
                      <div class="mb-3">
                        <h4 class="small font-weight-bold">First Name</h4>
                        <h4 class="small">{{ contactInfo.firstName }}</h4>
                      </div>
                      <div class="mb-3" v-if="contactInfo.JobTitle">
                        <h4 class="small font-weight-bold">Job Title</h4>
                        <h4 class="small">{{ contactInfo.jobTitle }}</h4>
                      </div>
                    </div>
                    <div class="col">
                      <div class="mb-3">
                        <h4 class="small font-weight-bold">Last Name</h4>
                        <h4 class="small">{{ contactInfo.lastName }}</h4>
                      </div>
                    </div>
                  </div>
                  <div class="card shadow mb-3"></div>
                  <div class="row">
                    <div class="col">
                      <div class="mb-3">
                        <h4 class="small font-weight-bold">Phone Numbers</h4>
                        <h4
                          class="small"
                          v-for="phone in contactInfo.phones"
                          :key="phone.phone"
                        >
                          {{ phone.name }}: {{ phone.phone }}
                        </h4>
                      </div>
                    </div>
                    <div class="col">
                      <div class="mb-3">
                        <h4 class="small font-weight-bold">Email</h4>
                        <h4 class="small">{{ contactInfo.email }}</h4>
                      </div>
                    </div>
                  </div>
                  <div class="card shadow mb-3"></div>

                  <h4 class="small font-weight-bold">Office 365 ID</h4>
                  <h4 class="small">{{ contactInfo.o365Id }}</h4>
                  <div class="card shadow mb-3"></div>
                  <button
                    class="btn btn-primary w-100 mb-2"
                    v-b-modal.contactEditModal
                  >
                    Edit Contact
                  </button>
                  <!-- <button class="btn btn-danger w-100">Delete Contact</button> -->
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card shadow mb-3">
                <div class="card-header">
                  <h6 class="text-primary mb-0 font-weight-bold">
                    Assigned Tickets
                  </h6>
                </div>
                <div class="card-body shadow">
                  <div>
                    <paginated-table
                      :url="url"
                      :fields="fields"
                      :results="10"
                      :sortColumn="'ticketId'"
                      :sortDirection="'DESC'"
                    ></paginated-table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-modal
      @hidden="populateForm"
      body-class="p-0"
      id="contactEditModal"
      ref="contactEditModal"
      centered
      title="Edit Contact"
      hide-footer
      size="lg"
    >
      <b-card bg-variant="light" body-class="p-0">
        <b-form
          @submit="submitContactEdit"
          onsubmit="return false;"
          class="p-3"
        >
          <b-form-group
            label-cols-lg="3"
            label="Basic Information:"
            label-size="lg"
            label-class="font-weight-bold pt-0 p-0 text-dark"
            class="mb-0"
          >
          </b-form-group>
          <b-card no-body></b-card>
          <b-form-group
            label-cols-lg="3"
            label="Phones Numbers:"
            label-size="lg"
            label-class="font-weight-bold pt-0 p-0 text-dark"
          >
            <b-card v-if="form.phones && !form.phones.length">
              <b-row>
                <b-col class="text-right">
                  <b-btn
                    class="btn-success fas fa-plus"
                    @click="addPhone"
                  ></b-btn>
                </b-col>
              </b-row>
            </b-card>

            <div v-for="(phone, index) in form.phones" :key="phone.id">
              <b-card v-if="!phone.delete">
                <b-row>
                  <b-col>
                    <b-input
                      placeholder="Phone Name"
                      v-model="phone.name"
                      id="input-text"
                      type="text"
                      required
                    ></b-input>
                  </b-col>
                  <b-col>
                    <b-input
                      placeholder="Phone Number"
                      v-model="phone.phone"
                      id="input-number"
                      type="number"
                      required
                    ></b-input>
                  </b-col>
                  <b-col class="text-right">
                    <b-button
                      class="fas fa-plus btn-success mr-2"
                      @click="addPhone()"
                    ></b-button>
                    <b-button
                      class="fas fa-trash btn-danger"
                      @click="removePhone(index)"
                    ></b-button>
                  </b-col>
                </b-row>
              </b-card>
            </div>
          </b-form-group>
          <b-card no-body class="mb-3"></b-card>
          <b-form-group
            label-cols-lg="3"
            label="Notification Settings:"
            label-size="lg"
            label-class="font-weight-bold pt-0 p-0 text-dark"
            class="mb-0"
          >
            <b-form-checkbox-group
              stacked
              v-model="form.emailNotifications"
              :options="notifyOptions"
            >
            </b-form-checkbox-group>
          </b-form-group>
          <b-button-group>
            <b-button type="submit" variant="success">Save</b-button>
            <!-- <b-button type="reset" variant="danger">Reset</b-button> -->
          </b-button-group>
        </b-form>
      </b-card>
    </b-modal>
  </div>
</template>

<script>
  import axios from 'axios'
  import dayjs from 'dayjs'
  import PaginatedTable from '../PaginatedTable'
  import { defineComponent } from '@vue/composition-api'

  export default defineComponent({
    data() {
      return {
        url: `${process.env.VUE_APP_URL}contact/tickets/${this.$route.query.contactid}/1/10`,
        contactInfo: {},
        tickets: [],
        form: {
          emailNotifications: [],
        },
        notifyOptions: [
          { text: 'Invoices', value: 'invoices' },
          { text: 'Orders', value: 'orders' },
          { text: 'Quotations', value: 'quotations' },
          { text: 'Remindeers', value: 'reminders' },
        ],
        fields: [
          {
            key: 'ticketId',
            label: 'Ticket ID',
            sortable: true,
          },
          {
            key: 'subject',
            label: 'Subject',
            sortable: true,
            typeOptions: {
              type: 'link',
              path: '/ticket',
              idName: 'ticketId',
              linkText: 'subject',
            },
          },
          {
            key: 'createdDate',
            label: 'Date of Creation',
            sortable: true,
          },
          {
            key: 'modifiedDate',
            label: 'Last Updated',
            sortable: true,
          },
          {
            key: 'status',
            sortable: true,
          },
          {
            key: 'replyStatus',
            sortable: true,
          },
        ],
      }
    },
    created() {
      this.getContactInfo()
      axios
        .get(
          `${process.env.VUE_APP_URL}contact/tickets/${this.$route.query.contactid}/1/10`
        )
        .then((response) => {
          this.tickets = response.data.tickets
        })
    },
    methods: {
      getContactInfo() {
        axios
          .get(
            `${process.env.VUE_APP_URL}contacts/${this.$route.query.contactid}`
          )
          .then((response) => {
            this.contactInfo = response.data
            this.populateForm()
          })
      },
      submitContactEdit() {
        axios
          .put(
            `${process.env.VUE_APP_URL}contacts/${this.$route.query.contactid}`,
            this.form
          )
          .then(() => {
            this.$refs['contactEditModal'].hide()
            this.getContactInfo()
          })
      },
      populateForm() {
        //Stringify, then parse to achieve a deep copy.
        let dataString = JSON.stringify(this.contactInfo)
        this.form = JSON.parse(dataString)
        console.log(this.contactInfo)
        console.log(this.form)
      },
      addPhone() {
        this.form.phones.push({})
      },
      removePhone(index) {
        console.log(index)
        this.$set(this.form.phones[index], 'delete', true)
        // this.$delete(this.form.phones, index)
      },
    },
    filters: {
      dayjsDateOnly: function (date) {
        return dayjs(date).format('MMM D, YYYY')
      },
      dayjsDateTime: function (date) {
        return dayjs(date).format('MMM D, YYYY, h:mm:ss a')
      },
    },
    components: {
      PaginatedTable,
    },
  })
</script>

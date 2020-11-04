<template>
  <div class="card shadow mb-4">
    <div class="card-header d-flex justify-content-between align-items-center">
      <h6 class="text-primary font-weight-bold m-0">
        Registered Hours Overview
      </h6>
    </div>
    <div class="card-body">
      <!-- <b-card bg-variant="light" class="mb-3">
        <b-select :options="options"></b-select> 
      </b-card> -->
      <b-table
        :items="workHourRecords"
        :fields="fields"
        show-empty
        outlined
        hover
      >
        <template #cell(customerName)="data">
          <b-link
            :to="{
              path: '/customer',
              query: { customerID: data.item.customerId },
            }"
            >{{ data.item.customerName }}
          </b-link>
        </template>
        <template #cell(ticketId)="data">
          <b-link
            :to="{
              path: '/ticket',
              query: { ticketID: data.item.ticketId },
            }"
            >{{ data.item.ticketId }}</b-link
          >
        </template>
        <template
          v-for="field in editableFields"
          v-slot:[`cell(${field.key})`]="data"
        >
          <div :key="field.key">
            <b-input v-model="data.item[field.key]"></b-input>
          </div>
        </template>
        <template #cell(billable)="data">
          <h5
            class="m-0 p-0"
            v-if="!data.item.editing"
            :key="data.item.billable"
          >
            <b-badge variant="success" v-if="data.item.billable === 'true'">
              {{ data.item.rate }} DKK
            </b-badge>
            <b-badge variant="danger" v-else-if="data.item.billable !== 'true'">
              {{ data.item.rate }} DKK
            </b-badge>
          </h5>
          <span v-else>
            <b-row>
              <b-col cols="1">
                <b-form-checkbox
                  value="true"
                  unchecked-value="false"
                  v-model="data.item.billable"
                ></b-form-checkbox>
              </b-col>
              <b-col>
                <b-input v-model="data.item.rate"></b-input>
              </b-col>
            </b-row>
          </span>
        </template>
        <template #cell(time)="data">
          <span v-if="!data.item.editing">
            {{ data.item.time }}
          </span>
          <b-time
            v-else
            v-model="data.item.time"
            show-seconds
            @input="handleTimeChange(data.item)"
            :locale="'de'"
          ></b-time>
        </template>
        <template #cell(timeRounded)="data">
          {{ data.item.timeRounded }}
        </template>
        <template #cell(startTime)="data">
          {{ formatDate(data.item.startTime) }}
        </template>
        <template #cell(endTime)="data">
          {{ formatDate(data.item.endTime) }}
        </template>
        <template v-slot:cell(actions)="data">
          <div v-if="!data.item.editing">
            <b-btn
              variant="primary"
              class="fas fa-edit mr-1"
              @click="doEdit(data)"
            ></b-btn>
            <b-btn
              variant="danger"
              class="fas fa-trash-alt"
              @click="doDelete(data.item.id)"
            ></b-btn>
          </div>
          <div v-else>
            <b-btn variant="success" @click="sendEdit(data)">Save</b-btn>
            <b-btn variant="danger" @click="cancelEdit(data)">Cancel</b-btn>
          </div>
        </template>
        <template #row-details="row">
          <b-card class="m-0 p-0">
            <b-textarea v-model="row.item.description"> </b-textarea>
          </b-card>
        </template>
      </b-table>
      <b-pagination
        v-model="currentPage"
        :per-page="5"
        :total-rows="totalItems"
      >
      </b-pagination>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import dayjs from 'dayjs'
import * as auth from '../auth/authHelper'

export default {
  data() {
    return {
      workHourRecords: [],
      form: {},
      currentPage: 1,
      perPage: 10,
      totalItems: 0,
      fields: [
        {
          key: 'customerName',
          label: 'Customer',
        },
        {
          key: 'ticketId',
          label: 'Ticket',
        },
        {
          key: 'startTime',
        },
        {
          key: 'endTime',
        },
        {
          key: 'billable',
          editable: true,
        },
        {
          key: 'time',
          label: 'Actual Time',
          editable: true,
        },
        {
          key: 'timeRounded',
          label: 'Rounded Time',
          editable: true,
        },
        {
          key: 'actions',
          label: 'Actions',
        },
      ],
      locales: [{ value: 'defaultLocale' }],
      labels: {
        de: {
          hourCycle: 'h23',
        },
      },
    }
  },
  created() {
    this.fetchWorkHourRecords()
  },
  methods: {
    async fetchWorkHourRecords() {
      let response = await axios.get(
        `${
          process.env.VUE_APP_URL
        }employees/${auth.getAccountId()}/workHourRecords`,
        {
          params: {
            page: this.currentPage,
            results: this.perPage,
          },
        }
      )

      let workHourData = response.data

      this.totalItems = workHourData.pagination.totalItems

      this.workHourRecords = workHourData.collection

      this.$set(this.workHourRecords, '', workHourData.collection)
    },
    formatDate(date) {
      return dayjs(date).format('DD-MM-YYYY HH:mm:ss')
    },
    doEdit(data) {
      data.toggleDetails()
      this.$set(data.item, 'editing', true)
    },
    cancelEdit(data) {
      this.$set(data.item, 'editing', false)
      this.$set(data, '_showDetails', false)
      data.toggleDetails()
    },
    sendEdit(data) {
      axios
        .put(`${process.env.VUE_APP_URL}workHours/${data.item.id}`, data.item)
        .then(() => {
          this.$set(data.item, 'editing', false)
          data.toggleDetails()
        })
    },
    doDelete(item) {
      axios.delete(`${process.env.VUE_APP_URL}workHours/${item}`).then(() => {
        this.fetchWorkHourRecords()
      })
    },
    handleTimeChange(item) {
      item.timeRounded = this.roundToNearest15(item.time)
    },
    roundToNearest15(time) {
      let split = time.split(':')
      let timeDuration = dayjs.duration({
        hours: split[0],
        minutes: split[1],
        seconds: split[2],
      })
      let rounded = Math.ceil(timeDuration.asSeconds() / 900) * 900
      return this.formatSecondsAsTime(rounded)
    },
    formatSecondsAsTime(seconds) {
      let duration = dayjs.duration(seconds, 'seconds')
      return dayjs.utc(duration.asMilliseconds()).format('HH:mm:ss')
    },
  },
  computed: {
    editableFields() {
      return this.fields.filter((field) => {
        return field.editable === true
      })
    },
  },
  watch: {
    currentPage: {
      handler: function () {
        this.fetchWorkHourRecords() //Do error handling here in the future
      },
    },
  },
}
</script>
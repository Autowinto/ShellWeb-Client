<template>
  <div class="card shadow mb-4">
    <div class="card-header d-flex justify-content-between align-items-center">
      <h6 class="text-primary font-weight-bold m-0">
        Registered Hours Overview
      </h6>
      <div class="dropdown no-arrow">
        <button
          class="btn btn-link btn-sm dropdown-toggle"
          data-toggle="dropdown"
          aria-expanded="false"
          type="button"
        >
          <i class="fas fa-ellipsis-v text-gray-400"></i>
        </button>
        <div
          class="dropdown-menu shadow dropdown-menu-right animated--fade-in"
          role="menu"
        >
          <p class="text-center dropdown-header">Time Basis:</p>
          <a class="dropdown-item" role="presentation" href="#">&nbsp;Daily</a>
          <a class="dropdown-item" role="presentation" href="#">&nbsp;Weekly</a>
          <a class="dropdown-item" role="presentation" href="#"
            >&nbsp;Monthly</a
          >
        </div>
      </div>
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
        <template #cell(billable)="data">
          <h5 class="m-0 p-0">
            <b-badge variant="success" v-if="isBillable(data.item.billable)">
              Billable
            </b-badge>
            <b-badge variant="danger" v-else> Non-billable </b-badge>
          </h5>
        </template>
        <template #cell(seconds)="data">
          {{ formatIntoHours(data.item.seconds) }}
        </template>
        <template #cell(secondsRounded)="data">
          {{ formatIntoHours(data.item.secondsRounded) }}
        </template>
        <template #cell(startTime)="data">
          {{ formatDate(data.item.startTime) }}
        </template>
        <template #cell(endTime)="data">
          {{ formatDate(data.item.endTime) }}
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

export default {
  data() {
    return {
      workHourRecords: [],
      currentPage: 1,
      perPage: 10,
      totalItems: 0,
      fields: [
        {
          key: 'id',
          label: 'ID',
        },
        {
          key: 'ticketId',
          label: 'Ticket',
        },
        // {
        //   key: 'description',
        // },
        {
          key: 'startTime',
        },
        {
          key: 'endTime',
        },
        {
          key: 'billable',
        },
        {
          key: 'seconds',
          label: 'Actual Time',
        },
        {
          key: 'secondsRounded',
          label: 'Rounded Time',
        },
      ],
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
        }employees/${this.$getAccountId()}/workHourRecords`,
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
    },
    isBillable(status) {
      if (status == 1) return true
      return false
    },
    formatIntoHours(seconds) {
      let duration = dayjs.duration(seconds, 'seconds')
      return dayjs.utc(duration.asMilliseconds()).format('HH:mm:ss')
    },
    formatDate(date) {
      return dayjs(date).format('DD-MM-YYYY HH:mm:ss')
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
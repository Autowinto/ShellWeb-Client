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
        <template
          v-for="field in editableFields"
          v-slot:[`cell(${field.key})`]="data"
        >
          <div v-if="!data.item.editing" :key="field.key">
            <h5 class="m-0 p-0" v-if="data.item[field.type] == 'bool'">
              <b-badge
                variant="success"
                v-if="isBillable(data.item[field.key])"
              >
                Billable
              </b-badge>
              <b-badge variant="danger" v-else> Non-billable </b-badge>
              {{ data.item[field.key] }}
            </h5>
          </div>
          <div v-else :key="field.key">
            <b-checkbox v-if="data.item[field.type] == 'bool'"></b-checkbox>
            <b-input v-model="data.item[field.key]"></b-input>
          </div>
        </template>
        <template #cell(billable)="data">
          <h5 class="m-0 p-0" v-if="!data.item.editing">
            <b-badge variant="success" v-if="isBillable(data.item.billable)">
              Billable
            </b-badge>
            <b-badge variant="danger" v-else> Non-billable </b-badge>
          </h5>
          <span v-else>
            <b-form-checkbox v-model="data.item.billable"> </b-form-checkbox>
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
              @click="doEdit(data.item)"
            ></b-btn>
            <b-btn
              variant="danger"
              class="fas fa-trash-alt"
              @click="doDelete(data.item.id)"
            ></b-btn>
          </div>
          <div v-else>
            <b-btn variant="success" @click="sendEdit(data.item)">Save</b-btn>
          </div>
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
      form: {},
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
      if (status == 'true') return true
      return false
    },
    formatDate(date) {
      return dayjs(date).format('DD-MM-YYYY HH:mm:ss')
    },
    doEdit(item) {
      this.$set(item, 'editing', true)
    },
    sendEdit(item) {
      axios
        .put(`${process.env.VUE_APP_URL}workHours/${item.id}`, item)
        .then(() => {
          this.$set(item, 'editing', false)
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
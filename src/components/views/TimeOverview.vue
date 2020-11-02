<template>
  <div id="wrapper">
    <div class="container-fluid">
      <b-row class="mb-2">
        <b-col>
          <h3 class="text-dark mb-3">
            Time Overview for {{ this.$store.state.account.username }}
          </h3>
        </b-col>
        <b-col cols="3" v-if="selected === 'custom'">
          <b-form-datepicker
            v-model="dateRange.startDate"
            size="sm"
            calendar-width="100%"
          >
          </b-form-datepicker>
        </b-col>
        <b-col cols="3" v-if="selected === 'custom'">
          <b-form-datepicker
            v-model="dateRange.endDate"
            size="sm"
            calendar-width="100%"
          >
          </b-form-datepicker>
        </b-col>
        <b-col cols="0.5" v-if="selected === 'custom'">
          <b-btn @click="fetchTimeSumCustom" variant="success"> Apply </b-btn>
        </b-col>
        <b-col cols="1" class="text-right">
          <b-select
            v-model="selected"
            :options="options"
            @input="handleTimeframeChange"
          >
          </b-select>
        </b-col>
      </b-row>
      <div class="row mb-3">
        <b-col>
          <time-display
            :title="'Total Hours (Actual)'"
            :time="this.timeSums.total.seconds"
          >
          </time-display>
        </b-col>
        <b-col>
          <time-display
            :title="'Billable Hours (Actual)'"
            :time="this.timeSums.billable.seconds"
          >
          </time-display>
        </b-col>
        <b-col>
          <time-display
            :title="'Total Hours (Rounded)'"
            :time="this.timeSums.total.rounded"
          >
          </time-display>
        </b-col>
        <b-col>
          <time-display
            :title="'Billable Hours (Rounded)'"
            :time="this.timeSums.billable.rounded"
          ></time-display>
        </b-col>
      </div>
      <b-row>
        <b-col>
          <work-hour-table> </work-hour-table>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import TimeDisplay from '../TimeDisplay'
import WorkHourTable from '../WorkHourTable'
import dayjs from 'dayjs'
import axios from 'axios'

export default {
  data() {
    return {
      dateRange: {
        startDate: null,
        endDate: null,
      },
      workHourRecords: [],
      timeSums: {
        billable: {
          seconds: 0,
          rounded: 0,
        },
        total: {
          seconds: 0,
          rounded: 0,
        },
      },
      selected: 'weekly',
      options: [
        { value: 'weekly', text: 'Weekly' },
        { value: 'monthly', text: 'Monthly' },
        { value: 'custom', text: 'Custom' },
      ],
    }
  },
  created() {
    this.fetchTimeWeekly()
  },
  methods: {
    async fetchTimeWeekly() {
      let startDate = dayjs().startOf('week').format('YYYY-MM-DD')
      let endDate = dayjs().endOf('week').format('YYYY-MM-DD')
      this.timeSums = await this.fetchTimeSum(startDate, endDate)
    },
    async fetchTimeMonthly() {
      let startDate = dayjs().startOf('month').format('YYYY-MM-DD')
      let endDate = dayjs().endOf('month').format('YYYY-MM-DD')
      this.timeSums = await this.fetchTimeSum(startDate, endDate)
    },
    async fetchTimeSumCustom() {
      if (this.dateRange.startDate && this.dateRange.endDate) {
        let startDate = dayjs(this.dateRange.startDate).format('YYYY-MM-DD')
        let endDate = dayjs(this.dateRange.endDate).format('YYYY-MM-DD')
        this.timeSums = await this.fetchTimeSum(startDate, endDate)
        console.log(this.timeSums)
      }
    },
    async fetchTimeSum(startDate, endDate) {
      if (startDate && endDate) {
        let time = await axios.get(
          `${
            process.env.VUE_APP_URL
          }employees/${this.$getAccountId()}/totalHours`,
          {
            params: { startDate, endDate },
          }
        )
        return time.data
      }
    },
    handleTimeframeChange(value) {
      console.log(value)
      if (value == 'weekly') {
        this.fetchTimeWeekly()
      } else if (value == 'monthly') {
        this.fetchTimeMonthly()
      }
    },
  },
  components: {
    TimeDisplay,
    WorkHourTable,
  },
}
</script>

<style></style>

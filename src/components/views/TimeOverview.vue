<template>
  <div id="wrapper">
    <div class="container-fluid">
      <b-row>
        <b-col>
          <h3 class="text-dark mb-3">
            Time Overview for {{ this.$store.state.account.username }}
          </h3>
        </b-col>
        <b-col class="text-right">
          <b-form-select
            style="width: 20%"
            v-model="selected"
            :options="options"
            @input="handleTimeframeChange"
          >
          </b-form-select>
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
    async fetchTimeSum(startDate, endDate) {
      let time = await axios.get(
        `${
          process.env.VUE_APP_URL
        }employees/${this.$getAccountId()}/totalHours`,
        {
          params: { startDate, endDate },
        }
      )
      console.log(time.data)
      return time.data
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

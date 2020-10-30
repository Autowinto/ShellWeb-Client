<template>
  <div id="wrapper">
    <div class="container-fluid">
      <h3 class="text-dark mb-3">
        Time Overview for {{ this.$store.state.account.username }}
      </h3>
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
    }
  },
  created() {
    this.fetchTimeWeekly()
    this.fetchTimeMonthly()
  },
  methods: {
    async fetchTimeWeekly() {},
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
      return time.data
    },
  },
  components: {
    TimeDisplay,
    WorkHourTable,
  },
}
</script>

<style></style>

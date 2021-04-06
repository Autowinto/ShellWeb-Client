<template>
  <b-card no-body header="Customer Call Log">
    <b-card-body
      class="overflow-auto p-2"
      style="height: 500px; max-height: 500px"
    >
      <div v-if="calls.length">
        <div v-for="call in calls" :key="call.entryId" class="p-2">
          <b-card body-class="p-2" class="small" bg-variant="light">
            <span>{{ formatDateTime(call.deliveredTime) }}</span>
            <b-card no-body class="shadow"></b-card>
            <br />
            <span class="mr-2">
              Caller:
              {{ call.callingNumber }}
            </span>
            <span>
              Receiver:
              {{ call.receivingNumber }}
            </span>
            <br />
            <div v-if="call.establishedTime">
              <span>
                Duration:
                {{ calculateDuration(call.establishedTime, call.clearedTime) }}
              </span>
              <span>
                Waited for:
                {{
                  calculateDuration(call.deliveredTime, call.establishedTime)
                }}
              </span>
            </div>
            <div v-else>
              <span class="mr-2"> Call not picked up </span>
              <span>
                Waited for:
                {{ calculateDuration(call.deliveredTime, call.clearedTime) }}
              </span>
            </div>
          </b-card>
        </div>
      </div>
      <div v-else>
        <h4>No calls to show</h4>
      </div>
    </b-card-body>
  </b-card>
</template>

<script>
import { ref, onMounted } from 'vue'
import dayjs from 'dayjs'
import axios from 'axios'
export default {
  props: {
    customerId: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    let calls = ref([])

    function fetchCalls() {
      axios
        .get(`${process.env.VUE_APP_URL}calls/${props.customerId}`)
        .then((response) => {
          calls.value = response.data
        })
    }

    onMounted(() => {
      fetchCalls()
    })

    function calculateDuration(established, cleared) {
      let seconds = dayjs(cleared).diff(dayjs(established), 'seconds')
      return dayjs.duration(seconds, 'seconds').format('HH:mm:ss')
    }

    function formatDateTime(dateTime) {
      let day = dayjs(dateTime)

      return day.format('DD/MM/YYYY HH:mm:ss')
    }

    return { calls, formatDateTime, calculateDuration }
  },
}
</script>

<style>
</style>
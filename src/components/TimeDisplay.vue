<template>
  <div class="card shadow border-left-primary py-2">
    <div class="card-body">
      <div class="row align-items-center no-gutters">
        <div class="col mr-2">
          <div
            class="text-uppercase text-primary font-weight-bold text-xs mb-1"
          >
            <span>{{ this.$props.title }}</span>
          </div>
          <div class="text-dark font-weight-bold h5 mb-0">
            <span>{{ format(this.$props.time) }}</span>
          </div>
        </div>
        <div class="col-auto">
          <i class="far fa-clock fa-2x text-gray-300"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  props: ['title', 'time'],
  data() {
    return {}
  },
  methods: {
    format(seconds) {
      let duration = dayjs.duration(seconds, 'seconds')
      return dayjs.utc(duration.asMilliseconds()).format('HH:mm:ss')
    },
  },
}
</script>
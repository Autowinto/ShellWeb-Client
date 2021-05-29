<template>
  <div id="wrapper">
    <div class="d-flex flex-column" id="content-wrapper">
      <div id="content">
        <b-container fluid>
          <h3 class="text-dark mb-4">Ticket ID: {{ items.TicketID }}</h3>
          <div class="row">
            <b-col cols="3">
              <b-card no-body header="Ticket Information">
                <b-card-body>
                  <b-row>
                    <b-col>
                      <div class="mb-3">
                        <h4 class="small font-weight-bold">Customer</h4>
                        <h4 class="small">{{ items.CustomerName }}</h4>
                      </div>
                    </b-col>
                    <b-col>
                      <h4 class="small font-weight-bold">Company Contact</h4>
                      <h4 class="small">
                        {{ items.EndUserFirstName }} {{ items.EndUserLastName }}
                      </h4>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                      <div class="mb-3">
                        <h4 class="small font-weight-bold">Title</h4>
                        <h4 class="small">{{ items.TicketTitle }}</h4>
                      </div>
                    </b-col>
                    <b-col>
                      <div class="mb-3">
                        <h4 class="small font-weight-bold">ITC Employee</h4>
                        <h4 class="small" v-if="items.TechnicianFullName">
                          {{ items.TechnicianFullName }}
                        </h4>
                        <h4 class="small" v-else>N/A</h4>
                      </div>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                      <div class="mb-3">
                        <h4 class="small font-weight-bold">Project</h4>
                        <h4 class="small">{{ items.isProject }}</h4>
                      </div>
                    </b-col>
                    <b-col>
                      <div class="mb-3">
                        <h4 class="small font-weight-bold">Fixed Price</h4>
                        <h4 class="small" v-if="items.fixedPrice">
                          {{ items.fixedPrice }}
                        </h4>
                        <h4 class="small" v-else>N/A</h4>
                      </div>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                      <div class="mb-3">
                        <h4 class="small font-weight-bold">Date Created</h4>
                        <h4 class="small">
                          {{ items.TicketCreatedDate | dayjsDateTime }}
                        </h4>
                      </div>
                    </b-col>
                    <b-col>
                      <div class="mb-3">
                        <h4 class="small font-weight-bold">Date Modified</h4>
                        <h4 class="small">
                          {{ items.TicketResolvedDate | dayjsDateTime }}
                        </h4>
                      </div>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                      <div class="mb-3">
                        <h4 class="small font-weight-bold">Description</h4>
                        <h4 class="small">{{ items.FirstComment }}</h4>
                      </div>
                    </b-col>
                  </b-row>
                </b-card-body>
              </b-card>
            </b-col>
            <div class="col">
              <div class="card shadow mb-3">
                <div class="card-header">
                  <h6 class="text-primary font-weight-bold mb-0">Newest Activity</h6>
                </div>
                <div class="card-body p4">
                  <div class="row m-0 mb-3">
                    <div
                      v-if="comments.length"
                      class="rounded border w-100 p-3"
                      style="background-color: #f9f9f9"
                    >
                      <div id="info" class="mb-2">
                        <span class="small"
                          >{{ comments[0].FirstName }} {{ comments[0].LastName }} |</span
                        >
                        <span class="small" style="color: limegreen"
                          >{{ comments[0].Email }} |</span
                        >
                        <span class="small">{{ comments[0].Date | dayjsDateTime }}</span>
                      </div>
                      <div class="mb-3 commentDisplay">
                        {{ parseHTML(comments[0].Comment) }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- TODO: Implement pagination of comments. Not a huge priority right now, as the volume of comments usually isn't very great, but handle the edge case nonetheless -->

              <div class="card shadow mb-3">
                <div class="card-header">
                  <span class="text-primary font-weight-bold mb-0 mr-2">Conversation History</span>
                </div>
                <div class="card-body p4">
                  <div v-for="(comment, idx) in comments" :key="idx" class="row m-0 mb-3">
                    <div
                      class="rounded border w-100 p-3"
                      v-if="comment.EndUserID"
                      style="background-color: #f9f9f9"
                    >
                      <div id="info" class="mb-2">
                        <span class="small">{{ comment.FirstName }} {{ comment.LastName }} |</span>
                        <span class="small" style="color: limegreen">{{ comment.Email }} |</span>
                        <span class="small">{{ comment.Date | dayjsDateTime }}</span>
                      </div>
                      <div class="mb-3 commentDisplay">
                        {{ parseHTML(comment.Comment) }}
                      </div>
                    </div>
                    <div
                      class="rounded border w-100 p-3"
                      v-else-if="comment.TechnicianContactID"
                      style="background-color: #e2f4d0"
                    >
                      <div id="info" class="mb-2">
                        <span class="small" style="color: limegreen"
                          >{{ comment.FirstName }} {{ comment.LastName }}</span
                        >
                        <span class="small">{{ comment.Date | dayjsDateTime }}</span>
                      </div>
                      <div class="mb-3 commentDisplay">
                        {{ parseHTML(comment.Comment) }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </b-container>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'
  import dayjs from 'dayjs'

  export default Vue.extend({
    data() {
      return {
        items: {},
        comments: [],
        ticketID: this.$route.query.id,
      }
    },
    created() {
      this.fetchData(`tickets/${this.ticketID}`).then((response) => {
        this.items = response.data
      })
      this.fetchData(`ticket/ticketComments/${this.ticketID}/1/10`).then((response) => {
        this.comments = response.data.comments.items
        console.log(this.comments)
      })
    },
    methods: {
      fetchData(endpoint) {
        return axios.get(process.env.VUE_APP_URL + endpoint)
      },
      parseHTML(html) {
        return html.replace(/.*\(#default#VML\);}(\r\n|\r|\n)*/g, '')
      },
    },
    filters: {
      dayjsDateOnly: function (date) {
        return dayjs(date).format('MMM D, YYYY')
      },
      dayjsDateTime: function (date) {
        return dayjs(date).format('MMM D, YYYY, h:mm:ss a')
      },
      stripHTML: function (value) {
        if (value == null) {
          return ''
        }
        var div = document.createElement('div')

        value = value.replace(/[^{]*{[^}]*[^-]*[}]/g, '') //TODO: This RegEx needs some work and isn't fully functional.
        value = value.replace(/&nbsp;&zwnj;/g, '')
        div.innerHTML = value
        var text = div.textContent || div.innerText || ''
        return text
      },
    },
  })
</script>

<style scoped>
  .commentDisplay {
    white-space: pre-wrap;
  }
</style>

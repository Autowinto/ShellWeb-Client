<template>
  <div id="wrapper">
    <div class="d-flex flex-column" id="content-wrapper">
      <div id="content">
        <!-- <b-container>
            <b-card class="mb-3" style="background-color: #36b9cc;">
              <span style="color: black;" class="">Contact is undefined, please fix this here: </span>
              <b-link :href="'https://app.atera.com/Admin#/ticket/' + this.ticketID">https://app.atera.com/Admin#/ticket/{{this.ticketID}}</b-link>
            </b-card>
        </b-container> -->
        <div class="container-fluid">
          <div class="row mb-3">
            <div class="col-10 m-0 ml-2 p-0">
              <button
                style="border-top-right-radius: 0; border-bottom-right-radius: 0;"
                class="btn btn-primary w-100"
              >
                <span>Ticket: {{this.items.TicketID}} || </span>
                <span style="color: lightgreen;" id="timeCounter">1:27:45</span>
              </button>
            </div>
            <div class="col m-0 mr-2 p-0">
              <button
                style="border-bottom-left-radius: 0; border-top-left-radius: 0; border-left-color:cadetblue"
                class="btn btn-primary w-100"
                data-toggle="collapse"
                data-target="#timeEntryForm"
              >Add Time Entry</button>
            </div>
          </div>
          <div class="p-3 card-body shadow collapse mb-3" id="timeEntryForm">
            <h4 class="text-dark">Add Time Entry</h4>
            <form>
              <div class="row">
                <div class="col">
                  <div class="mb-3">
                    <label for="technician">
                      <strong>Technician</strong>
                    </label>
                    <select class="form-control" name="technician">
                      <option>Airi</option>
                      <option>Damian</option>
                    </select>
                  </div>

                  <div class="mb-3">
                    <label>
                      <strong>Start Date and Time</strong>
                    </label>
                    <div class="row">
                      <div class="col-6">
                        <input class="form-control" type="date" />
                      </div>
                      <div class="col-6">
                        <input class="form-control" type="time" step="1" />
                      </div>
                    </div>
                  </div>
                  <div class="mb-3">
                    <label>
                      <strong>End Date and Time</strong>
                    </label>
                    <div class="row">
                      <div class="col-6">
                        <input class="form-control" type="date" />
                      </div>
                      <div class="col-6">
                        <input class="form-control" type="time" step="1" />
                      </div>
                    </div>
                  </div>
                  <div class="mb-3">
                    <label for="duration">
                      <strong>Duration</strong>
                    </label>
                    <input type="time" class="form-control" name="duration" step="1" />
                  </div>
                  <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" name="billablecheckbox" />
                    <label for="billablecheckbox">
                      <strong>Billable</strong>
                    </label>
                  </div>
                </div>
                <div class="col">
                  <div>
                    <label for="technician">
                      <strong>Rate</strong>
                    </label>
                    <select disabled="disabled" class="form-control" name="technician">
                      <option></option>
                      <option></option>
                    </select>
                  </div>
                  <div>
                    <label for="description">
                      <strong>Description</strong>
                    </label>
                    <textarea class="form-control" rows="10"></textarea>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="container mr-0">
                  <div class="text-right">
                    <button
                      data-toggle="collapse"
                      data-target="#timeEntryForm"
                      type="button"
                      class="btn btn-primary"
                    >Add</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <h3 class="text-dark mb-4">Ticket ID: {{this.items.TicketID}}</h3>
          <div class="row">
            <b-col cols="3">
              <div class="card shadow mb-3">
                <div class="card-header">
                  <h6 class="text-primary font-weight-bold mb-0">Ticket Information</h6>
                </div>
                <div class="card-body">
                  <div class="row mb-3">
                    <div class="col">
                      <p class="text-primary m-0 font-weight-bold">Customer ID</p>
                      <p>{{this.items.CustomerBusinessNumber || N/A}}</p>
                    </div>
                    <div class="col">
                      <p class="text-primary m-0 font-weight-bold">Employee</p>
                      <p>{{this.items.EndUserFirstName}} {{this.items.EndUserLastName}}</p>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col">
                      <p class="text-primary m-0 font-weight-bold">Subject</p>
                      <p class="m-0">{{this.items.TicketTitle}}</p>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col">
                      <p class="text-primary m-0 font-weight-bold">Description</p>
                      <p class="m-0">{{this.items.FirstComment}}</p>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col">
                      <p class="text-primary m-0 font-weight-bold">Related Assets</p>
                      <p class="m-0" href="customerpage.html">DSAP01</p>
                    </div>
                    <div class="col mr-3">
                      <p></p>
                      <button class="btn btn-primary btn-sm w-100">Connect</button>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col">
                      <p class="text-primary m-0 font-weight-bold">Date of creation</p>
                      <p class="m-0">{{this.items.TicketCreatedDate | dayjsDateOnly}}</p>
                    </div>
                  </div>
                  <div class="row mb-3" v-if="this.items.TicketResolvedDate">
                    <div class="col">
                      <p class="text-primary m-0 font-weight-bold">Last updated</p>
                      <p class="m-0">{{this.items.TicketResolvedDate | dayjsDateOnly}}</p>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col">
                      <p class="text-primary m-0 font-weight-bold">Consultant</p>
                      <p class="m-0">{{this.items.TechnicianFullName}}</p>
                    </div>
                  </div>
                </div>
              </div>
            </b-col>
            <div class="col">
              <div class="card shadow mb-3">
                <div class="card-header">
                  <h6 class="text-primary font-weight-bold mb-0">Newest Activity</h6>
                </div>
                <div class="card-body p4">
                  <div class="row m-0 mb-3">
                    <div v-if="this.comments.length" class="rounded border w-100 p-3" style="background-color: #f9f9f9;">
                      <div id="info" class="mb-2">
                        <span
                          class="small"
                        >{{this.comments[0].FirstName}} {{this.comments[0].LastName}} |</span>
                        <span class="small" style="color:limegreen;">{{this.comments[0].Email}} |</span>
                        <span class="small">{{this.comments[0].Date | dayjsDateTime}}</span>
                      </div>
                      <div class="mb-3">{{this.comments[0].Comment}}</div>
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
                      style="background-color: #f9f9f9;"
                    >
                      <div id="info" class="mb-2">
                        <span class="small">{{comment.FirstName}} {{comment.LastName}} |</span>
                        <span class="small" style="color:limegreen;">{{comment.Email}} |</span>
                        <span class="small">{{comment.Date | dayjsDateTime}}</span>
                      </div>
                      <div class="mb-3">{{comment.Comment}}</div>
                    </div>
                    <div
                      class="rounded border w-100 p-3"
                      v-else-if="comment.TechnicianContactID"
                      style="background-color: #e2f4d0;"
                    >
                      <div id="info" class="mb-2">
                        <span
                          class="small"
                          style="color:limegreen;"
                        >{{comment.FirstName}} {{comment.LastName}}</span>
                        <span class="small">{{comment.Date | dayjsDateTime}}</span>
                      </div>
                      <div class="mb-3">{{comment.Comment}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";

export default {
  data() {
    return {
      items: {},
      comments: [],
      ticketID: this.$route.query.ticketID
    };
  },
  created() {
    this.fetchData(`ticket/${this.ticketID}`)
    .then(response => {
      this.items = response.data.ticketInfo;
    })
    this.fetchData(`ticket/ticketComments/${this.ticketID}/1/10`)
    .then(response => {
      this.comments = response.data.comments.items;
    })
  },
  methods: {
    fetchData(endpoint) {
      return axios.get(process.env.VUE_APP_URL + endpoint);
    },
    dayjs: function() {
      return dayjs();
    }
  },
  filters: {
    dayjsDateOnly: function(date) {
      return dayjs(date).format("MMM Do YYYY");
    },
    dayjsDateTime: function(date) {
      return dayjs(date).format("MMM Do YYYY, h:mm:ss a");
    }
  }
};
</script>
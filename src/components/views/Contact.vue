<template>
  <div id="wrapper">
    <div class="d-flex flex-column" id="content-wrapper">
      <div id="content">
        <div class="container-fluid">
          <h3 class="text-dark mb-4">Contact ID:</h3>
          <div class="row">
            <div class="col-3">
              <div class="card shadow mb-4">
                <div class="card-header p-0">
                  <div class="row">
                    <div class="col">
                      <h6 class="text-primary font-weight-bold mb-0 p-3">Contact Information</h6>
                    </div>
                    <div class="col-3 text-right">
                      <button
                        onclick="window.location.href = 'contacteditform.html';"
                        class="btn btn-primary btn-sm m-2"
                      >Edit</button>
                    </div>
                  </div>
                </div>
                <div class="card-body shadow">
                  <div class="row">
                    <div class="col">
                      <div class="mb-3">
                        <h4 class="small font-weight-bold">First Name</h4>
                        <h4 class="small">{{contactInfo.Firstname}}</h4>
                      </div>
                      <div class="mb-3" v-if="contactInfo.JobTitle">
                        <h4 class="small font-weight-bold">Job Title</h4>
                        <h4 class="small">{{contactInfo.JobTitle}}</h4>
                      </div>
                    </div>
                    <div class="col">
                      <div class="mb-3">
                        <h4 class="small font-weight-bold">Last Name</h4>
                        <h4 class="small">{{contactInfo.Lastname}}</h4>
                      </div>
                    </div>
                  </div>
                  <div class="card shadow mb-3"></div>
                  <div class="row">
                    <div class="col">
                      <div class="mb-3">
                        <h4 class="small font-weight-bold">Phone Number</h4>
                        <h4 class="small">{{contactInfo.Phone}}</h4>
                      </div>
                    </div>
                    <div class="col">
                      <div class="mb-3">
                        <h4 class="small font-weight-bold">Email</h4>
                        <h4 class="small">{{contactInfo.Email}}</h4>
                      </div>
                    </div>
                  </div>
                  <div class="card shadow mb-3"></div>
                  <button class="btn btn-danger w-100">Delete Contact</button>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card shadow mb-3">
                <div class="card-header">
                  <h6 class="text-primary mb-0 font-weight-bold">Assigned Tickets</h6>
                </div>
                <div class="card-body shadow">
                    <div>
                      <b-table
                        show-empty
                        outlined
                        hover
                        :items="tickets"
                        :fields="fields"
                        :per-page="0"
                        :current-page="currentPage"
                      >
                        <template v-slot:cell(subject)="data">
                          <b-link
                            :to="{ path: '/ticket', query: {ticketID: data.item.ticket_id}}"
                          >{{ data.item.subject }}</b-link>
                        </template>
                        <template v-slot:cell(created_date)="data">
                          <p class="m-0 p-0">{{data.item.created_date | dayjsDateTime}}</p>
                        </template>
                        <!--Template for formatting the updated date-->
                        <template v-slot:cell(modified_date)="data">
                          <p class="m-0 p-0">{{data.item.modified_date | dayjsDateTime}}</p>
                        </template>
                      </b-table>
                      <b-pagination
                        size="md"
                        v-model="currentPage"
                        :total-rows="totalItems"
                        :per-page="perPage"
                      ></b-pagination>
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
import dayjs from 'dayjs';

export default {
  data() {
    return {
      contactInfo: {},
      tickets: [],
      fields: [
        {
          key: "ticket_id",
          label: "Ticket ID"
        },
        {
          key: "subject",
          label: "Subject"
        },
        {
          key: "created_date",
          label: "Date of Creation"
        },
        {
          key: "modified_date",
          label: "Last Updated"
        },
        {
          key: "status",
          label: "Status"
        },
        {
          key: "reply_status",
          label: "Reply Status"
        },
      ],
    };
  },
  created() {
    this.fetchData(`contact/${this.$route.query.contactid}`).then(response => {
      this.contactInfo = response.data.contactInfo;
    });
    this.fetchData(`contact/tickets/${this.$route.query.contactid}/1/10`).then(
      response => {
        this.tickets = response.data.tickets;
      }
    );
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
      return dayjs(date).format("MMM D, YYYY");
    },
    dayjsDateTime: function(date) {
      return dayjs(date).format("MMM D, YYYY, h:mm:ss a");
    }
  }
};
</script>
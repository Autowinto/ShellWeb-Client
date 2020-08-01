<template>
  <div id="wrapper">
    <div class="container-fluid">
      <h3 class="text-dark mb-4">{{customerInfo.name}} ({{customerInfo.customerNumber}})</h3>
      <div class="row mb-3">
        <div class="col-3">
          <div class="row mb-3">
            <div class="col">
              <div class="card shadow">
                <div class="card-header py-3">
                  <div class="row">
                    <div class="col">
                      <h6 class="text-primary m-0 font-weight-bold">Customer Information</h6>
                    </div>
                  </div>
                </div>
                <div class="card-body">
                  <div class="row">
                    <div class="col">
                      <div class="mb-3">
                        <h4 class="small font-weight-bold">Name</h4>
                        <h4 class="small">{{customerInfo.name}}</h4>
                      </div>
                      <div class="mb-3">
                        <h4 class="small font-weight-bold">Currency</h4>
                        <h4 class="small">{{customerInfo.currency}}</h4>
                      </div>
                    </div>
                    <div class="col">
                      <div class="mb-3">
                        <h4 class="small font-weight-bold">Customer Group</h4>
                        <h4 class="small">{{customerGroup}}</h4>
                      </div>
                      <div class="mb-3">
                        <h4 class="small font-weight-bold">Payment Terms</h4>
                        <h4 class="small">{{paymentTerms}}</h4>
                      </div>
                    </div>
                  </div>
                  <div class="card shadow mb-3"></div>
                  <div class="row">
                    <div class="col">
                      <div class="mb-3">
                        <h4 class="small font-weight-bold">Phone Number</h4>
                        <h4
                          v-if="customerInfo.telephoneAndFaxNumber"
                          class="small"
                        >{{customerInfo.telephoneAndFaxNumber}}</h4>
                        <h4 v-else class="small">N/A</h4>
                      </div>
                    </div>
                    <div class="col">
                      <div class="mb-3">
                        <h4 class="small font-weight-bold">E-mail</h4>
                        <h4 class="small">{{customerInfo.email}}</h4>
                      </div>
                    </div>
                  </div>
                  <div class="card shadow mb-3"></div>
                  <div class="row">
                    <div class="col">
                      <div class="mb-3">
                        <h4 class="small font-weight-bold">Address</h4>
                        <h4 class="small">{{customerInfo.address}}</h4>
                      </div>
                      <div class="mb-3">
                        <h4 class="small font-weight-bold">ZIP Code</h4>
                        <h4 class="small">{{customerInfo.zip}}</h4>
                      </div>
                    </div>
                    <div class="col">
                      <div class="mb-3">
                        <h4 class="small font-weight-bold">City</h4>
                        <h4 class="small">{{customerInfo.city}}</h4>
                      </div>
                      <div class="mb-3">
                        <h4 class="small font-weight-bold">Country</h4>
                        <h4 class="small">{{customerInfo.country}}</h4>
                      </div>
                    </div>
                  </div>
                  <div class="card shadow mb-3"></div>
                  <div class="row mb-3">
                    <div class="col">
                      <button
                        class="btn btn-primary w-100"
                        v-b-modal.manageDomainModal
                      >Manage Domain</button>
                    </div>
                    <div class="col">
                      <button
                        class="btn btn-primary w-100"
                        v-b-modal.editCustomerModal
                      >Edit Customer</button>
                    </div>
                  </div>
                  <div class="card shadow mb-3"></div>
                  <button class="btn btn-danger w-100" v-b-modal.deletionModal>Delete Customer</button>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="card shadow">
                <div class="card-header">
                  <h6 class="text-primary font-weight-bold">Customer Call Log</h6>
                </div>
                <div class="card-body" style="height: 500px; max-height: 500px; overflow-y: auto;">
                  <div
                    class="rounded border w-100 pl-3 py-2 mb-3"
                    style="background-color: #f9f9f9;"
                  >
                    <div class="row">
                      <span class="small">06/05/2020 14:45:26</span>
                    </div>
                    <div class="row">
                      <span class="mr-1">Incoming Call from</span>
                      <span class="mr-1" style="color: limegreen;">12345678</span>
                      <span class="mr-1">to</span>
                      <span class="mr-1" style="color: limegreen;">87654321</span>
                    </div>
                    <div class="row">
                      <span class="mr-1">Duration:</span>
                      <span class="mr-1" style="color: limegreen;">0:21:45</span>
                    </div>
                    <div class="row">
                      <span class="mr-1">Waited for:</span>
                      <span class="mr-1" style="color: limegreen;">0:05:45</span>
                    </div>
                  </div>
                  <div
                    class="rounded border w-100 pl-3 py-2 mb-3"
                    style="background-color: #e2f4d0;"
                  >
                    <div class="row">
                      <span class="small">06/05/2020 14:45:26</span>
                    </div>
                    <div class="row">
                      <span class="mr-1">Outgoing Call from</span>
                      <span class="mr-1" style="color: limegreen;">12345678</span>
                      <span class="mr-1">to</span>
                      <span class="mr-1" style="color: limegreen;">87654321</span>
                    </div>
                    <div class="row">
                      <span class="mr-1">Duration:</span>
                      <span class="mr-1" style="color: limegreen;">0:21:45</span>
                    </div>
                  </div>
                  <div
                    class="rounded border w-100 pl-3 py-2 mb-3"
                    style="background-color: #f9f9f9;"
                  >
                    <div class="row">
                      <span class="small">06/05/2020 14:45:26</span>
                    </div>
                    <div class="row">
                      <span class="mr-1">Incoming Call from</span>
                      <span class="mr-1" style="color: limegreen;">12345678</span>
                      <span class="mr-1">to</span>
                      <span class="mr-1" style="color: limegreen;">87654321</span>
                    </div>
                    <div class="row">
                      <span class="mr-1">Duration:</span>
                      <span class="mr-1" style="color: limegreen;">0:21:45</span>
                    </div>
                    <div class="row">
                      <span class="mr-1">Waited for:</span>
                      <span class="mr-1" style="color: limegreen;">0:05:45</span>
                    </div>
                  </div>
                  <div
                    class="rounded border w-100 pl-3 py-2 mb-3"
                    style="background-color: #e2f4d0;"
                  >
                    <div class="row">
                      <span class="small">06/05/2020 14:45:26</span>
                    </div>
                    <div class="row">
                      <span class="mr-1">Outgoing Call from</span>
                      <span class="mr-1" style="color: limegreen;">12345678</span>
                      <span class="mr-1">to</span>
                      <span class="mr-1" style="color: limegreen;">87654321</span>
                    </div>
                    <div class="row">
                      <span class="mr-1">Duration:</span>
                      <span class="mr-1" style="color: limegreen;">0:21:45</span>
                    </div>
                  </div>
                  <div
                    class="rounded border w-100 pl-3 py-2 mb-3"
                    style="background-color: #f9f9f9;"
                  >
                    <div class="row">
                      <span class="small">06/05/2020 14:45:26</span>
                    </div>
                    <div class="row">
                      <span class="mr-1">Incoming Call from</span>
                      <span class="mr-1" style="color: limegreen;">12345678</span>
                      <span class="mr-1">to</span>
                      <span class="mr-1" style="color: limegreen;">87654321</span>
                    </div>
                    <div class="row">
                      <span class="mr-1">Duration:</span>
                      <span class="mr-1" style="color: limegreen;">0:21:45</span>
                    </div>
                    <div class="row">
                      <span class="mr-1">Waited for:</span>
                      <span class="mr-1" style="color: limegreen;">0:05:45</span>
                    </div>
                  </div>
                  <div
                    class="rounded border w-100 pl-3 py-2 mb-3"
                    style="background-color: #e2f4d0;"
                  >
                    <div class="row">
                      <span class="small">06/05/2020 14:45:26</span>
                    </div>
                    <div class="row">
                      <span class="mr-1">Outgoing Call from</span>
                      <span class="mr-1" style="color: limegreen;">12345678</span>
                      <span class="mr-1">to</span>
                      <span class="mr-1" style="color: limegreen;">87654321</span>
                    </div>
                    <div class="row">
                      <span class="mr-1">Duration:</span>
                      <span class="mr-1" style="color: limegreen;">0:21:45</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <b-col style="position: relative;">
          <div style="height: 100%;">
            <b-card no-body shadow style="height: 100%;">
              <b-tabs card fill>
                <b-tab title="Employees" active>
                  <b-card-text>
                    <b-row v-if="items.contacts.length">
                      <div v-for="(contact, idx) in items.contacts" :key="idx" class="col-4">
                        <div class="card mb-3 p-3" style="height: 140px;">
                          <div class="row ml-3">
                            <b-link
                              class="font-weight-bold"
                              style="color: black; font-size: 120%;"
                              :to="{ path: '/contact/', query: {contactid: contact.contact_id}}"
                            >{{contact.first_name}} {{contact.last_name}}</b-link>
                          </div>
                          <div class="row ml-3" v-if="contact.job_title !== 'null'">
                            <h6 class="small">{{contact.job_title}}</h6>
                          </div>
                          <div v-if="contact.phone && contact.phone !== 'null'" class="row ml-3">
                            <span style="color: black;" class="fa fa-phone fa-fw mr-1"></span>
                            <b-link :href="'tel:' + contact.phone">{{contact.phone}}</b-link>
                          </div>
                          <div v-if="contact.email && contact.email !== 'null'" class="row ml-3">
                            <span style="color: black;" class="fa fa-at fa-fw mr-1"></span>
                            <b-link :href="'mailto:' + contact.email">{{contact.email}}</b-link>
                          </div>
                        </div>
                      </div>
                    </b-row>
                    <b-row v-else align-h="center">
                      <h3>Nothing to display</h3>
                    </b-row>
                  </b-card-text>
                </b-tab>
                <b-tab title="Contracts">
                  <b-card-text>
                    <b-row v-if="items.contracts">
                      <div v-for="(contract, idx) in items.contracts" :key="idx" class="pl-4 col-6">
                        <div class="card mb-3" style="color: black;">
                          <div class="container h-100 pl-0">
                            <div class="row">
                              <div
                                class="col-2 bg-success d-flex align-items-center justify-content-center"
                              >
                                <i class="fa rel fa-bookmark" style="font-size: 30px;"></i>
                              </div>
                              <div class="col py-3">
                                <div class="row ml-1">
                                  <h6 class>{{contract.ContractName}} - {{contract.ContractType}}</h6>
                                </div>
                                <div class="row ml-1">
                                  <h5
                                    class="font-weight-bold"
                                  >{{contract.StartDate | dayjsDateTime}} - {{contract.EndDate | dayjsDateTime}}</h5>
                                </div>
                                <div
                                  v-if="contract.RetainerFlatFeeContract !== null"
                                  class="row ml-1"
                                >
                                  <h6
                                    id="hourly-rate"
                                  >{{contract.RetainerFlatFeeContract.Rate.Description}} - {{contract.RetainerFlatFeeContract.Amount}}{{customerInfo.currency}}</h6>
                                </div>
                                <div v-if="contract.HourlyContract !== null">
                                  <div class="row ml-1">
                                    <h6
                                      id="hourly-rate"
                                    >{{contract.HourlyContract.PrimaryRate.Description}} - {{contract.HourlyContract.PrimaryRate.Amount}}{{customerInfo.currency}}</h6>
                                  </div>
                                  <div
                                    v-for="(rate, idx) in contract.HourlyContract.AdditionalRates"
                                    :key="idx"
                                    class="row ml-1"
                                  >
                                    <h6
                                      id="hourly-rate"
                                    >{{rate.Description}} - {{rate.Amount}}{{customerInfo.currency}}</h6>
                                  </div>
                                </div>
                                <div v-if="contract.BlockMoneyContract !== null">
                                  <div class="row ml-1">
                                    <h6
                                      id="hourly-rate"
                                    >{{contract.BlockMoneyContract.ContractAmount.Description}} - {{contract.BlockMoneyContract.ContractAmount.Amount}}{{customerInfo.currency}}</h6>
                                  </div>
                                  <div class="row ml-1">
                                    <h6
                                      id="hourly-rate"
                                    >{{contract.BlockMoneyContract.PrimaryRate.Description}} - {{contract.BlockMoneyContract.PrimaryRate.Amount}}{{customerInfo.currency}}</h6>
                                  </div>
                                  <div
                                    v-for="(rate, idx) in contract.BlockMoneyContract.AdditionalRates"
                                    :key="idx"
                                    class="row ml-1"
                                  >
                                    <h6
                                      id="hourly-rate"
                                    >{{rate.Description}} - {{rate.Amount}}{{customerInfo.currency}}</h6>
                                  </div>
                                </div>
                                <div v-if="contract.RemoteMonitoringContract !== null">
                                  <div class="row ml-1">
                                    <h6
                                      id="hourly-rate"
                                    >{{contract.RemoteMonitoringContract.RatePerDevice.Description}} - {{contract.RemoteMonitoringContract.RatePerDevice.Amount}}{{customerInfo.currency}}</h6>
                                  </div>
                                </div>
                                <div v-if="contract.OnlineBackupContract !== null">
                                  <div class="row ml-1">
                                    <h6
                                      id="hourly-rate"
                                    >{{contract.OnlineBackupContract.RatePerGB.Description}} - {{contract.OnlineBackupContract.RatePerGB.Amount}}{{customerInfo.currency}}</h6>
                                  </div>
                                </div>
                                <div v-if="contract.ProjectOneTimeFeeContract !== null">
                                  <div class="row ml-1">
                                    <h6
                                      id="hourly-rate"
                                    >{{contract.ProjectOneTimeFeeContract.TotalAmount.Description}} - {{contract.ProjectOneTimeFeeContract.TotalAmount.Amount}}{{customerInfo.currency}}</h6>
                                  </div>
                                </div>
                                <div v-if="contract.ProjectHourlyRateContract !== null">
                                  <div class="row ml-1">
                                    <h6
                                      id="hourly-rate"
                                    >{{contract.ProjectHourlyRateContract.PrimaryRate.Description}} - {{contract.ProjectHourlyRateContract.PrimaryRate.Amount}}{{customerInfo.currency}}</h6>
                                  </div>
                                  <div
                                    v-for="(rate, idx) in contract.ProjectHourlyRateContract.AdditionalRates"
                                    :key="idx"
                                    class="row ml-1"
                                  >
                                    <h6
                                      id="hourly-rate"
                                    >{{rate.Description}} - {{rate.Amount}}{{customerInfo.currency}}</h6>
                                  </div>
                                </div>
                                <div class="row ml-1">
                                  <div class="container p-0">
                                    <div class="text-right">
                                      <button
                                        class="btn btn-primary btn-sm text-right"
                                        data-toggle="tooltip"
                                        title="Clone Contract"
                                      >
                                        <i class="fa fa-file"></i>
                                      </button>
                                      <button
                                        class="btn btn-primary btn-sm text-right"
                                        data-toggle="tooltip"
                                        title="Edit Contract"
                                      >
                                        <i class="fa fa-pen"></i>
                                      </button>
                                      <button
                                        class="btn btn-primary btn-sm text-right"
                                        data-toggle="tooltip"
                                        title="Delete Contract"
                                      >
                                        <i class="fa fa-trash"></i>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </b-row>
                  </b-card-text>
                </b-tab>
                <b-tab title="Assets">
                  <b-card-text>
                    <div>
                      <b-table
                        show-empty
                        outlined
                        hover
                        :items="items.assets"
                        :fields="fields.assets"
                        :per-page="0"
                        :current-page="pagination.assets.currentPage"
                      >
                        <template v-slot:cell(AgentName)="data">
                          <b-link
                            :to="{ path: '/asset', query: {assetID: data.item.AgentID}}"
                          >{{ data.item.AgentName }}</b-link>
                        </template>
                        <template v-slot:cell(Online)="data">
                          <h5 class="m-0 p-0">
                          <b-badge v-if="data.item.Online" variant="success">Online</b-badge>
                          <b-badge v-else variant="danger">Offline</b-badge>
                          </h5>
                        </template>
                        <template v-slot:cell(LastPatchManagementReceived)="data">
                          {{data.item.LastPatchManagementReceived | dayjsDateTime}}
                        </template>
                      </b-table>
                      <b-pagination
                        size="md"
                        v-model="pagination.assets.currentPage"
                        :total-rows="pagination.assets.totalItems"
                        :per-page="pagination.assets.perPage"
                      ></b-pagination>
                    </div>
                  </b-card-text>
                </b-tab>
                <b-tab title="Tickets">
                  <b-card-text>
                    <div>
                      <b-table
                        show-empty
                        outlined
                        hover
                        :items="items.tickets"
                        :fields="fields.tickets"
                        :per-page="0"
                        :current-page="pagination.tickets.currentPage"
                      >
                        <!--Template for storing the link to the ticket in the table column.-->
                        <template v-slot:cell(subject)="data">
                          <b-link
                            :to="{ path: '/ticket', query: {ticketID: data.item.ticket_id}}"
                          >{{ data.item.subject }}</b-link>
                        </template>
                        <!--Template for formatting the creation date-->
                        <template v-slot:cell(created_date)="data">
                          <p class="m-0 p-0">{{data.item.created_date | dayjsDateTime}}</p>
                        </template>
                        <!--Template for formatting the updated date-->
                        <template v-slot:cell(modified_date)="data">
                          <p class="m-0 p-0">{{data.item.modified_date | dayjsDateTime}}</p>
                        </template>
                          <template v-slot:cell(status)="data">
                            <h5 class="m-0 p-0">
                            <b-badge v-if="data.item.status == 'Open'" variant="success">{{data.item.status}}</b-badge>
                            <b-badge v-else-if="data.item.status == 'Closed'" variant="danger">{{data.item.status}}</b-badge>
                            <b-badge v-else-if="data.item.status == 'Merged'" variant="warning">{{data.item.status}}</b-badge>
                            <b-badge v-else-if="data.item.status == 'Resolved'" variant="primary">{{data.item.status}}</b-badge>
                            </h5>
                        </template>
                      </b-table>
                      <b-pagination
                        size="md"
                        v-model="currentPage"
                        :total-rows="totalItems"
                        :per-page="perPage"
                      ></b-pagination>
                    </div>
                  </b-card-text>
                </b-tab>
                <b-tab title="Passwords">
                  <b-card-text>
                    <div>
                      <b-table
                        show-empty
                        outlined
                        hover
                        :items="items.passwords"
                        :fields="fields.passwords"
                        :per-page="0"
                        :current-page="currentPage">

                      </b-table>
                    </div>
                  </b-card-text>
                </b-tab>
                <b-tab title="Attachments">
                  <b-card-text></b-card-text>
                </b-tab>
                <b-tab title="Invoices">
                  <b-card-text>
                    <div>
                      <b-table
                        show-empty
                        outlined
                        hover
                        :items="items.invoices"
                        :fields="fields.invoices"
                        :per-page="0"
                        :current-page="currentPage"
                      >
                        <!--Template for storing the link to the ticket in the table column.-->
                        <template v-slot:cell(subject)="data">
                          <b-link
                            :to="{ path: '/', query: {ticketID: data.item.ticket_id}}"
                          >{{ data.item.subject }}</b-link>
                        </template>
                        <!--Template for formatting the creation date-->
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
                  </b-card-text>
                </b-tab>
                <b-tab title="Subscriptions">
                  <b-card-text>Tab contents 2</b-card-text>
                </b-tab>
                <b-tab title="DNS">
                  <b-card-text>Tab contents 2</b-card-text>
                </b-tab>
                <b-tab title="Backup">
                  <b-card-text>Tab contents 2</b-card-text>
                </b-tab>
                <b-tab title="Log">
                  WIP
                </b-tab>
              </b-tabs>
            </b-card>
          </div>
        </b-col>
      </div>
    </div>
    <!--Modals below here-->
    <b-modal
      id="deletionModal"
      size="md"
      button-size="sm"
      ok-variant="danger"
      ok-title="YES"
      cancel-title="No"
      header-bg-variant="danger"
      header-text-variant="white"
      centered
      title="Delete Customer?"
    >
      <h5>Are you sure you want to delete the customer {{customerInfo.name}}</h5>
    </b-modal>
    <b-modal centered id="editCustomerModal"></b-modal>
    <b-modal centered id="manageDomainModal"></b-modal>
  </div>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";

export default {
  data() {
    return {
      fields: {
        assets: [
          {
            key: "AgentID",
            label: "Asset ID"
          },
          {
            key: "AgentName",
            label: "Asset Name"
          },
          {
            key: "Online",
            label: "Status"
          },
          {
            key: "LastPatchManagementReceived",
            label: "Last Patched"
          }
        ],
        tickets: [
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
          }
        ],
        invoices: [
          {
            key: "",
            label: ""
          }
        ],
        passwords: [
          {
            key: "name",
            label: 'Name'
          },
          {
            key: "domain"
          },
          {
            key: "url",
            label: "URL"
          },
          {
            key: "username"
          },
          {
            key: "password"
          },
          {
            key: "access_level"
          }
        ]
      },
      items: {
        tickets: [],
        contacts: [],
        contracts: [],
        assets: [],
        invoices: [],
        passwords: [],
      },
      pagination: {
        assets: {
          perPage: 18,
          currentPage: 1,
          totalItems: 0
        },
        invoices: {
          perPage: 10,
          currentPage: 1,
          totalItems: 0
        },
        tickets: {
          perPage: 10,
          currentPage: 1,
          totalItems: 0
        },
        passwords: {
          perPage: 10,
          currentPage: 1,
          totalItems: 0
        },
      },
      customerInfo: {},
      paymentTerms: {},
      customerGroup: 0,
      ateraid: 0,
      id: this.$route.query.customerID
    };
  },
  created() {
    this.$getAccountID();
    axios
      .all([
        this.fetchData(`customer/${this.id}`),
        this.fetchData(`customer/contacts/${this.id}`)
      ])
      .then(
        axios.spread((...responses) => {
          const customerData = responses[0].data;
          this.customerInfo = customerData.customer;
          this.customerGroup = customerData.customerGroup;
          this.ateraid = customerData.apiInfo;
          this.paymentTerms = customerData.paymentTerms;

          const contactData = responses[1].data;
          this.items.contacts = contactData.contacts;
        })
      );
    this.fetchData(
      `assets/${this.id}/${this.pagination.assets.currentPage}/${this.pagination.assets.perPage}`
    ).then(response => {
      this.items.assets = response.data.assets.items;
      this.pagination.assets.totalItems = response.data.assets.totalItemCount;
    });
    this.fetchData(
      `customer/tickets/${this.$route.query.customerID}/1/10`
    ).then(response => {
      this.items.tickets = response.data.tickets;
    });
    this.fetchData(`customer/contracts/${this.id}`).then(response => {
      this.items.contracts = response.data.contracts;
      console.log(response.data.contracts);
    });
    this.fetchData(`customer/passwords/${this.$getAccountID()}/${this.pagination.passwords.currentPage}/${this.pagination.passwords.perPage}`
    ).then(response => {
      this.items.passwords = response.data.passwords
      this.pagination.passwords.totalItems = response.data.passwords.length;

    })
  },
  methods: {
    fetchData(endpoint) {
      return axios.get(process.env.VUE_APP_URL + endpoint);
    },
    loadContracts: function() {},
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
  },
  computed: {
    assetsCurrentPage() {
      return this.pagination.assets.currentPage;
    },
    ticketsCurrentPage() {
      return this.pagination.tickets.currentPage;
    }
  },
  watch: {
    assetsCurrentPage() {
      this.fetchData(
        `assets/${this.id}/${this.pagination.assets.currentPage}/${this.pagination.assets.perPage}`
      ).then(response => {
        this.items.assets = response.data.assets.items;
        this.pagination.assets.totalItems = response.data.assets.totalItemCount;
      });
    }
  }
};
</script>
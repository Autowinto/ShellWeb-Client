<template>
  <div id="wrapper">
    <div class="container-fluid">
      <h3
        class="text-dark mb-4"
      >{{customerInfo.economic.name}} ({{customerInfo.economic.customerNumber}})</h3>
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
                        <h4 class="small">{{customerInfo.economic.name}}</h4>
                      </div>
                      <div class="mb-3">
                        <h4 class="small font-weight-bold">Currency</h4>
                        <h4 class="small">{{customerInfo.economic.currency}}</h4>
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
                        <b-link v-if="customerInfo.economic.telephoneAndFaxNumber" class="small" :href="'tel:' + customerInfo.economic.telephoneAndFaxNumber">{{customerInfo.economic.telephoneAndFaxNumber}}</b-link>
                        <h4 v-else class="small">N/A</h4>
                      </div>
                    </div>
                    <div class="col">
                      <div class="mb-3">
                        <h4 class="small font-weight-bold">E-mail</h4>
                        <b-link v-if="customerInfo.economic.telephoneAndFaxNumber" class="small" :href="'mailto:' + customerInfo.economic.email">{{customerInfo.economic.email}}</b-link>
                      </div>
                    </div>
                  </div>
                  <div class="card shadow mb-3"></div>
                  <div class="row">
                    <div class="col">
                      <div class="mb-3">
                        <h4 class="small font-weight-bold">Address</h4>
                        <h4 class="small">{{customerInfo.economic.address}}</h4>
                      </div>
                      <div class="mb-3">
                        <h4 class="small font-weight-bold">ZIP Code</h4>
                        <h4 class="small">{{customerInfo.economic.zip}}</h4>
                      </div>
                    </div>
                    <div class="col">
                      <div class="mb-3">
                        <h4 class="small font-weight-bold">City</h4>
                        <h4 class="small">{{customerInfo.economic.city}}</h4>
                      </div>
                      <div class="mb-3">
                        <h4 class="small font-weight-bold">Country</h4>
                        <h4 class="small">{{customerInfo.economic.country}}</h4>
                      </div>
                    </div>
                  </div>
                  <div class="card shadow mb-3"></div>
                  <div class="row mb-3">
                    <div class="col">
                      <button
                        class="btn btn-primary w-100"
                        v-b-modal.customerEditModal
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
                    <b-row class="mb-2">
                      <b-col>
                      <b-button v-b-modal.createContactModal class="float-right" variant="success" size="sm">Create Contact</b-button>
                      </b-col>
                    </b-row>
                    <b-card no-body class="mb-2"></b-card>
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
                        <template
                          v-slot:cell(LastPatchManagementReceived)="data"
                        >{{data.item.LastPatchManagementReceived | dayjsDateTime}}</template>
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
                            <b-badge
                              v-if="data.item.status == 'Open'"
                              variant="success"
                            >{{data.item.status}}</b-badge>
                            <b-badge
                              v-else-if="data.item.status == 'Closed'"
                              variant="danger"
                            >{{data.item.status}}</b-badge>
                            <b-badge
                              v-else-if="data.item.status == 'Merged'"
                              variant="warning"
                            >{{data.item.status}}</b-badge>
                            <b-badge
                              v-else-if="data.item.status == 'Resolved'"
                              variant="primary"
                            >{{data.item.status}}</b-badge>
                          </h5>
                        </template>
                      </b-table>
                      <b-pagination
                        size="md"
                        v-model="pagination.tickets.currentPage"
                        :total-rows="pagination.tickets.totalItems"
                        :per-page="pagination.tickets.perPage"
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
                        ref="passTable"
                        :items="items.passwords"
                        :fields="fields.passwords"
                        :per-page="0"
                        :current-page="pagination.passwords.currentPage"
                      >
                        <template v-slot:cell(password)="data">
                          <span v-if="data.item.password">{{data.item.password}}</span>
                          <span v-else>********</span>
                        </template>
                        <template v-slot:cell(togglePass)="data">
                          <b-button
                            class="fas fa-eye"
                            variant="primary"
                            @click="getPassword(data.item.password_id)"
                          ></b-button>
                        </template>
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
                      <b-card bg-variant="light">
                        <!-- <b-form-checkbox
                          v-model="pagination.invoices.filterOptions.allSelected"
                          :indeterminate="pagination.invoices.filterOptions.indeterminate"
                          aria-describedby="pagination.invoices.filterOptions.options"
                          aria-controls="pagination.invoices.filterOptions.options"
                          @change="toggleAll"
                        >
                          {{ pagination.invoices.filterOptions.allSelected ? 'Deselect All' : 'Select All'}}
                        </b-form-checkbox>
                      <b-form-checkbox-group
                        v-model="pagination.invoices.filterOptions.selected"
                        :options="pagination.invoices.filterOptions.options"
                      > 

                        </b-form-checkbox-group>-->
                        <b-select
                          v-model="pagination.invoices.filterOptions.selected"
                          :options="pagination.invoices.filterOptions.options"
                          @change="loadInvoices"
                        ></b-select>
                      </b-card>

                      <b-table
                        show-empty
                        outlined
                        hover
                        :items="items.invoices"
                        :fields="fields.invoices"
                        :per-page="0"
                        :current-page="pagination.invoices.currentPage"
                      >
                        <template
                          v-slot:cell(netAmount)="data"
                        >{{data.item.netAmount}} {{data.item.currency}}</template>
                        <template v-slot:cell(remainder)="data">
                          <h5 class="m-0 p-0">
                            <b-badge
                              v-if="getInvoiceStatus(data.item.dueDate, data.item.remainder) == 'overdue'"
                              variant="danger"
                            >Overdue</b-badge>
                            <b-badge
                              v-else-if="getInvoiceStatus(data.item.dueDate, data.item.remainder) == 'unpaid'"
                              variant="warning"
                            >Unpaid</b-badge>
                            <b-badge
                              v-else-if="getInvoiceStatus(data.item.dueDate, data.item.remainder) == 'paid'"
                              variant="success"
                            >Paid</b-badge>
                          </h5>
                        </template>
                        <template v-slot:cell(pdf)="data">
                          <b-button
                            variant="primary"
                            class="fas fa-download"
                            @click="downloadInvoice(data.item.pdf.download)"
                          ></b-button>
                        </template>
                      </b-table>
                      <b-pagination
                        size="md"
                        v-model="pagination.invoices.currentPage"
                        :total-rows="pagination.invoices.totalItems"
                        :per-page="pagination.invoices.perPage"
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
                <b-tab title="Log">WIP</b-tab>
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
      <h5>Are you sure you want to delete the customer {{customerInfo.economic.name}}</h5>
    </b-modal>
    <b-modal
      body-class="p-0"
      id="customerEditModal"
      ref="customerEditModal"
      centered
      title="Edit Customer"
      hide-footer
      size="lg"
    >
      <b-card bg-variant="light" body-class="p-0">
        <b-form @submit="submitCustomerEdit" onsubmit="return false;" class="p-3">
          <b-form-group
            label-cols-lg="3"
            label="Basic Information:"
            label-size="lg"
            label-class="font-weight-bold pt-0 p-0 text-dark"
            class="mb-0"
          >
            <b-form-group
              label-cols-sm="3"
              label="Name:"
              label-align-sm="right"
              label-for="input-name"
              description="Required"
            >
              <b-input
                placeholder="Company Name"
                v-model="form.name"
                id="input-name"
                type="text"
                required
              ></b-input>
            </b-form-group>
            <b-form-group
              label-cols-sm="3"
              label="Domain:"
              label-align-sm="right"
              label-for="input-domain"
            >
              <b-input id="input-domain" type="text" v-model="form.domain" placeholder="domain.dk"></b-input>
            </b-form-group>
            <b-form-group
              label-cols-sm="3"
              label="Phone:"
              label-align-sm="right"
              label-for="input-phone"
            >
              <b-input id="input-phone" v-model="form.phone" type="number" placeholder="12345678"></b-input>
            </b-form-group>
          </b-form-group>
          <b-card no-body class="mb-3"></b-card>
          <b-form-group
            label-cols-lg="3"
            label="Financial Information:"
            label-size="lg"
            label-class="font-weight-bold pt-0 p-0 text-dark"
            class="mb-0"
          >
            <b-form-group
              label-cols-sm="3"
              label="Customer Group:"
              label-align-sm="right"
              label-for="input-group"
              description="Required"
            >
              <b-form-select
                id="input-group"
                v-model="form.selectedGroup"
                :options="dropdownData.customerGroups"
                required
              ></b-form-select>
            </b-form-group>
            <b-form-group
              label-cols-sm="3"
              label="Currency:"
              label-align-sm="right"
              label-for="input-currency"
              description="Required"
            >
              <b-form-select
                id="input-currency"
                required
                v-model="form.selectedCurrency"
                :options="dropdownData.currencies"
              ></b-form-select>
            </b-form-group>
            <b-form-group
              label-cols-sm="3"
              label="Payment Terms:"
              label-align-sm="right"
              label-for="input-terms"
              description="Required"
            >
              <b-form-select
                id="input-terms"
                required
                v-model="form.selectedPaymentTerms"
                :options="dropdownData.paymentTerms"
              ></b-form-select>
            </b-form-group>
            <b-form-group
              label-cols-sm="3"
              label="VAT Zone:"
              label-align-sm="right"
              label-for="input-vat"
              description="Required"
            >
              <b-form-select
                id="input-vat"
                required
                v-model="form.selectedVatZone"
                :options="dropdownData.vatZones"
              ></b-form-select>
            </b-form-group>
          </b-form-group>
          <b-card class="mb-3" no-body></b-card>
          <b-form-group
            label-cols-lg="3"
            label="Location:"
            label-size="lg"
            label-class="font-weight-bold pt-0 p-0 text-dark"
            class="mb-0"
          >
            <b-form-group
              label-cols-sm="3"
              label="Address:"
              label-align-sm="right"
              label-for="input-address"
            >
              <b-input id="input-address" v-model="form.address" placeholder="Address" type="text"></b-input>
            </b-form-group>
            <b-form-group
              label-cols-sm="3"
              label="ZIP Code:"
              label-align-sm="right"
              label-for="input-zip"
            >
              <b-input id="input-zip" v-model="form.zip" placeholder="0000" type="number"></b-input>
            </b-form-group>
            <b-form-group
              label-cols-sm="3"
              label="City:"
              label-align-sm="right"
              label-for="input-city"
            >
              <b-input id="input-city" v-model="form.city" placeholder="City" type="text"></b-input>
            </b-form-group>
            <b-form-group
              label-cols-sm="3"
              label="Country:"
              label-align-sm="right"
              label-for="input-country"
            >
              <b-input id="input-country" v-model="form.country" placeholder="Country" type="text"></b-input>
            </b-form-group>
          </b-form-group>
          <b-button-group>
            <b-button type="submit" variant="success">Save</b-button>
            <!-- <b-button type="reset" variant="danger">Reset</b-button> -->
          </b-button-group>
        </b-form>
      </b-card>
    </b-modal>
    <b-modal
      centered
      id="createContactModal"
      body-class="p-0"
      ref="createContactModal"
      title="Create Contact"
      hide-footer
      size="lg">
      <b-card bg-variant="light" body-class="p-0">
        <b-form @submit="submitContact" onsubmit="return false;" class="p-3">
          <b-form-group
            label-cols-lg="3"
            label="Basic Information:"
            label-size="lg"
            label-class="font-weight-bold pt-0 p-0 text-dark"
            class="mb-0"
          >
            <b-form-group
              label-cols-sm="3"
              label="First Name:"
              label-align-sm="right"
              label-for="input-firstName"
              description="Required"
            >
              <b-input id="input-firstName" required type="text" v-model="contactForm.firstName" placeholder="John"></b-input>
            </b-form-group>
            <b-form-group
              label-cols-sm="3"
              label="Last Name:"
              label-align-sm="right"
              label-for="input-lastName"
              description="Required"
            >
              <b-input id="input-lastName" required type="text" v-model="contactForm.lastName" placeholder="Doe"></b-input>
            </b-form-group>
            <b-form-group
              label-cols-sm="3"
              label="Job Title:"
              label-align-sm="right"
              label-for="input-title"
            >
              <b-input id="input-title" type="text" v-model="contactForm.title" placeholder="Title"></b-input>
            </b-form-group>
            <b-form-group
              label-cols-sm="3"
              label="Phone:"
              label-align-sm="right"
              label-for="input-phone"
            >
              <b-input id="input-phone" v-model="contactForm.phone" type="number" placeholder="12345678"></b-input>
            </b-form-group>
            <b-form-group
              label-cols-sm="3"
              label="E-mail:"
              label-align-sm="right"
              label-for="input-email"
            >
              <b-input id="input-email" v-model="contactForm.email" type="email" placeholder="email@email.com"></b-input>
            </b-form-group>
          </b-form-group>
          <b-button-group>
            <b-button type="submit" variant="success">Create</b-button>
          </b-button-group>
        </b-form>
      </b-card>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";
import fileDownload from "js-file-download";

export default {
  data() {
    return {
      dropdownData: {
        paymentTerms: [],
        customerGroups: [],
        currencies: [],
        vatZones: [],
      },
      form: {},
      contactForm: {},
      fields: {
        assets: [
          {
            key: "AgentID",
            label: "Asset ID",
          },
          {
            key: "AgentName",
            label: "Asset Name",
          },
          {
            key: "Online",
            label: "Status",
          },
          {
            key: "LastPatchManagementReceived",
            label: "Last Patched",
          },
        ],
        tickets: [
          {
            key: "ticket_id",
            label: "Ticket ID",
          },
          {
            key: "subject",
            label: "Subject",
          },
          {
            key: "created_date",
            label: "Date of Creation",
          },
          {
            key: "modified_date",
            label: "Last Updated",
          },
          {
            key: "status",
            label: "Status",
          },
          {
            key: "reply_status",
            label: "Reply Status",
          },
        ],
        invoices: [
          {
            key: "bookedInvoiceNumber", //Fix this so it fits all invoices and not just the booked ones
            label: "Invoice Number",
          },
          {
            key: "date",
            label: "Date Created",
          },
          {
            key: "dueDate",
            label: "Due On",
          },
          {
            key: "netAmount",
          },
          {
            key: "remainder",
            label: "Payment",
          },
          {
            key: "pdf",
            label: "",
          },
        ],
        passwords: [
          {
            key: "name",
            label: "Name",
          },
          {
            key: "domain",
          },
          {
            key: "url",
            label: "URL",
          },
          {
            key: "username",
          },
          {
            key: "password",
          },
          {
            key: "access_level",
          },
          {
            key: "togglePass",
            label: "",
          },
        ],
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
          totalItems: 0,
        },
        invoices: {
          perPage: 10,
          currentPage: 1,
          totalItems: 0,
          filterOptions: {
            options: [
              { text: "Booked", value: "booked" },
              { text: "Drafts", value: "drafts" },
              // { text: 'Unpaid', value: 'unpaid'},
              // { text: 'Paid', value: 'paid'},
              // { text: 'Overdue', value: 'overdue'},
              // { text: 'Not Due', value: 'not-due'},
            ],
            allSelected: true,
            selected: "booked",
            indeterminate: false,
          },
        },
        tickets: {
          perPage: 10,
          currentPage: 1,
          totalItems: 0,
        },
        passwords: {
          perPage: 10,
          currentPage: 1,
          totalItems: 0,
        },
      },
      customerInfo: {
        atera: {},
        economic: {},
      },
      paymentTerms: {},
      customerGroup: 0,
      ateraid: 0,
      id: this.$route.query.customerID,
    };
  },
  created() {
    // //Set all invoice filter options to be selected once mounted.
    // this.toggleAll(true)

    this.$getAccountID();

    this.getCustomerInfo();
    this.fetchData(
      `assets/${this.id}/${this.pagination.assets.currentPage}/${this.pagination.assets.perPage}`
    ).then((response) => {
      this.items.assets = response.data.assets.items;
      this.pagination.assets.totalItems = response.data.assets.totalItemCount;
    });
    this.fetchData(
      `customer/tickets/${this.$route.query.customerID}/1/10`
    ).then((response) => {
      this.items.tickets = response.data.tickets;
    });
    this.fetchData(`customer/contracts/${this.id}`).then((response) => {
      this.items.contracts = response.data.contracts;
    });
    this.fetchData(
      `customer/passwords/${this.$getAccountID()}/${this.id}/${
        this.pagination.passwords.currentPage
      }/${this.pagination.passwords.perPage}`
    ).then((response) => {
      this.items.passwords = response.data.passwords;
      this.pagination.passwords.totalItems = response.data.passwords.length;
    });
    axios.get(`${process.env.VUE_APP_URL}customerGroups`).then((response) => {
      for (var item in response.data.customerGroups) {
        console.log(item);
        const group = response.data.customerGroups[item];
        this.dropdownData.customerGroups.push({
          value: group.customerGroupNumber,
          text: group.name,
        });
      }
    });
    axios.get(`${process.env.VUE_APP_URL}currencies`).then((response) => {
      for (var item in response.data.currencies) {
        const currency = response.data.currencies[item];
        this.dropdownData.currencies.push({
          value: currency.code,
          text: currency.name,
        });
      }
    });
    axios.get(`${process.env.VUE_APP_URL}paymentTerms`).then((response) => {
      for (var item in response.data.paymentTerms) {
        const term = response.data.paymentTerms[item];
        this.dropdownData.paymentTerms.push({
          value: term.paymentTermsNumber,
          text: term.name,
        });
      }
    });
    axios.get(`${process.env.VUE_APP_URL}vatZones`).then((response) => {
      for (var item in response.data.vatZones) {
        const vatZone = response.data.vatZones[item];
        this.dropdownData.vatZones.push({
          value: vatZone.vatZoneNumber,
          text: vatZone.name,
        });
      }
    });

    this.loadInvoices();

    // axios.get(`${process.env.VUE_APP_URL}invoices/${this.id}/1/10`, { //This is temporary and will be replaced, however it isn't a priority at this time
    //   params: {
    //     types: this.pagination.invoices.filterOptions.selected
    //   }
    // })
    // .then(response => {
    //   console.log(response)
    // })
  },
  methods: {
    getCustomerInfo() {
      axios
        .all([
          this.fetchData(`customer/${this.id}`),
          this.fetchData(`customer/contacts/${this.id}`),
        ])
        .then(
          axios.spread((...responses) => {
            const customerData = responses[0].data;
            this.customerInfo = customerData.customer;
            this.customerGroup = customerData.customerGroup;
            this.ateraid = customerData.apiInfo;
            this.paymentTerms = customerData.paymentTerms;

            this.populateForm();

            const contactData = responses[1].data;
            this.items.contacts = contactData.contacts;
          })
        )
        .catch((error) => {
          console.log(error);
        });
    },
    fetchData(endpoint) {
      return axios.get(process.env.VUE_APP_URL + endpoint);
    },
    loadContracts: function () {},
    dayjs: function () {
      return dayjs();
    },
    loadInvoices() {
      const selected = this.pagination.invoices.filterOptions.selected;
      axios
        .get(`${process.env.VUE_APP_URL}invoices/${this.id}/${selected}/1/10`)
        .then((response) => {
          console.log(response.data.collection);
          this.items.invoices = response.data.collection;
          this.pagination.invoices.totalItems = response.data.collection.length;
          // this.fields.invoices[0].key = `${this.pagination.invoices.filterOptions.selected}InvoiceNumber`
        });
    },
    downloadInvoice(link) {
      axios
        .post(
          `${process.env.VUE_APP_URL}invoices/pdf`,
          {
            link: link,
          },
          {
            responseType: "blob",
          }
        )
        .then((response) => {
          fileDownload(response.data, "invoice.pdf");
        });
    },
    getInvoiceStatus(date, remainder) {
      const today = new Date();
      const dueDate = dayjs(date);

      if (remainder === 0) {
        return "paid"; //If the remaining payment required is 0, return the status as paid.
      } else {
        if (dueDate.isAfter(today)) {
          return "unpaid"; //If the invoice is due after the current time, return the status as unpaid.
        } else {
          return "overdue"; //If the invoice is overdue, return the status as overdue.
        }
      }
    },
    invoiceOverdue(date) {
      const today = new Date();
      const dueDate = dayjs(date);

      if (dueDate.isBefore(today)) {
        return "overdue";
      } else {
        return "notDue";
      }
    },
    invoicePaid(remainder) {
      if (remainder === 0) {
        return "paid";
      } else {
        return "unpaid";
      }
    },
    getPassword(passwordId) {
      axios
        .get(`${process.env.VUE_APP_URL}password/${passwordId}`)
        .then((response) => {
          console.log(response);
          const passwords = this.items.passwords;
          for (var item in passwords) {
            if (passwords[item].password_id === passwordId) {
              passwords[item].password = response.data;
              this.$refs.passTable.refresh();
            }
          }
        });
    },
    populateForm() {
      this.form = {
        name: this.customerInfo.economic.name,
        businessNumber: this.customerInfo.economic
          .corporateIdentificationNumber,
        domain: this.customerInfo.atera.Domain,
        country: this.customerInfo.economic.country,
        city: this.customerInfo.economic.city,
        address: this.customerInfo.economic.address,
        zip: this.customerInfo.economic.zip,
        phone: this.customerInfo.economic.telephoneAndFaxNumber,
        selectedPaymentTerms: this.customerInfo.economic.paymentTerms
          .paymentTermsNumber,
        selectedGroup: this.customerInfo.economic.customerGroup
          .customerGroupNumber,
        selectedCurrency: this.customerInfo.economic.currency,
        selectedVatZone: this.customerInfo.economic.vatZone.vatZoneNumber,
      };
    },
    submitCustomerEdit() {
      console.log("Submitting");
      axios
        .put(`${process.env.VUE_APP_URL}customer/${this.id}`, this.form)
        .then((response) => {
          console.log(response);
          this.$refs["customerEditModal"].hide();
          this.getCustomerInfo();
        });
    },
    submitContact() {
      console.log('Creating contact')
      var requestBody = this.contactForm;
      requestBody.businessNumber = this.id;

      axios.post(`${process.env.VUE_APP_URL}contacts`, requestBody)
      .then(response => {
        console.log(response)
        this.$refs["createContactModal"].hide();
        this.getCustomerInfo();
      })
    },
    // toggleAll(checked) {
    //   this.pagination.invoices.filterOptions.selected = checked ? this.pagination.invoices.filterOptions.optionsValues.slice() : []
    // }
  },
  filters: {
    //These need to be made global filters at some point.
    dayjsDateOnly: function (date) {
      return dayjs(date).format("MMM D, YYYY");
    },
    dayjsDateTime: function (date) {
      return dayjs(date).format("MMM D, YYYY, h:mm:ss a");
    },
  },
  computed: {
    assetsCurrentPage() {
      return this.pagination.assets.currentPage;
    },
    ticketsCurrentPage() {
      return this.pagination.tickets.currentPage;
    },
  },
  watch: {
    assetsCurrentPage() {
      this.fetchData(
        `assets/${this.id}/${this.pagination.assets.currentPage}/${this.pagination.assets.perPage}`
      ).then((response) => {
        this.items.assets = response.data.assets.items;
        this.pagination.assets.totalItems = response.data.assets.totalItemCount;
      });
    },
  },
};
</script>
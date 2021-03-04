<template>
  <div id="wrapper">
    <div class="container-fluid">
      <h3 class="text-dark mb-4">
        {{ customerInfo.economic.name }} ({{
          customerInfo.economic.customerNumber
        }})
      </h3>
      <div class="row mb-3">
        <div class="col-3">
          <div class="row mb-3">
            <div class="col">
              <b-card header="Customer Information">
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <h4 class="small font-weight-bold">Name</h4>
                      <h4 class="small">{{ customerInfo.economic.name }}</h4>
                    </div>
                    <div class="mb-3">
                      <h4 class="small font-weight-bold">Currency</h4>
                      <h4 class="small">
                        {{ customerInfo.economic.currency }}
                      </h4>
                    </div>
                    <div class="mb-3">
                      <h4 class="small font-weight-bold">Sales Person</h4>
                      <h4 v-if="employee" class="small">{{ employeeName }}</h4>
                      <h4 v-else class="small">N/A</h4>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <h4 class="small font-weight-bold">Customer Group</h4>
                      <h4 class="small">{{ customerGroup }}</h4>
                    </div>
                    <div class="mb-3">
                      <h4 class="small font-weight-bold">Payment Terms</h4>
                      <h4 class="small">{{ paymentTerms }}</h4>
                    </div>
                  </div>
                </div>
                <div class="card mb-3"></div>
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <h4 class="small font-weight-bold">Phone Number</h4>
                      <b-link
                        v-if="customerInfo.economic.telephoneAndFaxNumber"
                        class="small"
                        :href="
                          'tel:' + customerInfo.economic.telephoneAndFaxNumber
                        "
                        >{{
                          customerInfo.economic.telephoneAndFaxNumber
                        }}</b-link
                      >
                      <h4 v-else class="small">N/A</h4>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <h4 class="small font-weight-bold">E-mail</h4>
                      <b-link
                        v-if="customerInfo.economic.telephoneAndFaxNumber"
                        class="small"
                        :href="'mailto:' + customerInfo.economic.email"
                        >{{ customerInfo.economic.email }}</b-link
                      >
                    </div>
                  </div>
                </div>
                <div class="card shadow mb-3"></div>
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <h4 class="small font-weight-bold">Address</h4>
                      <h4 class="small">
                        {{ customerInfo.economic.address }}
                      </h4>
                    </div>
                    <div class="mb-3">
                      <h4 class="small font-weight-bold">ZIP Code</h4>
                      <h4 class="small">{{ customerInfo.economic.zip }}</h4>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <h4 class="small font-weight-bold">City</h4>
                      <h4 class="small">{{ customerInfo.economic.city }}</h4>
                    </div>
                    <div class="mb-3">
                      <h4 class="small font-weight-bold">Country</h4>
                      <h4 class="small">
                        {{ customerInfo.economic.country }}
                      </h4>
                    </div>
                  </div>
                </div>
                <div class="card shadow mb-2"></div>
                <div class="row mb-2">
                  <div class="col">
                    <button
                      class="btn btn-primary w-100"
                      v-b-modal.customerEditModal
                    >
                      Edit Customer
                    </button>
                  </div>
                </div>
                <button class="btn btn-danger w-100" v-b-modal.deletionModal>
                  Delete Customer
                </button>
              </b-card>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <customer-call-log></customer-call-log>
            </div>
          </div>
        </div>
        <b-col style="position: relative">
          <div style="height: 100%">
            <b-card no-body shadow style="height: 100%">
              <b-tabs card fill>
                <b-tab title="Contacts" active>
                  <b-card-text>
                    <b-card bg-variant="light" class="mb-3">
                      <b-col>
                        <b-button
                          v-b-modal.createContactModal
                          class="float-right"
                          variant="success"
                          >Create Contact</b-button
                        >
                      </b-col>
                    </b-card>
                    <b-row v-if="items.contacts.length">
                      <div
                        v-for="(contact, idx) in items.contacts"
                        :key="idx"
                        class="col-4"
                      >
                        <div class="card mb-3 p-3" style="height: 140px">
                          <div class="row ml-3">
                            <b-link
                              class="font-weight-bold"
                              style="color: black; font-size: 120%"
                              :to="{
                                path: '/contact/',
                                query: { contactid: contact.contactId },
                              }"
                              >{{ contact.firstName }}
                              {{ contact.lastName }}</b-link
                            >
                          </div>
                          <div
                            class="row ml-3"
                            v-if="contact.jobTitle !== 'null'"
                          >
                            <h6 class="small">{{ contact.jobTitle }}</h6>
                          </div>
                          <div
                            v-if="contact.email && contact.email !== 'null'"
                            class="row ml-3"
                          >
                            <span
                              style="color: black"
                              class="fa fa-at fa-fw mr-1"
                            ></span>
                            <b-link :href="'mailto:' + contact.email">{{
                              contact.email
                            }}</b-link>
                          </div>
                          <div
                            v-if="contact.phones && contact.phones !== 'null'"
                            class="row ml-3"
                          >
                            <div
                              v-for="phone in contact.phones"
                              :key="phone.phone"
                            >
                              <span
                                style="color: black"
                                class="fa fa-phone fa-fw mr-1"
                              ></span>
                              <b-link :href="'tel:' + phone.phone"
                                >{{ phone.name }}: {{ phone.phone }}</b-link
                              >
                            </div>
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
                    <b-card bg-variant="light" class="mb-3">
                      <b-form
                        inline
                        @submit="submitContractRates"
                        onsubmit="return false;"
                        class="inline"
                      >
                        <div role="group" class="mx-auto py-0">
                          <label
                            >Driving ({{
                              customerInfo.economic.currency
                            }}):</label
                          >
                          <b-form-input
                            type="number"
                            v-model="items.contractRates.drivingRate"
                          ></b-form-input>
                        </div>
                        <div role="group" class="mx-auto py-0">
                          <label
                            >Support ({{
                              customerInfo.economic.currency
                            }}):</label
                          >
                          <b-form-input
                            type="number"
                            v-model="items.contractRates.supportRate"
                          ></b-form-input>
                        </div>
                        <div role="group" class="mx-auto py-0">
                          <label
                            >Consultant ({{
                              customerInfo.economic.currency
                            }}):</label
                          >
                          <b-form-input
                            type="number"
                            v-model="items.contractRates.consultantRate"
                          ></b-form-input>
                        </div>
                        <b-button
                          type="submit"
                          variant="success"
                          class="mx-auto"
                          >Apply</b-button
                        >
                      </b-form>
                    </b-card>
                    <b-row v-if="items.contracts">
                      <div
                        v-for="(contract, idx) in items.contracts"
                        :key="idx"
                        class="pl-4 col-6"
                      >
                        <div class="card mb-3" style="color: black">
                          <div class="container h-100 pl-0">
                            <div class="row">
                              <div
                                class="col-2 bg-success d-flex align-items-center justify-content-center"
                              >
                                <i
                                  class="fa rel fa-bookmark"
                                  style="font-size: 30px"
                                ></i>
                              </div>
                              <div class="col py-3">
                                <div class="row ml-1">
                                  <h6 class>
                                    {{ contract.ContractName }} -
                                    {{ contract.ContractType }}
                                  </h6>
                                </div>
                                <div class="row ml-1">
                                  <h5 class="font-weight-bold">
                                    {{ contract.StartDate | dayjsDateTime }} -
                                    {{ contract.EndDate | dayjsDateTime }}
                                  </h5>
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
                            :to="{
                              path: '/asset',
                              query: { assetID: data.item.AgentID },
                            }"
                            >{{ data.item.AgentName }}</b-link
                          >
                        </template>
                        <template v-slot:cell(Online)="data">
                          <h5 class="m-0 p-0">
                            <b-badge v-if="data.item.Online" variant="success"
                              >Online</b-badge
                            >
                            <b-badge v-else variant="danger">Offline</b-badge>
                          </h5>
                        </template>
                        <template
                          v-slot:cell(LastPatchManagementReceived)="data"
                          >{{
                            data.item.LastPatchManagementReceived
                              | dayjsDateTime
                          }}</template
                        >
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
                      <paginated-table
                        :url="ticketsUrl"
                        :fields="fields.tickets"
                        :results="10"
                      ></paginated-table>
                    </div>
                  </b-card-text>
                </b-tab>
                <b-tab title="Passwords">
                  <passwords-tab></passwords-tab>
                </b-tab>
                <b-tab title="Attachments">
                  <b-card-text>
                    <b-card bg-variant="light" class="mb-3">
                      <VueFileAgent
                        id="attachmentAgent"
                        class="mb-2"
                        :uploadHeaders="uploadHeaders"
                        :multiple="true"
                        :deletable="true"
                        :editable="true"
                        :theme="'list'"
                        :meta="true"
                        :helpText="'Browse or drag & drop here'"
                        v-model="fileRecords"
                        ref="attachmentFileAgent"
                        @beforedelete="beforeDeleteFileRecord($event)"
                      ></VueFileAgent>
                      <b-button
                        variant="success"
                        :disabled="!fileRecords.length"
                        @click="uploadAttachments"
                        >Upload {{ fileRecords.length }}</b-button
                      >
                    </b-card>
                    <paginated-table
                      :fields="this.fields.attachments"
                      :url="`${apiUrl}attachments/customers/${this.id}`"
                      :uploadUrl="`${apiUrl}attachments`"
                      :downloadUrl="`${apiUrl}attachments`"
                      :results="12"
                      :editable="true"
                      :deletable="true"
                      :deletableRole="0"
                      :downloadable="true"
                    >
                    </paginated-table>
                  </b-card-text>
                </b-tab>
                <b-tab title="Invoices">
                  <b-card-text>
                    <b-card bg-variant="light" class="mb-3">
                      <b-row>
                        <b-col>
                          <b-select
                            v-model="pagination.invoices.filterOptions.selected"
                            :options="pagination.invoices.filterOptions.options"
                          ></b-select>
                        </b-col>
                      </b-row>
                    </b-card>
                    <paginated-table
                      :url="invoicesUrl"
                      :fields="fields.invoices"
                      :results="10"
                      :downloadable="true"
                      :downloadUrl="`${apiUrl}invoices/booked`"
                      :downloadType="'economic'"
                    ></paginated-table>
                  </b-card-text>
                </b-tab>
                <b-tab title="Subscriptions">
                  <subscriptions-tab></subscriptions-tab>
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
      <h5>
        Are you sure you want to delete the customer
        {{ customerInfo.economic.name }}
      </h5>
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
        <b-form
          @submit="submitCustomerEdit"
          onsubmit="return false;"
          class="p-3"
        >
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
              <b-input
                id="input-domain"
                type="text"
                v-model="form.domain"
                placeholder="domain.dk"
              ></b-input>
            </b-form-group>
            <b-form-group
              label-cols-sm="3"
              label="Phone:"
              label-align-sm="right"
              label-for="input-phone"
            >
              <b-input
                id="input-phone"
                v-model="form.phone"
                type="number"
                placeholder="12345678"
              ></b-input>
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
            <b-form-group
              label-cols-sm="3"
              label="Disable E-Invoicing:"
              label-align-sm="right"
              label-for="input-invoice"
            >
              <b-form-checkbox
                id="input-invoice"
                required
                v-model="form.eInvoicingDisabledByDefault"
                :options="dropdownData.eInvoicingDisabledByDefault"
              ></b-form-checkbox>
            </b-form-group>
            <b-form-group
              label-cols-sm="3"
              label="Sales Person:"
              label-align-sm="right"
              label-for="input-salesperson"
            >
              <b-select
                v-model="form.selectedEmployee"
                :options="dropdownData.employees"
              ></b-select>
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
              <b-input
                id="input-address"
                v-model="form.address"
                placeholder="Address"
                type="text"
              ></b-input>
            </b-form-group>
            <b-form-group
              label-cols-sm="3"
              label="ZIP Code:"
              label-align-sm="right"
              label-for="input-zip"
            >
              <b-input
                id="input-zip"
                v-model="form.zip"
                placeholder="0000"
                type="number"
              ></b-input>
            </b-form-group>
            <b-form-group
              label-cols-sm="3"
              label="City:"
              label-align-sm="right"
              label-for="input-city"
            >
              <b-input
                id="input-city"
                v-model="form.city"
                placeholder="City"
                type="text"
              ></b-input>
            </b-form-group>
            <b-form-group
              label-cols-sm="3"
              label="Country:"
              label-align-sm="right"
              label-for="input-country"
            >
              <b-input
                id="input-country"
                v-model="form.country"
                placeholder="Country"
                type="text"
              ></b-input>
            </b-form-group>
          </b-form-group>
          <b-button-group>
            <b-button type="submit" variant="success">Save</b-button>
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
      size="lg"
    >
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
              <b-input
                id="input-firstName"
                required
                type="text"
                v-model="contactForm.firstName"
                placeholder="John"
              ></b-input>
            </b-form-group>
            <b-form-group
              label-cols-sm="3"
              label="Last Name:"
              label-align-sm="right"
              label-for="input-lastName"
              description="Required"
            >
              <b-input
                id="input-lastName"
                required
                type="text"
                v-model="contactForm.lastName"
                placeholder="Doe"
              ></b-input>
            </b-form-group>
            <b-form-group
              label-cols-sm="3"
              label="Job Title:"
              label-align-sm="right"
              label-for="input-title"
            >
              <b-input
                id="input-title"
                type="text"
                v-model="contactForm.title"
                placeholder="Title"
              ></b-input>
            </b-form-group>
            <b-form-group
              label-cols-sm="3"
              label="Phone:"
              label-align-sm="right"
              label-for="input-phone"
            >
              <b-input
                id="input-phone"
                v-model="contactForm.phone"
                type="number"
                placeholder="12345678"
              ></b-input>
            </b-form-group>
            <b-form-group
              label-cols-sm="3"
              label="E-mail:"
              label-align-sm="right"
              label-for="input-email"
            >
              <b-input
                id="input-email"
                v-model="contactForm.email"
                type="email"
                placeholder="email@email.com"
              ></b-input>
            </b-form-group>
          </b-form-group>
          <b-card no-body class="mb-3"></b-card>
          <b-form-group
            label-cols-lg="3"
            label="Notification Settings:"
            label-size="lg"
            label-class="font-weight-bold pt-0 p-0 text-dark"
            class="mb-0"
          >
            <b-form-group
              label-cols-sm="3"
              label="Invoices:"
              label-align-sm="right"
              label-for="input-boolinvoices"
              description="Required"
            >
              <b-checkbox
                id="input-boolinvoices"
                required
                value="invoices"
                v-model="contactForm.notify"
              ></b-checkbox>
            </b-form-group>
            <b-form-group
              label-cols-sm="3"
              label="Orders:"
              label-align-sm="right"
              label-for="input-invoiceId"
              description="Required"
            >
              <b-checkbox
                id="input-boolorders"
                required
                value="orders"
                v-model="contactForm.notify"
              ></b-checkbox>
            </b-form-group>
            <b-form-group
              label-cols-sm="3"
              label="Quotations:"
              label-align-sm="right"
              label-for="input-invoiceId"
              description="Required"
            >
              <b-checkbox
                id="input-boolquotations"
                required
                value="quotations"
                v-model="contactForm.notify"
              ></b-checkbox>
            </b-form-group>
            <b-form-group
              label-cols-sm="3"
              label="Reminders:"
              label-align-sm="right"
              label-for="input-invoiceId"
              description="Required"
            >
              <b-checkbox
                id="input-boolreminders"
                required
                value="reminders"
                v-model="contactForm.notify"
              ></b-checkbox>
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
import axios from 'axios'
import dayjs from 'dayjs'
import fileDownload from 'js-file-download'
import download from 'downloadjs'
import PaginatedTable from '../PaginatedTable'
import { getToken } from '../../auth/authHelper'
import SubscriptionsTab from '../Customer/SubscriptionsTab.vue'
import PasswordsTab from '../Customer/PasswordsTab.vue'
import CustomerCallLog from '../Customer/CustomerCallLog'

export default {
  data() {
    return {
      id: this.$route.query.id,
      fileRecords: [],
      uploadHeaders: {},
      apiUrl: `${process.env.VUE_APP_URL}`,
      ticketsUrl: null,
      uploadUrl: `${process.env.VUE_APP_URL}attachments/customers/${this.$route.query.id}`,
      invoicesUrl: `${process.env.VUE_APP_URL}customers/${this.$route.query.id}/invoices/booked`,
      dropdownData: {
        paymentTerms: [],
        customerGroups: [],
        currencies: [],
        vatZones: [],
        employees: [],
      },
      form: {},
      contactForm: {
        notify: [],
      },
      fields: {
        assets: [
          {
            key: 'AgentID',
            label: 'Asset ID',
          },
          {
            key: 'AgentName',
            label: 'Asset Name',
          },
          {
            key: 'Online',
            label: 'Status',
          },
          {
            key: 'LastPatchManagementReceived',
            label: 'Last Patched',
          },
        ],
        tickets: [
          {
            key: 'ticketId',
            label: 'Ticket ID',
            sortable: true,
          },
          {
            key: 'subject',
            label: 'Subject',
            sortable: true,
            typeOptions: {
              type: 'link',
              path: '/ticket',
              idName: 'ticketId',
              linkText: 'subject',
            },
          },
          {
            key: 'createdDate',
            label: 'Date of Creation',
            sortable: true,
            typeOptions: {
              type: 'datetime',
            },
          },
          {
            key: 'modifiedDate',
            label: 'Last Updated',
            sortable: true,
            typeOptions: {
              type: 'datetime',
            },
          },
          {
            key: 'status',
            sortable: true,
          },
          {
            key: 'replyStatus',
            sortable: true,
          },
        ],
        invoices: [
          {
            key: 'bookedInvoiceNumber', //Fix this so it fits all invoices and not just the booked ones
            label: 'Invoice Number',
            sortable: true,
          },
          {
            key: 'date',
            label: 'Date Created',
            typeOptions: {
              type: 'date',
            },
          },
          {
            key: 'dueDate',
            label: 'Due On',
            typeOptions: {
              type: 'date',
            },
          },
          {
            key: 'netAmount',
            typeOptions: {
              type: 'rate',
            },
          },
          {
            key: 'remainder',
            label: 'Payment',
            sortable: true,
            typeOptions: {
              type: 'paid',
            },
          },
        ],
        attachments: [
          {
            key: 'fileName',
            label: 'Name',
            sortable: true,
          },
          {
            key: 'fileSize',
            label: 'Size (WIP)',
            sortable: true,
            typeOptions: {
              type: 'constant',
            },
          },
          {
            key: 'visibleToCustomer',
            label: 'Visible',
            sortable: true,
            typeOptions: {
              type: 'constant',
            },
          },
        ],
      },
      items: {
        tickets: [],
        contacts: [],
        contracts: [],
        contractRates: {},
        assets: [],
        invoices: [],
        attachments: [],
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
              {
                text: 'Booked',
                value: `${process.env.VUE_APP_URL}customers/${this.$route.query.id}/invoices/booked`,
              },
              {
                text: 'Drafts',
                value: `${process.env.VUE_APP_URL}customers/${this.$route.query.id}/invoices/drafts`,
              },
              // { text: 'Unpaid', value: 'unpaid'},
              // { text: 'Paid', value: 'paid'},
              // { text: 'Overdue', value: 'overdue'},
              // { text: 'Not Due', value: 'not-due'},
            ],
            allSelected: true,
            selected: 'booked',
            indeterminate: false,
          },
        },
        tickets: {
          perPage: 10,
          currentPage: 1,
          totalItems: 0,
        },
        passwords: {},
        attachments: {
          perPage: 13,
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
      employeeName: null,
      employee: null,
    }
  },
  created() {
    this.ticketsUrl = `${process.env.VUE_APP_URL}customers/${this.id}/tickets`

    this.getCustomerInfo()
    this.fetchData(
      `assets/${this.id}/${this.pagination.assets.currentPage}/${this.pagination.assets.perPage}`
    ).then((response) => {
      this.items.assets = response.data.assets.items
      this.pagination.assets.totalItems = response.data.assets.totalItemCount
    })
    // this.fetchData(`customers/${this.id}/tickets`, {
    //   params: {
    //     page: this.pagination.tickets.currentPage,
    //     results: this.pagination.tickets.perPage,
    //   },
    // }).then((response) => {
    //   this.items.tickets = response.data
    // })
    this.fetchData(`customer/contracts/${this.id}`).then((response) => {
      this.items.contracts = response.data.contracts
    })
    this.fetchData(`customers/${this.id}/rates`).then((response) => {
      this.items.contractRates = response.data
    })
    axios
      .get(`${process.env.VUE_APP_URL}invoices/customerGroups`)
      .then((response) => {
        for (var item in response.data) {
          const group = response.data[item]
          this.dropdownData.customerGroups.push({
            value: group.customerGroupNumber,
            text: group.name,
          })
        }
      })
    axios
      .get(`${process.env.VUE_APP_URL}invoices/currencies`)
      .then((response) => {
        for (var item in response.data) {
          const currency = response.data[item]
          this.dropdownData.currencies.push({
            value: currency.code,
            text: currency.name,
          })
        }
      })
    axios
      .get(`${process.env.VUE_APP_URL}invoices/paymentTerms`)
      .then((response) => {
        for (var item in response.data) {
          const term = response.data[item]
          this.dropdownData.paymentTerms.push({
            value: term.paymentTermsNumber,
            text: term.name,
          })
        }
      })
    axios
      .get(`${process.env.VUE_APP_URL}invoices/vatZones`)
      .then((response) => {
        for (var item in response.data) {
          const vatZone = response.data[item]
          this.dropdownData.vatZones.push({
            value: vatZone.vatZoneNumber,
            text: vatZone.name,
          })
        }
      })
    axios.get(`${process.env.VUE_APP_URL}employees`).then((response) => {
      for (var item in response.data) {
        const employee = response.data[item]
        this.dropdownData.employees.push({
          value: employee.microsoftId,
          text: employee.name,
        })
      }
    })
    // this.loadInvoices()
  },
  methods: {
    getCustomerInfo() {
      axios
        .get(`${process.env.VUE_APP_URL}customers/${this.id}`)
        .then((response) => {
          const data = response.data

          this.customerInfo = data.customer
          this.customerGroup = data.customerGroup
          this.employeeName = data.employeeName
          this.employee = data.employee
          this.ateraid = data.apiInfo
          this.paymentTerms = data.paymentTerms

          this.populateForm()
        })

      axios
        .get(`${process.env.VUE_APP_URL}customers/${this.id}/contacts`)
        .then((response) => {
          console.log(response)
          const data = response.data
          this.items.contacts = data
        })
    },
    fetchData(endpoint, params) {
      if (params) {
        return axios.get(process.env.VUE_APP_URL + endpoint, params)
      } else {
        return axios.get(process.env.VUE_APP_URL + endpoint)
      }
    },
    downloadInvoice(link) {
      axios
        .get(`${process.env.VUE_APP_URL}invoices/pdf`, {
          params: {
            url: link,
          },
          responseType: 'arraybuffer',
        })
        .then((response) => {
          fileDownload(response.data, 'invoice.pdf')
        })
    },
    getInvoiceStatus(date, remainder) {
      const today = new Date()
      const dueDate = dayjs(date)

      if (remainder === 0) {
        return 'paid' //If the remaining payment required is 0, return the status as paid.
      } else {
        if (dueDate.isAfter(today)) {
          return 'unpaid' //If the invoice is due after the current time, return the status as unpaid.
        } else {
          return 'overdue' //If the invoice is overdue, return the status as overdue.
        }
      }
    },
    invoiceOverdue(date) {
      const today = new Date()
      const dueDate = dayjs(date)

      if (dueDate.isBefore(today)) {
        return 'overdue'
      } else {
        return 'notDue'
      }
    },
    invoicePaid(remainder) {
      if (remainder === 0) {
        return 'paid'
      } else {
        return 'unpaid'
      }
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
        eInvoicingDisabledByDefault: this.customerInfo.economic
          .eInvoicingDisabledByDefault,
      }
    },
    submitCustomerEdit() {
      axios
        .put(`${process.env.VUE_APP_URL}customers/${this.id}`, this.form)
        .then(() => {
          this.$refs['customerEditModal'].hide()
          this.getCustomerInfo()
        })
    },
    submitContact() {
      var requestBody = this.contactForm
      requestBody.businessNumber = this.id

      axios.post(`${process.env.VUE_APP_URL}contacts`, requestBody).then(() => {
        this.$refs['createContactModal'].hide()
        this.getCustomerInfo()
      })
    },
    async submitContractRates() {
      axios
        .put(
          `${process.env.VUE_APP_URL}customers/${this.id}/rates`,
          this.items.contractRates
        )
        .then(() => {})
    },
    async downloadAttachment(id, name, type) {
      let attachment = await axios.get(
        `${process.env.VUE_APP_URL}attachments/${id}`
      )

      download(`data:${type};base64,${attachment.data}`, name, type)
    },
    deleteAttachment(id) {
      axios.delete(`${process.env.VUE_APP_URL}attachments/${id}`).then(() => {
        this.loadAttachments()
      })
    },
    async loadAttachments() {
      let page = this.pagination.attachments.currentPage
      let resultsPerPage = this.pagination.attachments.perPage

      let attachments = await axios.get(
        `${process.env.VUE_APP_URL}attachments/customers/${this.id}`,
        {
          params: {
            page: page,
            results: resultsPerPage,
          },
        }
      )
      this.$set(this.items.attachments, '', attachments.data.attachments)
      this.items.attachments = attachments.data.attachments
      this.pagination.attachments.totalItems = attachments.data.entryCount
    },
    async uploadAttachments() {
      let token = await getToken()
      this.uploadHeaders = {
        authorization: `bearer ${token.idToken}`,
      }

      this.$refs.attachmentFileAgent
        .upload(this.uploadUrl, this.uploadHeaders, this.fileRecords)
        .then(() => {
          this.loadAttachments()
        })
      this.fileRecords = []
    },
    beforeDeleteFileRecord(fileRecord) {
      this.$refs.attachmentFileAgent.deleteFileRecord(fileRecord)
    },
  },
  filters: {
    dayjsDateTime: function (date) {
      return dayjs(date).format('MMM D, YYYY, h:mm:ss a')
    },
  },
  computed: {
    assetsCurrentPage() {
      return this.pagination.assets.currentPage
    },
    ticketsCurrentPage() {
      return this.pagination.tickets.currentPage
    },
    attachmentsCurrentPage() {
      return this.pagination.attachments.currentPage
    },
  },
  watch: {
    assetsCurrentPage() {
      this.fetchData(
        `assets/${this.id}/${this.pagination.assets.currentPage}/${this.pagination.assets.perPage}`
      ).then((response) => {
        this.items.assets = response.data.assets.items
        this.pagination.assets.totalItems = response.data.assets.totalItemCount
      })
    },
    async attachmentsCurrentPage() {
      this.loadAttachments()
    },
  },
  components: {
    PaginatedTable,
    PasswordsTab,
    SubscriptionsTab,
    CustomerCallLog,
  },
}
</script>

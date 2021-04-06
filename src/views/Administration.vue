<template>
  <div id="wrapper">
    <div class="d-flex flex-column" id="content-wrapper">
      <div id="content">
        <div class="container-fluid">
          <h3 class="text-dark mb-4">Administration</h3>
          <b-card no-body>
            <b-tabs card>
              <b-tab title="Subscriptions">
                <subscriptions-tab
                  :products="items.products"
                ></subscriptions-tab>
              </b-tab>
              <b-tab title="Products">
                <div>
                  <b-table
                    show-empty
                    outlined
                    hover
                    :items="items.products"
                    :fields="fields.products"
                    :per-page="0"
                    :current-page="pagination.products.currentPage"
                  >
                    <template v-slot:cell(name)="data">
                      <b-link
                        :to="{
                          path: '/customer',
                          query: {
                            customerID: data.item.corporateIdentificationNumber,
                          },
                        }"
                        >{{ data.item.name }}</b-link
                      >
                    </template>
                  </b-table>
                  <b-pagination
                    size="md"
                    v-model="pagination.products.currentPage"
                    :total-rows="pagination.products.totalItems"
                    :per-page="pagination.products.perPage"
                  ></b-pagination>
                </div>
              </b-tab>
              <b-tab title="Product Groups">
                <div>
                  <b-table
                    show-empty
                    outlined
                    hover
                    :items="items.productGroups"
                    :fields="fields.productGroups"
                    :per-page="0"
                    :current-page="pagination.productGroups.currentPage"
                  >
                    <template #cell(name)="data">
                      <b-link
                        :to="{
                          path: '/customer',
                          query: {
                            customerID: data.item.corporateIdentificationNumber,
                          },
                        }"
                        >{{ data.item.name }}</b-link
                      >
                    </template>
                  </b-table>
                  <b-pagination
                    size="md"
                    v-model="pagination.productGroups.currentPage"
                    :total-rows="pagination.productGroups.totalItems"
                    :per-page="pagination.productGroups.perPage"
                  ></b-pagination>
                </div>
              </b-tab>
              <b-tab title="Time Entries">
                <div>
                  <paginated-table
                    :url="ticketsUrl"
                    :fields="fields.tickets"
                    :results="10"
                    :sortColumn="'ticketId'"
                    :sortDirection="'DESC'"
                  ></paginated-table>
                </div>
              </b-tab>
            </b-tabs>
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

//It's necessary to use the utc plugin to account for yearly changes from CET to CEST.
import utc from 'dayjs/plugin/utc'
import SubscriptionsTab from '../components/Administration/SubscriptionsTab.vue'
import PaginatedTable from '../components/PaginatedTable'

dayjs.extend(duration)
dayjs.extend(utc)

export default {
  components: { SubscriptionsTab, PaginatedTable },
  data() {
    return {
      ticketsUrl: `${process.env.VUE_APP_URL}tickets`,
      items: {
        products: [],
        productGroups: [],
        tickets: [],
      },
      fields: {
        products: [
          {
            key: 'productNumber',
            label: 'Product Number',
          },
          {
            key: 'name',
            label: 'Product Name',
          },
          {
            key: 'productGroup.name',
            label: 'Product Group',
          },
          {
            key: 'salesPrice',
            label: 'Cost',
          },
          {
            key: '',
            label: 'Options',
          },
        ],
        productGroups: [
          {
            key: 'productGroupNumber',
            label: 'Product Group Number',
          },
          {
            key: 'name',
            label: 'Product Name',
          },
          {
            key: 'productGroup.name',
            label: 'Product Group',
          },
          {
            key: 'salesPrice',
            label: 'Cost',
          },
          {
            key: '',
            label: 'Options',
          },
        ],
        tickets: [
          {
            key: 'ticketID',
            label: 'Ticket ID',
          },
          {
            key: 'TicketTitle',
            label: 'Ticket Name',
          },
          {
            key: 'totalTime',
          },
        ],
      },
      pagination: {
        products: {
          currentPage: 1,
          perPage: 10,
          totalItems: 0,
        },
        productGroups: {
          currentPage: 1,
          perPage: 10,
          totalItems: 0,
        },
        tickets: {
          currentPage: 1,
          perPage: 10,
          totalItems: 0,
        },
      },
    }
  },
  created() {
    this.loadProducts()
    this.loadProductGroups()
    // this.loadTickets()
  },
  methods: {
    fetchData(endpoint) {
      return axios.get(process.env.VUE_APP_URL + endpoint)
    },
    loadProducts() {
      this.fetchData(
        `products/${this.pagination.products.currentPage}/${this.pagination.products.perPage}`
      ).then((result) => {
        this.pagination.products.totalItems =
          result.data.products.pagination.results
        this.items.products = result.data.products.collection
      })
    },
    loadProductGroups() {
      this.fetchData(
        `productGroups/${this.pagination.productGroups.currentPage}/${this.pagination.productGroups.perPage}`
      ).then((result) => {
        this.pagination.productGroups.totalItems =
          result.data.productGroups.pagination.results
        this.items.productGroups = result.data.productGroups.collection
      })
    },
    loadTickets() {
      this.fetchData(`tickets`, {
        params: {
          page: this.pagination.tickets.page,
          results: this.pagination.tickets.perPage,
        },
      }).then((result) => {
        this.pagination.tickets.totalItems = result.data.tickets.totalItemCount
        this.items.tickets = result.data.tickets.items
      })
    },
  },
  computed: {
    productsCurrentPage: function () {
      return this.pagination.products.currentPage
    },
    productGroupsCurrentPage: function () {
      return this.pagination.productGroups.currentPage
    },
    ticketsCurrentPage: function () {
      return this.pagination.tickets.currentPage
    },
  },
  watch: {
    productsCurrentPage() {
      console.log(this.pagination.products.currentPage)
      this.loadProducts()
    },
    productGroupsCurrentPage() {
      console.log(this.pagination.productGroups.currentPage)
      this.loadProductGroups()
    },
    ticketsCurrentPage() {
      console.log(this.pagination.tickets.currentPage)
      this.loadTickets()
    },
  },
  filters: {
    timeEntryTotal: function (value) {
      //Taking the total minutes and total seconds from each ticket.
      var time = dayjs.duration({ seconds: value.TotalDurationSeconds })

      //Returning the formatted time object as milliseconds formatted at HH:mm:ss in the table.
      return dayjs.utc(time.asMilliseconds()).format('HH:mm:ss')
    },
  },
}

//TODO: Add selection for how many products to show
//TODO: Add a dropdown for the time entries where the user can get more detailed information about time spent on the ticket.
//This is necessary due to limitations in the Atera API that you need to use a specific Ticket ID to get all of the specific time entries as opposed to just them
//when you get each ticket. We can't be making an API call for every single ticket as they're loaded in, as that's both slow and would result in filling up the
//calls per minute immediately, which would break site functionality for a full minute.
</script>

<style>
</style>
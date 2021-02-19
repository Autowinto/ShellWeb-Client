<template>
  <div class="container-fluid">
    <h3 class="text-dark mb-4">Tickets</h3>
    <b-card no-body header="Tickets">
      <div class="card-body">
        <paginated-table
          :url="url"
          :results="10"
          :fields="fields"
          :sortColumn="'ticketId'"
          :sortDirection="'DESC'"
        ></paginated-table>
        <div class="row">
          <button
            onclick="window.location.href = 'customerform.html';"
            class="btn btn-primary ml-2 btn-sm"
          >
            Add Customer
          </button>
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
import PaginatedTable from '../PaginatedTable'

export default {
  components: {
    PaginatedTable,
  },
  data() {
    return {
      url: `${process.env.VUE_APP_URL}tickets`,
      fields: [
        {
          key: 'customerName',
          sortable: true,
        },
        {
          key: 'ticketId',
          label: 'Ticket ID',
          sortable: true,
        },
        {
          key: 'subject',
          label: 'Name',
          sortable: true,
          typeOptions: {
            type: 'link',
            path: 'ticket',
            idName: 'ticketId',
            linkText: 'subject',
          },
        },
      ],
    }
  },
}
</script>
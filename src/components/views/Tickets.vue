<template>
  <div class="container-fluid">
    <h3 class="text-dark mb-4">Tickets</h3>
    <div class="card shadow">
      <div class="card-header py-3">
        <p class="text-primary m-0 font-weight-bold">Tickets</p>
      </div>
      <div class="card-body">
        <!-- <div class="row"> -->
        <!-- <div class="col-md-12">
            <div class="text-md-right dataTables_filter" id="dataTable_filter">
              <label>
                <input
                  type="search"
                  class="form-control form-control-sm"
                  aria-controls="dataTable"
                  placeholder="Search"
                />
              </label>
            </div>
          </div> -->
        <!-- </div> -->
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
    </div>
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
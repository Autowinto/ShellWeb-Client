<template>
  <div class="container-fluid">
    <h3 class="text-dark mb-4">Customers</h3>
    <div class="card shadow">
      <div class="card-header py-3">
        <p class="text-primary m-0 font-weight-bold">Customers Info</p>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-6 text-nowrap">
            <div id="dataTable_length" class="dataTables_length" aria-controls="dataTable">
              <label>
                Show&nbsp;
                <b-form-select v-model="perPage" :options='paginationOptions'></b-form-select>
              </label>
            </div>
          </div>
          <div class="col-md-6">
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
          </div>
        </div>
        <div>
          <b-table
            show-empty
            outlined
            hover
            :items="items"
            :fields="fields"
            :per-page="0"
            :current-page="currentPage"
          >
            <template v-slot:cell(name)="data">
              <b-link
                :to="{ path: '/customer', query: {customerID: data.item.corporateIdentificationNumber}}"
              >{{ data.item.name }}</b-link>
            </template>
          </b-table>
          <b-pagination
            size="md"
            v-model="currentPage"
            :total-rows="totalItems"
            :per-page="perPage"
          ></b-pagination>
        </div>
        <div class="row">
          <button
            onclick="window.location.href = 'customerform.html';"
            
            class="btn btn-primary ml-2 btn-sm"
          >Add Customer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      fields: [
        {
          key: "corporateIdentificationNumber",
          label: "Customer ID"
        },
        {
          key: "name",
          label: "Name"
        }
      ],
      items: [],
      currentPage: 1,
      perPage: 10,
      totalItems: 0,
      paginationOptions: [
        { value: 10, text: '10' },
        { value: 25, text: '25' },
        { value: 50, text: '50' }
      ]
    }
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      axios
        .get('http://localhost:8081/customers/' + this.currentPage + '/' + this.perPage)
        .then(response => {
          const data = response.data.customers;
          console.log(data)
          this.items = data.collection;
          this.currentPage = parseInt(data.pagination.skipPages) + 1;
          this.totalItems = data.pagination.results;
          this.perPage = data.pagination.pageSize;
        })
        .catch(err => {
          console.error(err);
        });
    }
  },
  watch: {
    currentPage: {
      handler: function() {
        this.fetchData(); //Do error handling here in the future
      }
    },
    perPage: {
      handler: function() {
        this.fetchData();
      }
    }
  }
};
</script>
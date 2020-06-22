<template>
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
                :to="{ path: '/' , query: {customerID: data.item.corporateIdentificationNumber}}"
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
</template>

<script>
//WARNING. DON'T USE THIS.
//It doesn't make sense to abstract this much. At least in the prototyping stage.
//I'm keeping this file in-case it becomes relevant for quick setup of other tables in the future.

import axios from 'axios'

export default {
  props: {
    endpoint: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    dataType: { //This is probably a horrible way of managing state. Perhaps look into using Vuex to store state rather than this.
      type: String,
      required: true
    },
    pageLink: {
      type: String,
      required: true
    },
    fields: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
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
  methods: {
    fetchData() {
      axios
        .get('http://localhost:8081/' + this.endpoint + '/' + this.currentPage + '/' + this.perPage)
        .then(response => {
          if (this.type == 'economic') { //Since the formats of an Atera and an Economic API call are different, we check which type it is based on.
            const data = response.data.customers;

            this.items = data.collection;
            this.currentPage = parseInt(data.pagination.skipPages) + 1;
            this.totalItems = data.pagination.results;
          } else if (this.type == 'atera') {
            const data = response.data
            this.items = data.tickets.items;
            this.currentPage = data.page;
          }
        })
        .catch(err => {
          console.error(err);
        });
      }
    },
  mounted() {
    this.fetchData();
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

}
</script>
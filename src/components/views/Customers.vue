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
                <b-form-select v-model="perPage" :options="paginationOptions"></b-form-select>
              </label>
            </div>
          </div>
          <div class="col-md-6">
            <div class="text-md-right dataTables_filter" id="dataTable_filter">
              <b-button v-b-modal.customerForm size="sm" variant="success">Create Customer</b-button>
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
      </div>
    </div>
    <b-modal
      body-class="p-0"
      id="customerForm"
      ref="customerFormModal"
      centered
      title="Create Customer"
      hide-footer
      size="lg"
    >
      <b-card bg-variant="light" body-class="p-0">
        <b-collapse class="p-0 m-0" v-model="showError">
          <b-card class="p-0 m-0" bg-variant="danger">
            <h3 style="color: white;">A customer with that business number already exists.</h3>
          </b-card>
        </b-collapse>
        <b-form @submit="submitCustomer" onSubmit="return false;" class="p-3">
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
              <b-input placeholder="Company Name" v-model="form.name" id="input-name" type="text" required></b-input>
            </b-form-group>
            <b-form-group
              label-cols-sm="3"
              label="BN/CVR:"
              label-align-sm="right"
              label-for="input-cvr"
              description="Required"
            >
              <b-input id="input-cvr" max="999999999" type="number"  v-model="form.businessNumber" placeholder="12345678" required></b-input>
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
              <b-form-select id="input-group" v-model="form.selectedGroup" :options="dropdownData.customerGroups" required></b-form-select>
            </b-form-group>
            <b-form-group
              label-cols-sm="3"
              label="Currency:"
              label-align-sm="right"
              label-for="input-currency"
              description="Required"
            >
              <b-form-select id="input-currency" required v-model="form.selectedCurrency" :options="dropdownData.currencies"></b-form-select>
            </b-form-group>
            <b-form-group
              label-cols-sm="3"
              label="Payment Terms:"
              label-align-sm="right"
              label-for="input-terms"
              description="Required"
            >
              <b-form-select id="input-terms" required v-model="form.selectedPaymentTerms" :options="dropdownData.paymentTerms"></b-form-select>
            </b-form-group>
            <b-form-group
              label-cols-sm="3"
              label="VAT Zone:"
              label-align-sm="right"
              label-for="input-vat"
              description="Required"
            >
              <b-form-select id="input-vat" required v-model="form.selectedVatZone" :options="dropdownData.vatZones"></b-form-select>
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
            <b-button type="submit" variant="primary">Create</b-button>
            <!-- <b-button type="reset" variant="danger">Reset</b-button> -->
          </b-button-group>
        </b-form>
      </b-card>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      showError: false,
      dropdownData: {
        paymentTerms: [],
        customerGroups: [],
        currencies: [],
        vatZones: [],

      },
      form: {
        name: null,
        businessNumber: 0,
        domain: null,
        country: null,
        city: null,
        address: null,
        zip: null,
        phone: null,
        selectedPaymentTerms: null,
        selectedGroup: null,
        selectedCurrency: null,
        selectedVatZone: null,
      },
      fields: [
        {
          key: "corporateIdentificationNumber",
          label: "Customer ID",
        },
        {
          key: "name",
          label: "Name",
        },
      ],
      items: [],
      currentPage: 1,
      perPage: 10,
      totalItems: 0,
      paginationOptions: [
        { value: 10, text: "10" },
        { value: 25, text: "25" },
        { value: 50, text: "50" },
      ],
    };
  },
  created() {
    this.fetchData();


    //Collect these calls in one axios.all call
    axios.get(`${process.env.VUE_APP_URL}customerGroups`)
      .then(response => {
        for (var item in response.data.customerGroups) {
          console.log(item)
          const group = response.data.customerGroups[item];
          this.dropdownData.customerGroups.push(
            {
              value: group.customerGroupNumber, text: group.name
            })
        }
      })
    axios.get(`${process.env.VUE_APP_URL}currencies`)
      .then(response => {
        for (var item in response.data.currencies) {
          const currency = response.data.currencies[item];
          this.dropdownData.currencies.push(
            {
              value: currency.code, text: currency.name
            })
        }
      })
    axios.get(`${process.env.VUE_APP_URL}paymentTerms`)
      .then(response => {
        for (var item in response.data.paymentTerms) {
          const term = response.data.paymentTerms[item];
          this.dropdownData.paymentTerms.push(
            {
              value: term.paymentTermsNumber, text: term.name
            })
        }
      })
    axios.get(`${process.env.VUE_APP_URL}vatZones`)
      .then(response => {
        for (var item in response.data.vatZones) {
          const vatZone = response.data.vatZones[item];
          this.dropdownData.vatZones.push(
            {
              value: vatZone.vatZoneNumber, text: vatZone.name
            })
        }
      })
  },
  methods: {
    fetchData() {
      axios
        .get(
          process.env.VUE_APP_URL +
            "customers/" +
            this.currentPage +
            "/" +
            this.perPage
        )
        .then((response) => {
          const data = response.data.customers;
          this.items = data.collection;
          this.currentPage = parseInt(data.pagination.skipPages) + 1;
          this.totalItems = data.pagination.results;
          this.perPage = data.pagination.pageSize;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    submitCustomer() {
      console.log("Submitting logic here");
      axios.post(`${process.env.VUE_APP_URL}customer`, this.form)
      .then(response => {
        console.log(response)
          //Refresh table of customers
          this.$refs['customerFormModal'].hide()
          this.fetchData();
      })
      .catch(error => {
        console.log(error)
        if (error.response.status === 409) { //Code 409 is the code for duplicate resource
          console.log('test')
          this.showError = true
          this.scrollToModalTop()
        }
      })
    },
    scrollToModalTop() {
      var modal = document.getElementById('customerForm')
      modal.scrollTo({ top: 0, left: 0, behavior: 'smooth'});
    }
  },
  watch: {
    currentPage: {
      handler: function () {
        this.fetchData(); //Do error handling here in the future
      },
    },
    perPage: {
      handler: function () {
        this.fetchData();
      },
    },
  },
};
</script>

<style lang="css">
.form-row {
  color: black;
}
</style>
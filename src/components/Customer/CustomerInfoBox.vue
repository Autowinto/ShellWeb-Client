<template>
  <div>
    <b-card no-body>
      <b-card-header>
        <b-row align-v="center">
          <b-col>
            <h6 v-if="customer.name" class="mb-0">
              {{ customer.name }} ({{ customer.customerNumber }})
            </h6>
            <b-skeleton width="100%" v-else></b-skeleton>
          </b-col> </b-row
      ></b-card-header>
      <b-card-body>
        <div class="row">
          <div class="col">
            <div class="mb-3">
              <h4 class="small font-weight-bold">Name</h4>
              <h4 class="small" v-if="customer.name">
                {{ customer.name }}
              </h4>
              <h4 v-else class="small">N/A</h4>
            </div>
            <div class="mb-3">
              <h4 class="small font-weight-bold">Currency</h4>
              <h4 class="small">
                {{ customer.currency }}
              </h4>
            </div>
            <div class="mb-3">
              <h4 class="small font-weight-bold">Sales Person</h4>
              <h4 v-if="customer.employee" class="small">
                {{ customer.employeeName }}
              </h4>
              <h4 v-else class="small">N/A</h4>
            </div>
            <div class="mb-3">
              <h4 class="small font-weight-bold">Invoice Tickets as Single</h4>
              <h4 v-if="customer.invoiceSingleTickets" class="small">
                {{ customer.invoiceSingleTickets }}
              </h4>
              <h4 v-else class="small">N/A</h4>
            </div>
          </div>
          <div class="col">
            <div class="mb-3">
              <h4 class="small font-weight-bold">Customer Group</h4>
              <h4 class="small">{{ customer.customerGroupName }}</h4>
            </div>
            <div class="mb-3">
              <h4 class="small font-weight-bold">Payment Terms</h4>
              <h4 class="small">{{ customer.paymentTermsName }}</h4>
            </div>
            <div class="mb-3">
              <h4 class="small font-weight-bold">Invoicing Frequency</h4>
              <h4 v-if="customer.invoiceFrequencyName" class="small">
                {{ customer.invoiceFrequencyName }}
              </h4>
              <h4 v-else class="small">N/A</h4>
            </div>
          </div>
        </div>
        <div class="card mb-3"></div>
        <div class="row">
          <div class="col">
            <div class="mb-3">
              <h4 class="small font-weight-bold">Phone Number</h4>
              <b-link
                v-if="customer.telephoneAndFaxNumber"
                class="small"
                :href="'tel:' + customer.telephoneAndFaxNumber"
                >{{ customer.telephoneAndFaxNumber }}</b-link
              >
              <h4 v-else class="small">N/A</h4>
            </div>
          </div>
          <div class="col">
            <div class="mb-3">
              <h4 class="small font-weight-bold">E-mail</h4>
              <b-link
                v-if="customer.telephoneAndFaxNumber"
                class="small"
                :href="'mailto:' + customer.email"
                >{{ customer.email }}</b-link
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
                {{ customer.address }}
              </h4>
            </div>
            <div class="mb-3">
              <h4 class="small font-weight-bold">ZIP Code</h4>
              <h4 class="small">{{ customer.zip }}</h4>
            </div>
          </div>
          <div class="col">
            <div class="mb-3">
              <h4 class="small font-weight-bold">City</h4>
              <h4 class="small">{{ customer.city }}</h4>
            </div>
            <div class="mb-3">
              <h4 class="small font-weight-bold">Country</h4>
              <h4 class="small">
                {{ customer.country }}
              </h4>
            </div>
          </div>
        </div>
        <div class="card shadow mb-2"></div>
        <div class="row mb-2">
          <div class="col">
            <button
              class="btn btn-sm btn-primary w-100"
              v-b-modal.customerEditModal
            >
              Edit Customer
            </button>
          </div>
        </div>
      </b-card-body>
    </b-card>
    <!-- <modal-form
      modalId="customerEditModal"
      :submitUrl="customerEditUrl"
    ></modal-form> -->
  </div>
</template>

<script lang="ts">
// import ModalForm from '../ModalForm'
import { ref } from '@vue/composition-api'
export default {
  props: {
    customer: {
      required: true,
      type: Object,
    },
  },
  setup(props) {
    // const data = props.customerData
    let editForm = ref({})

    function initializeForm() {
      editForm.value = props.customerData
    }
    return { editForm, initializeForm }
  },
  components: {
    // ModalForm,
  },
}
</script>
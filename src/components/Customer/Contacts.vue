<template>
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
            <label>Driving ({{ customerInfo.economic.currency }}):</label>
            <b-form-input
              type="number"
              v-model="items.contractRates.drivingRate"
            ></b-form-input>
          </div>
          <div role="group" class="mx-auto py-0">
            <label>Support ({{ customerInfo.economic.currency }}):</label>
            <b-form-input
              type="number"
              v-model="items.contractRates.supportRate"
            ></b-form-input>
          </div>
          <div role="group" class="mx-auto py-0">
            <label>Consultant ({{ customerInfo.economic.currency }}):</label>
            <b-form-input
              type="number"
              v-model="items.contractRates.consultantRate"
            ></b-form-input>
          </div>
          <b-button type="submit" variant="success" class="mx-auto"
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
                  <i class="fa rel fa-bookmark" style="font-size: 30px"></i>
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
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default {
  setup() {},
}
</script>

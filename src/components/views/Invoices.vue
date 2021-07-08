<template>
  <div id="wrapper">
    <b-container fluid>
      <b-card no-body>
        <b-tabs small card>
          <draft-invoices-tab></draft-invoices-tab>
          <booked-invoices-tab></booked-invoices-tab>
        </b-tabs>
      </b-card>
    </b-container>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from '@vue/composition-api'
  import DraftInvoicesTab from '../Invoices/DraftInvoicesTab.vue'
  import BookedInvoicesTab from '../Invoices/BookedInvoicesTab.vue'
  export default defineComponent({
    components: {
      DraftInvoicesTab,
      BookedInvoicesTab,
    },
  })
</script>

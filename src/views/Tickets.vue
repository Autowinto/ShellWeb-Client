<template>
  <div id="wrapper">
    <div class="p-d-flex">
      <p-card></p-card>
      <p-panel>
        <template #header> Tickets </template>
        <paginated-table
          ref="ticketTable"
          :url="url"
          :results="10"
          :fields="fields"
          :sortColumn="'ticketId'"
          :sortDirection="'DESC'"
        ></paginated-table>
      </p-panel>
    </div>
  </div>
  <!-- <div id="tickets-wrapper">
    <div class="container-fluid">
      <h3 class="text-dark mb-4">Tickets</h3>
      <b-card header="Tickets">
        <b-card bg-variant="light" class="mb-3">
          <b-btn
            variant="success"
            class="float-right"
            v-b-modal.ticket-creation-modal
            >Create Ticket</b-btn
          >
        </b-card>
        <paginated-table
          ref="ticketTable"
          :url="url"
          :results="10"
          :fields="fields"
          :sortColumn="'ticketId'"
          :sortDirection="'DESC'"
        ></paginated-table>
      </b-card>
    </div>
    <modal-form
      modalTitle="Create Ticket"
      modalId="ticket-creation-modal"
      :submitUrl="url"
      :fields="formFields"
      @submitted="handleTicketPosted"
      windowSize="lg"
      fieldSize="sm"
    ></modal-form>
  </div> -->
</template>

<script>
// import ModalForm from '../components/ModalForm'

import PaginatedTable from '../components/PaginatedTable.vue'

export default {
  components: {
    PaginatedTable,
    // ModalForm,
  },
  methods: {
    handleTicketPosted() {
      this.$refs.ticketTable.loadData()
    },
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
      formFields: [
        {
          key: 'customerId',
          label: 'Customer',
          textKeys: ['name'],
          type: 'lookup',
          lookupEndpoint: 'customers',
          placeholder: 'None picked. All contacts will be shown',
          required: true,
          cols: 6,
        },
        {
          key: 'contactId',
          parentKey: 'customerId',
          filterKey: 'customer',
          label: 'Contact',
          textKeys: ['firstName', 'lastName'],
          type: 'lookup',
          lookupEndpoint: 'contacts',
          required: true,
          cols: 6,
        },
        {
          key: 'title',
          type: 'string',
          label: 'Ticket Title',
          required: true,
          cols: 12,
        },
        {
          key: 'description',
          type: 'text',
          label: 'Description',
          required: true,
          cols: 12,
        },
        {
          key: 'impact',
          type: 'select',
          options: [
            {
              text: 'No Impact',
              value: 'NoImpact',
            },
            {
              text: 'Minor',
              value: 'Minor',
            },
            {
              text: 'Major',
              value: 'Major',
            },
            {
              text: 'Site Down',
              value: 'NoImpact',
            },
            {
              text: 'Server Issue',
              value: 'ServerIssue',
            },
            {
              text: 'Crisis',
              value: 'Crisis',
            },
          ],
          required: true,
          label: 'Ticket Impact',
          cols: 6,
        },
        {
          key: 'type',
          type: 'select',
          options: [
            {
              text: 'Incident',
              value: 'Incident',
            },
            {
              text: 'Problem',
              value: 'Problem',
            },
            {
              text: 'Request',
              value: 'Request',
            },
            {
              text: 'Change',
              value: 'Change',
            },
          ],
          required: true,
          label: 'Ticket Type',
          cols: 6,
        },
        {
          key: 'isProject',
          label: 'Project',
          type: 'boolean',
          triggersKey: 'fixedPrice',
          checkText: 'Is this ticket a project e.g a fixed price?',
          cols: 6,
        },
        {
          key: 'fixedPrice',
          label: 'Fixed Price',
          type: 'double',
          show: false,
          cols: 6,
        },
      ],
    }
  },
}
</script>
<template>
  <div id="tickets-wrapper">
    <div class="container-fluid">
      <b-card no-body>
        <b-card-header>
          <b-row align-v="center">
            <b-col>
              <h6 class="mb-0">Tickets</h6>
            </b-col>
            <b-col>
              <div class="text-md-right">
                <b-button
                  size="sm"
                  v-b-modal.ticket-creation-modal
                  variant="primary"
                  >Create Ticket</b-button
                >
              </div>
            </b-col>
          </b-row>
        </b-card-header>
        <b-card-body>
          <paginated-table
            ref="ticketTable"
            :url="url"
            :results="10"
            :fields="fields"
            searchableColumn="name"
            searchPrompt="Search here for ticket ID or name"
            :sortColumn="'ticketId'"
            :sortDirection="'DESC'"
          ></paginated-table>
        </b-card-body>
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
  </div>
</template>

<script>
  import Vue from 'vue'
  import PaginatedTable from '../PaginatedTable'
  import ModalForm from '../ModalForm'

  export default Vue.extend({
    components: {
      PaginatedTable,
      ModalForm,
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
            key: 'ticketId',
            label: 'Ticket ID',
            sortable: true,
          },
          {
            key: 'customerName',
            label: 'Customer',
            sortable: true,
          },
          {
            key: 'subject',
            label: 'Subject',
            sortable: true,
            typeOptions: {
              type: 'link',
              path: 'ticket',
              idName: 'ticketId',
              linkText: 'subject',
            },
          },
          {
            key: 'createdDate',
            label: 'Created',
            sortable: true,
            type: 'date',
          },
          {
            key: 'modifiedDate',
            label: 'Updated',
            sortable: true,
            type: 'date',
          },
          {
            key: 'replyStatus',
            sortable: true,
          },
          {
            key: 'status',
            sortable: true,
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
  })
</script>

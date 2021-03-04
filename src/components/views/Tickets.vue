<template>
  <div id="tickets-wrapper">
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
    ></modal-form>
  </div>
</template>

<script>
import PaginatedTable from '../PaginatedTable'
import ModalForm from '../ModalForm'

export default {
  components: {
    PaginatedTable,
    ModalForm,
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
        },
        {
          key: 'title',
          type: 'string',
          label: 'Title',
          required: true,
        },
        {
          key: 'description',
          type: 'text',
          label: 'Description',
        },
        {
          key: 'isProject',
          label: 'Project',
          type: 'boolean',
          triggersKey: 'fixedPrice',
          checkText: 'Is this ticket a project?',
        },
        {
          key: 'fixedPrice',
          label: 'Fixed Price',
          type: 'number',
          show: false,
        },
      ],
    }
  },
}
</script>
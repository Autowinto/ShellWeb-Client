<template>
  <div id="wrapper" class="h-100">
    <b-card class="w-100">
      <b-row>
        <b-col cols="11">
          <b-link
            :to="`/contact?contactid=${contact.contactId}`"
            class="font-weight-bold"
            style="color: black"
          >
            {{ fullName }}
          </b-link>
        </b-col>
        <b-col cols="1" class="p-0"
          ><b-img
            v-b-tooltip.hover
            title="Synced with Azure"
            v-if="contact.o365Id"
            style="max-width: 20px"
            fluid
            src="https://iconape.com/wp-content/files/xu/352710/svg/azure-active-directory-seeklogo.com.svg"
        /></b-col>
        <b-col v-if="contact.jobTitle && contact.jobTitle != 'null'" cols="12"
          ><p small>{{ contact.jobTitle }}</p></b-col
        >
        <b-col v-if="contact.email && contact.email != 'null'" cols="12">
          <b-link small :href="`mailto:${contact.email}`">
            <b-icon icon="at"></b-icon>

            {{ contact.email }}
          </b-link>
        </b-col>
        <b-col v-if="contact.phones && contact.phones.length" cols="12">
          <b-link small :href="`tel:${contact.phones[0].phone}`">
            <b-icon icon="telephone"></b-icon>

            {{ contact.phones[0].phone }}
          </b-link>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, PropType } from '@vue/composition-api'
  import { Contact } from './contacts.interfaces'

  export default defineComponent({
    props: {
      contact: {
        required: true,
        type: Object as PropType<Contact>,
      },
    },
    setup(props) {
      const fullName = computed(
        () => props.contact.firstName + ' ' + props.contact.lastName
      )
      return { fullName }
    },
  })
</script>

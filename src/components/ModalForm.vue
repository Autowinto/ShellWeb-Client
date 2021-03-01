<template>
  <div id="wrapper">
    <b-modal
      size="lg"
      centered
      :ref="this.modalId"
      :id="this.modalId"
      :title="this.modalTitle"
      hide-footer
    >
      <b-alert fade dismissible variant="danger"> </b-alert>
      <b-form onsubmit="return false;" @submit="doPost" class="w-100">
        <b-form-group v-for="field in fields" :key="field.key">
          <label v-if="field.label">{{ field.label }}</label>
          <div id="input-string" v-if="field.type == 'string'">
            <b-input v-model="form[field.key]"></b-input>
          </div>
          <div id="input-text" v-if="field.type == 'text'">
            <b-textarea v-model="form[field.key]"></b-textarea>
          </div>
          <div id="input-lookup" v-if="field.type == 'lookup'">
            <lookup-select
              @selected="lookupValueSelected($event, field.key)"
              :lookupUrl="`${baseUrl}/${field.lookupEndpoint}`"
              :textKeys="field.textKeys"
            ></lookup-select>
          </div>
          <small v-if="field.required">Required</small>
        </b-form-group>
        <b-container fluid class="p-0">
          <b-btn type="submit" variant="primary" class="mr-1">Submit</b-btn>
          <b-btn @click="cancelForm" variant="danger">Cancel</b-btn>
        </b-container>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import LookupSelect from './LookupSelect'
import { ref, getCurrentInstance } from '@vue/composition-api'
import axios from 'axios'

export default {
  components: {
    LookupSelect,
  },
  props: {
    submitUrl: {
      type: String,
      required: true,
    },
    fields: {
      type: Array,
      required: true,
    },
    modalTitle: String,
    modalId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const instance = getCurrentInstance()

    let baseUrl = `${process.env.VUE_APP_URL}lookups`
    let form = ref({})
    let errorMessage = ref('An error occurred')

    function doPost() {
      axios
        .post(props.submitUrl, this.form)
        .then(() => {
          handleResponse()
        })
        .catch((error) => {
          handleError(error)
        })
    }

    function handleResponse() {
      instance.$refs[props.modalId].hide()
      form = ref({})
    }

    function handleError(error) {
      console.error(error)
    }

    function cancelForm() {
      console.log('Cancelling')
    }

    function lookupValueSelected(event, key) {
      this.form[key] = event[key]
      console.log(this.form)
    }

    return {
      form,
      baseUrl,
      errorMessage,
      doPost,
      cancelForm,
      lookupValueSelected,
    }
  },
}
</script>
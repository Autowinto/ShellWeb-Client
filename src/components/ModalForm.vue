<template>
  <div id="wrapper">
    <b-modal
      size="md"
      centered
      :ref="this.modalId"
      :id="this.modalId"
      :title="this.modalTitle"
      hide-footer
      @hidden="cancelForm"
    >
      <b-alert :show="showErrorAlert" fade dismissible variant="danger">
        Failed to submit item. Error code: {{ errorCode }}.
      </b-alert>
      <b-form onsubmit="return false;" @submit="doPost" class="w-100">
        <b-form-group v-for="field in fields" :key="field.key">
          <div v-if="field.show">
            <label v-if="field.label">{{ field.label }}</label>
            <div id="input-string" v-if="field.type == 'string'">
              <b-input
                :required="field.required"
                type="text"
                v-model="form[field.key]"
              ></b-input>
            </div>
            <div id="input-string" v-if="field.type == 'number'">
              <b-input
                type="number"
                step="0.01"
                v-model="form[field.key]"
              ></b-input>
            </div>
            <div id="input-text" v-if="field.type == 'text'">
              <b-textarea
                :required="field.required"
                v-model="form[field.key]"
              ></b-textarea>
            </div>
            <div id="input-lookup" v-if="field.type == 'lookup'">
              <lookup-select
                @selected="lookupValueSelected($event, field.key)"
                :lookupUrl="`${baseUrl}/${field.lookupEndpoint}`"
                :textKeys="field.textKeys"
                :required="Boolean(field.required)"
                :parentKey="field.parentKey"
                :filterKey="field.filterKey"
                :placeholder="field.placeholder"
                :form="form"
              ></lookup-select>
            </div>
            <div v-if="field.type == 'boolean'">
              <b-checkbox
                @change="handleCheckboxChange(field)"
                v-model="form[field.key]"
                size="md"
                >{{ field.checkText }}</b-checkbox
              >
            </div>
            <div v-if="field.type == 'select'">
              <b-select
                v-model="form[field.key]"
                :options="field.options"
                :required="field.required"
              ></b-select>
            </div>
            <small v-if="field.required">Required</small>
          </div>
        </b-form-group>
        <b-container fluid class="p-0">
          <b-btn type="submit" variant="success" class="mr-1">Submit</b-btn>
        </b-container>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import LookupSelect from './LookupSelect'
import { ref, set, reactive, getCurrentInstance } from '@vue/composition-api'
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

    for (let field of props.fields) {
      if (field.show == undefined) {
        field.show = true
      }
    }

    let baseUrl = `${process.env.VUE_APP_URL}lookups`
    let form = reactive({})
    let showErrorAlert = ref(false)

    let errorCode = ref(0)

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

    function handleCheckboxChange(field) {
      if (field.triggersKey) {
        let obj = props.fields.find((obj) => obj.key == field.triggersKey)
        form[obj.key] = null
        obj.show = !form[field.key] // A bit hacky, but it's correct
      } else {
        console.log('Nothing triggered')
      }
    }

    function getFieldObjectByKey(key) {
      let obj = props.fields.find((obj) => obj.key == key)
      return obj.key
    }

    function handleResponse() {
      this.$emit('postSuccessful')
      this.$refs[props.modalId].hide()
      form = reactive({})
    }

    function handleError(error) {
      instance.errorCode = error.response.status
      instance.showErrorAlert = true // I don't kn
    }

    function cancelForm() {
      form = reactive({})
      console.log('Cancelling')
    }

    function lookupValueSelected(event, key) {
      set(instance.form, key, event[key])
    }

    return {
      form,
      baseUrl,
      doPost,
      cancelForm,
      lookupValueSelected,
      handleCheckboxChange,
      getFieldObjectByKey,
      errorCode,
      showErrorAlert,
    }
  },
}
</script>
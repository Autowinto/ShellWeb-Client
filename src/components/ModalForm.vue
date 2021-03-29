<template>
  <div id="wrapper">
    <b-modal
      :size="this.windowSize"
      centered
      :ref="this.modalId"
      :id="this.modalId"
      :title="this.modalTitle"
      @hidden="cancelForm"
      body-bg-variant="light"
    >
      <b-alert :show="showErrorAlert" fade dismissible variant="danger">
        <h5>Error(s) received with code: {{ errorCode }}</h5>
        <div v-if="errorCode == 400">
          <div v-for="error in err" :key="error">
            {{ error.param }}: {{ error.msg }}.
          </div>
        </div>
        <div v-else>
          <div>{{ err }}</div>
        </div>
      </b-alert>
      <b-form id="form" onsubmit="return false;" @submit="doPost">
        <b-row>
          <!-- If no collumn size is defined, set it to full size -->
          <b-col
            :cols="field.cols || 6"
            v-for="field in fields"
            :key="field.key"
            class="mb-3"
          >
            <div v-if="field.show">
              <label class="font-weight-bold" v-if="field.label">{{
                field.label
              }}</label>
              <div id="input-string" v-if="field.type == 'string'">
                <b-input
                  :size="field.size || fieldSize"
                  :required="field.required"
                  type="text"
                  v-model="form[field.key]"
                ></b-input>
              </div>
              <div id="input-double" v-if="field.type == 'double'">
                <b-input
                  :size="field.size || fieldSize"
                  type="number"
                  :required="field.required"
                  step="0.01"
                  v-model="form[field.key]"
                ></b-input>
              </div>
              <div id="input-int" v-if="field.type == 'integer'">
                <b-input
                  :size="field.size || fieldSize"
                  :required="field.required"
                  type="number"
                  v-model="form[field.key]"
                ></b-input>
              </div>
              <div id="input-text" v-if="field.type == 'text'">
                <b-textarea
                  :size="field.size || fieldSize"
                  :required="field.required"
                  v-model="form[field.key]"
                ></b-textarea>
              </div>
              <div id="input-lookup" v-if="field.type == 'lookup'">
                <lookup-select
                  :size="field.size || fieldSize"
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
                  @change="handleCheckboxChange($event, field.triggersKey)"
                  v-model="form[field.key]"
                  :size="field.size || fieldSize"
                  >{{ field.checkText }}</b-checkbox
                >
              </div>
              <div v-if="field.type == 'select'">
                <b-select
                  :size="field.size || fieldSize"
                  v-model="form[field.key]"
                  :options="field.options"
                  :required="field.required"
                ></b-select>
              </div>
              <div v-if="field.type == 'date'">
                <b-datepicker
                  :size="field.size || fieldSize"
                  :required="field.required"
                  :v-model="form[field.key]"
                ></b-datepicker>
              </div>
              <small v-if="field.required">Required</small>
            </div>
          </b-col>
          <b-overlay
            :show="processing"
            spinner-small
            rounded="sm"
            class="d-inline-block w-100"
          >
          </b-overlay>
        </b-row>
      </b-form>
      <template #modal-footer>
        <div class="w-100">
          <b-btn form="form" type="submit" class="float-left" variant="success"
            >Submit</b-btn
          >
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import LookupSelect from './LookupSelect'
import { ref, reactive, getCurrentInstance } from '@vue/composition-api'
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
    windowSize: {
      type: String,
      default: 'md',
    },
    fieldSize: {
      type: String,
      default: 'md',
    },
  },
  data() {
    return {
      customerId: this.$route.query.id,
    }
  },
  setup(props, { emit }) {
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
    let err = ref([])

    let processing = ref(false)

    function triggerSubmit() {
      this.$refs.form.submit.click()
    }

    function doPost() {
      if (this.customerId) {
        form.customerId = this.customerId
      }
      processing = true
      axios
        .post(props.submitUrl, form)
        .then(() => {
          emit('submitted')
          this.$refs[props.modalId].hide()
          form = reactive({})
        })
        .catch((error) => {
          handleError(error)
        })
        .finally(() => {
          processing = false
        })
    }

    function handleCheckboxChange(event, key) {
      if (key) {
        let obj = props.fields.find((obj) => obj.key == key)
        obj.show = event
      } else {
        console.log('Nothing triggered')
      }
    }

    function getFieldObjectByKey(key) {
      let obj = props.fields.find((obj) => obj.key == key)
      return obj.key
    }

    function handleError(error) {
      instance.err = error.response.data
      instance.errorCode = error.response.status
      instance.showErrorAlert = true // I don't kn
    }

    function cancelForm() {
      form = reactive({})
    }

    function lookupValueSelected(event, key) {
      form[key] = event[key]
      // set(instance.form, key, event[key])
    }

    return {
      form,
      err,
      processing,
      baseUrl,
      doPost,
      cancelForm,
      lookupValueSelected,
      triggerSubmit,
      handleCheckboxChange,
      getFieldObjectByKey,
      errorCode,
      showErrorAlert,
    }
  },
}
</script>
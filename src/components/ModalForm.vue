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
          <div v-for="(error, idx) in err" :key="idx">{{ error.param }}: {{ error.msg }}.</div>
        </div>
        <div v-else>
          <div>{{ err }}</div>
        </div>
      </b-alert>
      <b-form id="form" onsubmit="return false;" @submit="doSubmit">
        <b-row>
          <!-- If no collumn size is defined, set it to full size -->
          <b-col :cols="field.cols || 6" v-for="field in fields" :key="field.key" class="mb-3">
            <div v-if="field.show">
              <label class="font-weight-bold" v-if="field.label">{{ field.label }}</label>
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
                  @selected="lookupValueSelected($event, field)"
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
                  @change="handleSelectChange($event, field.formOptions)"
                ></b-select>
              </div>
              <div v-if="field.type == 'date'">
                <b-datepicker
                  :size="field.size || fieldSize"
                  :required="field.required"
                  v-model="form[field.key]"
                ></b-datepicker>
              </div>
              <small v-if="field.required">Required</small>
            </div>
          </b-col>
          <b-overlay :show="processing" spinner-small rounded="sm" class="d-inline-block w-100">
          </b-overlay>
        </b-row>
      </b-form>
      <template #modal-footer>
        <div class="w-100">
          <b-btn form="form" type="submit" class="float-left" variant="success">Submit</b-btn>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script lang="ts">
  import LookupSelect from './LookupSelect'
  import { ref, reactive, getCurrentInstance, set, toRefs } from '@vue/composition-api'
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
      submitType: {
        type: String,
        required: false,
        default: 'POST',
      },
      fields: {
        type: Array,
        required: true,
      },
      baseData: {
        type: Object,
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
    setup(props, { emit, root }) {
      const instance = getCurrentInstance()

      let form = reactive({})

      const { baseData } = toRefs(props)

      for (let field of props.fields) {
        if (field.show == undefined) {
          field.show = true
        }
        set(form, field.key, '')
      }
      resetForm()

      function resetForm() {
        if (baseData.value) {
          form = baseData.value
          // for (const { key, value } in Object.entries(baseData.value)) {
          //   set(form, key, value)
          // }
        } else {
          form = reactive({})
        }
      }

      let baseUrl = `${process.env.VUE_APP_URL}lookups`

      let showErrorAlert = ref(false)

      let errorCode = ref(0)
      let err = ref([])

      let processing = ref(false)

      function triggerSubmit() {
        this.$refs.form.submit.click()
      }

      function doSubmit() {
        if (root.$route.query.id) {
          console.log('Aooga')
          set(form, 'customerId', root.$route.query.id)
        }
        console.log(form)
        processing = true
        if (props.submitType == 'POST') {
          axios
            .post(props.submitUrl, form)
            .then(() => {
              emit('submitted')
              this.$refs[props.modalId].hide()
            })
            .catch((error) => {
              handleError(error)
            })
            .finally(() => {
              processing = false
              resetForm()
            })
        } else if (props.submitType == 'PUT') {
          axios
            .put(props.submitUrl, form)
            .then(() => {
              emit('submitted')
              this.$refs[props.modalId].hide()
            })
            .catch((error) => {
              handleError(error)
            })
            .finally(() => {
              processing = false
              resetForm()
            })
        }
      }

      function handleCheckboxChange(event, key) {
        if (key) {
          let obj = props.fields.find((obj) => obj.key == key)
          obj.show = event
        } else {
          console.log('Nothing triggered')
        }
      }

      async function handleSelectChange(event, field) {
        if (field) {
          const response = await axios.get(`${field.baseUrl}/${event}`)
          for (const [key, value] of Object.entries(field.keys)) {
            set(form, key, response.data[value])
          }
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
        resetForm()
      }

      async function lookupValueSelected(event, field) {
        form[field.key] = event[field.key]
        if (field.formOptions) {
          const response = await axios.get(`${field.formOptions.baseUrl}/${event[field.key]}`)
          for (const [key, value] of Object.entries(field.formOptions.keys)) {
            set(form, key, response.data[value])
          }
        }
      }

      return {
        form,
        err,
        processing,
        baseUrl,
        doSubmit,
        cancelForm,
        lookupValueSelected,
        triggerSubmit,
        handleCheckboxChange,
        getFieldObjectByKey,
        errorCode,
        showErrorAlert,
        handleSelectChange,
      }
    },
  }
</script>

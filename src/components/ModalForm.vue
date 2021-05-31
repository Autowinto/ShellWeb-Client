<template>
  <div id="wrapper">
    <b-modal
      hide-footer
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
          <div v-for="(error, idx) in err" :key="idx">
            {{ error.param }}: {{ error.msg }}.
          </div>
        </div>
        <div v-else>
          <div>{{ err }}</div>
        </div>
      </b-alert>
      <dynamic-form
        @submit="doSubmit($event)"
        :fields="fields"
        :fieldSize="fieldSize"
        :windowSize="windowSize"
      ></dynamic-form>
      <b-overlay
        :show="processing"
        spinner-small
        rounded="sm"
        class="d-inline-block w-100"
      >
      </b-overlay>
    </b-modal>
  </div>
</template>

<script lang="ts">
  import {
    ref,
    reactive,
    set,
    toRefs,
    defineComponent,
    PropType,
  } from '@vue/composition-api'
  import axios, { AxiosError } from 'axios'
  import { FormField } from '@/types/Forms.interface'
  import DynamicForm from './Forms/DynamicForm.vue'

  export default defineComponent({
    components: {
      DynamicForm,
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
        type: Array as PropType<FormField[]>,
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
      let form: any = reactive({})

      const { baseData } = toRefs(props)

      for (let field of props.fields) {
        if (field.show == undefined) {
          field.show = true
        }
        set(form, field.key, '')
      }
      resetForm()

      function resetForm() {
        if (baseData && baseData.value) {
          form = baseData.value
          // for (const { key, value } in Object.entries(baseData.value)) {
          //   set(form, key, value)
          // }
        } else {
          form = reactive({})
        }
      }

      let showErrorAlert = ref(false)

      let errorCode = ref(0)
      let err = ref([])

      let processing = ref(false)

      function doSubmit(form: any) {
        if (root.$route.query.id) {
          console.log('Aooga')
          set(form, 'customerId', root.$route.query.id)
        }
        console.log(form)
        processing.value = true

        if (props.submitType == 'POST') {
          axios
            .post(props.submitUrl, form)
            .then(() => {
              emit('submitted')
              root.$bvModal.hide(props.modalId)
            })
            .catch((error: AxiosError) => {
              handleError(error)
            })
            .finally(() => {
              processing.value = false
              resetForm()
            })
        } else if (props.submitType == 'PUT') {
          axios
            .put(props.submitUrl, form)
            .then(() => {
              emit('submitted')
              root.$bvModal.hide(props.modalId)
            })
            .catch((error) => {
              handleError(error)
            })
            .finally(() => {
              processing.value = false
              resetForm()
            })
        }
      }

      function getFieldObjectByKey(key: string) {
        const obj = props.fields.find((obj: FormField) => obj.key == key)
        if (obj) {
          return obj.key
        }
      }

      function handleError(error: AxiosError) {
        if (error.response) {
          err.value = error.response.data
          errorCode.value = error.response.status
          showErrorAlert.value = true // I don't kn
        }
      }

      function cancelForm() {
        resetForm()
      }

      return {
        form,
        err,
        processing,
        doSubmit,
        cancelForm,
        getFieldObjectByKey,
        errorCode,
        showErrorAlert,
      }
    },
  })
</script>

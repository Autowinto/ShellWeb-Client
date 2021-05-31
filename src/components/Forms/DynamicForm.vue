<template>
  <div id="wrapper">
    <slot name="beforeForm"></slot>
    <form onsubmit="return false;" @submit="emitSubmitEvent">
      <b-row>
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
                @selected="lookupValueSelected($event, field)"
                :lookupUrl="`${lookupsBaseUrl}/${field.lookupEndpoint}`"
                :textKeys="field.textKeys"
                :required="field.required"
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
                @change="handleSelectChange($event, field)"
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
      </b-row>
      <b-btn type="submit" size="sm" class="float-left" variant="success"
        >Submit</b-btn
      >
    </form>
    <slot name="afterForm"></slot>
  </div>
</template>

<script lang="ts">
  import LookupSelect from '../LookupSelect.vue'
  import axios from 'axios'

  import {
    defineComponent,
    PropType,
    reactive,
    set,
  } from '@vue/composition-api'
  import { FormField } from '../../types/Forms.interface'

  export default defineComponent({
    components: {
      LookupSelect,
    },
    props: {
      fields: {
        type: Array as PropType<FormField[]>,
        required: true,
      },
      fieldSize: {
        type: String as PropType<string>,
        default: 'sm',
      },
      windowSize: {
        type: String as PropType<string>,
        default: 'md',
      },
    },
    setup(props, { emit }) {
      let form: any = reactive({})

      function initializeForm() {
        for (const field of props.fields) {
          set(form, field.key, undefined)
          if (field.defaultValue) {
            console.log(field.defaultValue)
            set(form, field.key, field.defaultValue)
          }
        }
      }
      initializeForm()

      function emitSubmitEvent() {
        emit('submit', form)
      }

      const lookupsBaseUrl = `${process.env.VUE_APP_URL}lookups`

      async function lookupValueSelected(event: any, field: FormField) {
        form[field.key] = event[field.key]
        if (field.formOptions) {
          const response = await axios.get(
            `${field.formOptions.baseUrl}/${event[field.key]}`
          )
          for (const [key, value] of Object.entries(field.formOptions.keys)) {
            set(form, key, response.data[value])
          }
        }
      }

      function handleCheckboxChange(event: any, key: string) {
        if (key) {
          const obj = props.fields.find((obj) => obj.key == key)
          if (obj) {
            obj.show = event
          }
        } else {
          console.log('Nothing triggered')
        }
      }

      async function handleSelectChange(event: any, field: FormField) {
        if (field.formOptions) {
          const response = await axios.get(
            `${field.formOptions.baseUrl}/${event}`
          )
          for (const [key, value] of Object.entries(field.formOptions.keys)) {
            set(form, key, response.data[value])
          }
        }
      }

      return {
        form,
        emitSubmitEvent,
        lookupsBaseUrl,
        lookupValueSelected,
        handleSelectChange,
        handleCheckboxChange,
      }
    },
  })
</script>

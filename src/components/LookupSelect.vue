<template>
  <div id="wrapper">
    <b-input-group>
      <cool-select
        @search="lookup"
        @select="emitSelected"
        class="w-100"
        :items="options"
        v-model="selected"
        :error-message="errorMessage"
        :succesful="!!(!errorMessage && selected)"
        disable-filtering-by-search
        :size="size"
      >
        <template v-slot:item="{ item }">
          <span v-for="key in textKeys" :key="key.key">{{ item[key] }} </span>
        </template>
        <template v-slot:selection="{ item }">
          <div v-for="key in textKeys" :key="key.key" class="mr-1">
            {{ item[key] }}
          </div>
        </template>
      </cool-select>
    </b-input-group>
  </div>
</template>

<script>
import axios from 'axios'
import { CoolSelect } from 'vue-cool-select'

import 'vue-cool-select/dist/themes/bootstrap.css'
import { ref } from 'vue'

export default {
  setup(props) {
    let options = ref([])
    let selected = ref('')
    let errorMessage = ref(null)

    function lookup(searchTerm) {
      // Only search if one or more characters have been typed to reduce large api calls
      if (searchTerm.length >= 1) {
        axios
          .get(this.lookupUrl, {
            params: {
              query: searchTerm,
            },
          })
          .then((response) => {
            this.options = filterData(response.data)
          })
      }
    }
    function emitSelected() {
      this.$emit('selected', this.selected)
    }

    const form = props.form

    function filterData(data) {
      let filteredData
      if (form[props.parentKey]) {
        filteredData = data.filter(
          (option) => option[props.filterKey] == form[props.parentKey]
        )
      } else {
        filteredData = data
      }
      return filteredData
    }

    return {
      options,
      selected,
      errorMessage,
      lookup,
      emitSelected,
    }
  },
  components: {
    CoolSelect,
  },
  props: {
    lookupUrl: {
      type: String,
      required: true,
    },
    textKeys: {
      type: Array,
      required: true,
    },
    required: {
      type: Boolean,
      required: true,
    },
    size: {
      type: String,
      default: 'md',
    },
    placeholder: String,
    form: Object,
    selectedValues: Array,
    parentKey: String,
    filterKey: String,
  },
}
</script>
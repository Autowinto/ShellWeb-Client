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
      >
        <template slot="item" slot-scope="{ item }">
          <span v-for="key in textKeys" :key="key.key">{{ item[key] }} </span>
        </template>
        <template slot="input" slot-scope="{ item }">
          <span v-for="key in textKeys" :key="key.key">{{ item[key] }} </span>
        </template>
      </cool-select>
    </b-input-group>
  </div>
</template>

<script>
import axios from 'axios'
import { CoolSelect } from 'vue-cool-select'

import 'vue-cool-select/dist/themes/bootstrap.css'
import { ref } from '@vue/composition-api'

export default {
  setup() {
    let options = ref([])
    let selected = ref('')
    let errorMessage = ref(null)

    function lookup(searchTerm) {
      axios
        .get(this.lookupUrl, { params: { searchTerm: searchTerm } })
        .then((response) => {
          this.options = response.data
        })
    }
    function emitSelected() {
      this.$emit('selected', this.selected)
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
  },
}
</script>
<template>
  <b-row>
    <b-col>
      <b-table
        show-empty
        outlined
        hover
        ref="attachmentsTable"
        :items="items"
        :fields="columnFields"
        :current-page="currentPage"
      >
        <template
          v-for="field in editableFields"
          v-slot:[`cell(${field.key})`]="scope"
        >
          <span v-if="!scope.item.editing" :key="field.key">{{
            scope.item[field.key]
          }}</span>
          <b-input
            v-else
            :key="field.key"
            v-model="scope.item[field.key]"
          ></b-input>
        </template>

        <template v-slot:cell(actions)="scope">
          <div v-if="!scope.item.editing">
            <b-btn
              v-if="editable"
              variant="primary"
              class="fas fa-edit mr-1"
              @click="doEdit(scope.item)"
            ></b-btn>
            <b-btn
              v-if="downloadable"
              variant="primary"
              class="fas fa-download mr-1"
              @click="doDownload(scope.item)"
            ></b-btn>
            <b-btn
              v-if="deletable"
              variant="danger"
              class="fas fa-trash-alt"
              @click="doDelete(scope.item)"
            ></b-btn>
          </div>
          <div v-else>
            <b-btn variant="success" @click="sendEdit(scope.item)">Save</b-btn>
          </div>
        </template>

        <!-- <template v-if="editable || downloadable || deletable" v-slot:cell(actions)='item'>
        <b-btn v-if="editable && !item.editing" variant="primary" class="fas fa-edit mr-1" @click="doEdit(item)"></b-btn>
        <b-btn v-if="downloadable && !item.editing" variant="primary" class="fas fa-download mr-1"></b-btn>
        <b-btn v-if="deletable && !item.editing" variant="danger" class="fas fa-trash-alt"></b-btn>
      </template> -->
      </b-table>
      <b-pagination
        size="md"
        v-model="currentPage"
        :total-rows="totalItems"
        :per-page="results"
      >
      </b-pagination>
    </b-col>
  </b-row>
</template>

<script>
import axios from 'axios'
import download from 'downloadjs'

export default {
  props: {
    url: {
      type: String,
      required: true,
    },
    itemUrl: {
      type: String,
    },
    columnFields: {
      type: Array,
      required: false,
    },
    primaryKey: String,
    results: Number,
    editable: Boolean,
    downloadable: Boolean,
    deletable: Boolean,
  },
  data() {
    return {
      currentPage: 1,
      totalItems: 0,
      items: [],
    }
  },
  created() {
    if (
      this.$props.editable ||
      this.$props.downloadable ||
      this.$props.deletable
    ) {
      this.columnFields.push({ key: 'actions' })
    }

    this.loadData()
  },
  computed: {
    editableFields() {
      return this.columnFields.filter((field) => {
        return field.editable === true
      })
    },
  },
  methods: {
    async loadData() {
      let response = await axios.get(this.$props.url, {
        params: {
          page: this.currentPage,
          results: this.results,
        },
      })
      this.items = response.data.data
      this.totalItems = response.data.entryCount
      console.log(this.items)
    },
    doEdit(item) {
      this.$set(item, 'editing', true)
    },
    sendEdit(item) {
      axios
        .put(`${this.itemUrl}/${item[this.$props.primaryKey]}`, item)
        .then(() => {
          this.$set(item, 'editing', false)
        })
    },
    async doDownload(item) {
      let file = await axios.get(
        `${this.itemUrl}/${item[this.$props.primaryKey]}`
      )

      download(
        `data:${item.fileType};base64,${file.data}`,
        item.fileName,
        item.fileType
      ) //FIXME: REWRITE THIS FOR MODULARITY
    },
    doDelete(item) {
      axios
        .delete(`${this.itemUrl}/${item[this.$props.primaryKey]}`)
        .then(() => {
          this.loadData()
        })
    },
  },
  watch: {
    currentPage() {
      this.loadData()
    },
  },
}
</script>
<template>
  <b-row>
    <b-col>
      <b-table
        show-empty
        outlined
        hover
        ref="table"
        no-local-sorting
        @sort-changed="sort"
        :items="items"
        :fields="fields"
        :current-page="currentPage"
      >
        <template v-for="field in fields" v-slot:[`cell(${field.key})`]="scope">
          <div :key="field.key" v-if="field.type == undefined">
            <span v-if="!scope.item.editing">{{ scope.item[field.key] }}</span>
            <b-input
              v-else
              :key="field.key"
              v-model="scope.item[field.key]"
            ></b-input>
          </div>
          <div :key="field.key" v-else-if="field.type == 'link'">
            <b-link
              :to="{
                path: field.path,
                query: {
                  id: scope.item[field.idName],
                },
              }"
              >{{ scope.item.name }}</b-link
            >
          </div>
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
    fields: {
      type: Array,
      required: false,
    },
    primaryKey: String,
    results: Number,
    sortable: Boolean,
    editable: Boolean,
    downloadable: Boolean,
    deletable: Boolean,
  },
  data() {
    return {
      items: this.items,
      currentPage: 1,
      totalItems: 0,

      sortColumn: null,
      sortDirection: 'ASC',
    }
  },
  created() {
    if (
      this.$props.editable ||
      this.$props.downloadable ||
      this.$props.deletable
    ) {
      this.fields.push({ key: 'actions' })
    }

    this.loadData()
  },
  computed: {
    editableFields() {
      return this.fields.filter((field) => {
        return field.editable === true
      })
    },
  },
  methods: {
    async loadData() {
      try {
        let response = await axios.get(this.$props.url, {
          params: {
            page: this.currentPage,
            results: this.results,
            sortColumn: this.sortColumn,
            sortDirection: this.sortDirection,
          },
        })
        let data = response.data

        this.items = data.collection
        this.totalItems = data.totalCount
      } catch (error) {
        console.log(error)
      }
    },
    sort(ctx) {
      console.log(ctx)
      this.sortColumn = ctx.sortBy

      if (ctx.sortDesc) {
        this.sortDirection = 'DESC'
      } else {
        this.sortDirection = 'ASC'
      }

      this.loadData()
    },
    doEdit(item) {
      this.$set(item, 'editing', true)
    },
    async sendEdit(item) {
      try {
        axios
          .put(`${this.itemUrl}/${item[this.$props.primaryKey]}`, item)
          .then(() => {
            this.$set(item, 'editing', false)
          })
      } catch (error) {
        console.log(error)
      }
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
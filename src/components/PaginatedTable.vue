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
        responsive="sm"
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
          <div
            :key="field.key"
            v-else-if="field.typeOptions.type == 'datetime'"
          >
            <span>
              {{ formatDateTime(scope.item[field.key]) }}
            </span>
          </div>
          <div :key="field.key" v-else-if="field.typeOptions.type == 'time'">
            <span v-if="!scope.item.editing">
              {{ scope.item[field.key] }}
            </span>
            <b-time v-else v-model="scope.item[field.key]"></b-time>
          </div>
          <div :key="field.key" v-else-if="field.typeOptions.type == 'date'">
            <div v-if="!scope.item.editing">
              {{ formatDate(scope.item[field.key]) }}
            </div>
            <div v-else-if="scope.item.editing">
              <b-datepicker
                size="sm"
                calendar-width="350px"
                v-model="scope.item[field.key]"
              ></b-datepicker>
            </div>
          </div>
          <!--- Custom Stuff. Might rework. --->
          <div :key="field.key" v-else-if="field.typeOptions.type == 'boolean'">
            <div v-if="!scope.item.editing">
              <b-badge variant="success" v-if="scope.item[field.key] == 'true'">
                {{ scope.item[field.key] }}</b-badge
              >
              <b-badge variant="danger" v-else>
                {{ scope.item[field.key] }}</b-badge
              >
            </div>
            <b-checkbox v-else v-model="scope.item[field.key]"></b-checkbox>
          </div>
          <div :key="field.key" v-else-if="field.typeOptions.type == 'rate'">
            <span v-if="!scope.item.editing"
              >{{ scope.item[field.key] }}DKK
            </span>
            <b-input
              v-else
              v-model="scope.item[field.key]"
              type="number"
              step="0.01"
            ></b-input>
          </div>
          <div :key="field.key" v-else-if="field.typeOptions.type == 'select'">
            <span v-if="!scope.item.editing">{{ scope.item[field.key] }}</span>
            <b-select
              v-else
              v-model="scope.item[field.key]"
              :options="field.typeOptions.options"
            ></b-select>
          </div>
          <div :key="field.key" v-else-if="field.typeOptions.type == 'status'">
            <div v-if="!scope.item.editing">
              <div v-if="scope.item[field.key] == '1'">
                <b-badge size="sm" variant="success">Active</b-badge>
              </div>
              <div v-else>
                <b-badge size="sm" variant="danger">Inactive</b-badge>
              </div>
            </div>
            <div v-else>
              <b-checkbox
                v-model="scope.item[field.key]"
                value="1"
                unchecked-value="0"
              >
              </b-checkbox>
            </div>
          </div>
          <div
            :key="field.key"
            v-else-if="field.typeOptions.type == 'constant'"
          >
            <span> {{ scope.item[field.key] }}</span>
          </div>
          <div
            :key="field.key"
            v-else-if="field.typeOptions.type == 'password'"
          >
            <div>
              <b-btn
                variant="primary"
                v-if="scope.item[field.key] === undefined"
                class="fas fa-eye"
                @click="getPassword(scope)"
              ></b-btn>
              <span v-else>{{ scope.item[field.key] }}</span>
            </div>
          </div>
          <div :key="field.key" v-else-if="field.typeOptions.type == 'paid'">
            <div v-if="!scope.item.editing">
              <b-badge v-if="scope.item[field.key] == 0" variant="success"
                >Paid</b-badge
              >
              <b-badge v-if="scope.item[field.key] != 0" variant="warning"
                >Unpaid</b-badge
              >
            </div>
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
import dayjs from 'dayjs'
import * as auth from '../auth/authHelper'

export default {
  props: {
    url: {
      type: String,
      required: true,
    },
    uploadUrl: {
      type: String,
    },
    downloadUrl: {
      type: String,
    },
    downloadType: String,
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
    formatDateTime(date) {
      return dayjs(date).format('DD-MM-YYYY HH:mm:ss')
    },
    formatDate(date) {
      return dayjs(date).format('DD-MM-YYYY')
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
    async doDownload(scope) {
      if (this.downloadType == 'economic') {
        this.downloadInvoice(scope.item.pdf.download)
      } else {
        this.downloadAttachment(scope)
      }
    },
    async downloadAttachment(scope) {
      let url = `${this.downloadUrl}/${scope.item.id}`

      let file = await axios.get(url)

      download(
        `data:${item.fileType};base64,${file.data}`,
        item.fileName,
        item.fileType
      ) //FIXME: REWRITE THIS FOR MODULARITY
    },
    downloadInvoice(link) {
      //It's necessary for now to sepparate the two. Might change
      axios
        .get(`${process.env.VUE_APP_URL}invoices/pdf`, {
          params: {
            url: link,
          },
          responseType: 'arraybuffer',
        })
        .then((response) => {
          download(response.data, 'invoice.pdf')
        })
    },
    doDelete(scope) {
      axios.delete(`${this.uploadUrl}/${scope.item.id}`).then(() => {
        this.loadData()
      })
    },
    async getPassword(scope) {
      let request = await axios.get(
        `${process.env.VUE_APP_URL}passwords/${scope.item.passwordId}`,
        {
          params: {
            employeeId: await auth.getAccountId(),
          },
        }
      )

      let passwords = this.items

      for (var password of passwords) {
        if (password.passwordId === scope.item.passwordId) {
          this.$set(scope.item, 'password', request.data)
          password.password = request.data
          // this.$refs.passTable.refresh()
        }
      }
    },
  },
  watch: {
    currentPage() {
      this.loadData()
    },
  },
}
</script>
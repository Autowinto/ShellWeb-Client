<template>
  <div id="wrapper">
    <b-container fluid class="p-0 m-0">
      <b-overlay :show="loading">
        <div v-if="searchableColumn" class="mb-3">
          <b-row>
            <b-col class="w-100">
              <b-input
                size="sm"
                id="search-input"
                v-model="searchTerm"
                @input="loadData"
                :placeholder="searchPrompt"
              ></b-input>
            </b-col>
          </b-row>
        </div>
        <b-table
          :small="small"
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
          <template #cell()="scope">
            <div
              v-if="scope.field.typeOptions == undefined"
              :style="evaluateColumnWidth(scope.field.width)"
              :class="[scope.field.width ? 'text-truncate' : 'text-break']"
            >
              <span v-if="!scope.item.editing">
                {{ getScopeValue(scope) }}
              </span>
              <b-input v-else v-model="scope.item[scope.field.key]"></b-input>
            </div>
            <div v-else-if="scope.field.typeOptions.type == 'link'">
              <b-link
                :to="{
                  path: scope.field.typeOptions.path,
                  query: {
                    id: scope.item[scope.field.typeOptions.idName],
                  },
                }"
              >
                <div
                  :style="evaluateColumnWidth(scope.field.width)"
                  :class="{ 'text-truncate': scope.field.width }"
                >
                  {{ scope.item[scope.field.typeOptions.linkText] }}
                </div>
              </b-link>
            </div>
            <div v-else-if="scope.field.typeOptions.type == 'datetime'">
              <span>
                {{ formatDateTime(scope.item[scope.field.key]) }}
              </span>
            </div>
            <div v-else-if="scope.field.typeOptions.type == 'time'">
              <span v-if="!scope.item.editing">
                {{ scope.item[scope.field.key] }}
              </span>
              <b-time v-else v-model="scope.item[scope.field.key]"></b-time>
            </div>
            <div v-else-if="scope.field.typeOptions.type == 'date'">
              <div v-if="!scope.item.editing">
                {{ formatDate(scope.item[scope.field.key]) }}
              </div>
              <div v-else-if="scope.item.editing">
                <b-datepicker
                  size="sm"
                  calendar-width="350px"
                  v-model="scope.item[scope.field.key]"
                ></b-datepicker>
              </div>
            </div>
            <div v-else-if="scope.field.typeOptions.type == 'boolean'">
              <div v-if="!scope.item.editing">
                <b-badge
                  variant="success"
                  v-if="scope.item[scope.field.key] == 'true'"
                >
                  {{ scope.item[scope.field.key] }}</b-badge
                >
                <b-badge variant="danger" v-else>
                  {{ scope.item[scope.field.key] }}</b-badge
                >
              </div>
              <b-checkbox
                v-else
                v-model="scope.item[scope.field.key]"
              ></b-checkbox>
            </div>
            <div v-else-if="scope.field.typeOptions.type == 'rate'">
              <span v-if="!scope.item.editing"
                >{{ scope.item[scope.field.key] }}DKK
              </span>
              <b-input
                v-else
                v-model="scope.item[scope.field.key]"
                type="number"
                step="0.01"
              ></b-input>
            </div>
            <div v-else-if="scope.field.typeOptions.type == 'select'">
              <span v-if="!scope.item.editing">{{
                scope.item[scope.field.key]
              }}</span>
              <b-select
                v-else
                v-model="scope.item[scope.field.key]"
                :options="scope.field.typeOptions.options"
              ></b-select>
            </div>
            <div v-else-if="scope.field.typeOptions.type == 'status'">
              <div v-if="!scope.item.editing">
                <div v-if="scope.item[scope.field.key] == '1'">
                  <b-badge size="sm" variant="success">Active</b-badge>
                </div>
                <div v-else>
                  <b-badge size="sm" variant="danger">Inactive</b-badge>
                </div>
              </div>
              <div v-else>
                <b-checkbox
                  v-model="scope.item[scope.field.key]"
                  value="1"
                  unchecked-value="0"
                >
                </b-checkbox>
              </div>
            </div>
            <div v-else-if="scope.field.typeOptions.type == 'constant'">
              <span> {{ getScopeValue(scope) }}</span>
            </div>
            <div v-else-if="scope.field.typeOptions.type == 'password'">
              <div>
                <div v-if="!scope.item.editing">
                  <b-btn
                    variant="primary"
                    size="sm"
                    v-if="
                      scope.item[scope.field.key] === undefined &&
                      employeeAccessLevel >= scope.item.accessLevel
                    "
                    @click="getPassword(scope)"
                  >
                    <b-icon icon="eye"></b-icon
                  ></b-btn>
                  <span v-else>{{ scope.item[scope.field.key] }}</span>
                </div>
                <div v-else>
                  <div v-if="employeeAccessLevel >= scope.item.accessLevel">
                    <b-btn
                      variant="primary"
                      size="sm"
                      v-if="
                        scope.item[scope.field.key] === undefined &&
                        employeeAccessLevel >= scope.item.accessLevel
                      "
                      @click="getPassword(scope)"
                    >
                      <b-icon icon="eye"></b-icon
                    ></b-btn>
                    <b-input
                      v-else
                      v-model="scope.item[scope.field.key]"
                    ></b-input>
                  </div>
                </div>
              </div>
            </div>
            <div
              :key="scope.field.key"
              v-else-if="scope.field.typeOptions.type == 'paid'"
            >
              <div v-if="!scope.item.editing">
                <b-badge
                  v-if="scope.item[scope.field.key] == 0"
                  variant="success"
                  >Paid</b-badge
                >
                <b-badge
                  v-if="scope.item[scope.field.key] != 0"
                  variant="warning"
                  >Unpaid</b-badge
                >
              </div>
            </div>
          </template>
          <template #row-details="scope">
            <label for="description-area">Description</label>
            <b-textarea
              id="description-area"
              v-model="scope.item.description"
            ></b-textarea>
          </template>

          <template v-slot:cell(actions)="scope">
            <div
              v-if="
                scope.item[editBooleanKey] == 'false' ||
                editBooleanKey == undefined
              "
            >
              <div v-if="!scope.item.editing">
                <b-btn
                  size="sm"
                  v-if="editable"
                  variant="primary"
                  @click="doEdit(scope)"
                  ><b-icon icon="pencil-square"></b-icon
                ></b-btn>
                <b-btn
                  size="sm"
                  v-if="downloadable"
                  variant="primary"
                  @click="doDownload(scope)"
                  ><b-icon icon="download"></b-icon
                ></b-btn>
                <b-btn
                  size="sm"
                  v-if="deletable && deletableRole <= employeeAccessLevel"
                  variant="danger"
                  @click="doDelete(scope)"
                  ><b-icon icon="trash"></b-icon
                ></b-btn>
              </div>
              <div v-else>
                <b-btn size="sm" variant="success" @click="sendEdit(scope.item)"
                  >Save</b-btn
                >
                <b-btn
                  size="sm"
                  variant="danger"
                  @click="cancelEdit(scope.item)"
                  >Cancel</b-btn
                >
              </div>
            </div>
            <div v-else>
              <b-icon icon="lock-fill"></b-icon>
            </div>
            <slot name="custom" :scope="scope"></slot>
          </template>
        </b-table>
        <b-pagination
          v-if="paginated"
          v-model="currentPage"
          :total-rows="totalItems"
          :per-page="results"
          size="sm"
        >
        </b-pagination>
      </b-overlay>
    </b-container>
  </div>
</template>

<script>
  import { defineComponent } from '@vue/composition-api'
  import axios from 'axios'
  import download from 'downloadjs'
  import dayjs from 'dayjs'
  import * as auth from '../auth/authHelper'

  export default defineComponent({
    props: {
      url: {
        type: String,
        required: true,
      },
      uploadUrl: {
        type: String,
      },
      deleteUrl: {
        type: String,
      },
      downloadUrl: {
        type: String,
      },
      downloadType: String,
      fields: {
        type: Array,
        required: true,
      },
      results: {
        type: Number,
        default: 1000,
      },
      sortColumn: {
        type: String,
      },
      sortDirection: {
        type: String,
        default: 'DESC',
      },
      searchableColumn: {
        type: String,
      },
      searchPrompt: {
        type: String,
        default: 'Search',
      },
      editable: Boolean,
      paginated: {
        type: Boolean,
        default: true,
      },
      editBooleanKey: String,
      downloadable: Boolean,
      deletable: Boolean,
      deletableRole: Number,
      description: {
        type: Boolean,
        default: false,
      },
      fixed: Boolean,
      small: {
        type: Boolean,
        default: false,
      },
      activatesModal: Boolean,
    },
    data() {
      return {
        items: this.items,
        currentPage: 1,
        totalItems: 0,
        sortedColumn: this.sortColumn,
        sortedDirection: this.sortDirection,
        loading: false,
        searchTerm: '',
      }
    },
    created() {
      if (
        this.editable ||
        this.downloadable ||
        this.deletable ||
        this.activatesModal
      ) {
        // eslint-disable-next-line vue/no-mutating-props
        this.fields.push({ key: 'actions' })
      }

      if (!this.sortedColumn) {
        this.sortedColumn = this.fields[0].key
      }

      this.loadData()
    },
    mounted() {
      if (this.$scopedSlots.custom) {
        // eslint-disable-next-line vue/no-mutating-props
        this.fields.push({ key: 'actions' })
      }
    },
    computed: {
      editableFields() {
        return this.fields.filter((field) => {
          return field.editable === true
        })
      },
      employeeAccessLevel() {
        return this.$store.state.role.role
      },
    },
    methods: {
      getScopeValue(scope) {
        const item = scope.item
        const key = scope.field.key
        if (key.includes('.')) {
          let value = item
          const keys = key.split('.')

          for (const key of keys) {
            value = value[key]
          }

          return value
        }

        return item[key]
      },
      async loadData() {
        this.loading = true
        try {
          let response = await axios.get(this.$props.url, {
            params: {
              page: this.currentPage,
              results: this.results,
              sortColumn: this.sortedColumn,
              sortDirection: this.sortedDirection,
              searchColumn: this.searchableColumn,
              searchValue: this.searchTerm,
            },
          })
          let data = response.data

          this.items = data.collection
          this.totalItems = data.pagination.totalItems
          this.loading = false
        } catch (error) {
          this.loading = false
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
        this.sortedColumn = ctx.sortBy

        if (ctx.sortDesc) {
          this.sortedDirection = 'DESC'
        } else {
          this.sortedDirection = 'ASC'
        }

        this.loadData()
      },
      doEdit(scope) {
        if (this.description) {
          scope.toggleDetails()
        }
        this.$set(scope.item, 'editing', true)
      },
      cancelEdit(item) {
        this.loadData().then(() => {
          this.$set(item, 'editing', false)
        })
      },
      async sendEdit(item) {
        try {
          axios.put(`${this.uploadUrl}/${item.id}`, item).then(() => {
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
      evaluateColumnWidth(width) {
        if (!width) return 'width: 100%'
        return `width: ${width}`
      },
      async downloadAttachment(scope) {
        console.log(scope)
        let url = `${this.downloadUrl}/${scope.item.id}`

        let file = await axios.get(url)

        download(
          `data:${scope.item.fileType};base64,${file.data}`,
          scope.item.fileName,
          scope.item.fileType
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
        this.$bvModal
          .msgBoxConfirm('Are you sure you want to delete this item?', {
            centered: true,
          })
          .then((response) => {
            if (response == true) {
              axios.delete(`${this.deleteUrl}/${scope.item.id}`).then(() => {
                this.loadData()
              })
            } else {
              console.log('False')
            }
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
    components: {},
  })
</script>

<template>
  <div id="wrapper">
    <b-container fluid class="p-0 m-0">
      <b-overlay :show="loading">
        <b-table
          :small="small"
          show-empty
          outlined
          hover
          :fixed="fixed"
          ref="table"
          no-local-sorting
          @sort-changed="sort"
          :items="items"
          :fields="fields"
          :current-page="currentPage"
        >
          <template
            v-for="field in fields"
            v-slot:[`cell(${field.key})`]="scope"
          >
            <div :key="field.key" v-if="field.typeOptions == undefined">
              <span class="text-break" v-if="!scope.item.editing">
                {{ scope.item[field.key] }}
              </span>
              <b-input
                v-else
                :key="field.key"
                v-model="scope.item[field.key]"
              ></b-input>
            </div>
            <div :key="field.key" v-else-if="field.typeOptions.type == 'link'">
              <b-link
                :to="{
                  path: field.typeOptions.path,
                  query: {
                    id: scope.item[field.typeOptions.idName],
                  },
                }"
                >{{ scope.item[field.typeOptions.linkText] }}</b-link
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
            <div
              :key="field.key"
              v-else-if="field.typeOptions.type == 'boolean'"
            >
              <div v-if="!scope.item.editing">
                <b-badge
                  variant="success"
                  v-if="scope.item[field.key] == 'true'"
                >
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
            <div
              :key="field.key"
              v-else-if="field.typeOptions.type == 'select'"
            >
              <span v-if="!scope.item.editing">{{
                scope.item[field.key]
              }}</span>
              <b-select
                v-else
                v-model="scope.item[field.key]"
                :options="field.typeOptions.options"
              ></b-select>
            </div>
            <div
              :key="field.key"
              v-else-if="field.typeOptions.type == 'status'"
            >
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
                <div v-if="!scope.item.editing">
                  <b-btn
                    variant="primary"
                    size="sm"
                    v-if="
                      scope.item[field.key] === undefined &&
                      employeeAccessLevel >= scope.item.accessLevel
                    "
                    @click="getPassword(scope)"
                  >
                    <b-icon icon="eye"></b-icon
                  ></b-btn>
                  <span v-else>{{ scope.item[field.key] }}</span>
                </div>
                <div v-else>
                  <div v-if="employeeAccessLevel >= scope.item.accessLevel">
                    <b-btn
                      variant="primary"
                      size="sm"
                      v-if="
                        scope.item[field.key] === undefined &&
                        employeeAccessLevel >= scope.item.accessLevel
                      "
                      @click="getPassword(scope)"
                    >
                      <b-icon icon="eye"></b-icon
                    ></b-btn>
                    <b-input v-else v-model="scope.item[field.key]"></b-input>
                  </div>
                </div>
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
          </template>
        </b-table>
        <b-pagination
          v-model="currentPage"
          :total-rows="totalItems"
          :per-page="results"
        >
        </b-pagination>
      </b-overlay>
    </b-container>
    <!-- <b-modal ref="tableDeletionModal" id="tableDeletionModal">
      Are you sure you want to delete this item?
    </b-modal> -->
  </div>
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
    deleteUrl: {
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
    results: Number,
    sortColumn: {
      type: String,
    },
    sortDirection: {
      type: String,
      default: 'ASC',
    },
    editable: Boolean,
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
  },
  data() {
    return {
      items: this.items,
      currentPage: 1,
      totalItems: 0,
      sortedColumn: this.sortColumn,
      sortedDirection: this.sortDirection,
      loading: false,
    }
  },
  created() {
    if (this.editable || this.downloadable || this.deletable) {
      this.fields.push({ key: 'actions' })
    }

    if (!this.sortedColumn) {
      this.sortedColumn = this.fields[0].key
    }

    this.loadData()
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
    async loadData() {
      this.loading = true
      try {
        let response = await axios.get(this.$props.url, {
          params: {
            page: this.currentPage,
            results: this.results,
            sortColumn: this.sortedColumn,
            sortDirection: this.sortedDirection,
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
}
</script>
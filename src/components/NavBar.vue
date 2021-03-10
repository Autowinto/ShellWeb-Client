<template>
  <div id="wrapper">
    <b-navbar
      class="navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0"
    >
      <div class="container-fluid d-flex flex-column p-0">
        <a
          class="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0"
          href="#"
        >
          <b-navbar-brand to="/">
            <img
              src="../assets/img/logo/logo-white.png"
              alt="LOGO HERE"
              width="220"
            />
          </b-navbar-brand>
        </a>
        <hr class="sidebar-divider my-0" />
        <b-nav class="pl-3" id="accordionSidebar">
          <b-nav-item to="/">
            <i class="fas fa-tachometer-alt"></i>Dashboard
          </b-nav-item>
          <b-nav-item to="/changelog">
            <i class="fas fa-newspaper"></i>Changelog
          </b-nav-item>
          <b-nav-item to="/customers">
            <i class="fas fa-table"></i>Customers
          </b-nav-item>
          <b-nav-item to="/tickets">
            <i class="fas fa-table"></i>Tickets
          </b-nav-item>
          <b-nav-item to="/invoices">
            <i class="fas fa-table"></i>Invoices
          </b-nav-item>
          <b-nav-item to="/timeoverview">
            <i class="fas fa-table"></i>Time Overview
          </b-nav-item>
          <b-nav-item to="/administration">
            <i class="fas fa-table"></i>Administration
          </b-nav-item>
        </b-nav>
      </div>
    </b-navbar>
    <div
      class="d-flex flex-column"
      id="content-wrapper"
      style="overflow: hidden"
    >
      <div id="content">
        <nav
          class="navbar navbar-light navbar-expand bg-white shadow mb-4 topbar static-top"
        >
          <div class="container-fluid">
            <button
              class="btn btn-link d-md-none rounded-circle mr-3"
              id="sidebarToggleTop"
              type="button"
            >
              <i class="fas fa-bars"></i>
            </button>
            <ul class="nav navbar-nav flex-nowrap ml-auto">
              <li class="nav-item dropdown d-sm-none no-arrow">
                <a
                  class="dropdown-toggle nav-link"
                  data-toggle="dropdown"
                  aria-expanded="false"
                  href="#"
                >
                  <i class="fas fa-search"></i>
                </a>
                <div
                  class="dropdown-menu dropdown-menu-right p-3 animated--grow-in"
                  role="menu"
                  aria-labelledby="searchDropdown"
                >
                  <form class="form-inline mr-auto navbar-search w-100">
                    <div class="input-group">
                      <input
                        class="bg-light form-control border-0 small"
                        type="text"
                        placeholder="Search for ..."
                      />
                      <div class="input-group-append">
                        <button class="btn btn-primary py-0" type="button">
                          <i class="fas fa-search"></i>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </li>
              <li
                v-if="this.$store.state.isAuthenticated"
                class="nav-item dropdown no-arrow mx-1"
                role="presentation"
              >
                <div>
                  <a class="nav-link" v-b-modal.smsModal href="#">
                    <i class="fas fa-sms fa-fw fa-lg"></i>
                  </a>
                </div>
              </li>
              <b-modal
                id="smsModal"
                ref="smsModal"
                centered
                hide-footer
                body-class="p-0"
                size="lg"
                title="Compose Message From ITC"
              >
                <b-card bg-variant="light" body-class="p-0">
                  <b-form
                    class="p-3"
                    @submit="submitTextMessage"
                    onsubmit="return false;"
                  >
                    <b-form-group
                      label-cols-sm="3"
                      label="Phone:"
                      label-align-sm="right"
                      label-for="input-number"
                      description="Required"
                    >
                      <b-input
                        id="input-number"
                        required
                        type="number"
                        v-model="textMessageForm.receiver"
                      ></b-input>
                    </b-form-group>
                    <b-form-group
                      label-cols-sm="3"
                      label="Message:"
                      label-align-sm="right"
                      label-for="input-message"
                      description="Required"
                    >
                      <textarea
                        v-model="textMessageForm.message"
                        rows="6"
                        style="width: 100%"
                      >
                      </textarea>
                    </b-form-group>
                    <b-button-group>
                      <b-button
                        id="smsSubmitBtn"
                        type="submit"
                        variant="success"
                        >Send</b-button
                      >
                    </b-button-group>
                  </b-form>
                </b-card>
              </b-modal>
              <div class="d-none d-sm-block topbar-divider"></div>
              <li class="nav-item dropdown no-arrow" role="presentation">
                <div class="nav-item dropdown no-arrow">
                  <a
                    class="dropdown-toggle nav-link"
                    data-toggle="dropdown"
                    aria-expanded="false"
                    href="#"
                  >
                    <span class="mr-2 text-gray-600 small font-weight-bold">{{
                      this.user.displayName
                    }}</span>
                    <span
                      class="small text-gray-500"
                      style="position: absolute; bottom: 10px"
                      >{{ this.user.role }}</span
                    >
                  </a>
                  <div
                    class="dropdown-menu shadow dropdown-menu-right animated--grow-in"
                    role="menu"
                  >
                    <a class="dropdown-item" role="button">
                      <i
                        class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"
                      ></i
                      >&nbsp;Logout
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </nav>
        <slot></slot>
      </div>
      <footer class="bg-white sticky-footer">
        <div class="container my-auto">
          <div class="text-center my-auto copyright">
            <span>Copyright © IT Confidence A/S - 2021</span>
          </div>
        </div>
      </footer>
    </div>
    <a class="border rounded d-inline scroll-to-top" href="#page-top">
      <i class="fas fa-angle-up"></i>
    </a>
  </div>
</template>

<script>
import axios from 'axios'
import store from '../auth/store'

export default {
  data() {
    return {
      user: {
        displayName: 'Not Logged In', //displayName is just "Not Logged In" per default, so that displays when the user isn't logged in properly
        role: '',
      },
      textMessageForm: {
        message: null,
        receiver: null,
      },
    }
  },
  mounted() {
    this.user.displayName = store.state.displayName
  },
  methods: {
    submitTextMessage() {
      console.log('Submitting text message')
      axios
        .post(`${process.env.VUE_APP_URL}sms`, {
          message: this.textMessageForm.message,
          receiver: this.textMessageForm.receiver,
        })
        .then(() => {
          this.$refs['smsModal'].hide()
          this.textMessageForm.message = null
          this.textMessageForm.receiver = null
        })
    },
  },
  computed: {
    displayName() {
      return store.state.displayName
    },
    role() {
      return store.state.role
    },
  },
  watch: {
    displayName(displayName) {
      this.user.displayName = displayName
    },
    role(role) {
      this.user.role = role.name
    },
  },
}
</script>
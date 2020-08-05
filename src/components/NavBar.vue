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
            <img src="../assets/img/logo/logo-white.png" alt="LOGO HERE" width="220" />
          </b-navbar-brand>
        </a>
        <hr class="sidebar-divider my-0" />
        <b-nav class="pl-3" id="accordionSidebar">
          <b-nav-item to="/">
            <i class="fas fa-tachometer-alt"></i>Dashboard
          </b-nav-item>
          <b-nav-item to="/profile">
            <i class="fas fa-table"></i>Profile
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
        <div class="text-center d-none d-md-inline">
          <button class="btn rounded-circle border-0" id="sidebarToggle" type="button"></button>
        </div>
      </div>
    </b-navbar>
    <div class="d-flex flex-column" id="content-wrapper" style="overflow: hidden;">
      <div id="content">
        <nav class="navbar navbar-light navbar-expand bg-white shadow mb-4 topbar static-top">
          <div class="container-fluid">
            <button
              class="btn btn-link d-md-none rounded-circle mr-3"
              id="sidebarToggleTop"
              type="button"
            >
              <i class="fas fa-bars"></i>
            </button>
            <form
              class="form-inline d-none d-sm-inline-block mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search"
            >
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
              <li class="nav-item dropdown no-arrow mx-1" role="presentation">
                <div class="nav-item dropdown no-arrow">
                  <a
                    class="dropdown-toggle nav-link"
                    data-toggle="dropdown"
                    aria-expanded="false"
                    href="#"
                  >
                    <span class="badge badge-danger badge-counter">3+</span>
                    <i class="fas fa-bell fa-fw"></i>
                  </a>
                  <div
                    class="dropdown-menu dropdown-menu-right dropdown-list dropdown-menu-right animated--grow-in"
                    role="menu"
                  >
                    <h6 class="dropdown-header">alerts center</h6>
                    <a class="d-flex align-items-center dropdown-item" href="#">
                      <div class="mr-3">
                        <div class="bg-primary icon-circle">
                          <i class="fas fa-file-alt text-white"></i>
                        </div>
                      </div>
                      <div>
                        <span class="small text-gray-500">December 12, 2019</span>
                        <p>A new monthly report is ready to download!</p>
                      </div>
                    </a>
                    <a class="d-flex align-items-center dropdown-item" href="#">
                      <div class="mr-3">
                        <div class="bg-success icon-circle">
                          <i class="fas fa-donate text-white"></i>
                        </div>
                      </div>
                      <div>
                        <span class="small text-gray-500">December 7, 2019</span>
                        <p>$290.29 has been deposited into your account!</p>
                      </div>
                    </a>
                    <a class="d-flex align-items-center dropdown-item" href="#">
                      <div class="mr-3">
                        <div class="bg-warning icon-circle">
                          <i class="fas fa-exclamation-triangle text-white"></i>
                        </div>
                      </div>
                      <div>
                        <span class="small text-gray-500">December 2, 2019</span>
                        <p>Spending Alert: We've noticed unusually high spending for your account.</p>
                      </div>
                    </a>
                    <a
                      class="text-center dropdown-item small text-gray-500"
                      href="#"
                    >Show All Alerts</a>
                  </div>
                </div>
              </li>
              <li class="nav-item dropdown no-arrow mx-1" role="presentation">
                <div class="nav-item dropdown no-arrow">
                  <a
                    class="dropdown-toggle nav-link"
                    data-toggle="dropdown"
                    aria-expanded="false"
                    href="#"
                  >
                    <i class="fas fa-envelope fa-fw"></i>
                    <span class="badge badge-danger badge-counter">7</span>
                  </a>
                  <div
                    class="dropdown-menu dropdown-menu-right dropdown-list dropdown-menu-right animated--grow-in"
                    role="menu"
                  >
                    <h6 class="dropdown-header">alerts center</h6>
                    <a class="d-flex align-items-center dropdown-item" href="#">
                      <div class="dropdown-list-image mr-3">
                        <img
                          class="rounded-circle"
                          src="../assets/img/avatars/avatar4.jpeg?h=fefb30b61c8459a66bd338b7d790c3d5"
                        />
                        <div class="bg-success status-indicator"></div>
                      </div>
                      <div class="font-weight-bold">
                        <div class="text-truncate">
                          <span>Hi there! I am wondering if you can help me with a problem I've been having.</span>
                        </div>
                        <p class="small text-gray-500 mb-0">Emily Fowler - 58m</p>
                      </div>
                    </a>
                    <a class="d-flex align-items-center dropdown-item" href="#">
                      <div class="dropdown-list-image mr-3">
                        <img
                          class="rounded-circle"
                          src="../assets/img/avatars/avatar2.jpeg?h=5d142be9441885f0935b84cf739d4112"
                        />
                        <div class="status-indicator"></div>
                      </div>
                      <div class="font-weight-bold">
                        <div class="text-truncate">
                          <span>I have the photos that you ordered last month!</span>
                        </div>
                        <p class="small text-gray-500 mb-0">Jae Chun - 1d</p>
                      </div>
                    </a>
                    <a class="d-flex align-items-center dropdown-item" href="#">
                      <div class="dropdown-list-image mr-3">
                        <img
                          class="rounded-circle"
                          src="../assets/img/avatars/avatar3.jpeg?h=c5166867f10a4e454b5b2ae8d63268b3"
                        />
                        <div class="bg-warning status-indicator"></div>
                      </div>
                      <div class="font-weight-bold">
                        <div class="text-truncate">
                          <span>Last month's report looks great, I am very happy with the progress so far, keep up the good work!</span>
                        </div>
                        <p class="small text-gray-500 mb-0">Morgan Alvarez - 2d</p>
                      </div>
                    </a>
                    <a class="d-flex align-items-center dropdown-item" href="#">
                      <div class="dropdown-list-image mr-3">
                        <img
                          class="rounded-circle"
                          src="../assets/img/avatars/avatar5.jpeg?h=35dc45edbcda6b3fc752dab2b0f082ea"
                        />
                        <div class="bg-success status-indicator"></div>
                      </div>
                      <div class="font-weight-bold">
                        <div class="text-truncate">
                          <span>Am I a good boy? The reason I ask is because someone told me that people say this to all dogs, even if they aren't good...</span>
                        </div>
                        <p class="small text-gray-500 mb-0">Chicken the Dog · 2w</p>
                      </div>
                    </a>
                    <a
                      class="text-center dropdown-item small text-gray-500"
                      href="#"
                    >Show All Alerts</a>
                  </div>
                </div>
                <div
                  class="shadow dropdown-list dropdown-menu dropdown-menu-right"
                  aria-labelledby="alertsDropdown"
                ></div>
              </li>
              <div class="d-none d-sm-block topbar-divider"></div>
              <li class="nav-item dropdown no-arrow" role="presentation">
                <div class="nav-item dropdown no-arrow">
                  <a
                    class="dropdown-toggle nav-link"
                    data-toggle="dropdown"
                    aria-expanded="false"
                    href="#"
                  >
                    <span
                      class=" mr-2 text-gray-600 small font-weight-bold">
                      {{this.user.displayName}}
                    </span>
                    <span class="small text-gray-500" style="position:absolute; bottom: 10px" >
                      {{this.user.role}}
                    </span>
                    <!-- <img
                      class="border rounded-circle img-profile"
                      src="../assets/img/avatars/avatar1.jpeg?h=0ecc82101fb9a10ca459432faa8c0656"
                    />-->
                  </a>
                  <div
                    class="dropdown-menu shadow dropdown-menu-right animated--grow-in"
                    role="menu"
                  >
                    <!-- <a class="dropdown-item" role="presentation" href="#">
                      <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>&nbsp;Profile
                    </a>
                    <a class="dropdown-item" role="presentation" href="#">
                      <i class="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>&nbsp;Settings
                    </a>
                    <a class="dropdown-item" role="presentation" href="#">
                      <i class="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>&nbsp;Activity log
                    </a>
                    <div class="dropdown-divider"></div>-->
                    <a class="dropdown-item" role="button" v-on:click="signOut">
                      <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>&nbsp;Logout
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
            <span>Copyright © IT Confidence A/S - 2020</span>
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
import axios from 'axios';
export default {
  data() {
    return {
      user: {
        displayName: "Not Logged In", //displayName is just "Not Logged In" per default, so that displays when the user isn't logged in properly
        role: ''
      },
    };
  },
  created() {
    if (this.$store.state.account) {
      /*Since App.vue is initialized before NavBar.vue, it can't react to any changes.
      Therefore, upon creation, we check if auth has already happened by looking for an account in the state storage and then calling the MSGraph logic in that case */
      this.handleMSGraph(this.$store.state.account);
    }
  },
  methods: {
    signOut() {
      this.$signOut();
    },
    fetchRole(accountId) {
      axios.get(`${process.env.VUE_APP_URL}employee/role/${accountId}`)
        .then(response => {
          console.log(response)
          this.user.role = response.data.roleName;
        })
    },
    handleMSGraph(value) {
      if (value !== null) {
        this.fetchRole(value.homeAccountId)
        this.$getAccountGraph(value).then((response) => {
          this.user.displayName = response.data.displayName;
        });
      }
    },
  },
  computed: {
    authStatus() {
      return this.$store.state.account;
    },
  },
  watch: {
    authStatus(accountValue) {
      this.handleMSGraph(accountValue);
    },
  },
};
</script>
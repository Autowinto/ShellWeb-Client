<template>
  <div>
    <b-navbar variant="light" class="shadow m-0 p-0">
      <b-navbar-brand id="logo-brand" class="p-2">
        <img
          src="../assets/img/logo/logo-white.png"
          alt="LOGO HERE"
          width="175"
        />
      </b-navbar-brand>
    </b-navbar>
    <!-- <div
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
      </div>
      <footer class="bg-white sticky-footer">
        <div class="container my-auto">
          <div class="text-center my-auto copyright">
            <span>Copyright © IT Confidence A/S - 2021</span>
          </div>
        </div>
      </footer>
    </div> -->
  </div>
</template>

<script>
export default {
  setup() {},
}
</script>

<style scoped>
#logo-brand {
  background-color: #68a7ec;
}
</style>
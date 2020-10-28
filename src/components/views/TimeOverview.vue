<template>
  <div id="wrapper">
    <div class="container-fluid">
      <div class="row">
        <b-col>
          <h3 class="text-dark mb-3">Time Overview for</h3>
          <time-display :title="'Hours Registered (Week)'"> </time-display>-
        </b-col>
        <b-col>
          <time-display :title="'Hours Registered (Week)'"> </time-display>-
        </b-col>
        <b-col>
          <time-display :title="'Hours Registered (Month)'"> </time-display>-
        </b-col>
        <b-col>
          <time-display :title="'Billable Hours Registered (Week)'">
          </time-display
          >-
        </b-col>
      </div>
      <!-- Start: Chart -->
      <div class="row">
        <div class="col">
          <div class="card shadow mb-4">
            <div
              class="card-header d-flex justify-content-between align-items-center"
            >
              <h6 class="text-primary font-weight-bold m-0">
                Registered Hours Overview
              </h6>
              <div class="dropdown no-arrow">
                <button
                  class="btn btn-link btn-sm dropdown-toggle"
                  data-toggle="dropdown"
                  aria-expanded="false"
                  type="button"
                >
                  <i class="fas fa-ellipsis-v text-gray-400"></i>
                </button>
                <div
                  class="dropdown-menu shadow dropdown-menu-right animated--fade-in"
                  role="menu"
                >
                  <p class="text-center dropdown-header">Time Basis:</p>
                  <a class="dropdown-item" role="presentation" href="#"
                    >&nbsp;Daily</a
                  >
                  <a class="dropdown-item" role="presentation" href="#"
                    >&nbsp;Weekly</a
                  >
                  <a class="dropdown-item" role="presentation" href="#"
                    >&nbsp;Monthly</a
                  >
                </div>
              </div>
            </div>
            <div class="card-body">
              <div class="chart-area">
                <canvas id="bar-chart-horizontal"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- End: Chart -->
      <div class="row">
        <div class="col">
          <div class="card shadow mb-4">
            <div
              class="card-header d-flex justify-content-between align-items-center"
            >
              <h6 class="text-primary font-weight-bold m-0">
                Registered Hours Overview
              </h6>
              <div class="dropdown no-arrow">
                <button
                  class="btn btn-link btn-sm dropdown-toggle"
                  data-toggle="dropdown"
                  aria-expanded="false"
                  type="button"
                >
                  <i class="fas fa-ellipsis-v text-gray-400"></i>
                </button>
                <div
                  class="dropdown-menu shadow dropdown-menu-right animated--fade-in"
                  role="menu"
                >
                  <p class="text-center dropdown-header">Time Basis:</p>
                  <a class="dropdown-item" role="presentation" href="#"
                    >&nbsp;Daily</a
                  >
                  <a class="dropdown-item" role="presentation" href="#"
                    >&nbsp;Weekly</a
                  >
                  <a class="dropdown-item" role="presentation" href="#"
                    >&nbsp;Monthly</a
                  >
                </div>
              </div>
            </div>
            <div class="card-body">
              <div
                class="table-responsive table mt-2"
                id="dataTable"
                role="grid"
                aria-describedby="dataTable_info"
              >
                <table class="table dataTable my-0" id="dataTable">
                  <thead>
                    <tr>
                      <th>Ticket ID</th>
                      <th>Billable Hours</th>
                      <th>Non-Billable Hours</th>
                      <th>Customer</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <a href="ticketpage">#101</a>
                      </td>
                      <td>04:45:42</td>
                      <td>02:20:12</td>
                      <td>
                        <a href="customerpage">Openlane</a>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a href="ticketpage">#101</a>
                      </td>
                      <td>04:45:42</td>
                      <td>02:20:12</td>
                      <td>
                        <a href="customerpage">Openlane</a>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a href="ticketpage">#101</a>
                      </td>
                      <td>04:45:42</td>
                      <td>02:20:12</td>
                      <td>
                        <a href="customerpage">Openlane</a>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a href="ticketpage">#101</a>
                      </td>
                      <td>04:45:42</td>
                      <td>02:20:12</td>
                      <td>
                        <a href="customerpage">Openlane</a>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a href="ticketpage">#101</a>
                      </td>
                      <td>04:45:42</td>
                      <td>02:20:12</td>
                      <td>
                        <a href="customerpage">Openlane</a>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a href="ticketpage">#101</a>
                      </td>
                      <td>04:45:42</td>
                      <td>02:20:12</td>
                      <td>
                        <a href="customerpage">Openlane</a>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a href="ticketpage">#101</a>
                      </td>
                      <td>04:45:42</td>
                      <td>02:20:12</td>
                      <td>
                        <a href="customerpage">Openlane</a>
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td>
                        <strong>Ticket ID</strong>
                      </td>
                      <td>
                        <strong>Billable Hours</strong>
                      </td>
                      <td>
                        <strong>Non-Billable Hours</strong>
                      </td>
                      <td>
                        <strong>Customer</strong>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TimeDisplay from '../TimeDisplay.vue'

export default {
  data() {
    return {}
  },
  components: {
    TimeDisplay,
  },
}
</script>

<style></style>

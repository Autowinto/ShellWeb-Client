<template>
  <div id="wrapper">
    <div class="container-fluid">
      <div class="d-sm-flex justify-content-between align-items-center mb-4">
        <h3 class="text-dark mb-0">Time Overview</h3>
        <a class="btn btn-primary btn-sm d-none d-sm-inline-block" role="button" href="#">
          <i class="fas fa-download fa-sm text-white-50"></i>&nbsp;Generate Report
        </a>
      </div>
      <div class="row">
        <div class="col-md-6 col-xl-3 mb-4">
          <div class="card shadow border-left-primary py-2">
            <div class="card-body">
              <div class="row align-items-center no-gutters">
                <div class="col mr-2">
                  <div class="text-uppercase text-primary font-weight-bold text-xs mb-1">
                    <span>Hours Registered (Today)</span>
                  </div>
                  <div class="text-dark font-weight-bold h5 mb-0">
                    <span>04:45:23</span>
                  </div>
                </div>
                <div class="col-auto">
                  <i class="far fa-clock fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-xl-3 mb-4">
          <div class="card shadow border-left-success py-2">
            <div class="card-body">
              <div class="row align-items-center no-gutters">
                <div class="col mr-2">
                  <div class="text-uppercase text-success font-weight-bold text-xs mb-1">
                    <span>Hours Registered (Week)</span>
                  </div>
                  <div class="text-dark font-weight-bold h5 mb-0">
                    <span>39:02:12</span>
                  </div>
                </div>
                <div class="col-auto">
                  <i class="far fa-clock fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-xl-3 mb-4">
          <div class="card shadow border-left-success py-2">
            <div class="card-body">
              <div class="row align-items-center no-gutters">
                <div class="col mr-2">
                  <div class="text-uppercase text-success font-weight-bold text-xs mb-1">
                    <span>Hours Registered (Month)</span>
                  </div>
                  <div class="text-dark font-weight-bold h5 mb-0">
                    <span>156:08:48</span>
                  </div>
                </div>
                <div class="col-auto">
                  <i class="far fa-clock fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-xl-3 mb-4">
          <div class="card shadow border-left-success py-2">
            <div class="card-body">
              <div class="row align-items-center no-gutters">
                <div class="col mr-2">
                  <div class="text-uppercase text-success font-weight-bold text-xs mb-1">
                    <span>Billable Hours Registered (Month)</span>
                  </div>
                  <div class="text-dark font-weight-bold h5 mb-0">
                    <span>100:56:34</span>
                  </div>
                </div>
                <div class="col-auto">
                  <i class="far fa-clock fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Start: Chart -->
      <div class="row">
        <div class="col">
          <div class="card shadow mb-4">
            <div class="card-header d-flex justify-content-between align-items-center">
              <h6 class="text-primary font-weight-bold m-0">Registered Hours Overview</h6>
              <div class="dropdown no-arrow">
                <button
                  class="btn btn-link btn-sm dropdown-toggle"
                  data-toggle="dropdown"
                  aria-expanded="false"
                  type="button"
                >
                  <i class="fas fa-ellipsis-v text-gray-400"></i>
                </button>
                <div class="dropdown-menu shadow dropdown-menu-right animated--fade-in" role="menu">
                  <p class="text-center dropdown-header">Time Basis:</p>
                  <a class="dropdown-item" role="presentation" href="#">&nbsp;Daily</a>
                  <a class="dropdown-item" role="presentation" href="#">&nbsp;Weekly</a>
                  <a class="dropdown-item" role="presentation" href="#">&nbsp;Monthly</a>
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
            <div class="card-header d-flex justify-content-between align-items-center">
              <h6 class="text-primary font-weight-bold m-0">Registered Hours Overview</h6>
              <div class="dropdown no-arrow">
                <button
                  class="btn btn-link btn-sm dropdown-toggle"
                  data-toggle="dropdown"
                  aria-expanded="false"
                  type="button"
                >
                  <i class="fas fa-ellipsis-v text-gray-400"></i>
                </button>
                <div class="dropdown-menu shadow dropdown-menu-right animated--fade-in" role="menu">
                  <p class="text-center dropdown-header">Time Basis:</p>
                  <a class="dropdown-item" role="presentation" href="#">&nbsp;Daily</a>
                  <a class="dropdown-item" role="presentation" href="#">&nbsp;Weekly</a>
                  <a class="dropdown-item" role="presentation" href="#">&nbsp;Monthly</a>
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
export default {};
</script>

<style>
</style>
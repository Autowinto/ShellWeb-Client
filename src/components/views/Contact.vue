<template>
  <div id="wrapper">
    <div class="d-flex flex-column" id="content-wrapper">
      <div id="content">
        <div class="container-fluid">
          <h3 class="text-dark mb-4">Contact ID:</h3>
          <div class="row">
            <div class="col-3">
              <div class="card shadow mb-4">
                <div class="card-header p-0">
                  <div class="row">
                    <div class="col">
                      <h6 class="text-primary font-weight-bold mb-0 p-3">Contact Information</h6>
                    </div>
                    <div class="col-3 text-right">
                      <button
                        onclick="window.location.href = 'contacteditform.html';"
                        class="btn btn-primary btn-sm m-2"
                      >Edit</button>
                    </div>
                  </div>
                </div>
                <div class="card-body shadow">
                  <div class="row">
                    <div class="col">
                      <div class="mb-3">
                        <h4 class="small font-weight-bold">First Name</h4>
                        <h4 class="small"></h4>
                      </div>
                      <div class="mb-3">
                        <h4 class="small font-weight-bold">Job Title</h4>
                        <h4 class="small"></h4>
                      </div>
                    </div>
                    <div class="col">
                      <div class="mb-3">
                        <h4 class="small font-weight-bold">Last Name</h4>
                        <h4 class="small"></h4>
                      </div>
                    </div>
                  </div>
                  <div class="card shadow mb-3"></div>
                  <div class="row">
                    <div class="col">
                      <div class="mb-3">
                        <h4 class="small font-weight-bold">Phone Number</h4>
                        <h4 class="small"></h4>
                      </div>
                    </div>
                    <div class="col">
                      <div class="mb-3">
                        <h4 class="small font-weight-bold">Email</h4>
                        <h4 class="small"></h4>
                      </div>
                    </div>
                  </div>
                  <div class="card shadow mb-3"></div>
                  <button class="btn btn-danger w-100">Delete Contact</button>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card shadow mb-3">
                <div class="card-header">
                  <h6 class="text-primary mb-0 font-weight-bold">Assigned Tickets</h6>
                </div>
                <div class="card-body shadow">
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
                          <th>Subject</th>
                          <th>Date of creation</th>
                          <th>Last updated</th>
                          <th>Status</th>
                          <th>Reply Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <a href="ticketpage.html"></a>
                          </td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<template>
  <div id="wrapper">
    <div class="d-flex flex-column" id="content-wrapper">
      <div id="content">
        <div class="container-fluid">
          <h3 class="text-dark mb-4">Administration</h3>
          <b-card no-body class="shadow">
            <b-tabs card>
              <b-tab title="Products">
                <div>
                  <b-table
                    show-empty
                    outlined
                    hover
                    :items="items.products"
                    :fields="fields.products"
                    :per-page="0"
                    :current-page="pagination.products.currentPage"
                  >
                    <template v-slot:cell(name)="data">
                      <b-link
                        :to="{ path: '/customer', query: {customerID: data.item.corporateIdentificationNumber}}"
                      >{{ data.item.name }}</b-link>
                    </template>
                  </b-table>
                  <b-pagination
                    size="md"
                    v-model="pagination.products.currentPage"
                    :total-rows="pagination.products.totalItems"
                    :per-page="pagination.products.perPage"
                  ></b-pagination>
                </div>
              </b-tab>
              <b-tab title="Product Groups">
                <div>
                  <b-table
                    show-empty
                    outlined
                    hover
                    :items="items.productGroups"
                    :fields="fields.productGroups"
                    :per-page="0"
                    :current-page="pagination.productGroups.currentPage"
                  >
                    <template v-slot:cell(name)="data">
                      <b-link
                        :to="{ path: '/customer', query: {customerID: data.item.corporateIdentificationNumber}}"
                      >{{ data.item.name }}</b-link>
                    </template>
                  </b-table>
                  <b-pagination
                    size="md"
                    v-model="pagination.productGroups.currentPage"
                    :total-rows="pagination.productGroups.totalItems"
                    :per-page="pagination.productGroups.perPage"
                  ></b-pagination>
                </div>
              </b-tab>
              <b-tab title="Time Entries">
                <div>
                  <b-table
                    show-empty
                    outlined
                    hover
                    :items="items.tickets"
                    :fields="fields.tickets"
                    :per-page="0"
                    :current-page="pagination.tickets.currentPage"
                  >
                    <template v-slot:cell(TicketTitle)="data">
                      <b-link
                        :to="{ path: '/ticket', query: {ticketID: data.item.TicketID}}"
                      >{{ data.item.TicketTitle }}</b-link>
                    </template>
                    <template v-slot:cell(totalTime)="data">
                      {{data.item | timeEntryTotal}}
                    </template>
                  </b-table>
                  <b-pagination
                    size="md"
                    v-model="pagination.tickets.currentPage"
                    :total-rows="pagination.tickets.totalItems"
                    :per-page="pagination.tickets.perPage"
                  ></b-pagination>
                </div>
              </b-tab>
            </b-tabs>
          </b-card>

          <!-- <div class="row mb-3">
            <div class="col m-0 p-0 pl-3">
              <div class="card-header shadow p-0">
                <ul class="nav nav-tabs">
                  <li class="nav-item">
                    <a
                      class="nav-link text-primary active m-0 font-weight-bold pb-3"
                      href="#products"
                      data-toggle="tab"
                    >Products</a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link text-primary m-0 font-weight-bold pb-3"
                      href="#productgroups"
                      data-toggle="tab"
                    >Product Groups</a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link text-primary m-0 font-weight-bold pb-3"
                      href="#time"
                      data-toggle="tab"
                    >Time</a>
                  </li>
                </ul>
              </div>
              <div class="tab-content card">
                <div class="tab-pane" id="time">
                  <div class="card-body shadow">
                    <div class="card p-3 text-center m-3" style="background-color: #4e73df;">
                      <div class="row m-0">
                        <div class="col align-items-center">
                          <span class="mr-1" style="color: white;">Ticket #101</span>
                          <span class="mr-1" style="color:lime">10:24:41</span>
                          <span class="mr-1" style="color: white;">Customer #101</span>
                        </div>
                      </div>
                    </div>
                    <div class="card p-3 text-center m-3" style="background-color: #4e73df;">
                      <div class="row m-0">
                        <div class="col align-items-center">
                          <span class="mr-1" style="color: white;">Ticket #102</span>
                          <span class="mr-1" style="color:lime">4:21:42</span>
                          <span class="mr-1" style="color: white;">Customer #102</span>
                        </div>
                      </div>
                    </div>
                    <div class="card p-3 text-center m-3" style="background-color: #4e73df;">
                      <div class="row m-0">
                        <div class="col align-items-center">
                          <span class="mr-1" style="color: white;">Ticket #103</span>
                          <span class="mr-1" style="color:lime">0:47:35</span>
                          <span class="mr-1" style="color: white;">Customer #101</span>
                        </div>
                      </div>
                    </div>
                    <div class="card p-3 text-center m-3" style="background-color: #4e73df;">
                      <div class="row m-0">
                        <div class="col align-items-center">
                          <span class="mr-1" style="color: white;">Ticket #104</span>
                          <span class="mr-1" style="color:lime">6:17:15</span>
                          <span class="mr-1" style="color: white;">Customer #102</span>
                        </div>
                      </div>
                    </div>
                    <div class="card p-3 text-center m-3" style="background-color: #4e73df;">
                      <div class="row m-0">
                        <div class="col align-items-center">
                          <span class="mr-1" style="color: white;">Ticket #105</span>
                          <span class="mr-1" style="color:lime">4:37:45</span>
                          <span class="mr-1" style="color: white;">Customer #103</span>
                        </div>
                      </div>
                    </div>
                    <div class="card p-3 text-center m-3" style="background-color: #4e73df;">
                      <div class="row m-0">
                        <div class="col align-items-center">
                          <span class="mr-1" style="color: white;">Ticket #106</span>
                          <span class="mr-1" style="color:lime">3:22:45</span>
                          <span class="mr-1" style="color: white;">Customer #103</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="tab-pane active" id="products">
                  <div class="card-body shadow">
                    <div class="row">
                      <div class="col">
                        <form class="form-inline mb-3">
                          <div class="form-group">
                            <button
                              class="btn btn-primary mr-2"
                              data-toggle="collapse"
                              type="button"
                              data-target="#productform"
                            >New Product</button>
                            <select class="custom-select mr-2">
                              <option hidden selected>Other Options</option>
                              <option>Option 1</option>
                              <option>Option 2</option>
                              <option>Option 3</option>
                            </select>
                            <span class="mr-2">Currency:</span>
                            <select class="custom-select mr-2">
                              <option selected>DKK</option>
                              <option>USD</option>
                              <option>EUR</option>
                              <option>NOK</option>
                              <option>SEK</option>
                            </select>
                            <span class="mr-2">Show:</span>
                            <select class="custom-select mr-2">
                              <option selected>Open</option>
                              <option>Suspended</option>
                              <option>Closed</option>
                              <option>ETC.</option>
                              <option>ETC.</option>
                            </select>
                          </div>
                        </form>
                        <form class="form-inline">
                          <select class="custom-select mr-2">
                            <option selected>All</option>
                            <option>All</option>
                            <option>Some</option>
                            <option>Some</option>
                            <option>Some</option>
                          </select>
                        </form>
                      </div>
                      <div>
                        <form class="form-inline">
                          <div class="input-group w-100 text-right">
                            <button class="btn btn-primary fas fa-download mr-2"></button>
                            <button class="btn btn-primary fas fa-table mr-2"></button>
                            <button class="btn btn-primary fas fa-print mr-2"></button>
                            <input
                              class="bg-lght form-control"
                              style="max-width: 200px;"
                              type="text"
                              placeholder="Number or name..."
                            />
                            <div class="input-group-append">
                              <button class="btn btn-primary y-0">
                                <i class="fas fa-search"></i>
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div class="accordion-body collapse" id="productform">
                      <div class="card shadow mb-3"></div>
                      <form class="form">
                        <div class="form-row">
                          <div class="col">
                            <label for="number">
                              <strong>Number</strong>
                            </label>
                            <input class="form-control" type="number" name="number" />
                          </div>
                          <div class="col">
                            <label for="name">
                              <strong>Name</strong>
                            </label>
                            <input class="form-control" type="text" name="name" />
                          </div>
                          <div class="col">
                            <label for="group">
                              <strong>Group</strong>
                            </label>
                            <input class="form-control" type="number" name="group" step="1" />
                          </div>
                          <div class="col">
                            <label for="salesprice">
                              <strong>Salesprice</strong>
                            </label>
                            <input class="form-control" type="number" step="0.01" name="salesprice" />
                          </div>
                          <div class="col">
                            <label for="cost">
                              <strong>Cost</strong>
                            </label>
                            <input class="form-control" type="number" step="0.01" name="cost" />
                          </div>
                        </div>
                        <div class="form-row p-1 py-2">
                          <button
                            type="submit"
                            class="btn btn-primary"
                            data-toggle="collapse"
                            data-target="productform"
                          >Add</button>
                        </div>
                      </form>
                    </div>
                    <div
                      class="table-responsive table mt-2"
                      id="dataTable"
                      role="grid"
                      aria-describedby="dataTable_info"
                    >
                      <table class="table dataTable my-0" id="dataTable">
                        <thead>
                          <tr>
                            <th>Number</th>
                            <th>Name</th>
                            <th>Group</th>
                            <th>Salesprice</th>
                            <th>Cost</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody class="product-table-container">
                          <script id="product-template" type="text/x-handlebars-template">
  <tr>
      <td>{{productNumber}}</td>
      <td>{{productName}}</td>
      <td>{{productGroup}}</td>
      <td>{{salesprice}}</td>
      <td>{{cost}}</td>
      <td class="text-right">
          <button style="width: 45px;" class="btn btn-primary far fa-edit" data-toggle="collapse" data-target="#producteditform1"></button>
          <button style="width: 45px;" class="btn btn-primary far fa-file-alt"></button>
          <button style="width: 45px;" class="btn btn-primary far fa-clone mr-3"></button>
          <button style="width: 45px;" class="btn btn-danger fa fa-trash"></button>
      </td>
  </tr>
  <tr>
      <td colspan="6 " class="hiddenRow m-0 p-0">
          <div class="accordion-body collapse" id="producteditform1">
              <div class="card shadow mb-3"></div>
              <form class="form">
                  <div class="form-row">
                      <div class="col">
                          <label for="number"><strong>Number</strong></label><input class="form-control" type="number" name="number">
                      </div>
                      <div class="col">
                          <label for="name"><strong>Name</strong></label><input class="form-control" type="text" name="name">
                      </div>
                      <div class="col">
                          <label for="group"><strong>Group</strong></label><input class="form-control" type="number" name="group" step="1">
                      </div>
                      <div class="col">
                          <label for="salesprice"><strong>Salesprice</strong></label><input class="form-control" type="number" step="0.01" name="salesprice">
                      </div>
                      <div class="col">
                          <label for="cost"><strong>Cost</strong></label><input class="form-control" type="number" step="0.01" name="cost">
                      </div>
                  </div>
                  <div class="form-row p-1 py-2">
                      <button type="submit" class="btn btn-primary" data-toggle="collapse" data-target="productform">Save</button>
                  </div>
              </form>
              </div>
          </td>
      </tr>
                          </script>
                        </tbody>
                        <tfoot>
                          <tr>
                            <td>
                              <strong>Number</strong>
                            </td>
                            <td>
                              <strong>Name</strong>
                            </td>
                            <td>
                              <strong>Group</strong>
                            </td>
                            <td>
                              <strong>Salesprice</strong>
                            </td>
                            <td>
                              <strong>Cost</strong>
                            </td>
                            <td>
                              <strong></strong>
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </div>
                <div class="tab-pane h" id="productgroups">
                  <div class="card-body shadow">
                    <div class="row">
                      <div class="col">
                        <button
                          class="btn btn-primary"
                          data-toggle="collapse"
                          data-target="#productgroupform"
                        >New Product Group</button>
                      </div>
                      <div>
                        <form class="form-inline">
                          <div class="input-group w-100 text-right">
                            <button class="btn btn-primary fas fa-table mr-2"></button>
                            <button class="btn btn-primary fas fa-print mr-2"></button>
                            <input
                              class="bg-lght form-control"
                              style="max-width: 200px;"
                              step="width 100px"
                              type="text"
                              placeholder="Number or name..."
                            />
                            <div class="input-group-append">
                              <button class="btn btn-primary y-0">
                                <i class="fas fa-search"></i>
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div class="accordion-body collapse" id="productgroupform">
                      <div class="card shadow mb-3"></div>
                      <form class="form">
                        <div class="form-row">
                          <div class="col">
                            <label for="number">
                              <strong>Number</strong>
                            </label>
                            <input class="form-control" type="number" name="number" />
                          </div>
                          <div class="col">
                            <label for="name">
                              <strong>Name</strong>
                            </label>
                            <input class="form-control" type="text" name="name" />
                          </div>
                          <div class="col">
                            <label for="inland">
                              <strong>Inland</strong>
                            </label>
                            <input class="form-control" type="number" step="1" name="inland" />
                          </div>
                          <div class="col">
                            <label for="eub">
                              <strong>EU (B)</strong>
                            </label>
                            <input class="form-control" type="number" name="eub" step="0.01" />
                          </div>
                          <div class="col">
                            <label for="foreign">
                              <strong>Foreign (C)</strong>
                            </label>
                            <input class="form-control" type="number" step="0.01" name="foreign" />
                          </div>
                          <div class="col">
                            <label for="inlandnotax">
                              <strong>Inland Without Tax</strong>
                            </label>
                            <input
                              class="form-control"
                              type="number"
                              step="0.01"
                              name="inlandnotax"
                            />
                          </div>
                        </div>
                        <div class="form-row p-1 py-2">
                          <button
                            type="submit"
                            class="btn btn-primary"
                            data-toggle="collapse"
                            data-target="productform"
                          >Add</button>
                        </div>
                      </form>
                    </div>
                    <div
                      class="table-responsive table mt-2"
                      id="dataTable"
                      role="grid"
                      aria-describedby="dataTable_info"
                      style="overflow-x: unset;"
                    >
                      <table class="table dataTable my-0" id="dataTable">
                        <thead>
                          <tr>
                            <th>Number</th>
                            <th>Name</th>
                            <th>Inland</th>
                            <th>EU (B)</th>
                            <th>Foreign (C)</th>
                            <th>Inland Minus Tax</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>Products With Tax</td>
                            <td>1010</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td class="text-right">
                              <button
                                style="width: 45px;"
                                class="btn btn-primary far fa-edit"
                                data-toggle="collapse"
                                data-target="#productgroupeditform1"
                              ></button>
                              <button
                                style="width: 45px;"
                                class="btn btn-primary far fa-clone mr-3"
                              ></button>
                              <button style="width: 45px;" class="btn btn-danger fa fa-trash"></button>
                            </td>
                          </tr>
                          <tr>
                            <td colspan="7" class="hiddenRow m-0 p-0">
                              <div class="accordion-body collapse" id="productgroupeditform1">
                                <div class="card shadow mb-3"></div>
                                <form class="form">
                                  <div class="form-row">
                                    <div class="col">
                                      <label for="number">
                                        <strong>Number</strong>
                                      </label>
                                      <input class="form-control" type="number" name="number" />
                                    </div>
                                    <div class="col">
                                      <label for="name">
                                        <strong>Name</strong>
                                      </label>
                                      <input class="form-control" type="text" name="name" />
                                    </div>
                                    <div class="col">
                                      <label for="inland">
                                        <strong>Inland</strong>
                                      </label>
                                      <input
                                        class="form-control"
                                        type="number"
                                        step="1"
                                        name="inland"
                                      />
                                    </div>
                                    <div class="col">
                                      <label for="eub">
                                        <strong>EU (B)</strong>
                                      </label>
                                      <input
                                        class="form-control"
                                        type="number"
                                        name="eub"
                                        step="0.01"
                                      />
                                    </div>
                                    <div class="col">
                                      <label for="foreign">
                                        <strong>Foreign (C)</strong>
                                      </label>
                                      <input
                                        class="form-control"
                                        type="number"
                                        step="0.01"
                                        name="foreign"
                                      />
                                    </div>
                                    <div class="col">
                                      <label for="inlandnotax">
                                        <strong>Inland Without Tax</strong>
                                      </label>
                                      <input
                                        class="form-control"
                                        type="number"
                                        step="0.01"
                                        name="inlandnotax"
                                      />
                                    </div>
                                  </div>
                                  <div class="form-row p-1 py-2">
                                    <button
                                      type="submit"
                                      class="btn btn-primary"
                                      data-toggle="collapse"
                                      data-target="productform"
                                    >Save</button>
                                  </div>
                                </form>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>Products Without Tax</td>
                            <td>1010</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td class="text-right">
                              <button
                                style="width: 45px;"
                                class="btn btn-primary far fa-edit"
                                data-toggle="collapse"
                                data-target="#productgroupeditform2"
                              ></button>
                              <button
                                style="width: 45px;"
                                class="btn btn-primary far fa-clone mr-3"
                              ></button>
                              <button style="width: 45px;" class="btn btn-danger fa fa-trash"></button>
                            </td>
                          </tr>
                          <tr>
                            <td colspan="7" class="hiddenRow m-0 p-0">
                              <div class="accordion-body collapse" id="productgroupeditform2">
                                <div class="card shadow mb-3"></div>
                                <form class="form">
                                  <div class="form-row">
                                    <div class="col">
                                      <label for="number">
                                        <strong>Number</strong>
                                      </label>
                                      <input class="form-control" type="number" name="number" />
                                    </div>
                                    <div class="col">
                                      <label for="name">
                                        <strong>Name</strong>
                                      </label>
                                      <input class="form-control" type="text" name="name" />
                                    </div>
                                    <div class="col">
                                      <label for="inland">
                                        <strong>Inland</strong>
                                      </label>
                                      <input
                                        class="form-control"
                                        type="number"
                                        step="1"
                                        name="inland"
                                      />
                                    </div>
                                    <div class="col">
                                      <label for="eub">
                                        <strong>EU (B)</strong>
                                      </label>
                                      <input
                                        class="form-control"
                                        type="number"
                                        name="eub"
                                        step="0.01"
                                      />
                                    </div>
                                    <div class="col">
                                      <label for="foreign">
                                        <strong>Foreign (C)</strong>
                                      </label>
                                      <input
                                        class="form-control"
                                        type="number"
                                        step="0.01"
                                        name="foreign"
                                      />
                                    </div>
                                    <div class="col">
                                      <label for="inlandnotax">
                                        <strong>Inland Without Tax</strong>
                                      </label>
                                      <input
                                        class="form-control"
                                        type="number"
                                        step="0.01"
                                        name="inlandnotax"
                                      />
                                    </div>
                                  </div>
                                  <div class="form-row p-1 py-2">
                                    <button
                                      type="submit"
                                      class="btn btn-primary"
                                      data-toggle="collapse"
                                      data-target="productform"
                                    >Save</button>
                                  </div>
                                </form>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td>Services With Tax</td>
                            <td>1010</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td class="text-right">
                              <button
                                style="width: 45px;"
                                class="btn btn-primary far fa-edit"
                                data-toggle="collapse"
                                data-target="#productgroupeditform3"
                              ></button>
                              <button
                                style="width: 45px;"
                                class="btn btn-primary far fa-clone mr-3"
                              ></button>
                              <button style="width: 45px;" class="btn btn-danger fa fa-trash"></button>
                            </td>
                          </tr>
                          <tr>
                            <td colspan="7" class="hiddenRow m-0 p-0">
                              <div class="accordion-body collapse" id="productgroupeditform3">
                                <div class="card shadow mb-3"></div>
                                <form class="form">
                                  <div class="form-row">
                                    <div class="col">
                                      <label for="number">
                                        <strong>Number</strong>
                                      </label>
                                      <input class="form-control" type="number" name="number" />
                                    </div>
                                    <div class="col">
                                      <label for="name">
                                        <strong>Name</strong>
                                      </label>
                                      <input class="form-control" type="text" name="name" />
                                    </div>
                                    <div class="col">
                                      <label for="inland">
                                        <strong>Inland</strong>
                                      </label>
                                      <input
                                        class="form-control"
                                        type="number"
                                        step="1"
                                        name="inland"
                                      />
                                    </div>
                                    <div class="col">
                                      <label for="eub">
                                        <strong>EU (B)</strong>
                                      </label>
                                      <input
                                        class="form-control"
                                        type="number"
                                        name="eub"
                                        step="0.01"
                                      />
                                    </div>
                                    <div class="col">
                                      <label for="foreign">
                                        <strong>Foreign (C)</strong>
                                      </label>
                                      <input
                                        class="form-control"
                                        type="number"
                                        step="0.01"
                                        name="foreign"
                                      />
                                    </div>
                                    <div class="col">
                                      <label for="inlandnotax">
                                        <strong>Inland Without Tax</strong>
                                      </label>
                                      <input
                                        class="form-control"
                                        type="number"
                                        step="0.01"
                                        name="inlandnotax"
                                      />
                                    </div>
                                  </div>
                                  <div class="form-row p-1 py-2">
                                    <button
                                      type="submit"
                                      class="btn btn-primary"
                                      data-toggle="collapse"
                                      data-target="productform"
                                    >Save</button>
                                  </div>
                                </form>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>4</td>
                            <td>Services Without Tax</td>
                            <td>1010</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td class="text-right">
                              <button
                                style="width: 45px;"
                                class="btn btn-primary far fa-edit"
                                data-toggle="collapse"
                                data-target="#productgroupeditform4"
                              ></button>
                              <button
                                style="width: 45px;"
                                class="btn btn-primary far fa-clone mr-3"
                              ></button>
                              <button style="width: 45px;" class="btn btn-danger fa fa-trash"></button>
                            </td>
                          </tr>
                          <tr>
                            <td colspan="7" class="hiddenRow m-0 p-0">
                              <div class="accordion-body collapse" id="productgroupeditform4">
                                <div class="card shadow mb-3"></div>
                                <form class="form">
                                  <div class="form-row">
                                    <div class="col">
                                      <label for="number">
                                        <strong>Number</strong>
                                      </label>
                                      <input class="form-control" type="number" name="number" />
                                    </div>
                                    <div class="col">
                                      <label for="name">
                                        <strong>Name</strong>
                                      </label>
                                      <input class="form-control" type="text" name="name" />
                                    </div>
                                    <div class="col">
                                      <label for="inland">
                                        <strong>Inland</strong>
                                      </label>
                                      <input
                                        class="form-control"
                                        type="number"
                                        step="1"
                                        name="inland"
                                      />
                                    </div>
                                    <div class="col">
                                      <label for="eub">
                                        <strong>EU (B)</strong>
                                      </label>
                                      <input
                                        class="form-control"
                                        type="number"
                                        name="eub"
                                        step="0.01"
                                      />
                                    </div>
                                    <div class="col">
                                      <label for="foreign">
                                        <strong>Foreign (C)</strong>
                                      </label>
                                      <input
                                        class="form-control"
                                        type="number"
                                        step="0.01"
                                        name="foreign"
                                      />
                                    </div>
                                    <div class="col">
                                      <label for="inlandnotax">
                                        <strong>Inland Without Tax</strong>
                                      </label>
                                      <input
                                        class="form-control"
                                        type="number"
                                        step="0.01"
                                        name="inlandnotax"
                                      />
                                    </div>
                                  </div>
                                  <div class="form-row p-1 py-2">
                                    <button
                                      type="submit"
                                      class="btn btn-primary"
                                      data-toggle="collapse"
                                      data-target="productform"
                                    >Save</button>
                                  </div>
                                </form>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                        <tfoot>
                          <tr>
                            <td>
                              <strong>Number</strong>
                            </td>
                            <td>
                              <strong>Name</strong>
                            </td>
                            <td>
                              <strong>Inland</strong>
                            </td>
                            <td>
                              <strong>EU (B)</strong>
                            </td>
                            <td>
                              <strong>EU (C)</strong>
                            </td>
                            <td>
                              <strong>Inland Minus Tax</strong>
                            </td>
                            <td>
                              <strong></strong>
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

//It's necessary to use the utc plugin to account for yearly changes from CET to CEST.
import utc from 'dayjs/plugin/utc';

dayjs.extend(duration);
dayjs.extend(utc);

export default {
  data() {
    return {
      items: {
        products: [],
        productGroups: [],
        tickets: [],
      },
      fields: {
        products: [
          {
            key: "productNumber",
            label: "Product Number"
          },
          {
            key: "name",
            label: "Product Name"
          },
          {
            key: "productGroup.name",
            label: "Product Group"
          },
          {
            key: "salesPrice",
            label: "Cost"
          },
          {
            key: "",
            label: "Options"
          }
        ],
        productGroups: [
          {
            key: "productGroupNumber",
            label: "Product Group Number"
          },
          {
            key: "name",
            label: "Product Name"
          },
          {
            key: "productGroup.name",
            label: "Product Group"
          },
          {
            key: "salesPrice",
            label: "Cost"
          },
          {
            key: "",
            label: "Options"
          }
        ],
        tickets: [
          {
            key: "TicketID",
            label: "Ticket ID"
          },
          {
            key: "TicketTitle",
            label: "Ticket Name"
          },
          "totalTime"
        ],
      },
      pagination: {
        products: {
          currentPage: 1,
          perPage: 10,
          totalItems: 0
        },
        productGroups: {
          currentPage: 1,
          perPage: 10,
          totalItems: 0
        },
        tickets: {
          currentPage: 1,
          perPage: 10,
          totalItems: 0
        },
      }
    };
  },
  created() {
    this.loadProducts();
    this.loadProductGroups();
    this.loadTickets();
  },
  methods: {
    fetchData(endpoint) {
      return axios.get(process.env.VUE_APP_URL + endpoint);
    },
    loadProducts() {
      this.fetchData(
        `products/${this.pagination.products.currentPage}/${this.pagination.products.perPage}`
      ).then(result => {
        this.pagination.products.totalItems =
          result.data.products.pagination.results;
        this.items.products = result.data.products.collection;
      });
    },
    loadProductGroups() {
      this.fetchData(
        `productGroups/${this.pagination.productGroups.currentPage}/${this.pagination.productGroups.perPage}`
      ).then(result => {
        this.pagination.productGroups.totalItems =
          result.data.productGroups.pagination.results;
        this.items.productGroups = result.data.productGroups.collection;
      });
    },
    loadTickets() {
      this.fetchData(
        `tickets`, {params: {
          page: this.pagination.tickets.page,
          results: this.pagination.tickets.perPage
        }}
      ).then(result => {
        this.pagination.tickets.totalItems =
          result.data.tickets.totalItemCount;
        this.items.tickets = result.data.tickets.items;
      });
    },
  },
  computed: {
    productsCurrentPage: function() {
      return this.pagination.products.currentPage;
    },
    productGroupsCurrentPage: function() {
      return this.pagination.productGroups.currentPage;
    },
    ticketsCurrentPage: function() {
      return this.pagination.tickets.currentPage;
    },
  },
  watch: {
    productsCurrentPage() {
      console.log(this.pagination.products.currentPage);
      this.loadProducts();
    },
    productGroupsCurrentPage() {
      console.log(this.pagination.productGroups.currentPage);
      this.loadProductGroups();
    },
    ticketsCurrentPage() {
      console.log(this.pagination.tickets.currentPage);
      this.loadTickets();
    },
  },
  filters: {
    timeEntryTotal: function(value) {
      //Taking the total minutes and total seconds from each ticket.
      var time = dayjs.duration({seconds: value.TotalDurationSeconds})
      
      //Returning the formatted time object as milliseconds formatted at HH:mm:ss in the table.
      return dayjs.utc(time.asMilliseconds()).format('HH:mm:ss');
    }
  }
};

//TODO: Add selection for how many products to show
//TODO: Add a dropdown for the time entries where the user can get more detailed information about time spent on the ticket.
//This is necessary due to limitations in the Atera API that you need to use a specific Ticket ID to get all of the specific time entries as opposed to just them
//when you get each ticket. We can't be making an API call for every single ticket as they're loaded in, as that's both slow and would result in filling up the
//calls per minute immediately, which would break site functionality for a full minute.
</script>

<style>
</style>
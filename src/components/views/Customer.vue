<template>
  <div id="wrapper">
    <div class="container-fluid">
      <h3 class="text-dark mb-4">{{customerInfo.name}} ({{customerInfo.customerNumber}})</h3>
      <div class="row mb-3">
        <div class="col-3">
          <div class="row mb-3">
            <div class="col">
              <div class="card shadow">
                <div class="card-header">
                  <div class="row">
                    <div class="col">
                      <h6 class="text-primary font-weight-bold">Customer Information</h6>
                    </div>
                  </div>
                </div>
                <div class="card-body shadow">
                  <div class="row">
                    <div class="col">
                      <div class="mb-3">
                        <h4 class="small font-weight-bold">Name</h4>
                        <h4 class="small">{{customerInfo.name}}</h4>
                      </div>
                      <div class="mb-3">
                        <h4 class="small font-weight-bold">Currency</h4>
                        <h4 class="small">{{customerInfo.currency}}</h4>
                      </div>
                    </div>
                    <div class="col">
                      <div class="mb-3">
                        <h4 class="small font-weight-bold">Customer Group</h4>
                        <h4 class="small">{{customerGroup}}</h4>
                      </div>
                      <div class="mb-3">
                        <h4 class="small font-weight-bold">Payment Terms</h4>
                        <h4 class="small">TempFiller</h4>
                      </div>
                    </div>
                  </div>
                  <div class="card shadow mb-3"></div>
                  <div class="row">
                    <div class="col">
                      <div class="mb-3">
                        <h4 class="small font-weight-bold">Phone Number</h4>
                        <h4
                          v-if="customerInfo.telephoneAndFaxNumber"
                          class="small"
                        >{{customerInfo.telephoneAndFaxNumber}}</h4>
                        <h4 v-else class="small">N/A</h4>
                      </div>
                    </div>
                    <div class="col">
                      <div class="mb-3">
                        <h4 class="small font-weight-bold">E-mail</h4>
                        <h4 class="small">{{customerInfo.email}}</h4>
                      </div>
                    </div>
                  </div>
                  <div class="card shadow mb-3"></div>
                  <div class="row">
                    <div class="col">
                      <div class="mb-3">
                        <h4 class="small font-weight-bold">Address</h4>
                        <h4 class="small">{{customerInfo.address}}</h4>
                      </div>
                      <div class="mb-3">
                        <h4 class="small font-weight-bold">ZIP Code</h4>
                        <h4 class="small">{{customerInfo.zip}}</h4>
                      </div>
                    </div>
                    <div class="col">
                      <div class="mb-3">
                        <h4 class="small font-weight-bold">City</h4>
                        <h4 class="small">{{customerInfo.city}}</h4>
                      </div>
                      <div class="mb-3">
                        <h4 class="small font-weight-bold">Country</h4>
                        <h4 class="small">{{customerInfo.country}}</h4>
                      </div>
                    </div>
                  </div>
                  <div class="card shadow mb-3"></div>
                  <div class="row mb-3">
                    <div class="col">
                      <button
                        class="btn btn-primary w-100"
                        onclick="window.location.href='domaineditform.html'"
                      >Manage Domain</button>
                    </div>
                    <div class="col">
                      <button
                        class="btn btn-primary w-100"
                        onclick="window.location.href='customereditform.html'"
                      >Edit Customer</button>
                    </div>
                  </div>
                  <div class="card shadow mb-3"></div>
                  <button class="btn btn-danger w-100">Delete Customer</button>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="card shadow">
                <div class="card-header">
                  <h6 class="text-primary font-weight-bold">Customer Call Log</h6>
                </div>
                <div class="card-body" style="height: 500px; max-height: 500px; overflow-y: auto;">
                  <div
                    class="rounded border w-100 pl-3 py-2 mb-3"
                    style="background-color: #f9f9f9;"
                  >
                    <div class="row">
                      <span class="small">06/05/2020 14:45:26</span>
                    </div>
                    <div class="row">
                      <span class="mr-1">Incoming Call from</span>
                      <span class="mr-1" style="color: limegreen;">12345678</span>
                      <span class="mr-1">to</span>
                      <span class="mr-1" style="color: limegreen;">87654321</span>
                    </div>
                    <div class="row">
                      <span class="mr-1">Duration:</span>
                      <span class="mr-1" style="color: limegreen;">0:21:45</span>
                    </div>
                    <div class="row">
                      <span class="mr-1">Waited for:</span>
                      <span class="mr-1" style="color: limegreen;">0:05:45</span>
                    </div>
                  </div>
                  <div
                    class="rounded border w-100 pl-3 py-2 mb-3"
                    style="background-color: #e2f4d0;"
                  >
                    <div class="row">
                      <span class="small">06/05/2020 14:45:26</span>
                    </div>
                    <div class="row">
                      <span class="mr-1">Outgoing Call from</span>
                      <span class="mr-1" style="color: limegreen;">12345678</span>
                      <span class="mr-1">to</span>
                      <span class="mr-1" style="color: limegreen;">87654321</span>
                    </div>
                    <div class="row">
                      <span class="mr-1">Duration:</span>
                      <span class="mr-1" style="color: limegreen;">0:21:45</span>
                    </div>
                  </div>
                  <div
                    class="rounded border w-100 pl-3 py-2 mb-3"
                    style="background-color: #f9f9f9;"
                  >
                    <div class="row">
                      <span class="small">06/05/2020 14:45:26</span>
                    </div>
                    <div class="row">
                      <span class="mr-1">Incoming Call from</span>
                      <span class="mr-1" style="color: limegreen;">12345678</span>
                      <span class="mr-1">to</span>
                      <span class="mr-1" style="color: limegreen;">87654321</span>
                    </div>
                    <div class="row">
                      <span class="mr-1">Duration:</span>
                      <span class="mr-1" style="color: limegreen;">0:21:45</span>
                    </div>
                    <div class="row">
                      <span class="mr-1">Waited for:</span>
                      <span class="mr-1" style="color: limegreen;">0:05:45</span>
                    </div>
                  </div>
                  <div
                    class="rounded border w-100 pl-3 py-2 mb-3"
                    style="background-color: #e2f4d0;"
                  >
                    <div class="row">
                      <span class="small">06/05/2020 14:45:26</span>
                    </div>
                    <div class="row">
                      <span class="mr-1">Outgoing Call from</span>
                      <span class="mr-1" style="color: limegreen;">12345678</span>
                      <span class="mr-1">to</span>
                      <span class="mr-1" style="color: limegreen;">87654321</span>
                    </div>
                    <div class="row">
                      <span class="mr-1">Duration:</span>
                      <span class="mr-1" style="color: limegreen;">0:21:45</span>
                    </div>
                  </div>
                  <div
                    class="rounded border w-100 pl-3 py-2 mb-3"
                    style="background-color: #f9f9f9;"
                  >
                    <div class="row">
                      <span class="small">06/05/2020 14:45:26</span>
                    </div>
                    <div class="row">
                      <span class="mr-1">Incoming Call from</span>
                      <span class="mr-1" style="color: limegreen;">12345678</span>
                      <span class="mr-1">to</span>
                      <span class="mr-1" style="color: limegreen;">87654321</span>
                    </div>
                    <div class="row">
                      <span class="mr-1">Duration:</span>
                      <span class="mr-1" style="color: limegreen;">0:21:45</span>
                    </div>
                    <div class="row">
                      <span class="mr-1">Waited for:</span>
                      <span class="mr-1" style="color: limegreen;">0:05:45</span>
                    </div>
                  </div>
                  <div
                    class="rounded border w-100 pl-3 py-2 mb-3"
                    style="background-color: #e2f4d0;"
                  >
                    <div class="row">
                      <span class="small">06/05/2020 14:45:26</span>
                    </div>
                    <div class="row">
                      <span class="mr-1">Outgoing Call from</span>
                      <span class="mr-1" style="color: limegreen;">12345678</span>
                      <span class="mr-1">to</span>
                      <span class="mr-1" style="color: limegreen;">87654321</span>
                    </div>
                    <div class="row">
                      <span class="mr-1">Duration:</span>
                      <span class="mr-1" style="color: limegreen;">0:21:45</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <b-col style="position: relative;">
          <div style="height: 100%;">
            <b-card no-body class="class shadow" style="height: 100%;">
              <b-tabs card fill>
                <b-tab title="Employees" active>
                  <b-card-text>
                    <b-row>
                      <div v-for="(contact, idx) in contacts" :key="idx" class="col-4">
                        <b-link :to="{ path: '/contact/', query: {contactid: contact.EndUserID}}">
                          <div class="card btn mb-3 btn-light p-3" style="height: 140px;">
                            <div class="row ml-3">
                              <h5
                                class="m-0 font-weight-bold"
                              >{{contact.Firstname}} {{contact.Lastname}}</h5>
                            </div>
                            <div class="row ml-3">
                              <h6 class="small"></h6>
                            </div>
                            <div v-if="contact.Phone" class="row ml-3">
                              <span class="fa fa-phone fa-fw mr-1"></span>
                              <h6>{{contact.Phone}}</h6>
                            </div>
                            <div v-if="contact.Email" class="row ml-3">
                              <span class="fa fa-at fa-fw mr-1"></span>
                              <h6>{{contact.Email}}</h6>
                            </div>
                          </div>
                        </b-link>
                      </div>
                    </b-row>
                    <b-pagination/>
                  </b-card-text>
                </b-tab>
                <b-tab title="Contracts" v-on:click="loadContracts">
                  <b-card-text>
                    <b-row v-if="contracts">
                      <div class="container p-0 mr-0 mb-2">
                        <div class="text-right">
                          <button
                            id="addContactButton"
                            onclick="window.location.href = 'contractform.html';"
                            class="btn btn-primary ml-3 btn-sm"
                          >Create Contract</button>
                        </div>
                      </div>
                      <div v-for="(contract, idx) in contracts" :key="idx" class="pl-4 col-6">
                        <div class="card mb-3" style="color: black;">
                          <div class="container h-100 pl-0">
                            <div class="row">
                              <div
                                class="col-2 bg-success d-flex align-items-center justify-content-center"
                              >
                                <i class="fa rel fa-bookmark" style="font-size: 30px;"></i>
                              </div>
                              <div class="col py-3">
                                <div class="row ml-1">
                                  <h6 class>{{contract.ContractName}} - {{contract.ContractType}}</h6>
                                </div>
                                <div class="row ml-1">
                                  <h5 class="font-weight-bold">{{contract.StartDate | moment}} - {{contract.EndDate | moment}}</h5>
                                </div>
                                  <div v-if="contract.RetainerFlatFeeContract !== null" class="row ml-1">
                                    <h6 id="hourly-rate">{{contract.RetainerFlatFeeContract.Rate.Description}} - {{contract.RetainerFlatFeeContract.Amount}}{{customerInfo.currency}}</h6>
                                  </div>
                                  <div v-if="contract.HourlyContract !== null">
                                    <div class="row ml-1">
                                      <h6 id="hourly-rate">{{contract.HourlyContract.PrimaryRate.Description}} - {{contract.HourlyContract.PrimaryRate.Amount}}{{customerInfo.currency}}</h6>
                                    </div>
                                    <div v-for="(rate, idx) in contract.HourlyContract.AdditionalRates" :key="idx" class="row ml-1">
                                      <h6 id="hourly-rate">{{rate.Description}} - {{rate.Amount}}{{customerInfo.currency}}</h6>
                                    </div>                        
                                  </div>
                                  <div v-if="contract.BlockMoneyContract !== null">
                                    <div class="row ml-1">
                                      <h6 id="hourly-rate">{{contract.BlockMoneyContract.ContractAmount.Description}} - {{contract.BlockMoneyContract.ContractAmount.Amount}}{{customerInfo.currency}}</h6>
                                    </div>
                                    <div class="row ml-1">
                                      <h6 id="hourly-rate">{{contract.BlockMoneyContract.PrimaryRate.Description}} - {{contract.BlockMoneyContract.PrimaryRate.Amount}}{{customerInfo.currency}}</h6>
                                    </div>
                                    <div v-for="(rate, idx) in contract.BlockMoneyContract.AdditionalRates" :key="idx" class="row ml-1">
                                      <h6 id="hourly-rate">{{rate.Description}} - {{rate.Amount}}{{customerInfo.currency}}</h6>
                                    </div>                        
                                  </div>
                                  <div v-if="contract.RemoteMonitoringContract !== null">
                                    <div class="row ml-1">
                                      <h6 id="hourly-rate">{{contract.RemoteMonitoringContract.RatePerDevice.Description}} - {{contract.RemoteMonitoringContract.RatePerDevice.Amount}}{{customerInfo.currency}}</h6>
                                    </div>
                                  </div>
                                  <div v-if="contract.OnlineBackupContract !== null">
                                    <div class="row ml-1">
                                      <h6 id="hourly-rate">{{contract.OnlineBackupContract.RatePerGB.Description}} - {{contract.OnlineBackupContract.RatePerGB.Amount}}{{customerInfo.currency}}</h6>
                                    </div>                     
                                  </div>
                                  <div v-if="contract.ProjectOneTimeFeeContract !== null">
                                    <div class="row ml-1">
                                      <h6 id="hourly-rate">{{contract.ProjectOneTimeFeeContract.TotalAmount.Description}} - {{contract.ProjectOneTimeFeeContract.TotalAmount.Amount}}{{customerInfo.currency}}</h6>
                                    </div>              
                                  </div>
                                  <div v-if="contract.ProjectHourlyRateContract !== null">
                                    <div class="row ml-1">
                                      <h6 id="hourly-rate">{{contract.ProjectHourlyRateContract.PrimaryRate.Description}} - {{contract.ProjectHourlyRateContract.PrimaryRate.Amount}}{{customerInfo.currency}}</h6>
                                    </div>
                                    <div v-for="(rate, idx) in contract.ProjectHourlyRateContract.AdditionalRates" :key="idx" class="row ml-1">
                                      <h6 id="hourly-rate">{{rate.Description}} - {{rate.Amount}}{{customerInfo.currency}}</h6>
                                    </div>                        
                                  </div>
                                <div class="row ml-1">
                                  <div class="container p-0">
                                    <div class="text-right">
                                      <button
                                        class="btn btn-primary btn-sm text-right"
                                        data-toggle="tooltip"
                                        title="Clone Contract"
                                      >
                                        <i class="fa fa-file"></i>
                                      </button>
                                      <button
                                        class="btn btn-primary btn-sm text-right"
                                        data-toggle="tooltip"
                                        title="Edit Contract"
                                      >
                                        <i class="fa fa-pen"></i>
                                      </button>
                                      <button
                                        class="btn btn-primary btn-sm text-right"
                                        data-toggle="tooltip"
                                        title="Delete Contract" 
                                      >
                                        <i class="fa fa-trash"></i> 
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </b-row>
                    <b-pagination/>
                  </b-card-text>
                </b-tab>
                <b-tab title="Assets">
                  <b-card-text>Tab contents 2</b-card-text>
                </b-tab>
                <b-tab title="Tickets">
                  <b-card-text>Passwords</b-card-text>
                </b-tab>
                <b-tab title="Passwords">
                  <b-card-text>Attachments</b-card-text>
                </b-tab>
                <b-tab title="Attachments">
                  <b-card-text></b-card-text>
                </b-tab>
                <b-tab title="Invoices">
                  <b-card-text>Tab contents 2</b-card-text>
                </b-tab>
                <b-tab title="Subscriptions">
                  <b-card-text>Tab contents 2</b-card-text>
                </b-tab>
                <b-tab title="DNS">
                  <b-card-text>Tab contents 2</b-card-text>
                </b-tab>
                <b-tab title="Backup">
                  <b-card-text>Tab contents 2</b-card-text>
                </b-tab>
              </b-tabs>
            </b-card>
          </div>
          <!---
          <div class="card-header shadow p-0">
            <ul class="nav nav-tabs">
              <li class="nav-item">
                <a
                  class="nav-link text-primary m-0 font-weight-bold pb-3"
                  href="#contracts"
                  data-toggle="tab"
                >Contracts</a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link text-primary m-0 font-weight-bold pb-3"
                  href="#assets"
                  data-toggle="tab"
                >Assets</a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link text-primary m-0 font-weight-bold pb-3"
                  href="#tickets"
                  data-toggle="tab"
                >Tickets</a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link text-primary m-0 font-weight-bold pb-3"
                  href="#passwords"
                  data-toggle="tab"
                >Passwords</a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link text-primary m-0 font-weight-bold pb-3"
                  href="#attachments"
                  data-toggle="tab"
                >Attachments</a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link text-primary m-0 font-weight-bold pb-3"
                  href="#invoices"
                  data-toggle="tab"
                >Invoices</a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link text-primary m-0 font-weight-bold pb-3"
                  href="#subscriptions"
                  data-toggle="tab"
                >Subscriptions</a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link text-primary m-0 font-weight-bold pb-3"
                  href="#subscriptions"
                  data-toggle="tab"
                >DNS</a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link text-primary m-0 font-weight-bold pb-3"
                  href="#subscriptions"
                  data-toggle="tab"
                >Backup</a>
              </li>
            </ul>
          </div>
          <div class="tab-content card" style="height: 95%;">
            <div class="tab-pane" id="passwords" style="height:100%;">
              <div class="card-body shadow" style="min-height: 100%;">
                <table class="table dataTable m-0">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Usage</th>
                      <th>Username</th>
                      <th>Password</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class style="width: 1%; ">
                        <span
                          class="fa fa-plus btn chevron-btn"
                          data-toggle="collapse"
                          data-target="#loginData"
                        ></span>
                      </td>
                      <td>Router</td>
                      <td>User123</td>
                      <td>********</td>
                    </tr>
                    <tr>
                      <td colspan="6 " class="hiddenRow">
                        <div class="accordion-body collapse" id="loginData">
                          <div class="row m-0">
                            <div class="col">
                              <div class="row">
                                <p class="text-primary font-weight-bold">Name</p>
                              </div>
                              <div class="row">
                                <p class="text-primary font-weight-bold">Category</p>
                              </div>
                              <div class="row">
                                <p class="text-primary font-weight-bold">Domain</p>
                              </div>
                              <div class="row">
                                <p class="text-primary font-weight-bold">Extra Value (Numeric)</p>
                              </div>
                              <div class="row">
                                <p class="text-primary font-weight-bold">Notes</p>
                              </div>
                            </div>
                            <div class="col">
                              <div class="row">
                                <p>Router</p>
                              </div>
                              <div class="row">
                                <p>Router/Firewall</p>
                              </div>
                              <div class="row">
                                <p>n/a</p>
                              </div>
                              <div class="row">
                                <p>n/a</p>
                              </div>
                              <div class="row">
                                <p>n/a</p>
                              </div>
                            </div>
                            <div class="col">
                              <div class="row">
                                <p class="text-primary font-weight-bold">Username</p>
                              </div>
                              <div class="row">
                                <p class="text-primary font-weight-bold">Password</p>
                              </div>
                              <div class="row">
                                <p class="text-primary font-weight-bold">Login URL</p>
                              </div>
                              <div class="row">
                                <p class="text-primary font-weight-bold">Created On</p>
                              </div>
                              <div class="row">
                                <p class="text-primary font-weight-bold">Last Modified</p>
                              </div>
                            </div>
                            <div class="col">
                              <div class="row">
                                <p>User123</p>
                              </div>
                              <div class="row">
                                <p>********</p>
                              </div>
                              <div class="row">
                                <p>127.0.0.1</p>
                              </div>
                              <div class="row">
                                <p>Mar 23, 2020</p>
                              </div>
                              <div class="row">
                                <p>Mar 23, 2020</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span
                          class="fa fa-plus btn chevron-btn"
                          data-toggle="collapse"
                          data-target="#loginData1"
                        ></span>
                      </td>
                      <td>Webserver</td>
                      <td>User1215</td>
                      <td>******</td>
                    </tr>
                    <tr>
                      <td colspan="6 " class="hiddenRow">
                        <div class="accordion-body collapse" id="loginData1">
                          <div class="row m-0">
                            <div class="col">
                              <div class="row">
                                <p class="text-primary font-weight-bold">Name</p>
                              </div>
                              <div class="row">
                                <p class="text-primary font-weight-bold">Category</p>
                              </div>
                              <div class="row">
                                <p class="text-primary font-weight-bold">Domain</p>
                              </div>
                              <div class="row">
                                <p class="text-primary font-weight-bold">Extra Value (Numeric)</p>
                              </div>
                              <div class="row">
                                <p class="text-primary font-weight-bold">Notes</p>
                              </div>
                            </div>
                            <div class="col">
                              <div class="row">
                                <p>Webserver</p>
                              </div>
                              <div class="row">
                                <p>Server</p>
                              </div>
                              <div class="row">
                                <p>n/a</p>
                              </div>
                              <div class="row">
                                <p>n/a</p>
                              </div>
                              <div class="row">
                                <p>n/a</p>
                              </div>
                            </div>
                            <div class="col">
                              <div class="row">
                                <p class="text-primary font-weight-bold">Username</p>
                              </div>
                              <div class="row">
                                <p class="text-primary font-weight-bold">Password</p>
                              </div>
                              <div class="row">
                                <p class="text-primary font-weight-bold">Login URL</p>
                              </div>
                              <div class="row">
                                <p class="text-primary font-weight-bold">Created On</p>
                              </div>
                              <div class="row">
                                <p class="text-primary font-weight-bold">Last Modified</p>
                              </div>
                            </div>
                            <div class="col">
                              <div class="row">
                                <p>User123</p>
                              </div>
                              <div class="row">
                                <p>******</p>
                              </div>
                              <div class="row">
                                <p>127.0.0.1</p>
                              </div>
                              <div class="row">
                                <p>Mar 23, 2020</p>
                              </div>
                              <div class="row">
                                <p>Mar 23, 2020</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="tab-pane" id="contracts" style="height:100%;">
              <div class="card-body shadow py-2" style="min-height: 100%;">
                <div class="container p-0 mr-0 mb-2">
                  <div class="text-right">
                    <button
                      id="addContactButton"
                      onclick="window.location.href = 'contractform.html';"
                      class="btn btn-primary ml-3 btn-sm"
                    >Create Contract</button>
                  </div>
                </div>
                <div class="row">
                  <div class="pl-4 col-6">
                    <div class="card mb-3" style="color: black;">
                      <div class="container h-100 pl-0">
                        <div class="row">
                          <div
                            class="col-2 bg-success d-flex align-items-center justify-content-center"
                          >
                            <i class="fa rel fa-bookmark" style="font-size: 30px;"></i>
                          </div>
                          <div class="col py-3">
                            <div class="row ml-1">
                              <h6 class>Support - Hourly</h6>
                            </div>
                            <div class="row ml-1">
                              <h5 class="font-weight-bold">Mar 21, 2019 - Mar 20, 2024</h5>
                            </div>
                            <div class="row ml-1">
                              <h6 id="hourly-rate">Rate: Standard hourly - 1249.00DKK</h6>
                            </div>
                            <div class="row ml-1">
                              <h6 class>Rate: Evening/Night - 2498.00DKK</h6>
                            </div>
                            <div class="row ml-1">
                              <h6 class>SLA: None</h6>
                            </div>
                            <div class="row ml-1">
                              <div class="container p-0">
                                <div class="text-right">
                                  <button
                                    class="btn btn-primary btn-sm text-right"
                                    data-toggle="tooltip"
                                    title="Clone Contract"
                                  >
                                    <i class="fa fa-file"></i>
                                  </button>
                                  <button
                                    class="btn btn-primary btn-sm text-right"
                                    data-toggle="tooltip"
                                    title="Edit Contract"
                                  >
                                    <i class="fa fa-pen"></i>
                                  </button>
                                  <button
                                    class="btn btn-primary btn-sm text-right"
                                    data-toggle="tooltip"
                                    title="Delete Contract"
                                  >
                                    <i class="fa fa-trash"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="pl-4 col-6">
                    <div class="card mb-3" style="color: black;">
                      <div class="container h-100 pl-0">
                        <div class="row">
                          <div
                            class="col-2 bg-success d-flex align-items-center justify-content-center"
                          >
                            <i class="fa rel fa-bookmark" style="font-size: 30px;"></i>
                          </div>
                          <div class="col py-3">
                            <div class="row ml-1">
                              <h6 class>Support - Hourly</h6>
                            </div>
                            <div class="row ml-1">
                              <h5 class="font-weight-bold">Mar 21, 2019 - Mar 20, 2024</h5>
                            </div>
                            <div class="row ml-1">
                              <h6 id="hourly-rate">Rate: Standard hourly - 1249.00DKK</h6>
                            </div>
                            <div class="row ml-1">
                              <h6 class>Rate: Evening/Night - 2498.00DKK</h6>
                            </div>
                            <div class="row ml-1">
                              <h6 class>SLA: None</h6>
                            </div>
                            <div class="row ml-1">
                              <div class="container p-0">
                                <div class="text-right">
                                  <button
                                    class="btn btn-primary btn-sm text-right"
                                    data-toggle="tooltip"
                                    title="Clone Contract"
                                  >
                                    <i class="fa fa-file"></i>
                                  </button>
                                  <button
                                    class="btn btn-primary btn-sm text-right"
                                    data-toggle="tooltip"
                                    title="Edit Contract"
                                  >
                                    <i class="fa fa-pen"></i>
                                  </button>
                                  <button
                                    class="btn btn-primary btn-sm text-right"
                                    data-toggle="tooltip"
                                    title="Delete Contract"
                                  >
                                    <i class="fa fa-trash"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="pl-4 col-6">
                    <div class="card mb-3" style="color: black;">
                      <div class="container h-100 pl-0">
                        <div class="row">
                          <div
                            class="col-2 bg-success d-flex align-items-center justify-content-center"
                          >
                            <i class="fa rel fa-bookmark" style="font-size: 30px;"></i>
                          </div>
                          <div class="col py-3">
                            <div class="row ml-1">
                              <h6 class>Support - Hourly</h6>
                            </div>
                            <div class="row ml-1">
                              <h5 class="font-weight-bold">Mar 21, 2019 - Mar 20, 2024</h5>
                            </div>
                            <div class="row ml-1">
                              <h6 id="hourly-rate">Rate: Standard hourly - 1249.00DKK</h6>
                            </div>
                            <div class="row ml-1">
                              <h6 class>Rate: Evening/Night - 2498.00DKK</h6>
                            </div>
                            <div class="row ml-1">
                              <h6 class>SLA: None</h6>
                            </div>
                            <div class="row ml-1">
                              <div class="container p-0">
                                <div class="text-right">
                                  <button
                                    class="btn btn-primary btn-sm text-right"
                                    data-toggle="tooltip"
                                    title="Clone Contract"
                                  >
                                    <i class="fa fa-file"></i>
                                  </button>
                                  <button
                                    class="btn btn-primary btn-sm text-right"
                                    data-toggle="tooltip"
                                    title="Edit Contract"
                                  >
                                    <i class="fa fa-pen"></i>
                                  </button>
                                  <button
                                    class="btn btn-primary btn-sm text-right"
                                    data-toggle="tooltip"
                                    title="Delete Contract"
                                  >
                                    <i class="fa fa-trash"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="tab-pane" id="assets" style="height:100%;">
              <div class="card-body shadow" style="min-height: 100%;">
                <div
                  class="table-responsive table mt-2"
                  id="dataTable"
                  role="grid"
                  aria-describedby="dataTable_info"
                >
                  <table class="table dataTable my-0" id="dataTable">
                    <thead>
                      <tr>
                        <th>Asset</th>
                        <th>Status</th>
                        <th>Alerts</th>
                        <th>Actions</th>
                        <th>Visibility</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>DSAP01</td>
                        <td>Online</td>
                        <td></td>
                        <td>
                          <button class="btn btn-primary btn-sm">Connect</button>
                        </td>
                        <td>
                          <input type="checkbox" checked />
                          <span>Visible to customer</span>
                        </td>
                      </tr>
                      <tr>
                        <td>DSAP02</td>
                        <td>Offline</td>
                        <td>2</td>
                        <td>
                          <button class="btn btn-primary btn-sm">Connect</button>
                        </td>
                        <td>
                          <input type="checkbox" />
                          <span>Visible to customer</span>
                        </td>
                      </tr>
                      <tr>
                        <td>DSAC01</td>
                        <td>Offline</td>
                        <td>3</td>
                        <td>
                          <button class="btn btn-primary btn-sm">Connect</button>
                        </td>
                        <td>
                          <input type="checkbox" checked />
                          <span>Visible to customer</span>
                        </td>
                      </tr>
                      <tr>
                        <td>DSAC02</td>
                        <td>Online</td>
                        <td></td>
                        <td>
                          <button class="btn btn-primary btn-sm">Connect</button>
                        </td>
                        <td>
                          <input type="checkbox" checked />
                          <span>Visible to customer</span>
                        </td>
                      </tr>
                      <tr>
                        <td>DSAC03</td>
                        <td>Online</td>
                        <td></td>
                        <td>
                          <button class="btn btn-primary btn-sm">Connect</button>
                        </td>
                        <td>
                          <input type="checkbox" checked />
                          <span>Visible to customer</span>
                        </td>
                      </tr>
                      <tr>
                        <td>DSAP01</td>
                        <td>Online</td>
                        <td></td>
                        <td>
                          <button class="btn btn-primary btn-sm">Connect</button>
                        </td>
                        <td>
                          <input type="checkbox" />
                          <span>Visible to customer</span>
                        </td>
                      </tr>
                      <tr>
                        <td>DSAP01</td>
                        <td>Online</td>
                        <td></td>
                        <td>
                          <button class="btn btn-primary btn-sm">Connect</button>
                        </td>
                        <td>
                          <input type="checkbox" />
                          <span>Visible to customer</span>
                        </td>
                      </tr>
                      <tr>
                        <td>DSAP01</td>
                        <td>Online</td>
                        <td></td>
                        <td>
                          <button class="btn btn-primary btn-sm">Connect</button>
                        </td>
                        <td>
                          <input type="checkbox" checked />
                          <span>Visible to customer</span>
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td>
                          <strong>Asset</strong>
                        </td>
                        <td>
                          <strong>Status</strong>
                        </td>
                        <td>
                          <strong>Alerts</strong>
                        </td>
                        <td>
                          <strong>Actions</strong>
                        </td>
                        <td>
                          <strong>Visibility</strong>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
            <div class="tab-pane" id="tickets" style="height:100%;">
              <div class="card-body shadow" style="min-height: 100%;">
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
                        <th>Date of Creation</th>
                        <th>Last Updated</th>
                        <th>Status</th>
                        <th>Reply Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td></td>
                        <td>
                          <a href="/ticket/"></a>
                        </td>
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
            <div class="tab-pane" id="attachments" style="height:100%;">
              <div class="card-body shadow" style="min-height: 100%;">
                <div
                  class="table-responsive table mt-2"
                  id="dataTable"
                  role="grid"
                  aria-describedby="dataTable_info"
                >
                  <table class="table dataTable my-0" id="dataTable">
                    <thead>
                      <tr>
                        <th>File Name</th>
                        <th>Actions</th>
                        <th>Uploaded On</th>
                        <th>Visibility</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Serial Numbers.pdf</td>
                        <td>
                          <button class="btn btn-primary btn-sm">Download</button>
                          <button class="btn btn-danger btn-sm">Delete</button>
                        </td>
                        <td>27/03/2020</td>
                        <td>
                          <input type="checkbox" />
                          <span>Visible to customer</span>
                        </td>
                      </tr>
                      <tr>
                        <td>Office 365 Instructions.pdf</td>
                        <td>
                          <button class="btn btn-primary btn-sm">Download</button>
                          <button class="btn btn-danger btn-sm">Delete</button>
                        </td>
                        <td>22/03/2020</td>
                        <td>
                          <input type="checkbox" checked />
                          <span>Visible to customer</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="tab-pane" id="invoices" style="height:100%;">
              <div class="card-body shadow" style="min-height: 100%;">
                <div
                  class="table-responsive table mt-2"
                  id="dataTable"
                  role="grid"
                  aria-describedby="dataTable_info"
                >
                  <table class="table dataTable my-0" id="dataTable">
                    <thead>
                      <tr>
                        <th>Invoice ID</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <a href="#">#004</a>
                        </td>
                        <td>30/04/2020</td>
                      </tr>
                      <tr>
                        <td>
                          <a href="#">#003</a>
                        </td>
                        <td>28/03/2020</td>
                      </tr>
                      <tr>
                        <td>
                          <a href="#">#002</a>
                        </td>
                        <td>27/03/2020</td>
                      </tr>
                      <tr>
                        <td>
                          <a href="#">#001</a>
                        </td>
                        <td>16/02/2020</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="tab-pane" id="subscriptions" style="height:100%;">
              <div class="card-body shadow py-2" style="min-height: 100%;">
                <div class="container p-0 mr-0 mb-2">
                  <div class="text-right">
                    <button
                      class="btn btn-primary ml-3 btn-sm"
                      data-toggle="modal"
                      data-target="#subscriptionform"
                    >Add Subscription</button>
                  </div>
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
                        <th>Start/End Date</th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Invoice Interval</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div class="row ml-1">05/02/2020</div>
                          <div class="row ml-1">
                            <span style="color: #e74a3b;">05/06/2020</span>
                          </div>
                        </td>
                        <td>Webserver</td>
                        <td>$335</td>
                        <td>Monthly</td>
                      </tr>
                      <tr>
                        <td>
                          <div class="row ml-1">05/02/2020</div>
                          <div class="row ml-1">
                            <span style="color: #e74a3b;">05/06/2020</span>
                          </div>
                        </td>
                        <td>Phone Support</td>
                        <td>$200</td>
                        <td>Bi-Monthly</td>
                      </tr>
                      <tr>
                        <td>
                          <div class="row ml-1">05/02/2020</div>
                          <div class="row ml-1">
                            <span style="color: #e74a3b;">05/06/2020</span>
                          </div>
                        </td>
                        <td>Cloud Storage</td>
                        <td>$610</td>
                        <td>Annually</td>
                      </tr>
                      <tr>
                        <td>
                          <div class="row ml-1">05/02/2020</div>
                          <div class="row ml-1">
                            <span style="color: #e74a3b;">05/06/2020</span>
                          </div>
                        </td>
                        <td>Webserver</td>
                        <td>$10200</td>
                        <td>Annually</td>
                      </tr>
                      <tr>
                        <td>
                          <div class="row ml-1">05/02/2020</div>
                          <div class="row ml-1">
                            <span style="color: #e74a3b;">05/06/2020</span>
                          </div>
                        </td>
                        <td>Website hosting</td>
                        <td>$5000</td>
                        <td>Annually</td>
                      </tr>
                      <tr>
                        <td>
                          <div class="row ml-1">05/02/2020</div>
                          <div class="row ml-1">
                            <span style="color: #e74a3b;">05/06/2020</span>
                          </div>
                        </td>
                        <td>Microsoft Office Support</td>
                        <td>$2205</td>
                        <td>Monthly</td>
                      </tr>
                      <tr>
                        <td>
                          <div class="row ml-1">05/02/2020</div>
                          <div class="row ml-1">
                            <span style="color: #e74a3b;">05/06/2020</span>
                          </div>
                        </td>
                        <td>Cloud Storage/td></td>
                        <td>$200</td>
                        <td>Monthly</td>
                      </tr>
                      <tr>
                        <td>
                          <div class="row ml-1">05/02/2020</div>
                          <div class="row ml-1">
                            <span style="color: #e74a3b;">05/06/2020</span>
                          </div>
                        </td>
                        <td>Backup Service</td>
                        <td>$354</td>
                        <td>Annually</td>
                      </tr>
                      <tr>
                        <td>
                          <div class="row ml-1">05/02/2020</div>
                          <div class="row ml-1">
                            <span style="color: #e74a3b;">05/06/2020</span>
                          </div>
                        </td>
                        <td>Website</td>
                        <td>$4602</td>
                        <td>Bi-Monthly</td>
                      </tr>
                      <tr>
                        <td>
                          <div class="row ml-1">05/02/2020</div>
                          <div class="row ml-1">
                            <span style="color: #e74a3b;">05/06/2020</span>
                          </div>
                        </td>
                        <td>Website</td>
                        <td>$2252</td>
                        <td>Annually</td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td>
                          <strong>Start/End Date</strong>
                        </td>
                        <td>
                          <strong>Product</strong>
                        </td>
                        <td>
                          <strong>Price</strong>
                        </td>
                        <td>
                          <strong>Invoice Interval</strong>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
            <div
              class="modal fade"
              id="subscriptionform"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalCenterTitle"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Add Subscription</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <form>
                      <div class="form-row">
                        <div class="col">
                          <div class="form-group">
                            <label for="name">
                              <strong>Product</strong>
                            </label>
                            <select class="form-control">
                              <option>Webserver</option>
                              <option>Cloud Hosting</option>
                              <option>Phone Support</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="form-row">
                        <div class="col">
                          <div class="form-group">
                            <label for="startdate">
                              <strong>Start Date</strong>
                            </label>
                            <input
                              class="form-control"
                              type="date"
                              value="Copenhagen"
                              name="startdate"
                            />
                          </div>
                        </div>
                        <div class="col">
                          <div class="form-group">
                            <label for="enddate">
                              <strong>End Date</strong>
                            </label>
                            <input class="form-control" value type="date" name="enddate" />
                          </div>
                        </div>
                      </div>
                      <div class="form-row">
                        <div class="col">
                          <div class="form-group">
                            <label for="price">
                              <strong>Price</strong>
                            </label>
                            <input class="form-control" type="number" value="0" name="price" />
                          </div>
                        </div>
                        <div class="col">
                          <div class="form-group">
                            <label for="address">
                              <strong>Invoice Interval</strong>
                            </label>
                            <select class="form-control">
                              <option>Monthly</option>
                              <option>Bi-Monthly</option>
                              <option>Annually</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save Subscription</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          -- End of old tab-box-->
        </b-col>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
  data() {
    return {
      fields: [
        {
          key: "BusinessNumber",
          label: "Customer ID"
        }
      ],
      customerInfo: {},
      customerGroup: 0,
      contacts: [],
      contracts: [],
      ateraid: {},
      id: this.$route.query.customerID
    };
  },
  created() {
    this.fetchData("customer/" + this.id).then(response => {
      const data = response.data;
      this.customerInfo = data.customer;
      this.contacts = data.contacts;
      this.customerGroup = data.customerGroup;
      this.ateraid = data.apiInfo
      // this.currentPage = data.page;
      // this.totalItems = data.totalItemCount
      // this.perPage = data.itemsInPage;
      console.log(this.customerInfo);
    });
  },
  methods: {
    fetchData(endpoint) {
      return axios.get(process.env.VUE_APP_URL + endpoint);
    },
    loadContracts: function() {
      this.fetchData('contracts/' + this.ateraid).then(response => {
        this.contracts = response.data.contracts;
      });
    },
    moment: function() {
      return moment();
    }
  },
  filters: {
    moment: function (date) {
      return moment(date).format('MMM Do YYYY');
    }
  }
};
</script>
<template>
  <div id="wrapper">
    <div class="container-fluid">
      <h3 class="text-dark mb-4">Asset ID: {{assetInfo.AgentID}}</h3>
      <b-row>
        <b-col cols="3">
          <b-card no-body class="shadow">
            <b-card-header>Asset Information</b-card-header>
            <b-card-body>
              <b-row class="ml-0">
                <b-col>
                  <h4 class="small font-weight-bold">Name</h4>
                  <h4 class="small">{{assetInfo.AgentName}}</h4>
                </b-col>
                <b-col>
                  <h4 class="small font-weight-bold">Domain</h4>
                  <h4 class="small">{{assetInfo.DomainName}}</h4>
                </b-col>
              </b-row>
              <b-row class="ml-0">
                <b-col>
                  <h4 class="small font-weight-bold">Last User</h4>
                  <h4 class="small">{{assetInfo.LastLoginUser}}</h4>
                </b-col>
                <b-col>
                  <h4 class="small font-weight-bold">Last User</h4>
                  <h4 class="small">{{assetInfo.LastLoginUser}}</h4>
                </b-col>
              </b-row>
            </b-card-body>
          </b-card>
        </b-col>
        <b-col>
          <b-card no-body class="shadow">
            <b-row>
              <b-col>
                <b-card-header>
                  Software & Hardware Information
                </b-card-header>
                <b-card>
                    <b-row>
                      <b-col>
                        <h4>Software</h4>
                        <b-row>
                          <b-col>
                            <span class="font-weight-bold">Vendor </span>
                            <span>Test</span>
                          </b-col>
                          <b-col>
                            <span class="font-weight-bold block">Model</span>
                            <span class="block">Test</span>
                          </b-col>
                        </b-row>
                      </b-col>
                      <b-card no-body class="shadow"></b-card>
                      <b-col>
                        <h4>Hardware</h4>
                        <b-row>
                          <b-col>
                            <span class="font-weight-bold block">Vendor</span>
                            <span class="block">Test</span>
                          </b-col>
                          <b-col>
                            <span class="font-weight-bold block">Model</span>
                            <span class="block">Test</span>
                          </b-col>
                          <b-col>
                            <span class="font-weight-bold block">Serial Number</span>
                            <span class="block">Test</span>
                          </b-col>
                          <b-col>
                            <span class="font-weight-bold block">Motherboard</span>
                            <span class="block">Test</span>
                          </b-col>
                          <b-col>
                            <span class="font-weight-bold block">Processor</span>
                            <span class="block">Test</span>
                          </b-col>
                          <b-col></b-col>
                        </b-row>
                      </b-col>
                    </b-row>
                </b-card>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      assetInfo: {},
    };
  },
  created() {
    this.fetchData(`asset/${this.$route.query.assetID}`).then((response) => {
      console.log(response.data.asset);
      this.assetInfo = response.data.asset;
    });
  },
  methods: {
    fetchData(endpoint) {
      return axios.get(process.env.VUE_APP_URL + endpoint);
    },
  },
};
</script>

<style scoped>
span.block {
  display: block;
}
</style>
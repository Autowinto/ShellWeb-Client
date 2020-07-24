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
                  <h4 class="small font-weight-bold">Name </h4>
                  <h4 class="small">{{assetInfo.AgentName}}</h4>
                </b-col>
                <b-col>
                  <h4 class="small font-weight-bold">Domain </h4>
                  <h4 class="small">{{assetInfo.DomainName}}</h4>
                </b-col>
              </b-row>
              <b-row class="ml-0">
                <b-col>
                  <h4 class="small font-weight-bold">Last User </h4>
                  <h4 class="small">{{assetInfo.LastLoginUser}}</h4>
                </b-col>
                <b-col>
                  <h4 class="small font-weight-bold">Last User </h4>
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
            <b-card-header>Hardware</b-card-header>
            <b-card-body>Test</b-card-body>
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
      assetInfo: {}
    };
  },
  created() {
    this.fetchData(`asset/${this.$route.query.assetID}`).then(response => {
      console.log(response.data.asset);
      this.assetInfo = response.data.asset;
    });
  },
  methods: {
    fetchData(endpoint) {
      return axios.get(process.env.VUE_APP_URL + endpoint);
    }
  }
};
</script>
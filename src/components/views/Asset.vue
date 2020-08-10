<template>
  <div id="wrapper">
    <div class="container-fluid">
      <h3 class="text-dark mb-4">{{assetInfo.AgentName}} ({{assetInfo.AgentID}})</h3>
      <b-row class="mb-3">
        <b-col v-for="disk in assetInfo.HardwareDisks" :key="disk.id" cols="4">
          <b-card class="border-left-primary">
            <h5>{{disk.Drive}}</h5>
            <h6>Free: {{disk.Free}}MB</h6>
            <h6>Used: {{disk.Used}}MB</h6>
            <h6>Total: {{disk.Total}}MB</h6>
            <b-progress v-if="disk.Used / disk.Total * 100 < 50" variant="success" height="30px" show-progress :value="disk.Used / disk.Total * 100"></b-progress>
            <b-progress v-else-if="disk.Used / disk.Total * 100 >= 50" variant="warning" height="30px" show-progress :value="disk.Used / disk.Total * 100"></b-progress>
            <b-progress v-else-if="20 >= 75" variant="danger" height="30px" show-progress :value="disk.Used / disk.Total * 100"></b-progress>
          </b-card>
        </b-col>
      </b-row>
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
                <b-card-header>Software & Hardware Information</b-card-header>
                <b-card>
                  <b-row>
                    <b-col>
                      <h4>Software</h4>
                      <b-row class="mb-2">
                        <b-col class="font-weight-bold block" cols="4">
                          <span>OS Edition</span>
                        </b-col>
                        <b-col>
                          <span>{{this.assetInfo.OS}}</span>
                        </b-col>
                      </b-row>
                      <b-row class="mb-2">
                        <b-col class="font-weight-bold block" cols="4">
                          <span>OS Version</span>
                        </b-col>
                        <b-col>
                          <span>{{this.assetInfo.OSVersion}}</span>
                        </b-col>
                      </b-row>
                      <b-row class="mb-2">
                        <b-col class="font-weight-bold block" cols="4">
                          <span>OS Build</span>
                        </b-col>
                        <b-col>
                          <span>{{this.assetInfo.OSBuild}}</span>
                        </b-col>
                      </b-row>
                      <b-row class="mb-2">
                        <b-col class="font-weight-bold block" cols="4">
                          <span>Office</span>
                        </b-col>
                        <b-col>
                          <span>{{this.assetInfo.Office}}</span>
                        </b-col>
                      </b-row>
                    </b-col>
                    <b-card no-body class="shadow"></b-card>
                    <b-col>
                      <h4>Hardware</h4>
                      <b-row class="mb-2">
                        <b-col class="font-weight-bold block" cols="4">
                          <span>Vendor</span>
                        </b-col>
                        <b-col>
                          <span>{{this.assetInfo.Vendor}}</span>
                        </b-col>
                      </b-row>
                      <b-row class="mb-2">
                        <b-col class="font-weight-bold block" cols="4">
                          <span>Model</span>
                        </b-col>
                        <b-col>
                          <span>{{this.assetInfo.VendorBrandModel}}</span>
                        </b-col>
                      </b-row>
                      <b-row class="mb-2">
                        <b-col class="font-weight-bold block" cols="4">
                          <span>Serial Number</span>
                        </b-col>
                        <b-col>
                          <span>{{this.assetInfo.VendorSerialNumber}}</span>
                        </b-col>
                      </b-row>
                      <b-row class="mb-2">
                        <b-col class="font-weight-bold block" cols="4">
                          <span>Motherboard</span>
                        </b-col>
                        <b-col>
                          <span>{{this.assetInfo.Motherboard}}</span>
                        </b-col>
                      </b-row>
                      <b-row class="mb-2">
                        <b-col class="font-weight-bold block" cols="4">
                          <span>Processor</span>
                        </b-col>
                        <b-col>
                          <span>{{this.assetInfo.Processor}}</span>
                        </b-col>
                      </b-row>
                      <b-row class="mb-2">
                        <b-col class="font-weight-bold block" cols="4">
                          <span>Memory</span>
                        </b-col>
                        <b-col>
                          <span>{{this.assetInfo.Memory}}MB</span>
                        </b-col>
                      </b-row>
                      <b-row class="mb-2">
                        <b-col class="font-weight-bold block" cols="4">
                          <span>Video Card</span>
                        </b-col>
                        <b-col>
                          <span>{{this.assetInfo.Display}}</span>
                        </b-col>
                      </b-row>
                      <b-row class="mb-2">
                        <b-col class="font-weight-bold block" cols="4">
                          <span>Sound</span>
                        </b-col>
                        <b-col>
                          <span>{{this.assetInfo.Sound}}</span>
                        </b-col>
                      </b-row>
                      <b-row class="mb-2">
                        <b-col class="font-weight-bold block" cols="4">
                          <span>System Drive</span>
                        </b-col>
                        <b-col>
                          <span>{{this.assetInfo.SystemDrive}}</span>
                        </b-col>
                      </b-row>
                      <b-row class="mb-2">
                        <b-col class="font-weight-bold block" cols="4">
                          <span>MAC Addresses</span>
                        </b-col>
                        <b-col>
                          <span>{{this.assetInfo.MacAddresses}}</span>
                        </b-col>
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
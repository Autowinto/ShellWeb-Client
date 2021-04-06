<template>
  <body class="bg-gradient-primary" style="height: 100vh">
    <b-container style="height: 100%">
      <b-row style="height: 100%" align-v="start" align-h="center">
        <div class="col-md-9 col-lg-12 col-xl-10 my-4">
          <img src="../assets/img/logo/logo-white.png" style="width: 901px" />
          <!-- <div class="card shadow-lg o-hidden border-0 my-5">
                    <div class="card-body p-0">
                        <div class="row">
                            <div class="col-lg-6">
                                <div class="p-5" style="width: 901px;">
                                    <div class="text-center">
                                        <h4 class="text-dark mb-4">Login</h4>
                                    </div>
                                    <form class="user">
                                        <div class="form-group"><input class="form-control form-control-user" type="email" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter Email Address..." name="email"></div>
                                        <div class="form-group"><input class="form-control form-control-user" type="password" id="exampleInputPassword" placeholder="Password" name="password"></div>
                                        <div class="form-group">
                                            <div class="custom-control custom-checkbox small">
                                                <div class="form-check"><input class="form-check-input custom-control-input" type="checkbox" id="formCheck-1"><label class="form-check-label custom-control-label" for="formCheck-1">Remember Me</label></div>
                                            </div>
                                        </div><button class="btn btn-primary btn-block text-white btn-user" type="submit">Login</button>
                                        <hr>
                                        <hr>
                                    </form>
                                    <div class="text-center"></div>
                                    <div class="text-center"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> -->
        </div>
        <b-button
          variant="primary"
          style="width: 50%; height: 8%"
          v-on:click="login"
          >Login via Microsoft</b-button
        >
      </b-row>
    </b-container>
  </body>
</template>

<script>
export default {
  methods: {
    login() {},
  },
}
</script>

<style>
</style>
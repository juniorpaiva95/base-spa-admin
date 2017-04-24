<script>
  import {loginUrl, getHeader, userUrl} from './../config'
  import {clientId, clientSecret} from './../env'
  import {mapState} from 'vuex'
  import $ from 'jquery'
  export default {
    created () {
      this.$nextTick(function () {
        $.getScript('/static/assets/js/plugins/forms/styling/uniform.min.js')
        $.getScript('/static/assets/js/pages/login.js')
        $('body').addClass('login-container')
      })
    },
    computed: {
      ...mapState({
        userStore: state => state.userStore
      })
    },
    data () {
      return {
        login: {
          email: 'joselito.junior@esfera5.com.br',
          password: 'password'
        }
      }
    },
    methods: {
      handleLoginFormSubmit () {
        const postData = {
          grant_type: 'password',
          client_id: clientId,
          client_secret: clientSecret,
          username: this.login.email,
          password: this.login.password,
          scope: ''
        }
        const authUser = {}
        this.$http.post(loginUrl, postData)
          .then(response => {
            if (response.status === 200) {
              // console.log('Oauth token', response)
              authUser.access_token = response.data.access_token
              authUser.refresh_token = response.data.refresh_token
              window.localStorage.setItem('authUser', JSON.stringify(authUser))
              this.$http.get(userUrl, {headers: getHeader()})
                .then(response => {
                  // console.log('user object', response)
                  authUser.email = response.body.email
                  authUser.name = response.body.name
                  window.localStorage.setItem('authUser', JSON.stringify(authUser))
                  this.$store.dispatch('setUserObject', authUser)
                  this.$router.push({name: 'dashboard'})
                })
            }
          })
      }
    }
  }
</script>

<template>
  <div>
  <!-- Page container -->
  <div class="page-container">

    <!-- Page content -->
    <div class="page-content">

      <!-- Main content -->
      <div class="content-wrapper">

        <!-- Content area -->
        <div class="content">

          <!-- Advanced login -->
          <form @submit.prevent="handleLoginFormSubmit">
            <div class="panel panel-body login-form">
              <div class="text-center">
                <div class="icon-object border-slate-300 text-slate-300"><i class="icon-reading"></i></div>
                <h5 class="content-group">Login to your account <small class="display-block">Your credentials</small></h5>
              </div>

              <div class="form-group has-feedback has-feedback-left">
                <input type="text" class="form-control" v-model="login.email" placeholder="Username">
                <div class="form-control-feedback">
                  <i class="icon-user text-muted"></i>
                </div>
              </div>

              <div class="form-group has-feedback has-feedback-left">
                <input type="password" class="form-control" v-model="login.password" placeholder="Password">
                <div class="form-control-feedback">
                  <i class="icon-lock2 text-muted"></i>
                </div>
              </div>

              <div class="form-group login-options">
                <div class="row">
                  <div class="col-sm-6">
                    <label class="checkbox-inline">
                      <input type="checkbox" class="styled" checked="checked">
                      Remember
                    </label>
                  </div>

                  <div class="col-sm-6 text-right">
                    <router-link :to="{ name: 'forgot-password' }">Esqueci a senha</router-link>
                  </div>
                </div>
              </div>

              <div class="form-group">
                <button type="submit" class="btn bg-blue btn-block">Login <i class="icon-arrow-right14 position-right"></i></button>
              </div>

              <!-- <div class="content-divider text-muted form-group"><span>or sign in with</span></div>
              <ul class="list-inline form-group list-inline-condensed text-center">
                <li><a href="#" class="btn border-indigo text-indigo btn-flat btn-icon btn-rounded"><i class="icon-facebook"></i></a></li>
                <li><a href="#" class="btn border-pink-300 text-pink-300 btn-flat btn-icon btn-rounded"><i class="icon-dribbble3"></i></a></li>
                <li><a href="#" class="btn border-slate-600 text-slate-600 btn-flat btn-icon btn-rounded"><i class="icon-github"></i></a></li>
                <li><a href="#" class="btn border-info text-info btn-flat btn-icon btn-rounded"><i class="icon-twitter"></i></a></li>
              </ul>

              <div class="content-divider text-muted form-group"><span>Don't have an account?</span></div>
              <a href="login_registration.html" class="btn btn-default btn-block content-group">Sign up</a>
              <span class="help-block text-center no-margin">By continuing, you're confirming that you've read our <a href="#">Terms &amp; Conditions</a> and <a href="#">Cookie Policy</a></span> -->
            </div>
          </form>
          <!-- /advanced login -->

        </div>
        <!-- /content area -->

      </div>
      <!-- /main content -->

    </div>
    <!-- /page content -->

  </div>
  <!-- /page container -->


  </div>
</template>

<style lang="sass">

</style>

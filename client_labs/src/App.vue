<script>
  import {mapState} from 'vuex'
  export default {
    metaInfo: {
      title: 'Acqio'
    },
    components: {
      // VsFooter
    },
    computed: {
      ...mapState({
        userStore: state => state.userStore
      })
    },
    created () {
      const userObj = JSON.parse(window.localStorage.getItem('authUser'))
      this.$store.dispatch('setUserObject', userObj)
    },
    sockets: {
      connect () {
        console.log('socket connected')
      }
    },
    methods: {
      handleLogout () {
        this.$store.dispatch('clearAuthUser')
        window.localStorage.removeItem('authUser')
        this.$router.push({name: 'home'})
      }
    }
  }
</script>

<template>
  <div>
    <!-- Main navbar -->
  <div class="navbar navbar-inverse">
    <div class="navbar-header">
      <router-link :to="{ name: 'home' }" class="navbar-brand"><img src="/static/assets/images/logo_light.png" alt=""></router-link>

      <ul class="nav navbar-nav visible-xs-block">
        <li><a data-toggle="collapse" data-target="#navbar-mobile"><i class="icon-tree5"></i></a></li>
        <li><a class="sidebar-mobile-main-toggle"><i class="icon-paragraph-justify3"></i></a></li>
      </ul>
    </div>

    <div v-if="userStore.authUser" class="navbar-collapse collapse" id="navbar-mobile">
      <ul class="nav navbar-nav">
        <li><a class="sidebar-control sidebar-main-toggle hidden-xs"><i class="icon-paragraph-justify3"></i></a></li>
      </ul>

      <p class="navbar-text"><span class="label bg-success">Online</span></p>

      <ul class="nav navbar-nav navbar-right">
        <!-- <li class="dropdown language-switch">
          <a class="dropdown-toggle" data-toggle="dropdown">
            <img src="/static/assets/images/flags/gb.png" class="position-left" alt="">
            English
            <span class="caret"></span>
          </a>

          <ul class="dropdown-menu">
            <li><a class="deutsch"><img src="/static/assets/images/flags/de.png" alt=""> Deutsch</a></li>
            <li><a class="ukrainian"><img src="/static/assets/images/flags/ua.png" alt=""> Українська</a></li>
            <li><a class="english"><img src="/static/assets/images/flags/gb.png" alt=""> English</a></li>
            <li><a class="espana"><img src="/static/assets/images/flags/es.png" alt=""> España</a></li>
            <li><a class="russian"><img src="/static/assets/images/flags/ru.png" alt=""> Русский</a></li>
          </ul>
        </li>
 -->
        <!-- <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown">
            <i class="icon-bubbles4"></i>
            <span class="visible-xs-inline-block position-right">Messages</span>
            <span class="badge bg-warning-400">2</span>
          </a>

          <div class="dropdown-menu dropdown-content width-350">
            <div class="dropdown-content-heading">
              Messages
              <ul class="icons-list">
                <li><a href="#"><i class="icon-compose"></i></a></li>
              </ul>
            </div>

            <ul class="media-list dropdown-content-body">
              <li class="media">
                <div class="media-left">
                  <img src="/static/assets/images/demo/users/face10.jpg" class="img-circle img-sm" alt="">
                  <span class="badge bg-danger-400 media-badge">5</span>
                </div>

                <div class="media-body">
                  <a href="#" class="media-heading">
                    <span class="text-semibold">James Alexander</span>
                    <span class="media-annotation pull-right">04:58</span>
                  </a>

                  <span class="text-muted">who knows, maybe that would be the best thing for me...</span>
                </div>
              </li>

              <li class="media">
                <div class="media-left">
                  <img src="/static/assets/images/demo/users/face3.jpg" class="img-circle img-sm" alt="">
                  <span class="badge bg-danger-400 media-badge">4</span>
                </div>

                <div class="media-body">
                  <a href="#" class="media-heading">
                    <span class="text-semibold">Margo Baker</span>
                    <span class="media-annotation pull-right">12:16</span>
                  </a>

                  <span class="text-muted">That was something he was unable to do because...</span>
                </div>
              </li>

              <li class="media">
                <div class="media-left"><img src="/static/assets/images/demo/users/face24.jpg" class="img-circle img-sm" alt=""></div>
                <div class="media-body">
                  <a href="#" class="media-heading">
                    <span class="text-semibold">Jeremy Victorino</span>
                    <span class="media-annotation pull-right">22:48</span>
                  </a>

                  <span class="text-muted">But that would be extremely strained and suspicious...</span>
                </div>
              </li>

              <li class="media">
                <div class="media-left"><img src="/static/assets/images/demo/users/face4.jpg" class="img-circle img-sm" alt=""></div>
                <div class="media-body">
                  <a href="#" class="media-heading">
                    <span class="text-semibold">Beatrix Diaz</span>
                    <span class="media-annotation pull-right">Tue</span>
                  </a>

                  <span class="text-muted">What a strenuous career it is that I've chosen...</span>
                </div>
              </li>

              <li class="media">
                <div class="media-left"><img src="/static/assets/images/demo/users/face25.jpg" class="img-circle img-sm" alt=""></div>
                <div class="media-body">
                  <a href="#" class="media-heading">
                    <span class="text-semibold">Richard Vango</span>
                    <span class="media-annotation pull-right">Mon</span>
                  </a>

                  <span class="text-muted">Other travelling salesmen live a life of luxury...</span>
                </div>
              </li>
            </ul>

            <div class="dropdown-content-footer">
              <a href="#" data-popup="tooltip" title="All messages"><i class="icon-menu display-block"></i></a>
            </div>
          </div>
        </li> -->

        <li class="dropdown dropdown-user">
          <a class="dropdown-toggle" data-toggle="dropdown">
            <img src="/static/assets/images/demo/users/face11.jpg" alt="">
            <span>{{ userStore.authUser.name }}</span>
            <i class="caret"></i>
          </a>

          <ul class="dropdown-menu dropdown-menu-right">
            <li><a href="#" v-on:click="handleLogout()"><i class="icon-switch2"></i> Logout</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
  <!-- /main navbar -->
    <router-view></router-view>
    <!-- <vs-footer></vs-footer> -->
  </div>
</template>

<style lang="scss">
  @import '~/static/assets/css/icons/icomoon/styles.css';
  @import '~/static/assets/css/bootstrap.css';
  @import '~/static/assets/css/colors.css';
  @import '~/static/assets/css/core.css';
  @import '~/static/assets/css/components.css';
  //@import '~/static/assets/css/icons/fontawesome/styles.min.css';
  body {
    font-family: 'Rajdhani';
  }
</style>

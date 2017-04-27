<script>
	// import $ from 'jquery'
	import {mapState} from 'vuex'
	export default{
	  methods: {
    active(val) {
      if (this.$route.path === val) {
        return true
      }
      return false
    }
  },
	  computed: {
	    ...mapState({
	      userStore: state => state.userStore
	    })
	  }
	}
</script>


<template>
		<!-- Main sidebar -->
			<div class="sidebar sidebar-main">
				<div class="sidebar-content">

					<!-- User menu -->
					<div class="sidebar-user">
						<div class="category-content">
							<div class="media">
								<a href="#" class="media-left"><img src="/static/assets/images/demo/users/face11.jpg" class="img-circle img-sm" alt=""></a>
								<div class="media-body">
									<span class="media-heading text-semibold">{{userStore.authUser.name}}</span>
									<div class="text-size-mini text-muted">
										<i class="icon-pin text-size-small"></i> &nbsp;Santa Ana, CA
									</div>
								</div>

								<div class="media-right media-middle">
									<ul class="icons-list">
										<li>
											<a href="#"><i class="icon-cog3"></i></a>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
					<!-- /user menu -->


					<!-- Main navigation -->
					<div class="sidebar-category sidebar-category-visible">
						<div class="category-content no-padding">
							<ul class="navigation navigation-main navigation-accordion">

								<!-- Main -->
								<li class="navigation-header"><span>Main</span> <i class="icon-menu" title="Main pages"></i></li>
								<li :class="{ 'active' : active('/admin') }"><router-link :to="{ name: 'dashboard' }"><i class="icon-home4"></i> <span>Dashboard</span></router-link></li>
								<!-- /main -->

								<li class="navigation-header"><span>Administração</span> <i class="icon-menu" title="Main pages"></i></li>
								<li :class="{ 'active' : active('/admin/boletos') }">
									<router-link :to="{ name: 'admin.boletos' }"><i class="icon-barcode2"></i> <span>Boletos</span></router-link>
								</li>

							</ul>
						</div>
					</div>
					<!-- /main navigation -->

				</div>
			</div>
			<!-- /main sidebar -->
</template>

<style></style>

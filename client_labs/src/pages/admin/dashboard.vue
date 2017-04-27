<template>
	<div>
		<!-- Page container -->
		<div class="page-container">

			<!-- Page content -->
			<div class="page-content">

				<sidebar-nav></sidebar-nav>

				<!-- Main content -->
				<div class="content-wrapper">

					<!-- Page header -->
					<div class="page-header page-header-default">

						<div class="breadcrumb-line">
							<ul class="breadcrumb">
								<li><a href="index.html"><i class="icon-home2 position-left"></i> Home</a></li>
								<li class="active">Dashboard</li>
							</ul>

							<ul class="breadcrumb-elements">
								<li><a href="#"><i class="icon-comment-discussion position-left"></i> Support</a></li>
								<li class="dropdown">
									<a href="#" class="dropdown-toggle" data-toggle="dropdown">
										<i class="icon-gear position-left"></i>
										Settings
										<span class="caret"></span>
									</a>

									<ul class="dropdown-menu dropdown-menu-right">
										<li><a href="#"><i class="icon-user-lock"></i> Account security</a></li>
										<li><a href="#"><i class="icon-statistics"></i> Analytics</a></li>
										<li><a href="#"><i class="icon-accessibility"></i> Accessibility</a></li>
										<li class="divider"></li>
										<li><a href="#"><i class="icon-gear"></i> All settings</a></li>
									</ul>
								</li>
							</ul>
						</div>
					</div>
					<!-- /page header -->


					<!-- Content area -->
					<div class="content">

						<div class="row">
							<div class="col-lg-12">
								<clients></clients>
							</div>

							<div class="col-lg-12">
								<div class="panel panel-flat">
									<div class="panel-heading">
										<h5 class="panel-title">Vue Table</h5>
										<div class="heading-elements">
											<ul class="icons-list">
												<li><a data-action="collapse"></a></li>
												<li><a data-action="reload"></a></li>
												<li><a data-action="close"></a></li>
											</ul>
										</div>
									</div>
									<div class="panel-body">
										<div class="table-responsive">
											<filter-bar></filter-bar>
											<vuetable ref="vuetable" class="table dataTable"
											:css="myCSS"
											api-url="http://vuetable.ratiw.net/api/users"
											:fields="fields" pagination-path=""
											@vuetable:pagination-data="onPaginationData"
											detail-row-component="my-detail-row"
											@vuetable:cell-clicked="onCellClicked"
											:append-params="moreParams"
											>
											<template slot="actions" scope="props">
												<ul class="icons-list">
													<li class="dropdown">
														<a href="#" class="dropdown-toggle" data-toggle="dropdown">
															<i class="icon-menu9"></i>
														</a>

														<ul class="dropdown-menu dropdown-menu-right">
															<li @click="onAction('edit-item', props.rowData, props.rowIndex)"><a href="#"><i class="icon-pencil7"></i> Editar</a></li>
															<li @click="onAction('view-item', props.rowData, props.rowIndex)"><a href="#"><i class="icon-folder-search"></i> Visualizar</a></li>
															<li @click="onAction('delete-item', props.rowData, props.rowIndex)"><a href="#"><i class="icon-cross2"></i> Excluir</a></li>
														</ul>
													</li>
												</ul>
											</template>
										</vuetable>
									</div>
								</div>
							</div>
							<!-- pagination bootpag pagination-sm -->
							<vuetable-pagination-info ref="paginationInfo"></vuetable-pagination-info>
							<vuetable-pagination ref="pagination"
							@vuetable-pagination:change-page="onChangePage"
							></vuetable-pagination>
						</div>
					</div>
				</div>
				<!-- /dashboard content -->


				<!-- Footer -->
				<vs-footer></vs-footer>
				<!-- /footer -->

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

<script>
import Vue from 'vue'
import accounting from 'accounting'
import moment from 'moment'
import SidebarNav from '../../components/Sidebar-nav'
export default {
	metaInfo: {
		titleTemplate: '%s - Dashboard'
	},
	components: {
		SidebarNav
	},
	// My Vue table mounted
	mounted() {
		this.$events.$on('filter-set', eventData => this.onFilterSet(eventData))
		this.$events.$on('filter-reset', e => this.onFilterReset())
	},
	methods: {
		onFilterSet (filterText) {
			this.moreParams = {
				'filter': filterText
			}
			let vm = this
			Vue.nextTick(function() {
				console.log(vm)
				vm.$refs.vuetable.refresh()
			})
		},
		onFilterReset () {
			this.moreParams = {}
			let vm = this
			Vue.nextTick(function() {
				vm.$refs.vuetable.refresh()
			})
		},
		formatDate (value, fmt = 'D MMM YYYY') {
			return (value == null)
			? ''
			: moment(value, 'YYYY-MM-DD').format(fmt)
		},
		formatNumber (value) {
			return 'R$ ' + accounting.formatNumber(value, 2)
		},
		genderLabel (value) {
			return value === 'M'
			? '<i class="icon-man"></i>Male'
			: '<i class="icon-woman"></i>Female'
		},
		onPaginationData (paginationData) {
			this.$refs.pagination.setPaginationData(paginationData)
			this.$refs.paginationInfo.setPaginationData(paginationData)
		},
		onChangePage (page) {
			this.$refs.vuetable.changePage(page)
		},
		onAction (action, data, index) {
			console.log('slot) action: ' + action, data.name, index)
			if (action === 'edit-item') {
				swal(
					'Good job!',
					'You clicked ' + action + ' the button!',
					'success'
				)
			}
		},
		onCellClicked (data, field, event) {
			console.log('cellClicked: ', field.name)
			this.$refs.vuetable.toggleDetailRow(data.id)
		}
	},
	data () {
		return {
			myCSS: {
				ascendingIcon: 'icon-arrow-up5',
				descendingIcon: 'icon-arrow-down5'
			},
			moreParams: {},
			fields: [
				{
					name: '__sequence',   // <----
					title: '#',
					titleClass: 'center aligned',
					dataClass: 'right aligned'
				},
				'name', 'email',
				{
					name: 'birthdate',
					sortField: 'birthdate',
					titleClass: 'center aligned',
					dataClass: 'center aligned',
					callback: 'formatDate|DD/MM/YYYY'
				},
				{
					name: 'nickname'
				},
				{
					name: 'gender',
					titleClass: 'center aligned',
					dataClass: 'center aligned',
					callback: 'genderLabel'
				},
				{
					name: 'salary',
					titleClass: 'center aligned',
					dataClass: 'right aligned',
					callback: 'formatNumber'
				},
				{
					name: '__slot:actions',   // <----
					title: 'Actions',
					titleClass: 'center aligned',
					dataClass: 'center aligned'
				}
			]
		}
	},
	created () {
		$('body').removeClass('login-container')
		this.$nextTick(function () {
			$.getScript('/static/assets/js/core/app.js')
			// $.getScript('/static/assets/js/pages/dashboard.js')
		})
	}
}
</script>

<style></style>

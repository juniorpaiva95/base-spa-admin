// FilterBar.vue

 <template>
   <div class="filter-bar ui basic segment grid">
     <div class="ui form">
       <div class="inline field">
         <label>Pesquisar:</label>
         <div class="input-group">
           <input type="text" v-model="filterText" class="form-control" @keyup="doFilter" placeholder="name, nickname, or email">
					<span class="input-group-btn">
						<button class="btn btn-primary" @click="doFilter">Buscar</button>
					</span>
				</div>
         <!-- <button class="btn btn-default" @click="resetFilter">Reset</button> -->

       </div>
     </div>
   </div>
 </template>

 <script>
 export default {
   data () {
     return {
       filterText: ''
     }
   },
   methods: {
     doFilter () {
      this.$events.fire('filter-set', this.filterText)
    },
    resetFilter () {
      this.filterText = ''  // clear the text in text input
      this.$events.fire('filter-reset')
    }
   }
 }
</script>

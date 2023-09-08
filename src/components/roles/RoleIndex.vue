<template>
	<div class="row">
		<div class="col-md-12 p-title">
			<h2>Roles</h2>
		</div>
	</div>
	<div class="row">
		<div class="col-md-12">
		    <div class="row">
		    	<div class="col-auto">
		    		<router-link :to="{ name: 'roles.create' }" class="btn btn-blue">New Role <i class="fa-solid fa-plus"></i></router-link>
		    	</div>
		    	<div class="col">
		    		<div class="form-group">
		    			<input type="text" name="inputSearch" placeholder="search..." class="form-control border-blue" v-model="searchQuery">
		    		</div>
		    	</div>
		    </div>
		    <table class="mtable mt-2 mb-2 table tbllink">
		    	<thead>
		    		<tr>
		    			<th @click="sortTable('name')">Name
		                    <span v-if="sortColumn == 'name'" class="material-icons">{{arrowIconName}}</span>
		                    <span v-else class="material-icons">sort</span>
		                </th>
		                <th @click="sortTable('slug')">Slug
		                    <span v-if="sortColumn == 'slug'" class="material-icons">{{arrowIconName}}</span>
		                    <span v-else class="material-icons">sort</span>
		                </th>	
		    		</tr>
		    	</thead>
		    	<tbody>
		    		<template v-for="role in filteredRoles" :key="role.id">
		    			<tr @click="goshow(role.id)" v-if="role.id !== 1">
		    				<td>
		    					{{role.name}}
		    				</td>
		    				<td>
		    					{{role.slug}}
		    				</td>
		    			</tr>
		    		</template>
		    	</tbody>
		    </table>
		</div>
	</div>
</template>

<script>
	import useRoles from '../../composables/composables-role';
	import {onMounted ,ref, computed, inject} from 'vue';
	import { sortBy} from 'lodash';
	import {useRouter} from 'vue-router'


	export default{
		setup(){
			const {roles, getRoles} = useRoles()
			const searchQuery = ref("");
			const swal = inject('$swal')
			let sort = ref(false);




			const router = useRouter()
			
			const sortColumn = ref("id");
        	const sortDirection = ref(1);
			const arrowIconName = ref("arrow_drop_up");		

			onMounted(getRoles)	

			const filteredRoles = computed(function(){
				return roles.value.filter(
					(role) => role.name.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1
				);
			});



			const sortTable = (columnName) => {
	            sortColumn.value = columnName;
	            sortDirection.value = -1 * sortDirection.value;
	            if (sortDirection.value == 1) {
	                arrowIconName.value = "arrow_drop_up";
	                filteredLocations.value.sort((a, b) => (a[columnName] > b[columnName] ? 1 : -1));
	            } else {
	                arrowIconName.value = "arrow_drop_down";
	                filteredLocations.value.sort((a, b) => (a[columnName] < b[columnName] ? 1 : -1));
	            }
	        }

			
			const goshow = (id) => {
				router.push({name: 'roles.edit', params: { id: id }});

			}

			return{
				filteredRoles,
				searchQuery,
				sortTable,
				sortColumn,
				goshow,
				arrowIconName
			}
		}
	}
</script>
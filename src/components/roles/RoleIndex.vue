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
		    <div class="tblWrap mt-2">
		    	<table class="mtable table nottbllink">
			    	<thead>
			    		<tr>
			    			<th @click="sortTable('name')">Name
			                    <span v-if="sortColumn == 'name'" class="material-icons">{{arrowIconName}}</span>
			                    <span v-else class="material-icons">sort</span>
			                </th>
			                <th>Permissions</th>
			                <th @click="sortTable('slug')">Slug
			                    <span v-if="sortColumn == 'slug'" class="material-icons">{{arrowIconName}}</span>
			                    <span v-else class="material-icons">sort</span>
			                </th>
			                <th></th>
			    		</tr>
			    	</thead>
			    	<tbody>
			    		<template v-if="!tblloader">
			    			<template v-for="role in filteredRoles" :key="role.id">
				    			<tr>
				    				<td>
				    					{{role.name}}
				    				</td>
				    				<td>
				    					<template v-if="role.permissions">
				    						<template v-for="permission in role.permissions" :key="permission.id">
				    							<span class="badge badge-pill bg-primary me-1">{{permission.name}}</span>
				    						</template>
				    					</template>
				    				</td>
				    				<td>
				    					{{role.slug}}
				    				</td>
				    				<td>
				    					<ul class="ls-frmbutton text-end list-inline">
                                            <li class="list-inline-item">
                                                <button class="btn btn-outline-violet" title="Edit" @click="goshow(role.id)"> 
                                                    <i class="fa-solid fa-user-pen"></i> <span class="actionText">Edit</span>
                                                </button>
                                            </li>
                                        </ul>
				    				</td>
				    			</tr>
				    		</template>
							<template v-if="searchQuery">
							    <template v-if="!filteredRoles.length">
							        <tr class="nodata">
							            <td colspan="4">
							                No Results Found
							            </td>
							        </tr>
							    </template>                         
							</template>
							<template v-else>
							    <template v-if="!filteredRoles.length">
							        <tr class="nodata">
							            <td colspan="4">
							                No Entry!
							            </td>
							        </tr>
							    </template> 
							</template>  
						</template>
						<template v-else>
						    <tr class="nodata pr">
						        <td colspan="4">
						            <LoadingComponent/>
						        </td>
						    </tr>
						</template>
			    		
			    	</tbody>
			    </table>
		    </div>
		</div>
	</div>
</template>

<script>
	import useRoles from '@/composables/composables-role';
	import {onMounted ,ref, computed, inject} from 'vue';
	import { sortBy} from 'lodash';
	import {useRouter} from 'vue-router'

	import { useHead } from '@unhead/vue'
	import LoadingComponent from '@/components/loader/LoadingComponent.vue'
	export default{
		components: {
			LoadingComponent
		},
		setup(){
			useHead({
		        title: 'Roles | '+import.meta.env.VITE_BFAR_AGENCY
		    })
			const {roles, getRoles} = useRoles()
			const searchQuery = ref("");
			const swal = inject('$swal')
			let sort = ref(false);

			const router = useRouter()			
			const sortColumn = ref("id");
        	const sortDirection = ref(1);
			const arrowIconName = ref("arrow_drop_up");		
			const tblloader = ref(true);

			onMounted(() => {
				getRoles().then(() =>{
					tblloader.value = false;
				});
			})	

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
	                filteredRoles.value.sort((a, b) => (a[columnName] > b[columnName] ? 1 : -1));
	            } else {
	                arrowIconName.value = "arrow_drop_down";
	                filteredRoles.value.sort((a, b) => (a[columnName] < b[columnName] ? 1 : -1));
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
				arrowIconName,
				tblloader
			}
		}
	}
</script>
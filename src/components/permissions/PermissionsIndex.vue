<template>
	<div class="row">
		<div class="col-md-12 p-title">
			<h2>Permissions</h2>
		</div>
	</div>
	<div class="row">
		<div class="col-md-12">
		    <div class="row">
		    	<div class="col-auto">
		    		<router-link :to="{ name: 'permissions.create' }" class="btn btn-blue">New Permission <i class="fa-solid fa-plus"></i></router-link>
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
			                <th @click="sortTable('slug')">Slug
			                    <span v-if="sortColumn == 'slug'" class="material-icons">{{arrowIconName}}</span>
			                    <span v-else class="material-icons">sort</span>
			                </th>	
			                <th>
			                	Role Assigned
			                </th>
			                <th></th>
			    		</tr>
			    	</thead>
			    	<tbody>
			    		<template v-if="!tblloader">
			    			<template v-for="permission in filteredPermissions" :key="permission.id">
				    			<tr>
				    				<td>
				    					{{permission.name}}
				    				</td>
				    				<td>
				    					{{permission.slug}}
				    				</td>
				    				<td>
				    					<template v-if="permission.roles[0]">
				    						{{permission.roles[0].name}}
				    					</template>
				    				</td>
				    				<td @click.stop>
				    					<ul class="list-inline mb-0 text-end"  v-if="userslug.includes('super-admin')">
				    						<li class="list-inline-item">
											    <button class="btn btn-outline-violet" title="Edit" @click="goshow(permission.id)"> 
											        <i class="fa-solid fa-user-pen"></i> <span class="actionText">Edit</span>
											    </button>
											</li>
				    						<li class="list-inline-item">
				    							<button @click.prevent="deleteitem(permission.id)" class="btn btn-outline-danger"><i class="fa-solid fa-trash-can"></i>Delete</button>
				    						</li>
				    					</ul>
				    				</td>
				    			</tr>
				    		</template>
							<template v-if="searchQuery">
							    <template v-if="!filteredPermissions.length">
							        <tr class="nodata">
							            <td colspan="4">
							                No Results Found
							            </td>
							        </tr>
							    </template>                         
							</template>
							<template v-else>
							    <template v-if="!filteredPermissions.length">
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
	import usePermissions from '@/composables/composables-permissions';
	import {onMounted ,ref, computed, inject} from 'vue';
	import { sortBy} from 'lodash';
	import {useRouter} from 'vue-router'
	import LoadingComponent from '@/components/loader/LoadingComponent.vue'
	import { useHead } from '@unhead/vue'
	import {useAuthStore} from '@/stores/store.js'

	export default{
		components: {
			LoadingComponent
		},
		setup(){
			useHead({
		        title: 'Permissions | '+import.meta.env.VITE_BFAR_AGENCY
		    })


			const store = useAuthStore()
			const userslug = store.getdetails[1];

			const {permissions, getPermissions, destroyPermission} = usePermissions()
			const searchQuery = ref("");
			const swal = inject('$swal')
			let sort = ref(false);




			const router = useRouter()
			
			const sortColumn = ref("id");
        	const sortDirection = ref(1);
			const arrowIconName = ref("arrow_drop_up");		
			const tblloader = ref(true);
			onMounted(() => {
				getPermissions().then(() =>{
					tblloader.value = false;
				})
			})	

			const filteredPermissions = computed(function(){
				return permissions.value.filter(
					(permission) => permission.name.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1
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
				router.push({name: 'permissions.edit', params: { id: id }});

			}
			const deleteitem = async (id) =>{
				
				let x = 0; //trigger

				await swal.fire({
				  title: 'Are you sure?',
				  text: "You won't be able to revert this!",
				  icon: 'warning',
				  showCancelButton: true,
				  confirmButtonColor: '#3085d6',
				  cancelButtonColor: '#d33',
				  confirmButtonText: 'Yes, delete it!'
				}).then((result) => {
				  if (result.isConfirmed) {		    
				    x = 1;
				  }
				})
				if (x > 0) {

					await destroyPermission(id);
					await getPermissions().then(() => {
						swal.fire({
				            toast: true,
				            position: 'top-end',
				            title: 'Successfully Deleted',
				            showConfirmButton: false,            
				            icon: 'success',
				            width: '300',
				            padding: '.5em 1em',
				            timerProgressBar: true,
				            timer:1500,
				            customClass: {
				                container: 'swaltopright-del'
				            }
				        })
					})
				}
				
			}
			return{
				filteredPermissions,
				searchQuery,
				sortTable,
				sortColumn,
				goshow,
				arrowIconName,
				deleteitem,
				tblloader,
				userslug
			}
		}
	}
</script>
<template>
	<div class="row">
		<div class="col col-w-settings">
			<div class="row">
				<div class="col-md-12 p-title">
					<h2>Locations</h2>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12">
				    <div class="row">
				    	<div class="col-auto">
				    		<router-link :to="{ name: 'locations.create' }" class="btn btn-blue">New Location <i class="fa-solid fa-plus"></i></router-link>
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
					    			<th @click="sortTable('location_name')">Locations
					                    <span v-if="sortColumn == 'location_name'" class="material-icons">{{arrowIconName}}</span>
					                    <span v-else class="material-icons">sort</span>
					                </th>
					                <th></th>
					    		</tr>
					    	</thead>
					    	<tbody>
					    		<template v-if="!tblloader">
					    			<template v-for="location in filteredLocations" :key="location.location_id">
						    			<tr>
						    				<td>
						    					{{location.location_name}}
						    				</td>
							    			<td @click.stop>
							    				<ul class="ls-frmbutton text-end list-inline">
							    					<li class="list-inline-item">
													    <button class="btn btn-outline-violet" title="Edit" @click="goshow(location.location_id)"> 
													        <i class="fa-solid fa-user-pen"></i> <span class="actionText">Edit</span>
													    </button>
													</li>
					                                <li class="list-inline-item">
					                                	<button title="delete" class="btn btn-outline-danger" @click="deleteLocation(location.location_id)"><i class="fa-solid fa-trash-can"></i> Delete</button>
					                                </li>
					                            </ul>
							    			</td>
						    			</tr>
						    		</template>
									<template v-if="searchQuery">
									    <template v-if="!filteredLocations.length">
									        <tr class="nodata">
									            <td colspan="2">
									                No Results Found
									            </td>
									        </tr>
									    </template>                         
									</template>
									<template v-else>
									    <template v-if="!filteredLocations.length">
									        <tr class="nodata">
									            <td colspan="2">
									                No Entry!
									            </td>
									        </tr>
									    </template> 
									</template>  
								</template>
								<template v-else>
								    <tr class="nodata pr">
								        <td colspan="2">
								            <LoadingComponent/>
								        </td>
								    </tr>
								</template>
					    		
					    	</tbody>
					    </table>
				    </div>
				</div>
			</div>
		</div>
		<RightNavHrmis/>
	</div>
	
</template>

<script>
	import useLocations from '@/composables/composables-location';
	import {onMounted ,ref, computed, inject} from 'vue';
	import { sortBy} from 'lodash';
	import {useRouter} from 'vue-router'
	import RightNavHrmis from '@/components/navigation/RightNavHrmis.vue';

	import { useHead } from '@unhead/vue'
	import LoadingComponent from '@/components/loader/LoadingComponent.vue'


	export default{
		components: {
			RightNavHrmis,
			LoadingComponent
		},
		setup(){
			useHead({
                title: 'Settings - Office Locations | '+import.meta.env.VITE_BFAR_AGENCY
            })
			const {locations, getLocations, destroyLocation} = useLocations()
			const searchQuery = ref("");
			const swal = inject('$swal')
			let sort = ref(false);


			const selected = ref([])
			const selectAll = ref(false)


			const router = useRouter()
			
			const sortColumn = ref("id");
        	const sortDirection = ref(1);
			const arrowIconName = ref("arrow_drop_up");
			const tblloader = ref(true);	
			onMounted(() => {
				getLocations().then(() =>{
					tblloader.value = false;
				})
			})		
			
			const filteredLocations = computed(function(){
				return locations.value.filter(
					(location) => location.location_name.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1
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

			const deleteLocation = async (id) =>{
				
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

					await destroyLocation(id);
					await getLocations().then(() => {
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
			const goshow = (id) => {
				router.push({name: 'locations.edit', params: { id: id }});
			}

			return{
				filteredLocations,
				deleteLocation,
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
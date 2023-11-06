<template>
	<div class="row">
		<div class="col col-w-settings">
			<div class="row">
				<div class="col-md-12 p-title">
					<h2>Offices</h2>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12">
				    <div class="row">
				    	<div class="col-auto">
				    		<router-link :to="{ name: 'offices.create' }" class="btn btn-blue" title="Add new Office">New Office <i class="fa-solid fa-plus"></i></router-link>
				    	</div>
				    	<div class="col">
				    		<div class="form-group">
				    			<input type="text" name="inputSearch" placeholder="search..." class="form-control border-blue" v-model="searchQuery">
				    		</div>
				    	</div>
				    </div>
				    <table class="mtable hasActions mt-2 mb-2 table tbllink">
				    	<thead>
				    		<tr>
				    			<th @click="sortTable('offices_name')">Offices
				                    <span v-if="sortColumn == 'offices_name'" class="material-icons">{{arrowIconName}}</span>
				                    <span v-else class="material-icons">sort</span>
				                </th>
				                <th @click="sortTable('employee_fname')">Head
				                    <span v-if="sortColumn == 'employee_fname'" class="material-icons">{{arrowIconName}}</span>
				                    <span v-else class="material-icons">sort</span>
				                </th>
				                <th @click="sortTable('location_name')">Location
				                    <span v-if="sortColumn == 'location_name'" class="material-icons">{{arrowIconName}}</span>
				                    <span v-else class="material-icons">sort</span>
				                </th>
				                <th></th>
				    		</tr>
				    	</thead>
				    	<tbody>
				    		<template v-for="office in filteredOffices" :key="office.offices_id">
				    			<tr @click="goshow(office.offices_id)">
				    				<td>{{office.offices_name}}</td>
				    				<td>
				    					<template v-if="office.officehead">
				    						{{office.officehead.employee_fname}} {{office.officehead.employee_mname}} {{office.officehead.employee_lname}}
				    					</template>
				    				</td>
					    			<td>
					    				<template v-if="office.officelocation != null">{{office.officelocation.location_name}}</template>
					    				<template v-else><span class="text-danger">No location assigned.</span></template>
					    			</td>
					    			<td @click.stop>
					    				<ul class="ls-frmbutton text-end">
			                                <li><button title="delete" class="btn btn-outline-danger" @click="deleteOffice(office.offices_id)"><i class="fa-solid fa-trash-can"></i> Delete</button></li>
			                            </ul>
					    			</td>
				    			</tr>
				    		</template>
				    	</tbody>
				    </table>
				</div>
			</div>
		</div>

		<RightNavHrmis/>

	</div>
	



</template>

<script>
	import useOffices from '@/composables/composables-office';
	import {onMounted ,ref, computed, inject} from 'vue';
	import { sortBy} from 'lodash';
	import {useRouter} from 'vue-router'

	import { useHead } from '@unhead/vue'
	import RightNavHrmis from '@/components/navigation/RightNavHrmis.vue';
	export default{
		components: {
			RightNavHrmis
		},
		setup(){
			useHead({
                title: 'Offices | BFAR - CAR HRMIS'
            })
			const swal = inject('$swal')

			const {offices, getOffices, destroyOffice} = useOffices()
			const searchQuery = ref("");
			let sort = ref(false);
			let updatedList = ref([])
			const router = useRouter()
			
			const sortColumn = ref("id");
        	const sortDirection = ref(1);
			const arrowIconName = ref("arrow_drop_up");			
			

			onMounted(getOffices)		

			const filteredOffices = computed(function(){
				return offices.value.filter(
					(office) => office.offices_name.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1 || 
							  	(office.officelocation && office.officelocation.location_name.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1) ||
							  	(office.officehead && office.officehead.employee_fname.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1) ||
							  	(office.officehead && office.officehead.employee_mname.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1) ||
							  	(office.officehead && office.officehead.employee_lname.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1)
				);
			});

			const sortTable = (columnName) => {
	            sortColumn.value = columnName;
	            sortDirection.value = -1 * sortDirection.value;
	           	            if (sortDirection.value == 1) {
	                arrowIconName.value = "arrow_drop_up";
	                if(columnName === 'location_name'){	     
	                	filteredOffices.value.sort((a, b) => (a['officelocation'][columnName] > b['officelocation'][columnName] ? 1 : -1));
	                }else if(columnName === 'officehead'){	     
	                	filteredOffices.value.sort((a, b) => (a['employee_fname'][columnName] > b['employee_fname'][columnName] ? 1 : -1));
	                }
	                else{
	                	filteredOffices.value.sort((a, b) => (a[columnName] > b[columnName] ? 1 : -1));
	                }
	            } else {
	                arrowIconName.value = "arrow_drop_down";

	                if(columnName === 'location_name'){	     
	                	filteredOffices.value.sort((a, b) => (a['officelocation'][columnName] < b['officelocation'][columnName] ? 1 : -1));
	                }else if(columnName === 'officehead'){	     
	                	filteredOffices.value.sort((a, b) => (a['employee_fname'][columnName] < b['employee_fname'][columnName] ? 1 : -1));
	                }else{
	                	filteredOffices.value.sort((a, b) => (a[columnName] < b[columnName] ? 1 : -1));
	                }
       


	            }
	        }

			const deleteOffice = async (id) =>{
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

					await destroyOffice(id);
					await getOffices().then(() => {
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
				router.push({ name: 'offices.edit', params: { id: id }});
			}
			
			return{
				filteredOffices,
				deleteOffice,
				searchQuery,
				sortTable,
				sortColumn,
				goshow,
				arrowIconName
			}
		}
	}
</script>
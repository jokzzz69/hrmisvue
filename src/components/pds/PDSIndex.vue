<template>
	<div class="row w-right-nav">
		<div class="col-md-12 p-title">
			<h2>Employees Personal Data Sheet</h2>
		</div>
	</div>
	<div class="row">
		<div class="col-md-12">
		    <div class="row">
		    	<div class="col">
		    		<div class="form-group">
		    			<input type="text" name="inputSearch"  placeholder="search..." class="form-control border-blue" v-model="searchQuery">
		    		</div>
		    	</div>
		    </div>
		    <table class="mtable mt-2 mb-2 table tbllink">
		    	<thead>
		    		<tr>
		    			<th class="col" @click="sortTable('employee_fname')">Name
		                    <span v-if="sortColumn == 'employee_fname'" class="material-icons">{{arrowIconName}}</span>
		                    <span v-else class="material-icons">sort</span>
		                </th>
		                <th class="col" @click="sortTable('pdspersonalinformation')">Last Edited
		                    <span v-if="sortColumn == 'pdspersonalinformation'" class="material-icons">{{arrowIconName}}</span>
		                    <span v-else class="material-icons">sort</span>
		                </th>
		                <th class="col"></th>
		    		</tr>
		    	</thead>
		    	<tbody>
		    		<template v-for="employee in filteredEmployees" :key="employee.employee_id">
		
		    				<tr @click="goshow(employee.employee_id)">			
							
		    				<td class="ttc">
		    					<template v-if="employee.employee_fname">
		    						<template v-if="checkText(employee.employee_fname)">{{ employee.employee_fname }}&nbsp;</template>
		    					</template>	
		    					<template v-if="employee.employee_mname.replace(/ /g, '').length > 1">
		    						<template v-if="checkText(employee.employee_mname)">{{ employee.employee_mname.charAt(0).toUpperCase() }}. </template>
		    					</template>
		    					<template v-if="employee.employee_lname">
		    						<template v-if="checkText(employee.employee_lname)">{{employee.employee_lname}}</template>
		    					</template>
		    					<template v-if="employee.employee_extname">
		    						<template v-if="checkText(employee.employee_extname)">{{employee.employee_extname}}</template>
		    					</template>
		    				 	 
		    				</td>
		    				<td>
		    					<template v-if="employee.pdspersonalinformation">		
		    						<template v-if="employee.pdspersonalinformation.updated_at">
		    							{{moment(employee.pdspersonalinformation.updated_at).format('LLLL')}}
		    						</template>
		    					</template>
		    				</td>
			    			<td @click.stop>
			    				<ul class="ls-frmbutton text-end">
			    					<li>
			    						<a class="btn btn-download btn-outline-danger" :href="'/hrmis/api/export/pds/'+employee.employee_id"><i class="fa-solid fa-download"></i> Download</a>
			    					</li>
	                               	<li v-if="userrole == 'super-admin'" >
                                        <button title="Reset Data" class="btn btn-teal" @click="resetPDS(employee.employee_id)">
                                            <i class="fa-solid fa-eraser"></i> Reset
                                        </button>
                                    </li>                               	
	                            </ul>
			    			</td>
		    			</tr>
		    		</template>
		    	</tbody>
		    </table>
		</div>
	</div>
</template>

<script>
	import useEmployees from '@/composables/composables-employees';
	import useOfficerecord from '@/composables/composables-record';

	import {onMounted ,ref, computed, inject} from 'vue';
	import { sortBy} from 'lodash';
	import {useRouter} from 'vue-router'
	import PDSPreviewPage1 from '@/components/pds/PDSPreviewPage1.vue';
	import PDSPreviewPage2 from '@/components/pds/PDSPreviewPage2.vue';
	import PDSPreviewPage3 from '@/components/pds/PDSPreviewPage3.vue';
	import moment from 'moment'
	import { useAuthStore } from '@/stores/store.js'

	export default{
		components: {
	        PDSPreviewPage1,

	    },
		setup(){
			const store = useAuthStore();
            const userrole = ref(store.getdetails[1]);
            const authid = ref(store.getdetails[0]);
			const swal = inject('$swal')
			
			const {employees, getEmployees} = useEmployees()
			const { resetMyPds} = useOfficerecord()

			const searchQuery = ref("");
			let sort = ref(false);
			let updatedList = ref([])
			const router = useRouter()
			
			const sortColumn = ref("id");
        	const sortDirection = ref(1);
			const arrowIconName = ref("arrow_drop_up");			
			const previewID = ref(0);
			const showModal = ref(false)
			const clickModal = (id) => {
				showModal.value = true;
				previewID.value = id;
			}
			onMounted(getEmployees)		


			const filteredEmployees = computed(function(){
				return employees.value.filter(
					(employee) => employee.employee_fname.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1 || 
							  employee.employee_mname.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1 ||
							  employee.employee_lname.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1 ||
							  (employee.pdspersonalinformation.updated_at && moment(employee.pdspersonalinformation.updated_at).format('LLLL').toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1)
				);
			});

			const sortTable = (columnName) => {
	            sortColumn.value = columnName;
	            sortDirection.value = -1 * sortDirection.value;

	            if (sortDirection.value == 1) {
	                arrowIconName.value = "arrow_drop_up";
	                if (columnName === 'pdspersonalinformation') {
	                	filteredEmployees.value.sort((a, b) => 
	                	{
	                		if (a['pdspersonalinformation']['updated_at'] === null) {
							    return 1;
							  }

							  if (b['pdspersonalinformation']['updated_at'] === null) {
							    return -1;
							  }
							  if (a['pdspersonalinformation']['updated_at'] === b['pdspersonalinformation']['updated_at']) {
							    return 0;
							  }

							  return a > b ? 1 : -1;
	                	});

	                }else{
	                	filteredEmployees.value.sort((a, b) => (a[columnName] > b[columnName] ? 1 : -1));
	                }

	            } else {
	                arrowIconName.value = "arrow_drop_down";
	                if (columnName === 'pdspersonalinformation') {

	                	filteredEmployees.value.sort((a, b) => {
	                		if (a['pdspersonalinformation']['updated_at'] === null) {
							    return 1;
							  }

							  if (b['pdspersonalinformation']['updated_at'] === null) {
							    return -1;
							  }
							  if (a['pdspersonalinformation']['updated_at'] === b['pdspersonalinformation']['updated_at']) {
							    return 0;
							  }
							  return a < b ? 1 : -1;
	                	});
	                }else{
	                	filteredEmployees.value.sort((a, b) => (a[columnName] < b[columnName] ? 1 : -1));
	                	
	                }               


	            }

	        }

			const resetPDS = async(id) => {
	            let x = 0; //trigger

	                await swal.fire({
	                  title: 'Are you sure?',
	                  text: "You won't be able to revert this!",
	                  icon: 'warning',
	                  showCancelButton: true,
	                  confirmButtonColor: '#3085d6',
	                  cancelButtonColor: '#d33',
	                  confirmButtonText: 'Yes, reset it!'
	                }).then((result) => {
	                  if (result.isConfirmed) {         
	                    x = 1;
	                  }
	                })
	                if (x > 0) {

	                    await resetMyPds(id);
	                    await getEmployees().then(() => {
	                        swal.fire({
	                            toast: true,
	                            position: 'top-end',
	                            title: 'PDS has been reset successfully',
	                            showConfirmButton: false,            
	                            icon: 'success',
	                            width: '300',
	                            padding: '.5em 1em',
	                            timerProgressBar: true,
	                            timer:1500,
	                            customClass: {
	                                container: 'swaltopright'
	                            }
	                        })
	                    });
	                }
	        }
			const goshow = (id) => {
				router.push({ name: 'pdspreview.show', params: { id: id } });
			}

			const checkText = (text) => {
	            let newText = text.toLowerCase().replace(/ /g, '');
	            let x = false;
	            if(newText !== 'n/a' && newText !== 'na'){
	                x = true;
	            }
	            return x;
	        }

			return{
				filteredEmployees,
				resetPDS,
				searchQuery,
				sortTable,
				sortColumn,
				goshow,
				arrowIconName,
				showModal,
				clickModal,
				previewID,
				moment,
				checkText,
				authid,
				userrole
			}
		}
	}
</script>
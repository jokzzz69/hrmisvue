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
		    <div class="mtmb mt-2 mb-2 tblWrap">
		    	<table class="mtable table tbllink tblPDS">
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
			    		<template v-if="filteredEmployees.length > 0">
			    			<template v-for="employee in filteredEmployees" :key="employee.employee_id">			
				    			<tr @click="goshow(employee.employee_id)">
				    				<td class="ttc">{{employee.cname}}</td>
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
					    						<button class="btn btn-download btn-outline-danger" title="Download" @click.prevent="downloadselectedpds(employee.employee_id, employee.cname)"><i class="fa-solid fa-download"></i> <span class="actionText">Download</span>
					    							
					    						</button>
					    					</li>
			                               	<li v-if="userrole == 'super-admin'" >
		                                        <button title="Reset Data" class="btn btn-teal" @click="resetPDS(employee.employee_id)">
		                                            <i class="fa-solid fa-eraser"></i> <span class="actionText">Reset</span>
		                                        </button>
		                                    </li>                               	
			                            </ul>
					    			</td>
				    			</tr>
				    		</template>
			    		</template>
			    		<template v-else>
                            <template v-if="!noData">
                                <tr class="pr nodata">
                                	<td colspan="3">
	                                	<template v-if="searchQuery && !filteredEmployees.length">               
					                    	No Result Found		                
					                    </template>
	                                    <template v-else>                                    	
		                                    <LoadingComponent/>
	                                    </template>
                                	</td>
                                </tr>
                            </template>
                        </template>
                        <template v-if="noData">                                
                            <tr class="nodata pr">
                                <td colspan="3"><span class="nodata">PDS is Empty </span>
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
	import useEmployees from '@/composables/composables-employees';
	import useOfficerecord from '@/composables/composables-record';
	import usePDS from '@/composables/composables-pds';

	import {onMounted ,ref, computed, inject} from 'vue';
	import { sortBy} from 'lodash';
	import {useRouter} from 'vue-router'
	import PDSPreviewPage1 from '@/components/pds/PDSPreviewPage1.vue';
	import PDSPreviewPage2 from '@/components/pds/PDSPreviewPage2.vue';
	import PDSPreviewPage3 from '@/components/pds/PDSPreviewPage3.vue';
	import moment from 'moment'
	import { useAuthStore } from '@/stores/store.js'
	import { useHead } from '@unhead/vue'
	import LoadingComponent from '@/components/loader/LoadingComponent.vue';
	export default{
		components: {
	        PDSPreviewPage1,
	        LoadingComponent
	    },
		setup(){
			useHead({
                title: 'Employees PDS | '+import.meta.env.VITE_BFAR_AGENCY
            })
			const store = useAuthStore();
            const userrole = ref(store.getdetails[1]);
            const authid = ref(store.getdetails[0]);
			const swal = inject('$swal')
			
			const {employees, getEmployees} = useEmployees()
			const { resetMyPds} = useOfficerecord()
			const {downloadPDS} = usePDS();

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
			const noData = ref(false)

			onMounted(() =>{
				getEmployees().then(() => {
					if(employees.value.length > 0){
                        noData.value = false;
                    }else{
                        noData.value = true;
                    }
				})
			})		


			const filteredEmployees = computed(function(){
				return employees.value.filter(
					(employee) => (employee.employee_fname && employee.employee_fname.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1) || 
							  (employee.employee_mname && employee.employee_mname.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1) ||
							  (employee.employee_lname && employee.employee_lname.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1) ||
							  (employee.employee_extname && employee.employee_extname.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1 ) ||
							  (employee.pdspersonalinformation && employee.pdspersonalinformation.updated_at && moment(employee.pdspersonalinformation.updated_at).format('LLLL').toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1)
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
	        const downloadselectedpds = async(id, name) => {
	        	await downloadPDS(id,name);
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
				userrole,
				downloadselectedpds,
				noData
			}
		}
	}
</script>
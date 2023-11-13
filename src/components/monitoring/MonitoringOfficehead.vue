<template>
	<div class="row">
		<div class="col-md-12 p-title">
			<h2>Employees Daily Time Record</h2>
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
		    <div class="mtmb tblWrap mt-2 mb-2">
		    	<table class="mtable table tbllink">
			    	<thead>
			    		<tr>
			    			<th @click="sortTable('employee_id')">Bio ID
			                    <span v-if="sortColumn == 'employee_id'" class="material-icons">{{arrowIconName}}</span>
			                    <span v-else class="material-icons">sort</span>
			                </th>
			    			<th @click="sortTable('employee_fname')">First Name
			                    <span v-if="sortColumn == 'employee_fname'" class="material-icons">{{arrowIconName}}</span>
			                    <span v-else class="material-icons">sort</span>
			                </th>
			                <th @click="sortTable('employee_mname')">Middle Name
			                    <span v-if="sortColumn == 'employee_mname'" class="material-icons">{{arrowIconName}}</span>
			                    <span v-else class="material-icons">sort</span>
			                </th>
			                <th @click="sortTable('employee_lname')"> Last Name
			                    <span v-if="sortColumn == 'employee_lname'" class="material-icons">{{arrowIconName}}</span>
			                    <span v-else class="material-icons">sort</span>
			                </th>
			                <th @click="sortTable('position')"> Position
			                    <span v-if="sortColumn == 'position'" class="material-icons">{{arrowIconName}}</span>
			                    <span v-else class="material-icons">sort</span>
			                </th>
			         
			    		</tr>
			    	</thead>
			    	<tbody>
			    		<template v-if="filteredOfficeRecords.length > 0">
			    			<template v-for="officerecord in filteredOfficeRecords" :key="officerecord.employee_id">

				    			<tr @click="goshow(officerecord.employee_id)">
				    				<td>
				    					<template v-if="officerecord.type">
				    						<template v-if="officerecord.type.id> 0">
				    							<span class="text-danger">{{officerecord.employee_id}}</span>
				    						</template>
				    						<template v-else>
				    							<span class="text-primary">{{officerecord.employee_id}}</span>
				    						</template>
				    					</template>
				    					<template v-else>
				    						<span>{{officerecord.employee_id}}</span>
				    					</template>
				    				</td>
				    				<td>{{officerecord.employee.employee_fname}}</td>
				    				<td>{{officerecord.employee.employee_mname}}</td>
				    				<td>{{officerecord.employee.employee_lname}}</td>
				    				<td>
				    					<span v-if="officerecord.employments.length > 0">
				    						{{officerecord.employments[0].position.name}}
				    					</span>
				    				</td>
				
				    			</tr>
				    		</template>
			    		</template>
			    		<template v-else>
                            <template v-if="!noData">
                                <tr class="pr nodata">
                                	<td colspan="5">
                                	<template v-if="searchQuery && !filteredOfficeRecords.length">               
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
                                <td colspan="5"><span class="nodata">Record is Empty </span>
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

	import useOfficerecord from '@/composables/composables-record';
	import useOffices from '@/composables/composables-office';

	import {onMounted ,ref, computed} from 'vue';
	import { sortBy, flatten } from 'lodash';
	import {useRouter} from 'vue-router'

	import { useHead } from '@unhead/vue'
	import LoadingComponent from '@/components/loader/LoadingComponent.vue';

	export default{
		components: {
            LoadingComponent
        },
		setup(){
			useHead({
                title: 'Employees DTR | BFAR - CAR HRMIS'
            })
			const {officerecords,getOfficeemployeesMonitoring} = useOfficerecord()
			const {offices, getOffices} = useOffices()

			const searchQuery = ref("");
			let sort = ref(false);
			let updatedList = ref([])
			const router = useRouter()
			const officeVal = ref('');


			const sortColumn = ref("id");
        	const sortDirection = ref(1);
			const arrowIconName = ref("arrow_drop_up");			
		
			const noData = ref(false)

			onMounted(() => {
				getOfficeemployeesMonitoring().then(() =>{
					if(officerecords.value.length > 0){
                        noData.value = false;
                    }else{
                        noData.value = true;
                    }
				}), 
				getOffices()
			})		

			const filteredOfficeRecords = computed(function(){
				return officerecords.value.filter(
					(officerecord) =>	officerecord.employee_id.toString().toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1 ||
										(officerecord.employee && officerecord.employee.employee_fname.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1)	|| 
										(officerecord.employee && officerecord.employee.employee_mname.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1)	||
										(officerecord.employee && officerecord.employee.employee_lname.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1)	||
										(officerecord.employments && officerecord.employments[0].position && officerecord.employments[0].position.name.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1)		
				);
			});

			const sortTable = (columnName) => {
	            sortColumn.value = columnName;
	            sortDirection.value = -1 * sortDirection.value;
	            if (sortDirection.value == 1) {
	                arrowIconName.value = "arrow_drop_up";
	                if(columnName === 'employee_fname' || columnName === 'employee_mname' || columnName === 'employee_lname'){	     
	                	filteredOfficeRecords.value.sort((a, b) => (a['employee'][columnName] > b['employee'][columnName] ? 1 : -1));
	                }else if (columnName === 'position') {

	                	filteredOfficeRecords.value.sort((a, b) => (a['employments'][0]['position']['name'] > b['employments'][0]['position']['name'] ? 1 : -1));
	                }else{
	                	filteredOfficeRecords.value.sort((a, b) => (a[columnName] > b[columnName] ? 1 : -1));
	                }

	            } else {
	                arrowIconName.value = "arrow_drop_down";

	                if(columnName === 'employee_fname' || columnName === 'employee_mname' || columnName === 'employee_lname'){	     
	                	filteredOfficeRecords.value.sort((a, b) => (a['employee'][columnName] < b['employee'][columnName] ? 1 : -1));
	                }else if (columnName === 'position') {
	                	filteredOfficeRecords.value.sort((a, b) => (a['employments'][0]['position']['name'] < b['employments'][0]['position']['name'] ? 1 : -1));
	                }else{
	                	filteredOfficeRecords.value.sort((a, b) => (a[columnName] < b[columnName] ? 1 : -1));
	                }	                

	            }
	        }


			const goshow = (id) => {
				router.push({ name: 'monitoringofficeemployee.show', params: { id: id } });
			}

			return{
				filteredOfficeRecords,
				searchQuery,
				sortTable,
				sortColumn,
				goshow,
				arrowIconName,
				offices,
				officeVal,
				noData
				
			}
		}
	}
</script>
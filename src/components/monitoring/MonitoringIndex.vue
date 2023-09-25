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
		    <table class="mtable mt-2 mb-2 table tbllink">
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
		                <th @click="sortTable('office')">Office
		                    <span v-if="sortColumn == 'office'" class="material-icons">{{arrowIconName}}</span>	
		                    <span v-else class="material-icons">sort</span>
		                </th>

		    		</tr>
		    	</thead>
		    	<tbody>
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
		    				<td class="ttc">{{officerecord.employee.employee_fname}}</td>
		    				<td class="ttc">{{officerecord.employee.employee_mname}}</td>
		    				<td class="ttc">{{officerecord.employee.employee_lname}} {{officerecord.employee.employee_extname}}</td>
		    				<td>		

		    					<span v-if="officerecord.employments.length > 0">
		    						{{officerecord.employments[0].position.name}}
		    					</span>
		    				</td>
			    			<td>
			    				<span v-if="officerecord.employments.length > 0">
			    					{{officerecord.employments[0].office.offices_name}}
				    			</span>
				    		</td>

		    			</tr>
		    		</template>
		    	</tbody>
		    </table>
		</div>
	</div>
</template>

<script>

	import useOfficerecord from '../../composables/composables-record';
	import useOffices from '../../composables/composables-office';

	import {onMounted ,ref, computed} from 'vue';
	import { sortBy, flatten } from 'lodash';
	import {useRouter} from 'vue-router'


	export default{
		setup(){
			const {officerecords, getOfficerecords,getOfficerecordsMonitoring} = useOfficerecord()
			const {offices, getOffices} = useOffices()

			const searchQuery = ref("");
			let sort = ref(false);
			let updatedList = ref([])
			const router = useRouter()
			const officeVal = ref('');


			const sortColumn = ref("id");
        	const sortDirection = ref(1);
			const arrowIconName = ref("arrow_drop_up");			
		

			onMounted(() => {
				getOfficerecordsMonitoring(), 
				getOffices()
			})		
			
			const filteredOfficeRecords = computed(function(){
				return officerecords.value.filter(
					(officerecord) =>	officerecord.employee_id.toString().toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1 ||
										(officerecord.employee && officerecord.employee.employee_fname && officerecord.employee.employee_fname.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1)	|| 
										(officerecord.employee && officerecord.employee.employee_mname&& officerecord.employee.employee_mname.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1)	||
										(officerecord.employee && officerecord.employee.employee_lname &&officerecord.employee.employee_lname.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1)	||
										(officerecord.employee && officerecord.employee.employee_extname && officerecord.employee.employee_extname.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1)	||
										(officerecord.employments && officerecord.employments[0].position && officerecord.employments[0].position.name.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1)	||
										(officerecord.employments && officerecord.employments[0].office && officerecord.employments[0].office.offices_name.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1)
									
							 
				);
			});

			const sortTable = (columnName) => {
	            sortColumn.value = columnName;
	            sortDirection.value = -1 * sortDirection.value;
	            if (sortDirection.value == 1) {
	                arrowIconName.value = "arrow_drop_up";
	                if(columnName === 'employee_fname' || columnName === 'employee_mname' || columnName === 'employee_lname'){	     
	                	filteredOfficeRecords.value.sort((a, b) => (a['employee'][columnName] > b['employee'][columnName] ? 1 : -1));
	                }else if (columnName === 'position') {	                	//filteredOfficeRecords.value.sort((a, b) => (a['position']['name'] > b['position']['name'] ? 1 : -1));
	                	filteredOfficeRecords.value.sort((a, b) => (a['employments'][0]['position']['name'] > b['employments'][0]['position']['name'] ? 1 : -1));

	                }else if (columnName === 'office') {
	                	//filteredOfficeRecords.value.sort((a, b) => (a['office']['offices_name'] > b['office']['offices_name'] ? 1 : -1));
	                	filteredOfficeRecords.value.sort((a, b) => (a['employments'][0]['office']['offices_name'] > b['employments'][0]['office']['offices_name'] ? 1 : -1));
	                }else{
	                	filteredOfficeRecords.value.sort((a, b) => (a[columnName] > b[columnName] ? 1 : -1));
	                }

	            } else {
	                arrowIconName.value = "arrow_drop_down";

	                if(columnName === 'employee_fname' || columnName === 'employee_mname' || columnName === 'employee_lname'){	     
	                	filteredOfficeRecords.value.sort((a, b) => (a['employee'][columnName] < b['employee'][columnName] ? 1 : -1));
	                }else if (columnName === 'position') {
	                	filteredOfficeRecords.value.sort((a, b) => (a['employments'][0]['position']['name'] < b['employments'][0]['position']['name'] ? 1 : -1));
	                }else if (columnName === 'office') {
	                	filteredOfficeRecords.value.sort((a, b) => (a['employments'][0]['office']['offices_name'] < b['employments'][0]['office']['offices_name'] ? 1 : -1));
	                }else{
	                	filteredOfficeRecords.value.sort((a, b) => (a[columnName] < b[columnName] ? 1 : -1));
	                }

	                


	            }
	        }


			const goshow = (id) => {
				router.push({ name: 'monitoring.show', params: { id: id } });
			}

			return{
				filteredOfficeRecords,
				searchQuery,
				sortTable,
				sortColumn,
				goshow,
				arrowIconName,
				offices,

				officeVal
				
			}
		}
	}
</script>
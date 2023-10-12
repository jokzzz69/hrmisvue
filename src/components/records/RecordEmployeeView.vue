<template>
	<div class="row">
		<div class="col-md-12 p-title">
			<h2>Employees Information</h2>
		</div>
	</div>

	<div class="row">
		<div class="col-md-12">
		    <div class="row">
		    	<div class="col">
		    		<div class="form-group">
		    			<input type="text" name="inputSearch"  placeholder="search..." class="border-blue form-control" v-model="searchQuery">
		    		</div>
		    	</div>
		    </div>
		    <div class="mtmb">
		    	<table class="mtable hasActions mt-2 mb-2 table tblempinfo">
			    	<thead>
			    		<tr>
			    			<th @click="sortTable('employee_id')">ID
			    				<span v-if="sortColumn == 'employee_id'" class="material-icons">{{arrowIconName}}</span>
			                    <span v-else class="material-icons">sort</span>
			    			</th>
			    			<th @click="sortTable('employee_fname')">Name
			                    <span v-if="sortColumn == 'employee_fname'" class="material-icons">{{arrowIconName}}</span>
			                    <span v-else class="material-icons">sort</span>
			                </th>
			                <th @click="sortTable('emergency_contactperson')">Emergency Contact
			                    <span v-if="sortColumn == 'emergency_contactperson'" class="material-icons">{{arrowIconName}}</span>
			                    <span v-else class="material-icons">sort</span>
			                </th>
			                <th @click="sortTable('type')">Type
			                    <span v-if="sortColumn == 'type'" class="material-icons">{{arrowIconName}}</span>
			                    <span v-else class="material-icons">sort</span>
			                </th>
		
			                <th @click="sortTable('position')">Position
			                    <span v-if="sortColumn == 'position'" class="material-icons">{{arrowIconName}}</span>
			                    <span v-else class="material-icons">sort</span>
			                </th>
			                <th @click="sortTable('office')">Office
			                    <span v-if="sortColumn == 'office'" class="material-icons">{{arrowIconName}}</span>		                    
			                    <span v-else class="material-icons">sort</span>
			                </th>
			                <th @click="sortTable('startdate')">Birth Date
			                    <span v-if="sortColumn == 'startdate'" class="material-icons">{{arrowIconName}}</span>		                    
			                    <span v-else class="material-icons">sort</span>
			                </th>
							<th>
								Blood Type
							</th>
							<th>
								Email Address
							</th>
							<th>
								GSIS
							</th>
							<th>
								SSS
							</th>
							<th>
								TIN
							</th>
							<th>
								PAGIBIG
							</th>
							<th>
								PhilHealth
							</th>
			    		</tr>
			    	</thead>
			    	<tbody>
			    		<template v-for="officerecord in filteredOfficeRecords" :key="officerecord.employee_id">

			    			<tr>
			    				<td>
			    					<template v-if="officerecord.employee">
			    						{{officerecord.employee.employee_id}}
			    					</template>
			    				</td>
			    				<td class="ttc"> 	
			    					<template v-if="officerecord.employee">
			    						<template v-if="officerecord.employee.employee_fname">
				    						<template v-if="checkText(officerecord.employee.employee_fname)">{{ officerecord.employee.employee_fname}}&nbsp;</template>
				    					</template>		
				    					<template v-if="officerecord.employee.employee_mname">
				    						<template v-if="officerecord.employee.employee_mname.replace(/ /g, '').length > 1">
					    						<template v-if="checkText(officerecord.employee.employee_mname)">{{ officerecord.employee.employee_mname.charAt(0).toUpperCase() }}. </template>
					    					</template>
				    					</template>
				    					<template v-if="officerecord.employee.employee_lname">
				    						<template v-if="checkText(officerecord.employee.employee_lname)">{{officerecord.employee.employee_lname}}&nbsp;</template>
				    					</template>
				    					<template v-if="officerecord.employee.employee_extname">
				    						<template v-if="checkText(officerecord.employee.employee_extname)">{{officerecord.employee.employee_extname}}</template>
				    					</template>	
			    					</template>			
			    				</td>
			    				<td class="ttc">
			    					{{officerecord.emergency_contactperson}}<template v-if="officerecord.emergency_contactnumber"><br/>0{{officerecord.emergency_contactnumber}}</template>
			    				</td>
			    				 <td>
			    				 	<template v-if="officerecord.employments.length > 0">
			    				 		<template v-if="officerecord.employments[0].type">
			    				 			{{officerecord.employments[0].type.name}}
			    				 		</template>		    				 		
			    				 	</template>
			    				 </td>

			    				 <td>
			    				 	<template v-if="officerecord.employments.length > 0">
			    				 		<template v-if="officerecord.employments[0].position">
			    				 			{{officerecord.employments[0].position.name}}
			    				 		</template>		    				 		
			    				 	</template>
			    				 </td>
				    			<td>
				    				<template v-if="officerecord.employments.length > 0">
			    				 		<template v-if="officerecord.employments[0].office">
			    				 			{{officerecord.employments[0].office.offices_name}}
			    				 		</template>		    				 		
			    				 	</template>
				    			</td>
				    			<td>
				    				<template v-if="officerecord.pdspersonalinformation">
			    				 		<template v-if="officerecord.pdspersonalinformation.birthdate">			    				 
			    				 			{{moment(new Date(officerecord.pdspersonalinformation.birthdate)).format('MMMM D, Y')}}   		
			    				 		</template>		    				 		
			    				 	</template>
				    			</td>
				    			<td>
				    				<template v-if="officerecord.pdspersonalinformation">
			    				 		 {{officerecord.pdspersonalinformation.bloodtype}} 		
			    				 	</template>
				    			</td>
				    			<td>
				    				<template v-if="officerecord.pdspersonalinformation">
			    				 		 {{officerecord.pdspersonalinformation.emailaddress}} 		
			    				 	</template>
				    			</td>
				    			<td>
				    				<template v-if="officerecord.pdspersonalinformation">
			    				 		 {{officerecord.pdspersonalinformation.gsis_id}} 		
			    				 	</template>
				    			</td>
				    			<td>
				    				<template v-if="officerecord.pdspersonalinformation">
			    				 		 {{officerecord.pdspersonalinformation.sss_no}} 		
			    				 	</template>
				    			</td>
				    			<td>
				    				<template v-if="officerecord.pdspersonalinformation">
			    				 		 {{officerecord.pdspersonalinformation.tin_no}} 		
			    				 	</template>
				    			</td>
				    			<td>
				    				<template v-if="officerecord.pdspersonalinformation">
			    				 		 {{officerecord.pdspersonalinformation.pagibig_id}} 		
			    				 	</template>
				    			</td>
				    			<td>
				    				<template v-if="officerecord.pdspersonalinformation">
			    				 		 {{officerecord.pdspersonalinformation.philhealth_no}} 		
			    				 	</template>
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
	import {onMounted ,ref, computed, inject, reactive} from 'vue';
	import { sortBy, orderBy} from 'lodash';

	import useArchive from '@/composables/composables-archive';
	import moment from 'moment';

	import { useHead } from '@unhead/vue'

	export default{
		setup(){
			useHead({
	            title: 'Employees Information | BFAR - CAR HRMIS'
	        })


			const {officerecords, getOfficerecordsEmployee }= useOfficerecord()


			const searchQuery = ref("");

			
			const sortColumn = ref("id");
        	const sortDirection = ref(1);
			const arrowIconName = ref("arrow_drop_up");			

	

			onMounted(() => {
				getOfficerecordsEmployee()
			})		


			const filteredOfficeRecords = computed(function(){
				return officerecords.value.filter(
					(officerecord) => 
						(officerecord.employee_id.toString().toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1 ) || 
						(officerecord.emergency_contactperson && officerecord.emergency_contactperson.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1 ) || 
						(officerecord.employee && officerecord.employee.employee_fname.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1 ) || 
						(officerecord.employee && officerecord.employee.employee_mname.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1 ) ||
						(officerecord.employee && officerecord.employee.employee_lname.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1 ) ||

						(officerecord.employments && officerecord.employments[0].office && officerecord.employments[0].office.offices_name.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1)	||
						(officerecord.employments && officerecord.employments[0].position && officerecord.employments[0].position.name.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1)	||
						(officerecord.employments && officerecord.employments[0].status && officerecord.employments[0].status.name.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1)	||
						(officerecord.employments && officerecord.employments[0].type && officerecord.employments[0].type.name.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1)	||
						(officerecord.employments && officerecord.employments[0].startdate && moment(officerecord.employments[0].startdate).format('MMMM D, Y').toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1)	

				);
			});

			const sortTable = (columnName) => {
	            sortColumn.value = columnName;
	            sortDirection.value = -1 * sortDirection.value;
	            if (sortDirection.value == 1) {
	                arrowIconName.value = "arrow_drop_up";
	                if(columnName === 'employee_fname'){	     
	                	filteredOfficeRecords.value.sort((a, b) => (a['employee'][columnName] > b['employee'][columnName] ? 1 : -1));
	                }else if (columnName === 'position') {
	                	filteredOfficeRecords.value.sort((a, b) => (a['employments'][0]['position']['name'] > b['employments'][0]['position']['name'] ? 1 : -1));
	                }else if (columnName === 'office') {
	                	filteredOfficeRecords.value.sort((a, b) => (a['employments'][0]['office']['offices_name'] > b['employments'][0]['office']['offices_name'] ? 1 : -1));
	                }else if (columnName === 'status') {
	                	filteredOfficeRecords.value.sort((a, b) => (a['employments'][0]['status']['name'] > b['employments'][0]['status']['name'] ? 1 : -1));
	                }else if (columnName === 'type') {
	                	filteredOfficeRecords.value.sort((a, b) => (a['employments'][0]['type']['name'] > b['employments'][0]['type']['name'] ? 1 : -1));
	                }else if (columnName === 'startdate') {
	                	filteredOfficeRecords.value.sort((a, b) => (a['employments'][0]['startdate'] > b['employments'][0]['startdate'] ? 1 : -1));
	                }else if(columnName === 'emergency_contactperson') {
	                	filteredOfficeRecords.value.sort((a, b) => {
	                		if (a[columnName] === null) {
							    return 1;
							  }

							  if (b[columnName] === null) {
							    return -1;
							  }

							  if (a[columnName] === b[columnName]) {
							    return 0;
							  }

							  return a > b ? 1 : -1;
	                	});
	                }else{
	                	filteredOfficeRecords.value.sort((a, b) => (a[columnName] > b[columnName] ? 1 : -1));
	                }

	            } else {
	                arrowIconName.value = "arrow_drop_down";
	                if(columnName === 'employee_fname'){	     
	                	filteredOfficeRecords.value.sort((a, b) => (a['employee'][columnName] < b['employee'][columnName] ? 1 : -1));
	                }else if (columnName === 'position') {
	                	filteredOfficeRecords.value.sort((a, b) => (a['employments'][0]['position']['name'] < b['employments'][0]['position']['name'] ? 1 : -1));
	                }else if (columnName === 'office') {
	                	filteredOfficeRecords.value.sort((a, b) => (a['employments'][0]['office']['offices_name'] < b['employments'][0]['office']['offices_name'] ? 1 : -1));
	                }else if (columnName === 'status') {
	                	filteredOfficeRecords.value.sort((a, b) => (a['employments'][0]['status']['name'] < b['employments'][0]['status']['name'] ? 1 : -1));
	                }else if (columnName === 'type') {
	                	filteredOfficeRecords.value.sort((a, b) => (a['employments'][0]['type']['name'] < b['employments'][0]['type']['name'] ? 1 : -1));
	                }else if (columnName === 'startdate') {
	                	filteredOfficeRecords.value.sort((a, b) => (a['employments'][0]['startdate'] < b['employments'][0]['startdate'] ? 1 : -1));
	                }else if(columnName === 'emergency_contactperson') {
	                	filteredOfficeRecords.value.sort((a, b) => {
	                		if (a[columnName] === null) {
							    return 1;
							  }

							  if (b[columnName] === null) {
							    return -1;
							  }

							  if (a[columnName] === b[columnName]) {
							    return 0;
							  }

							  return a < b ? 1 : -1;
	                	});
	                }else{
	                	filteredOfficeRecords.value.sort((a, b) => (a[columnName] < b[columnName] ? 1 : -1));	                	
	                }               
	            }
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
				filteredOfficeRecords,

				searchQuery,
				sortTable,
				sortColumn,
				arrowIconName,
				checkText,

				moment,
			}
		}
	}
</script>
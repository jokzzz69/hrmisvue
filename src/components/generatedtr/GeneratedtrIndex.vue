<template>
	<div class="row">
		<div class="col-md-12 p-title">
			<h2>Generate Daily Time Record</h2>
		</div>
	</div>

		<form  @submit.prevent="generatenewEmployeesDTR" class="mb-2 pb-2">
			<div class="row">
				<div class="col xs-100 sm-50 xxs-100 col-sm-6 col-md-3">
					<div class="mb-2 form-floating">
			            <select class="form-select border-blue" name="dtremployeetype" v-model="form.dtremployeetype">
			                <option disabled value="">Select Type</option>
			                <option value="0" >Permanent</option>
			                <option value="1" >Job Order</option>
			            </select>     
			            <label class="form-label" for="dtremployeetype">Employee Type</label> 
			        </div>
			        <div class="mb-2 form-floating">
			            <select class="form-select border-blue" name="dtrmonthtype" v-model="form.dtrmonthtype">
			                <option disabled value="">Select Range</option>
			                <option value="1" >1st Half</option>
			                <option value="2" >2nd Half</option>
			                <option value="3" >Full Month</option>
			            </select>     
			            <label class="form-label" for="dtrmonthtype">Month Range</label> 
			        </div>
			        <div class="mb-2 date-form-floating">                
			            <Datepicker v-model="form.monthpicked" id="fdate" auto-apply month-picker placeholder="Select Month" :clearable="false"></Datepicker>  
			        </div>  		         
			        <template v-if="form.dtremployeetype != '' && form.dtrmonthtype != '' && form.monthpicked != '' && selected.length > 0 ">
			        	<ul class="ulbtn-generate">
				            <li>
					           <a :href="'/hrmis/api/export/employeesdtr/'+form.dtremployeetype+','+form.dtrmonthtype+','+form.monthpicked.month+','+form.monthpicked.year+'&'+selected" type="button" class="btn btn-outline-danger btn-exportEmps" title="Export Data to PDF"><i class="fa-regular fa-file-pdf"></i> Download</a>

				            </li>		
				        </ul>
			        </template>		        
				</div>
				<div class="col xs-100 sm-50 xxs-100 col-sm-6 col-md-2">
					<div class="officesSelect" >
						<label class="form-label fm"><strong>Offices</strong></label>

						<div class="form-check form-switch">
						  <input class="form-check-input" @change='updateCheck()' type="checkbox" id="alloffice"  v-model="allSelected" value="alloffice">
						  <label class="form-check-label" for="alloffice">All Offices</label>
						</div>			

						<template v-for="location in customlocations">
							<div class="form-check form-switch childCheck">
							  <input class="form-check-input" @change='selectCheck()' type="checkbox" :id="location.location_id" checked v-model="selected" :value="location.location_id">
							  <label class="form-check-label" :for="location.location_id">{{location.location_name}}</label>
							</div>	
						</template>
					</div>
				</div>
			</div>
	    </form>



	    <div class="row">
	    	<div class="col mt-4">
	    		<div class="form-group">
	    			<input type="text" name="inputSearch"  placeholder="search..." class="form-control border-blue" v-model="searchQuery">
	    		</div>
	    	</div>
	    </div>
		<div class="row">
			<div class="col-md-12">
		    <table class="mtable hasActions mt-2 mb-2 table tbllink">
		    	<thead>
		    		<tr>
		    			<th @click="sortTable('employee_fname')">First Name
		                    <span v-if="sortColumn == 'employee_fname'" class="material-icons">{{arrowIconName}}</span>
		                    <span v-else class="material-icons">sort</span>
		                </th>
		                <th @click="sortTable('employee_mname')">Middle Name
		                    <span v-if="sortColumn == 'employee_mname'" class="material-icons">{{arrowIconName}}</span>
		                    <span v-else class="material-icons">sort</span>
		                </th>
		                <th @click="sortTable('employee_lname')">Last Name
		                    <span v-if="sortColumn == 'employee_lname'" class="material-icons">{{arrowIconName}}</span>		                    
		                    <span v-else class="material-icons">sort</span>
		                </th>
		                <th @click="sortTable('employee_type')">Type
		                    <span v-if="sortColumn == 'employee_type'" class="material-icons">{{arrowIconName}}</span>		                    
		                    <span v-else class="material-icons">sort</span>
		                </th>
		    		</tr>
		    	</thead>
		    	<tbody>
		    		<template v-for="employee in filteredEmployees" :key="employee.employee_id">
		    			<tr @click="goshow(employee.employee_id)">
		    				<td>{{employee.employee_fname}}</td>
			    			<td>{{employee.employee_mname}}</td>
			    			<td>{{employee.employee_lname}}</td>
			    			<td>
			    				<template v-if="employee.employee_type != 0">
			    					Job Order
			    				</template>
			    				<template v-else>
			    					Permanent
			    				</template>
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
	import useGeneratedtr from '@/composables/composables-generatedtr';
	import useLocations from '@/composables/composables-location';

	import {onMounted ,ref, computed, reactive} from 'vue';
	import { sortBy} from 'lodash';
	import {useRouter} from 'vue-router'
	import axios from 'axios';


	export default{
		setup(){

			const selected = ref([]);
			const allSelected = ref(false);


			const {employees, getEmployees} = useEmployees()
			const {generateEmployeesDTRfromData,employeesdatagenerated} = useGeneratedtr()
			const {getcustomLocations, customlocations} = useLocations()

			const searchQuery = ref("");
			let sort = ref(false);

			const router = useRouter()			
			const sortColumn = ref("id");
        	const sortDirection = ref(1);
			const arrowIconName = ref("arrow_drop_up");			


			const downloadpdf = (url) =>{

				axios({
				  url: url,
				  method: 'GET',
				  responseType: 'blob', // important
				}).then((response) => {
				  const url = window.URL.createObjectURL(new Blob([response.data]));
				  const link = document.createElement('a');
				  link.href = url;
				  link.setAttribute('download', 'file.pdf');
				  document.body.appendChild(link);
				  link.click();
				});


			}



			const form = reactive({
				'dtremployeetype': '',
                'dtrmonthtype': '',
                'monthpicked': '',
                'selected':'',
                
             })

			const generatenewEmployeesDTR = async () =>{
                await generateEmployeesDTRfromData({ ...form }).then(res => {
                	console.log(employeesdatagenerated);
                });
            }

			onMounted(() => {
				getEmployees(),
				getcustomLocations().then(() => {
					allSelected.value = true;
					updateCheck()
				})
			})		

			const filteredEmployees = computed(function(){
				return employees.value.filter(
					(employee) => employee.employee_fname.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1 || 
							  employee.employee_mname.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1 ||
							  employee.employee_lname.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1 
				);
			});


			const updateCheck = async () => {
				if(allSelected.value){
					selected.value = [];
					for (var location in customlocations.value) {
						selected.value.push(customlocations.value[location].location_id);
					}
				}else{
					selected.value = [];
				}
			}
			const selectCheck = async () =>{
				allSelected.value = false;
				if(customlocations.value.length ==  selected.value.length){
					allSelected.value = true;
				}
			}

			const sortTable = (columnName) => {
	            sortColumn.value = columnName;
	            sortDirection.value = -1 * sortDirection.value;
	            if (sortDirection.value == 1) {
	                arrowIconName.value = "arrow_drop_up";
	                filteredEmployees.value.sort((a, b) => (a[columnName] > b[columnName] ? 1 : -1));
	            } else {
	                arrowIconName.value = "arrow_drop_down";
	                filteredEmployees.value.sort((a, b) => (a[columnName] < b[columnName] ? 1 : -1));
	            }
	        }
	    
	        const checkStatus = () =>{
	        	
	        	
	        	//console.log(internalInstance);

	        }

			const goshow = (id) => {				
				router.push({ name: 'generatedtrperemployee.show', params: { id: id } });
			}

			return{
				filteredEmployees,
				searchQuery,
				sortTable,
				sortColumn,
				form,
				goshow,
				arrowIconName,
				generatenewEmployeesDTR,
				customlocations,
				getcustomLocations,
				selected,
				updateCheck,
				allSelected,
				selectCheck,
				downloadpdf,
				checkStatus,
			}
		}
	}
</script>
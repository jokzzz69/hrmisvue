<template>
	<div class="row">
		<div class="col-md-12 p-title">
			<h2>Employees Information</h2>
		</div>
	</div>

	<div class="row">
		<div class="col-md-12">
		    <div class="row">
		    	<div class="col-auto mb-2 mb-sm-0">
		    		<router-link :to="{ name: 'record.create' }" class="btn btn-blue">New Employee <i class="fa-solid fa-plus"></i></router-link>
		    	</div>
		    	<div class="col">
		    		<div class="form-group">
		    			<input type="text" name="inputSearch"  placeholder="search..." class="border-blue form-control" v-model="searchQuery">
		    		</div>
		    	</div>
		    </div>
		    <div class="mtmb tblWrap mt-2 mb-2">
		    	<table class="mtable  table nottbllink tbl--emp--info">
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
			                <th class="th-15" @click="sortTable('emergency_contactperson')">Emergency Contact
			                    <span v-if="sortColumn == 'emergency_contactperson'" class="material-icons">{{arrowIconName}}</span>
			                    <span v-else class="material-icons">sort</span>
			                </th>
			                <th @click="sortTable('type')" class="h-t">Type
			                    <span v-if="sortColumn == 'type'" class="material-icons">{{arrowIconName}}</span>
			                    <span v-else class="material-icons">sort</span>
			                </th>
			                <th @click="sortTable('status')" class="h-t">Status
			                    <span v-if="sortColumn == 'status'" class="material-icons">{{arrowIconName}}</span>
			                    <span v-else class="material-icons">sort</span>
			                </th>
			                <th class="th-15" @click="sortTable('position')">Position
			                    <span v-if="sortColumn == 'position'" class="material-icons">{{arrowIconName}}</span>
			                    <span v-else class="material-icons">sort</span>
			                </th>
			                <th @click="sortTable('office')" class="h-t">Office
			                    <span v-if="sortColumn == 'office'" class="material-icons">{{arrowIconName}}</span>		                    
			                    <span v-else class="material-icons">sort</span>
			                </th>
			                <th @click="sortTable('startdate')" class="h-t">Start Date
			                    <span v-if="sortColumn == 'startdate'" class="material-icons">{{arrowIconName}}</span>		                    
			                    <span v-else class="material-icons">sort</span>
			                </th>
			                <th @click="sortTable('employee_activemobilenumber')" class="h-t" v-if="userrole == 'super-admin'">Active #
			                    <span v-if="sortColumn == 'employee_activemobilenumber'" class="material-icons">{{arrowIconName}}</span>		                    
			                    <span v-else class="material-icons">sort</span>
			                </th>
		
			                <th class="th-20"></th>
			    		</tr>
			    	</thead>
			    	<tbody>
			    		<template v-if="filteredOfficeRecords.length > 0">
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
				    				 <td class="h-t">
				    				 	<template v-if="officerecord.employments.length > 0">
				    				 		<template v-if="officerecord.employments[0].type">
				    				 			{{officerecord.employments[0].type.name}}
				    				 		</template>		    				 		
				    				 	</template>
				    				 </td>
				    				 <td class="h-t">
				    				 	<template v-if="officerecord.employments.length > 0">
				    				 		<template v-if="officerecord.employments[0].status">
				    				 			{{officerecord.employments[0].status.name}}
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
					    			<td class="h-t">
					    				<template v-if="officerecord.employments.length > 0">
				    				 		<template v-if="officerecord.employments[0].office">
				    				 			{{officerecord.employments[0].office.offices_name}}
				    				 		</template>		    				 		
				    				 	</template>
					    			</td>
					    			<td class="h-t">
					    				<template v-if="officerecord.employments.length > 0">
				    				 		<template v-if="officerecord.employments[0].startdate">
				    				 			{{moment(new Date(officerecord.employments[0].startdate)).format('MMMM D, Y')}}
				    				 		</template>		    				 		
				    				 	</template>
					    			</td>
									<td v-if="userrole == 'super-admin'">
										<template v-if="officerecord.employee">
											{{officerecord.employee.employee_activemobile}}
										</template>
									</td>
					    			<td @click.stop class="tblcolwid--2btn">
					    				<ul class="ls-frmbutton text-end">
					    					<li class="list-inline-item">
											    <button class="btn btn-outline-violet" title="Edit" @click="goshow(officerecord.employee_id)"> 
											        <i class="fa-solid fa-user-pen"></i> <span class="actionText">Edit</span>
											    </button>
											</li>
					    					<li class="me-1 mb-1" v-if="authid != officerecord.employee_id">
					    						<button class="btn btn-dyellow" @click="archiveEmployee(officerecord.employee_id,officerecord.employments[0].status.id)"><i class="fa-solid fa-box-archive"></i> <span class="actionText">Archive</span></button>
					    					</li>
			                                <li  v-if="userrole == 'super-admin'"><button title="delete" class="btn btn-outline-danger" @click="deleteOfficeRecord(officerecord.employee_id)"><i class="fa-solid fa-trash-can"></i> <span class="actionText">Delete</span></button></li>
			                            </ul>
					    			</td>
				    			</tr>
				    		</template>
			    		</template>
			    		<template v-else>
                            <template v-if="!noData">
                                <tr class="pr nodata">
                                	<td :colspan="colsp">
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
                                <td :colspan="colsp"><span class="nodata">Record is Empty </span>
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
	import {useRouter} from 'vue-router'
	import useArchive from '@/composables/composables-archive';
	import moment from 'moment';
	import { useAuthStore } from '@/stores/store.js'
	import { useHead } from '@unhead/vue'
	import LoadingComponent from '@/components/loader/LoadingComponent.vue';

	export default{
		components: {
			LoadingComponent
		},
		setup(){
			useHead({
	            title: 'Employees Information | '+import.meta.env.VITE_BFAR_AGENCY
	        })
			const store = useAuthStore();
            const userrole = ref(store.getdetails[1]);
            const authid = ref(store.getdetails[0]);

            const colsp = ref(9);


			const {officerecords, getOfficerecords, destroyOfficerecord }= useOfficerecord()
			const {setArchive} = useArchive();

			const searchQuery = ref("");
			let updatedList = ref([])
			const router = useRouter()
			
			const sortColumn = ref("id");
        	const sortDirection = ref(1);
			const arrowIconName = ref("arrow_drop_up");			

			const swal = inject('$swal')
			const noData = ref(false)

			onMounted(() => {
				getOfficerecords().then(() =>{
					if(officerecords.value.length > 0){
                        noData.value = false;
                    }else{
                        noData.value = true;
                    }
				})
				if(userrole.value == 'super-admin'){
					colsp.value = 10;
				}
			})		

			const archiveForm = reactive({
				'status' : '',
				'enddate' : ''
			});

			const filteredOfficeRecords = computed(function(){
				return officerecords.value.filter(
					(officerecord) => 
						(officerecord.employee_id && officerecord.employee_id.toString().toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1 ) || 
						(officerecord.emergency_contactperson && officerecord.emergency_contactperson.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1 ) || 
						(officerecord.employee && officerecord.employee.employee_fname && officerecord.employee.employee_fname.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1 ) || 
						(officerecord.employee && officerecord.employee.employee_mname && officerecord.employee.employee_mname.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1 ) ||
						(officerecord.employee && officerecord.employee.employee_lname && officerecord.employee.employee_lname.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1 ) ||
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

			const deleteOfficeRecord = async (id) =>{
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

					await destroyOfficerecord(id);
					await getOfficerecords().then(() => {
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
				router.push({ name: 'record.edit', params: { id: id } });
			}
			const archiveEmployee = async(id,status) => {
	
				archiveForm.status = status;
				archiveForm.enddate = null;

				let x = 0; //trigger
				let y = 0;
					await swal.fire({
					  title: 'Are you sure?',
					  text: "You won't be able to revert this!",
					  iconHtml: '<i class="fa-solid fa-user-xmark text-warning"></i>',
					  customClass: {
					    icon: 'p-3 border-warning'
					  },
					  showCancelButton: true,
					  confirmButtonColor: '#e79418',
					  cancelButtonColor: '#d33',
					  confirmButtonText: 'Yes, archive it!',
					  allowOutsideClick: false
					}).then((result) => {
					  if (result.isConfirmed) {		    
					    x = 1;
					  }
					})

					if (x > 0) {
						if(status == 1){
							const { value: formValues } = await swal.fire({
							  title: 'Employee is Active!',
							  html:
							    '<div class="form-floating"><select class="form-select mb-2" id="status"><option disabled value="">Select one</option><option value="2">Resigned</option><option value="3">Not Renewed</option><option value="4">Retired</option><option value="5">Transferred / Promoted</option></select><label for="name" class="form-label">New Status</label></div>'+
							    '<form class="form-floating"><input type="date" class="form-control" id="enddate"><label for="enddate">End Date</label></form>',
							  focusConfirm: false,
							  showCancelButton: true,
							  confirmButtonColor: '#0069d9',
							  cancelButtonColor: '#d33',
							  confirmButtonText: 'Save',
							  allowOutsideClick: false,	
							  customClass: {
							  	title : 'txt-warn'
							  },
							  preConfirm: () => {
							    return [
							      document.getElementById('status').value,
							      document.getElementById('enddate').value
							    ]
							  },

							})



							if(formValues){
								archiveForm.status = formValues[0];
								archiveForm.enddate = formValues[1];

								await setArchive(id,archiveForm).then(() => {
									swal.fire({
							            toast: true,
							            position: 'top-end',
							            title: 'Successfully Archived',
							            showConfirmButton: false,            
							            icon: 'success',
							            width: '300',
							            padding: '.5em 1em',
							            timerProgressBar: true,
							            timer:1500,
							            customClass: {
							                container: 'swaltopright-warn'
							            }
							        })
								});
							}

								


						}else{
							await setArchive(id,archiveForm).then(() => {
									swal.fire({
							            toast: true,
							            position: 'top-end',
							            title: 'Successfully Archived',
							            showConfirmButton: false,            
							            icon: 'success',
							            width: '300',
							            padding: '.5em 1em',
							            timerProgressBar: true,
							            timer:1500,
							            customClass: {
							                container: 'swaltopright-warn'
							            }
							        })
								});
						}
						
						//formValues
						//await setArchive(id);
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
				deleteOfficeRecord,
				searchQuery,
				sortTable,
				sortColumn,
				goshow,
				arrowIconName,
				checkText,
				archiveEmployee,
				moment,
				userrole,
				authid,
				noData,
				colsp
			}
		}
	}
</script>
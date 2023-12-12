<template>
	<div class="row">
		<div class="col-md-12 p-title">
			<h2>User Accounts</h2>
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
		    <div class="row">
		    	<div class="col col-sm-3 mt-2">
		    		<div class="bulk--actionsWrap">
		    			<div class="bulk--action__Options">
		    				<div class="form-bulkaction">
				    			<select id="disabledSelect" class="form-select" v-model="bulkactionform.selectedoption">
							        <option hidden value="">Bulk Actions</option>							        
							        <option disabled="disabled">--Add  / Update Role--</option>
							        <option value="7">Communication Encoder</option>
							        <option value="6">Communication Viewer</option>
							        <option disabled="disabled">--Change Role--</option>
							        <option value="2">Admin</option>
							        <option value="3">HR</option>
							        <option value="4">Employee</option>
							        <option disabled="disabled">----</option>
							        <option value="8"><span class="text-success">Activate</span></option>
							        <option value="9"><span class="text-danger">Deactivate</span></option>
							     </select>
				    		</div>
		    			</div>
		    			<div class="bulk--action__Events">
		    				<button :disabled="!withChecked" class="btn btn-semiblue" @click.prevent="bulkactionsubmit">Apply</button>
		    			</div>

		    		</div>
		    	</div>
		    </div>
		    <div class="tblWrap mt-2">
		    	<table class="mtable hasActions table nottbllink" id="userstbl">
			    	<thead>
			    		<tr>
							<th>
								<div class="form-check">
									<input type="checkbox" class="form-check-input" name="chkUsersParent" value="chkAllUserChild" @change="pchkUsers" v-model="allcheckedusers">
								</div>
							</th>
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
			                <th>Username</th>
			                <th @click="sortTable('last_login')">Last Login
			                	<span v-if="sortColumn == 'last_login'" class="material-icons">{{arrowIconName}}</span>		                    
			                    <span v-else class="material-icons">sort</span>
			                </th>
			                <th class="nc">
			                	Access Level
			                </th>
			          
			                <th class="nc"></th>
			    		</tr>
			    	</thead>
			    	<tbody>
			    		<template v-if="!tblloader">
			    			<template v-for="employee in filteredEmployees" :key="employee.employee_id">
				    			<tr v-if="authuser.employee_id != employee.employee_id">
				    				<td>
				    					<div class="form-check">
				    						<input type="checkbox" :value="employee.employee_id" class="form-check-input" :name="`chkUser-${employee.employee_id}`" v-model="bulkactionform.selectedusers" @change='checkeduser()'>
				    					</div>
				    				</td>
				    				<td class="ttc">{{employee.employee_fname}}</td>
					    			<td class="ttc">{{employee.employee_mname}}</td>
					    			<td class="ttc">{{employee.employee_lname}} <span class="ttu">{{employee.employee_extname}}</span></td>
					    			<td>
					    				<template v-if="employee.useraccount">
					    					{{employee.useraccount.username}}			    					
					    				</template>
					    			</td>
					    			<td>
					    				<template v-if="employee.useraccount">
					    					<template v-if="employee.useraccount.last_login">
					    						{{moment(employee.useraccount.last_login).format('MMMM DD, yyyy hh:mm A')}}
					    					</template>
					    					
					    				</template>
					    			</td>
					    			<td>	
					    				{{ getSlug(employee.employee_id) }}			    		
					    				<template v-for="user in users" :key="user.employee_id">
					    					<template v-if="user.employee_id == employee.employee_id">
					    						<template v-if="user.roles.length">
					    							<template v-for="userrole in user.roles" :key="userrole.id">
					    								<template v-if="currentuserrole.includes('super-admin')">
					    									<span :class="userrole.slug" class="badge text-bg-primary me-1">
								    							{{userrole.name}}
								    						</span> 
					    								</template>
					    								<template v-else>
					    									<template v-if="userrole.id == 1">
					    										<span class="badge admin text-bg-primary me-1">
									    							Admin
									    						</span> 
					    									</template>
					    									<template v-else>
					    										<span :class="userrole.slug" class="badge text-bg-primary me-1">
									    							{{userrole.name}}
									    						</span> 
					    									</template>
					    								</template>

					    								
					    							</template>			    							
					    						</template>
					    					</template>
					    				</template>
					    			</td>

					    			<td class="text-end">
					    				<ul class="ls-frmbutton">		    					
					    					
						    				<template v-if="employee.useraccount != null">
						    					<li>
						    						<router-link :to="{ name: 'logs.show', params: { id: employee.employee_id } }" class="btn btn-lightblue" title="View Logs"> 
														<i class="fa-solid fa-clipboard-list"></i> <span class="actionText">Logs</span>
													</router-link>
												</li>
						    					<li>
						    						<router-link :to="{ name: 'users.edit', params: { id: employee.employee_id } }" class="btn btn-violet" title="Edit"> 
														<i class="fa-solid fa-user-pen"></i> <span class="actionText">Edit</span>
													</router-link>
												</li>
												<li>
													<button class="btn btn-outline-warning" @click="rebootPassword(employee.employee_id)" title="Reset Password"><i class="fa-solid fa-arrows-rotate"></i> <span class="actionText">Reset Password</span></button>
												</li>
				                                <li>
				                                	<button class="btn btn-outline-danger" @click="deactivateAccount(employee.employee_id)"  title="Deactivate Accout">
				                                		<i class="fa-solid fa-user-lock"></i> <span class="actionText">Deactivate</span>
				                                	</button>
				                                </li>			    					
						    				</template>

						    				<template v-else>
						    					<li>				    						
						    						<button title="Activate Account" class="btn btn-outline-success"  @click.once="activateAccount(employee.employee_id)">
							    						<i class="fa-solid fa-user-check"></i> <span class="actionText">Activate Account</span>
							    					</button>
						    					</li>
						    				</template>                              

			                            </ul>
					    			</td>
				    			</tr>
				    		</template>
							<template v-if="searchQuery">
							    <template v-if="!filteredEmployees.length">
							        <tr class="nodata">
							            <td colspan="7">
							                No Results Found
							            </td>
							        </tr>
							    </template>                         
							</template>
							<template v-else>
							    <template v-if="!filteredEmployees.length">
							        <tr class="nodata">
							            <td colspan="8">
							                No Entry!
							            </td>
							        </tr>
							    </template> 
							</template>  
						</template>
						<template v-else>
						    <tr class="nodata pr">
						        <td colspan="8">
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
	import useUser from '@/composables/userscomposables';
	import useEmployees from '@/composables/composables-employees';


	import {onMounted ,ref, computed, inject, reactive} from 'vue';
	import { sortBy} from 'lodash';
	import {useRouter} from 'vue-router'
	import moment from 'moment';
	import LoadingComponent from '@/components/loader/LoadingComponent.vue'
	import { useHead } from '@unhead/vue'
	import { useAuthStore } from '@/stores/store.js'

	export default{		
		components: {
            LoadingComponent
        },
		setup(){		
			useHead({
                title: 'Accounts | '+import.meta.env.VITE_BFAR_AGENCY
            })
			const swal = inject('$swal')
			const {users, getUsers, activateUser, deactivate, rebootPass, authuser, getAuthuser, bulkActionUser} = useUser()		

			const {biousers, getBioUsers} = useEmployees()	
			const store = useAuthStore();
			const currentuserrole = ref(store.details[1]);

			const checkActivated = ref(false);
			const searchQuery = ref("");
			let sort = ref(false);
			let updatedList = ref([])
			const router = useRouter()
			
			const sortColumn = ref("id");
        	const sortDirection = ref(1);
			const arrowIconName = ref("arrow_drop_up");					
			const allcheckedusers = ref(false);
			const bulkactionform = reactive({
				'selectedusers': [],
				'selectedoption': ''
			})
			const withChecked = ref(false);

			const filteredEmployees = computed(function(){
				return biousers.value.filter(
					(biouser) => (biouser.employee_fname && biouser.employee_fname.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1) || 
							  (biouser.employee_mname && biouser.employee_mname.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1) ||
							  (biouser.employee_lname && biouser.employee_lname.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1) ||

							  (biouser.employee_extname && biouser.employee_extname.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1) ||
							  (biouser.useraccount && biouser.useraccount.username.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1) ||
							  (biouser.useraccount && biouser.useraccount.last_login && moment(biouser.useraccount.last_login).format('MMMM DD, yyyy hh:mm A').toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1)
				);
			});
			const tblloader = ref(true);
			onMounted(() => {
				getUsers().then(),
				getBioUsers(),
				getAuthuser().then(() => {
					tblloader.value = false;
				})
			})

			const activateAccount = async (id) =>{		
				await activateUser(id);		
				await getUsers();		
				await getBioUsers().then(() => {
					swal.fire({
			            toast: true,
			            position: 'top-end',
			            title: 'User Activated',
			            showConfirmButton: false,            
			            icon: 'success',
			            width: '300',
			            padding: '.5em 1em',
			            timerProgressBar: true,
			            timer:1500,
			            customClass: {
			                container: 'swaltopright-success'
			            }
			        })
				})
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

	        const rebootPassword = async (id) => {
	        	//rebootPass
	        	await rebootPass(id);
	        	await getUsers().then(() => {
					swal.fire({
			            toast: true,
			            position: 'top-end',
			            title: 'Password has been reset',
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
			const deactivateAccount = async (id) =>{
				let x = 0; //trigger

				await swal.fire({
				  text: "Are you sure you want to deactivate this Account?",
				  icon: 'error',
				  showCancelButton: true,
				  confirmButtonColor: '#d33',
				  cancelButtonColor: '#ccc',
				  confirmButtonText: 'Yes, deactivate it!'
				}).then((result) => {
				  if (result.isConfirmed) {		    
				    x = 1;
				  }
				})

				if (x > 0) {
					await deactivate(id);
					await getUsers();
					await getBioUsers().then(() => {
						swal.fire({
				            toast: true,
				            position: 'top-end',
				            title: 'User Deactivated',
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
				router.push({ name: 'users.edit', params: { id: id } });
			}


			const pchkUsers = () =>{

                if(allcheckedusers.value){

                    bulkactionform.selectedusers = [];

                    for (var x in users.value) {
                       bulkactionform.selectedusers.push(users.value[x].employee_id);                    
                    }
                    if(bulkactionform.selectedusers.length > 0){
                        withChecked.value = true;
                    }      

                }else{
                    bulkactionform.selectedusers = [];
                    withChecked.value = false;
                }


            }
            const checkeduser = async () =>{
                allcheckedusers.value = false;

                if(users.value.length ==  bulkactionform.selectedusers.length){
                    allcheckedusers.value = true;
                }
                if(bulkactionform.selectedusers.length > 0){
                     withChecked.value = true;
                }else{
                     withChecked.value = false;
                }
            }
            const bulkactionsubmit = async() => {
            	await bulkActionUser({ ...bulkactionform }).then(() => {

                        swal.fire({
                            toast: true,
                            position: 'top-end',
                            title: 'Selected Users Successfully Updated',
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
                await getUsers();
            }
            const pluck = (arr, key) => arr.map(i => i[key]);

            const getSlug = async(id) => {

            	for (var user of users.value) {
            		if(user.id == id){
            			if(user.roles.length){
            				for (var userrole of user.roles) {
            					if(currentuserrole.value.includes('super-admin')){
            						//no loop
            					}
            				}
            			}
            		}
            	}

            	// <template v-for="user in users" :key="user.employee_id">
				// 	<template v-if="user.employee_id == employee.employee_id">
				// 		<template v-if="user.roles.length">
				// 			<template v-for="userrole in user.roles" :key="userrole.id">
				// 				<template v-if="currentuserrole.includes('super-admin')">
				// 					<span :class="userrole.slug" class="badge text-bg-primary me-1">
		    	// 						{{userrole.name}}
		    	// 					</span> 
				// 				</template>
				// 				<template v-else>
				// 					<template v-if="userrole.id == 1">
				// 						<span class="badge admin text-bg-primary me-1">
			    // 							Admin
			    // 						</span> 
				// 					</template>
				// 					<template v-else>
				// 						<span :class="userrole.slug" class="badge text-bg-primary me-1">
			    // 							{{userrole.name}}
			    // 						</span> 
				// 					</template>
				// 				</template>

								
				// 			</template>			    							
				// 		</template>
				// 	</template>
				// </template>
            }
			return{
				filteredEmployees,
				searchQuery,
				users,
				sortTable,
				sortColumn,
				activateAccount,
				deactivateAccount,
				goshow,
				arrowIconName,
				checkActivated,
				rebootPassword,
				moment,
				authuser,
				tblloader,
				allcheckedusers,
				checkeduser,
				bulkactionform,
				pchkUsers,
				withChecked,
				bulkactionsubmit,
				pluck,
				currentuserrole,
				getSlug
			}
		}
	}
</script>
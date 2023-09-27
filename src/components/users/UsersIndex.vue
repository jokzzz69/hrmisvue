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
		    <table class="mtable hasActions mt-2 mb-2 table" id="userstbl">
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
		    		<template v-for="employee in filteredEmployees" :key="employee.employee_id">
		    			<tr v-if="authuser.employee_id != employee.employee_id">
		    		
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

			    				<template v-for="user in users" :key="user.employee_id">

			    					<template v-if="user.employee_id == employee.employee_id">

			    						<template v-if="user.roles[0]">
			    							<span :class="user.roles[0].slug" class="badge text-bg-primary">
				    							{{user.roles[0].name}}
				    						</span> 
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
		    	</tbody>
		    </table>
		</div>
	</div>
</template>

<script>
	import useUser from '@/composables/userscomposables';
	import useEmployees from '@/composables/composables-employees';


	import {onMounted ,ref, computed, inject} from 'vue';
	import { sortBy} from 'lodash';
	import {useRouter} from 'vue-router'
	import moment from 'moment';

	import { useHead } from '@unhead/vue'

	export default{		
	
		setup(){		
			useHead({
                title: 'Accounts | BFAR - CAR HRMIS'
            })
			const swal = inject('$swal')
			const {users, getUsers, activateUser, deactivate, rebootPass, authuser, getAuthuser} = useUser()		

			const {biousers, getBioUsers} = useEmployees()	

			const checkActivated = ref(false);
			const searchQuery = ref("");
			let sort = ref(false);
			let updatedList = ref([])
			const router = useRouter()
			
			const sortColumn = ref("id");
        	const sortDirection = ref(1);
			const arrowIconName = ref("arrow_drop_up");					

			const filteredEmployees = computed(function(){
				return biousers.value.filter(
					(biouser) => biouser.employee_fname.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1 || 
							  biouser.employee_mname.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1 ||
							  biouser.employee_lname.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1 ||
							  (biouser.employee_extname && biouser.employee_extname.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1) ||
							  (biouser.useraccount && biouser.useraccount.username.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1) ||
							  (biouser.useraccount && biouser.useraccount.last_login && moment(biouser.useraccount.last_login).format('MMMM DD, yyyy hh:mm A').toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1)
				);
			});

			onMounted(() => {
				getUsers(),
				getBioUsers(),
				getAuthuser()
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
				authuser
			}
		}
	}
</script>
<template>
	<div class="row">
		<div class="col-md-12 p-title">
			<h2 class="mb-0">Travels</h2>
		</div>
	</div>
	<div class="row">
		<div class="col-md-12">
		    <div class="row align-items-end">
		    	<div class="col-auto">
		    		<router-link :to="{ name: 'travel.create' }" class="btn btn-blue">New Travel <i class="fa-solid fa-plus"></i></router-link>
		    	</div>
		    	
		    	<div class="col mt-2">
		    		<div class="form-group">
		    			<input type="text" name="inputSearch" placeholder="search..." class="form-control border-blue" v-model="searchQuery">
		    		</div>
		    	</div>
		    	<div class="col-auto">
		    		<label class="col-form-label col-12" for="filterMonth">Filter</label> 
		    		<select class="form-select form-blue-select" v-model="form.type" @change="getTravelbyMonth" id="filterMonth">
		    			<option value="1">All Travel</option>
		    			<option value="2">My Travels</option>
		    		</select>
		    	</div>
		    	<div class="col-auto">		    		               
                    <Datepicker v-model="form.date" id="fdate" auto-apply month-picker @update:model-value="getTravelbyMonth" placeholder="Select Month" :clearable="true" name="monthpicked" :format="format" :month-change-on-arrows="true"></Datepicker> 
		    	</div>
		    </div>
		    <table class="mtable mt-2 mb-2 table nottbllink">
		    	<thead>
		    		<tr>
		    			<th @click="sortTable('id')" v-if="userrole == 'super-admin'"  class="w-5">ID
                            <span v-if="sortColumn == 'id'" class="material-icons">{{arrowIconName}}</span>
                            <span v-else class="material-icons">sort</span>
                        </th>
		    			<th @click="sortTable('travelemployees')" class="w-15">Employee(s)
		                    <span v-if="sortColumn == 'travelemployees'" class="material-icons">{{arrowIconName}}</span>
		                    <span v-else class="material-icons">sort</span>
		                </th>
		                <th @click="sortTable('travelordernumber')">Travel Order #
		                    <span v-if="sortColumn == 'travelordernumber'" class="material-icons">{{arrowIconName}}</span>
		                    <span v-else class="material-icons">sort</span>
		                </th>
		                <th @click="sortTable('travelstart')">Travel Start
		                    <span v-if="sortColumn == 'travelstart'" class="material-icons">{{arrowIconName}}</span>
		                    <span v-else class="material-icons">sort</span>
		                </th>
		                <th @click="sortTable('travelend')">Travel End
		                    <span v-if="sortColumn == 'travelend'" class="material-icons">{{arrowIconName}}</span>
		                    <span v-else class="material-icons">sort</span>
		                </th>
		                <th @click="sortTable('location')">Location
		                    <span v-if="sortColumn == 'location'" class="material-icons">{{arrowIconName}}</span>
		                    <span v-else class="material-icons">sort</span>
		                </th>
		                <th class="w-20" @click="sortTable('purpose')">Purpose
		                    <span v-if="sortColumn == 'purpose'" class="material-icons">{{arrowIconName}}</span>
		                    <span v-else class="material-icons">sort</span>
		                </th>
		                <th @click="sortTable('createdby')">Created By
		                    <span v-if="sortColumn == 'createdby'" class="material-icons">{{arrowIconName}}</span>
		                    <span v-else class="material-icons">sort</span>
		                </th>
		                <th></th>
		    		</tr>
		    	</thead>
		    	<tbody>

		    		<template v-for="travel in filteredTravels" :key="travel.id">
		    			<tr>
		    				<td v-if="userrole == 'super-admin'">
		    					{{travel.id}}
		    				</td>
		    				<td>
		    					<template v-if="travel.travelemployees">

		    						<template v-for="(emp,k) in travel.travelemployees" :key="emp.id">		
										<template v-if="emp.employee">					
					    					{{ emp.employee.name }}				    	
										</template>
										<template v-if="k < travel.travelemployees.length - 1">, <br/></template>
		    						</template>		    		
		    					</template>
		    				</td>
		    				<td>
		    					{{travel.travelordernumber}}
		    				</td>
		    				<td>
		    					<template v-if="travel.travelstart">
		    						{{moment(new Date(travel.travelstart)).format('MMMM D, Y')}}
		    					</template>	    					
		    				</td>
		    				<td>
		    					<template v-if="travel.travelend">
		    						{{moment(new Date(travel.travelend)).format('MMMM D, Y')}}
		    					</template>	  
		    				</td>
		    				<td>
		    					{{travel.location}}
		    				</td>
		    				<td>
		    					{{travel.purpose}}
		    				</td>
		    				<td>
		    					<template v-if="travel.createdby">
		    						{{travel.createdby.name}}
		    					</template>
		    				</td>
		    				<td class="tblcolwid--2btn">
		    					<ul class="ls-frmbutton text-end" v-if="travel.can.update">
		    						<li class="mb-1">
		    							<router-link title="Edit" :to="{name: 'travel.edit', params : {id: travel.id}}" class="btn btn-violet"><i class="sm-icons fa-solid fa-pen-to-square"></i> <span  class="lg-text">Edit</span></router-link>
		    						</li>
	                  <li>
	                  	<button title="delete" class="btn btn-outline-danger" @click="deleteTravel(travel.id)"><i class="sm-icons fa-solid fa-trash-can"></i> <span class="lg-text">Delete</span></button>
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

	import useTravels from '@/composables/composables-travel';
	import {onMounted ,ref, computed, inject,reactive} from 'vue';
	import { sortBy} from 'lodash';
	import {useRouter} from 'vue-router'
	import moment from 'moment';
	import { useAuthStore } from '@/stores/store.js'
	import { useHead } from '@unhead/vue'

	export default{
		setup(){
			useHead({
          title: 'Employees Travels | BFAR - CAR HRMIS'
      })
			const {travels, getTravels, destroyTravel, getfilteredTravels} = useTravels();
			
			const store = useAuthStore();
      const userrole = ref(store.getdetails[1]);
      const authid = ref(store.getdetails[0]);
			const searchQuery = ref("");
			const swal = inject('$swal')
			let sort = ref(false);
			const router = useRouter()			
			const sortColumn = ref("id");
      const sortDirection = ref(1);
			const arrowIconName = ref("arrow_drop_up");		

			const form = reactive({
				'type' : '1',
				'date' : { 
	                month: new Date().getMonth(),
	                year: new Date().getFullYear()
	            }
			});

			onMounted(() => {
				getTravels()
			})	
			const callback = (travelemployees,searchQuery) => {	
				const newArr = [];
				for (var i = 0; i <= travelemployees.length; i++) {
					newArr.push(travelemployees[i] && travelemployees[i].employee.name.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1)
				}
				if(newArr.includes(true)){
					return true;
				}else{
					return false;
				}
			}
			const filteredTravels = computed(function(){
				return travels.value.filter(
					(travel) => travel.location.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1 ||
								travel.purpose.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1 ||
								travel.travelordernumber.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1 || 
								moment(travel.travelstart).format('MMMM D, Y').toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1 ||
								moment(travel.travelend).format('MMMM D, Y').toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1  ||
								callback(travel.travelemployees, searchQuery.value)
				);

			});

			const sortTable = (columnName) => {
		        sortColumn.value = columnName;
		        sortDirection.value = -1 * sortDirection.value;
		        if (sortDirection.value == 1) {
		            arrowIconName.value = "arrow_drop_up";
		            filteredTravels.value.sort((a, b) => (a[columnName] > b[columnName] ? 1 : -1));
		        } else {
		            arrowIconName.value = "arrow_drop_down";
		            filteredTravels.value.sort((a, b) => (a[columnName] < b[columnName] ? 1 : -1));
		        }
    		}

      const deleteTravel = async (id) =>{
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
					await destroyTravel(id);
					await getTravels().then(() => {
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
			
      const format = (date) => {
        return moment(date).format('MMMM Y');
      }
      const getTravelbyMonth = async () =>{
          await getfilteredTravels({...form});
      }

			const goshow = (id) => {
				router.push({name: 'roles.edit', params: { id: id }});
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
				filteredTravels,
				searchQuery,
				sortTable,
				sortColumn,
				goshow,
				arrowIconName,
				moment,
				checkText,
				deleteTravel,
				getTravelbyMonth,
				format,
				form,
				userrole,
				authid
			}
		}
	}
</script>
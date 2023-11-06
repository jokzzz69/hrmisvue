<template>
	<div class="row">
		<div class="col col-w-settings">
			<div class="row">
				<div class="col-md-12 p-title">
					<h2>Holiday List</h2>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12">
				    <div class="row">
				    	<div class="col-auto">
				    		<router-link :to="{ name: 'holidays.create' }" class="btn btn-blue">New Holiday <i class="fa-solid fa-plus"></i></router-link>
				    	</div>
				    	<div class="col">
				    		<div class="form-group">
				    			<input type="text" name="inputSearch" placeholder="search..." class="form-control border-blue" v-model="searchQuery">
				    		</div>
				    	</div>
				    </div>
				    <table class="mtable hasActions mt-2 mb-2 table tbllink">
				    	<thead>
				    		<tr>
				    			<th @click="sortTable('name')">Name
				                    <span v-if="sortColumn == 'name'" class="material-icons">{{arrowIconName}}</span>
				                    <span v-else class="material-icons">sort</span>
				                </th>
				                <th @click="sortTable('date')">Date
				                    <span v-if="sortColumn == 'date'" class="material-icons">{{arrowIconName}}</span>
				                    <span v-else class="material-icons">sort</span>
				                </th>
				                <th>
				                	
				                </th>
				    		</tr>
				    	</thead>
				    	<tbody>
				    		<template v-for="holiday in filteredHoliday" :key="holiday.id">
				    			<tr @click="goshow(holiday.id)">
				    				<td>
				    					{{holiday.name}}
				    				</td>
				    				<td>
				    					{{moment(holiday.date).format('MMMM DD, Y')}}
				    				</td>
					    			<td @click.stop>
					    				<ul class="ls-frmbutton text-end">
			                                <li><button title="delete" class="btn btn-outline-danger" @click="deleteHoliday(holiday.id)"><i class="fa-solid fa-trash-can"></i> Delete</button></li>
			                            </ul>
					    			</td>
				    			</tr>
				    		</template>
				    	</tbody>
				    </table>
				</div>
			</div>
		</div>
		<RightNavHrmis/>
	</div>
</template>

<script>
	import useHolidays from '@/composables/composables-holidays';
	import {onMounted ,ref, computed, inject} from 'vue';
	import { sortBy} from 'lodash';
	import {useRouter} from 'vue-router'
	import moment from 'moment'
	import { useHead } from '@unhead/vue'
	import RightNavHrmis from '@/components/navigation/RightNavHrmis.vue';

	export default{
		components: {
            RightNavHrmis
        },
		setup(){
			useHead({
                title: 'Holidays | BFAR - CAR HRMIS'
            })
			const {holidays, getHolidays, destroyHoliday} = useHolidays()

			const searchQuery = ref("");
			const swal = inject('$swal')
			let sort = ref(false);



			const router = useRouter()
			
			const sortColumn = ref("id");
        	const sortDirection = ref(1);
			const arrowIconName = ref("arrow_drop_up");			
			onMounted(() => {
				getHolidays()
			})		
			
			const filteredHoliday = computed(function(){
				return holidays.value.filter(
					(holiday) => holiday.name.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1 ||
								 moment(holiday.date).format('MMMM DD, Y').toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1
				);
			});



			const sortTable = (columnName) => {
	            sortColumn.value = columnName;
	            sortDirection.value = -1 * sortDirection.value;
	            if (sortDirection.value == 1) {
	                arrowIconName.value = "arrow_drop_up";
	                filteredHoliday.value.sort((a, b) => (a[columnName] > b[columnName] ? 1 : -1));
	            } else {
	                arrowIconName.value = "arrow_drop_down";
	                filteredHoliday.value.sort((a, b) => (a[columnName] < b[columnName] ? 1 : -1));
	            }
	        }

			const deleteHoliday = async (id) =>{
				
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

					await destroyHoliday(id);
					await getHolidays().then(() => {
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
				router.push({name: 'holidays.edit', params: { id: id }});
			}

			return{
				filteredHoliday,
				deleteHoliday,
				searchQuery,
				sortTable,
				sortColumn,
				goshow,
				arrowIconName,
				moment
			}
		}
	}
</script>
<template>
    <div class="row">
        <div class="col-md-12 p-title">
            <h2>Leave / Absence Records</h2>
        </div>
    </div>
	<div class="row">        
        <div class="col-auto">
            <router-link :to="{ name: 'leaverecords.create' }" class="btn btn-blue">New Record <i class="fa-solid fa-plus"></i></router-link>
        </div>
        <div class="col">
            <div class="form-group">
                <input type="text" name="inputSearch"  placeholder="search..." class="form-control border-blue" v-model="searchQuery">
            </div>
        </div>

    </div>
	<table class="mtable hasActions mt-2 mb-2 table tbllink">
            <thead>
                <tr>
                    <th @click="sortTable('name')">Employee
                        <span v-if="sortColumn == 'name'" class="material-icons">{{arrowIconName}}</span>
                        <span v-else class="material-icons">sort</span>
                    </th>
                    <th>
                        Details
                    </th>
                    <th>
                        Leave Start
                    </th>
                     <th>
                        Leave End
                     </th>
                     <th>
                         
                     </th>
                </tr>
            </thead>

            <tbody>
                <template v-for="leaverecord in filteredLeaveRecords" :key="leavetype.id">
                    <tr @click="goshow(leaverecord.id)">
                        <td>
                            
                        </td>
                        <td>
                            
                        </td>
                        <td>
                            
                        </td>
                        <td>
                            
                        </td>
                		<td @click.stop>
                            <template v-if="leavetype.createdby == userid || userslug == 'admin' || userslug == 'super-admin'">
                                <ul class="ls-frmbutton text-end">
                                    <li><button title="delete" class="btn btn-outline-danger" @click="deleteLeaveType(leaverecord.id)"><i class="fa-solid fa-trash-can"></i> Delete</button></li>
                                </ul>
                            </template>                           
                		</td>
                    </tr>
                </template>
            </tbody>
        </table>
</template>

<script>
	import useLeaveTypes from '@/composables/composables-leavetypes';
    import useLeaveRecords from '@/composables/composables-leave'

    import {onMounted ,ref, computed, inject} from 'vue';
    import { sortBy} from 'lodash';
    import {useRouter} from 'vue-router'
    import { useHead } from '@unhead/vue'
    import {useAuthStore} from '@/stores/store.js'
	export default{
		setup(){
            useHead({
                title: 'Employee Leave Records | BFAR - CAR HRMIS'
            })
            const swal = inject('$swal')
            const store = useAuthStore()

            const userid = store.getdetails[0];
            const userslug = store.getdetails[1];

			const {leavetypes, getLeaveTypes, destroyLeaveType} = useLeaveTypes()
            const {leaverecords, getLeaveRecords} = useLeaveRecords();

            const searchQuery = ref("");
            const arrowIconName = ref("arrow_drop_up");     
            const sortColumn = ref("id");
            const sortDirection = ref(1);


			

            const filteredLeaveRecords = computed(function(){
                return leaverecords.value.filter(
                    (leaverecord) => leaverecord.name.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1 
                                    
                );
            });

            const router = useRouter()

            const sortTable = (columnName) => {
                sortColumn.value = columnName;
                sortDirection.value = -1 * sortDirection.value;
                if (sortDirection.value == 1) {
                    arrowIconName.value = "arrow_drop_up";
                    filteredLeaveRecords.value.sort((a, b) => (a[columnName] > b[columnName] ? 1 : -1));
                } else {
                    arrowIconName.value = "arrow_drop_down";
                    filteredLeaveRecords.value.sort((a, b) => (a[columnName] < b[columnName] ? 1 : -1));
                }
            }

            onMounted(() =>{
                getLeaveTypes(),
                getLeaveRecords()
                
            })

            const deleteLeaveType = async (id) =>{
                
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

                    await destroyLeaveType(id);
                    await getLeaveTypes().then(() => {
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
                router.push({name: 'leavetypes.edit', params: { id: id }});
            }

			return {
                filteredLeaveRecords,
				destroyLeaveType,
                sortTable,
                sortColumn,
                arrowIconName,
                sortDirection,
                searchQuery,
                deleteLeaveType,
                goshow,
                userslug,
                userid
			}
		}
	}
</script>
<template>
    <div class="row">
        <div class="col-md-12 p-title">
            <h2>Leave Types Details</h2>
        </div>
    </div>
	<div class="row">        
        <div class="col-auto">
            <router-link :to="{ name: 'leavetypesdetails.create' }" class="btn btn-blue">New Leave Type Detail <i class="fa-solid fa-plus"></i></router-link>
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
                    <th @click="sortTable('name')">Name
                        <span v-if="sortColumn == 'name'" class="material-icons">{{arrowIconName}}</span>
                        <span v-else class="material-icons">sort</span>
                    </th>
                    <th>
                        Leave Types
                    </th>
                     <th></th>
                </tr>
            </thead>

            <tbody>
                <template v-for="leavetypesdetail in filteredleavetypesdetails" :key="leavetypesdetail.id">
                    <tr @click="goshow(leavetypesdetail.id)">

                        <td>
                            {{ leavetypesdetail.name }}
                        </td>
                        <td>
                            <template v-if="leavetypesdetail.leavetype">
                                <template v-for="leavetype in leavetypesdetail.leavetype">
                                    <span class="badge bg-primary me-1">{{leavetype.name}}</span>
                                </template>
                            </template>
                        </td>

                		<td @click.stop>
                            <ul class="ls-frmbutton text-end">
                                <li><button title="delete" class="btn btn-outline-danger" @click="deleteLeaveType(leavetypesdetail.id)"><i class="fa-solid fa-trash-can"></i> Delete</button></li>
                            </ul>
                			
                		</td>
                    </tr>
                </template>
            </tbody>
        </table>
</template>

<script>
	import useLeaveTypesDetails from '@/composables/composables-leavetypesdetails';
    import {onMounted ,ref, computed, inject} from 'vue';
    import { sortBy} from 'lodash';
    import {useRouter} from 'vue-router'
    import { useHead } from '@unhead/vue'

	export default{
		setup(){
            useHead({
                title: 'Employee Leave Types Details | BFAR - CAR HRMIS'
            })
            const swal = inject('$swal')
            
			const {leavetypesdetails, getLeaveTypesDetails, destroyLeaveTypesDetail} = useLeaveTypesDetails()

            const searchQuery = ref("");
            const arrowIconName = ref("arrow_drop_up");     
            const sortColumn = ref("id");
            const sortDirection = ref(1);


			

            const filteredleavetypesdetails = computed(function(){
                return leavetypesdetails.value.filter(
                    (leavetype) => leavetype.name.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1
                                    
                );
            });

            const router = useRouter()

            const sortTable = (columnName) => {
                sortColumn.value = columnName;
                sortDirection.value = -1 * sortDirection.value;
                if (sortDirection.value == 1) {
                    arrowIconName.value = "arrow_drop_up";
                    filteredleavetypesdetails.value.sort((a, b) => (a[columnName] > b[columnName] ? 1 : -1));
                } else {
                    arrowIconName.value = "arrow_drop_down";
                    filteredleavetypesdetails.value.sort((a, b) => (a[columnName] < b[columnName] ? 1 : -1));
                }
            }

            onMounted(() =>{
                getLeaveTypesDetails()
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

                    await destroyLeaveTypesDetail(id);
                    await getLeaveTypesDetails().then(() => {
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
                router.push({name: 'leavetypesdetails.edit', params: { id: id }});
            }

			return {
                filteredleavetypesdetails,
				deleteLeaveType,
                sortTable,
                sortColumn,
                arrowIconName,
                sortDirection,
                searchQuery,
                deleteLeaveType,
                goshow
			}
		}
	}
</script>
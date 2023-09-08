<template>
    <div class="row">
        <div class="col-md-12 p-title">
            <h2>Employee Status</h2>
        </div>
    </div>
	<div class="row">

        <div class="col-auto">
            <router-link :to="{ name: 'employeestatus.create' }" title="Create New" class="btn btn-blue">New Employee Status <i class="fa-solid fa-plus"></i></router-link>
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
                     <th></th>
                </tr>
            </thead>

            <tbody>
                <template v-for="item in filteredEmployeeStatus" :key="item.id">
                    <tr @click="goshow(item.id)">
                        <td>
                            {{ item.name }}
                        </td>
                		<td @click.stop>
                            <ul class="ls-frmbutton text-end">
                                <li v-if="item.id != 10 && item.id != 1"><button title="delete" class="btn btn-outline-danger" @click="deleteEmployeeStatus(item.id)"><i class="fa-solid fa-trash-can"></i> Delete</button></li>
                            </ul>
                			
                		</td>
                    </tr>
                </template>
            </tbody>
        </table>
</template>

<script>
	import useEmployeeStatus from '../../composables/composables-status';
    import {onMounted ,ref, computed, inject} from 'vue';
    import { sortBy} from 'lodash';
    import {useRouter} from 'vue-router'

	export default{
		setup(){
            const swal = inject('$swal')
            
			const {employeestatuses, getEmployeeStatuses, destroyEmployeeStatus} = useEmployeeStatus()

            const searchQuery = ref("");
            const arrowIconName = ref("arrow_drop_up");     
            const sortColumn = ref("id");
            const sortDirection = ref(1);

            const router = useRouter()
			

            const filteredEmployeeStatus = computed(function(){
                return employeestatuses.value.filter(
                    (employeestatus) => employeestatus.name.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1
                );
            });

            const sortTable = (columnName) => {
                sortColumn.value = columnName;
                sortDirection.value = -1 * sortDirection.value;
                if (sortDirection.value == 1) {
                    arrowIconName.value = "arrow_drop_up";
                    filteredEmployeeStatus.value.sort((a, b) => (a[columnName] > b[columnName] ? 1 : -1));
                } else {
                    arrowIconName.value = "arrow_drop_down";
                    filteredEmployeeStatus.value.sort((a, b) => (a[columnName] < b[columnName] ? 1 : -1));
                }
            }

            onMounted(getEmployeeStatuses)

            const deleteEmployeeStatus = async (id) =>{
                
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

                    await destroyEmployeeStatus(id);
                    await getEmployeeStatuses().then(() => {
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
               router.push({name: 'employeestatus.edit', params: { id: id }});
            }

			return {
				employeestatuses,
                filteredEmployeeStatus,
				destroyEmployeeStatus,
                sortTable,
                sortColumn,
                arrowIconName,
                sortDirection,
                searchQuery,
                getEmployeeStatuses,
                deleteEmployeeStatus,
                goshow
			}
		}
	}
</script>
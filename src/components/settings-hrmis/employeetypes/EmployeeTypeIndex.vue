<template>
    <div class="row">
        <div class="col col-w-settings">
            <div class="row">
                <div class="col-md-12 p-title">
                    <h2>Employee Types</h2>
                </div>
            </div>
            <div class="row">        
                <div class="col-auto">
                    <router-link :to="{ name: 'employeetype.create' }" class="btn btn-blue">New Employee Type <i class="fa-solid fa-plus"></i></router-link>
                </div>
                <div class="col">
                    <div class="form-group">
                        <input type="text" name="inputSearch"  placeholder="search..." class="form-control border-blue" v-model="searchQuery">
                    </div>
                </div>

            </div>
            <div class="tblWrap mt-2">
                <table class="mtable table nottbllink">
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
                        <template v-if="!tblloader">
                            <template v-for="item in filteredEmployeeTypes" :key="item.id">
                                <tr>
                                    <td>
                                        {{ item.name }}
                                    </td>
                                    <td @click.stop>
                                        <ul class="ls-frmbutton text-end list-inline">
                                            <li class="list-inline-item">
                                                <button class="btn btn-outline-violet" title="Edit" @click="goshow(item.id)"> 
                                                    <i class="fa-solid fa-user-pen"></i> <span class="actionText">Edit</span>
                                                </button>
                                            </li>
                                            <li class="list-inline-item">
                                                <button title="delete" class="btn btn-outline-danger" @click="deleteEmployeeType(item.id)"><i class="fa-solid fa-trash-can"></i> Delete</button>
                                            </li>
                                        </ul>
                                        
                                    </td>
                                </tr>
                            </template>
                            <template v-if="searchQuery">
                                <template v-if="!filteredEmployeeTypes.length">
                                    <tr class="nodata">
                                        <td colspan="2">
                                            No Results Found
                                        </td>
                                    </tr>
                                </template>                         
                            </template>
                            <template v-else>
                                <template v-if="!filteredEmployeeTypes.length">
                                    <tr class="nodata">
                                        <td colspan="2">
                                            No Entry!
                                        </td>
                                    </tr>
                                </template> 
                            </template>  
                        </template>
                        <template v-else>
                            <tr class="nodata pr">
                                <td colspan="2">
                                    <LoadingComponent/>
                                </td>
                            </tr>
                        </template>
                        
                    </tbody>
                </table>
            </div>
        </div>
        <RightNavHrmis/>
    </div>
    
</template>

<script>
	import useEmployeeTypes from '@/composables/composables-type';
    import {onMounted ,ref, computed, inject} from 'vue';
    import { sortBy} from 'lodash';
    import {useRouter} from 'vue-router'
    import { useHead } from '@unhead/vue'
    import RightNavHrmis from '@/components/navigation/RightNavHrmis.vue';
    import LoadingComponent from '@/components/loader/LoadingComponent.vue'

	export default{
        components: {
            RightNavHrmis,
            LoadingComponent
        },
		setup(){
            useHead({
                title: 'Settings - Employee Types | '+import.meta.env.VITE_BFAR_AGENCY
            })
            const swal = inject('$swal')
            
			const {employeetypes, getEmployeeTypes, destroyEmployeeType} = useEmployeeTypes()

            const searchQuery = ref("");
            const arrowIconName = ref("arrow_drop_up");     
            const sortColumn = ref("id");
            const sortDirection = ref(1);


			

            const filteredEmployeeTypes = computed(function(){
                return employeetypes.value.filter(
                    (employeetype) => employeetype.name.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1
                );
            });

            const router = useRouter()

            const sortTable = (columnName) => {
                sortColumn.value = columnName;
                sortDirection.value = -1 * sortDirection.value;
                if (sortDirection.value == 1) {
                    arrowIconName.value = "arrow_drop_up";
                    filteredEmployeeTypes.value.sort((a, b) => (a[columnName] > b[columnName] ? 1 : -1));
                } else {
                    arrowIconName.value = "arrow_drop_down";
                    filteredEmployeeTypes.value.sort((a, b) => (a[columnName] < b[columnName] ? 1 : -1));
                }
            }
            const tblloader = ref(true);

            onMounted(() => {
                getEmployeeTypes().then(() =>{
                    tblloader.value = false;
                })
            })

            const deleteEmployeeType = async (id) =>{
                
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

                    await destroyEmployeeType(id);
                    await getEmployeeTypes().then(() => {
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
                router.push({name: 'employeetype.edit', params: { id: id }});
            }

			return {
				employeetypes,
                filteredEmployeeTypes,
				destroyEmployeeType,
                sortTable,
                sortColumn,
                arrowIconName,
                sortDirection,
                searchQuery,
                getEmployeeTypes,
                deleteEmployeeType,
                goshow,
                tblloader
			}
		}
	}
</script>
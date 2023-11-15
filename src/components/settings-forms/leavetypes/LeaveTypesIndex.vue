<template>
    <div class="row w-right-nav">
        <div class="col col-w-settings">
            <div class="row">
                <div class="col-md-12 p-title">
                    <h2>Leave Types</h2>
                </div>
            </div>
            <div class="row">        
                <div class="col-auto">
                    <router-link :to="{ name: 'leavetypes.create' }" class="btn btn-blue">New Leave Type <i class="fa-solid fa-plus"></i></router-link>
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
                            <th>
                                Description
                            </th>
                             <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        <template v-if="!tblloader">
                            <template v-for="leavetype in filteredLeaveTypes" :key="leavetype.id">
                                <tr>
                                    <td>
                                        {{ leavetype.name }}
                                    </td>
                                    <td>
                                        {{leavetype.description}}
                                    </td>
                                    <td @click.stop>
                                        <template v-if="leavetype.createdby == userid ||userslug.includes('admin') || userslug.includes('super-admin')">
                                            <ul class="ls-frmbutton text-end list-inline">

                                                <li class="list-inline-item">
                                                    <button class="btn btn-outline-violet" title="Edit" @click="goshow(leavetype.id)"> 
                                                        <i class="fa-solid fa-user-pen"></i> <span class="actionText">Edit</span>
                                                    </button>
                                                </li>
                                                <li class="list-inline-item">
                                                    <button title="delete" class="btn btn-outline-danger" @click="deleteLeaveType(leavetype.id)"><i class="fa-solid fa-trash-can"></i> Delete</button>
                                                </li>
                                            </ul>
                                        </template>                           
                                    </td>
                                </tr>
                            </template>
                            <template v-if="searchQuery">
                                <template v-if="!filteredLeaveTypes.length">
                                    <tr class="nodata">
                                        <td colspan="3">
                                            No Results Found
                                        </td>
                                    </tr>
                                </template>                         
                            </template>
                            <template v-else>
                                <template v-if="!filteredLeaveTypes.length">
                                    <tr class="nodata">
                                        <td colspan="3">
                                            No Entry!
                                        </td>
                                    </tr>
                                </template> 
                            </template>  
                        </template>
                        <template v-else>
                            <tr class="nodata pr">
                                <td colspan="3">
                                    <LoadingComponent/>
                                </td>
                            </tr>
                        </template>
                        
                    </tbody>
                </table>
            </div>
        </div>
        <RightNavForms/>
    </div>
</template>

<script>
	import useLeaveTypes from '@/composables/composables-leavetypes';
    import {onMounted ,ref, computed, inject} from 'vue';
    import { sortBy} from 'lodash';
    import {useRouter} from 'vue-router'
    import { useHead } from '@unhead/vue'
    import {useAuthStore} from '@/stores/store.js'
    import RightNavForms from '@/components/navigation/RightNavForms.vue';
    import LoadingComponent from '@/components/loader/LoadingComponent.vue'


	export default{
        components: {
            RightNavForms,
            LoadingComponent
        },
		setup(){
            useHead({
                title: 'Settings - Employee Leave Types | BFAR - CAR HRMIS'
            })
            const swal = inject('$swal')
            const store = useAuthStore()

            const userid = store.getdetails[0];
            const userslug = store.getdetails[1];

			const {leavetypes, getLeaveTypes, destroyLeaveType} = useLeaveTypes()

            const searchQuery = ref("");
            const arrowIconName = ref("arrow_drop_up");     
            const sortColumn = ref("id");
            const sortDirection = ref(1);

            const tblloader = ref(true);
			

            const filteredLeaveTypes = computed(function(){
                return leavetypes.value.filter(
                    (leavetype) => leavetype.name.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1 || 
                                    (leavetype.description && leavetype.description.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1 )    
                );
            });

            const router = useRouter()

            const sortTable = (columnName) => {
                sortColumn.value = columnName;
                sortDirection.value = -1 * sortDirection.value;
                if (sortDirection.value == 1) {
                    arrowIconName.value = "arrow_drop_up";
                    filteredLeaveTypes.value.sort((a, b) => (a[columnName] > b[columnName] ? 1 : -1));
                } else {
                    arrowIconName.value = "arrow_drop_down";
                    filteredLeaveTypes.value.sort((a, b) => (a[columnName] < b[columnName] ? 1 : -1));
                }
            }

            onMounted(() =>{
                getLeaveTypes().then(() => {
                    tblloader.value = false
                }) 
                
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
                filteredLeaveTypes,
				destroyLeaveType,
                sortTable,
                sortColumn,
                arrowIconName,
                sortDirection,
                searchQuery,
                deleteLeaveType,
                goshow,
                userslug,
                userid,
                tblloader
			}
		}
	}
</script>
<template>
	<div class="row w-right-nav">
        <div class="col col-w-settings">
            <div class="row">
                <div class="col-md-12 p-title">
                    <h2>Actions</h2>
                </div>
            </div>
            <div class="row">        
                <div class="col-auto">
                   <router-link :to="{ name: 'actions.create' }" class="btn btn-blue">New Action <i class="fa-solid fa-plus"></i></router-link>

                </div>
                <div class="col">
                    <div class="form-group">
                        <input type="text" name="inputSearch"  placeholder="search..." class="form-control border-blue" v-model="searchQuery">
                    </div>
                </div>

            </div>
            <div class="tblWrap mt-3">
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
                            <template v-for="filteredAction in filteredActions" :key="filteredAction.id">
                                <tr @click="goshow(filteredAction.id)">
                                    <td>
                                        {{ filteredAction.name }}
                                    </td>
                                    <td @click.stop>
                                        <ul class="list-inline text-end mb-0">
                                            <li class="list-inline-item">
                                                <router-link :to="{ name: 'actions.edit', params: { id: filteredAction.id } }" class="btn btn-outline-violet" title="Edit"> 
                                                    <i class="fa-solid fa-user-pen"></i> <span class="actionText">Edit</span>
                                                </router-link>
                                            </li>
                                            <template v-if="userrole.includes('super-admin') || userrole.includes('admin')">                                    
                                                <li class="list-inline-item">
                                                    <button title="delete" class="btn btn-outline-danger" @click="deleteAction(filteredAction.id)"><i class="fa-solid fa-trash-can"></i> Delete</button>
                                                </li>
                                            </template>
                                        </ul>
                                        
                                    </td>
                                </tr>
                            </template>
                            <template v-if="searchQuery">
                                <template v-if="!filteredActions.length">
                                    <tr class="nodata">
                                        <td colspan="2">
                                            No Results Found
                                        </td>
                                    </tr>
                                </template>                         
                            </template>
                            <template v-else>
                                <template v-if="!filteredActions.length">
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
        <RightNavCommunications/>
    </div>

</template>
<script>
    import useActions from '@/composables/composables-actions';
    import {onMounted ,ref, computed, inject} from 'vue';
    import { sortBy} from 'lodash';
    import {useRouter} from 'vue-router'
    import { useAuthStore } from '@/stores/store.js'
    import RightNavCommunications from '@/components/navigation/RightNavCommunications.vue';
    import { useHead } from '@unhead/vue'
    import LoadingComponent from '@/components/loader/LoadingComponent.vue'


	export default{
        components: {
            RightNavCommunications,
            LoadingComponent
        },
		setup(){
            useHead({
                title: 'Settings - Actions | BFAR - CAR HRMIS'
            })
            const store = useAuthStore();
            const userrole = ref(store.getdetails[1]);

            const swal = inject('$swal')

            const {actions, getActions, destroyAction} = useActions()

            const searchQuery = ref("");
            const arrowIconName = ref("arrow_drop_up");     
            const sortColumn = ref("id");
            const sortDirection = ref(1);


            

            const filteredActions = computed(function(){
                return actions.value.filter(
                    (action) => action.name.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1
                );
            });

            const router = useRouter()

            const sortTable = (columnName) => {
                sortColumn.value = columnName;
                sortDirection.value = -1 * sortDirection.value;
                if (sortDirection.value == 1) {
                    arrowIconName.value = "arrow_drop_up";
                    filteredActions.value.sort((a, b) => (a[columnName] > b[columnName] ? 1 : -1));
                } else {
                    arrowIconName.value = "arrow_drop_down";
                    filteredActions.value.sort((a, b) => (a[columnName] < b[columnName] ? 1 : -1));
                }
            }
            const tblloader = ref(true);
            onMounted(() => {
                getActions().then(res => {
                    tblloader.value = false;
                })
            })

            const deleteAction = async (id) =>{
                
                let x = 0; //trigger

                await swal.fire({
                  title: 'Are you sure?',
                  text: "You won't be able to revert this!",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#506fd9',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                  if (result.isConfirmed) {         
                    x = 1;
                  }
                })
                if (x > 0) {

                    await destroyAction(id);
                    await getActions().then(() => {
                        swal.fire({
                            toast: true,
                            position: 'top-end',
                            title: 'Action Successfully Deleted',
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
                //router.push({name: 'employeetype.edit', params: { id: id }});
            }

            return {                
                filteredActions,                
                sortTable,
                sortColumn,
                arrowIconName,
                sortDirection,
                searchQuery,
                deleteAction,
                goshow,
                tblloader,
                userrole
            }
        }
	}
</script>
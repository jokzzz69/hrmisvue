<template>
	<div class="row w-right-nav">
        <div class="col col-w-settings">
            <div class="row">
                <div class="col-md-12 p-title">
                    <h2>Communication Groups</h2>
                </div>
            </div>
            <div class="row">        
                <div class="col-auto">
                   <router-link :to="{ name: 'communicationgroups.create' }" class="btn btn-blue">New Communication Group <i class="fa-solid fa-plus"></i></router-link>

                </div>
                <div class="col">
                    <div class="form-group">
                        <input type="text" name="inputSearch"  placeholder="search..." class="form-control border-blue" v-model="searchQuery">
                    </div>
                </div>

            </div>
            <div class="tblWrap mt-3 mb-3">
                <table class="mtable table">
                    <thead>
                        <tr>
                            <th @click="sortTable('name')">Name
                                <span v-if="sortColumn == 'name'" class="material-icons">{{arrowIconName}}</span>
                                <span v-else class="material-icons">sort</span>
                            </th>
                            <th @click="sortTable('cg_code')">Code
                                <span v-if="sortColumn == 'cg_code'" class="material-icons">{{arrowIconName}}</span>
                                <span v-else class="material-icons">sort</span>
                            </th>
                            <th>Employees
                            </th>
                            <th>Display Status</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>

                        <template v-for="filteredCommunicationGroup in filteredCommunicationGroups" :key="filteredCommunicationGroup.id">
                            <tr @click="goshow(filteredCommunicationGroup.id)">
                                <td>
                                    {{ filteredCommunicationGroup.name }}
                                </td>
                                <td>
                                    {{filteredCommunicationGroup.cg_code}}
                                </td>
                                <td>
                                    <template v-if="filteredCommunicationGroup.employees">
                                        <template v-for="x in filteredCommunicationGroup.employees">
                                            <span class="me-1 badge badge-violet text-white">{{x.name}}</span>
                                        </template>
                                    </template>
                                </td>
                                <td>
                                    <div class="form-check form-switch form-switch-cg">
                                      <input class="form-check-input" @click="updatecgdisplay(filteredCommunicationGroup.id,filteredCommunicationGroup.display)" true-value="1" false-value="0" v-model="filteredCommunicationGroup.display" type="checkbox" :id="'cgswitch-'+filteredCommunicationGroup.id">
                                    </div>
                                </td>
                                <td @click.stop>
                                    <ul class="list-inline text-end mb-0">

                                        <li class="list-inline-item">
                                            <router-link :to="{ name: 'communicationgroups.groups', params: { id: filteredCommunicationGroup.id } }" class="btn btn-outline-success" title="Add Employees"> 
                                                <i class="fa-solid fa-people-group"></i> <span class="actionText">Edit Employees</span>
                                            </router-link>
                                        </li>
                                        <li class="list-inline-item">
                                            <router-link :to="{ name: 'communicationgroups.edit', params: { id: filteredCommunicationGroup.id } }" class="btn btn-outline-violet" title="Edit"> 
                                                <i class="fa-solid fa-user-pen"></i> <span class="actionText">Edit</span>
                                            </router-link>
                                        </li>
                                        <template v-if="userrole.includes('super-admin') || userrole.includes('admin')"> 
                                           <li class="list-inline-item">
                                                <button title="delete" class="btn btn-outline-danger" @click="deleteCommunicationGroup(filteredCommunicationGroup.id)"><i class="fa-solid fa-trash-can"></i> Delete</button>
                                            </li> 
                                        </template>                                        
                                    </ul>                                    
                                </td>
                            </tr>
                        </template>
                        <tr v-if="noData">
                            <td colspan="2" class="text-center">No Results found!</td>
                        </tr>
                    </tbody>
                </table>   
            </div>
        </div>   
        <RightNavCommunications/>
    </div>
</template>
<script>
    import useCommunicationGroups from '@/composables/composables-communicationgroups';
    import {onMounted ,ref, computed, inject,reactive} from 'vue';
    import { sortBy} from 'lodash';
    import {useRouter} from 'vue-router'

    import { useAuthStore } from '@/stores/store.js'
    import RightNavCommunications from '@/components/navigation/RightNavCommunications.vue';
    import { useHead } from '@unhead/vue'

	export default{
        components: {
            RightNavCommunications
        },
		setup(){
            useHead({
                title: 'Settings - Communication Groups | BFAR - CAR HRMIS'
            })
            const swal = inject('$swal')
            const noData = ref(false);
            const {communicationgroups, getCommunicationGroups, destroyCommunicationGroup ,updateCommunicationGroupDisplay} = useCommunicationGroups()

            const searchQuery = ref("");
            const arrowIconName = ref("arrow_drop_up");     
            const sortColumn = ref("id");
            const sortDirection = ref(1);

            const store = useAuthStore();
            const userrole = ref(store.getdetails[1]);
            const displayform = reactive({
                'check': ''
            });

            const callback = (cgemployees,searchQuery) => { 
                const newArr = [];
                for (var i = 0; i <= cgemployees.length; i++) {
                    newArr.push(cgemployees[i] && cgemployees[i].name.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1)
                }
                if(newArr.includes(true)){
                    return true;
                }else{
                    return false;
                }
            }

            const filteredCommunicationGroups = computed(function(){
                return communicationgroups.value.filter(
                    (communicationgroup) => communicationgroup.name.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1 ||
                                            communicationgroup.cg_code.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1 ||
                                            callback(communicationgroup.employees, searchQuery.value)
                );
            });

            const router = useRouter()

            const sortTable = (columnName) => {
                sortColumn.value = columnName;
                sortDirection.value = -1 * sortDirection.value;
                if (sortDirection.value == 1) {
                    arrowIconName.value = "arrow_drop_up";
                    filteredCommunicationGroups.value.sort((a, b) => (a[columnName] > b[columnName] ? 1 : -1));
                } else {
                    arrowIconName.value = "arrow_drop_down";
                    filteredCommunicationGroups.value.sort((a, b) => (a[columnName] < b[columnName] ? 1 : -1));
                }
            }

            onMounted(() => {
                getCommunicationGroups().then(res =>{
                    if(communicationgroups.value.length > 0){
                        noData.value = false;
                    }else{
                        noData.value = true;
                    }
                })
            })

            const deleteCommunicationGroup = async (id) =>{
                
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

                    await destroyCommunicationGroup(id);
                    await getCommunicationGroups().then(() => {
                        swal.fire({
                            toast: true,
                            position: 'top-end',
                            title: 'Communication Group Successfully Deleted',
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

            const updatecgdisplay = async(id,data) =>{
            
                if(data == 1){
                    displayform.check = 0;
                }else{
                    displayform.check = 1;
                }
                await updateCommunicationGroupDisplay(id,{...displayform});
            }
            const goshow = (id) => {
                //router.push({name: 'employeetype.edit', params: { id: id }});
            }

            return {                
                filteredCommunicationGroups,                
                sortTable,
                sortColumn,
                arrowIconName,
                sortDirection,
                searchQuery,
                deleteCommunicationGroup,
                goshow,
                noData,
                userrole,
                updatecgdisplay
            }
        }
	}
</script>
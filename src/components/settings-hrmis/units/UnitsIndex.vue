<template>
	<div class="row w-right-nav">
        <div class="col col-w-settings">
            <div class="row">
                <div class="col-md-12 p-title">
                    <h2>Units</h2>
                </div>
            </div>
            <div class="row">        
                <div class="col-auto">
                   <router-link :to="{ name: 'units.create' }" class="btn btn-blue">New Unit <i class="fa-solid fa-plus"></i></router-link>

                </div>
                <div class="col">
                    <div class="form-group">
                        <input type="text" name="inputSearch"  placeholder="search..." class="form-control border-blue" v-model="searchQuery">
                    </div>
                </div>

            </div>
            <div class="tblWrap mt-3 mb-3">
                <table class="mtable table tblGroupsIndex nottbllink">
                    <thead>
                        <tr>
                            <th @click="sortTable('name')">Name
                                <span v-if="sortColumn == 'name'" class="material-icons">{{arrowIconName}}</span>
                                <span v-else class="material-icons">sort</span>
                            </th>
                            <th @click="sortTable('slug')">Slug
                                <span v-if="sortColumn == 'slug'" class="material-icons">{{arrowIconName}}</span>
                                <span v-else class="material-icons">sort</span>
                            </th>
                            <th>Employees</th>
                            <th>Display on Communication</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        <template v-if="!tblloader">
                            <template v-for="filteredUnit in filteredUnits" :key="filteredUnit.id">
                                <tr @click="goshow(filteredUnit.id)">
                                    <td>
                                        {{ filteredUnit.name }}
                                    </td>
                                    <td>
                                        {{filteredUnit.slug}}
                                    </td>
                                    <td>
                                        <template v-if="filteredUnit.employees">
                                            <template v-for="x in filteredUnit.employees">
                                                <span class="me-1 badge badge-violet text-white">{{x.name}}</span>
                                            </template>
                                        </template>
                                    </td>
                                    <td>

                                    </td>
                                    
                                    <td @click.stop>
                                        <ul class="list-inline text-end mb-0">

                                            <li class="list-inline-item">
                                                <router-link :to="{ name: 'units.employees', params: { id: filteredUnit.id } }" class="btn btn-outline-success" title="Add Employees"> 
                                                    <i class="fa-solid fa-people-group"></i> <span class="actionText">Edit Employees</span>
                                                </router-link>
                                            </li>
                                            
                                            <li class="list-inline-item">
                                                <router-link :to="{ name: 'units.edit', params: { id: filteredUnit.id } }" class="btn btn-outline-violet" title="Edit"> 
                                                    <i class="fa-solid fa-user-pen"></i> <span class="actionText">Edit</span>
                                                </router-link>
                                            </li>
                                            <template v-if="userrole.includes('super-admin') || userrole.includes('admin')"> 
                                               <li class="list-inline-item">
                                                    <button title="delete" class="btn btn-outline-danger" @click="deleteunit(filteredUnit.id)"><i class="fa-solid fa-trash-can"></i> Delete</button>
                                                </li> 
                                            </template>                                        
                                        </ul>                                    
                                    </td>
                                </tr>
                            </template>
                            <template v-if="searchQuery">
                                <template v-if="!filteredUnits.length">
                                    <tr class="nodata">
                                        <td colspan="6">
                                            No Results Found
                                        </td>
                                    </tr>
                                </template>                         
                            </template>
                            <template v-else>
                                <template v-if="!filteredUnits.length">
                                    <tr class="nodata">
                                        <td colspan="6">
                                            No Entry!
                                        </td>
                                    </tr>
                                </template> 
                            </template>  
                        </template>
                        <template v-else>
                            <tr class="nodata pr">
                                <td colspan="6">
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
    import useUnits from '@/composables/hrmis/composables-settingsunits';
    import {onMounted ,ref, computed, inject,reactive} from 'vue';
    import { sortBy} from 'lodash';
    import {useRouter} from 'vue-router'
    import { useAuthStore } from '@/stores/store.js'
    import RightNavHrmis from '@/components/navigation/RightNavHrmis.vue';
    import { useHead } from '@unhead/vue'
    import LoadingComponent from '@/components/loader/LoadingComponent.vue'


	export default{
        components: {
            RightNavHrmis,
            LoadingComponent
        },
		setup(){
            useHead({
                title: 'Settings - Communication Units | '+import.meta.env.VITE_BFAR_AGENCY
            })
            const swal = inject('$swal')
            const tblloader = ref(true);
            const {
                units,
                getUnits,
                destroyUnit
            } = useUnits()

            const searchQuery = ref("");
            const arrowIconName = ref("arrow_drop_up");     
            const sortColumn = ref("id");
            const sortDirection = ref(1);

            const store = useAuthStore();
            const userrole = ref(store.getdetails[1]);
            const displayform = reactive({
                'check': ''
            });
            const labelform = reactive({
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

            const filteredUnits = computed(function(){
                return units.value.filter(
                    (unit) => unit.name.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1 ||
                                            unit.slug.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1
                                            //callback(unit.employees, searchQuery.value)
                );
            });

            const router = useRouter()

            const sortTable = (columnName) => {
                sortColumn.value = columnName;
                sortDirection.value = -1 * sortDirection.value;
                if (sortDirection.value == 1) {
                    arrowIconName.value = "arrow_drop_up";
                    filteredUnits.value.sort((a, b) => (a[columnName] > b[columnName] ? 1 : -1));
                } else {
                    arrowIconName.value = "arrow_drop_down";
                    filteredUnits.value.sort((a, b) => (a[columnName] < b[columnName] ? 1 : -1));
                }
            }

            onMounted(() => {
                getUnits().then(res =>{
                    tblloader.value = false;
                })
            })

            const deleteunit = async (id) =>{
                
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
                    await destroyUnit(id);
                    await getUnits().then(() => {
                        swal.fire({
                            toast: true,
                            position: 'top-end',
                            title: 'Unit Successfully Deleted',
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
                await updateunitDisplay(id,{...displayform});
            }
            const goshow = (id) => {
                //router.push({name: 'employeetype.edit', params: { id: id }});
            }


            return {                
                filteredUnits,                
                sortTable,
                sortColumn,
                arrowIconName,
                sortDirection,
                searchQuery,
                deleteunit,
                goshow,
                tblloader,
                userrole,
                updatecgdisplay

            }
        }
	}
</script>
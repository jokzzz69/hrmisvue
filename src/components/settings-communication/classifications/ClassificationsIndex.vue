<template>
	<div class="row w-right-nav">
        <div class="col col-w-settings">
            <div class="row">
                <div class="col-md-12 p-title">
                    <h2>Classifications</h2>
                </div>
            </div>
            <div class="row">        
                <div class="col-auto">
                   <router-link :to="{ name: 'classifications.create' }" class="btn btn-blue">New Classification <i class="fa-solid fa-plus"></i></router-link>

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
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>                   

                        <template v-for="filteredClassification in filteredClassifications" :key="filteredClassification.id">
                            <tr>
                                <td>
                                    {{ filteredClassification.name }}
                                </td>
                                <td @click.stop>
                                    <ul class="list-inline text-end mb-0">
                                        <li class="list-inline-item">
                                            <router-link :to="{ name: 'classifications.edit', params: { id: filteredClassification.id } }" class="btn btn-outline-violet" title="Edit"> 
                                                <i class="fa-solid fa-user-pen"></i> <span class="actionText">Edit</span>
                                            </router-link>
                                        </li>
                                        <template v-if="userrole.includes('super-admin') || userrole.includes('admin')"> 
                                            <li class="list-inline-item">
                                                <button title="delete" class="btn btn-outline-danger" @click="deleteClassification(filteredClassification.id)"><i class="fa-solid fa-trash-can"></i> Delete</button>
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
    import useClassifications from '@/composables/composables-classifications';
    import {onMounted ,ref, computed, inject} from 'vue';
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
                title: 'Settings - Classifications | BFAR - CAR HRMIS'
            })
            const store = useAuthStore();
            const userrole = ref(store.getdetails[1]);
            const swal = inject('$swal')
            const noData = ref(false);
            const {classifications, getClassifications, destroyClassification} = useClassifications()

            const searchQuery = ref("");
            const arrowIconName = ref("arrow_drop_up");     
            const sortColumn = ref("id");
            const sortDirection = ref(1);


            

            const filteredClassifications = computed(function(){
                return classifications.value.filter(
                    (classification) => classification.name.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1
                );
            });

            const router = useRouter()

            const sortTable = (columnName) => {
                sortColumn.value = columnName;
                sortDirection.value = -1 * sortDirection.value;
                if (sortDirection.value == 1) {
                    arrowIconName.value = "arrow_drop_up";
                    filteredClassifications.value.sort((a, b) => (a[columnName] > b[columnName] ? 1 : -1));
                } else {
                    arrowIconName.value = "arrow_drop_down";
                    filteredClassifications.value.sort((a, b) => (a[columnName] < b[columnName] ? 1 : -1));
                }
            }

            onMounted(() => getClassifications().then(res => {
                if(classifications.value.length > 0){
                    noData.value = false;
                }else{
                    noData.value = true;
                }
            }))

            const deleteClassification = async (id) =>{
                
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

                    await destroyClassification(id);
                    await getClassifications().then(() => {
                        swal.fire({
                            toast: true,
                            position: 'top-end',
                            title: 'Classification Successfully Deleted',
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
                filteredClassifications,                
                sortTable,
                sortColumn,
                arrowIconName,
                sortDirection,
                searchQuery,
                deleteClassification,
                goshow,
                noData,
                userrole
            }
        }
	}
</script>
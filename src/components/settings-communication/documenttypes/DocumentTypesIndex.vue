<template>
	<div class="row w-right-nav">
        <div class="col col-w-settings">
            <div class="row">
                <div class="col-md-12 p-title">
                    <h2>Document Types</h2>
                </div>
            </div>
            <div class="row">        
                <div class="col-auto">
                   <router-link :to="{ name: 'documenttypes.create' }" class="btn btn-blue">New Document Type <i class="fa-solid fa-plus"></i></router-link>

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

                        <template v-if="filteredDocumenttypes.length > 0">
                            <template v-for="filteredDocumenttype in filteredDocumenttypes" :key="filteredDocumenttype.id">
                                <tr @click="goshow(filteredDocumenttype.id)">
                                    <td>
                                        {{ filteredDocumenttype.name }}
                                    </td>
                                    <td @click.stop>
                                        <ul class="list-inline text-end mb-0">
                                            <li class="list-inline-item">
                                                <router-link :to="{ name: 'documenttypes.edit', params: { id: filteredDocumenttype.id } }" class="btn btn-outline-violet" title="Edit"> 
                                                    <i class="fa-solid fa-user-pen"></i> <span class="actionText">Edit</span>
                                                </router-link>
                                            </li>
                                            <template v-if="userrole.includes('super-admin') || userrole.includes('admin')"> 
                                                <li class="list-inline-item">
                                                    <button title="delete" class="btn btn-outline-danger" @click="deleteDocumentType(filteredDocumenttype.id)"><i class="fa-solid fa-trash-can"></i> Delete</button>
                                                </li>
                                            </template>
                                        </ul>
                                        
                                    </td>
                                </tr>

                            </template>
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
    import useDocumentTypes from '@/composables/composables-documenttypes';
    import {onMounted ,ref, computed, inject} from 'vue';
    import { sortBy} from 'lodash';
    import {useRouter} from 'vue-router'
    import RightNavCommunications from '@/components/navigation/RightNavCommunications.vue';
    import { useAuthStore } from '@/stores/store.js'
    import { useHead } from '@unhead/vue'

	export default{
        components: {
            RightNavCommunications
        },
		setup(){
            useHead({
                title: 'Settings - Document Types | BFAR - CAR HRMIS'
            })
            const store = useAuthStore();
            const userrole = ref(store.getdetails[1]);

            const swal = inject('$swal')
            const noData = ref(false);
            const {documenttypes, getDocumentTypes, destroyDocumentType} = useDocumentTypes()

            const searchQuery = ref("");
            const arrowIconName = ref("arrow_drop_up");     
            const sortColumn = ref("id");
            const sortDirection = ref(1);            



            const filteredDocumenttypes = computed(function(){
                return documenttypes.value.filter(
                    (documenttype) => documenttype.name.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1
                );
            });

            const router = useRouter()

            const sortTable = (columnName) => {
                sortColumn.value = columnName;
                sortDirection.value = -1 * sortDirection.value;
                if (sortDirection.value == 1) {
                    arrowIconName.value = "arrow_drop_up";
                    filteredDocumenttypes.value.sort((a, b) => (a[columnName] > b[columnName] ? 1 : -1));
                } else {
                    arrowIconName.value = "arrow_drop_down";
                    filteredDocumenttypes.value.sort((a, b) => (a[columnName] < b[columnName] ? 1 : -1));
                }
            }

            onMounted(() =>{
                getDocumentTypes().then(res => {
                    if(documenttypes.value.length > 0){
                        noData.value = false;
                    }else{
                        noData.value = true;
                    }
                })
            })

            const deleteDocumentType = async (id) =>{
                
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

                    await destroyDocumentType(id);
                    await getDocumentTypes().then(() => {
                        swal.fire({
                            toast: true,
                            position: 'top-end',
                            title: 'Document Type Successfully Deleted',
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
                filteredDocumenttypes,
                documenttypes,              
                sortTable,
                sortColumn,
                arrowIconName,
                sortDirection,
                searchQuery,
                deleteDocumentType,
                goshow,
                noData,
                userrole
            }
        }
	}
</script>
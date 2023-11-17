<template>
	<div class="row w-right-nav">
        <div class="col col-w-settings">
            <div class="row">
                <div class="col-md-12 p-title">
                    <h2>Notes</h2>
                </div>
            </div>
            <div class="row">        
                <div class="col-auto">
                   <router-link :to="{ name: 'notes.create' }" class="btn btn-blue">New Note <i class="fa-solid fa-plus"></i></router-link>

                </div>
                <div class="col">
                    <div class="form-group">
                        <input type="text" name="inputSearch"  placeholder="search..." class="form-control border-blue" v-model="searchQuery">
                    </div>
                </div>

            </div>
            <div class="tblWrap mt-3 mb-3">
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
                            <template v-for="filteredNote in filteredNotes" :key="filteredNote.id">
                                <tr @click="goshow(filteredNote.id)">
                                    <td>
                                        {{ filteredNote.name }}
                                    </td>
                                    <td @click.stop>
                                        <ul class="list-inline text-end mb-0">
                                            <li class="list-inline-item">
                                                <router-link :to="{ name: 'notes.edit', params: { id: filteredNote.id } }" class="btn btn-outline-violet" title="Edit"> 
                                                    <i class="fa-solid fa-user-pen"></i> <span class="actionText">Edit</span>
                                                </router-link>
                                            </li>
                                            <template v-if="userrole.includes('super-admin') || userrole.includes('admin')"> 
                                                <li class="list-inline-item">
                                                    <button title="delete" class="btn btn-outline-danger" @click="deleteNote(filteredNote.id)"><i class="fa-solid fa-trash-can"></i> Delete</button>
                                                </li>
                                            </template>
                                        </ul>
                                        
                                    </td>
                                </tr>
                            </template>
                            <template v-if="searchQuery">
                                <template v-if="!filteredNotes.length">
                                    <tr class="nodata">
                                        <td colspan="2">
                                            No Results Found
                                        </td>
                                    </tr>
                                </template>                         
                            </template>
                            <template v-else>
                                <template v-if="!filteredNotes.length">
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
    import useNotes from '@/composables/composables-notes';
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
                title: 'Settings - Notes | '+import.meta.env.VITE_BFAR_AGENCY
            })
            const store = useAuthStore();
            const userrole = ref(store.getdetails[1]);

            const swal = inject('$swal')
            
            const {notes, getNotes, destroyNote} = useNotes()

            const searchQuery = ref("");
            const arrowIconName = ref("arrow_drop_up");     
            const sortColumn = ref("id");
            const sortDirection = ref(1);


            

            const filteredNotes = computed(function(){
                return notes.value.filter(
                    (note) => note.name.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1
                );
            });

            const router = useRouter()

            const sortTable = (columnName) => {
                sortColumn.value = columnName;
                sortDirection.value = -1 * sortDirection.value;
                if (sortDirection.value == 1) {
                    arrowIconName.value = "arrow_drop_up";
                    filteredNotes.value.sort((a, b) => (a[columnName] > b[columnName] ? 1 : -1));
                } else {
                    arrowIconName.value = "arrow_drop_down";
                    filteredNotes.value.sort((a, b) => (a[columnName] < b[columnName] ? 1 : -1));
                }
            }
            const tblloader = ref(true);
            onMounted(() => {
                getNotes().then(() =>{
                    tblloader.value = false;
                })
            })

            const deleteNote = async (id) =>{
                
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

                    await destroyNote(id);
                    await getNotes().then(() => {
                        swal.fire({
                            toast: true,
                            position: 'top-end',
                            title: 'Note Successfully Deleted',
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
                filteredNotes,                
                sortTable,
                sortColumn,
                arrowIconName,
                sortDirection,
                searchQuery,
                deleteNote,
                goshow,
                userrole,
                tblloader
            }
        }
	}
</script>
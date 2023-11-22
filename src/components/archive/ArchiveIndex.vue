<template>
    <div class="row">
        <div class="col-md-12 p-title">
            <h2>Archive</h2>
            <template v-if="userrole == 'super-admin'">
                <form @submit.prevent="clearArchive" class="mb-2 mt-2">
                    <button type="submit" class="mt-2 btn btn-outline-danger"> Clear Archive</button>
                </form>
            </template>
        </div>
    </div>
	<div class="row">
        <div class="col">
            <div class="form-group">
                <input type="text" name="inputSearch"  placeholder="search..." class="form-control border-blue" v-model="searchQuery">
            </div>
        </div>    </div>
	   <div class="mtmb mt-2 mb-2 tblWrap">
        <table class="mtable table tbllink">
            <thead>
                <tr>
                    <th @click="sortTable('name')">Name
                        <span v-if="sortColumn == 'name'" class="material-icons">{{arrowIconName}}</span>
                        <span v-else class="material-icons">sort</span>
                    </th>
                    <th @click="sortTable('datearachived')">Date Archived
                        <span v-if="sortColumn == 'name'" class="material-icons">{{arrowIconName}}</span>
                        <span v-else class="material-icons">sort</span>
                    </th>
                     <th>
                         
                     </th>
                </tr>
            </thead>

            <tbody>
                <template v-if="filteredArchives.length > 0">
                    <template v-for="archive in filteredArchives" :key="archive.id">
                        <tr>
                            <td>
                                <template v-if="archive.name">
                                   {{ archive.name}}
                                </template>

                            </td>
                            <td>
                                <template v-if="archive.created_at">
                                    {{moment(new Date(archive.created_at)).format('LLLL')}}
                                </template>                         
                            </td>
                            <td class="text-end">
                                <ul class="ls-frmbutton">
                                    <li>
                                        <router-link :to="{ name: 'archives.restore', params: { id: archive.id } }" class="btn btn-outline-secondary" title="Restore"><i class="fa-solid fa-trash-can-arrow-up"></i> <span class="actionText">Restore</span>
                                        </router-link>
                                    </li>
                                    <li>
                                        <button class="btn btn-violet" @click="showEmployment(archive.id,archive.name)" title="View Employment"> 
                                            <i class="fa-solid fa-person-digging"></i> <span class="btn-txtspan">View Employment</span>
                                        </button>
                                    </li>
                                    <li>
                                        <button class="btn btn-outline-danger" title="View PDS"  @click="showModalPDS(archive.id,archive.name)"> 
                                            <i class="fa-regular fa-file-lines"></i> <span class="btn-txtspan">View PDS</span>
                                        </button>
                                    </li>
                                </ul>
                            </td>
                        </tr>
                    </template>
                </template>
                <template v-else>
                            <template v-if="!noData">
                                <tr class="pr nodata">
                                    <td colspan="3">
                                        <template v-if="searchQuery && !filteredOfficeRecords.length">               
                                            No Result Found                     
                                        </template>
                                        <template v-else>                                       
                                            <LoadingComponent/>
                                        </template>
                                    </td>
                                </tr>
                            </template>
                        </template>
                        <template v-if="noData">                                
                            <tr class="nodata pr">
                                <td colspan="3"><span class="nodata">Archive is Empty </span>
                                </td>
                            </tr>
                        </template>
            </tbody>
        </table>   
       </div>



    <div v-if="showModal" class="modal-mask archive-modal" @keydown.esc="closeModal" tabindex="0">
        <div class="modal-wrapper" >
            <div class="modal-container archive-modal">
                <div class="modal-header archive-modal">            
                    <h5 class="modal-title text-light">{{modaltitle}}
                        <a href="#" v-if="typecontent == 2" @click.prevent="dlArchivePDS(empid)" class="pt-1 pb-1 mt-2 mb-2 btn btn-download btn-danger ms-2" title="Download Personal Data Sheet"><i class="fa-solid fa-download"></i> Download</a>
                    </h5>
                    <button type="button" class="btn btn-closeModal"  @click="closeModal"><i class="fa-solid fa-xmark"></i></button>
                </div> 
              <div class="modal-body archive-modal">      
                    <template v-if="typecontent == 1">
                        <ArchiveEmployment :id="empid"/>
                    </template>      
                    <template v-else-if="typecontent == 2">
                        <ArchivePDSPage1 :id="empid"/>
                        <ArchivePDSPage2 :id="empid"/>
                        <ArchivePDSPage3 :id="empid"/>
                        <ArchivePDSPage4 :id="empid"/>
                    </template>
              </div>
            </div>
        </div>
    </div>
</template>

<script>
	import useArchive from '@/composables/composables-archive';
    import {onMounted ,ref, computed, inject} from 'vue';
    import { sortBy} from 'lodash';
    import {useRouter} from 'vue-router'
    import moment from 'moment';
    import ArchivePDSPage1 from '@/components/archive/ArchivePDSPage1.vue';
    import ArchivePDSPage2 from '@/components/archive/ArchivePDSPage2.vue';
    import ArchivePDSPage3 from '@/components/archive/ArchivePDSPage3.vue';
    import ArchivePDSPage4 from '@/components/archive/ArchivePDSPage4.vue';
    import ArchiveEmployment from '@/components/archive/ArchiveEmployment.vue';
    import { useAuthStore } from '@/stores/store.js'
    import usePDS from '@/composables/composables-pds';
    import { useHead } from '@unhead/vue'
    import LoadingComponent from '@/components/loader/LoadingComponent.vue';
	export default{
        components: {
            ArchivePDSPage1,
            ArchivePDSPage2,
            ArchivePDSPage3,
            ArchivePDSPage4,
            ArchiveEmployment,
            LoadingComponent
        },
		setup(){
            useHead({
                title: 'Archives | BFAR - CAR RFIMS'
            })
            const store = useAuthStore();
            const userrole = ref(store.getdetails[1]);
            const authid = ref(store.getdetails[0]);
            const swal = inject('$swal')
            
			const {errors, getArchives, archives, deleteArchived, archive, getArchiveEmployee} = useArchive()
            const {downloadArchivePDS} = usePDS()
            const showModal = ref(false) 
            const searchQuery = ref("");
            const arrowIconName = ref("arrow_drop_up");     
            const sortColumn = ref("id");
            const sortDirection = ref(1);

            const empid = ref();
            const empname = ref();
            const typecontent = ref(0);
            const modaltitle = ref('');            
            const router = useRouter()
			const noData = ref(false)

            onMounted(() => {
                getArchives().then(() =>{
                    if(archives.value.length > 0){
                        noData.value = false;
                    }else{
                        noData.value = true;
                    }
                })

            })

            const filteredArchives = computed(function(){
                return archives.value.filter(
                    (archive) => archive.name.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1 || 
                              (archive.created_at && moment(new Date(archive.created_at)).format('LLLL').toLowerCase().indexOf(searchQuery.value.toLowerCase())) > -1
                )
                
            });


            const clearArchive = async() =>{
                await deleteArchived();
                await getArchives();
            }

            const sortTable = (columnName) => {
                sortColumn.value = columnName;
                sortDirection.value = -1 * sortDirection.value;
                if (sortDirection.value == 1) {
                    arrowIconName.value = "arrow_drop_up";
                    filteredArchives.value.sort((a, b) => (a[columnName] > b[columnName] ? 1 : -1));
                } else {
                    arrowIconName.value = "arrow_drop_down";
                    filteredArchives.value.sort((a, b) => (a[columnName] < b[columnName] ? 1 : -1));
                }
            }

            


            const goshow = (id) => {
                router.push({name: 'contentsoon.index'});
            }
            const checkText = (text) => {
                let newText = text.toLowerCase().replace(/ /g, '');
                let x = false;
                if(newText !== 'n/a' && newText !== 'na'){
                    x = true;
                }
                return x;
            }

            const showModalPDS = (id,name) => {
                showModal.value = true;
                empid.value = id;
                modaltitle.value = "Personal Data Sheet - "+name;
                empname.value = name;
                typecontent.value = 2;
                document.body.classList.add('hbar')
            }
            const closeModal = () => {
                showModal.value = false;
                document.body.classList.remove('hbar')
            }
            const showEmployment = (id,name) => {
                showModal.value = true;
                empid.value = id;
                modaltitle.value = "Employment - "+name;
                typecontent.value = 1;
                document.body.classList.add('hbar')
            }
            const dlArchivePDS = async(id) => {
                await downloadArchivePDS(id, empname.value);
            }
			return {
                filteredArchives,
                sortTable,
                sortColumn,
                arrowIconName,
                sortDirection,
                searchQuery,
                goshow,
                checkText,
                moment,
                clearArchive,
                showModal,
                showModalPDS,
                showEmployment,
                empid,
                modaltitle,
                closeModal,
                typecontent,
                authid,
                userrole,
                dlArchivePDS,
                noData
			}
		}
	}
</script>
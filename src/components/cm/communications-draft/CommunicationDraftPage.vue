<template>
	<div class="row">
        <div class="col pAgeEmail--title">
            <ul class="pAgeEmail--title__wrap">
                <li class="pAgeEmail--title__content"><h2 class="ps-1">Draft</h2></li>
                <li class="pAgeEmail__input pAgeEmail--title__search">
                    <div class="input-group">
                      <div class="input-group-text"><i class="fa-solid fa-magnifying-glass"></i></div>
                      <input name="s" type="text" class="form-control" placeholder="Search" v-model="searchQuery.search" @keypress.enter="searchData" />
                    </div>                                   
                </li>
            </ul>
        </div>
    </div>
    <div class="row">
        <div class="col-sm-12 fs-5">     
            <div class="min-vh-75 bg-mid-trans tblWrap f85 mb-3 pb-3">
            	<table class="tbl tblEmail--Wrap draft table">
                    <thead>
                        <tr>
                            <th>
                                <input class="chk__p form-check-input" type="checkbox" @change="checkParentDraft" v-model="allcheckeddraft">                          
                            </th> 
                            <th>  
                                <ul class="list-inline mb-0 bulkIcons" v-if="withChecked">
                                    <li class="list-inline-item"><span title="Delete" @click="deleteSelected"><i class="fa-solid fa-trash-can"></i></span></li>
                                </ul>                                
                            </th>                              
                            <th></th>
                            <th></th>
                            <th></th>
                            <th class="text-end">
                                <template v-if="draftMeta.last_page > 1">                     
                                    <Pagination @show-Page="showPage" :meta="metaString" :prev="hasPrev" :next="hasNext"/>                                    
                                </template>    
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        <template v-if="drafts.length > 0">
                            <template v-for="draft in drafts" :key="draft.id">
                                <tr @click="show(draft.id)">
                                    <td @click.stop><input class="form-check-input chk__c" type="checkbox" :value="draft.id" v-model="formData.selectedDraft" @change='draftCheck()'></td>
                                    <td>
                                        <span class="text-danger">Draft</span>
                                    </td>
                                    <td v-tooltip.tooltip="'Agency - Sender'"><span class="sp_agency">
                                        {{draft.agency}}

                                        <template v-if="draft.agency && draft.sender">, </template>
                                        {{draft.sender}}
                                    </span></td>
                                    <td v-tooltip.tooltip="'Subject - Venue'">
                                        <template v-if="draft.subject">
                                            <span class="sp__suject">{{draft.subject}}</span> 
                                        </template>
                                        <template v-else>
                                            <span class="sp__suject">(No Subject)<template v-if="draft.venue"> -</template> </span>
                                        </template>

                                        <template v-if="draft.venue">
                                            <span class="sp__subjectUB"><template v-if="draft.subject">- </template> {{draft.venue}}</span>
                                        </template>
                                    </td>
                                    <td v-tooltip.tooltip="'Type - Classification'"> 
                                        <template v-if="draft.documenttype">
                                            {{draft.documenttype.name}}
                                        </template>
                                        <template v-if="draft.classification">
                                            <template v-if="draft.documenttype">- </template>
                                            {{draft.classification.name}}
                                        </template>
                                        
                                    </td>                                
                                    <td v-tooltip.tooltip="'Date In'">
                                        <template v-if="draft.datetimein">
                                            {{moment(new Date(draft.datetimein)).format('MMMM D, Y hh:mm A')}}
                                        </template>
                                    </td>
                                </tr>
                            </template>                      
                        </template>
                        <template v-else>
                            <template v-if="!noData">
                                <tr class="pr nodata">
                                    <td colspan="6">
                                        <LoadingComponent/>
                                    </td>
                                </tr>
                            </template>
                        </template>
                        <template v-if="noData">                                
                            <tr class="nodata">
                                <td colspan="6"><span class="nodata">Draft is Empty</span></td>
                            </tr>
                        </template>
                    </tbody>
                </table>               
           	</div>
        </div>
    </div>
</template>
<script>
    import useCommunicationsDraft from '@/composables/composables-communicationsdraft';

    import {onMounted ,ref, computed, inject, reactive} from 'vue';
    import { sortBy} from 'lodash';
    import {useRouter} from 'vue-router'
    import moment from 'moment'
    import Pagination from '@/components/cm/reusables/Pagination.vue';
    import LoadingComponent from '@/components/loader/LoadingComponent.vue';
    import { useHead } from '@unhead/vue'

	export default{
        props: {
            id: {
                required: true,
                type: String
            }
        },
        components: {
            Pagination,
            LoadingComponent
        },
		setup(props){
            useHead({
                title: 'Communications Draft Page | '+import.meta.env.VITE_BFAR_AGENCY
            })
	        const {getCommunicationsDraft,setPageDraft,bulkactionsDraft,
            drafts,
            draftLinks,
            draftMeta

        } = useCommunicationsDraft()
            
            const swal = inject('$swal')
            const searchQuery = reactive({
                'search': ''
            });


            const formData = reactive({
                'selectedDraft': [],
                'current_page': ''
            });

            const withChecked = ref(false);

            const router = useRouter()

            const metaString = ref('');
            const hasPrev = ref(false);
            const hasNext = ref(false);
            const noData = ref(false)

            const reloadPage = (id) => {
                setPageDraft(id).then(() =>{
                    metaString.value = draftMeta.value.current_page+' of '+draftMeta.value.last_page;

                    if(draftLinks.value.next){
                        hasNext.value = true;
                    }
                    if(draftLinks.value.prev){
                        hasPrev.value = true;
                    }

                    if(drafts.value.length > 0){
       
                        noData.value = false;
                    }else{
                        noData.value = true;
                    }
                });
            }

            onMounted(() =>{
                
                reloadPage(props.id);

                
                if(sessionStorage.getItem('selected')){
                    if(JSON.parse(sessionStorage.getItem('selected')).length > 0){
                        formData.selectedDraft = JSON.parse(sessionStorage.getItem('selected'));

                        withChecked.value = true;
                    }
                }
            })


            const searchData = async() => {
                if(searchQuery.search){
                    if(searchQuery.search.trim().length !== 0){
                        const tosearch = searchQuery.search.replace(/\s/g, "+");
                        router.push({name: 'communications-draft.search', params: { content: tosearch}});
                    }
                }
            }

           const show = (id) => {
                router.push({name: 'communications-draft.edit', params: { id: id }});
            }

            const allcheckeddraft = ref(false);

            const checkParentDraft = () =>{
                if(allcheckeddraft.value){
                    formData.selectedDraft = [];
                    for (var x in drafts.value) {
                       formData.selectedDraft.push(drafts.value[x].id);
                        
                    }
                    withChecked.value = true;
                }else{
                    formData.selectedDraft = [];
                    withChecked.value = false;
                }
                sessionStorage.setItem('selected', JSON.stringify(formData.selectedDraft))
            }

            const draftCheck = async () =>{
                allcheckeddraft.value = false;

                if(drafts.value.length ==  formData.selectedDraft.length){
                    allcheckeddraft.value = true;
                }
                if(formData.selectedDraft.length > 0){
                     withChecked.value = true;
                }else{
                     withChecked.value = false;
                }
                sessionStorage.setItem('selected', JSON.stringify(formData.selectedDraft))
            }


            const showPage = (n) => {
                let id = null;
                if(n == 1){
                    id = draftLinks.value.next.match(/([^\/]*)\/*$/)[1].split('=');
                    router.push({name: 'communications-draftpage.show', params: { id: id[id.length-1] }});
                }else{
                    id = draftLinks.value.prev.match(/([^\/]*)\/*$/)[1].split('=');
                    if(id[id.length-1] == 1){
                        router.push({name: 'communications-draft.index'});
                    }else{
                        router.push({name: 'communications-draftpage.show', params: { id: id[id.length-1] }});
                    }                    
                }

                reloadPage(id[id.length-1]);
            }

            const deleteSelected = async() =>{
               formData.current_page = draftMeta.value.current_page

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
                    allcheckeddraft.value = false;
                    sessionStorage.clear();

                    await bulkactionsDraft({...formData});


                    await getCommunicationsDraft().then(() => {
                        swal.fire({
                            toast: true,
                            position: 'top-end',
                            title: 'Draft Deleted',
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

                        metaString.value = draftMeta.value.current_page+' of '+draftMeta.value.last_page;

                        if(draftLinks.value.next){
                            hasNext.value = true;
                        }
                        if(draftLinks.value.prev){
                            hasPrev.value = true;
                        }
                        
                    })
                }


                
               
               
            }

           return {
                drafts,
                moment,
                searchQuery,
                show,
                draftLinks,
                draftMeta,
                showPage,
                metaString,
                hasPrev,
                hasNext,
                searchData,
                checkParentDraft,
                allcheckeddraft,
                formData,
                draftCheck,
                withChecked,
                deleteSelected,
                noData
           }
		}
	}
</script>
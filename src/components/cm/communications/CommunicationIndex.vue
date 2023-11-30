<template>
    <div class="row shts">
        <div class="col pAgeEmail--title">
            <ul class="d-flex list-unstyled align-items-center mh-45 mb-2">
                <li class="col col-auto me-4"><h2 class="ps-1">Communications</h2></li>
                <li class="col col-sm-5 pAgeEmail__input">
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
            <div class="bg-mid-trans tblWrap f85 mb-3 pb-3" v-sheight>
                <table class="tbl tblEmail--Wrap communications table wp">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Document #</th>
                            <th>Date / Time in</th>                
                            <th>Agency, Sender</th>
                            <th>Subject - Venue</th>      
                            <th>Type - Classification</th>  
                                               
                            <th class="text-end">
                                <template v-if="communicationMeta.last_page > 1">                     
                                    <Pagination @show-Page="showPage" :meta="metaString" :prev="hasPrev" :next="hasNext"/>                                    
                                </template>                                
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        <template v-if="communications.length > 0">
                            <template v-for="communication in communications" :key="communication.id">
                                
                                <tr @click="show(communication.id)"  :class="communication.unreadcount < 1 ? '' : 'unread'">
                                    <td>
                                        <span class="pin--comm" 
                                        :class="communication.communicationstatus.pinned_at ? 'pinned': ''"
                                        @click.stop @click.prevent="pin(communication.id)" 
                                        title="Keep this communication at the top">
                                            <i class="fa-solid fa-thumbtack"></i>
                                        </span>
                                    </td>
                                    <td>
                                        <span class="sp_documentnumber">{{communication.documentnumber}}</span>
                                        <span class="totalactionstaken" title="Total Actions Taken" v-if="communication.totalactionstaken > 0">
                                            ({{communication.totalactionstaken}})
                                        </span>     
                                    </td>
                                    <td><span class="sp_datein">{{moment(new Date(communication.datetimein)).format('MMMM D, Y hh:mm A')}}</span></td>
                                    <td><span class="sp_agency">{{communication.agency}}, {{communication.sender}}</span></td>
                                    <td>
                                        <template v-if="communication.subject">
                                            <span class="sp__suject" >{{communication.subject}}</span> 
                                        </template>
                                        <template v-else>
                                            <span class="sp__suject">(No Subject)</span>
                                        </template>
                                        <template v-if="communication.venue">
                                            <span class="sp__subjectUB"> - {{communication.venue}}</span>
                                        </template>
                                    </td>
                                    <td>
                                        <template v-if="communication.documenttype">
                                            {{communication.documenttype.name}}
                                        </template>
                                        <template v-if="communication.classification">
                                            - {{communication.classification.name}}
                                        </template>                                        
                                    </td>                                
                                    
                                    <td class="text-end" title="Date / Time Sent"><span>{{formatmaildate(communication.updated_at)}}</span></td>
                                </tr>
                            </template>
                              <!-- {{communicationLinks}} -->

                        </template>
                        <template v-else>
                            <template v-if="!noData">
                                <tr class="pr nodata">
                                    <td colspan="7">
                                        <LoadingComponent/>
                                    </td>
                                </tr>
                            </template>
                        </template>
                        <template v-if="noData">
                            <tr class="nodata">
                                <td colspan="7" class="text-center"> Communications Empty</td>
                            </tr>
                        </template>
                    </tbody>
                </table>  

            </div>
        </div>
    </div>
</template>
<script>
    import useCommunications from '@/composables/composables-communications';
    import {onMounted ,ref, computed, inject, reactive,defineAsyncComponent, watch} from 'vue';
    import { sortBy} from 'lodash';
    import {useRouter} from 'vue-router'
    import moment from 'moment'
 
    import {formatmaildate} from '@/helper/formatmaildate';

    
    import {useCommunicationStore} from "@/stores/communicationstore.js"
    import {useNotificationStore} from '@/stores/notificationstore.js';
    import { useHead } from '@unhead/vue'


    const Tooltip = defineAsyncComponent(() => 
        import('@/components/cm/reusables/Tooltip.vue')
    );
    const LoadingComponent = defineAsyncComponent(() => 
        import('@/components/loader/LoadingComponent.vue')
    );
    const Pagination = defineAsyncComponent(() => 
        import('@/components/cm/reusables/Pagination.vue')
    );

    export default{
        components: {
            Pagination,
            Tooltip,
            LoadingComponent            
        },
        setup(){
            useHead({
                title: 'Communications Inbox | '+import.meta.env.VITE_BFAR_AGENCY
            })
            const {communications, getCommunications,getCommunication, communicationLinks,  communicationMeta, pincommunication, bulkactions} = useCommunications()

            const swal = inject('$swal')
            const details = ref();

            const communicationstore = useCommunicationStore();
            const notificationstore = useNotificationStore();


            const searchQuery = reactive({
                'search': ''
            });
            const totals = ref();
            const formData = reactive({
                'selectedCommunication': [],
                'current_page': '',
                'selectedaction': '' 
            });



            const sH = ref(window.innerHeight - 178);
            const sW = ref(window.innerWidth);




            const metaString = ref('');
            const hasPrev = ref(false);
            const hasNext = ref(false);
            const router = useRouter()
            


            const noData = ref(false)



            const loadData = (cf) =>{
                getCommunications(cf).then(() =>{
                    metaString.value = communicationMeta.value.current_page+' of '+communicationMeta.value.last_page;
                    if(communicationLinks.value.next){
                        hasNext.value = true;
                    }
                    if(communicationLinks.value.prev){
                        hasPrev.value = true;
                    }

                    if(communications.value.length > 0){
                        noData.value = false;
                    }else{
                        noData.value = true;
                    }                    
                })
            }

            notificationstore.$subscribe((m,s) => {
                if(notificationstore.getnrc.__nc > 0){
                    loadData() 
                }

            })



            onMounted(() =>{
                
                loadData();


                

            })


           const show = (id) => {
                communicationstore.setinitialcomm(1);
                router.push({name: 'communications.show', params: { id: id}});
            }

            const allcheckedcommunication = ref(false);



            const searchData = async() => {            

                if(searchQuery.search){
                    if(searchQuery.search.trim().length !== 0){
                        const tosearch = searchQuery.search.replace(/\s/g, "+");
                        router.push({name: 'communications.search', params: { content: tosearch}});
                    }
                }
                              
            }

            const showPage = (n) => {
                if(n == 1){
                    const id = communicationLinks.value.next.match(/([^\/]*)\/*$/)[1].split('=');
                    router.push({name: 'communications.page', params: { id: id[id.length-1] }});
                }else{
                    const id = communicationLinks.value.prev.match(/([^\/]*)\/*$/)[1].split('=');
                    router.push({name: 'communications.page', params: { id: id[id.length-1] }});
                }
            }
            const clearStorage = () =>{
                sessionStorage.clear();
            }
        
            const pin = async(id) => {
                const cf = {
                    headers: {
                        'xlr': 1
                    }
                }

                await pincommunication(id);
                await loadData(cf);
            }


           return {
                communications,
                formatmaildate,
                moment,
                searchQuery,
                show,
                allcheckedcommunication,
                formData,
                communicationLinks,
                communicationMeta,
                metaString,
                showPage,
                searchData,
                hasPrev,
                hasNext,
                noData,
                details,
                sH,
                pin
           }
        }
    }
</script>
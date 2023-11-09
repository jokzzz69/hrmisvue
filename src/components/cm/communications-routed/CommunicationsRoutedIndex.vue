<template>
    <div class="row">
        <div class="col pAgeEmail--title">
            <ul class="d-flex list-unstyled align-items-center mh-45 mb-2">
                <li class="col col-auto me-4"><h2 class="ps-1">Routed</h2></li>
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
                <table class="tbl tblEmail--Wrap routed table">
                    <thead>

                        <tr>
                            <th></th>
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
                            <template v-for="routedcommunication in communications" :key="routedcommunication.id">
                                <tr @click="show(routedcommunication.id)"  :class="routedcommunication.unreadcount < 1 ? '' : 'unread'">
                                    <td @click.stop>
                                        <span class="pin--comm"
                                        :class="routedcommunication.pinned_at ? 'pinned': ''"
                                        @click.stop @click.prevent="pin(routedcommunication.id)"                              
                                        title="Keep this communication at the top">
                                            <i class="fa-solid fa-thumbtack"></i>
                                        </span>
                                    </td>
                                    
                                    <td class="sp_to">              
                                        <span class="text-sent">TO: </span>
                                        <template v-if="routedcommunication.receivers">
                                            <span @mouseover="routeddetails = routedcommunication.id" @mouseleave="routeddetails = null">
                                                <template v-if="routedcommunication.receivers.length > 1">
                                                    {{routedcommunication.receivers.length}} People
                                                </template>
                                                <template v-else>
                                                    {{routedcommunication.receivers[0].formattedName}}
                                                </template>
                                            </span>
                                        </template>
                                        <template v-if="routedcommunication.id == routeddetails">
                                            <TooltipArr :arr="routedcommunication.receivers" :msg="'TO'"/>
                                        </template> 
                                        <span class="totalactionstaken" title="Total Actions Taken" v-if="routedcommunication.totalactionstaken > 0">
                                            ({{routedcommunication.totalactionstaken}})
                                        </span>                                       
                                    </td>
                                    <td><span class="sp_documentnumber">{{routedcommunication.documentnumber}}</span></td>
                                    <td><span class="sp_datein">{{moment(routedcommunication.datetimein).format('MMMM D, Y hh:mm A')}}</span></td>
                                    <td><span class="sp_agency">{{routedcommunication.agency}}, {{routedcommunication.sender}}</span></td>
                                    <td>
                                        <template v-if="routedcommunication.subject">
                                            <span class="sp__suject" >{{routedcommunication.subject}}</span> 
                                        </template>
                                        <template v-else>
                                            <span class="sp__suject">(No Subject)</span>
                                        </template>
                                        <template v-if="routedcommunication.venue">
                                            <span class="sp__subjectUB"> - {{routedcommunication.venue}}</span>
                                        </template>
                                    </td>
                                    <td>
                                        <template v-if="routedcommunication.documenttype">
                                            {{routedcommunication.documenttype.name}}
                                        </template>
                                        <template v-if="routedcommunication.classification">
                                            - {{routedcommunication.classification.name}}
                                        </template>                                        
                                    </td>                                
                                    
                                    <td class="text-end" title="Date / Time Sent">
                                        <template v-if="routedcommunication.sent">
                                            <span>{{formatmaildate(routedcommunication.sent.sent_at)}}</span>
                                        </template>                                      
                                    </td>
                                </tr>
                            </template>
                              <!-- {{communicationLinks}} -->

                        </template>
                        <template v-else>
                            <template v-if="!noData">
                                <tr class="pr nodata">
                                    <td colspan="8">
                                        <LoadingComponent/>
                                    </td>
                                </tr>
                            </template>
                        </template>
                        <template v-if="noData">                                
                            <tr class="nodata">
                                <td colspan="8"> No Sent Communications</td>
                            </tr>
                        </template>
                    </tbody>
                </table>  

            </div>
        </div>
    </div>
</template>
<script>
    import useCommunicationsRouted from '@/composables/composables-communicationsrouted';

    import {onMounted ,ref, computed, inject, reactive, watch} from 'vue';
    import { sortBy} from 'lodash';
    import {useRouter} from 'vue-router'
    import moment from 'moment'
    import Pagination from '@/components/cm/reusables/Pagination.vue';
    import {formatmaildate} from '@/helper/formatmaildate';
    import LoadingComponent from '@/components/loader/LoadingComponent.vue';
    import TooltipArr from "@/components/cm/reusables/TooltipArr.vue";
    import {useRoutedStore} from "@/stores/routedstore.js"
    import useEventsBus from '@/components/helper/Eventbus';
    import {useNotificationStore} from '@/stores/notificationstore.js'
 

    export default{
        components: {
            Pagination,
            TooltipArr,
            LoadingComponent
        },
        setup(){
            const {communications, getCommunicationsRouted, communicationLinks,  communicationMeta, pinrouted} = useCommunicationsRouted()

            const routedstore = useRoutedStore();
            const notificationstore = useNotificationStore();
   

            const {bus}=useEventsBus()
            const swal = inject('$swal')
            const routeddetails = ref();
            const searchQuery = reactive({
                'search': ''
            });

            const formData = reactive({
                'selectedArchive': [],
                'current_page': '',
                'selectedaction': '' 
            });


            const metaString = ref('');
            const hasPrev = ref(false);
            const hasNext = ref(false);
            const router = useRouter()
            
            const totals = ref();

            const noData = ref(false)

            const loadData = (cf) => {
                getCommunicationsRouted(cf).then(() =>{
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
            onMounted(() =>{
                loadData();                
            })



            notificationstore.$subscribe((m,s) => {
                if(notificationstore.getnrc.__rc > 0){
                    loadData();
                }
            })




           const show = (id) => {
                routedstore.setinitialrouted(1);
                router.push({name: 'communications-routed.show', params: { id: id}});
            }




            const searchData = async() => {
                if(searchQuery.search){
                    if(searchQuery.search.trim().length !== 0){
                        const tosearch = searchQuery.search.replace(/\s/g, "+");
                        router.push({name: 'communications-routed.search', params: { content: tosearch}});
                    }
                }
            }

            const showPage = (n) => {
                if(n == 1){
                    const id = communicationLinks.value.next.match(/([^\/]*)\/*$/)[1].split('=');
                    router.push({name: 'communications-routedpage.show', params: { id: id[id.length-1] }});
                }else{
                    const id = communicationLinks.value.prev.match(/([^\/]*)\/*$/)[1].split('=');
                    router.push({name: 'communications-routedpage.show', params: { id: id[id.length-1] }});
                }
            }

            
            const pin = async(id) => {
                const cf = {
                    headers: {
                        'xlr': 1
                    }
                }
                await pinrouted(id);
                await loadData(cf);
            }

           return {
                communications,
                formatmaildate,
                moment,
                searchQuery,
                show,
                formData,
                communicationLinks,
                communicationMeta,
                metaString,
                showPage,
                searchData,
                hasPrev,
                hasNext,
                noData,
                routeddetails,
                pin
           }
        }
    }
</script>
<template>
    <div class="row">
        <div class="col pAgeEmail--title">
            <ul class="d-flex list-unstyled align-items-center mh-45 mb-2">
                <li class="col col-auto me-4"><h2 class="ps-1">Routed</h2></li>
                <li class="col col-sm-5 pAgeEmail__input">
                    <div class="input-group">
                      <div class="input-group-text"><i class="fa-solid fa-magnifying-glass"></i></div>
                      <input type="text" class="form-control" placeholder="Search" v-model="searchQuery.search" @keypress.enter="searchData" />
                    </div>
                </li>
            </ul>
        </div>
    </div>
    <div class="row">
        <div class="col-sm-12 fs-5">     
            <div class="min-vh-75 bg-mid-trans tblWrap f85 mb-3 pb-3">
                <table class="tbl tblEmail--Wrap routed table">
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
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
                                <tr @click="show(routedcommunication.id)">
                                    <td @click.stop>
                                      
                                        <span class="pin--comm"
                                        :class="routedcommunication.pinned_at ? 'pinned': ''"
                                        @click.stop @click.prevent="pin(routedcommunication.id)"                              
                                        title="Keep this communication at the top">
                                            <i class="fa-solid fa-thumbtack"></i>
                                        </span>
                       
                                    </td>

                                    <td>              
                                        <span class="text-sent">TO: </span>
                                        <template v-if="routedcommunication.receivers">
                                            <span @mouseover="routeddetails = routedcommunication.id" @mouseleave="routeddetails = null">
                                                <template v-if="routedcommunication.receivers.length > 1">
                                                    {{routedcommunication.receivers.length}} People
                                                </template>
                                                <template v-else>
                                                    {{routedcommunication.receivers[0].formattedName}}
                                                </template>
                                            </span>f
                                        </template>
                                        <template v-if="routedcommunication.id == routeddetails">
                                            <TooltipArr :arr="routedcommunication.receivers" :msg="'TO'"/>
                                        </template>
                                        <span class="totalactionstaken" title="Total Actions Taken" v-if="routedcommunication.totalactionstaken > 0">
                                            ({{routedcommunication.totalactionstaken}})
                                        </span>                                    
                                    </td>
                                    <td>{{moment(routedcommunication.datetimein).format('MMMM D, Y hh:mm A')}}</td>
                                    <td><span class="sp_agency">{{routedcommunication.agency}}, {{routedcommunication.sender}}</span></td>
                                    <td>
                                        <template v-if="routedcommunication.subject">
                                            <span class="sp__suject">{{routedcommunication.subject}}</span> 
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
                                    
                                    <td class="text-end"  title="Date / Time Sent"><span>{{formatmaildate(routedcommunication.updated_at)}}</span></td>
                                </tr>
                            </template>
                              <!-- {{communicationLinks}} -->

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
                                <td colspan="6"> No Sent Communications</td>
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
    import {onMounted ,ref, computed, inject, reactive} from 'vue';
    import { sortBy} from 'lodash';
    import {useRouter} from 'vue-router'
    import moment from 'moment'
    import Pagination from '@/components/cm/reusables/Pagination.vue';
    import {formatmaildate} from '@/helper/formatmaildate'
    import TooltipArr from "@/components/cm/reusables/TooltipArr.vue";
    import LoadingComponent from '@/components/loader/LoadingComponent.vue';
    export default{
        props: {
            id: {
                required: true,
                type: String
            }
        },
        components: {
            Pagination,
            TooltipArr,
            LoadingComponent
        },
        setup(props){
            const {communications, getCommunicationsRouted, communicationLinks, setPageRouted, communicationMeta, pinrouted} = useCommunicationsRouted()
            const swal = inject('$swal')
            const routeddetails = ref();
            const searchQuery = reactive({
                'search': ''
            });



            const noData = ref(false)
            const router = useRouter()

            const metaString = ref('');
            const hasPrev = ref(false);
            const hasNext = ref(false);


            const reloadRouted = async(id,cf) =>{
                setPageRouted(id,cf).then(() =>{
                    metaString.value = communicationMeta.value.current_page+' of '+communicationMeta.value.last_page;

                    if(communicationLinks.value.next){
                        hasNext.value = true;
                    }
                    if(communicationLinks.value.prev){
                        hasPrev.value = true;
                    }
                });
            }
            onMounted(() =>{

                reloadRouted(props.id)

            })


            const searchData = async() => {
                if(searchQuery.search){
                    if(searchQuery.search.trim().length !== 0){
                        const tosearch = searchQuery.search.replace(/\s/g, "+");
                        router.push({name: 'communications-routed.search', params: { content: tosearch}});
                    }
                }

            }

           const show = (id) => {
                router.push({name: 'communications-routed.show', params: { id: id }});
            }



            const showPage = (n) => {

                let id = null;
                if(n == 1){
                    id = communicationLinks.value.next.match(/([^\/]*)\/*$/)[1].split('=');
                    
                    router.push({name: 'communications-routedpage.show', params: { id: id[id.length-1] }});
                }else{
                    id = communicationLinks.value.prev.match(/([^\/]*)\/*$/)[1].split('=');

                    if(id[id.length-1] == 1){
                        router.push({name: 'communications-routed.index'});
                    }else{
                        router.push({name: 'communications-routedpage.show', params: { id: id[id.length-1] }});
                    }                    
                }

                reloadRouted(id[id.length-1]);
            }

            const pin = async(id) => {
                const cf = {
                    headers: {
                        'xlr': 1
                    }
                }
                await pinrouted(id);
                await reloadRouted(props.id, cf);
            }
           return {
                communications,
                moment,
                searchQuery,
                show,
                communicationLinks,
                communicationMeta,
                showPage,
                metaString,
                hasPrev,
                hasNext,
                searchData,
                noData,
                formatmaildate,
                routeddetails,
                pin
           }
        }
    }
</script>
<template>
    <div class="row">
        <div class="col pAgeEmail--title">
            <ul class="d-flex list-unstyled align-items-center mh-45 mb-2">
                <li class="col col-auto me-4"><h2 class="ps-1">Routed</h2></li>
                <li class="col col-sm-5 pAgeEmail__input">
                    <div class="input-group">
                      <div class="input-group-text"><i class="fa-solid fa-magnifying-glass"></i></div>
                      <input type="text" class="form-control" placeholder="Search" v-model="searchQuery.search" @keypress.enter="searchData">
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
                            <th>Document #</th>
                            <th>Date / Time in</th>                
                            <th>Agency, Sender</th>
                            <th>Subject - Venue</th>      
                            <th>Type - Classification</th>                   
                            <th></th>
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
                                            <span @mouseover="sentdetails = routedcommunication.id" @mouseleave="sentdetails = null">
                                                <template v-if="routedcommunication.receivers.length > 1">
                                                    {{routedcommunication.receivers.length}} People
                                                </template>
                                                <template v-else>
                                                    {{routedcommunication.receivers[0].formattedName}}
                                                </template>
                                            </span>
                                        </template>
                                        <template v-if="routedcommunication.id == sentdetails">
                                            <TooltipArr :arr="routedcommunication.receivers" :msg="'TO'"/>
                                        </template>  
                                        <span class="totalactionstaken" title="Total Actions Taken" v-if="routedcommunication.totalactionstaken > 0">
                                            ({{routedcommunication.totalactionstaken}})
                                        </span>                                      
                                    </td>
                                    <td>{{routedcommunication.documentnumber}}</td>
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
                                    
                                    <td class="text-end"><span>{{formatmaildate(routedcommunication.updated_at)}}</span></td>
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
                                <td colspan="8"><span class="nodata">No Search Found</span></td>
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
    import {formatmaildate} from '@/helper/formatmaildate'
    import TooltipArr from "@/components/cm/reusables/TooltipArr.vue";
    import LoadingComponent from '@/components/loader/LoadingComponent.vue';
    import { useHead } from '@unhead/vue'

    export default{
        props: {
            content: {
                required: true,
                type: String
            }
        },
        components: {
            TooltipArr,
            LoadingComponent
        },
        setup(props){
            useHead({
                title: 'Communications Routed Search | '+import.meta.env.VITE_BFAR_AGENCY
            })
            const {communications, getCommunicationsRouted, communicationLinks,  communicationMeta,searchRouted,pinrouted} = useCommunicationsRouted()
            const swal = inject('$swal')
            const noData = ref(false)
            const sentdetails = ref();
            const searchQuery = reactive({
                'search': props.content.replaceAll("+"," ")
            });

            const router = useRouter()



    

            const searchLoad = async(data) => {
                searchRouted(data).then(res =>{
                    if(communications.value.length > 0){
                        noData.value = false;
                    }else{
                        noData.value = true;
                    }
                })
            }

            onMounted(() =>{
                
                searchLoad(props.content);
        
               
            })

           const show = (id) => {
                router.push({name: 'communications-routed.show', params: { id: id }});
            }







            const searchData = async() => {              
                if(searchQuery.search){
                    if(searchQuery.search.trim().length !== 0){
                        const tosearch = searchQuery.search.replace(/\s/g, "+");
                        router.push({name: 'communications-routed.search', params: { content: tosearch}});
                        searchLoad(tosearch);
                    }
                }
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
                searchData,
                sentdetails,
                formatmaildate,
                noData,
                pin
           }
        }
    }
</script>
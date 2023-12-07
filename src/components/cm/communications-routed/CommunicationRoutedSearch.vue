<template>
    <div class="row">
        <div class="col pAgeEmail--title">
            <ul class="d-flex list-unstyled align-items-center mh-45 mb-2">
                <li class="col col-auto me-4"><h2 class="ps-1">Routed</h2></li>
                <li class="col col-sm-5 pAgeEmail__input">
                    <SearchRouted/>
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
                                    <td>{{moment(new Date(routedcommunication.datetimein)).format('MMMM D, Y hh:mm A')}}</td>
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
    import {onMounted ,ref, computed, inject, reactive,defineAsyncComponent} from 'vue';
    import { sortBy} from 'lodash';
    import {useRouter, useRoute} from 'vue-router'
    import moment from 'moment'
    import {formatmaildate} from '@/helper/formatmaildate'

    import { useHead } from '@unhead/vue'


    const SearchRouted = defineAsyncComponent(() => 
        import('@/components/cm/reusables/SearchRouted.vue')
    );
    const LoadingComponent = defineAsyncComponent(() => 
        import('@/components/loader/LoadingComponent.vue')
    );
    const TooltipArr = defineAsyncComponent(() => 
        import('@/components/cm/reusables/TooltipArr.vue')
    );


    export default{
        components: {
            TooltipArr,
            LoadingComponent,
            SearchRouted
        },
        setup(){
            useHead({
                title: 'Communications Routed Search | '+import.meta.env.VITE_BFAR_AGENCY
            })
            const {communications, getCommunicationsRouted, communicationLinks,  communicationMeta,searchroutedfile,pinrouted} = useCommunicationsRouted()
            const swal = inject('$swal')
            const noData = ref(false)
            const sentdetails = ref();

            const router = useRouter()

            const route = useRoute();    

            const searchLoad = async(data) => {
                searchroutedfile(data).then(res =>{
                    if(communications.value.length > 0){
                        noData.value = false;
                    }else{
                        noData.value = true;
                    }
                })
            }

            onMounted(() =>{
                searchLoad(route.query);               
            })

            const show = (id) => {
                router.push({name: 'communications-routed.show', params: { id: id }});
            }
        
            const pin = async(id) => {
                const cf = {
                    headers: {
                        'xlr': 1
                    }
                }
                await pinrouted(id);
                await searchLoad(route.query, cf);
            }
            
           return {
                communications,

                moment,
                show,
                communicationLinks,
                communicationMeta,
                sentdetails,
                formatmaildate,
                noData,
                pin
           }
        }
    }
</script>
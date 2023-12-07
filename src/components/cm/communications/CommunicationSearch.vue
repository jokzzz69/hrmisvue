<template>
    <div class="row shts">
        <div class="col pAgeEmail--title">
            <ul class="pAgeEmail--title__wrap">
                <li class="pAgeEmail--title__content"><h2 class="ps-1">Communications</h2></li>
                <li class="pAgeEmail__input pAgeEmail--title__search">
                    <SearchCommunication/>                                       
                </li>
            </ul>
        </div>
    </div>
    <div class="row">
        <div class="col-sm-12 fs-5">     
            <div class="min-vh-75 bg-mid-trans tblWrap f85 mb-3 pb-3">
                <table class="tbl tblEmail--Wrap communications table wp">
                    <thead>
                        <tr>
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
                            <template v-for="communication in communications" :key="communication.id">
                                
                                <tr @click="show(communication.id)"  :class="communication.communicationstatus.read_at ? '' : 'unread'">
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
                                <td colspan="7" class="text-center"> No Results Found</td>
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
    import {onMounted ,ref, computed, inject, reactive,defineAsyncComponent} from 'vue';
    import { sortBy} from 'lodash';
    import {useRouter, useRoute} from 'vue-router'
    import moment from 'moment'
    import {formatmaildate} from '@/helper/formatmaildate'

    import { useHead } from '@unhead/vue'

    const TooltipArr = defineAsyncComponent(() => 
        import('@/components/cm/reusables/TooltipArr.vue')
    );
    const LoadingComponent = defineAsyncComponent(() => 
        import('@/components/loader/LoadingComponent.vue')
    );
    const SearchCommunication = defineAsyncComponent(() => 
        import('@/components/cm/reusables/SearchCommunications.vue')
    );
    export default{
        components: {
            TooltipArr,
            LoadingComponent,
            SearchCommunication
        },
        setup(){

            useHead({
                title: 'Communications Inbox Search | '+import.meta.env.VITE_BFAR_AGENCY
            })
            const {communications, getCommunications, communicationLinks,  communicationMeta,search, bulkactions, pincommunication} = useCommunications()
            const swal = inject('$swal')
            const noData = ref(false)
            const details = ref();

            const router = useRouter()
            const route = useRoute();

            const formData = reactive({
                'selectedCommunication': [],
                'selectedaction': ''
            });

    

            const reloadSearch = (cnt) => {

                search(cnt).then(res =>{
                    if(communications.value.length > 0){
                        noData.value = false;
                    }else{
                        noData.value = true;
                    }
                })
            }

            onMounted(() =>{
                reloadSearch(route.query);
            })

           const show = (id) => {
                router.push({name: 'communications.show', params: { id: id }});
            }

            const pin = async(id) => {
                const config = {
                    headers: {
                        'xlr': 1
                    }
                }
                await pincommunication(id);
                await reloadSearch(route.query, config);
            }
           return {
                communications,
                moment,
                show,
                communicationLinks,
                communicationMeta,
                formData,
                details,
                formatmaildate,
                noData,
                pin
           }
        }
    }
</script>
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
                <table class="tbl tblEmail--Wrap communications table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Document #</th>   
                            <th>Date / Time in</th>                
                            <th>Agency, Sender</th>
                            <th>Subject - Venue</th>      
                            <th>Type - Classification</th>
                                                      
                            <th class="text-end" colspan="2">
                                <template v-if="communicationMeta.last_page > 1">                     
                                    <Pagination @show-Page="showPage" :meta="metaString" :prev="hasPrev" :next="hasNext"/>                                    
                                </template>                                
                            </th>
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


    import {onMounted ,ref, computed, inject, reactive, watch,defineAsyncComponent} from 'vue';
    import { sortBy} from 'lodash';
    import {useRouter} from 'vue-router'
    import moment from 'moment'
    
    import {formatmaildate} from '@/helper/formatmaildate';

    import { useHead } from '@unhead/vue'
    const SearchCommunication = defineAsyncComponent(() => 
        import('@/components/cm/reusables/SearchCommunications.vue')
    );

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
        props: {
            id: {
                required: true,
                type: String
            }
        },
        components: {
            Pagination,
            Tooltip,
            LoadingComponent,
            SearchCommunication
        },
        setup(props){
            useHead({
                title: 'Communications Inbox Page | '+import.meta.env.VITE_BFAR_AGENCY
            })
            const {communications, getCommunications, communicationLinks,  communicationMeta, bulkactions, setPage,pincommunication } = useCommunications()

            


            const swal = inject('$swal')
            const details = ref();


            const formData = reactive({
                'selectedCommunication': [],
                'current_page': '' ,
                'selectedaction': ''
            });


            const metaString = ref('');
            const hasPrev = ref(false);
            const hasNext = ref(false);
            const router = useRouter()
            
            const withChecked = ref(false);

            const noData = ref(false)

            const reloadPage = async(id,cf) =>{
                setPage(id,cf).then(() =>{
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
                reloadPage(props.id);                    

            })   


           const show = (id) => {
                router.push({name: 'communications.show', params: { id: id }});
            }

    


            const showPage = (n) => {
                let id = null;
                if(n == 1){
                    id = communicationLinks.value.next.match(/([^\/]*)\/*$/)[1].split('=');
                    router.push({name: 'communications.page', params: { id: id[id.length-1] }});
                }else{
                    id = communicationLinks.value.prev.match(/([^\/]*)\/*$/)[1].split('=');
                    if(id[id.length-1] == 1){
                        router.push({name: 'communications.index'});
                    }else{
                        router.push({name: 'communications.page', params: { id: id[id.length-1] }});
                    }                    
                }
                reloadPage(id[id.length-1]);
            }


            const pin = async(id) => {
                const cf = {
                    headers: {
                        'xlr': 1
                    }
                }
                await pincommunication(id);
                await reloadPage(props.id,cf);
            }
           return {
                communications,
                formatmaildate,
                moment,
                show,

                formData,
                communicationLinks,
                communicationMeta,
                metaString,
                showPage,
                hasPrev,
                hasNext,
                noData,
                details,
                pin
           }
        }
    }
</script>
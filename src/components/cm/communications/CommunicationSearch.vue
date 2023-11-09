<template>
    <div class="row">
        <div class="col pAgeEmail--title">
            <ul class="d-flex list-unstyled align-items-center mh-45 mb-2">
                <li class="col col-auto me-4"><h2 class="ps-1">Communications</h2></li>
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
                                    <td><span class="sp_datein">{{moment(communication.datetimein).format('MMMM D, Y hh:mm A')}}</span></td>
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
                                    <td colspan="6">
                                        <LoadingComponent/>
                                    </td>
                                </tr>
                            </template>
                        </template>
                        <template v-if="noData">
                            <tr class="nodata">
                                <td colspan="6 text-center"> No Results Found</td>
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
    import {onMounted ,ref, computed, inject, reactive} from 'vue';
    import { sortBy} from 'lodash';
    import {useRouter} from 'vue-router'
    import moment from 'moment'
    import {formatmaildate} from '@/helper/formatmaildate'
    import TooltipArr from "@/components/reusables/TooltipArr.vue";
    import LoadingComponent from '@/components/loader/LoadingComponent.vue';

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
            const {communications, getCommunications, communicationLinks,  communicationMeta,search, bulkactions, pincommunication} = useCommunications()
            const swal = inject('$swal')
            const noData = ref(false)
            const details = ref();
            const searchQuery = reactive({
                'search': props.content.replaceAll("+"," ")
            });

            const router = useRouter()

            const formData = reactive({
                'selectedCommunication': [],
                'selectedaction': ''
            });

    

            const reloadSearch = (cnt,config) => {
                search(cnt,config).then(res =>{
                    if(communications.value.length > 0){
                        noData.value = false;
                    }else{
                        noData.value = true;
                    }
                })
            }

            onMounted(() =>{

                reloadSearch(props.content);
            })

           const show = (id) => {
                router.push({name: 'communications.show', params: { id: id }});
            }





            const searchData = async() => {
                if(searchQuery.search){
                    if(searchQuery.search.trim().length !== 0){
                        const tosearch = searchQuery.search.replace(/\s/g, "+");
                        router.push({name: 'communications.search', params: { content: tosearch}});
                        reloadSearch(searchQuery.search);
                    }

                }else{
                    router.push({name: 'communications.index'});
                }
            }
            const pin = async(id) => {
                const config = {
                    headers: {
                        'xlr': 1
                    }
                }
                await pincommunication(id);
                await reloadSearch(props.content, config);
            }
           return {
                communications,

                moment,
                searchQuery,
                show,
                communicationLinks,
                communicationMeta,
                searchData,
                formData,
                details,
                formatmaildate,
                noData,
                pin
           }
        }
    }
</script>
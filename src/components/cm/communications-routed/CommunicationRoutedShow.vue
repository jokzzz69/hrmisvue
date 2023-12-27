<template>
    <template v-if="hld">
        <LoadingComponentDiv/>
    </template>   
    <div class="row">
        <div class="col-auto pAgeEmail--title n--cOmm">
            <ul class="d-flex list-unstyled align-items-center mb-1">
                <li class="col col-auto">
                    <h2 class="ps-1 m-0 hTitle">Routed: </h2>
                </li>
            </ul>
            <div class="btn--backWrap mb-1">
                <template v-if="isClick == '1'">
                    <button title="Return Back / Cancel" class="btn btn__back"  @click.prevent="$router.go(-1)"><i class="fa-solid fa-arrow-left"></i></button>
                </template>
                <template v-else>
                    <button title="Return Back / Cancel" class="btn btn__back"  @click.prevent="toindex"><i class="fa-solid fa-arrow-left"></i></button>
                </template>
            </div>
        </div>
        <div class="col pAgeEmail--title--sub n--cOmm">
            <h2 class="mb-0">
                <template v-if="communication.subject">
                    {{communication.subject}}
                </template>
                <template v-if="noSubject">
                    No Subject
                </template>
            </h2>
            <h4>
                <template v-if="communication.sender">{{communication.sender}}, </template> 
                <template v-if="communication.agency">{{communication.agency}}</template>
            </h4>
        </div>

    </div> 
    <div class="bg-light  pb-3 pt-3 px-3 card content__card__wrap" v-sheight="290" id="ccw">
        <div class="row">
            <div class="col communication--sent--date">
                <span>
                    <span>Date Sent: <strong>{{dateSent}}</strong></span>
                </span>
            </div>
        </div>
        <div class="cardwrap pt-2 pb-1">
            <div class="col mb-2 col-sm-3">
                <div class="form-floating fflabel">
                    <span class="form-control">{{communication.documentnumber}}</span>
                    <span class="sp-label">Document Number:</span>
                </div>
            </div>
            <div class="col mb-2 col-sm-3">
                <div class="form-floating fflabel">
                    <span class="form-control">{{moment(new Date(communication.datetimein)).format('LLLL')}}</span>
                    <span class="sp-label">Date Time In:</span>
                </div>
            </div>
            <div class="col mb-2 col-sm-3">
                <div class="form-floating fflabel">
                    <span class="form-control">
                        <template v-if="communication.documenttype">
                            {{communication.documenttype.name}}
                        </template>                        
                    </span>
                    <span class="sp-label">Document Type</span>
                </div> 
            </div>
            <div class="col mb-2 col-sm-3">
                <div class="form-floating fflabel">
                    <span class="form-control">
                        <template v-if="communication.classification">
                            {{communication.classification.name}}
                        </template>                        
                    </span>
                    <span class="sp-label">Classification</span>
                </div> 
            </div>
            <template v-if="communication.withinclusivedates > 0">
                <div class="col mb-2" :class="communication.withinclusivedates > 0  ? 'col-sm-6': 'col-12'" v-if="communication.documenttype_id == 5 || communication.documenttype_id == 8 || communication.documenttype_id == 15">
                <div class="form-floating fflabel">
                    <span class="form-control">
                        <template v-if="communication.withinclusivedates > 0">
                            <template v-if="communication.inclusivedatestart == communication.inclusivedateend">
                                <strong>{{moment(new Date(communication.inclusivedatestart)).format('MMMM D, YYYY')}} </strong>
                            </template>
                            <template v-else>
                                <strong>{{moment(new Date(communication.inclusivedatestart)).format('MMMM D, YYYY')}}</strong> to <strong>{{moment(new Date(communication.inclusivedateend)).format('MMMM D, YYYY')}}</strong>
                            </template>                                       
                        
                        </template>                        
                    </span>
                    <span class="sp-label">Inclusive Dates</span>
                </div> 
            </div>
            </template>
            <template v-if="communication.venue">
                <div class="col mb-2" v-if="communication.venue" :class="communication.withinclusivedates > 0 ? 'col-sm-6' : 'col-sm-12'">
                <div class="form-floating fflabel">
                    <span class="form-control">
                        <template v-if="communication.venue">
                            {{communication.venue}}
                        </template>                        
                    </span>
                    <span class="sp-label">Venue</span>
                </div> 
            </div> 
            </template>
            
        </div>

        <div class="row">
            <div class="col">
                <div class="checkBoxcgDisp p-2 mt-2 border showOnlyChk" :class="errors.sendto ? 'br-error' : ''">
                    <div class="card--title"><strong>Recipients:</strong></div>
                    <div class="row">
                        <div class="col col-sm-12">                   
                            <div class="checkboxCG p-2" :class="errors.sendto ? 'br-error' : ''">                                           
                                <SubCheckUnitHeads :isDisplayed="true"/>         
                                <div class="unitgroups">
                                    <SubCheckUnits :isDisplayed="true"/>
                                </div>
                            </div>               
                        </div>           
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="cardwrap pt-2 pb-1 mt-2">
                    <div class="col">
                        <div class="card--title"><strong>Note:</strong></div>
                        <div class="fflabel">
                            <div class="inner-div nb">
                                <template v-if="communication.notes">

                                    <template v-for="note in communication.notes">
                                        <template v-if="note.id != 8 && note.id != 15">
                                            <span class="badge badgeRed me-1 mb-2">{{note.name}}</span>
                                        </template>
                                    </template>

                                    <template v-if="communication.noteHasPhotocopy > 0">
                                        <span class="badgeRed badge">{{photocopy.title}} - {{photocopy.value}}</span>
                                    </template>
                                    
                                    <template v-if="communication.returnforward.length > 0">
                                        <div class="rForward">
                                            <span class="sprForwardTitle"><strong>Return / Forward</strong></span>
                          
                                            <div class="sprForwardPerson">
                                                <template v-for="(x,y) in communication.returnforward">
                                                  {{x.formattedName}}<template v-if="y != communication.returnforward.length-1">, </template>
                                                </template>
                                            </div>
               
                                        </div>
                                    </template>
                                </template>
                            </div>
                          
                        </div>
                    </div>
                    
                </div>
            </div>
            <div class="col">
                <div class="cardwrap pt-2 pb-1 mt-2">
                    <div class="col">
                        <div class="card--title"><strong>Actions:</strong></div>
                        <div class="fflabel">
                            <div class="inner-div nb">
                                <template v-if="communication.actions">
                                    <template v-for="action in communication.actions">
                                        <span class="badge badgeGreen me-1 mb-2">{{action.name}}</span>
                                    </template>
                                </template>                          
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="cardwrap pt-2 pb-1 mt-2">
                    <div class="col-12 mb-2">
                        <strong>Remarks:</strong>
                    </div>                    
                    <div class="col mb-2">  
                        <template v-if="communication.remarks">
                            <div class="text-danger" v-html="communication.remarks"></div>
                        </template>
                        <template v-else>
                            No Remarks
                        </template>               
                    </div>
                </div>
            </div>
        </div>
        
        <template v-if="communication.attachments">
            <template v-if="communication.attachments.length > 0">
                <AttachmentPreview :files="communication.attachments"/>
            </template>
        </template>


        <template v-if="communication.id">            
            <CommunicationActionsTaken :id="communication.id"/>            
        </template>
        

        


        
        <div id="bt"></div>     
    </div>

    <template v-if="communication.id && showActionsBox">
        <div class="prC">
            <CommunicationAddActionTaken :id="communication.id"/>
        </div>
    </template>
    <div class="row" >
        <div class="col col-sm-12 btn--employeeActions" v-if="!showActionsBox">
            <ul class="list-inline">
                <li class="list-inline-item" >
                    <button class="btn" @click.prevent="btnActionsTaken"><i class="fa-solid fa-plus"></i> Add Actions Taken</button>
                </li>
                <li class="list-inline-item">
                    <button class="btn" @click.prevent="editRoutedCommunication"><i class="fa-solid fa-pen-to-square"></i> Edit and Resend</button>
                </li>
            </ul>
        </div>
   </div>
</template>

<script>
    import { reactive,inject, ref, onMounted,watch, defineAsyncComponent} from "vue";
    import useCommunicationsRouted from '@/composables/composables-communicationsrouted';

    import 'vue-select/dist/vue-select.css';
    import {useRouter} from 'vue-router'
    import moment from 'moment';
    
    import {useRoutedStore} from '@/stores/routedstore'
    import useNotifications from '@/composables/composables-notifications';
    import useEventsBus from '@/components/helper/Eventbus';

    import {useNotificationStore} from '@/stores/notificationstore.js'
    
    import { useHead } from '@unhead/vue'
    import {useRecipients} from '@/stores/recipients.js'


    const AttachmentPreview = defineAsyncComponent(() => 
        import('@/components/cm/reusables/AttachmentPreview.vue')
    );
    const CommunicationAddActionTaken = defineAsyncComponent(() => 
        import('@/components/cm/communications-employeeactions/CommunicationAddActionTaken.vue')
    );
    const CommunicationActionsTaken = defineAsyncComponent(() => 
        import('@/components/cm/communications-employeeactions/CommunicationActionsTaken.vue')
    );
    const LoadingComponentDiv = defineAsyncComponent(() => 
        import('@/components/loader/LoadingComponentDiv.vue')
    );
    const SubCheckUnits = defineAsyncComponent(() => 
        import('@/components/cm/reusables/SubCheckUnits.vue')
    );
    const SubCheckUnitHeads = defineAsyncComponent(() => 
        import('@/components/cm/reusables/SubCheckUnitHeads.vue')
    );


    export default {
        components: {
            AttachmentPreview,
            CommunicationAddActionTaken,
            CommunicationActionsTaken,
            SubCheckUnits,
            SubCheckUnitHeads,
            LoadingComponentDiv
        },
        props: {
            id: {
                required: true,
                type: String
            },


        },
        setup(props){
            useHead({
                title: 'Communication Routed | '+import.meta.env.VITE_BFAR_AGENCY
            })
            const swal = inject('$swal')
            const showActionsBox = ref(false);
            const {emit,bus}=useEventsBus()

            const {communication, getCommunicationRouted ,errors} = useCommunicationsRouted()
            const router = useRouter()
            const noSubject = ref(false);
            const {getUnread,totalunread} = useNotifications()
            const st_recipients = useRecipients();
            const hld = ref(true);

            const routedstore = useRoutedStore()
            const notificationstore = useNotificationStore()

            const isClick = ref(routedstore.getinitialrouted);


            const photocopy = reactive({
                'title': 'Photocopy',
                'value': '',

            });

            const communicationform = reactive({
                'sendto': [],
                'selectedunits': []
            });
            const dateSent = ref('');

            onMounted(() => {
                getCommunicationRouted(props.id).then(() =>{

                    if(communication.value.units.length > 0){
                        
                        communicationform.selectedunits = communication.value.units.map(i => parseInt(i['id']));
                    } 
                    if(communication.value.receiversunitheads.length > 0){

                        communicationform.sendto = communication.value.receiversunitheads.map(i => parseInt(i['id']));

                    }
                    if(communication.value.noteHasPhotocopy){
                        if(communication.value.noteCopies > 1){
                            photocopy.value = communication.value.noteCopies+' Copies';
                        }else{
                            photocopy.value = communication.value.noteCopies+' Copy';
                        }
                    }
                    if(communication.value.subject){
                        noSubject.value = false;
                    }else{
                        noSubject.value = true;
                    }
                    notificationstore.fetchNotification();

                    st_recipients.setselectedunitheads(communicationform.sendto);
                    st_recipients.setselectedunitgroups(communicationform.selectedunits);


                    hld.value = false;
                    checkSentDate(communication.value.updated_at);

                })
                


            })

 
            const checkSentDate = async(sdate) =>{
                var mdate = moment(sdate);
 
                if(moment.duration(moment(new Date()).diff(mdate,'days')) > 5){
                    dateSent.value =  mdate.format('llll');
                }else{
                    dateSent.value =  mdate.format('MMM D, h:mm A');
                }
            }
        
        

            const toindex = () => {
                router.push({name: 'communications-routed.index'})
            }

            const editRoutedCommunication = () =>{
            
                router.push({name: 'communications-routed.edit', params : {id : props.id}});
            }
            watch(()=>bus.value.get('actionbox'), (val) => {
                [showActionsBox.value] = val ?? [] 
            })

            const btnActionsTaken = () =>{
                showActionsBox.value = !showActionsBox.value;
                emit('cancelallat', 1);                
            }

           

            return{
                communication,
                communicationform,
                errors,
                photocopy,
                noSubject,
                props,
                moment,
                toindex,
                editRoutedCommunication,
                isClick,
                showActionsBox,
                btnActionsTaken,
                hld,
                dateSent
            }
        }
    }
</script>

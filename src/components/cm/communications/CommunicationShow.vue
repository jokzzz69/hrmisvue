<template> 
    <template v-if="hld">
        <LoadingComponentDiv/>
    </template>
    <div class="row">
        <div class="col-auto pAgeEmail--title">       
            <div class="btn--backWrap mb-1 mt-2">

                <template v-if="isClick == '1'">
                    <button title="Return Back / Cancel" class="btn btn__back" @click.prevent="$router.go(-1)"><i class="fa-solid fa-arrow-left"></i></button>
                </template>
                <template v-else>
                    <button title="Return Back / Cancel" class="btn btn__back" @click.prevent="toindex"><i class="fa-solid fa-arrow-left"></i></button>
                </template>
                
            </div>
        </div>
        <div class="col pAgeEmail--title--sub">
            <h2 class="mb-0">
                <template v-if="communication.subject">
                    {{communication.subject}}
                </template>
                <template v-if="noSubject">
                    No Subject
                </template>
            </h2>
            <h4 class="pAgeEmail__title__senderAgency">
                <template v-if="communication.sender">{{communication.sender}}, </template> 
                <template v-if="communication.agency">{{communication.agency}}</template>
            </h4>
        </div>
    </div> 


    <div class="w-100 plr pt-3 content__card__wrap bg-light" v-sheight="290" id="ccw">
        <div class="row">
            <div class="col communication--uploaded--by">
                Uploaded By: 
                <span>
                    <template v-if="communication.disseminator">
                        {{communication.disseminator.formattedName}}
                    </template>
                </span>
            </div>
            <div class="col communication--uploaded--date">
                <span>
                    <span>{{dateSent}}</span>
                </span>
            </div>
        </div>
        <div class="content__card--contents plr pt-2 pb-1">
            <div class="row">
                <div class="col col-sm-6 col-lg-4 mb-1">
                    <div class="form-floating fflabel">
                        <span class="form-control">{{communication.documentnumber}}</span>
                        <span class="sp-label">Document Number</span>
                    </div>
                </div>
                <div class="col col-sm-6 col-lg-4 mb-1">
                    <div class="form-floating fflabel">
                        <span class="form-control">{{moment(new Date(communication.datetimein)).format('LLLL')}}</span>
                        <span class="sp-label">Date Time In:</span>
                    </div>
                </div>
                <div class="col col-sm-6 col-lg-4 mb-1">
                    <div class="form-floating fflabel">
                        <span class="form-control">
                            <template v-if="communication.documenttype">
                                {{communication.documenttype.name}}
                            </template>                        
                        </span>
                        <span class="sp-label">Document Type</span>
                    </div> 
                </div>
                <div class="col mb-1">
                    <div class="form-floating fflabel">
                        <span class="form-control">
                            <template v-if="communication.classification">
                                {{communication.classification.name}}
                            </template>                        
                        </span>
                        <span class="sp-label">Classification</span>
                    </div> 
                </div>
                <div class="w-100"></div>

                <template v-if="communication.withinclusivedates > 0">
                    <div class="col mb-2"  v-if="communication.documenttype_id == 5 || communication.documenttype_id == 8 || communication.documenttype_id == 15">
                        <div class="form-floating fflabel" v-if="communication.withinclusivedates > 0">
                            <span class="form-control">
                                <template v-if="communication.inclusivedatestart == communication.inclusivedateend">
                                    <strong>{{moment(new Date(communication.inclusivedatestart)).format('MMMM D, YYYY')}} </strong>
                                </template>
                                <template v-else>
                                    <strong>{{moment(new Date(communication.inclusivedatestart)).format('MMMM D, YYYY')}}</strong> to <strong>{{moment(communication.inclusivedateend).format('MMMM D, YYYY')}}</strong>
                                </template>                     
                            </span>
                            <span class="sp-label">Inclusive Dates</span>
                        </div> 
                    </div>
                </template>            
                <div class="col mb-1" v-if="communication.venue">
                    <div class="form-floating fflabel">
                        <span class="form-control">
                            <template v-if="communication.venue">
                                {{communication.venue}}
                            </template>                        
                        </span>
                        <span class="sp-label">Venue</span>
                    </div> 
                </div> 
            </div>
        </div>

        <div class="accordion mt-1" id="accRecipients" v-if="stupdated">
            <div class="accordion-item">
                <h2 class="accordion-header" id="headingRecipients">
                  <button id="btnRecipients" class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseRecipients" aria-expanded="false" aria-controls="collapseRecipients" @click="showrecipient = !showrecipient">
                    <strong>Recipients</strong> 
                    
                        <template v-if="!showrecipient">
                            <span class="ms-1 ps-1 pt-1 me-2 border-bottom w-100">
                                <template v-for="(x,y) in communication.receivers">
                                    <span class="badge-recipients">{{x.formattedName}}</span><template v-if="y != communication.receivers.length -1">, </template>
                                </template>
                            </span> 
                        </template>                        
                                  
                  </button>
                </h2>
                <div id="collapseRecipients" class="accordion-collapse collapse showOnlyChk" aria-labelledby="headingRecipients" data-bs-parent="#accRecipients">
                  <div class="accordion-body">
                    <div class="row">
                        <div class="col col-sm-12">                   
                            <div class="checkboxCG p-2">                                           
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
        </div>   
        <div class="row">
            <div class="col col-sm-12 col-lg-6">
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
                                    
                                    <template v-if="communication.notes.length < 1">
                                        None
                                    </template>
                                </template>

                            </div>
                          
                        </div>
                    </div>
                    
                </div>
            </div>
            <div class="col col-sm-12 col-lg-6">
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
                    <div class="card--title">
                        <strong>Remarks:</strong>
                    </div>                    
                    <div class="fflabel">
                        <div class="nb">
                            <template v-if="communication.remarks"> 
                                <div class="remarks__content" v-html="communication.remarks"></div>
                            </template>
                            <template v-else>
                                No Remarks
                            </template>
                        </div>            
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
        

        

    </div>    
    <template v-if="communication.id && showActionsBox">
        <div class="prC">
            <CommunicationAddActionTaken :id="communication.id"/>
        </div>
    </template>
    
    <div class="row"  v-if="!showActionsBox">
        <div class="col col-sm-12 btn--employeeActions">
            <ul class="list-inline">
                <li class="list-inline-item">
                    <button class="btn" @click.prevent="btnActionsTaken"><i class="fa-solid fa-plus"></i> Add Actions Taken</button>
                </li>
            </ul>
        </div>
    </div>
    

</template>

<script>
    import moment from 'moment';

    import { reactive,inject, ref, onMounted,onUnmounted, watch, defineAsyncComponent } from "vue";
    import useCommunications from '@/composables/composables-communications';
    import useCommunicationGroups from '@/composables/composables-communicationgroups';
    import 'vue-select/dist/vue-select.css';
    import {useRouter} from 'vue-router'    
    import useNotifications from '@/composables/composables-notifications';    
    import useEventsBus from '@/components/helper/Eventbus';
    import {useCommunicationStore} from "@/stores/communicationstore.js"
    import {useNotificationStore} from '@/stores/notificationstore.js';
    import { useHead } from '@unhead/vue'
    import {useRecipients} from '@/stores/recipients.js'

    const AttachmentPreview = defineAsyncComponent(() => 
        import('@/components/cm/reusables/AttachmentPreview.vue')
    );
    const CommunicationActionsTaken = defineAsyncComponent(() => 
        import('@/components/cm/communications-employeeactions/CommunicationActionsTaken.vue')
    );
    const CommunicationAddActionTaken = defineAsyncComponent(() => 
        import('@/components/cm/communications-employeeactions/CommunicationAddActionTaken.vue')
    );
    const SubCheckUnits = defineAsyncComponent(() => 
        import('@/components/cm/reusables/SubCheckUnits.vue')
    );
    const SubCheckUnitHeads = defineAsyncComponent(() => 
        import('@/components/cm/reusables/SubCheckUnitHeads.vue')
    );
    const LoadingComponentDiv = defineAsyncComponent(() => 
        import('@/components/loader/LoadingComponentDiv.vue')
    );

    export default {
        components: {
            AttachmentPreview,
            CommunicationAddActionTaken,
            CommunicationActionsTaken,
            LoadingComponentDiv,
            SubCheckUnits,
            SubCheckUnitHeads
        },
        props: {
            id: {
                required: true,
                type: String
            }
        },
        setup(props){
            useHead({
                title: 'Communication | '+import.meta.env.VITE_BFAR_AGENCY
            })
            const swal = inject('$swal')
            const st_recipients = useRecipients();

            

            const showActionsBox = ref(false);

            const {communicationgroups, getCommunicationGroups} = useCommunicationGroups()
            const {communication, getCommunication ,errors} = useCommunications()


            const communicationstore = useCommunicationStore();
            const isClick = ref(communicationstore.getinitialcomm);

            const {emit,bus}=useEventsBus()

            const showrecipient = ref(false)
            const noSubject = ref(false);
            const notyetupdated = ref(false);

            const router = useRouter()
            const notificationstore = useNotificationStore()
            const dateSent = ref('');

  
            const photocopy = reactive({
                'title': 'Photocopy',
                'value': '',

            });

            const communicationform = reactive({
                'sendto': [],
                'selectedunits': [],

            });


            const hld = ref(true);
            const stupdated = ref(false);

            onMounted(() => { 

                getCommunication(props.id).then(() =>{

                    if(communication.value){                       
                        if(communication.value.units.length > 0){                        
                            communicationform.selectedunits = communication.value.units.map(i => parseInt(i['id']));
                        } 
                        if(communication.value.receivers.length > 0){                            
                            communicationform.sendto = communication.value.receivers.map(i => parseInt(i['id']));
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

                        stupdated.value = true;

                        checkSentDate(communication.value.updated_at);
                    }
                }),
                getCommunicationGroups().then(() => {
                    hld.value = false;
                })                

            })
            onUnmounted(() => {
                st_recipients.$reset();
            })
            const btnActionsTaken = () =>{
                showActionsBox.value = !showActionsBox.value;                
                emit('cancelallat',1);
            }

            
            const toindex = () =>{
                router.push({name: 'communications.index' });
            }

            watch(()=>bus.value.get('actionbox'), (val) => {
                [showActionsBox.value] = val ?? []
            })
     
                    

            const checkSentDate = async(sdate) =>{
                var mdate = moment(sdate);
 
                if(moment.duration(moment(new Date()).diff(mdate,'days')) > 5){
                    dateSent.value =  mdate.format('llll');
                }else{
                    dateSent.value =  mdate.format('MMM D, h:mm A');
                }
            }
            return{
                communication,
                communicationgroups,
                communicationform,
                errors,
                photocopy,
                noSubject,
                props,
                showrecipient,
                moment,
                toindex,
                isClick,
                btnActionsTaken,
                showActionsBox,
                hld,
                dateSent,
                stupdated
            }
        }
    }
</script>

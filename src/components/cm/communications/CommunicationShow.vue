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


    <div class="w-100 plr pt-3 content__card__wrap bg-light" v-sheight id="ccw">
        <div class="row">
            <div class="col communication--uploaded--by">
                Uploaded By: 
                <span>
                    <template v-if="communication.disseminator">
                        {{communication.disseminator.formattedName}}
                    </template>
                </span>
            </div>
        </div>
        <div class="content__card--contents plr pt-2 pb-1">
            <div class="row">
                <div class="col mb-1">
                    <div class="form-floating fflabel">
                        <span class="form-control">{{communication.documentnumber}}</span>
                        <span class="sp-label">Document Number</span>
                    </div>
                </div>
                <div class="col mb-1">
                    <div class="form-floating fflabel">
                        <span class="form-control">{{moment(communication.datetimein).format('LLLL')}}</span>
                        <span class="sp-label">Date Time In:</span>
                    </div>
                </div>
                <div class="col mb-1">
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
                                    <strong>{{moment(communication.inclusivedatestart).format('MMMM D, YYYY')}} </strong>
                                </template>
                                <template v-else>
                                    <strong>{{moment(communication.inclusivedatestart).format('MMMM D, YYYY')}}</strong> to <strong>{{moment(communication.inclusivedateend).format('MMMM D, YYYY')}}</strong>
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

        <div class="accordion mt-1" id="accRecipients">
            <div class="accordion-item">
                <h2 class="accordion-header" id="headingRecipients">
                  <button id="btnRecipients" class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseRecipients" aria-expanded="false" aria-controls="collapseRecipients" @click="showrecipient = !showrecipient">
                    <strong>Recipients</strong> 
                    
                        <template v-if="!showrecipient">
                            <span class="ms-1 ps-1 pt-1 me-2 border-bottom w-100">
                                <template v-for="(x,y) in communication.receivers">
                                    {{x.formattedName}}<template v-if="y != communication.receivers.length -1">, </template>
                                </template>
                            </span> 
                        </template>                        
                                  
                  </button>
                </h2>
                <div id="collapseRecipients" class="accordion-collapse collapse" aria-labelledby="headingRecipients" data-bs-parent="#accRecipients">
                  <div class="accordion-body">
                    <div class="row">
                        <div class="col">
                            <div class="checkBoxcgDisp  mt-2" :class="errors.sendto ? 'br-error' : ''">
                                <ul class="list-unstyled mb-1" v-for="(communicationgroup,x) in communicationgroups" :class="`cg-${x}`">
                                    <li v-if="communicationgroup.display == 1">
                                        <div class="form-check">
                                          <span class="sp-label-inline">
                                            <strong>{{communicationgroup.name}}</strong>
                                          </span>
                                        </div>

                                        <template v-if="communicationgroup.employees">
                                            <ul class="listcgchilds list-unstyled ps-3">
                                                <li v-for="(employee,index) in communicationgroup.employees">
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="checkbox" :value="employee.id" 
                                                        :id="`emp-${x}-${employee.id}-${index}`" v-model="communicationform.sendto"  disabled>
                                                        <label class="form-check-label" :for="`emp-${x}-${employee.id}-${index}`" >
                                                            {{employee.name}}
                                                        </label>
                                                    </div>
                                                </li>
                                            </ul>
                                        </template>
                                    </li>
                                </ul>
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
                    <div class="card--title">
                        <strong>Remarks:</strong>
                    </div>                    
                    <div class="fflabel">
                        <div class="nb">
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
        </div>

        <template v-if="communication.attachments">
            <template v-if="communication.attachments.length > 0">
                <AttachmentPreview :files="communication.attachments"/>
            </template>
        </template>

        


        <template v-if="communication.id">
            <CommunicationActionsTaken :id="communication.id"/>
        </template>
        

        <template v-if="communication.id && showActionsBox">
            <CommunicationAddActionTaken :id="communication.id"/>
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

    </div>    

    

</template>

<script>
    import { reactive,inject, ref, onMounted,onUnmounted, watch} from "vue";
    import useCommunications from '@/composables/composables-communications';
    import useCommunicationGroups from '@/composables/composables-communicationgroups';
    import 'vue-select/dist/vue-select.css';
    import {useRouter} from 'vue-router'
    import moment from 'moment';
    import AttachmentPreview from '@/components/cm/reusables/AttachmentPreview.vue';
    import CommunicationAddActionTaken from '@/components/cm/communications-employeeactions/CommunicationAddActionTaken.vue';
    import CommunicationActionsTaken from '@/components/cm/communications-employeeactions/CommunicationActionsTaken.vue';

    import useNotifications from '@/composables/composables-notifications';
    
    import useEventsBus from '@/components/helper/Eventbus';
    import {useCommunicationStore} from "@/stores/communicationstore.js"
    import {useNotificationStore} from '@/stores/notificationstore.js';
    import LoadingComponentDiv from '@/components/loader/LoadingComponentDiv.vue'
    import { useHead } from '@unhead/vue'

    export default {
        components: {
            AttachmentPreview,
            CommunicationAddActionTaken,
            CommunicationActionsTaken,
            LoadingComponentDiv
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


  
            const photocopy = reactive({
                'title': 'Photocopy',
                'value': '',

            });

            const communicationform = reactive({
                'sendto': [],
            });


            const hld = ref(true);
            onMounted(() => {
                

                getCommunication(props.id).then(() =>{

    
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

                }),
                getCommunicationGroups().then(() => {
                    hld.value = false;
                })


                

            })


            const saveasDraft = async() =>{
                await updateCommunicationDraft(props.id,{ ...communicationform }).then(() => {
                    if(!errors.value){
                        swal.fire({
                            toast: true,
                            position: 'top-end',
                            title: 'Communication Successfully Created',
                            showConfirmButton: false,            
                            icon: 'success',
                            width: '300',
                            padding: '.5em 1em',
                            timerProgressBar: true,
                            timer:1500,
                            customClass: {
                                container: 'swaltopright'
                            }
                        })
                    }
                });
            }
            const clickSend = async(id) =>{
                await updateCommunicationSend(props.id,{ ...communicationform }).then(() => {
                    if(!errors.value){
                        swal.fire({
                            toast: true,
                            position: 'top-end',
                            title: 'Communication Successfully Sent',
                            showConfirmButton: false,            
                            icon: 'success',
                            width: '300',
                            padding: '.5em 1em',
                            timerProgressBar: true,
                            timer:1500,
                            customClass: {
                                container: 'swaltopright'
                            }
                        })
                    }
                });
            }
            
            const toindex = () =>{
                router.push({name: 'communications.index' });
            }

            watch(()=>bus.value.get('actionbox'), (val) => {
                [showActionsBox.value] = val ?? [] 
            })

            const btnActionsTaken = () =>{
                showActionsBox.value = !showActionsBox.value;
                var x = document.getElementById("ccw");
                setTimeout(function(){
                    x.scrollTop = x.scrollHeight;
                },15)
                emit('cancelallat',1);
            }


            return{
                communication,
                communicationgroups,
                saveasDraft,
                clickSend,
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
                hld
            }
        }
    }
</script>

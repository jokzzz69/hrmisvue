<template>   
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
    <div class="bg-light mb-3 pb-3 pt-3 px-3 card content__card__wrap" v-sheight="200" id="ccw">
        <div class="cardwrap pt-2 pb-1">
            <div class="col mb-2 col-sm-3">
                <div class="form-floating fflabel">
                    <span class="form-control">{{communication.documentnumber}}</span>
                    <span class="sp-label">Document Number:</span>
                </div>
            </div>
            <div class="col mb-2 col-sm-3">
                <div class="form-floating fflabel">
                    <span class="form-control">{{moment(communication.datetimein).format('LLLL')}}</span>
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
                                <strong>{{moment(communication.inclusivedatestart).format('MMMM D, YYYY')}} </strong>
                            </template>
                            <template v-else>
                                <strong>{{moment(communication.inclusivedatestart).format('MMMM D, YYYY')}}</strong> to <strong>{{moment(communication.inclusivedateend).format('MMMM D, YYYY')}}</strong>
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
                <div class="checkBoxcgDisp p-2 mt-2 border" :class="errors.sendto ? 'br-error' : ''">
                    <div class="card--title"><strong>Recipients:</strong></div>
                    <ul class="list-unstyled mb-1" v-for="(communicationgroup,x) in communicationgroups" :class="`cg-${x}`">
                        <li>
                            <div class="form-check">
                              <span class="sp-label-inline">
                                <strong>{{communicationgroup.name}}</strong>
                              </span>
                            </div>

                            <template v-if="communicationgroup.employees">
                                <ul class="listcgchilds list-unstyled ps-3">
                                    <li v-for="(employee,x) in communicationgroup.employees">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" :value="employee.id" :id="'emp-'+employee.id+'-'+x" v-model="communicationform.sendto"  disabled>
                                            <label class="form-check-label" :for="'emp-'+employee.id+'-'+x">
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
        

        <template v-if="communication.id && showActionsBox">
            <CommunicationAddActionTaken :id="communication.id"/>
        </template>


        <div class="row">
            <div class="col col-sm-12 btn--employeeActions">
                <ul class="list-inline">
                    <li class="list-inline-item" v-if="!showActionsBox">
                        <button class="btn" @click.prevent="btnActionsTaken"><i class="fa-solid fa-plus"></i> Add Actions Taken</button>
                    </li>
                    <li class="list-inline-item">
                        <button class="btn" @click.prevent="editRoutedCommunication"><i class="fa-solid fa-pen-to-square"></i> Edit and Resend</button>
                    </li>
                </ul>
            </div>
        </div>
        <div id="bt"></div>     
    </div>    
</template>

<script>
    import { reactive,inject, ref, onMounted,watch} from "vue";
    import useCommunicationsRouted from '@/composables/composables-communicationsrouted';
    import useCommunicationGroups from '@/composables/composables-communicationgroups';
    import 'vue-select/dist/vue-select.css';
    import {useRouter} from 'vue-router'
    import moment from 'moment';
    import AttachmentPreview from '@/components/cm/reusables/AttachmentPreview.vue';
    import {useRoutedStore} from '@/stores/routedstore'

    import CommunicationAddActionTaken from '@/components/cm/communications-employeeactions/CommunicationAddActionTaken.vue';
    import CommunicationActionsTaken from '@/components/cm/communications-employeeactions/CommunicationActionsTaken.vue';
    import useNotifications from '@/composables/composables-notifications';
    import useEventsBus from '@/components/helper/Eventbus';
    import {useNotificationStore} from '@/stores/notificationstore.js'

    export default {
        components: {
            AttachmentPreview,
            CommunicationAddActionTaken,
            CommunicationActionsTaken
        },
        props: {
            id: {
                required: true,
                type: String
            },


        },
        setup(props){
            const swal = inject('$swal')
            const showActionsBox = ref(false);
            const {emit,bus}=useEventsBus()
            const {communicationgroups, getCommunicationGroups} = useCommunicationGroups()
            const {communication, getCommunicationRouted ,errors} = useCommunicationsRouted()
            const router = useRouter()
            const noSubject = ref(false);
            const {getUnread,totalunread} = useNotifications()
    

            const routedstore = useRoutedStore()
            const notificationstore = useNotificationStore()

            const isClick = ref(routedstore.getinitialrouted);


            const photocopy = reactive({
                'title': 'Photocopy',
                'value': '',

            });

            const communicationform = reactive({
                'sendto': [],
            });

            onMounted(() => {
                getCommunicationRouted(props.id).then(() =>{
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
                getCommunicationGroups();

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
                var x = document.getElementById("ccw");
                setTimeout(function(){
                    x.scrollTop = x.scrollHeight;
                },15)
                
            }

            return{
                communication,
                communicationgroups,
                saveasDraft,
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
                btnActionsTaken
            }
        }
    }
</script>

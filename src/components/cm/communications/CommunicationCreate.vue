<template>    
    <template v-if="forNotLoaded">
        <LoadingComponentDiv/> 
    </template>
    <div class="row">
        <div class="col col-sm-12 p-title">
            <h2>New Communication</h2>
        </div>
    </div>
    <form class="bg-light my-3 pb-3 pt-3 px-3 card cardCommunication" :class="errors ? 'has-Error' : '' ">
        <div class="row">
            <div class="col-3">
                <Datepicker class="dp-floating no-autoapply" :teleport="true" :class="errors.datetimein ? 'is-invalid' : ''" v-model="communicationform.datetimein"  week-start="0" :is-24="false" time-picker-inline  name="datetimein" placeholder="Date / Time In"></Datepicker>  
                <span v-if="errors.datetimein" class="text-danger m-error">{{errors.datetimein[0]}}</span>  
            </div>
            <div class="col">
                <div class="form-floating req">            
                    <select name="documenttype" placeholder="documenttype" id="documenttype" class="form-select" @change="showCheckInclusiveDate" v-model="communicationform.documenttype" :class="errors.documenttype ? 'is-invalid' : ''" >
                        <option disabled value="">Please select one</option>
                        <option :value="documenttype.id" v-for="documenttype in documenttypes">{{documenttype.name}}</option>
                    </select>
                    <label for="documenttype" class="form-label">Document Type</label>   
                    <span v-if="errors.documenttype" class="text-danger m-error">{{errors.documenttype[0]}}</span>        
                </div>        
            </div>
            <div class="col-auto align-self-center" v-if="communicationform.documenttype == 5 || communicationform.documenttype == 8 || communicationform.documenttype == 15">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="incDates" v-model="communicationform.hasinclusive" @change='checkInclusive()'>
                  <label class="form-check-label lblincDates" for="incDates">
                    Add inclusive<br/> dates
                  </label>
                </div>
            </div>            
        </div>
        <div class="row" v-if="hasInclusive">
            <div class="col mt-2">
                <div class="form-floating req">
                    <Datepicker class="dp-floating no-autoapply"  :class="errors.inclusivedates ? 'is-invalid' : ''" v-model="communicationform.inclusivedates" week-start="0" :is-24="false" :enable-time-picker="false" name="inclusivedates" placeholder="Inclusive Dates" range></Datepicker>  
                    <span v-if="errors.inclusivedates" class="text-danger m-error">{{errors.inclusivedates[0]}}</span>  
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col mt-2">
                <div class="form-floating req">            
                    <select name="classification" placeholder="classification" id="classification" class="form-select" v-model="communicationform.classification" :class="errors.classification ? 'is-invalid' : ''" >
                        <option disabled value="">Please select one</option>
                        <option :value="classification.id" v-for="classification in classifications">{{classification.name}}</option>
                    </select>
                    <label for="classification" class="form-label">Classification</label>   
                    <span v-if="errors.classification" class="text-danger m-error">{{errors.classification[0]}}</span>        
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col my-2">
                <div class="form-floating req">
                    <input type="text" name="sender" placeholder="enter sender" id="sender" class="form-control" v-model="communicationform.sender" :class="errors.sender ? 'is-invalid' : ''">
                    <label for="sender" class="form-label">Sender</label>
                </div>
                <span v-if="errors.sender" class="text-danger m-error">{{errors.sender[0]}}</span>
            </div>
            <div class="col my-2">
                <div class="form-floating req">
                    <input type="text" name="agency" placeholder="enter agency" id="agency" class="form-control" v-model="communicationform.agency" :class="errors.agency ? 'is-invalid' : ''">
                    <label for="agency" class="form-label">Agency</label>
                </div>
                <span v-if="errors.agency" class="text-danger m-error">{{errors.agency[0]}}</span>
            </div>
                
        </div>
        <div class="row">
            <div class="col mb-2">
                <div class="form-floating">
                    <input type="text" name="subject" placeholder="enter subject" id="subject" class="form-control" v-model="communicationform.subject">
                    <label for="subject" class="form-label">Subject</label>
                </div>
            </div>
            <div class="col mb-2">
                <div class="form-floating">
                    <input type="text" name="venue" placeholder="enter venue" id="venue" class="form-control" v-model="communicationform.venue">
                    <label for="venue" class="form-label">Venue</label>
                </div>
            </div>
        </div>

        
        <div class="row">
            <div class="col-12 mt-4 mainLabel"><h6>FOR / TO:  <span class="text-danger">*</span></h6></div>
            <span v-if="errors.sendto" class="text-danger m-error">{{errors.sendto[0]}}</span>   
        </div>
        <div class="row">
            <div class="col col-sm-12">                   
                <div class="checkboxCG p-2 border" :class="errors.sendto ? 'br-error' : ''">                                           
                    <SubCheckUnitHeads :isDisplayed="false"/>         
                    <div class="unitgroups">
                        <SubCheckUnits :isDisplayed="false"/>
                    </div>
                </div>               
            </div>           
        </div>

        <div class="row">
            <div class="col col-sm-6">
                <div class="mt-4 mainLabel">
                    <h6>Note: <span class="text-danger">*</span></h6>
                </div>
                <span v-if="errors.notes" class="text-danger m-error">{{errors.notes[0]}}</span>  
                <div class="chkNoteWrap border p-2"  :class="errors.notes ? 'br-error' : ''">
                    <template v-if="notes">
                        <ul class="list-unstyled ulnotes">
                            <li v-for="note in notes">
                                <div class="form-check">
                                  <input class="form-check-input" type="checkbox" :value="note.id" :id="`note-${note.id}`"  v-model="communicationform.notes" @change="chkBoxNote">
                                  <label class="form-check-label" :for="`note-${note.id}`">
                                    {{note.name}}
                                  </label>
                                </div>
                            </li>
                        </ul>
                    </template>
                    <hr v-if="shoWCopies || showReturnForward">
                    <template v-if="shoWCopies">
                        <ul class="mb-0 list-inline">
                            <li class="list-inline-item"><p>Number of Copies: </p></li>
                            <li class="list-inline-item"><input type="number" name="numberOfCopies" class="form-control" @keypress="filterNonNumeric" v-model="communicationform.notesphotocopy"></li>
                        </ul>
                    </template>
                    <template v-if="showReturnForward">
                         <ul class="list-unstyled">
                             <li><p class="mb-0">Return / Forward to:</p></li>
                             <li><v-select multiple class="rforwardto" placeholder="Select Employee" v-model="communicationform.notesreturnforward" :reduce="employees => employees.id" :options="employees"/></li>
                         </ul>
                    </template>
                </div>
            </div>

            <div class="col col-sm-6">
                <div class="mt-4 mainLabel">
                    <h6>Actions: <span class="text-danger">*</span></h6>
                </div>
                <span v-if="errors.actions" class="text-danger m-error">{{errors.actions[0]}}</span>  
                <div class="chkActionWrap border p-2"  :class="errors.actions ? 'br-error' : ''">
                    <template v-if="actions">
                        <ul class="list-unstyled ulnotes">
                            <li v-for="action in actions">
                                <div class="form-check">
                                  <input class="form-check-input" type="checkbox" :value="action.id" :id="`action-${action.id}`"  v-model="communicationform.actions">
                                  <label class="form-check-label" :for="`action-${action.id}`">
                                    {{action.name}}
                                  </label>
                                </div>
                            </li>
                        </ul>
                    </template>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="mt-4 mainLabel">
                    <h6>Remarks:</h6>
                </div>
                <textarea name="remarks" class="form-control" v-model="communicationform.remarks" placeholder="enter remarks here"></textarea>
            </div>
        </div>
        
        <AttachFile :attachments="bid" :err="fileattacherr" @getUploadedFile="updateUploaded" />
        
        <div class="form-row">
            <div class="col mt-3 text-end">
                <router-link :to="{name: 'communications.index'}" class="btn btn-secondary me-1">Cancel</router-link>
                <button type="submit" @click.prevent="sendCommunication" class="btn btn-save"> Send</button>
            </div>
        </div>        
    </form> 
    
</template>

<script>
    import { reactive,inject, ref, onMounted, watch,defineAsyncComponent} from "vue";
    import useCommunications from '@/composables/composables-communications';
    import useDocumentTypes from '@/composables/composables-documenttypes';    
    import useClassifications from '@/composables/composables-classifications';
    import useNotes from '@/composables/composables-notes';
    import useActions from '@/composables/composables-actions';

    import useCommunicationsDraft from '@/composables/composables-communicationsdraft';
    import useEmployees from '@/composables/composables-employees';
    import 'vue-select/dist/vue-select.css';
    import {useRouter, onBeforeRouteLeave} from 'vue-router'
    import moment from 'moment';
    import {useAuthStore} from '@/stores/store.js'
    
    import useEventsBus from '@/components/helper/Eventbus';
    import { useHead } from '@unhead/vue'
    
    import {useRecipients} from '@/stores/recipients.js'



    const AttachFile = defineAsyncComponent(() => 
        import('@/components/cm/reusables/AttachFile.vue')
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
            AttachFile,
            LoadingComponentDiv,
            SubCheckUnits,
            SubCheckUnitHeads
        },
        setup(){
            useHead({
                title: 'New Communication | '+import.meta.env.VITE_BFAR_AGENCY
            })
            const {emit}=useEventsBus()

            const st_recipients = useRecipients();
 

            const asdraftpage = ref(true);
            const bid = ref([]);
            const fileattacherr = ref('');

            const swal = inject('$swal')
                        
            const userdetails = useAuthStore();

            const userslug = ref(userdetails.getdetails[1]);            

            const {classifications, getClassifications} = useClassifications()
            const {documenttypes, getDocumentTypes} = useDocumentTypes()
            
            const {notes, getNotes} = useNotes()

            const {actions, getActions} = useActions()

            const {employees, getEmployeeOptions} = useEmployees()

            const hasInclusive = ref(false);

            const {errors,  storeCommunication} = useCommunications()
            const {storeAsDraft} = useCommunicationsDraft()
                
            onBeforeRouteLeave((to, from) => {
              if(asdraftpage.value){
                checkifHasData()
              }
            });

            const fileSize = ref(0);            
            
            const communicationform = reactive({
                'datetimein': '',
                'sender': '',
                'agency': '',
                'subject': '',
                'venue': '',
                'documenttype': '',
                'hasinclusive':false,
                'inclusivedates':'',
                'classification': '',
                'commgroupids': [],
                'sendto': [],
                'notes': [],
                'notesphotocopy': '',
                'notesreturnforward': [],
                'actions': [],
                'remarks': '',                
                'uploadedfileid': [],
                'selectedunits': [],
                'asdraft': false

            });
            const forNotLoaded = ref(true);

            onMounted(() => {
                getDocumentTypes(),
                getClassifications(),                
                getNotes(),
                getActions(),
                getEmployeeOptions().then(() => {
                    forNotLoaded.value =false;
                })           

                
            })
            const checkifHasData = () =>{
                if(communicationform.datetimein != '' || communicationform.sender !='' || communicationform.agency != '' || communicationform.subject != '' ||communicationform.venue != '' || communicationform.documenttype != '' || communicationform.inclusivedates != '' ||communicationform.classification != '' || communicationform.notesphotocopy != '' || communicationform.remarks != '' ||communicationform.commgroupids.length != 0 || communicationform.sendto.length != 0 ||communicationform.notes.length != 0 ||communicationform.notesreturnforward.length != 0 || communicationform.actions.length != 0 || communicationform.uploadedfileid.length != 0){
                    saveasDraft();

                  }
            }
            const saveasDraft = async() =>{ 
                await storeAsDraft({ ...communicationform}).then(() =>{
                    emit('reload',true);
                });
            };
            const sendCommunication = async() =>{

                communicationform.selectedunits = st_recipients.getselectedunitgroups;
                communicationform.commgroupids = st_recipients.getselectedunitheadgroups;
                communicationform.sendto = st_recipients.getselectedunitheads;

                communicationform.asdraft = false;
                asdraftpage.value = false;

                await storeCommunication({ ...communicationform }).then(() => {
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
                    }else{
                        if(errors.value.uploadedfileid){
                            fileattacherr.value = errors.value.uploadedfileid[0];
                        }
                    }
                })
            }

            

            

            
            const shoWCopies = ref(false);
            const showReturnForward = ref(false);
            const showInclusives = ref(false);

            const chkBoxNote = () => {

                if(communicationform.notes.includes(8)){
                    shoWCopies.value = true;
                }else{
                    shoWCopies.value = false;
                    communicationform.notesphotocopy = '';
                }
                if(communicationform.notes.includes(15)){
                    showReturnForward.value = true;
                }else{
                    showReturnForward.value = false;
                    communicationform.notesreturnforward = [];
                }
            }

            const filterNonNumeric = (e) =>{
                let keyCode = (e.keyCode ? e.keyCode : e.which);
                if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
                    e.preventDefault();
                }
            }

        
            const showCheckInclusiveDate = () =>{

                if(communicationform.documenttype != 5 || communicationform.documenttype != 8 || communicationform.documenttype != 15){
                    showInclusives.value = false;
                    communicationform.hasinclusive = false;
                    hasInclusive.value = false;
                }else{
                    showInclusives.value = true;
                    communicationform.hasinclusive = true;
                    hasInclusive.value = true;
                }
            }          
            const checkInclusive = () =>{
                hasInclusive.value = !hasInclusive.value;
            }

            const updateUploaded = (attachids) =>{
                communicationform.uploadedfileid = [];
                for(const attachid in attachids){
                    communicationform.uploadedfileid.push(attachids[attachid]);
                }                
            }

                     
            return{
                documenttypes,
                classifications,

                notes,
                saveasDraft,
                sendCommunication,
                communicationform,
                errors,
                actions,

                chkBoxNote,
                shoWCopies,
                showReturnForward,
                showCheckInclusiveDate,
                filterNonNumeric,

                employees,
                checkInclusive,
                hasInclusive,
                userslug,
                updateUploaded,
                fileattacherr,
                bid,
                forNotLoaded
                
            }
        }
    }
</script>
<template>   
    <template v-if="hld">
        <LoadingComponentDiv/>
    </template>  
    <div class="row">
        <div class="col pAgeEmail--title">
            <ul class="d-flex list-unstyled align-items-center mh-45 mb-2">
                <li class="col col-auto me-4"><h2 class="ps-1">Routed Edit</h2></li>
            </ul>
            <div class="btn--backWrap mb-1 btn--backWrap--edit">
                <button title="Return Back / Cancel" class="btn btn__back" @click.prevent="$router.go(-1)"><i class="fa-solid fa-arrow-left"></i></button>
            </div>
        </div>
    </div> 
    <form class="bg-light mb-3 pb-3 pt-3 px-3 card">
        <div class="row">
            <div class="col-3">
                <Datepicker class="dp-floating no-autoapply"  :class="errors.datetimein ? 'is-invalid' : ''" v-model="communicationform.datetimein" time-picker-inline week-start="0" :is-24="false" :enable-time-picker="true" name="datetimein" placeholder="Date / Time In"></Datepicker>  
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
                  <input class="form-check-input" type="checkbox" id="incDates" v-model="communicationform.hasinclusive" @change='checkInclusive()'>
                  <label class="form-check-label lblincDates" for="incDates"> 
                    Add inclusive<br/> dates
                  </label>
                </div>
            </div>            
        </div>
        <div class="row" v-if="torInclusive">
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
                    <input type="text" name="subject" placeholder="enter subject" id="subject" class="form-control" v-model="communicationform.subject" :class="errors.subject ? 'is-invalid' : ''">
                    <label for="subject" class="form-label">Subject</label>
                    <span v-if="errors.subject" class="text-danger m-error">{{errors.subject[0]}}</span>
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
                    <h6>Note: </h6>
                </div>

                <div class="chkNoteWrap border p-2">
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
                             <li><v-select multiple class="rforwardto v-select-returnforward" placeholder="Select Employee" v-model="communicationform.notesreturnforward" :reduce="employees => employees.id" :options="employees"/></li>
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
                <div class="form-floating req">                               
                    <div class="remarksInput" ref="actxt" v-html="communicationform.remarks" contenteditable="true" @blur="getContent"></div>     
                </div>
            </div>
        </div>
        

        <AttachFile :attachments="communicationform.uploadedfiles" :err="fileattacherr" @getUploadedFile="updateUploaded" />


        <div class="form-row">
            <div class="col mt-3 text-end">

                <router-link :to="{ name: 'communications-routed.index' }" class="btn btn-secondary me-1">Cancel</router-link>
                <button type="submit" @click.prevent="reSend(props.id)" class="btn btn-blue">Update and Resend</button>
            </div>
        </div>        
    </form>
    
</template>

<script>
    import { reactive,inject, ref, onMounted, defineAsyncComponent } from "vue";
    import useCommunicationsRouted from '@/composables/composables-communicationsrouted';

    import AttachFile from '@/components/cm/reusables/AttachFile.vue';

    import useDocumentTypes from '@/composables/composables-documenttypes';

    import useClassifications from '@/composables/composables-classifications';
    import useNotes from '@/composables/composables-notes';
    import useActions from '@/composables/composables-actions';

    import 'vue-select/dist/vue-select.css';
    import {useRouter} from 'vue-router'
    import moment from 'moment';
    import useManageFile from '@/composables/composables-managefile';
    import useEmployees from '@/composables/composables-employees';
    import { useHead } from '@unhead/vue'

    import {useRecipients} from '@/stores/recipients.js'
    import useEventsBus from '@/components/helper/Eventbus';

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
            AttachFile,
            SubCheckUnits,
            SubCheckUnitHeads,
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
                title: 'Edit Routed Communication | '+import.meta.env.VITE_BFAR_AGENCY
            })
            const swal = inject('$swal')
            const fileattacherr = ref('');
            const st_recipients = useRecipients();
            const hld = ref(true);
            const {emit,bus}=useEventsBus()
            const {classifications, getClassifications} = useClassifications()
            const {documenttypes, getDocumentTypes} = useDocumentTypes()

            const {notes, getNotes} = useNotes()
            const {actions, getActions} = useActions()
   
            const {employees, getEmployeeOptions} = useEmployees()

            const torInclusive = ref(false);
            const {uploadTempAttachment, attachedtemp} = useManageFile()
            

            const {  errors, editCommunicationRouted,communication,updateRoutedCommunication} = useCommunicationsRouted()


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
                'uploadedfiles': [],
                'uploadedfileid': [],
                'asdraft': false,
                'selectedunits': [],                
                'allunits': '',
                'allgroups': ''

            });

            onMounted(() => {

                editCommunicationRouted(props.id).then(res =>{

                    communicationform.datetimein = communication.value.datetimein;
                    communicationform.sender = communication.value.sender;
                    communicationform.agency = communication.value.agency;
                    communicationform.subject = communication.value.subject;
                    communicationform.venue = communication.value.venue;
                    communicationform.documenttype = communication.value.documenttype_id;
                    communicationform.classification = communication.value.classification_id;
                    communicationform.allunits = communication.value.allunits;
                    communicationform.allgroups = communication.value.allgroups;
                    if(communication.value.withinclusivedates == 1){
                        communicationform.hasinclusive = true;
                        communicationform.inclusivedates = [communication.value.inclusivedatestart, communication.value.inclusivedateend];
                        torInclusive.value = true;
                    }else{

                        communicationform.hasinclusive = false;
                        communicationform.inclusivedates = '';
                        torInclusive.value = false;
                    }

                    if(communication.value.receiversunitheads.length > 0){

                       communicationform.sendto = communication.value.receiversunitheads.map(i => parseInt(i['id'])); 
                    }
                    if(communication.value.units.length > 0){
                        communicationform.selectedunits = communication.value.units.map(i => parseInt(i['id']));
                    }
    
                    if(communication.value.notes.length > 0){
                        communicationform.notes = communication.value.notes.map(i => parseInt(i['id']));
                    }
                    if(communication.value.actions.length > 0){
                        communicationform.actions = communication.value.actions.map(i => parseInt(i['id']));
                    }

                    chkBoxNote();                   

                    communicationform.notesphotocopy = communication.value.noteCopies;

                    if(communication.value.returnforward.length > 0){
                        communicationform.notesreturnforward = communication.value.returnforward.map(i => parseInt(i['id']));
                    }
                    if(communication.value.communicationgroups.length > 0){
                        communicationform.commgroupids = communication.value.communicationgroups.map(i => parseInt(i['id']));
                    }
                    communicationform.remarks = communication.value.remarks;

                    communicationform.uploadedfileid = communication.value.attachments.map(i => parseInt(i['id']));
                  

                    for (var i of communication.value.attachments) {
                        const fileSize = (i.filesize < 1024) ? i.filesize +' KB' : (i.filesize / (1024*1024)).toFixed(2)+' MB';
                        communicationform.uploadedfiles.push({id: i.id,name: i.filename, size: fileSize,fileextension: i.fileextension, filepath: i.filepath});
                    }

                    st_recipients.setselectedunitheads(communicationform.sendto);
                    st_recipients.setselectedunitheadgroups(communicationform.commgroupids);
                    st_recipients.setselectedunitgroups(communicationform.selectedunits);                    
                    st_recipients.setallunits(communicationform.allunits);
                    st_recipients.setallgroups(communicationform.allgroups); 
                }),

                getDocumentTypes(),
                getClassifications(),      
                getNotes(),
                getActions(),
                getEmployeeOptions().then(() => {
                    hld.value = false;
                })



            })

            const reSend = async(id) =>{


                
                communicationform.selectedunits = st_recipients.getselectedunitgroups;
                communicationform.commgroupids = st_recipients.getselectedunitheadgroups;
                communicationform.sendto = st_recipients.getselectedunitheads;
                communicationform.allunits = st_recipients.getallunits;
                communicationform.allgroups = st_recipients.getallgroups;

                communicationform.asdraft = false;


                await updateRoutedCommunication(props.id,{ ...communicationform }).then(() => {

                    if(!errors.value){

                        swal.fire({
                            toast: true,
                            position: 'top-end',
                            title: 'Communication Successfully Updated and Sent',
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

                    st_recipients.reset;
                });
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
                    torInclusive.value = false;
                }else{
                    showInclusives.value = true;
                    communicationform.hasinclusive = true;
                    torInclusive.value = true;
                }
            }    
            const checkInclusive = () =>{
                torInclusive.value = !torInclusive.value;
            }
            const updateUploaded = (attachids) =>{

                communicationform.uploadedfileid = [];
                for(const attachid in attachids){
                    communicationform.uploadedfileid.push(attachids[attachid]);
                }
                
            }
            const getContent = (evt) => {
                communicationform.remarks = evt.target.innerHTML;

            }
            return{
                documenttypes,
                classifications,
                notes,
                reSend,
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
                torInclusive,
                props,
                updateUploaded,
                fileattacherr,
                hld,
                getContent
            }
        }
    }
</script>

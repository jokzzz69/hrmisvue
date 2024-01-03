<template>   
    <div class="row">
        <div class="col pAgeEmail--title">
            <ul class="d-flex list-unstyled align-items-center mh-45 mb-2">
                <li class="col col-auto me-4"><h2 class="ps-1">Draft Edit</h2></li>
            </ul>
            <div class="btn--backWrap mb-1 btn--backWrap--edit">
                <button title="Return Back / Cancel" class="btn btn__back" @click.prevent="$router.go(-1)"><i class="fa-solid fa-arrow-left"></i></button>
            </div>
        </div>
    </div> 
    <form class="bg-light mb-3 pb-3 pt-3 px-3 card">
        <div class="row">
            <div class="col-3">
                <Datepicker class="dp-floating no-autoapply"  :class="errors.datetimein ? 'is-invalid' : ''" v-model="draftform.datetimein" time-picker-inline week-start="0" :is-24="false" :enable-time-picker="true" name="datetimein" placeholder="Date / Time In"></Datepicker>  
                <span v-if="errors.datetimein" class="text-danger m-error">{{errors.datetimein[0]}}</span>  
            </div>
            <div class="col">
                <div class="form-floating req">            
                    <select name="documenttype" placeholder="documenttype" id="documenttype" class="form-select" @change="showCheckInclusiveDate" v-model="draftform.documenttype" :class="errors.documenttype ? 'is-invalid' : ''" >
                        <option disabled value="">Please select one</option>
                        <option :value="documenttype.id" v-for="documenttype in documenttypes">{{documenttype.name}}</option>
                    </select>
                    <label for="documenttype" class="form-label">Document Type</label>   
                    <span v-if="errors.documenttype" class="text-danger m-error">{{errors.documenttype[0]}}</span>        
                </div>        
            </div>
            <div class="col-auto align-self-center" v-if="draftform.documenttype == 5 || draftform.documenttype == 8 || draftform.documenttype == 15">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="incDates" v-model="draftform.hasinclusive" @change='checkInclusive()'>
                  <label class="form-check-label lblincDates" for="incDates"> 
                    Add inclusive<br/> dates
                  </label>
                </div>
            </div>            
        </div>
        <div class="row" v-if="torInclusive">
            <div class="col mt-2">
                <div class="form-floating req">
                    <Datepicker class="dp-floating no-autoapply"  :class="errors.inclusivedates ? 'is-invalid' : ''" v-model="draftform.inclusivedates" week-start="0" :is-24="false" :enable-time-picker="false" name="inclusivedates" placeholder="Inclusive Dates" range></Datepicker>  
                    <span v-if="errors.inclusivedates" class="text-danger m-error">{{errors.inclusivedates[0]}}</span>  
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col mt-2">
                <div class="form-floating req">            
                    <select name="classification" placeholder="classification" id="classification" class="form-select" v-model="draftform.classification" :class="errors.classification ? 'is-invalid' : ''" >
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
                    <input type="text" name="sender" placeholder="enter sender" id="sender" class="form-control" v-model="draftform.sender" :class="errors.sender ? 'is-invalid' : ''">
                    <label for="sender" class="form-label">Sender</label>
                </div>
                <span v-if="errors.sender" class="text-danger m-error">{{errors.sender[0]}}</span>
            </div>
            <div class="col my-2">
                <div class="form-floating req">
                    <input type="text" name="agency" placeholder="enter agency" id="agency" class="form-control" v-model="draftform.agency" :class="errors.agency ? 'is-invalid' : ''">
                    <label for="agency" class="form-label">Agency</label>
                </div>
                <span v-if="errors.agency" class="text-danger m-error">{{errors.agency[0]}}</span>
            </div>
                
        </div>
        <div class="row">
            <div class="col mb-2">
                <div class="form-floating">
                    <input type="text" name="subject" placeholder="enter subject" id="subject" class="form-control" v-model="draftform.subject">
                    <label for="subject" class="form-label">Subject</label>
                </div>
            </div>
            <div class="col mb-2">
                <div class="form-floating">
                    <input type="text" name="venue" placeholder="enter venue" id="venue" class="form-control" v-model="draftform.venue">
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
                    <h6>Note:</h6>
                </div>
                <span v-if="errors.notes" class="text-danger m-error">{{errors.notes[0]}}</span>  
                <div class="chkNoteWrap border p-2"  :class="errors.notes ? 'br-error' : ''">
                    <template v-if="notes">
                        <ul class="list-unstyled ulnotes">
                            <li v-for="note in notes">
                                <div class="form-check">
                                  <input class="form-check-input" type="checkbox" :value="note.id" :id="`note-${note.id}`"  v-model="draftform.notes" @change="chkBoxNote">
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
                            <li class="list-inline-item"><input type="number" name="numberOfCopies" class="form-control" @keypress="filterNonNumeric" v-model="draftform.notesphotocopy"></li>
                        </ul>
                    </template>
                    <template v-if="showReturnForward">
                         <ul class="list-unstyled">
                             <li><p class="mb-0">Return / Forward to:</p></li>
                             <li><v-select multiple class="rforwardto" placeholder="Select Employee" v-model="draftform.notesreturnforward" :reduce="employees => employees.id" :options="users"/></li>
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
                                  <input class="form-check-input" type="checkbox" :value="action.id" :id="`action-${action.id}`"  v-model="draftform.actions">
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
                <div class="remarksInput" ref="comdrfttxt" contenteditable="true" v-html="draftform.remarks" @blur="getContent"></div>
            </div>
        </div>
        

        <AttachFile :attachments="draftform.uploadedfiles" :err="fileattacherr" @getUploadedFile="updateUploaded" />


        <div class="form-row">
            <div class="col mt-3 text-end">

                <router-link :to="{ name: 'communications-draft.index' }" class="btn btn-secondary me-1">Cancel</router-link>
                <button type="submit" @click.prevent="sendUpdatedDraft" class="btn btn-blue">Send</button>
            </div>
        </div>        
    </form>
    
</template>

<script>
    import { reactive,inject, ref, onMounted,defineAsyncComponent } from "vue";


    import useCommunicationsDraft from '@/composables/composables-communicationsdraft';



    import useDocumentTypes from '@/composables/composables-documenttypes';
    import useCommunicationGroups from '@/composables/composables-communicationgroups';


    import useClassifications from '@/composables/composables-classifications';
    import useNotes from '@/composables/composables-notes';
    import useActions from '@/composables/composables-actions';
    import useEmployees from '@/composables/composables-employees';
    import 'vue-select/dist/vue-select.css';
    import {useRouter,onBeforeRouteLeave} from 'vue-router'
    import moment from 'moment';
    import useManageFile from '@/composables/composables-managefile';
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
        props: {
            id: {
                required: true,
                type: String
            }
        },
        setup(props){
            useHead({
                title: 'Communication Draft Edit | '+import.meta.env.VITE_BFAR_AGENCY
            })
            const swal = inject('$swal')
            const fileattacherr = ref('');
            const {emit}=useEventsBus()
            const allSelected = ref(false);
            const {classifications, getClassifications} = useClassifications()
            const {documenttypes, getDocumentTypes} = useDocumentTypes()
            const {communicationgroups, getCommunicationGroups} = useCommunicationGroups()
            const {notes, getNotes} = useNotes()
            const {actions, getActions} = useActions()
       
            const {employees, getEmployeeOptions} = useEmployees()
            const torInclusive = ref(false);
            const {uploadTempAttachment, attachedtemp} = useManageFile()
            const asdraftpage = ref(true);
            const st_recipients = useRecipients();

            
            const {getCommunicationDraft, draft, updateCommunicationDraft, errors, sendCommunicationDraft} = useCommunicationsDraft()

            
            const totalEmpinGroups = reactive({
                'total': 0
            });



            const fileSize = ref(0);

            const draftform = reactive({
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

                getCommunicationDraft(props.id).then(res =>{



                    draftform.datetimein = draft.value.datetimein;
                    draftform.sender = draft.value.sender;
                    draftform.agency = draft.value.agency;
                    draftform.subject = draft.value.subject;
                    draftform.venue = draft.value.venue;
                    draftform.documenttype = draft.value.documenttype_id;
                    draftform.classification = draft.value.classification_id;
                    draftform.allunits = draft.value.allunits;
                    draftform.allgroups = draft.value.allgroups;


                    if(draft.value.withinclusivedates == 1){

                        draftform.hasinclusive = true;
                        draftform.inclusivedates = [draft.value.inclusivedatestart, draft.value.inclusivedateend];
                        torInclusive.value = true;
                    }else{

                        draftform.hasinclusive = false;
                        draftform.inclusivedates = '';
                        torInclusive.value = false;
                    }

                    if(draft.value.receivers.length > 0){

                        draftform.sendto = draft.value.receivers.map(i => parseInt(i['id']));
                    }
    
                    if(draft.value.notes.length > 0){
                        draftform.notes = draft.value.notes.map(i => parseInt(i['id']));
                    }
                    if(draft.value.actions.length > 0){
                        draftform.actions = draft.value.actions.map(i => parseInt(i['id']));
                    }

                    chkBoxNote();                   

                    draftform.notesphotocopy = draft.value.noteCopies;

                    if(draft.value.returnforward.length > 0){
                        draftform.notesreturnforward = draft.value.returnforward.map(i => parseInt(i['id']));
                    }
                    if(draft.value.communicationgroups.length > 0){
                        draftform.commgroupids = draft.value.communicationgroups.map(i => parseInt(i['id']));
                    }
                    draftform.remarks = draft.value.remarks;

                    draftform.uploadedfileid = draft.value.attachments.map(i => parseInt(i['id']));
                  

                    for (var i of draft.value.attachments) {
                        const fileSize = (i.filesize < 1024) ? i.filesize +' KB' : (i.filesize / (1024*1024)).toFixed(2)+' MB';
                        draftform.uploadedfiles.push({id: i.id,name: i.filename, size: fileSize,fileextension: i.fileextension, filepath: i.filepath});
                    }

                    st_recipients.setselectedunitheads(draftform.sendto);
                    st_recipients.setselectedunitgroups(draftform.selectedunits);
                    st_recipients.setselectedunitheadgroups(draftform.commgroupids);
                    st_recipients.setallunits(draftform.allunits);
                    st_recipients.setallgroups(draftform.allgroups);

                }),

                getDocumentTypes(),
                getClassifications(),
                getCommunicationGroups().then(res =>{
                    for (var i in communicationgroups.value) {
                        totalEmpinGroups.total = parseInt(totalEmpinGroups.total  + communicationgroups.value[i].employees.length);
                    }          

                }),
                getNotes(),
                getActions(),
                getEmployeeOptions()

            })

            const checkifHasData = () =>{
                if(draftform.datetimein != '' || draftform.sender !='' || draftform.agency != '' || draftform.subject != '' ||draftform.venue != '' || draftform.documenttype != '' || draftform.inclusivedates != '' ||draftform.classification != '' || draftform.notesphotocopy != '' || draftform.remarks != '' ||draftform.commgroupids.length != 0 || draftform.sendto.length != 0 ||draftform.notes.length != 0 ||draftform.notesreturnforward.length != 0 || draftform.actions.length != 0 || draftform.uploadedfileid.length != 0){
                    updateasDraft();
                }
            }
          
            onBeforeRouteLeave((to, from) => {
              if(asdraftpage.value){
                checkifHasData()
              }
            });
            const updateasDraft = async() =>{

                asdraftpage.value = false;

                await updateCommunicationDraft(props.id,{ ...draftform });
            }
            const sendUpdatedDraft = async() =>{
                await sendCommunicationDraft(props.id,{ ...draftform }).then(() => {
                    if(!errors.value){
                        swal.fire({
                            toast: true,
                            position: 'top-end',
                            title: 'Draft Successfully Sent',
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

                        emit('reload',true);
                    }else{
                        if(errors.value.uploadedfileid){
                            fileattacherr.value = errors.value.uploadedfileid[0];
                        }
                    }
                });
            }
            
            const chkchild = async (pID) =>{
                allSelected.value = false;
                var index = draftform.commgroupids.indexOf(pID);

                if(index !== -1){
                    draftform.commgroupids.splice(index,1);
                }

                let tempLenght = 0;
                let tmexist = 0;

                for (var x in communicationgroups.value) {
                    if(communicationgroups.value[x].id == pID){                       
                        tempLenght = communicationgroups.value[x].employees.length;

                        for (var i in communicationgroups.value[x].employees) {
                            if(draftform.sendto.includes(communicationgroups.value[x].employees[i].id)){
                                tmexist++;
                            }
                        }          

                    }
                }

                if(tempLenght == tmexist){
                    draftform.commgroupids.push(pID);
                }

                if(totalEmpinGroups.total ==  draftform.sendto.length){
                    allSelected.value = true;
                }
            }
            const chkparent = async(id) => {
                const tempP = [];
                const tempS = draftform.sendto;
                for (var x in communicationgroups.value) {
                    if(communicationgroups.value[x].id == id){
                        if(communicationgroups.value[x].employees){
                            for (var i in communicationgroups.value[x].employees) {
                                tempP.push(communicationgroups.value[x].employees[i].id);
                            }
                        }
                    }
                }
                if (draftform.commgroupids.includes(id)) {
                    const tempConcat =  [...tempS,...tempP];
                    draftform.sendto = [...new Set(tempConcat)];
                }else{                    
                    for (var i in tempP) {
                        var index = draftform.sendto.indexOf(tempP[i]);
                        if(index !== -1){
                            draftform.sendto.splice(index,1);
                        }
                    }                          
                }

                if(totalEmpinGroups.total ==  draftform.sendto.length){
                    allSelected.value = true;
                }else{
                   allSelected.value = false; 
                }
            }
            const checkAll = async() => {

                if(allSelected.value){
                    draftform.sendto = [];
                    let tempAllArr = [];

                    for (var x in communicationgroups.value) {
                        draftform.commgroupids.push(communicationgroups.value[x].id);
                        if(communicationgroups.value[x].employees){
                            for (var i in communicationgroups.value[x].employees) {
                                tempAllArr.push(communicationgroups.value[x].employees[i].id);
                            }
                        }
                    }
                    draftform.sendto = [...new Set(tempAllArr)];

                }else{
                    draftform.sendto = [];
                    draftform.commgroupids = [];
                }
            }

            const shoWCopies = ref(false);
            const showReturnForward = ref(false);
            const showInclusives = ref(false);

            const chkBoxNote = () => {

                if(draftform.notes.includes(8)){
                    shoWCopies.value = true;
                }else{
                    shoWCopies.value = false;
                    draftform.notesphotocopy = '';
                }
                if(draftform.notes.includes(15)){
                    showReturnForward.value = true;
                }else{
                    showReturnForward.value = false;
                    draftform.notesreturnforward = [];
                }
            }

            const filterNonNumeric = (e) =>{
                let keyCode = (e.keyCode ? e.keyCode : e.which);
                if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
                    e.preventDefault();
                }
            }


            const showCheckInclusiveDate = () =>{

                if(draftform.documenttype != 5 || draftform.documenttype != 8 || draftform.documenttype != 15){
                    showInclusives.value = false;
                    draftform.hasinclusive = false;
                    torInclusive.value = false;
                }else{
                    showInclusives.value = true;
                    draftform.hasinclusive = true;
                    torInclusive.value = true;
                }
            }    
            const checkInclusive = () =>{
                torInclusive.value = !torInclusive.value;
            }
            const updateUploaded = (attachids) =>{

                draftform.uploadedfileid = [];
                for(const attachid in attachids){
                    draftform.uploadedfileid.push(attachids[attachid]);
                }
                
            }
            const comdrfttxt = ref();
            const getContent = (evt) => {
                draftform.remarks = evt.target.innerHTML;
            }   
            return{
                documenttypes,
                classifications,
                communicationgroups,
                notes,
                draftform,
                errors,
                chkparent,
                checkAll,
                allSelected,
                chkchild,
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
                sendUpdatedDraft,
                getContent,
                comdrfttxt
            }
        }
    }
</script>

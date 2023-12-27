<template>
    <div class="row">
        <div class="col">
            <div class="formWraps tblWrap bg-light p-4">
                <div class="row">
                    <div class="col-12">
                        <span class="fs-5 d-block mb-2"><strong>Communications</strong></span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-2">
                        <div class="card p-2 bg-success">
                            <form @submit.prevent="ClearAllUnattached">
                                <span class="d-block fs-2 text-center text-light"><i class="fa-solid fa-broom"></i></span>
                                <span class="form-label w-100 text-center f-left d-block text-light">Clear All Unattached Files</span>
                                <button type="submit" class="btn btn-info w-100" title="Clear All Unattached Files"> Clear</button>        
                            </form>                            
                        </div>
                    </div>
                    <div class="col-2">
                        <div class="card p-2 bg-success" :class="formSMS.communicationsms == 1 ? 'bg-success' : 'bg-danger'">
                            <form @submit.prevent="smsStatusClickCommunications">
                                <span class="d-block fs-2 text-center text-light"><i class="fa-solid fa-broom"></i></span>
                                <span class="form-label w-100 text-center f-left d-block text-light">SMS Status Communications</span>
                                <button type="submit" class="btn btn-info w-100" title="Clear All Unattached Files">
                                    <template v-if="formSMS.communicationsms == 1">                                        
                                        <span class="text-danger">Disable</span>                                        
                                    </template>
                                    <template v-else>
                                        Enable
                                    </template>
                                </button>        
                            </form>                            
                        </div>
                    </div>
                </div>
                <div class="row">                    
                    <div class="col-12 mt-3">
                        <hr>
                        <span class="d-block text-danger mb-2">* Ask Developer!</span>
                    </div>
                    <div class="col-2">
                        <div class="card p-2 bg-danger mb-2">
                            <form @submit.prevent="clearTempAttachment">
                                <span class="d-block fs-2 text-center text-light"><i class="fa-solid fa-triangle-exclamation"></i></span>
                                <span class="form-label w-100 text-center f-left d-block text-light">Clear Temporary Attachment</span>
                                <button type="submit" class="btn btn-secondary w-100" title="Clear Temporary Attachment"> Clear</button>        
                            </form>
                            
                        </div>
                    </div>
                    <div class="col-2">
                        <div class="card p-2 bg-danger mb-2">
                            <form @submit.prevent="clearAllCommunications">
                                <span class="d-block fs-2 text-center text-light"><i class="fa-solid fa-triangle-exclamation"></i></span>
                                <span class="form-label w-100 text-center f-left d-block text-light">Clear All Communications</span>
                                <button type="submit" class="btn btn-secondary w-100" title="Clear All Communications"> Clear</button>        
                            </form>
                            
                        </div>
                    </div>
                    <div class="col-2">
                        <div class="card p-2 bg-danger mb-2">
                            <form @submit.prevent="clearAllNotifications">
                                <span class="d-block fs-2 text-center text-light"><i class="fa-solid fa-triangle-exclamation"></i></span>
                                <span class="form-label w-100 text-center f-left d-block text-light">Clear All Notifications</span>
                                <button type="submit" class="btn btn-secondary w-100" title="Clear All Notifications"> Clear</button>        
                            </form>
                            
                        </div>
                    </div>
                    <div class="col-2">
                        <div class="card p-2 bg-danger mb-2">
                            <form @submit.prevent="clearAllDraft">
                                <span class="d-block fs-2 text-center text-light"><i class="fa-solid fa-triangle-exclamation"></i></span>
                                <span class="form-label w-100 text-center f-left d-block text-light">Clear All Draft</span>
                                <button type="submit" class="btn btn-secondary w-100" title="Clear All Draft"> Clear</button>        
                            </form>
                            
                        </div>
                    </div>
                    <div class="col-2">
                        <div class="card p-2 bg-danger mb-2">
                            <form @submit.prevent="ClearAllActionsTaken">
                                <span class="d-block fs-2 text-center text-light"><i class="fa-solid fa-triangle-exclamation"></i></span>
                                <span class="form-label w-100 text-center f-left d-block text-light">Clear All Actions Taken</span>
                                <button type="submit" class="btn btn-secondary w-100" title="Clear All Actions Taken"> Clear</button>        
                            </form>
                            
                        </div>
                    </div>
                    <div class="col-2">
                        <div class="card p-2 bg-danger mb-2">
                            <form @submit.prevent="clearAllRevisions">
                                <span class="d-block fs-2 text-center text-light"><i class="fa-solid fa-triangle-exclamation"></i></span>
                                <span class="form-label w-100 text-center f-left d-block text-light">Clear All Revisions</span>
                                <button type="submit" class="btn btn-secondary w-100" title="Clear All Actions Taken"> Clear</button>        
                            </form>
                            
                        </div>
                    </div>
                    <div class="col-2">
                        <div class="card p-2 bg-danger mb-2">
                            <form @submit.prevent="clearAllTrash">
                                <span class="d-block fs-2 text-center text-light"><i class="fa-solid fa-triangle-exclamation"></i></span>
                                <span class="form-label w-100 text-center f-left d-block text-light">Clear All Trash</span>
                                <button type="submit" class="btn btn-secondary w-100" title="Clear All Actions Taken"> Clear</button>        
                            </form>
                            
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { reactive,inject,ref, onMounted} from "vue";

    import useDebug from "@/composables/composables-zzdebug";
    

    export default {
        setup(){
            const form = reactive({
                'data': ''
            });

            const swal = inject('$swal')
            
            const { errors, clearAttachment, clearCommunications,clearNotifications, clearActionsTaken, clearDrafts,clearUnattached,
            clearRevisions, clearTrash, getSMSStatusCommunications, smsstatuscommunications, updateSMSStatusCommunications} = useDebug()

            const formSMS = reactive({
                'communicationsms' : ''
            });
            onMounted(() => {
                getSMSStatusCommunications().then(() => {

                    formSMS.communicationsms = smsstatuscommunications.value.smsstatus;

                });
            })
            const swalfire = async () =>{

                swal.fire({
                            toast: true,
                            position: 'top-end',
                            title: 'Successfully Cleared',
                            showConfirmButton: false,            
                            icon: 'success',
                            width: '300',
                            padding: '.5em 1em',
                            timerProgressBar: true,
                            timer:1500,
                            customClass: {
                                container: 'swaltopright-del'
                            }
                        })
            };
            const clearTempAttachment = async () => {
                form.data = 'Clear Temporary Attachment';

                await clearAttachment({ ...form }).then(() => {
                    if(!errors.value){
                        swalfire();
                    }
                });
            }
            const clearAllCommunications = async () => {
                form.data = 'Clear Communications';

                await clearCommunications({ ...form }).then(() => {
                    if(!errors.value){
                        swalfire();
                    }
                });
            }

            const clearAllNotifications = async () => {
                form.data = 'Clear Communications';

                await clearNotifications({ ...form }).then(() => {
                    if(!errors.value){
                        swalfire();
                    }
                });
            }
            //
            const clearAllDraft = async () => {
                form.data = 'Clear Darft';

                await clearDrafts({ ...form }).then(() => {
                    if(!errors.value){
                        swalfire();
                    }
                });
            }
            const ClearAllActionsTaken = async () => {
                form.data = 'Clear Comments';

                await clearActionsTaken({ ...form }).then(() => {
                    if(!errors.value){
                        swalfire();
                    }
                });
            }
            const ClearAllUnattached = async () => {
                form.data = 'Clear Unattached';

                await clearUnattached({...form}).then(() =>{
                    if(!errors.value){
                        swalfire();
                    }
                })
            }
            const clearAllRevisions = async () =>{
                form.data = 'Clear Revisions';
                await clearRevisions({...form}).then(() =>{
                    if(!errors.value){
                        swalfire();
                    }
                })
            }
            const clearAllTrash = async () =>{
                form.data = 'Clear Trash';
                await clearTrash({...form}).then(() =>{
                    if(!errors.value){
                        swalfire();
                    }
                })
            }
            const smsStatusClickCommunications = async() => {

                if(formSMS.communicationsms == 1){
                    formSMS.communicationsms = 0;
                }else{
                    formSMS.communicationsms = 1;
                }

                await updateSMSStatusCommunications({...formSMS}).then(() =>{
                    if(!errors.value){
                        swal.fire({
                            toast: true,
                            position: 'top-end',
                            title: 'Successfully Updated',
                            showConfirmButton: false,            
                            icon: 'success',
                            width: '300',
                            padding: '.5em 1em',
                            timerProgressBar: true,
                            timer:1500,
                            customClass: {
                                container: 'swaltopright-del'
                            }
                        })
                    }

                    getSMSStatusCommunications().then(() => {
                        formSMS.communicationsms = smsstatuscommunications.value.smsstatus;
                        console.log(formSMS.communicationsms);
                    });
                });
            }
            return{
                form,
                errors,
                clearTempAttachment,
                clearAllCommunications,
                clearAllNotifications,
                ClearAllActionsTaken,
                clearAllDraft,
                ClearAllUnattached,
                clearAllRevisions,
                clearAllTrash,
                formSMS,
                smsStatusClickCommunications
            }
        }
    }
</script>
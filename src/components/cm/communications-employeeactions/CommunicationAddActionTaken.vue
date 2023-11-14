<template>
    <div class="row">
        <div class=" col pb-4 pt-2">
            <div class="at--BoxWrap">               
                <div>
                    <span class="d-block mb-1"><strong>Add Actions Taken</strong></span>
                    <div class="actiontakenMessage" ref="actxt" contenteditable="true" @blur="getContent"></div>
                    <div class="comm--AT--attachments">
                        <AttachFileCommunication :attachments="bid" @getUploadedFile="updateUploaded"/>
                    </div>
                </div>
                <div class="mt-2">
                    <div class="at--BoxWrap--actionsButtons">
                        <ul class="at__BoxWrap__actionsButtons__list">
                            <li>
                                <button class="btn-primary btn btn-submit" @click.prevent="submitActionTaken">Submit</button>
                            </li>
                            <li>                                
                                <label for="AT-toattach" class="AT-toattach-btn" title="Attach Files"><i class="fa-solid fa-paperclip"></i></label>
                                <input type="file" name="drpfiles" id="AT-toattach" class="AT-toattach" multiple @change="atselectedfiles"/>
                            </li>
                        </ul>                        
                    </div>
                    <div class="at--BoxWrap--actionsButtons">
                        <button class="btn btn-removeAT" title="Delete" @click.prevent="removeactiontaken"><i class="fa-solid fa-trash-can"></i></button>
                    </div>
                </div>               
            </div>
        </div>       

    </div>


</template>
<script>    
    import {ref,reactive, onMounted} from "vue";

    import useEventsBus from '@/components/helper/Eventbus';
    import useActionsTaken from '@/composables/composables-actionstaken'

    import AttachFileCommunication from '@/components/cm/reusables/AttachFileCommunication.vue'

    export default{
        props: {
            id: {
                required: true,
                type: String
            }
        },
        components: {
            AttachFileCommunication
        },
        setup(props){

            const actxt = ref();
            const {errors,storeActionTaken} = useActionsTaken()
     

            const {emit} = useEventsBus();

            const actioncontent = reactive({
                'communicationID': props.id,
                'message':'',
                'uploadedfileid': []
            });

            const updateUploaded = (attachids) =>{
                actioncontent.uploadedfileid = [];
                for(const attachid in attachids){
                    actioncontent.uploadedfileid.push(attachids[attachid]);
                }
            }


            const submitActionTaken = async(evt) =>{
                await storeActionTaken({...actioncontent}).then(() =>{
                    emit('actionbox', false);
                    actioncontent.message = '';
                });
            }
            const chkheight = () =>{
                let text = document.getElementById("commentTextArea");
                text.style.height = text.scrollHeight+5 + "px";
            }
            const removeactiontaken = () =>{
                emit('actionbox', false);
                actioncontent.message = '';
            }
            const getContent = (evt) => {
                actioncontent.message = evt.target.innerHTML;
            }
            const bid = ref([]);

            const atselectedfiles = async() => {     
                bid.value = document.querySelector('.AT-toattach').files;
                emit('rprops',true);
            }
            return {
                props,
                submitActionTaken,
                actioncontent,

                chkheight,
                removeactiontaken,
                errors,
                getContent,
                actxt,
                bid,
                atselectedfiles,
                updateUploaded

            }
        }
    }
</script>
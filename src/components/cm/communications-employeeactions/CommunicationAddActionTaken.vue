<template>
    <div class="row">
        <div class="col pb-4 pt-2 rAb">
            <div class="at--BoxWrap">               
                <div class="at--BoxWrap--content">
                    <div class="actiontakenMessage" ref="actxt" contenteditable="true"  @blur="getContent"></div>
                    <div class="comm--AT--attachments">
                        <AttachFileCommunication :attachments="bid" @getUploadedFile="updateUploaded"/>
                    </div>
                </div>
                <div class="at--BoxWrap--actions">
                    <div>
                        <button class="btn btn-secondary" title="Delete" @click.prevent="removeactiontaken">Cancel</button>
                    </div>
                    <div>
                        <label for="AT-toattach" class="btn btn-semiblue" title="Attach Files"><i class="fa-solid fa-paperclip"></i> Attach</label>
                        <input type="file" name="drpfiles" id="AT-toattach" class="AT-toattach" multiple @change="atselectedfiles"/>
                    </div>
                    <div>
                        <button class="btn btn-save" @click.prevent="submitActionTaken">Submit</button>
                    </div>
                    
                    
                </div>               
            </div>
        </div>       

    </div>


</template>
<script>    
    import {ref,reactive, onMounted,defineAsyncComponent} from "vue";

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
                emit('cancelallat', 1);
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
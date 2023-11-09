<template>
    <div class="row">
        <div class=" col pb-4 pt-2">
            <div class="at--BoxWrap">               
                <div>
                    <span class="d-block mb-1"><strong>Add Action Taken</strong></span>
                    <div class="actiontakenMessage" ref="actxt" contenteditable="true" @blur="getContent"></div>

                </div>
                <div class="mt-2">
                    <div class="at--BoxWrap--actionsButtons">
                        <button class="btn-primary btn btn-submit" @click.prevent="submitActionTaken">Submit</button>
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


    export default{
        props: {
            id: {
                required: true,
                type: String
            }
        },
        setup(props){

            const actxt = ref();
            const {errors,storeActionTaken} = useActionsTaken()
     

            const {emit} = useEventsBus();

            const actioncontent = reactive({
                'communicationID': props.id,
                'message':''
            });

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

            return {
                props,
                submitActionTaken,
                actioncontent,

                chkheight,
                removeactiontaken,
                errors,
                getContent,
                actxt

            }
        }
    }
</script>
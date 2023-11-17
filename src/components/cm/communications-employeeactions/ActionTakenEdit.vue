<template> 
    <template v-if="hld">
        <LoadingComponentDiv/>
    </template>
    <div class="row">
        <div class="col-md-12 p-title">
            <h2>Edit Actions Taken</h2>
        </div>
    </div>
    <form @submit.prevent="saveAction" class="bg-light tblWrap mb-3 py-3 px-3">
        <div class="card mb-2  plr py-2" v-if="actiontaken.communication">
            <div class="row">
                <div class="col">
                    <span class="lblM">Communication Details</span>
                </div>
            </div>
            <div class="row">
                <div class="col mb-1">
                    <div class="form-floating fflabel">
                        <span class="form-control">{{actiontaken.communication.documentnumber}}</span>
                        <span class="sp-label">Document Number</span>
                    </div>
                </div>
                <div class="col mb-1">
                    <div class="form-floating fflabel">
                        <span class="form-control">
                            {{actiontaken.communication.agency}}
                            <template v-if="actiontaken.communication.subject">
                                | {{actiontaken.communication.subject}}
                            </template>
                        </span>

                        <span class="sp-label">Agency | Subject</span>
                    </div>
                </div>
                <div class="col mb-1">
                    <div class="form-floating fflabel">
                        <span class="form-control">
                            <template v-if="actiontaken.communication.documenttype">
                                {{actiontaken.communication.documenttype.name}}
                            </template>
                            <template v-if="actiontaken.communication.classification">
                                - {{actiontaken.communication.classification.name}}
                            </template>                 
                        </span>
                        <span class="sp-label">Document Type - Classification</span>
                    </div> 
                </div>
                
            </div>
        </div>
        <div class="form-floating req">                               
            <div class="actiontakenMessage" ref="actxt" v-html="actioncontent.message" contenteditable="true" @blur="getContent"></div>     
        </div>
        <div class="form-row">
            <div class="col mt-3 text-end">
                <router-link :to="{name: 'actionstaken.index'}" class="btn btn-secondary me-1">Cancel</router-link>
                <button type="submit" class="btn btn-blue"> Update</button>
            </div>
        </div>
        
    </form>
</template>

<script>
    import { reactive, onMounted, ref, inject} from "vue";

    import useActionsTaken from "@/composables/composables-actionstaken";
    import LoadingComponentDiv from '@/components/loader/LoadingComponentDiv.vue'
    import { useHead } from '@unhead/vue'

    export default {
        components: {
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
                title: 'Edit Actions Taken | '+import.meta.env.VITE_BFAR_AGENCY
            })
            const swal = inject('$swal')

            const { errors, editActionTaken, updateActionTaken, actiontaken } = useActionsTaken()
            const actioncontent = reactive({
                'message':''
            });
            const hld = ref(true);
            onMounted(
                () => {
                    editActionTaken(props.id).then(() => {
                        actioncontent.message = actiontaken.value.message;
                        hld.value = false;
                    })
                }
            )
            const saveAction = async (id) => {
                await updateActionTaken(props.id,{...actioncontent}).then(() => {
                    if(!errors.value){
                        swal.fire({
                            toast: true,
                            position: 'top-end',
                            title: 'Action Successfully Updated',
                            showConfirmButton: false,            
                            icon: 'success',
                            width: '300',
                            padding: '.5em 1em',
                            timerProgressBar: true,
                            timer:1500,
                            customClass: {
                                container: 'swaltopright-up'
                            }
                        })
                    }
                })
            }
            const getContent = (evt) => {
                actioncontent.message = evt.target.innerHTML;
            }
            return{
                errors,
                actioncontent,
                actiontaken,
                saveAction,
                getContent,
                hld
            }
        }
    }
</script>
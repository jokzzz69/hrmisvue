<template> 
    <template v-if="pageLoader">
        <LoadingComponentDiv/>
    </template>
    <div class="row">
        <div class="col-md-12 p-title">
            <h2>Edit Communication Group</h2>
        </div>
    </div>
    <form @submit.prevent="saveCommunicationGroup" class="bg-light tblWrap mb-3 py-3 px-3">
            <div class="row">
                <div class="col">
                    <div class="form-floating req">                               
                        <input type="text" name="name" placeholder="enter name" id="name" class="form-control" :class="errors.name ? 'is-invalid' : ''" v-model="communicationgroup.name">  
                        <label for="name" class="form-label">Name</label>     
                        <span v-if="errors.name" class="text-danger m-error">{{errors.name[0]}}</span>         
                    </div>
                </div>

                <div class="col-1">
                    <div class="form-floating req">                
                        <input type="text" name="cg_code" placeholder="enter code" id="cg_code" class="form-control" :class="errors.cg_code ? 'is-invalid' : ''" v-model="communicationgroup.cg_code">
                        <label for="cg_code" class="form-label">CODE</label>                
                        <span v-if="errors.cg_code" class="text-danger m-error">{{errors.cg_code[0]}}</span> 
                    </div>
                </div>
            </div>
        <div class="form-row">
            <div class="col mt-3 text-end">
                <router-link :to="{name: 'communicationgroups.index'}" class="btn btn-secondary me-1">Cancel</router-link>
                <button type="submit" class="btn btn-blue"> Update</button>
            </div>
        </div>
        
    </form>
</template>

<script>
    import { reactive, onMounted, ref, inject} from "vue";

    import useCommunicationGroups from "@/composables/composables-communicationgroups";
    import { useHead } from '@unhead/vue'
    import LoadingComponentDiv from '@/components/loader/LoadingComponentDiv.vue';

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
                title: 'Settings - Edit Communication Group | BFAR - CAR HRMIS'
            })
            const swal = inject('$swal')

            const { errors, getCommunicationGroup, updateCommunicationGroup, communicationgroup } = useCommunicationGroups()
            const pageLoader = ref(true);
            onMounted(() => {
                getCommunicationGroup(props.id).then(() => {
                    pageLoader.value = false;
                })
            })
            const saveCommunicationGroup = async (id) => {
                await updateCommunicationGroup(props.id).then(() => {
                    if(!errors.value){
                        swal.fire({
                            toast: true,
                            position: 'top-end',
                            title: 'Communication Group Successfully Updated',
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
            
            return{
                errors,
                communicationgroup,
                saveCommunicationGroup,
                pageLoader
            }
        }
    }
</script>
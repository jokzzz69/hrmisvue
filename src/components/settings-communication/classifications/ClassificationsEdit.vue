<template> 
    <template v-if="pageLoader">
        <LoadingComponentDiv/>
    </template>
    <div class="row">
        <div class="col-md-12 p-title">
            <h2>Edit Classification</h2>
        </div>
    </div>
    <form @submit.prevent="saveClassification" class="bg-light tblWrap mb-3 py-3 px-3">
            <div class="form-floating req">                               
                <input type="text" name="name" placeholder="enter name" id="name" class="form-control" :class="errors.name ? 'is-invalid' : ''" v-model="classification.name">  
                <label for="name" class="form-label">Name</label>     
                <span v-if="errors.name" class="text-danger m-error">{{errors.name[0]}}</span>         
            </div>
        <div class="form-row">
            <div class="col mt-3 text-end">
                <router-link :to="{name: 'classifications.index'}" class="btn btn-secondary me-1">Cancel</router-link>
                <button type="submit" class="btn btn-blue"> Update</button>
            </div>
        </div>
        
    </form>
</template>

<script>
    import { reactive, onMounted, ref, inject} from "vue";

    import useClassifications from "@/composables/composables-classifications";
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
                title: 'Settings - Edit Classification | '+import.meta.env.VITE_BFAR_AGENCY
            })
            const swal = inject('$swal')

            const { errors, getClassification, updateClassification, classification } = useClassifications()
            const pageLoader = ref(true);
            onMounted(() => {
                    getClassification(props.id).then(() =>{
                        pageLoader.value = false;
                    })
                }
            )
            const saveClassification = async (id) => {
                await updateClassification(props.id).then(() => {
                    if(!errors.value){
                        swal.fire({
                            toast: true,
                            position: 'top-end',
                            title: 'Classification Successfully Updated',
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
                classification,
                saveClassification,
                pageLoader
            }
        }
    }
</script>
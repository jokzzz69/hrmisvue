<template> 
    <div class="row">
        <div class="col-md-12 p-title">
            <h2>New Document Type</h2>
        </div>
    </div>

        <form @submit.prevent="saveDocumentType" class="bg-light tblWrap mb-3 py-3 px-3">
            <div class="form-floating req">                
                <input type="text" name="name" placeholder="enter name" id="name" class="form-control" :class="errors.name ? 'is-invalid' : ''" v-model="form.name">
                <label for="name" class="form-label">Name</label>                
                <span v-if="errors.name" class="text-danger m-error">{{errors.name[0]}}</span> 
            </div>

        <div class="form-row">
            <div class="col mt-3 text-end">
                <router-link :to="{name: 'documenttypes.index'}" class="btn btn-secondary me-1">Cancel</router-link>
                <button type="submit" class="btn btn-save"> Save</button>
            </div>
        </div>
        
    </form>


    
</template>

<script>
    import { reactive,inject} from "vue";

    import useDocumentTypes from "@/composables/composables-documenttypes";

    import { useHead } from '@unhead/vue'

    export default {
        setup(){
            useHead({
                title: 'Settings - Create Document Types | '+import.meta.env.VITE_BFAR_AGENCY
            })
            const form = reactive({
                'name': '',
            });

            const swal = inject('$swal')
            
            const { errors, storeDocumentType } = useDocumentTypes()

            const saveDocumentType = async () => {
                await storeDocumentType({ ...form }).then(() => {
                    if(!errors.value){
                        swal.fire({
                            toast: true,
                            position: 'top-end',
                            title: 'Document Type Successfully Created',
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
                    }
                });
            }
            
            return{
                form,
                errors,
                saveDocumentType
            }
        }
    }
</script>
<template> 
    <div class="row">
        <div class="col-md-12 p-title">
            <h2>New Note</h2>
        </div>
    </div>

        <form @submit.prevent="saveNote" class="bg-light tblWrap mb-3 py-3 px-3">
            <div class="form-floating req">                
                <input type="text" name="name" placeholder="enter name" id="name" class="form-control" :class="errors.name ? 'is-invalid' : ''" v-model="form.name">
                <label for="name" class="form-label">Name</label>                
                <span v-if="errors.name" class="text-danger m-error">{{errors.name[0]}}</span> 
            </div>

        <div class="form-row">
            <div class="col mt-3 text-end">
                <router-link :to="{name: 'notes.index'}" class="btn btn-secondary me-1">Cancel</router-link>
                <button type="submit" class="btn btn-blue"> Save</button>
            </div>
        </div>
        
    </form>


    
</template>

<script>
    import { reactive,inject} from "vue";

    import useNotes from "@/composables/composables-notes";

    import { useHead } from '@unhead/vue'

    export default {
        setup(){
            useHead({
                title: 'Settings - Create Note | '+import.meta.env.VITE_BFAR_AGENCY
            })
            const form = reactive({
                'name': '',
            });

            const swal = inject('$swal')
            
            const { errors, storeNote } = useNotes()

            const saveNote = async () => {
                await storeNote({ ...form }).then(() => {
                    if(!errors.value){
                        swal.fire({
                            toast: true,
                            position: 'top-end',
                            title: 'Note Successfully Created',
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
                saveNote
            }
        }
    }
</script>
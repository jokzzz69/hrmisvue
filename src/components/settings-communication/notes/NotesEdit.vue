<template> 
    <template v-if="pageLoader">
        <LoadingComponentDiv/>
    </template>
    <div class="row">
        <div class="col-md-12 p-title">
            <h2>Edit Note</h2>
        </div>
    </div>
    <form @submit.prevent="saveNote" class="bg-light tblWrap mb-3 py-3 px-3">
            <div class="form-floating req">                               
                <input type="text" name="name" placeholder="enter name" id="name" class="form-control" :class="errors.name ? 'is-invalid' : ''" v-model="note.name">  
                <label for="name" class="form-label">Name</label>     
                <span v-if="errors.name" class="text-danger m-error">{{errors.name[0]}}</span>         
            </div>
        <div class="form-row">
            <div class="col mt-3 text-end">
                <router-link :to="{name: 'notes.index'}" class="btn btn-secondary me-1">Cancel</router-link>
                <button type="submit" class="btn btn-blue"> Update</button>
            </div>
        </div>
        
    </form>
</template>

<script>
    import { reactive, onMounted, ref, inject} from "vue";

    import useNotes from "@/composables/composables-notes";
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
                title: 'Settings - Edit Note | '+import.meta.env.VITE_BFAR_AGENCY
            })
            const swal = inject('$swal')

            const { errors, getNote, updateNote, note } = useNotes()
            const pageLoader = ref(true);
            onMounted(() => {
                    getNote(props.id).then(() =>{
                        pageLoader.value = false;
                    })
                }
            )
            const saveNote = async (id) => {
                await updateNote(props.id).then(() => {
                    if(!errors.value){
                        swal.fire({
                            toast: true,
                            position: 'top-end',
                            title: 'Note Successfully Updated',
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
                note,
                saveNote,
                pageLoader
            }
        }
    }
</script>
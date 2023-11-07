<template> 
    <div class="row">
        <div class="col-md-12 p-title">
            <h2>Edit Action</h2>
        </div>
    </div>
    <form @submit.prevent="saveAction" class="bg-light tblWrap mb-3 py-3 px-3">
        <div class="form-floating req">                               
            <input type="text" name="name" placeholder="enter name" id="name" class="form-control" :class="errors.name ? 'is-invalid' : ''" v-model="action.name">  
            <label for="name" class="form-label">Name</label>     
            <span v-if="errors.name" class="text-danger m-error">{{errors.name[0]}}</span>         
        </div>
        <div class="form-row">
            <div class="col mt-3 text-end">
                <router-link :to="{name: 'actions.index'}" class="btn btn-secondary me-1">Cancel</router-link>
                <button type="submit" class="btn btn-blue"> Update</button>
            </div>
        </div>
        
    </form>
</template>

<script>
    import { reactive, onMounted, ref, inject} from "vue";

    import useActions from "@/composables/composables-actions";
    import { useHead } from '@unhead/vue'

    export default {
        props: {
            id: {
                required: true,
                type: String
            }
        },
        setup(props){
            useHead({
                title: 'Settings - Edit Action | BFAR - CAR HRMIS'
            })
            const swal = inject('$swal')

            const { errors, getAction, updateAction, action } = useActions()
            onMounted(() => {getAction(props.id)})
            const saveAction = async (id) => {
                await updateAction(props.id).then(() => {
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
            
            return{
                errors,
                action,
                saveAction
            }
        }
    }
</script>
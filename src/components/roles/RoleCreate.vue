<template>
    <div class="row">
        <div class="col-md-12 p-title">
            <h2>New Role</h2>
        </div>
    </div>
    <form v-on:submit.prevent="saveRole">
        <div class="space-y-4 rounded-md shadow-sm"> 
            <div class="form-floating mb-2 req">                
                <input  placeholder="enter role name" @keyup="createslug" type="text" name="name"  id="name" :class="errors.name ? 'error-input' : ''" class="form-control" v-model="form.name">
                <label for="name" class="form-label">Role Name</label>
            </div>
            <span v-if="errors.name" class="text-danger m-error">{{errors.name[0]}}</span> 
            <div class="form-floating mb-2 req">                
                <input  placeholder="enter role slug" type="text" name="slug"  id="slug" :class="errors.slug ? 'error-input' : ''" class="form-control" v-model="form.slug">
                <label for="slug" class="form-label">Role Slug</label>
            </div>   
            <span v-if="errors.slug" class="text-danger m-error">{{errors.slug[0]}}</span> 
        </div>
        <div class="form-row">
            <div class="col text-end">
                <router-link :to="{name: 'roles.index'}" class="btn btn-secondary me-1">Cancel</router-link>
                <button type="submit" class="btn btn-primary">Save</button>
            </div>
        </div>
  
    </form>
</template>

<script>
    import { reactive ,inject} from "vue";
    import useRoles from '../../composables/composables-role';
    import { useHead } from '@unhead/vue'

    export default {
        setup(){
            useHead({
                title: 'Add Role | BFAR - CAR HRMIS'
            })
            const form = reactive({
                'name': '',
                'slug': '',
            })

            const swal = inject('$swal')

            const {errors, storeRole} = useRoles()
            const createslug = async () => {
                form.slug = form.name.toLowerCase().replace(/\s+/g,"-");
            }
            const saveRole = async () => {
                
                await storeRole({ ...form }).then(() => {
                    if(!errors.value){
                        swal.fire({
                            toast: true,
                            position: 'top-end',
                            title: 'Successfully Created',
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
                })
            }
            
            return{
                form,
                errors,
                saveRole,
                createslug
            }
        }
    }
</script>
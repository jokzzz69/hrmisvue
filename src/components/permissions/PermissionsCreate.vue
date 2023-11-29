<template>
    <div class="row">
        <div class="col-md-12 p-title">
            <h2>New Permission</h2>
        </div>
    </div>
    <form v-on:submit.prevent="savePermission">
        <div class="space-y-4 rounded-md shadow-sm"> 
            <div class="form-floating mb-2 req">                
                <input  placeholder="enter role name" @keyup="createslug" type="text" name="name"  id="name" :class="errors.name ? 'error-input' : ''" class="form-control" v-model="form.name">
                <label for="name" class="form-label">Permission Name</label>
            </div>
            <span v-if="errors.name" class="text-danger m-error">{{errors.name[0]}}</span> 
            <div class="form-floating mb-2 req">                
                <input  placeholder="enter role slug" type="text" name="slug"  id="slug" :class="errors.slug ? 'error-input' : ''" class="form-control" v-model="form.slug">
                <label for="slug" class="form-label">Permission Slug</label>
            </div>   
            <span v-if="errors.slug" class="text-danger m-error">{{errors.slug[0]}}</span> 
        </div>
        <div class="row">
            <div class="col-12">
                Assign to Role
            </div>
            <div class="col-12">
                <template v-if="roles">
                    <template v-for="role in roles" :key="role.id">
                        <div class="form-check">
                          <input class="form-check-input" type="radio" :value="role.id" v-model="form.roleid" :name="role.slug" :id="role.slug">
                          <label class="form-check-label" :for="role.slug">
                            {{role.name}}
                          </label>
                        </div>
                    </template>
                </template>
                
            </div>
        </div>
        <div class="form-row">
            <div class="col text-end">
                <router-link :to="{name: 'roles.index'}" class="btn btn-secondary me-1">Cancel</router-link>
                <button type="submit" class="btn btn-save">Save</button>
            </div>
        </div>
  
    </form>
</template>

<script>
    import { reactive ,inject, onMounted} from "vue";
    import usePermissions from '@/composables/composables-permissions';
    import useRole from '@/composables/composables-role';
    import { useHead } from '@unhead/vue'

    export default {
        setup(){
            useHead({
                title: 'Create Permission | '+import.meta.env.VITE_BFAR_AGENCY
            })
            const form = reactive({
                'name': '',
                'slug': '',
                'roleid': ''
            })

            const swal = inject('$swal')

            const {errors, storePermission} = usePermissions()
            const {getRoles,roles} = useRole()

            const createslug = async () => {
                form.slug = form.name.toLowerCase().replace(/\s+/g,"-");
            }
            const savePermission = async () => {
                
                await storePermission({ ...form }).then(() => {
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
            onMounted(() => {
                getRoles()
            })
            return{
                form,
                errors,
                savePermission,
                createslug,
                roles
            }
        }
    }
</script>
<template>
    <template v-if="pageLoader">
        <LoadingComponentDiv/>
    </template>
    <div class="row">
        <div class="col-md-12 p-title">
            <h2>Edit Permission</h2>
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
            <div class="col-4">
                <div class="card p-3">
                    <div class="title">
                        <strong> Assign to Role</strong>
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
            </div>
        </div>
        <div class="form-row">
            <div class="col text-end">
                <router-link :to="{name: 'permissions.index'}" class="btn btn-secondary me-1">Cancel</router-link>
                <button type="submit" class="btn btn-primary">Save</button>
            </div>
        </div>
  
    </form>
</template>

<script>
    import { reactive ,inject, onMounted, ref} from "vue";
    import usePermissions from '@/composables/composables-permissions';
    import useRole from '@/composables/composables-role';
    import { useHead } from '@unhead/vue'
    import LoadingComponentDiv from '@/components/loader/LoadingComponentDiv.vue';
    export default {
        components: {
            LoadingComponentDiv
        },
        props: {
            id:{
                required: true,
                type: String
            }
        },
        setup(props){
            useHead({
                title: 'Edit Permission | BFAR - CAR HRMIS'
            })
            const form = reactive({
                'name': '',
                'slug': '',
                'roleid': ''
            })

            const swal = inject('$swal')

            const {errors, updatePermission, getPermission, permission} = usePermissions()
            const {getRoles,roles} = useRole()

            const createslug = async () => {
                form.slug = form.name.toLowerCase().replace(/\s+/g,"-");
            }
            const savePermission = async () => {                
                await updatePermission(props.id,{...form}).then(() => {
                    if(!errors.value){
                        swal.fire({
                            toast: true,
                            position: 'top-end',
                            title: 'Successfully Updated',
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
            const pageLoader = ref(true);
            onMounted(() => {
                getPermission(props.id).then(() =>{
                    form.slug = permission.value.slug;
                    form.name = permission.value.name;
                    if(permission.value.roles){
                        if(permission.value.roles[0]){
                           form.roleid = permission.value.roles[0].id;
                        }
                        
                    }
                }),
                getRoles().then(() => {
                    pageLoader.value = false;
                })
            })
            return{
                form,
                errors,
                savePermission,
                createslug,
                roles,
                permission,
                pageLoader
            }
        }
    }
</script>
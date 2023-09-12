<template>
	<div class="row">
		<div class="col-md-12 p-title">
			<h2>Edit Account</h2>
		</div>
	</div>
    <form v-on:submit.prevent="saveUser">
        <div class="space-y-4 rounded-md">    
            
            <div class="row">
                <div class="col-auto lblname disabled">
                    <span class="form-label d-block bg-none">ID Number</span> 
                    <span class="fw-bold ms-1 form-control mhlabel"> {{user.employee_id}}</span>                 
                </div>
                <div class="col mb-2 lblname disabled">
                    <span class="form-label  d-block bg-none">Name</span>
                    <span class="form-control mhlabel">
                        <template v-if="user.userinformation != null">
                            <strong>{{user.userinformation.employee_fname}} {{user.userinformation.employee_mname}} {{user.userinformation.employee_lname}}</strong>
                        </template>                          
                    </span>
                </div>                  
            </div> 
            <div class="row">
                <template v-if="userrole == 'super-admin'">
                    <div class="col mb-2 txtuser req">
                        <div class="form-floating">
                            <input class="form-control" type="text" name="username" id="username" v-model="form.username" :class="errors.username ? 'error-input' : ''">
                            <label for="username">Username</label>
                        </div>
                        <span v-if="errors.username" class="text-danger m-error">{{errors.username[0]}}</span>
                    </div>
                    <div class="col mb-2 txtuser">
                        <div class="form-floating">
                            <input class="form-control error-input" type="password" placeholder="secret" name="overwrite" v-model="form.overwrite">
                            <label>Token Overwrite</label>
                        </div>

                    </div>

                </template>
                <template v-else>
                    <div class="col mb-2 lblname disabled">
                        <div class="form-floating">
                            <div class="form-floating">
                            <input class="form-control disabled" type="text" id="username" name="username" v-model="form.username" :class="errors.username ? 'error-input' : ''" disabled />
                            <label for="username">Username</label>
                        </div>
                        </div>
                    </div>  
                </template> 

                <div class="col-4 mb-2 req">                                                                     
                    <div class="form-floating">
                        <select class="form-select" name="employee_type" v-model="form.userrole" id="employee_type">  
                            <option disabled value="">Please select one</option>
                            <template v-if="authuser.roles">
                                <template v-if="authuser.roles[0].slug != 'super-admin'">
                                    <template v-for="role in roles.slice(1,5)">
                                        <option :value="role.id">{{role.name}}</option>
                                    </template>
                                </template>
                                <template v-else>
                                    <template v-for="role in roles">
                                        <option :value="role.id">{{role.name}}</option>
                                    </template>
                                </template> 
                            </template>               
                        </select>
                        <label for="employee_type" class="form-label">Select Role</label>   
                    </div>
                </div> 
                <div class="col mb-2" v-if="form.userrole === 5">                 
                    <div class="form-floating">
                        <select class="form-select" name="office" id="office" v-model="form.office_head" :class="errors.office_head ? 'error-input' : ''">  
                            <option disabled value="">Please select one</option>
                            <template v-for="office in offices">
                                <option :value="office.offices_id">{{office.offices_name}}</option>
                            </template>            
                        </select>
                        <label for="office" class="form-label noreq">Select Office</label>    
                        <span v-if="errors.office_head" class="text-danger m-error">{{errors.office_head[0]}}</span>                       
                    </div>
                </div>
            </div>
          
        </div>
        <div class="form-row">
            <div class="col text-end">
            	<router-link :to="{name: 'users.index'}" class="btn btn-secondary me-1">Cancel</router-link>
            	<button type="submit" class="btn btn-primary">Save</button>
            </div>
        </div>
  
    </form>
</template>

<script>
import useUsers from '@/composables/userscomposables';
import { onMounted, ref, inject, reactive} from 'vue';
import useOffices from '@/composables/composables-office';
import useRoles from '@/composables/composables-role';
import { useAuthStore } from '@/stores/store.js'
export default{

    props: {
        id: {
            required: true,
            type: String
        }
    },

    setup (props){
   
        const swal = inject('$swal')
        const {errors, user, updateUser, getUser, authuser, getAuthuser} = useUsers()
        const {getOffices, offices} = useOffices()
        const {roles, getRoles} = useRoles()

        const store = useAuthStore();

        const userrole = ref(store.details[1]);

        const form = reactive({
            'userrole': '',
            'office_head': '',
            'username': '',
            'overwrite': ''
        })
        

        onMounted(() => {
            getUser(props.id).then(res => {
                
                form.office_head = user.value.office_head;
                if(user.value.roles){
                    form.userrole = user.value.roles[0].id;
                }
                form.username = user.value.username;
                
            }), 
            getOffices(),
            getRoles(),
            getAuthuser()
  
        })

        const saveUser = async () => {            
            await updateUser(props.id,{...form}).then(() => {
                if(!errors.value){
                    swal.fire({
                        toast: true,
                        position: 'top-end',
                        title: 'User Updated',
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
            saveUser,
            offices,
            roles,
            getRoles,
            getUser,
            getOffices,
            user,
            authuser,
            form,
            userrole
        
        }
    }
}


</script>
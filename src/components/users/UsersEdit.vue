<template>
    <template v-if="pageLoader">
        <LoadingComponentDiv/>
    </template>
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
                <template v-if="userrole.includes('super-admin')">
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

                
                
            </div>   
            <div class="row rap">
                <div class="col col-sm-7">
                    <div class="cwrap">
                        <div class="cwrap--title">
                            <strong>Roles and Permission</strong>
                        </div>
                        <div class="cwrap--content">
                            <ul class="list-unstyled">
                                <template v-for="role in roles" :key="role.id">
                                    <li>                                    
                                    <div class="form-check form-switch fpar">
                                      <input class="form-check-input"  v-model="form.userroles" type="checkbox" role="switch" 
                                      :id="'role-'+role.id" 
                                      :value="role.id"
                                      @change="checkid(role.id)">
                                      <label class="form-check-label" :for="'role-'+role.id">{{role.name}}</label>
                                    </div>
                                    <ul class="list-unstyled cwrap--content--child list-inline">
                                        <template v-for="permission in permissions" :key="permission.id">
                                            <li class="list-inline-item" v-if="permission.roles[0].id == role.id">
                                                <div class="form-check form-switch">                                                 
                                                  <template v-if="enabledIDS.includes(permission.id)">
                                                      <input class="form-check-input" v-model="form.userpermissions" type="checkbox" role="switch" :id="permission.id" :value="permission.id">
                                                  </template>
                                                  <template v-else>                               
                                                        <input class="form-check-input" v-model="form.userpermissions" type="checkbox" role="switch" :id="permission.id" :value="permission.id" disabled>                      
                                                  </template>
                                                  <label class="form-check-label" :for="permission.id" :class="permission.id == 37 ? 'text-danger' : ''">{{permission.name}}</label>
                                                </div>
                                            </li>
                                        </template>                                        
                                    </ul>

                                    <template v-if="role.id == 5">
                                        <div v-if="form.userroles.includes(5)">                                 
                                            <select class="form-select" name="office" id="office" v-model="form.office_head" :class="errors.office_head ? 'error-input' : ''">
                                                    <option disabled value="">Please select one</option>
                                                    <template v-for="office in offices">
                                                        <option :value="office.offices_id">{{office.offices_name}}</option>
                                                    </template>            
                                                </select>                        
                              
                                        </div>
                                    </template>
                                </li>
                                </template>
                                
                            </ul>


                        </div>
                    </div>
                </div>

            </div>
    
        </div>


        
        <div class="form-row">
            <div class="col text-end">
            	<router-link :to="{name: 'users.index'}" class="btn btn-secondary me-1">Cancel</router-link>
            	<button type="submit" class="btn btn-save">Save</button>
            </div>
        </div>
  
    </form>
</template>

<script>
import useUsers from '@/composables/userscomposables';
import { onMounted, ref, inject, reactive} from 'vue';
import useOffices from '@/composables/composables-office';
import useRoles from '@/composables/composables-role';
import usePermissions from '@/composables/composables-permissions';
import { useAuthStore } from '@/stores/store.js'
import { useHead } from '@unhead/vue'
import LoadingComponentDiv from '@/components/loader/LoadingComponentDiv.vue';
import {useRouter} from 'vue-router'




export default{
    components: {
        LoadingComponentDiv
    },
    props: {
        id: {
            required: true,
            type: String
        }
    },

    setup (props){
        useHead({
            title: 'Edit Account | '+import.meta.env.VITE_BFAR_AGENCY
        })
        const swal = inject('$swal')
        const {errors, user, updateUser, getUser, authuser, getAuthuser} = useUsers()
        const {getOffices, offices} = useOffices()
        const {roles, getRoles} = useRoles()
        const {permissions, getPermissions} = usePermissions()
        const router = useRouter();
        const store = useAuthStore();

        const userrole = ref(store.details[1]);
    
        const enabledIDS = ref([]);

        

        const form = reactive({
            'userroles': [],
            'office_head': '',
            'username': '',
            'overwrite': '',
            'userpermissions': []
        })
        
        const pageLoader = ref(true);
        onMounted(() => {

            getUser(props.id).then(res => {
                if(user.value.rolesids.includes(1) && !(userrole.value.includes('super-admin'))){
                    router.push({name: 'forbidden.index'})
                }
                form.office_head = user.value.office_head;
                form.username = user.value.username;             

              
                form.userroles = user.value.rolesids;
                form.userpermissions = user.value.permissionsids;
                
                
            }), 
            getOffices(),
            getRoles(),
            getPermissions(),
            getAuthuser().then(() => {
                pageLoader.value = false;
            })
            
            
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

        const checkid = (id) =>{
                var arrS = [1,2,3,4];
                var arrA = [5,6,7,8];
                var arrH = [9,10,11,12];
                var arrE = [13,14,15,16,21];
                var arrO = [17,18,19,20];
                var arrCV = [24,25,26,27];
                var arrCE = [28,29,30,31,38];




                var arrIncludes = [21,32,33,34,35,36,37,40];
                var comIncludes = [38];

                

            if(form.userroles.includes(id)){

                if(id < 6){
                    for (var x = 1; x < 6; x++) {
                        if(id != x){
                            var index = form.userroles.indexOf(x);                    
                            if(index > -1){
                                form.userroles.splice(index, 1);
                            }                                 
                        }                    
                    }
                    for (var i = 1; i < 22; i++) {
                        var index = form.userpermissions.indexOf(i);

                        if(index > -1){
                            form.userpermissions.splice(index, 1);
                        }
                    }

                    for (var i = 0; i < arrIncludes.length; i++) {
                        var index = form.userpermissions.indexOf(arrIncludes[i]);           
                        if(index > -1){
                            form.userpermissions.splice(index, 1);
                        }
                    }
                    for (var i = 0; i < arrIncludes.length; i++) {
                        var index = enabledIDS.value.indexOf(arrIncludes[i]);           
                        if(index > -1){
                            enabledIDS.value.splice(index, 1);
                        }
                    }
          
                    
                }else{
                    for (var x = 6; x < 8; x++) {
                        if(id != x){
                            var index = form.userroles.indexOf(x);                    
                            if(index > -1){
                                form.userroles.splice(index, 1);
                            }                                 
                        }                    
                    }
                    for (var i = 24; i < 32; i++) {
                        var index = form.userpermissions.indexOf(i);                    
                        if(index > -1){
                            form.userpermissions.splice(index, 1);
                        }  
                    }
                    for (var i = 0; i < comIncludes.length; i++) {
                        var index = form.userpermissions.indexOf(comIncludes[i]);
                        if(index > -1){
                            form.userpermissions.splice(index, 1);
                        }
                    }
                    for (var i = 0; i < comIncludes.length; i++) {
                        var index = enabledIDS.value.indexOf(arrIncludes[i]);           
                        if(index > -1){
                            enabledIDS.value.splice(index, 1);
                        }
                    }
                }



                //admin - 36, 37
                //hr - 34
                //employee - 21 32 33
                //supervisor - 35
                

                if(id == 1){
                    form.userpermissions.push(1,2,3,4);
                }else if(id == 2){
                    form.userpermissions.push(5,6,7,8);
                    enabledIDS.value.push(36,40);
                    if(userrole.value.includes('super-admin')){
                        enabledIDS.value.push(37);
                    }
                }else if(id == 3){
                    form.userpermissions.push(9,10,11,12);
                    enabledIDS.value.push(34);
                }else if(id == 4){
                    form.userpermissions.push(13,14,15,16);
                    enabledIDS.value.push(21,32,33);
                }else if(id == 5){
                    form.userpermissions.push(17,18,19,20);
                    enabledIDS.value.push(35);
                }else if(id == 6){
                    form.userpermissions.push(24,25,26,27);
                    enabledIDS.value.push(39);
                }else if(id == 7){
                    form.userpermissions.push(28,29,30,31);
                    enabledIDS.value.push(38);
                }
    
            }else{        

                arrE = [13,14,15,16,21,32,33];
                arrH = [9,10,11,12,34];
                arrA = [5,6,7,8,36,37];
                arrO = [17,18,19,20,35];

                if(id==1){   

                    for (var i = 0; i < arrS.length; i++) {
                        var index = form.userpermissions.indexOf(arrS[i]);
                        if(index > -1){
                            form.userpermissions.splice(index, 1);
                        }
                    }
                }else if(id==2){                    
                    for (var i = 0; i < arrA.length; i++) {
                        var index = form.userpermissions.indexOf(arrA[i]);
                        if(index > -1){
                            form.userpermissions.splice(index, 1);
                        }
                    }
                }else if(id==3){                    

                    for (var i = 0; i < arrH.length; i++) {
                        var index = form.userpermissions.indexOf(arrH[i]);
                        if(index > -1){
                            form.userpermissions.splice(index, 1);
                        }
                    }
                }else if(id==4){                    
                    for (var i = 0; i < arrE.length; i++) {
                        var index = form.userpermissions.indexOf(arrE[i]);
                        if(index > -1){
                            form.userpermissions.splice(index, 1);
                        }
                    }
                }else if(id==5){                    
                    for (var i = 0; i < arrO.length; i++) {
                        var index = form.userpermissions.indexOf(arrO[i]);
                        if(index > -1){
                            form.userpermissions.splice(index, 1);
                        }
                    }
                }else if(id==6){                    
                    for (var i = 0; i < arrCV.length; i++) {
                        var index = form.userpermissions.indexOf(arrCV[i]);
                        if(index > -1){
                            form.userpermissions.splice(index, 1);
                        }
                    }
                }else if(id==7){                    
                    for (var i = 0; i < arrCE.length; i++) {
                        var index = form.userpermissions.indexOf(arrCE[i]);
                        if(index > -1){
                            form.userpermissions.splice(index, 1);
                        }
                    }
                }

            }
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
            userrole,
            getPermissions,
            permissions,
            checkid,
            pageLoader,
            enabledIDS
        
        }
    }
}


</script>
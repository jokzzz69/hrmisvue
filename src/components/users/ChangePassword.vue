<template>
    <div class="container">
                <div class="row">
            <div class="col-sm-2"></div>
            <div class="col-sm-8 ">
                <div class="p-title">
                    <h2>Update Password</h2>
                </div>
                <form class="space-y-6 form-row" v-on:submit.prevent="saveProfile">            
                        <div class="mt-2">
                            <div class="form-floating">
                                <input :type="typenewpass" @keyup="validateNewPassword" name="newpassword" id="newpassword" 
                                :class="newerror.newpassword.length > 0 ? 'error-input' : ''"  
                                class="form-control" v-model="form.newpassword">

                                <label for="email">New Password</label>

                                <div class="input-group-append passwordEye">
                                    <span class="input-group-text" @click="shownewpassword()">
                                      <i class="fas" :class="spnewpass" id="show_eye"></i>
                                    </span>
                                </div>
                            </div>
                            <span v-if="newerror.newpassword" class="text-danger m-error">{{newerror.newpassword[0]}}</span>          
                        </div>  
                        <div class="mt-2">
                            <div class="form-floating">
                                <input :type="typeconfirmpass" @keyup="validateNewPassword" name="confirmpassword" 
                                :class="newerror.confirmpassword.length > 0 ? 'error-input' : ''"  
                                id="confirmpassword" class="form-control" v-model="form.confirmpassword">
                                <label for="address">Confirm Password</label>
                                <div class="input-group-append passwordEye">
                                    <span class="input-group-text" @click="showconfirmpassword()">
                                      <i class="fas" :class="spconfirmpass" id="show_eye"></i>
                                    </span>
                                </div>
                            </div>
                            <span v-if="newerror.confirmpassword" class="text-danger m-error">{{newerror.confirmpassword[0]}}</span>
                        </div>               
  

                    <div class="col mt-2">
                        <button type="submit" title="Update Password" class="btn btn-primary">Save</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>

import useUsers from '@/composables/userscomposables'
import { onMounted,ref, reactive, inject} from 'vue';
import { useAuthStore } from '@/stores/store.js'
import { usePasswordChange } from '@/stores/changepasswordstore.js'
import { useHead } from '@unhead/vue'

export default{
    setup(){
        useHead({
            title: 'Update Password | BFAR - CAR HRMIS'
        })
        const store = useAuthStore();
        const id = ref(store.details[0]);
        const changepasswordstore = usePasswordChange();

        const form = reactive({
            'newpassword': '',
            'confirmpassword': '',
        })
        const newerror = ref({
            'newpassword': [],
            'confirmpassword': []
        });

        const typenewpass = ref('password');
        const spnewpass = ref('fa-eye');

        const typeconfirmpass = ref('password');
        const spconfirmpass = ref('fa-eye');
        const swal = inject('$swal')
        const { getUserLoginProfile, profile, errors, updatePasswordonLogin, getAuthuser, authuser } = useUsers()

        onMounted(() => 
            getUserLoginProfile(id.value),
            getAuthuser()
        )
        
        const checkUpper = (str) => {
            return /[A-Z]/.test(str)
        }
        const checkNumber = (str) => {
            return /[0-9]/.test(str)
        }
        const checkSpecial = (str) => {
            return /[@$!%*#?&]/.test(str)
        }
        const validateNewPassword = () => {


            if(form.newpassword.length < 1){
                newerror.value.newpassword = [];
                newerror.value.newpassword.push('New Password is required');
            }else{
                newerror.value.newpassword = [];
                if(form.newpassword.length > 0 && form.newpassword.length < 8){                    
                    newerror.value.newpassword.push('The newpassword must be at least 8 characters.');
                }else{
                    newerror.value.newpassword = [];
                    if(!checkUpper(form.newpassword) || !checkNumber(form.newpassword) || !checkSpecial(form.newpassword)){
                        newerror.value.newpassword.push('Password must contain at least one uppercase, a number and a special character');
                    }
                }
            }
            
            if(form.confirmpassword.length > 0){
                if(form.confirmpassword != form.newpassword){
                    newerror.value.confirmpassword.push('Password does not match');
                }else{
                    newerror.value.confirmpassword = [];
                }
            }else{
                newerror.value.confirmpassword = [];
            }
        }

        const saveProfile = async () => {
            await updatePasswordonLogin(id.value,{...form},authuser.value.roles[0].slug).then(() => {
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
                            container: 'swaltopright-up'
                        }
                    })
                }
            }).then(()=>{
                changepasswordstore.setstate(true);
            })
            newerror.value.newpassword  = errors.value.newpassword;
            if(errors.value.confirmpassword){
                newerror.value.confirmpassword = errors.value.confirmpassword;
            }

        }
        

        const shownewpassword = async () => {       
            if(spnewpass.value == 'fa-eye'){
                spnewpass.value = 'fa-eye-slash';
                typenewpass.value = 'text';
            }else{
                spnewpass.value = 'fa-eye';
                typenewpass.value = 'password';
            }       
        }
        const showconfirmpassword = async () => {
            if(spconfirmpass.value == 'fa-eye'){
                spconfirmpass.value = 'fa-eye-slash';
                typeconfirmpass.value = 'text';
            }else{
                spconfirmpass.value = 'fa-eye';
                typeconfirmpass.value = 'password';
            }       
        }
        return {
            profile,
            errors,
            form,
            saveProfile,
            shownewpassword,
            showconfirmpassword,
            typeconfirmpass,
            spconfirmpass,
            spnewpass,
            typenewpass,
            validateNewPassword,
            newerror
        }
    }
}

</script>
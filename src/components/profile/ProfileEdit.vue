<template>
        <div class="row p-title">
            <h2>Change Password</h2>
        </div>

        <form class="space-y-6" v-on:submit.prevent="saveProfile">
            <div class="space-y-4 rounded-md shadow-sm">                
                <div class="mt-1">
                    <div class="form-floating">
                        <input :type="typecurrentpass" name="currentpassword" @keyup="validateNewPassword" id="currentpassword" class="form-control" v-model="form.currentpassword" :class="newerror.currentpassword.length > 0 ? 'error-input' : ''">
                        <label for="name">Current Password</label>

                        <div class="input-group-append passwordEye">
                            <span class="input-group-text" @click="showcurrentpassword()">
                              <i class="fas" :class="spcurrentpass" id="show_eye"></i>
                            </span>
                        </div>
                    </div>
                    <span v-if="newerror.currentpassword" class="text-danger m-error">{{newerror.currentpassword[0]}}</span>
                </div>                

                <div class="mt-2">
                    <div class="form-floating">
                        <input :type="typenewpass" name="newpassword" id="newpassword" @keyup="validateNewPassword" :class="newerror.newpassword.length > 0 ? 'error-input' : ''"  class="form-control" v-model="form.newpassword">
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
                        <input :type="typeconfirmpass" name="confirmpassword" @keyup="validateNewPassword" :class="newerror.confirmpassword.length > 0 ? 'error-input' : ''"  id="confirmpassword" class="form-control" v-model="form.confirmpassword">
                        <label for="address">Confirm Password</label>
                        <div class="input-group-append passwordEye">
                            <span class="input-group-text" @click="showconfirmpassword()">
                              <i class="fas" :class="spconfirmpass" id="show_eye"></i>
                            </span>
                        </div>
                    </div>

                    <span v-if="newerror.confirmpassword" class="text-danger m-error">{{newerror.confirmpassword[0]}}</span>
                </div>                
            </div>

            <div class="form-row mt-2">
                <router-link :to="{name: 'dashboard.index'}" title="return to dashboard" class="btn btn-secondary me-1">Cancel</router-link>
                <button type="submit" class="btn btn-primary">Save</button>
            </div>
        </form>

    
</template>

<script>

import useUsers from '@/composables/userscomposables'
import { onMounted,ref, reactive, inject} from 'vue';
import { useAuthStore } from '@/stores/store.js'
import { useHead } from '@unhead/vue'

export default{
    setup(){
        useHead({
            title: 'Change Password | BFAR - CAR HRMIS'
        })
        const store = useAuthStore();
        const id = ref(store.details[0]);

        const form = reactive({
            'currentpassword': '',
            'newpassword': '',
            'confirmpassword': '',
        })
        const newerror = ref({
            'currentpassword': [],
            'newpassword': [],
            'confirmpassword': []
        });
        const typecurrentpass = ref('password');
        const spcurrentpass = ref('fa-eye');
        const typenewpass = ref('password');
        const spnewpass = ref('fa-eye');
        const typeconfirmpass = ref('password');
        const spconfirmpass = ref('fa-eye');


        const swal = inject('$swal')
        const { getUserProfile, profile, errors, updateProfile } = useUsers()

        onMounted(() => getUserProfile(id.value))
        
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
            if(form.currentpassword.length < 1){
                newerror.value.currentpassword = [];
                newerror.value.currentpassword.push('Current Password is required');
            }else{
                newerror.value.currentpassword = [];
            }

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
            await updateProfile(id.value,{...form}).then(() => {
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
            })
            newerror.value.newpassword  = errors.value.newpassword;
            if(errors.value.confirmpassword){
                newerror.value.confirmpassword = errors.value.confirmpassword;
            }
            if(errors.value.currentpassword){
                newerror.value.currentpassword = errors.value.currentpassword;
            }
        }
        const showcurrentpassword = async () => {       
            if(spcurrentpass.value == 'fa-eye'){
                spcurrentpass.value = 'fa-eye-slash';
                typecurrentpass.value = 'text';
            }else{
                spcurrentpass.value = 'fa-eye';
                typecurrentpass.value = 'password';
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
            typenewpass,
            spnewpass,
            typeconfirmpass,
            spconfirmpass,
            shownewpassword,
            showconfirmpassword,
            showcurrentpassword,
            typecurrentpass,            
            spcurrentpass,
            validateNewPassword,
            newerror
        }
    }
}

</script>
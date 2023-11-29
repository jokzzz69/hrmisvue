<template>
    <div class="row">
        <div class="col-12 p-title mb-2">
            <h2>Contact Info</h2>
        </div>
    </div>
    <form v-on:submit.prevent="saveOfficeRecord" v-if="officerecord.pdspersonalinformation">
        <div class="row mb-2">            
            <div class="col-12 mb-2">                
                <div class="form-floating">
                    <input type="number" name="telephone_no" placeholder="enter first name" id="telephone_no" class="form-control" v-model="officerecord.pdspersonalinformation.telephone_no">
                    <label for="telephone_no" class="form-label">Telephone Number</label>
                </div>         
            </div>  
            <div class="col-12 mb-2">                
                <div class="form-floating w-countrycode">
                    <input type="text" name="contactnumber" placeholder="enter middle name" id="contactnumber" class="form-control" v-model="officerecord.pdspersonalinformation.mobile_no"  maxlength="10" @keypress="ismobile($event)">
                    <label for="contactnumber" class="form-label">Mobile Number</label>
                    <div class="spmobilecountrycode">(+63)</div>
                </div>
            </div> 
            <div class="col-12 mb-2">                
                <div class="form-floating">
                    <input type="text" name="emailaddress" placeholder="enter middle name" id="emailaddress" class="form-control" v-model="officerecord.pdspersonalinformation.emailaddress"  :class="errors['employee.emailaddress'] ? 'error-input' : ''">
                    <label for="emailaddress" class="form-label">Email Address</label>                    
                    <span v-if="errors['emailaddress']" class="text-danger m-error">{{errors['emailaddress'][0]}}</span>
                </div>
            </div>                
        </div> 
        <div class="form-row">
            <div class="col mt-3 text-end">
                <router-link :to="{name: 'recordpersonal.show'}" class="btn btn-secondary me-1">Cancel</router-link>
                <button type="submit" class="btn btn-save">Update</button>
            </div>
        </div>  
     </form>

</template>

<script>

import { onMounted, ref, inject, reactive} from 'vue';


import useOfficerecord from '@/composables/composables-record';


import moment from 'moment'
import { useAuthStore } from '@/stores/store.js'
import { useHead } from '@unhead/vue'

export default{
    setup (){
        useHead({
            title: 'Edit Contact Information | '+import.meta.env.VITE_BFAR_AGENCY
        })
        const store = useAuthStore();
        const id = ref(store.details[0]);
        const swal = inject('$swal')
        const {officerecord, getPersonalRecord, updateContact, errors}= useOfficerecord()

        onMounted(() => {   
            getPersonalRecord(id.value)

        })
        const ismobile = (event) => {
            
            if(!/^[0-9]+$/.test(event.key)){
                return event.preventDefault();
            }
        }
        const saveOfficeRecord = async () => {
            await updateContact(id.value).then(() => {
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

        return{
            errors,
            officerecord,
            saveOfficeRecord,
            moment,
            ismobile
        }
    }
}


</script>
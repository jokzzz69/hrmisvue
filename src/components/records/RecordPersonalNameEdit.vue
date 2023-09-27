<template>
    <div class="row">
        <div class="col-12 p-title mb-2">
            <h2>Name</h2>
        </div>
    </div>
    <form v-on:submit.prevent="saveOfficeRecord">
        <div class="row mb-2" v-if="officerecord.employee">            
            <div class="col-12 mb-2 req">                
                <div class="form-floating">
                    <input type="text" name="employee_fname" placeholder="enter first name" id="employee_fname" class="form-control" v-model="officerecord.employee.employee_fname" :class="errors['employee.employee_fname'] ? 'error-input' : ''">
                    <label for="employee_fname" class="form-label">First Name</label>
                </div> 
                <span v-if="errors['employee.employee_fname']" class="text-danger m-error">{{errors['employee.employee_fname'][0]}}</span>
            
            </div>  
            <div class="col-12 mb-2">                
                <div class="form-floating">
                    <input type="text" name="employee_mname" placeholder="enter middle name" id="employee_mname" class="form-control" v-model="officerecord.employee.employee_mname">
                    <label for="employee_mname" class="form-label">Middle Name</label>
                </div>
            </div>                
            <div class="col mb-2 req">                
                <div class="form-floating">
                    <input type="text" name="employee_lname" placeholder="enter last name" id="employee_lname" class="form-control" v-model="officerecord.employee.employee_lname" :class="errors['employee.employee_lname'] ? 'error-input' : ''">
                    <label for="employee_lname" class="form-label">Last Name</label>
                </div>
                <span v-if="errors['employee.employee_lname']" class="text-danger m-error">{{errors['employee.employee_lname'][0]}}</span>
            </div>  
            <div class="col col-sm-1 mb-2">                  
                <div class="form-floating">
                    <input type="text" name="employee_extname"  placeholder="enter name extension" id="employee_extname" class="form-control" v-model="officerecord.employee.employee_extname">
                    <label for="employee_extname" class="form-label">Ext. (Jr, Sr)</label>
                </div>
            </div>  
        </div> 
        <div class="form-row">
            <div class="col mt-3 text-end">
                <router-link :to="{name: 'recordpersonal.show'}" class="btn btn-secondary me-1">Cancel</router-link>
                <button type="submit" class="btn btn-primary">Update</button>
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
            title: 'Edit Information | BFAR - CAR HRMIS'
        })
        const store = useAuthStore();
        const id = ref(store.details[0]);

        const swal = inject('$swal')
        const {officerecord, getPersonalRecord, updatePersonalOfficerecord, errors}= useOfficerecord()

        onMounted(() => {   
            getPersonalRecord(id.value)

        })

        const formatPrice = (value) =>  {
            let val = (value/1).toFixed(2);
            return val.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        }

        const saveOfficeRecord = async () => {

            await updatePersonalOfficerecord(id.value).then(() => {
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
            formatPrice,
            moment
        
        }
    }
}


</script>
<template>
    <div class="row">
        <div class="col-12 p-title mb-2">
            <h2>Emergency Contact</h2>
        </div>
    </div>
    <form v-on:submit.prevent="saveOfficeRecord">
        <div class="row mb-2">            
            <div class="col-12 mb-2 req">                
                <div class="form-floating">
                    <input type="text" name="emergency_contactperson" placeholder="enter first name" id="emergency_contactperson" class="form-control" v-model="officerecord.emergency_contactperson" :class="errors['employee.emergency_contactperson'] ? 'error-input' : ''">
                    <label for="name" class="form-label">Contact Person</label>
                </div> 
                <span v-if="errors['emergency_contactperson']" class="text-danger m-error">{{errors['emergency_contactperson'][0]}}</span>
            
            </div>  
            <div class="col-12 mb-2 req">                
                <div class="form-floating">
                    <input type="number" name="emergency_contactnumber" placeholder="enter middle name" id="emergency_contactnumber" class="form-control" v-model="officerecord.emergency_contactnumber">
                    <label for="name" class="form-label">Contact Number</label>
                </div>
                <span v-if="errors['emergency_contactnumber']" class="text-danger m-error">{{errors['emergency_contactnumber'][0]}}</span>
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

export default{

    props: {
        id: {
            required: true,
            type: String
        }
    },

    setup (props){
        const swal = inject('$swal')
        const {officerecord, getPersonalRecord, updateEmergencyContact, errors}= useOfficerecord()

        onMounted(() => {   
            getPersonalRecord(props.id)

        })

        const saveOfficeRecord = async () => {
            await updateEmergencyContact(props.id).then(() => {
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
            moment
        
        }
    }
}


</script>
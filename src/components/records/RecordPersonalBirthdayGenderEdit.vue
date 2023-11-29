<template>
    <div class="row">
        <div class="col-12 p-title mb-2">
            <h2>Birthday and Gender</h2>
        </div>
    </div>
    <form v-on:submit.prevent="saveOfficeRecord">
        <div class="pProfilewrap container-fluid pb-4 mb-4" v-if="officerecord.pdspersonalinformation">
            <div class="row mt-3">
                <div class="col pProfilewrap-title">
                    <h2>Update Birthday</h2>

                </div>
            </div>
            <div class="row">
                <div class="col col-sm-5 mb-2 req mm-b">
                    <div class="form-floating">
                        <select class="form-select" id="bmonth" name="bmonth" :class="errors.type ? 'error-input' : ''" v-model="form.month">
                            <option disabled value="">Select Month</option>
                            <option value="0">January</option>     
                            <option value="1">February</option>     
                            <option value="2">March</option>     
                            <option value="3">April</option>     
                            <option value="4">May</option>     
                            <option value="5">June</option>     
                            <option value="6">July</option>     
                            <option value="7">August</option>     
                            <option value="8">September</option>     
                            <option value="9">October</option>         
                            <option value="10">November</option>     
                            <option value="11">December</option>     
                        </select>
                         <label for="bmonth" class="form-label">Month</label>
                    </div> 
                    <span v-if="errors['month']" class="text-danger m-error">{{errors['month'][0]}}</span>            
                </div>
                <div class="col col-sm-2 req mm-b">
                    <div class="form-floating">
                        <input type="number" name="day" placeholder="enter month" id="bday" class="form-control" v-model="form.day" min="1" max="31">
                        <label for="bday" class="form-label">Day</label>
                    </div>
                    <span v-if="errors['day']" class="text-danger m-error">{{errors['day'][0]}}</span>     
                </div>
                <div class="col col-sm-5 req mm-b">
                    <div class="form-floating">
                        <input type="number" name="year" placeholder="enter year" id="byear" min="1930" max="2023" class="form-control" v-model="form.year">
                        <label for="byear" class="form-label">Year</label>
                    </div>
                    <span v-if="errors['year']" class="text-danger m-error">{{errors['year'][0]}}</span>     
                </div>

            </div>
            <div class="row mt-2">
                <div class="col-12-8">
                    <div class="form-floating">                        
                        <input type="text" name="placeofbirth" id="placeofbirth" class="form-control" placeholder="enter place of birth"  v-model="form.placeofbirth">    
                        <label for="placeofbirth" class="form-label">Place of Birth</label>                    
                    </div>
                    
                </div>
            </div>
        </div>
        <div class="pProfilewrap container-fluid pb-4 mb-4" v-if="officerecord.pdspersonalinformation">
            <div class="row mt-3">
                <div class="col pProfilewrap-title">
                    <h2>Gender</h2>
                </div>
            </div>
            <div class="row">
                <div class="col-12 mb-2">                
                    <div class="form-floating">
                         <div class="form-check">
                          <input class="form-check-input" type="radio" name="genderrad" id="genderrad1" value="1" v-model="form.sex" >
                          <label class="form-check-label" for="genderrad1">
                            Male
                          </label>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="radio" name="genderrad" id="genderrad2" value="2" v-model="form.sex">
                          <label class="form-check-label" for="genderrad2">
                            Female
                          </label>
                        </div>    
                    </div>
                </div>
            </div>
            <span v-if="errors['sex']" class="text-danger m-error">{{errors['sex'][0]}}</span> 
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
            title: 'Edit Birthday and Gender | '+import.meta.env.VITE_BFAR_AGENCY
        })
        const store = useAuthStore();
        const id = ref(store.details[0]);

        const swal = inject('$swal')
        const {officerecord, getPersonalRecord, updateBinfo, errors}= useOfficerecord()
        const newBday = ref('');
        const form = reactive({
            'month': '',
            'day': '',
            'year': '',
            'sex': '',
            'placeofbirth': ''
        })
        onMounted(() => {   
            getPersonalRecord(id.value).then(res => {
                if(officerecord.value.pdspersonalinformation.birthdate){
                    const currentDate = new Date(officerecord.value.pdspersonalinformation.birthdate);
                    form.month = currentDate.getMonth();
                    form.day = currentDate.getDate();
                    form.year = currentDate.getFullYear();
                    form.sex = officerecord.value.pdspersonalinformation.sex;
                    
                }
                form.placeofbirth = officerecord.value.pdspersonalinformation.placeofbirth;
            })

        })
        
        const formatPrice = (value) =>  {
            let val = (value/1).toFixed(2);
            return val.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        }

        const saveOfficeRecord = async () => {
            await updateBinfo(id.value,{...form}).then(() => {
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
            moment,
            form
        
        }
    }
}


</script>
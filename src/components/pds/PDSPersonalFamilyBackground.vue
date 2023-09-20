<template>	 
    <div class="row w-right-nav">
        <div class="col leftpdscontent ptpb">
            <div class="row">
                <div class="col-md-12">
                    <h2 class="rff fs-3 mb-0">Personal Data</h2>
                    <p class="d-block mb-2 fs-6 text-muted"><small>* Leave blank if not applicable</small></p>
                    <div class="pdsupdatedtime mb-2">
                        <template v-if="officerecord.pdspersonalinformation">
                            <span v-if="officerecord.pdspersonalinformation.updated_at">
                                Updated as of {{moment(officerecord.pdspersonalinformation.updated_at).format('MMMM D, YYYY [at] h:mm A')}}
                            </span>
                        </template>
                    </div>
                    
                    
                </div>
            </div>   
            <div class="row">
                <div class="col pds-group-title">
                    <span class="rff fs-5">Family Background</span>
                </div>
            </div>
            <form v-on:submit.prevent="savepds">               

                <template v-if="officerecord.pdsfamilybackground">

                    <div class="pPDSwrap container-fluid pb-4">
                        <div class="row mt-3">
                            <div class="col pPDSwrap-title">
                                <h2>Spouse</h2>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col">
                                <div class="form-floating">                                    
                                    <input type="text" name="spouse_fname" id="spouse_fname" class="form-control" placeholder="enter spouse first name"  v-model="officerecord.pdsfamilybackground.spouse_fname">   
                                    <label for="spouse_fname" class="form-label">First Name</label>
                                </div>
                            </div>
                            <div class="col">
                                <div class="form-floating">                                    
                                    <input type="text" name="spouse_mname" id="spouse_mname" class="form-control" placeholder="enter spouse middle name"  v-model="officerecord.pdsfamilybackground.spouse_mname">   
                                    <label for="spouse_mname" class="form-label">Middle Name</label>
                                </div>
                            </div>
                            <div class="col">
                                <div class="form-floating">                                    
                                    <input type="text" name="spouse_lname" id="spouse_lname" class="form-control" placeholder="enter spouse last name"  v-model="officerecord.pdsfamilybackground.spouse_lname">   
                                    <label for="spouse_lname" class="form-label">Last Name</label>
                                </div>
                            </div>
                            <div class="col-auto">
                                <div class="form-floating">                                    
                                    <input type="text" name="spouse_extname" id="spouse_extname" class="form-control" placeholder="enter spouse extension name"  v-model="officerecord.pdsfamilybackground.spouse_extname">   
                                    <label for="spouse_extname" class="form-label">Name Extension</label>
                                </div>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col">
                                <div class="form-floating">                                    
                                    <input type="text" name="spouse_occupation" id="spouse_occupation" class="form-control" placeholder="enter spouse occupation"  v-model="officerecord.pdsfamilybackground.spouse_occupation">   
                                    <label for="spouse_occupation" class="form-label">Occupation</label>
                                </div>
                            </div>
                            <div class="col">
                                <div class="form-floating">                                    
                                    <input type="text" name="spouse_employer" id="spouse_employer" class="form-control" placeholder="enter spouse employer"  v-model="officerecord.pdsfamilybackground.spouse_employer">   
                                    <label for="spouse_employer" class="form-label">Employer / Business Name</label>
                                </div>
                            </div>                            
                        </div>
                        <div class="row mb-3">
                            <div class="col">
                                <div class="form-floating">                                    
                                    <input type="text" name="spouse_employeraddress" id="spouse_employeraddress" class="form-control" placeholder="enter spouse employer address"  v-model="officerecord.pdsfamilybackground.spouse_employeraddress">   
                                    <label for="spouse_employeraddress" class="form-label">Business Address</label>
                                </div>
                            </div>
                            <div class="col-auto">
                                <div class="form-floating">                                    
                                    <input type="text" name="spouse_telephone_no" id="spouse_telephone_no" class="form-control" placeholder="enter spouse telephone number"  v-model="officerecord.pdsfamilybackground.spouse_telephone_no">   
                                    <label for="spouse_telephone_no" class="form-label">Telephone No.</label>
                                </div>
                            </div>                            
                        </div>
                        <div class="row mt-3">
                            <div class="col pPDSwrap-title">
                                <h3>Name of Children</h3>
                            </div>
                        </div>
                        <template  v-if="officerecord.pdsfamilybackgroundchildren">
                            <template v-for="(div, key) in divs">  
                                 <div class="row mb-3" :table-row="key">
                                    <div class="col" :cte="div.id">
                                        <div class="form-floating">                                    
                                            <input type="text" name="child" :id="`child-`+key" class="form-control" placeholder="enter name of children"  v-model="officerecord.pdsfamilybackgroundchildren[key].nameofchildren">   
                                            <label :for="`child-`+key" class="form-label">Complete Name</label>
                                        </div>
                                    </div>
                                    <div class="col-2" :cte="key">
                                        <div class="form-floating">                                    
                                            <Datepicker auto-apply week-start="0" :enable-time-picker="false" v-model="officerecord.pdsfamilybackgroundchildren[key].dateofbirth" name="dateofbirth" class="date-form-floating" placeholder="Date of Birth"></Datepicker>   
                                        </div>
                                    </div>
                                    <div class="col-auto pt-2">
                                        <button class="btn btn-danger" title="Remove row" @click.prevent="removechildren(key)"><i class="fa-solid fa-minus"></i></button>
                                    </div>
                                </div>
                            </template>                                 
                            <div class="row mt-2 mb-2">
                                <div class="col text-center">
                                    <button class="btn btn-primary" @click.prevent="addmorechildren">+ Add More</button>
                                </div>
                            </div>
                        </template>
                        
                    </div>                   
                       

                    <div class="pPDSwrap container-fluid pb-4 mt-3">
                        <div class="row mt-3">
                            <div class="col pPDSwrap-title">
                                <h2>Parents</h2>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col pPDSwrap-title">
                                <h3>Father</h3>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col">
                                <div class="form-floating">                                    
                                    <input type="text" name="father_fname" id="father_fname" class="form-control" placeholder="enter first name"  v-model="officerecord.pdsfamilybackground.father_fname">   
                                    <label for="father_fname" class="form-label">First Name</label>
                                </div>
                            </div>
                            <div class="col">
                                <div class="form-floating">                                    
                                    <input type="text" name="father_mname" id="father_mname" class="form-control" placeholder="enter middle name"  v-model="officerecord.pdsfamilybackground.father_mname">   
                                    <label for="father_mname" class="form-label">Middle Name</label>
                                </div>
                            </div>
                            <div class="col">
                                <div class="form-floating">                                    
                                    <input type="text" name="father_lname" id="father_lname" class="form-control" placeholder="enter last name"  v-model="officerecord.pdsfamilybackground.father_lname">   
                                    <label for="father_lname" class="form-label">Last Name</label>
                                </div>
                            </div>
                            <div class="col-auto">
                                <div class="form-floating">                                    
                                    <input type="text" name="father_extname" id="father_extname" class="form-control" placeholder="enter extension name"  v-model="officerecord.pdsfamilybackground.father_extname">   
                                    <label for="father_extname" class="form-label">Name Extension</label>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col pPDSwrap-title">
                                <h3>Mother's Maiden Name</h3>
                            </div>
                        </div>
                        <div class="row mb-3">    
                            <div class="col">
                                <div class="form-floating">                                    
                                    <input type="text" name="mother_fname" id="mother_fname" class="form-control" placeholder="enter first name"  v-model="officerecord.pdsfamilybackground.mother_fname">   
                                    <label for="mother_fname" class="form-label">First Name</label>
                                </div>
                            </div>
                            <div class="col">
                                <div class="form-floating">                                    
                                    <input type="text" name="mother_mname" id="mother_mname" class="form-control" placeholder="enter middle name"  v-model="officerecord.pdsfamilybackground.mother_mname">   
                                    <label for="mother_mname" class="form-label">Middle Name</label>
                                </div>
                            </div>
                            <div class="col">
                                <div class="form-floating">                                    
                                    <input type="text" name="mother_lname" id="mother_lname" class="form-control" placeholder="enter last name"  v-model="officerecord.pdsfamilybackground.mother_lname">   
                                    <label for="mother_lname" class="form-label">Last Name</label>
                                </div>
                            </div>
                        </div>
                    </div>        
                </template>
            

            
            <div class="form-row">
                <div class="col mt-3 text-end">
                    <button type="submit" class="btn btn-primary">Save</button>
                </div>
            </div>
      
        </form>
        </div>

        <RightNavigation :id="id" />

        

    </div>
</template>

<script>

import useOfficerecord from '@/composables/composables-record';




import RightNavigation from '@/components/navigation/RightNavigation.vue';
import { onMounted, ref, inject, onUpdated, reactive} from 'vue';
import moment from 'moment'
import { useAuthStore } from '@/stores/store.js'

export default{

    components: {
        RightNavigation
    },
    setup (){
        const store = useAuthStore();
        const id = ref(store.details[0]);
        const swal = inject('$swal')
        const resMun = ref([]);

        const {errors, updateMypdsFamilyBackground, officerecord, getPersonalRecord } = useOfficerecord()


        const divs = reactive([]);
        const add = ref(0);

        onMounted(() => {   
            getPersonalRecord(id.value).then(() => {
                for(var x in officerecord.value.pdsfamilybackgroundchildren){
                    divs.push({
                        id: x,
                    })
                }                
                add.value = officerecord.value.pdsfamilybackgroundchildren.length;
            })
        })

        const savepds = async () => {
            await updateMypdsFamilyBackground(id.value).then(() => {
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
            await getPersonalRecord(id.value)
        }
        
        const addmorechildren =  async() => {
            divs.push({
                id: add.value,
            })
            add.value++;

            officerecord.value.pdsfamilybackgroundchildren.push({
                'id': '',
                'employee_id': '',
                'nameofchildren' : '',
                'dateofbirth': '',
                'pdsfamilybackgroundchildren_id': '',
                'created_at': '',
                'updated_at': ''
            });

        }
        const removechildren = async(index) =>{
            officerecord.value.pdsfamilybackgroundchildren.splice(index,1);
            divs.splice(index,1);
        }

        return{
            errors,
            savepds,
            officerecord,
            moment,
            addmorechildren,
            removechildren,
            divs,
            id
        }
    }
}


</script>
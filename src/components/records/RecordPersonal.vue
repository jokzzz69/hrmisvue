<template>
    <div class="row">
        <div class="col-12 p-title mb-2">
            <h2>Personal Info</h2>
        </div>
    </div>

    <div class="pProfilewrap container-fluid mb-4" v-if="officerecord.employee">
        <div class="row mt-3">
            <div class="col pProfilewrap-title">
                <h2>Basic Info</h2>
            </div>
        </div>
        <div class="row mb-2">    
            <div class="col mb-2">
                <div class="form-floating lblform-floating">                    
                    <span class="form-control lfc-disp">{{officerecord.employee.employee_fname}} {{officerecord.employee.employee_mname}} {{officerecord.employee.employee_lname}}</span>
                    <label for="name" class="form-label">Name</label>
                </div>
            </div>
            <div class="col-auto align-self-center col-edit">
                <router-link :to="{ name: 'recordpersonalname.edit'}"><i class="fas fa-edit"></i></router-link>
            </div>     
        </div> 

        <div class="row mb-2" v-if="officerecord.pdspersonalinformation">    
            <template v-if="officerecord.pdspersonalinformation.birthdate">
                <div class="col mb-2">
                    <div class="form-floating lblform-floating">                    
                        <span class="form-control lfc-disp">                            
                                {{moment(officerecord.pdspersonalinformation.birthdate).format('MMMM D, YYYY')}}
                        </span>
                        <label for="name" class="form-label">Birthdate</label>
                    </div>
                </div>
            </template>
            <template v-if="officerecord.pdspersonalinformation.placeofbirth">
                <div class="col mb-2">
                    <div class="form-floating lblform-floating">                    
                        <span class="form-control lfc-disp">                            
                                {{officerecord.pdspersonalinformation.placeofbirth}}
                        </span>
                        <label for="name" class="form-label">Birth Place</label>
                    </div>
                </div>
            </template>
            <template v-if="officerecord.pdspersonalinformation.sex">
                <div class="col mb-2">
                    <div class="form-floating lblform-floating">                    
                        <span class="form-control lfc-disp">                        
                                <span v-if="officerecord.pdspersonalinformation.sex == 1">
                                    Male
                                </span>
                                <span v-else>
                                    Female
                                </span>                                
                        </span>
                        <label for="name" class="form-label">Gender</label>
                    </div>
                </div>
            </template>  
           <div class="col-auto align-self-center col-edit">
                <template v-if="officerecord.pdspersonalinformation.birthdate || officerecord.pdspersonalinformation.sex || officerecord.pdspersonalinformation.placeofbirth">
                    <router-link :to="{ name: 'recordpersonalbirthdaygender.edit'}"><i class="fas fa-edit"></i></router-link>
                </template>
                
            </div>       
        </div> 
        <div class="row mb-2" v-if="officerecord.pdspersonalinformation">    
            <div class="col mb-2" v-if="officerecord.pdspersonalinformation.telephone_no || officerecord.pdspersonalinformation.mobile_no">
                <div class="form-floating lblform-floating">                    
                    <span class="form-control lfc-disp">                   
                           <template v-if="officerecord.pdspersonalinformation.mobile_no">
                               <template v-if="checkText(officerecord.pdspersonalinformation.mobile_no)">
                                    {{officerecord.pdspersonalinformation.mobile_no}}
                                </template>  
                           </template>  
                           <template v-if="officerecord.pdspersonalinformation.mobile_no && officerecord.pdspersonalinformation.telephone_no">
                                <template v-if="checkText(officerecord.pdspersonalinformation.mobile_no) && checkText(officerecord.pdspersonalinformation.telephone_no)">     
                                   /
                               </template>
                           </template>             
                           <template v-if="officerecord.pdspersonalinformation.telephone_no">
                                <template v-if="checkText(officerecord.pdspersonalinformation.telephone_no)">
                                    {{officerecord.pdspersonalinformation.telephone_no}}
                                </template>                              
                           </template>
                    </span>
                    <label for="name" class="form-label">Contact Number</label>
                </div>
            </div>
            
            <div class="col mb-2" v-if="officerecord.pdspersonalinformation.emailaddress">
                <div class="form-floating lblform-floating">                    
                    <span class="form-control lfc-disp">

                        <template v-if="officerecord.pdspersonalinformation.emailaddress && checkText(officerecord.pdspersonalinformation.emailaddress)">
                            {{officerecord.pdspersonalinformation.emailaddress}}
                        </template>
                        
                    </span>
                    <label for="name" class="form-label">Email Address</label>
                </div>
            </div>
            <div class="col-auto align-self-center col-edit" v-if="officerecord.pdspersonalinformation.emailaddress || officerecord.pdspersonalinformation.telephone_no || officerecord.pdspersonalinformation.mobile_no">
                <router-link :to="{ name: 'recordpersonalcontact.edit'}"><i class="fas fa-edit"></i></router-link>
            </div>
        </div> 

        <div class="row mb-2">    
            <div class="col mb-2">
                <div class="form-floating lblform-floating">                    
                    <span class="form-control lfc-disp">          
                        <template v-if="officerecord.emergency_contactperson && checkText(officerecord.emergency_contactperson)">
                            {{officerecord.emergency_contactperson}}
                        </template>    
                        
                    </span>
                    <label for="name" class="form-label">Emergency Contact Person</label>
                </div>
            </div>
            <div class="col mb-2">
                <div class="form-floating lblform-floating">                    
                    <span class="form-control lfc-disp">
                        <template v-if="officerecord.emergency_contactnumber && checkText(officerecord.emergency_contactnumber)">
                            {{officerecord.emergency_contactnumber}}
                        </template>
                        
                    </span>
                    <label for="name" class="form-label">Emergency Contact Number</label>
                </div>
            </div>
            <div class="col-auto align-self-center col-edit">
                <router-link :to="{ name: 'recordpersonalcontactperson.edit' }"><i class="fas fa-edit"></i></router-link>
            </div>   
        </div> 
    </div>

    <div class="pProfilewrap container-fluid mb-4" v-if="officerecord">
        <div class="row mt-3">
            <div class="col pProfilewrap-title">
                <h2>Employment</h2>
            </div>
        </div>
        <div class="row mb-2">
            <div class="col mb-2" v-if="officerecord.employments">
                <div class="form-floating lblform-floating">                    
                    <span class="form-control lfc-disp">{{officerecord.employments[0].type.name}}</span>
                    <label for="name" class="form-label">Type</label>
                </div>
            </div>
            <div class="col" v-if="officerecord.employments">
                <div class="form-floating lblform-floating">                    
                    <span class="form-control lfc-disp mhlabel">{{officerecord.employments[0].office.offices_name}}</span>
                    <label for="name" class="form-label">Office</label>
                </div>
            </div>
        </div>
        
        <div class="row mb-2">
            <template v-if="officerecord.employments">
                <div class="col mb-2" v-if="officerecord.employments[0].position_id != 0">
                    <template v-if="officerecord.employments[0].position">                    
                        <div class="form-floating lblform-floating">
                            <span class="form-control lfc-disp">{{officerecord.employments[0].position.name}}</span>
                            <label for="name" class="form-label">Position</label>
                        </div>
                    </template>
                </div>  

                <div class="col" v-if="officerecord.employments[0].startdate">
                    <div class="form-floating lblform-floating">                    
                        <span class="form-control lfc-disp mhlabel">{{moment(officerecord.employments[0].startdate).format('MMMM D, YYYY')}}</span>
                        <label for="name" class="form-label">Start Date</label>
                    </div>
                </div>  

            </template>
                 
               
            

        </div>   
        <div class="row mb-2">
            <template v-if="officerecord.employments">
                <div class="col mb-2" v-if="officerecord.employments[0].salarygrade">
                    <div class="form-floating lblform-floating">                    
                        <span class="form-control lfc-disp">{{officerecord.employments[0].salarygrade.name}}</span>
                        <label for="name" class="form-label">Salary Grade</label>
                    </div>
                </div>
                <div class="col mb-2" v-if="officerecord.employments[0].salarygradestep">                
                    <div class="form-floating lblform-floating">
                        <span class="form-control lfc-disp mhlabel">₱ {{formatPrice(officerecord.employments[0].salarygradestep.value)}}</span>
                        <label for="name" class="form-label">Value</label>
                    </div>
                </div>  
            </template>
        </div>
    </div>
    
    
    <PrivacyModal/>

</template>

<script>

import { onMounted, ref, inject, reactive} from 'vue';


import useOfficerecord from '@/composables/composables-record';
import PrivacyModal from '@/components/privacy/PrivacyModal.vue';

import moment from 'moment'
import { useAuthStore } from '@/stores/store.js'

export default{
    components: {
        PrivacyModal
     },
    setup (){
        const swal = inject('$swal')
        const {officerecord,getPersonalRecord}= useOfficerecord()

        const store = useAuthStore();
        const id = ref(store.details[0]);

        onMounted(() => {   
            getPersonalRecord(id.value)
        })

        const checkText = (text) => {
            let newText = text.toLowerCase().replace(/ /g, '');
            let x = false;
            if(newText !== 'n/a' && newText !== 'na'){
                x = true;
            }
            return x;
        }
        const formatPrice = (value) =>  {
            let val = (value/1).toFixed(2);
            return val.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        }


        return{   
            officerecord,
            formatPrice,
            moment,
            id,
            checkText
            
        }
    }
}


</script>
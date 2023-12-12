<template>
    <template v-if="hld">
        <LoadingComponentDiv/>
    </template>
    <div class="row">
        <div class="col-12 p-title mb-2">
            <h2>Personal Info</h2>
        </div>
    </div>

    <div class="pProfilewrap container-fluid mb-4" v-if="officerecord.employee" :class="mbclass ? '': 'mobnone'">
        <div class="row mt-3">
            <div class="col pProfilewrap-title">
                <h2>Basic Info</h2>
            </div>
        </div>
        <div class="row mb-2">    
            <div class="col col-sm-2 col-lg-1">
                <div class="form-floating lblform-floating">    
                    <span class="form-control formfloatinglblT" id="empid">{{officerecord.employee_id}}</span>
                    <span class="form-span formfloatinglblB">ID Number</span>
                </div>
            </div>
            <div class="col mb-2">
                <div class="form-floating lblform-floating">                    
                    <span class="form-control formfloatinglblT" id="empname">{{officerecord.employee.employee_fname}} {{officerecord.employee.employee_mname}} {{officerecord.employee.employee_lname}}</span>
                    <span class="form-span formfloatinglblB">Name</span>
                </div>
            </div>
            <div class="col col-sm-auto align-self-center col-edit pi-edit">
                <router-link :to="{ name: 'recordpersonalname.edit'}">
                    <i class="fas fa-edit"></i> <span>Edit</span>
                </router-link>
            </div>     
        </div> 

        <div class="row mb-2" v-if="officerecord.pdspersonalinformation">    
            <template v-if="officerecord.pdspersonalinformation.birthdate">
                <div class="col mb-2">
                    <div class="form-floating lblform-floating">                    
                        <span class="form-control formfloatinglblT" id="empbday">                            
                                {{moment(officerecord.pdspersonalinformation.birthdate).format('MMMM D, YYYY')}}
                        </span>
                        <span class="form-span formfloatinglblB">Birthdate</span>
                    </div>
                </div>
            </template>
            <template v-if="officerecord.pdspersonalinformation.placeofbirth">
                <div class="col mb-2">
                    <div class="form-floating lblform-floating">                    
                        <span class="form-control formfloatinglblT" id="bdayplace">                            
                                {{officerecord.pdspersonalinformation.placeofbirth}}
                        </span>
                        <span class="form-span formfloatinglblB">Birth Place</span>
                    </div>
                </div>
            </template>
            <template v-if="officerecord.pdspersonalinformation.sex">
                <div class="col mb-2">
                    <div class="form-floating lblform-floating">                    
                        <span class="form-control formfloatinglblT"  id="sex">                        
                                <span v-if="officerecord.pdspersonalinformation.sex == 1">
                                    Male
                                </span>
                                <span v-else>
                                    Female
                                </span>                                
                        </span>
                        <span class="formfloatinglblB">Gender</span>
                    </div>
                </div>
            </template>  
           <div class="col-auto align-self-center col-edit pi-edit">
                <template v-if="officerecord.pdspersonalinformation.birthdate || officerecord.pdspersonalinformation.sex || officerecord.pdspersonalinformation.placeofbirth">
                    <router-link :to="{ name: 'recordpersonalbirthdaygender.edit'}"><i class="fas fa-edit"></i> <span>Edit</span></router-link>
                </template>
                
            </div>       
        </div> 
        <div class="row mb-2" v-if="officerecord.pdspersonalinformation">

            <div class="col mb-2">
                <div class="form-floating lblform-floating">                    
                    <span class="form-control formfloatinglblT" id="cnumber">                   
                           <template v-if="officerecord.employee">
                               <template v-if="officerecord.employee.employee_activemobile">
                                    (+63) {{officerecord.employee.employee_activemobile}}
                                </template>  
                           </template>                                     
                    </span>
                    <span class="form-span formfloatinglblB">Mobile Number <span class="text-warning">(active)</span></span>
                </div>
            </div>
            <div class="col mb-2" v-if="officerecord.pdspersonalinformation.telephone_no">
                <div class="form-floating lblform-floating">                    
                    <span class="form-control formfloatinglblT" id="cnumber">                   
                           <template v-if="officerecord.pdspersonalinformation.telephone_no">
                                <template v-if="checkText(officerecord.pdspersonalinformation.telephone_no)">
                                    {{officerecord.pdspersonalinformation.telephone_no}}
                                </template>                              
                           </template>                                     
                           
                    </span>

                    <span class="form-span formfloatinglblB">Telephone Number</span>
                </div>
            </div>

            <div class="col mb-2">
                <div class="form-floating lblform-floating">                    
                    <span class="form-control formfloatinglblT" id="emailaddress">

                        <template v-if="officerecord.pdspersonalinformation.emailaddress && checkText(officerecord.pdspersonalinformation.emailaddress)">
                            {{officerecord.pdspersonalinformation.emailaddress}}
                        </template>
                        
                    </span>
                    <span class="formfloatinglblB">Email Address</span>
                </div>
            </div>
            <div class="col-auto align-self-center col-edit pi-edit">
                <router-link :to="{ name: 'recordpersonalcontact.edit'}"><i class="fas fa-edit"></i> <span>Edit</span></router-link>
            </div>
        </div> 

        <div class="row mb-2">    
            <div class="col mb-2">
                <div class="form-floating lblform-floating">                    
                    <span class="form-control formfloatinglblT" id="cperson">          
                        <template v-if="officerecord.emergency_contactperson && checkText(officerecord.emergency_contactperson)">
                            {{officerecord.emergency_contactperson}}
                        </template>    
                        
                    </span>
                    <span class="formfloatinglblB">Emergency Contact Person</span>
                </div>
            </div>
            <div class="col mb-2">
                <div class="form-floating lblform-floating">                    
                    <span class="form-control formfloatinglblT" id="cnumber">
                        <template v-if="officerecord.emergency_contactnumber && checkText(officerecord.emergency_contactnumber)">
                            {{officerecord.emergency_contactnumber}}
                        </template>
                        
                    </span>
                    <span class="formfloatinglblB">Emergency Contact Number</span>
                </div>
            </div>
            <div class="col-auto align-self-center col-edit pi-edit">
                <router-link :to="{ name: 'recordpersonalcontactperson.edit' }"><i class="fas fa-edit"></i> <span>Edit Emergency Contact</span></router-link>
            </div>   
        </div> 
        <div class="row mb-2" v-if="address">
            <div class="col">
                <div class="form-floating lblform-floating">                    
                    <span class="form-control formfloatinglblT" id="empresidential">
                      {{address}}
                    </span>
                    <span class="formfloatinglblB">Residential Address</span>
                </div>
            </div>
        </div>

    </div>

    <div class="pProfilewrap container-fluid mb-4" v-if="officerecord"  :class="mbclass ? '': 'mobnone'">
        <div class="row mt-3">
            <div class="col pProfilewrap-title">
                <h2>Employment</h2>
            </div>
        </div>
        <div class="row mb-2">
            <div class="col mb-2" v-if="officerecord.employments">
                <div class="form-floating lblform-floating">                    
                    <span class="form-control formfloatinglblT" id="emptype">{{officerecord.employments[0].type.name}}</span>
                    <span class="formfloatinglblB">Type</span>
                </div>
            </div>
            <div class="col" v-if="officerecord.employments">
                <div class="form-floating lblform-floating">                    
                    <span class="form-control formfloatinglblT mhspan" id="empofficename">{{officerecord.employments[0].office.offices_name}}</span>
                    <span class="formfloatinglblB">Office</span>
                </div>
            </div>
        </div>
        
        <div class="row mb-2">
            <template v-if="officerecord.employments">
                <div class="col mb-2" v-if="officerecord.employments[0].position_id != 0">
                    <template v-if="officerecord.employments[0].position">                    
                        <div class="form-floating lblform-floating">
                            <span class="form-control formfloatinglblT" id="empposition">{{officerecord.employments[0].position.name}}</span>
                            <span class="formfloatinglblB">Position</span>
                        </div>
                    </template>
                </div>  

                <div class="col" v-if="officerecord.employments[0].startdate">
                    <div class="form-floating lblform-floating">                    
                        <span class="form-control formfloatinglblT mhspan" id="empsdate">{{moment(officerecord.employments[0].startdate).format('MMMM D, YYYY')}}</span>
                        <span class="formfloatinglblB">Start Date</span>
                    </div>
                </div>  

            </template>
                 
               
            

        </div>   
        <div class="row mb-2">
            <template v-if="officerecord.employments">
                <div class="col mb-2" v-if="officerecord.employments[0].salarygrade">
                    <div class="form-floating lblform-floating">                    
                        <span class="form-control formfloatinglblT" id="sgname">{{officerecord.employments[0].salarygrade.name}}</span>
                        <span class="formfloatinglblB">Salary Grade</span>
                    </div>
                </div>
                <div class="col mb-2" v-if="officerecord.employments[0].salarygradestep">                
                    <div class="form-floating lblform-floating">
                        <span class="form-control formfloatinglblT mhspan" id="sgvalue">₱ {{formatPrice(officerecord.employments[0].salarygradestep.value)}}</span>
                        <span class="formfloatinglblB">Value</span>
                    </div>
                </div>  
            </template>
        </div>
    </div>

</template>

<script>

import { onMounted, ref, inject, reactive, watch} from 'vue';


import useOfficerecord from '@/composables/composables-record';


import moment from 'moment'
import { useAuthStore } from '@/stores/store.js'
import { useHead } from '@unhead/vue'
import useEventsBus from '@/components/helper/Eventbus';

import { usePrivacyStore } from '@/stores/pristore.js'
import LoadingComponentDiv from '@/components/loader/LoadingComponentDiv.vue';

export default{
    components: {

        LoadingComponentDiv
     },
    setup (){
        useHead({
            title: 'My Personal Information | '+import.meta.env.VITE_BFAR_AGENCY
        })
        const swal = inject('$swal')
        const {officerecord,getPersonalRecord}= useOfficerecord()
        const pristore = usePrivacyStore();
        const store = useAuthStore();
        const id = ref(store.details[0]);
        const address = ref();
        const {bus,emit}=useEventsBus()
        const mbclass = ref(false);
        const hld = ref(true);
        onMounted(() => {   
            getPersonalRecord(id.value).then(() => {             
                if(officerecord.value.pdsaddress){
                    getAddress(officerecord.value.pdsaddress);
                }
                hld.value = false;
            })

            mbclass.value = pristore.dil;

        })


        pristore.$subscribe((m,s) => {
            mbclass.value = pristore.dil;

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
        const getAddress = (data) =>{
            let tempString = '';
   
            if(data.residential_barangay != null ||
                data.residential_house_no != null ||
                data.residential_municipality != null ||
                data.residential_province != null ||
                data.residential_street != null ||
                data.residential_subdivision != null ||
                data.residential_zipcode != null){

                if(data.residential_house_no){
                    tempString+= data.residential_house_no+', ';  
                }
                if(data.residential_street){
                    tempString+= data.residential_street+', '; 
                }
                if(data.residential_subdivision){
                    tempString+= data.residential_subdivision+', '; 
                }
                if(data.residential_barangay){
                    tempString+= data.residential_barangay+', '; 
                }
                if(data.pdsaddressres_mun){
                    tempString+= data.pdsaddressres_mun.citymunDesc+', '; 
                }
                if(data.pdsaddressres_prov){
                    tempString+= data.pdsaddressres_prov.provDesc+' '; 
                }
                if(data.residential_zipcode){
                    tempString+= data.residential_zipcode; 
                }

  
            }
            if(tempString){
                address.value = tempString.replace(/,\s*$/, "");
            }
        }

        
        return{   
            officerecord,
            formatPrice,
            moment,
            id,
            checkText,
            address,
            mbclass,
            hld
            
        }
    }
}


</script>
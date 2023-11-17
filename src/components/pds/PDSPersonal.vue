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
                    <span class="rff fs-5">Personal Information</span>
                </div>
            </div>
            <form v-on:submit.prevent="savepds">
                <div class="pPDSwrap container-fluid pb-4">
                    <div class="row mt-3">
                        <div class="col pPDSwrap-title">
                            <h2>Basic Info</h2>
                        </div>
                    </div>
                    <div class="row mb-2" v-if="officerecord.employee">
                        <div class="col mb-2 req c_p rpl">
                            <div class="form-floating">
                              <input type="text" name="employee_fname" placeholder="enter first name" id="employee_fname" class="form-control" v-model="officerecord.employee.employee_fname" :class="errors['employee.employee_fname']? 'error-input' : ''">
                              <label for="employee_fname" class="form-label">First Name</label>

                            </div>
                            <span v-if="errors['employee.employee_fname']" class="text-danger m-error">{{errors['employee.employee_fname'][0]}}</span>
                        </div>  
                        <div class="col c_p mb-2">
                            <div class="form-floating">                        
                                <input type="text" name="middlename" placeholder="enter middle name" id="employee_mname" class="form-control" v-model="officerecord.employee.employee_mname">
                                <label for="employee_mname" class="form-label">Middle Name</label>
                            </div>
                        </div>                
                        <div class="col c_p mb-2 req">
                            <div class="form-floating">                        
                                <input type="text" name="lastname" placeholder="enter last name" id="employee_lname" class="form-control" v-model="officerecord.employee.employee_lname" :class="errors['employee.employee_lname'] ? 'error-input' : ''">
                                <label for="employee_lname" class="form-label">Last Name</label>
                            </div>                    
                            <span v-if="errors['employee.employee_lname']" class="text-danger m-error">{{errors['employee.employee_lname'][0]}}</span>
                        </div>  
                        <div class="col col-sm-2 c_p rpr mb-2">
                            <div class="form-floating">                        
                                <input type="text" name="extensionname" id="employee_extname" class="form-control" placeholder="enter name ext." v-model="officerecord.employee.employee_extname">
                                <label for="employee_extname" class="form-label">Name Extension</label>
                            </div>                    
                        </div>
                    </div> 

                    <template v-if="officerecord.pdspersonalinformation">
                         <div class="row mb-2">
                            <div class="col c_p rpl mb-2">                                            
                                <Datepicker auto-apply week-start="0" :clearable="false" :enable-time-picker="false" v-model="officerecord.pdspersonalinformation.birthdate" @update:model-value="handleDate" name="birthdate" class="date-form-floating" placeholder="Date of Birth"></Datepicker>                           
                            </div> 
                            <div class="col col-sm-7 c_p col-xxl-8 mb-2">
                                <div class="form-floating">                        
                                    <input type="text" name="placeofbirth" id="placeofbirth" class="form-control" placeholder="enter place of birth"  v-model="officerecord.pdspersonalinformation.placeofbirth"
                                    >    
                                    <label for="placeofbirth" class="form-label">Place of Birth</label>                    
                                </div>
                                
                            </div>
                            <div class="col c_p rpr mb-2">
                                <span for="sex">Sex</span>
                                <div>
                                    <input type="radio" class="btn-check" name="sex" id="sex-male" v-model="officerecord.pdspersonalinformation.sex" value="1" autocomplete="off">
                                    <label class="btn btn-blue me-2" for="sex-male">Male</label>
                                    <input type="radio" class="btn-check" name="sex" id="sex-female" value="2" autocomplete="off" v-model="officerecord.pdspersonalinformation.sex">
                                    <label class="btn btn-blue" for="sex-female">Female</label>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col c_p rpl col-sm-2 mb-2">
                                <span class="d-block form-label">Civil Status</span>

                                <ul class="list-unstyled ulli-inline">
                                    <li>
                                        <div class="form-check">
                                          <input class="form-check-input" type="radio" v-model="officerecord.pdspersonalinformation.civilstatus" name="civilstatus" id="single" value="1">
                                          <label class="form-check-label" for="single">
                                            Single
                                          </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="form-check">
                                          <input class="form-check-input" type="radio" v-model="officerecord.pdspersonalinformation.civilstatus" name="civilstatus" id="widowed" value="2">
                                          <label class="form-check-label" for="widowed">
                                            Widowed
                                          </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="form-check">
                                          <input class="form-check-input" type="radio" v-model="officerecord.pdspersonalinformation.civilstatus" name="civilstatus" id="married" value="3">
                                          <label class="form-check-label" for="married">
                                            Married
                                          </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="form-check">
                                          <input class="form-check-input" type="radio" v-model="officerecord.pdspersonalinformation.civilstatus" name="civilstatus" id="separated" value="4">
                                          <label class="form-check-label" for="separated">
                                            Separated
                                          </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="form-check">
                                          <input class="form-check-input" type="radio" v-model="officerecord.pdspersonalinformation.civilstatus" name="civilstatus" id="others" value="5">
                                          <label class="form-check-label" for="others">
                                            Other/s:
                                          </label>
                                        </div>
                                    </li>
                                </ul>

                                <div class="form-floating" v-if="officerecord.pdspersonalinformation.civilstatus == 5">
                                    <input type="text" name="" class="form-control" placeholder="others" v-model="officerecord.pdspersonalinformation.civilstatusother">
                                    <label>Others</label>
                                </div>

                            </div>
                            <div class="col c_p mb-2">
                                <div class="form-floating mb-2">                        
                                    <input type="text" name="height" id="height" class="form-control" placeholder="enter height" v-model="officerecord.pdspersonalinformation.height">    
                                    <label for="height" class="form-label">Height (m)</label>                    
                                </div>
                                <div class="form-floating mb-2">                        
                                    <input type="text" name="weight" id="weight" class="form-control"  placeholder="enter weight" v-model="officerecord.pdspersonalinformation.weight">
                                    <label for="weight" class="form-label">Weight (kg)</label>                    
                                </div>

                                <div class="form-floating mb-2">                        
                                    <input type="text" name="bloodtype" id="empbloodtype" class="form-control" placeholder="enter blood type" v-model="officerecord.pdspersonalinformation.bloodtype">    
                                    <label for="empbloodtype" class="form-label">Blood Type</label>                    
                                </div>
                            </div>
                            <div class="col c_p mb-2">
                                <div class="form-floating mb-2">                        
                                    <input type="text" name="gsis_id" id="gsis_id" class="form-control" placeholder="enter gsis" v-model="officerecord.pdspersonalinformation.gsis_id">    
                                    <label for="gsis_id" class="form-label">GSIS ID No.</label>                    
                                </div>
                                <div class="form-floating mb-2">                        
                                    <input type="text" name="pagibig_id" id="pagibig_id" class="form-control" placeholder="enter pagibig" v-model="officerecord.pdspersonalinformation.pagibig_id">    
                                    <label for="pagibig_id" class="form-label">Pag-ibig ID No.</label>                    
                                </div>
                                <div class="form-floating mb-2">                        
                                    <input type="text" name="philhealth_no" class="form-control" placeholder="enter philhealth" v-model="officerecord.pdspersonalinformation.philhealth_no">    
                                    <label for="empbloodtype" class="form-label">Philhealth No.</label>                    
                                </div>
                            </div>
                            <div class="col c_p mb-2">
                                <div class="form-floating mb-2">                        
                                    <input type="text" name="sss_no" id="sss_no" class="form-control" placeholder="enter sss number" v-model="officerecord.pdspersonalinformation.sss_no">    
                                    <label for="sss_no" class="form-label">SSS No.</label>                    
                                </div>
                                <div class="form-floating mb-2">                        
                                    <input type="text" name="tin_no" class="form-control" id="tin_no" placeholder="enter tin number" v-model="officerecord.pdspersonalinformation.tin_no">    
                                    <label for="tin_no" class="form-label">TIN No.</label>                    
                                </div>
                                <div class="form-floating mb-2">                        
                                    <input type="text" name="agency_no" class="form-control" id="agency_no" placeholder="enter agency number" v-model="officerecord.pdspersonalinformation.agency_no">    
                                    <label for="agency_no" class="form-label">Agency Employee No.</label>                    
                                </div>
                            </div>
                            <div class="col c_p rpr mb-2">
                                <span class="d-block form-label">Citizenship</span>     
                                <div class="form-check">
                                  <input class="form-check-input" type="radio" name="citizenship" v-model="officerecord.pdspersonalinformation.citizenship" id="filipino" value="1">
                                  <label class="form-check-label" for="filipino">
                                    Filipino
                                  </label>
                                </div>
                                <div class="form-check">
                                  <input class="form-check-input" type="radio" name="citizenship" v-model="officerecord.pdspersonalinformation.citizenship" id="dualcitizen" value="2">
                                  <label class="form-check-label" for="dualcitizen">
                                    Dual Citizenship
                                  </label>
                                </div>
                                <template v-if="officerecord.pdspersonalinformation.citizenship == 2">
                                    <div>
                                        <div class="form-check form-check-inline">
                                          <input class="form-check-input" type="radio" name="citizenshipdual" id="citizenshipdual1" value="1"  v-model="officerecord.pdspersonalinformation.citizenshipdual">
                                          <label class="form-check-label" for="citizenshipdual1">by birth</label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                          <input class="form-check-input" type="radio" name="citizenshipdual" id="citizenshipdual2" value="2"  v-model="officerecord.pdspersonalinformation.citizenshipdual">
                                          <label class="form-check-label" for="citizenshipdual2">by naturalization</label>
                                        </div>
                                    </div>
                                    <div class="form-floating mt-4">                        
                                        <select class="form-select" v-model="officerecord.pdspersonalinformation.citizenshipdualcountry">
                                            <option v-for="country in countries" :value="country.id" :key="country.id">{{country.name}}</option>
                                        </select>
                                          
                                        <label for="dualcitizencountry" class="form-label">Pls. indicate country:</label>                    
                                    </div>
                                </template>                           

                            </div>
                        </div>     
                        <div class="row">
                            <div class="col c_p rpl mb-2">
                                <div class="form-floating mb-2">                        
                                    <input type="text" name="telephone_no" class="form-control" placeholder="enter telephone number" v-model="officerecord.pdspersonalinformation.telephone_no">    
                                    <label for="sss_no" class="form-label">Telephone No.</label>                    
                                </div>
                            </div>
                            <div class="col c_p mb-2">
                                <div class="form-floating mb-2">                        
                                    <input type="text" name="mobile" id="mobile_no" class="form-control" placeholder="enter mobile number" v-model="officerecord.pdspersonalinformation.mobile_no">    
                                    <label for="mobile_no" class="form-label">Mobile No.</label>                    
                                </div>
                            </div>
                            <div class="col c_p rpr mb-2">
                                <div class="form-floating mb-2">                        
                                    <input type="text" name="emailaddress" id="emailaddress" class="form-control" placeholder="enter email address" v-model="officerecord.pdspersonalinformation.emailaddress">    
                                    <label for="emailaddress" class="form-label">Email Address</label>                    
                                </div>
                            </div>
                        </div>           
                    </template>
                </div>
                <div class="pPDSwrap container-fluid pb-4 mt-3">
                    <div class="row mt-3">
                        <div class="col pPDSwrap-title">
                            <h2>Addresses</h2>
                        </div>
                    </div>
                    <template v-if="officerecord.pdsaddress">
                        <div class="form-row">
                            <div class="col">
                                <div class="residential mt-2">
                                    <div class="row mt-3">
                                        <div class="col pPDSwrap-title">
                                            <h3>Residential</h3>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col c_p rpl col-sm-2 col-xxl-1">
                                            <div class="form-floating">
                                                <input class="form-control" type="text" id="residential_house_no" name="residential_house_no" v-model="officerecord.pdsaddress.residential_house_no" placeholder="House / Block / Lot No.">
                                                <label for="residential_house_no">House No.</label>
                                            </div>
                                        </div>
                                        <div class="col c_p">
                                            <div class="form-floating">
                                                <input class="form-control" type="text" id="residential_street" name="residential_street" v-model="officerecord.pdsaddress.residential_street" placeholder="Street">
                                                <label for="residential_street">Street</label>
                                            </div>
                                        </div>
                                        <div class="col c_p">
                                            <div class="form-floating">
                                                <input class="form-control" type="text" id="residential_subdivision" name="residential_subdivision" v-model="officerecord.pdsaddress.residential_subdivision" placeholder="Subdividision / Village">
                                                <label for="residential_subdivision">Subdividision / Village</label>
                                            </div>
                                        </div>
                                        <div class="col c_p rpr">
                                            <div class="form-floating">
                                                <input class="form-control" type="text" id="residential_barangay" name="residential_barangay" v-model="officerecord.pdsaddress.residential_barangay" placeholder="Barangay">
                                                <label for="residential_barangay">Barangay</label>
                                            </div>
                                        </div>
                                    </div> 

                                    <div class="row mt-2">
                                        <div class="col c_p rpl">
                                            <div class="form-floating">
                                                <select class="form-select" @change="resProv" placeholder="select" id="residential_province" name="residential_province" v-model="officerecord.pdsaddress.residential_province">
                                                    <option v-for="province in provinces" :key="province.id" :value="province.provCode">
                                                        {{province.provDesc}}
                                                    </option>
                                                </select>
                                                <label for="residential_province">Province</label>
                                            </div>
                                        </div>
                                        <div class="col c_p">
                                            <div class="form-floating">
                                                <select class="form-select" placeholder="select" id="residential_municipality" name="residential_municipality" v-model="officerecord.pdsaddress.residential_municipality">
                      
                                                    <option v-for="municipality in provmun" :key="municipality.id" :value="municipality.id">
                                                        {{municipality.citymunDesc}}
                                                    </option>
                                                </select>
                                                <label for="residential_municipality">City / Municipality</label>
                                            </div>
                                        </div>
                                        <div class="col col-sm-2 col-xxl-1 c_p rpr">
                                            <div class="form-floating">
                                                <input class="form-control" type="text" id="residential_zipcode" name="residential_zipcode" v-model="officerecord.pdsaddress.residential_zipcode" placeholder="Subdividision / Village">
                                                <label for="residential_zipcode">ZIP Code</label>
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                                <div class="permanent mt-2">
                                    <div class="row mt-3">
                                        <div class="col pPDSwrap-title">
                                            <h3>Permanent</h3>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col col-sm-2 col-xxl-1 c_p rpl">
                                            <div class="form-floating">
                                                <input class="form-control" type="text" name="permanent_house_no" id="permanent_house_no" v-model="officerecord.pdsaddress.permanent_house_no" placeholder="House / Block / Lot No.">
                                                <label for="permanent_house_no">House No.</label>
                                            </div>
                                        </div>
                                        <div class="col c_p">
                                            <div class="form-floating">
                                                <input class="form-control" type="text" name="permanent_street" id="permanent_street" v-model="officerecord.pdsaddress.permanent_street" placeholder="Street">
                                                <label for="permanent_street">Street</label>
                                            </div>
                                        </div>
                                        <div class="col c_p">
                                            <div class="form-floating">
                                                <input id="permanent_subdivision" class="form-control" type="text" name="permanent_subdivision" v-model="officerecord.pdsaddress.permanent_subdivision" placeholder="Subdividision / Village">
                                                <label for="permanent_subdivision">Subdividision / Village</label>
                                            </div>
                                        </div>
                                        <div class="col c_p rpr">
                                            <div class="form-floating">
                                                <input class="form-control" type="text" id="permanent_barangay" name="permanent_barangay" v-model="officerecord.pdsaddress.permanent_barangay" placeholder="Barangay">
                                                <label for="permanent_barangay">Barangay</label>
                                            </div>
                                        </div>
                                    </div> 
                                    <div class="row mt-2">
                                        <div class="col c_p rpl">
                                            <div class="form-floating">
                                                <select class="form-select" @change="perProv" id="permanent_province" placeholder="select province" name="permanent_province" v-model="officerecord.pdsaddress.permanent_province">
                                                        <option disabled value="">Please select province</option>
                                                        <option v-for="province in provinces" :key="province.id" :value="province.provCode">
                                                            {{province.provDesc}}
                                                        </option>
                                                </select>
                                                <label for="permanent_province">Province</label>
                                            </div>
                                        </div>
                                        <div class="col c_p">
                                            <div class="form-floating">
                                                <select class="form-select" placeholder="select municipality" id="permanent_municipality" name="permanent_municipality" v-model="officerecord.pdsaddress.permanent_municipality">
                                                        <option disabled value="">Please select municipality</option>
                                                        <option v-for="municipality in perprovmun" :key="municipality.id" :value="municipality.id">
                                                        {{municipality.citymunDesc}}
                                                    </option>
                                                </select>
                                                <label for="permanent_municipality">City / Municipality</label>
                                            </div>
                                        </div>
                                        <div class="col col-sm-2 col-xxl-1 c_p rpr">
                                            <div class="form-floating">
                                                <input class="form-control" type="text" name="permanent_zipcode" id="permanent_zipcode" v-model="officerecord.pdsaddress.permanent_zipcode" placeholder="enter zip code">
                                                <label for="permanent_zipcode">ZIP Code</label>
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            

            
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


import useMunicipality from '@/composables/composables-municipality';
import useProvince from '@/composables/composables-province';
import useCountry from '@/composables/composables-country';
import RightNavigation from '@/components/navigation/RightNavigation.vue';
import { onMounted, ref, inject, onUpdated } from 'vue';
import moment from 'moment'
import { useAuthStore } from '@/stores/store.js'
import { useHead } from '@unhead/vue'

export default{
    components: {
        RightNavigation
    },
    setup (){
        useHead({
            title: 'PDS Personal Information | '+import.meta.env.VITE_BFAR_AGENCY
        })
        const swal = inject('$swal')
        const resMun = ref([]);

        
        const store = useAuthStore();
        const id = ref(store.details[0]);


        const {errors, updateMypds, officerecord, getPersonalRecord } = useOfficerecord()

        const {getCountries, countries} = useCountry();
        const { getProvMun, provmun, getMunicipalities, perprovmun, getperProvMun} = useMunicipality();
        const {  provinces, getProvinces} = useProvince();

        onMounted(() => {   
            getPersonalRecord(id.value).then(() => {
                if(officerecord.value.pdsaddress){
                    if(officerecord.value.pdsaddress.residential_province){
                        getProvMun(officerecord.value.pdsaddress.residential_province);
                    }                
                    if(officerecord.value.pdsaddress.permanent_province) {
                        getperProvMun(officerecord.value.pdsaddress.permanent_province);
                    }
                }
            }),
            getProvinces(),
            getCountries()

        })

        const handleDate = (x) =>{  
            officerecord.value.pdspersonalinformation.birthdate = moment(new Date(x)).format('YYYY-MM-DD');     
        }

        const resProv = async () =>{
            getProvMun(officerecord.value.pdsaddress.residential_province);
            officerecord.value.pdsaddress.residential_municipality = null;
        }
        const perProv = async () => {
            getperProvMun(officerecord.value.pdsaddress.permanent_province);
            officerecord.value.pdsaddress.permanent_municipality = null;
        }
        const twoDec = (num) => {
            if(num){
                 if (typeof num === 'number' && !Number.isNaN(num) && !Number.isInteger(num)) {
                        let newNum = parseFloat(num).toFixed(2);
                        return newNum;
                 }                
            }
        }
        const savepds = async () => {
            await updateMypds(id.value).then(() => {
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

        return{
            errors,
            savepds,
            officerecord,
            provinces,
            resProv,
            getProvMun,
            getperProvMun,
            getMunicipalities,
            provmun,
            perprovmun,
            perProv,
            moment,
            countries,
            twoDec,
            id,
            handleDate

        
        }
    }
}


</script>
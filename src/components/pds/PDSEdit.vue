<template>	 
    <div class="row w-right-nav">
        <div class="col leftpdscontent ptpb">
            <div class="row">
                <div class="col-md-12">
                    <h2 class="rff fs-3">Edit Employee Personal Data</h2>
                </div>
            </div>   
            <div class="row">
                <div class="col pds-group-title">
                    <span class="rff fs-5">Personal Information</span>
                </div>
            </div>
            <form v-on:submit.prevent="savepds">
                <div class="row mb-2">
                    <div class="col mb-2 req">
                        <div class="form-floating">
                          <input type="text" name="employee_fname" placeholder="enter first name" id="employee_fname" class="form-control" v-model="employee.employee_fname" :class="errors.employee_fname ? 'error-input' : ''">
                          <label for="name" class="form-label">First Name</label>
                        </div>
                        <span v-if="errors.employee_fname" class="text-danger m-error">{{errors.employee_fname[0]}}</span>
                    </div>  
                    <div class="col mb-2 req">
                        <div class="form-floating">                        
                            <input type="text" name="employee_mname" placeholder="enter middle name" id="employee_mname" class="form-control" v-model="employee.employee_mname" :class="errors.employee_mname ? 'error-input' : ''">
                            <label for="name" class="form-label">Middle Name</label>
                        </div>
                        <span v-if="errors.employee_mname" class="text-danger m-error">{{errors.employee_mname[0]}}</span>
                    </div>                
                    <div class="col mb-2 req">
                        <div class="form-floating">                        
                            <input type="text" name="employee_lname" placeholder="enter last name" id="employee_lname" class="form-control" v-model="employee.employee_lname" :class="errors.employee_lname ? 'error-input' : ''">
                            <label for="name" class="form-label">Last Name</label>
                        </div>                    
                        <span v-if="errors.employee_lname" class="text-danger m-error">{{errors.employee_lname[0]}}</span>
                    </div>  
                    <div class="col-sm-2 mb-2">
                        <div class="form-floating">                        
                            <input type="text" name="employee_extname" class="form-control" placeholder="enter name ext." v-model="employee.employee_extname">
                            <label for="employee_extname" class="form-label">Name Extension</label>
                        </div>                    
                    </div>
                </div> 

                <template v-if="employee.personalinformation">
                     <div class="row mb-2">
                        <div class="col mb-2">                                            
                            <Datepicker auto-apply :enable-time-picker="false" 
                            v-model="employee.personalinformation.birthdate" name="birthdate" class="date-form-floating" placeholder="select birth date"></Datepicker>                           
                        </div> 
                        <div class="col-sm-8 mb-2">
                            <div class="form-floating">                        
                                <input type="text" name="placeofbirth" class="form-control" placeholder="enter place of birth"  v-model="employee.personalinformation.placeofbirth">    
                                <label for="placeofbirth" class="form-label">Place of Birth</label>                    
                            </div>
                            
                        </div>
                        <div class="col mb-2">
                            <label for="sex">Sex</label>
                            <div>
                                <input type="radio" class="btn-check" name="sex" id="sex-male" v-model="employee.personalinformation.sex" value="1" autocomplete="off">
                                <label class="btn btn-blue me-2" for="sex-male">Male</label>
                                <input type="radio" class="btn-check" name="sex" id="sex-female" value="2" autocomplete="off" v-model="employee.personalinformation.sex">
                                <label class="btn btn-blue" for="sex-female">Female</label>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col col-sm-2 mb-2">
                            <label class="form-label">Civil Status</label>

                            <ul class="list-unstyled ulli-inline">
                                <li>
                                    <div class="form-check">
                                      <input class="form-check-input" type="radio" v-model="employee.personalinformation.civilstatus" name="civilstatus" id="single" value="1">
                                      <label class="form-check-label" for="single">
                                        Single
                                      </label>
                                    </div>
                                </li>
                                <li>
                                    <div class="form-check">
                                      <input class="form-check-input" type="radio" v-model="employee.personalinformation.civilstatus" name="civilstatus" id="widowed" value="2">
                                      <label class="form-check-label" for="widowed">
                                        Widowed
                                      </label>
                                    </div>
                                </li>
                                <li>
                                    <div class="form-check">
                                      <input class="form-check-input" type="radio" v-model="employee.personalinformation.civilstatus" name="civilstatus" id="married" value="3">
                                      <label class="form-check-label" for="married">
                                        Married
                                      </label>
                                    </div>
                                </li>
                                <li>
                                    <div class="form-check">
                                      <input class="form-check-input" type="radio" v-model="employee.personalinformation.civilstatus" name="civilstatus" id="separated" value="4">
                                      <label class="form-check-label" for="separated">
                                        Separated
                                      </label>
                                    </div>
                                </li>
                                <li>
                                    <div class="form-check">
                                      <input class="form-check-input" type="radio" v-model="employee.personalinformation.civilstatus" name="civilstatus" id="others" value="5">
                                      <label class="form-check-label" for="others">
                                        Other/s:
                                      </label>
                                    </div>
                                </li>
                            </ul>

                            <div class="form-floating" v-if="employee.personalinformation.civilstatus == 5">
                                <input type="text" name="" class="form-control" placeholder="others" v-model="employee.personalinformation.civilstatusother">
                                <label>Others</label>
                            </div>

                        </div>
                        <div class="col mb-2">
                            <div class="form-floating mb-2">                        
                                <input type="text" name="height" class="form-control" placeholder="enter height" v-model="employee.personalinformation.height">    
                                <label for="height" class="form-label">Height (m)</label>                    
                            </div>
                            <div class="form-floating mb-2">                        
                                <input type="text" name="weight" class="form-control" placeholder="enter weight" v-model="employee.personalinformation.weight">    
                                <label for="weight" class="form-label">Weight (kg)</label>                    
                            </div>
                            <div class="form-floating mb-2">                        
                                <input type="text" name="bloodtype" class="form-control" placeholder="enter blood type" v-model="employee.personalinformation.bloodtype">    
                                <label for="empbloodtype" class="form-label">Blood Type</label>                    
                            </div>
                        </div>
                        <div class="col mb-2">
                            <div class="form-floating mb-2">                        
                                <input type="text" name="gsis_id" class="form-control" placeholder="enter gsis" v-model="employee.personalinformation.gsis_id">    
                                <label for="gsis_id" class="form-label">GSIS ID No.</label>                    
                            </div>
                            <div class="form-floating mb-2">                        
                                <input type="text" name="pagibig_id" class="form-control" placeholder="enter pagibig" v-model="employee.personalinformation.pagibig_id">    
                                <label for="empweight" class="form-label">Pag-ibig ID No.</label>                    
                            </div>
                            <div class="form-floating mb-2">                        
                                <input type="text" name="philhealth_no" class="form-control" placeholder="enter philhealth" v-model="employee.personalinformation.philhealth_no">    
                                <label for="empbloodtype" class="form-label">Philhealth No.</label>                    
                            </div>
                        </div>
                        <div class="col mb-2">
                            <div class="form-floating mb-2">                        
                                <input type="text" name="sss_no" class="form-control" placeholder="enter height" v-model="employee.personalinformation.sss_no">    
                                <label for="sss_no" class="form-label">SSS No.</label>                    
                            </div>
                            <div class="form-floating mb-2">                        
                                <input type="text" name="tin_no" class="form-control" placeholder="enter weight" v-model="employee.personalinformation.tin_no">    
                                <label for="tin_no" class="form-label">TIN No.</label>                    
                            </div>
                            <div class="form-floating mb-2">                        
                                <input type="text" name="agency_no" class="form-control" placeholder="enter blood type" v-model="employee.personalinformation.agency_no">    
                                <label for="agency_no" class="form-label">Agency Employee No.</label>                    
                            </div>
                        </div>
                        <div class="col mb-2">
                            <label class="form-label">Citizenship</label>     
                            <div class="form-check">
                              <input class="form-check-input" type="radio" name="citizenship" v-model="employee.personalinformation.citizenship" id="filipino" value="1">
                              <label class="form-check-label" for="filipino">
                                Filipino
                              </label>
                            </div>
                            <div class="form-check">
                              <input class="form-check-input" type="radio" name="citizenship" v-model="employee.personalinformation.citizenship" id="dualcitizen" value="2">
                              <label class="form-check-label" for="dualcitizen">
                                Dual Citizenship
                              </label>
                            </div>
                            <template v-if="employee.personalinformation.citizenship == 2">
                                <div>
                                    <div class="form-check form-check-inline">
                                      <input class="form-check-input" type="radio" name="citizenshipdual" id="citizenshipdual1" value="1"  v-model="employee.personalinformation.citizenshipdual">
                                      <label class="form-check-label" for="citizenshipdual1">by birth</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                      <input class="form-check-input" type="radio" name="citizenshipdual" id="citizenshipdual2" value="2"  v-model="employee.personalinformation.citizenshipdual">
                                      <label class="form-check-label" for="citizenshipdual2">by naturalization</label>
                                    </div>
                                </div>
                                <div class="form-floating mt-4">                        
                                    <input type="text" name="citizenshipdualcountry" class="form-control" v-model="employee.personalinformation.citizenshipdualcountry" placeholder="please indicate country">    
                                    <label for="dualcitizencountry" class="form-label">Pls. indicate country:</label>                    
                                </div>
                            </template>
                            

                        </div>
                    </div>                
                </template>

               
                
            <template v-if="employee.address">
                <div class="form-row">
                    <div class="col">
                        <div class="residential mt-2">
                            <label class="form-label">Residential Address</label>
                            <div class="row">
                                <div class="col col-sm-1">
                                    <div class="form-floating">
                                        <input class="form-control" type="text" name="residential_house_no" v-model="employee.address.residential_house_no" placeholder="House / Block / Lot No.">
                                        <label>House No.</label>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-floating">
                                        <input class="form-control" type="text" name="residential_street" v-model="employee.address.residential_street" placeholder="Street">
                                        <label>Street</label>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-floating">
                                        <input class="form-control" type="text" name="residential_subdivision" v-model="employee.address.residential_subdivision" placeholder="Subdividision / Village">
                                        <label>Subdividision / Village</label>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-floating">
                                        <input class="form-control" type="text" name="residential_barangay" v-model="employee.address.residential_barangay" placeholder="Barangay">
                                        <label>Barangay</label>
                                    </div>
                                </div>
                            </div> 




                            <div class="row mt-2">
                                <div class="col">
                                    <div class="form-floating">
                                        <select class="form-select" @change="resProv" placeholder="select" name="residential_province" v-model="employee.address.residential_province">
                                            <option v-for="province in provinces" :key="province.id" :value="province.provCode">
                                                {{province.provDesc}}
                                            </option>
                                        </select>
                                        <label>Province</label>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-floating">
                                        <select class="form-select" placeholder="select" name="residential_municipality" v-model="employee.address.residential_municipality">
              
                                            <option v-for="municipality in provmun" :key="municipality.id" :value="municipality.id">
                                                {{municipality.citymunDesc}}
                                            </option>
                                        </select>
                                        <label>City / Municipality</label>
                                    </div>
                                </div>
                                <div class="col col-sm-1">
                                    <div class="form-floating">
                                        <input class="form-control" type="text" name="residential_zipcode" v-model="employee.address.residential_zipcode" placeholder="Subdividision / Village">
                                        <label>ZIP Code</label>
                                    </div>
                                </div>
                            </div> 
                        </div>
                        <div class="permanent mt-2">
                            <label class="form-label">Permanent Address</label>
                            <div class="row">
                                <div class="col col-sm-1">
                                    <div class="form-floating">
                                        <input class="form-control" type="text" name="permanent_house_no" v-model="employee.address.permanent_house_no" placeholder="House / Block / Lot No.">
                                        <label>House No.</label>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-floating">
                                        <input class="form-control" type="text" name="permanent_street" v-model="employee.address.permanent_street" placeholder="Street">
                                        <label>Street</label>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-floating">
                                        <input class="form-control" type="text" name="permanent_subdivision" v-model="employee.address.permanent_subdivision" placeholder="Subdividision / Village">
                                        <label>Subdividision / Village</label>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-floating">
                                        <input class="form-control" type="text" name="permanent_barangay" v-model="employee.address.permanent_barangay" placeholder="Barangay">
                                        <label>Barangay</label>
                                    </div>
                                </div>
                            </div> 
                            <div class="row mt-2">
                                <div class="col">
                                    <div class="form-floating">
                                        <select class="form-select" @change="perProv" placeholder="select" name="permanent_province" v-model="employee.address.permanent_province">
                                                <option disabled value="">Please select province</option>
                                                <option v-for="province in provinces" :key="province.id" :value="province.provCode">
                                                    {{province.provDesc}}
                                                </option>
                                        </select>
                                        <label>Province</label>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-floating">
                                        <select class="form-select" placeholder="select" name="permanent_municipality" v-model="employee.address.permanent_municipality">
                                                <option disabled value="">Please select municipality</option>
                                                <option v-for="municipality in perprovmun" :key="municipality.id" :value="municipality.id">
                                                {{municipality.citymunDesc}}
                                            </option>
                                        </select>
                                        <label>City / Municipality</label>
                                    </div>
                                </div>
                                <div class="col col-sm-1">
                                    <div class="form-floating">
                                        <input class="form-control" type="text" name="permanent_zipcode" v-model="employee.address.permanent_zipcode" placeholder="Subdividision / Village">
                                        <label>ZIP Code</label>
                                    </div>
                                </div>
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
import useEmployees from '@/composables/composables-employees';
import useMunicipality from '@/composables/composables-municipality';
import useProvince from '@/composables/composables-province';
import RightNavigation from '@/components/navigation/RightNavigation.vue';
import { onMounted, ref, inject, } from 'vue';


export default{

    props: {
        id: {
            required: true,
            type: String
        }
    },
    components: {
        RightNavigation
    },
    setup (props){




        const swal = inject('$swal')
        const resMun = ref([]);
        const { errors, employee, getEmployee, updateEmployeePDS } = useEmployees()
        const { getProvMun, provmun, getMunicipalities, perprovmun, getperProvMun} = useMunicipality()
        const {  provinces, getProvinces} = useProvince()

        onMounted(() => {   
            getEmployee(props.id).then(() => {
                if(employee.value.address){
                    if(employee.value.address.residential_province){
                    getProvMun(employee.value.address.residential_province);
                    }                
                    if(employee.value.address.permanent_province) {
                        getperProvMun(employee.value.address.permanent_province);
                    }
                }
            }),
            getProvinces()

        })
    

        const resProv = async () =>{
            getProvMun(employee.value.address.residential_province);
        }
        const perProv = async () => {
            getperProvMun(employee.value.address.permanent_province);
        }
        const savepds = async () => {

            await updateEmployeePDS(props.id).then(() => {
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
            savepds,
            getEmployee,
            employee,
            provinces,
            resProv,
            getProvMun,
            getperProvMun,
            getMunicipalities,
            provmun,
            perprovmun,
            perProv

        
        }
    }
}


</script>
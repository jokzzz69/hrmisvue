<template>
    <template v-if="hld">
        <LoadingComponentDiv/>
    </template>
    <div class="row">
        <div class="col-md-12 p-title">
            <h2>Custom Report</h2>
        </div>
    </div>	
    <div class="row">
        <div class="col xs-100 sm-100 xxs-100 col-md-4">
            <form  @submit.prevent="generateReport" class="row mb-2 pb-2">
                <div class="mb-2">
                    <div class="form-floating">
                        <select class="form-select border-blue" name="dtremployeetype" id="dtremployeetype" v-model="form.employee_type">
                            <option disabled value="">Select Type</option>
                            <option value="2" >All</option>
                            <option value="0" >Permanent</option>
                            <option value="1" >Job Order</option>                            
                        </select>     
                        <label class="form-label" for="dtremployeetype">Employee Type</label> 
                    </div>
                </div>
                <div class="mb-2">
                    <div class="form-floating">
                        <select class="form-select border-blue" name="dtroptions" id="dtroptions" v-model="form.report_type" @change="selectChange">
                            <option disabled value="">Select</option>
                            <option value="1" >All</option>
                            <option value="2" >Years of Service</option>
                            <option value="3" >Year Hired</option>     
                            <option value="4" >Birth Month</option>
                        </select>     
                        <label class="form-label" for="dtroptions">Filter</label> 
                    </div>
                </div>
                <template v-if="form.report_type == 2">
                    <div class="mb-2">                  
                        <ul class="list-unstyled row">
                            <li class="col-auto align-items-center d-flex">
                                <label class="form-label fl-100 mb-0 text-end">Enter year(s) of Service:</label>
                            </li>
                            <li class="col-4">
                                <input type="number" min="0" class="mhlabel form-control border-blue" name="yearofservice" v-model="form.yearofservice">
                            </li>
                        </ul>
                    </div>
                </template>
                <template v-if="form.report_type == 3">
                    <div class="col col-sm-12 mb-2"> 
                        <ul class="list-unstyled row">
                            <li class="col-auto align-items-center d-flex">
                                <label class="form-label fl-100 mb-0 text-end">Select year: </label>
                            </li>
                            <li class="col-4">
                                <Datepicker v-model="form.yearhiredfrom" :class="errors.yearhiredfrom ? 'error-input' : ''" class="date-form-floating" id="fdate" placeholder="From" auto-apply year-picker :clearable="false"></Datepicker>  
                                <span v-if="errors.yearhiredfrom" class="text-danger m-error">{{errors.yearhiredfrom[0]}}</span>
                            </li>
                            <li class="col-4">
                                <Datepicker v-model="form.yearhiredto" :class="errors.yearhiredfrom ? 'error-input' : ''" class="date-form-floating" id="fdate" placeholder="To" auto-apply year-picker :clearable="false"></Datepicker>  
                                <span v-if="errors.yearhiredto" class="text-danger m-error">{{errors.yearhiredto[0]}}</span>
                            </li>
                        </ul>
                    </div>
                </template>
                <template v-if="form.report_type == 4">
                    <div class="col col-sm-12 mb-2"> 
                        <ul class="list-unstyled row">
                            <li class="col-auto align-self-center d-flex">
                                <label class="form-label fl-100 mb-0 text-end">Select month: </label>
                            </li>
                            <li class="col-4">
                                <select class="form-select border-blue mhlabel" name="dtremployeetype" v-model="form.birthmonth">
                                    <option disabled value="" >Month</option>
                                    <option value="1" >January</option>
                                    <option value="2" >February</option>
                                    <option value="3" >March</option>
                                    <option value="4" >April</option>                           
                                    <option value="5" >May</option>
                                    <option value="6" >June</option>
                                    <option value="7" >July</option>
                                    <option value="8" >August</option>
                                    <option value="9" >September</option>
                                    <option value="10" >October</option>
                                    <option value="11" >November</option>
                                    <option value="12" >December</option>
                                </select>
                            </li>
                        </ul>                 
                    </div>
                </template>    
          
                <div class="col col-sm-12">
                    <ul class="list-unstyled fl-100 fl">
                        <li><button class="btn btn-blue" type="submit"><i class="fa-solid fa-arrows-spin"></i> Generate Report</button></li>
                        <template v-if="officerecords">
                            <li>
                                <a href="#" type="button" class="btn btn-outline-success" title="Export Data to Excel"  @click.prevent="downloadgeneratedcustomExcel"><i class="fa-solid fa-file-pdf"></i> Download Excel</a>
                            </li>
                            <li v-if="authslug == 'super-admin'">
                                <a href="#" type="button" class="btn btn-outline-danger" title="Export Data to PDF"  @click.prevent="downloadgeneratedcustomPDF"><i class="fa-solid fa-file-pdf"></i> Download PDF</a>
                            </li>
                        </template>                       
                    </ul>
                </div>
            </form>
        </div>
        <div class="col xs-100 sm-50 xxs-100 col-md-4 mb-2">
            <div class="officesSelect fl-100" >
                <span class="form-label fm d-block"><strong>Offices</strong></span>
                <div class="form-check form-switch">
                  <input class="form-check-input" @change='updateCheck()' type="checkbox" id="alloffice"  v-model="allSelected" value="alloffice">
                  <label class="form-check-label" for="alloffice">All Offices</label>
                </div>          
                <ul class="list-unstyled li--50">                   
                    <template v-for="location in locations">
                        <li>
                            <div class="form-check form-switch childCheck">
                              <input class="form-check-input" @change='selectCheck()' type="checkbox" :id="location.location_id" checked v-model="form.selected" :value="location.location_id">
                              <label class="form-check-label" :for="location.location_id">{{location.location_name}}</label>
                            </div>  
                        </li>
                    </template>
                </ul>
            </div>
        </div>
        <div class="col xs-100 sm-50 xxs-100 col-sm-4 mb-2">
            <div class="officesSelect fl-100" >
                <span class="form-label fm d-block"><strong>Fields</strong></span>
                <div class="form-check form-switch">
                  <input class="form-check-input" @change='checkAllFields()' type="checkbox" id="allfields"  v-model="allFields" value="allfield">
                  <label class="form-check-label" for="allfields">All Fields</label>
                </div>          
                <ul class="list-unstyled li--50">                    
                    <li>
                        <div class="form-check form-switch childCheck">
                          <input class="form-check-input" @change='selectField()' id="field_email"  type="checkbox" checked v-model="form.fields" value="1">
                          <label class="form-check-label" for="field_email">Email Address</label>
                        </div>  
                    </li>
                    <li>
                        <div class="form-check form-switch childCheck">
                          <input class="form-check-input" @change='selectField()' id="field_office" type="checkbox" checked v-model="form.fields" value="2">
                          <label class="form-check-label" for="field_office">Office</label>
                        </div>  
                    </li>
                    <li>
                        <div class="form-check form-switch childCheck">
                          <input class="form-check-input" @change='selectField()' id="field_position" type="checkbox" checked v-model="form.fields" value="3">
                          <label class="form-check-label" for="field_position">Position</label>
                        </div>  
                    </li>
                    <li>
                        <div class="form-check form-switch childCheck">
                          <input class="form-check-input" @change='selectField()' id="field_civilstatus" type="checkbox" checked v-model="form.fields" value="4">
                          <label class="form-check-label" for="field_civilstatus">Civil Status</label>
                        </div>  
                    </li>
                    <li>
                        <div class="form-check form-switch childCheck">
                          <input class="form-check-input" @change='selectField()' id="field_gender" type="checkbox" checked v-model="form.fields" value="5">
                          <label class="form-check-label" for="field_gender">Gender</label>
                        </div>  
                    </li>
                    <li>
                        <div class="form-check form-switch childCheck">
                          <input class="form-check-input" @change='selectField()' id="field_birthdate" type="checkbox" checked v-model="form.fields" value="6">
                          <label class="form-check-label" for="field_birthdate">Birthdate</label>
                        </div>  
                    </li>
                    <li>
                        <div class="form-check form-switch childCheck">
                          <input class="form-check-input" @change='selectField()' id="field_residential" type="checkbox" checked v-model="form.fields" value="7">
                          <label class="form-check-label" for="field_residential">Residential</label>
                        </div>  
                    </li>
                    <li>
                        <div class="form-check form-switch childCheck">
                          <input class="form-check-input" @change='selectField()' id="field_eduationalattainment" type="checkbox" checked v-model="form.fields" value="8">
                          <label class="form-check-label" for="field_eduationalattainment">Educational Attainment</label>
                        </div>  
                    </li>
                    <li>
                        <div class="form-check form-switch childCheck">
                          <input class="form-check-input" @change='selectField()' id="field_schoolgraduated" type="checkbox" checked v-model="form.fields" value="9">
                          <label class="form-check-label" for="field_schoolgraduated">School Graduated</label>
                        </div>  
                    </li>
                    <li>
                        <div class="form-check form-switch childCheck">
                          <input class="form-check-input" @change='selectField()' id="field_eligibility" type="checkbox" checked v-model="form.fields" value="10">
                          <label class="form-check-label" for="field_eligibility">Eligibility</label>
                        </div>  
                    </li>
                    <li>
                        <div class="form-check form-switch childCheck">
                          <input class="form-check-input" @change='selectField()' id="field_tin" type="checkbox" checked v-model="form.fields" value="11">
                          <label class="form-check-label" for="field_tin">TIN Number</label>
                        </div>  
                    </li>
                    <li>
                        <div class="form-check form-switch childCheck">
                          <input class="form-check-input" @change='selectField()' id="field_mobile" type="checkbox" checked v-model="form.fields" value="12">
                          <label class="form-check-label" for="field_mobile">Mobile Number</label>
                        </div>  
                    </li>
                    <li>
                        <div class="form-check form-switch childCheck">
                          <input class="form-check-input" @change='selectField()' id="field_datestarted" type="checkbox" checked v-model="form.fields" value="13">
                          <label class="form-check-label" for="field_datestarted">Date Started</label>
                        </div>  
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <table class="mtable mt-2 mb-2 table notbllink">
        <thead>
            <tr>
                <th>First Name</th>
                <th>Middle Name</th>
                <th>Last Name</th>
                <th>Name Extension</th>
                <th v-if="form.employee_type == 2">Employee Type</th>
                <th v-if="form.fields.indexOf(1) !== -1 || form.fields.indexOf('1') !== -1">Email Address</th>
                <th v-if="form.fields.indexOf(2) !== -1 || form.fields.indexOf('2') !== -1">Office</th>
                <th v-if="form.fields.indexOf(3) !== -1 || form.fields.indexOf('3') !== -1 ">Position</th>
                <th v-if="form.fields.indexOf(4) !== -1 || form.fields.indexOf('4') !== -1">Civil Status</th>
                <th v-if="form.fields.indexOf(5) !== -1 || form.fields.indexOf('5') !== -1">Gender</th>
                <th v-if="form.fields.indexOf(6) !== -1 || form.fields.indexOf('6') !== -1">Birthdate</th>
                <th v-if="form.fields.indexOf(7) !== -1 || form.fields.indexOf('7') !== -1">Residential / Home Address</th>
                <th v-if="form.fields.indexOf(8) !== -1 || form.fields.indexOf('8') !== -1">Educational Attainment</th>
                <th v-if="form.fields.indexOf(9) !== -1 || form.fields.indexOf('9') !== -1">School Graduated</th>
                <th v-if="form.fields.indexOf(10) !== -1 || form.fields.indexOf('10') !== -1">Eligibility</th>
                <th v-if="form.fields.indexOf(11) !== -1 || form.fields.indexOf('11') !== -1">TIN Number</th>
                <th v-if="form.fields.indexOf(12) !== -1 || form.fields.indexOf('12') !== -1">Mobile Number</th>
                <th v-if="form.fields.indexOf(13) !== -1 || form.fields.indexOf('13') !== -1">Date Started</th>
                <th v-if="form.report_type == 2">Year(s) of Service</th>
            </tr>
        </thead>
        <tbody>
            <template v-if="officerecords">
                <template v-for="officerecord in officerecords" :key="officerecord.id">
                    <tr>
                        <td>
                            <template v-if="officerecord.employee">
                                {{officerecord.employee.employee_fname }}
                            </template>
                        </td>
                        <td>
                            <template v-if="officerecord.employee">
                                {{ officerecord.employee.employee_mname }}
                            </template>
                        </td>
                        <td>
                            <template v-if="officerecord.employee">
                                {{ officerecord.employee.employee_lname }}
                            </template>
                        </td>
                        <td>
                            <template v-if="officerecord.employee && officerecord.employee.employee_extname">
                               <template v-if="checkText(officerecord.employee.employee_extname)">
                                   {{ officerecord.employee.employee_extname }}
                               </template>
                            </template>
                        </td>
                        <td v-if="form.employee_type == 2">
                            <template v-if="officerecord.employments[0].type_id == 1">
                                Job Order
                            </template>
                            <template v-else>
                                Permanent
                            </template>
                        </td>
                        <td v-if="form.fields.indexOf(1) !== -1 || form.fields.indexOf('1') !== -1">
                            <template v-if="officerecord.pdspersonalinformation">
                                {{officerecord.pdspersonalinformation.emailaddress }} 
                            </template>
                        </td>     
                        <td v-if="form.fields.indexOf(2) !== -1 || form.fields.indexOf('2') !== -1">
                            <template v-if="officerecord.employments">
                                <template v-if="officerecord.employments[0].office">
                                    {{officerecord.employments[0].office.offices_name }} 
                                </template>                                
                            </template>
                        </td>
                        <td v-if="form.fields.indexOf(3) !== -1 || form.fields.indexOf('3') !== -1">
                            <template v-if="officerecord.position">
                                {{officerecord.position.name }} 
                            </template>
                            <template v-if="officerecord.employments">
                                <template v-if="officerecord.employments[0].position">
                                    {{officerecord.employments[0].position.name }} 
                                </template>                                
                            </template>
                        </td>
                        <td v-if="form.fields.indexOf(4) !== -1 || form.fields.indexOf('4') !== -1">
                            <template v-if="officerecord.pdspersonalinformation">
                                <template v-if="officerecord.pdspersonalinformation.civilstatus == 1">
                                    Single
                                </template>
                                <template v-else-if="officerecord.pdspersonalinformation.civilstatus == 2">
                                    Widowed
                                </template>
                                <template v-else-if="officerecord.pdspersonalinformation.civilstatus == 3">
                                    Married
                                </template>
                                <template v-else-if="officerecord.pdspersonalinformation.civilstatus == 4">
                                    Separated
                                </template>
                                <template v-else-if="officerecord.pdspersonalinformation.civilstatus == 5">
                                    {{officerecord.pdspersonalinformation.civilstatusother}}
                                </template>

                            </template>
                        </td>
                        <td v-if="form.fields.indexOf(5) !== -1 || form.fields.indexOf('5') !== -1">
                            <template v-if="officerecord.pdspersonalinformation">
                                <template v-if="officerecord.pdspersonalinformation.sex == 1">
                                    Male
                                </template>
                                <template v-else-if="officerecord.pdspersonalinformation.sex == 2">
                                    Female
                                </template>
                            </template>
                        </td>
                        <td v-if="form.fields.indexOf(6) !== -1 || form.fields.indexOf('6') !== -1">
                            <template v-if="officerecord.pdspersonalinformation">
                                <template v-if="officerecord.pdspersonalinformation.birthdate">
                                    {{moment(new Date(officerecord.pdspersonalinformation.birthdate)).format('MMMM D, Y') }} 
                                </template>                            
                            </template>
                        </td>
                        <td v-if="form.fields.indexOf(7) !== -1 || form.fields.indexOf('7') !== -1">
                            <template v-if="officerecord.pdsaddress">                              
                                <template v-if="officerecord.pdsaddress.residential_street || officerecord.pdsaddress.residential_house_no || officerecord.pdsaddress.residential_subdivision">
                                    <template v-if="officerecord.pdsaddress.residential_house_no">
                                        <span>{{officerecord.pdsaddress.residential_house_no}}&nbsp;</span>
                                    </template>
                                    <template v-if="officerecord.pdsaddress.residential_street">
                                        <span> {{officerecord.pdsaddress.residential_street}},&nbsp;</span>
                                    </template>
                                    <template v-if="officerecord.pdsaddress.residential_subdivision">
                                        <span>{{officerecord.pdsaddress.residential_subdivision}},&nbsp;</span>
                                    </template>    
                                </template>
                                <template v-if="officerecord.pdsaddress.residential_barangay">
                                    <span>{{officerecord.pdsaddress.residential_barangay}},&nbsp;</span>
                                </template>    
                                <template v-if="officerecord.pdsaddress.residential_municipality">
                                    <span>{{officerecord.pdsaddress.pdsaddressres_mun.citymunDesc}},&nbsp;</span>
                                </template>  
                                <template v-if="officerecord.pdsaddress.residential_province">
                                    <span>{{officerecord.pdsaddress.pdsaddressres_prov.provDesc}}&nbsp;</span>
                                </template>                  
                            </template>
                        </td>
                        <td v-if="form.fields.indexOf(8) !== -1 || form.fields.indexOf('8') !== -1">                            
                            <template v-if="officerecord.pdseducationalbackgroundtertiary.length > 0">                           
                                <template v-for="(val,key) in officerecord.pdseducationalbackgroundtertiary">                                        
                                        <template v-if="val.tertiary_course && checkText(val.tertiary_course)">
                                            {{val.tertiary_course}}<br/> 
                                        </template>                                                       
                                </template>

                            </template>  
                            <template v-else>
                                <template v-if="officerecord.pdseducationalbackground">
                                    <template v-if="officerecord.pdseducationalbackground.secondary_course && checkText(officerecord.pdseducationalbackground.secondary_course)">
                                            {{officerecord.pdseducationalbackground.secondary_course}}<br/> 
                                        </template>                                     
                                </template>
                            </template>                     
                        </td>
                        <td v-if="form.fields.indexOf(9) !== -1 || form.fields.indexOf('9') !== -1">
                            <template v-if="officerecord.pdseducationalbackgroundtertiary.length > 0">                           
                                <template v-for="(val,key) in officerecord.pdseducationalbackgroundtertiary">
                                    <template v-if="val.tertiary_school && checkText(val.tertiary_school)">
                                        {{val.tertiary_school}} <br/>   
                                    </template>                                                      
                                </template>

                            </template>  
                            <template v-else>
                                <template v-if="officerecord.pdseducationalbackground">
                                    <template v-if="officerecord.pdseducationalbackground.secondary_school && checkText(officerecord.pdseducationalbackground.secondary_school)">
                                        {{officerecord.pdseducationalbackground.secondary_school}} <br/>   
                                    </template>
                                </template>
                            </template>       
                        </td>
                        <td v-if="form.fields.indexOf(10) !== -1 || form.fields.indexOf('10') !== -1">
                            <template v-if="officerecord.pdscsc">
                                <template v-for="val in officerecord.pdscsc">
                                    {{val.csc_licensename }} 
                                </template>                            
                            </template>
                        </td>
                        <td v-if="form.fields.indexOf(11) !== -1 || form.fields.indexOf('11') !== -1">
                            <template v-if="officerecord.pdspersonalinformation">
                                {{officerecord.pdspersonalinformation.tin_no    }} 
                            </template>
                        </td>
                        <td v-if="form.fields.indexOf(12) !== -1 || form.fields.indexOf('12') !== -1">
                            <template v-if="officerecord.pdspersonalinformation">
                                {{officerecord.pdspersonalinformation.mobile_no }} 
                            </template>
                        </td>
                        <td v-if="form.fields.indexOf(13) !== -1 || form.fields.indexOf('13') !== -1">
                            <template v-if="officerecord.employments[0].startdate">
                                {{moment(new Date(officerecord.employments[0].startdate)).format('MMMM DD, YYYY')}} 
                            </template>
                        </td>
                        <td v-if="form.report_type == 2">
                            <template v-if="officerecord.employments[0].yearofservice">                                
                                {{convertMtoY(officerecord.employments[0].yearofservice)}}                   
                            </template>                            
                        </td>
                    </tr>
                </template>
            </template>
            <template v-else>
                <tr>
                    <td :colspan="form.fields.length + 4" class="text-center">No Data Generated</td>
                </tr>
            </template>
        </tbody>
    </table>
</template>
<script>
    import {onMounted ,ref, computed, inject, reactive} from 'vue';
    import { sortBy} from 'lodash';
    import {useRouter} from 'vue-router'    
    import useCustomReport from '@/composables/composables-customreport';
    import useLocations from '@/composables/composables-location';
    import { useAuthStore } from '@/stores/store.js'

    import moment from 'moment'
    import { useHead } from '@unhead/vue'
    import LoadingComponentDiv from '@/components/loader/LoadingComponentDiv.vue';

	export default{
        components: {
            LoadingComponentDiv
        },
		setup(){
            useHead({
                title: 'Custom Report | '+import.meta.env.VITE_BFAR_AGENCY
            })
            const store = useAuthStore();
            const authslug = store.getdetails[1];

            const swal = inject('$swal')            
            const sortColumn = ref("id");
            const sortDirection = ref(1);
            const arrowIconName = ref("arrow_drop_up"); 

            const allSelected = ref(false);
            const allFields = ref(false);
            const {generateCustomReport, errors, officerecords, getOfficeRecords, downloadcustomPDF, downloadcustomExcel} = useCustomReport()
            const {getLocations, locations} = useLocations()

            const form = reactive({
                'employee_type' : '',
                'report_type': '',
                'yearofservice': '',
                'yearhiredfrom' : '',
                'yearhiredto' : '',
                'birthmonth': '',
                'selected': '',
                'fields': '',
                'travelcategory': '',
                'traveldate': ''

            })
            const hld = ref(true);

            onMounted(() => {
                getLocations().then(() => {
                    allSelected.value = true;
                    allFields.value = true;
                    updateCheck()
                    checkAllFields()
                    hld.value = false;
                })
                form.employee_type = 2;
                form.report_type = 1;
            })


            const sortTable = (columnName) => {

            }
            const checkAllFields = async () => {
                if(allFields.value){
                    form.fields = [];                    
                    form.fields = [1,2,3,4,5,6,7,8,9,10,11,12,13];
                }else{
                    form.fields = [];
                }
            }
            const updateCheck = async () => {
                if(allSelected.value){                    
                    form.selected = [];
                    for (var location in locations.value) {
                        form.selected.push(locations.value[location].location_id);
                    }
                }else{
                    form.selected = [];
                }
            }
            const selectCheck = async () =>{
                allSelected.value = false;
                if(form.selected.length == locations.value.length){
                    allSelected.value = true;
                }
            }
            const selectField = async () => {
                allFields.value = false;
                if(form.fields.length  == 13){
                    allFields.value = true;
                }
            }
            const selectChange = async () => {
                form.yearofservice = '';
                form.yearhiredfrom = '';
                form.yearhiredto = '';
                form.birthmonth = '';
            }
            const generateReport = async() => {
                await generateCustomReport({ ...form });
                

            }
            const convertMtoY = (x) => {
                let yrmsg = '';
                if(x > 11){
                    let y = Math.floor(x/12);
                    let m = Math.floor(x%12)
                    
                    if(y > 1){
                        if(m > 0){
                            if(m > 1){
                                yrmsg = y+' years and '+m+' months';
                            }else{
                                yrmsg = y+' years and '+m+' month';
                            }
                        }else{
                            yrmsg = y+' years';
                        }
                    }else{
                        if(m > 0){
                            if(m > 1){
                                yrmsg = y+' year and '+m+' months';
                            }else{
                                yrmsg = y+' year and '+m+' month';
                            }
                        }
                    }
                }else{
                    if(x > 1){
                        yrmsg = x+' months';
                    }else{
                        yrmsg = x+' month';
                    }
                }
                return yrmsg;
            }
            const checkText = (text) => {
                let newText = text.toLowerCase().replace(/ /g, '');
                let x = false;
                if(newText !== 'n/a' && newText !== 'na'){
                    x = true;
                }
                return x;
            }
            const clearTraveldate = async() => {
                form.traveldate = '';
            }
            const downloadgeneratedcustomExcel = async() => {
                await downloadcustomExcel({...form});
            }
            const downloadgeneratedcustomPDF = async() => {
                await downloadcustomPDF({...form});
            }
			return {
                officerecords,
                form,
                generateReport,
                selectChange,
                errors,
                sortTable,
                sortColumn,
                moment,
                locations,
                allSelected,
                updateCheck,
                selectCheck,
                convertMtoY,
                checkAllFields,
                allFields,
                selectField,
                clearTraveldate,
                checkText,
                downloadgeneratedcustomExcel,
                downloadgeneratedcustomPDF,
                authslug,
                hld
			}
		}
	}
</script>
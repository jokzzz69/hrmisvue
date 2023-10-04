<template>
	<div class="row">
		<div class="col-md-12 p-title">
			<h2>Edit Employee Record</h2>
		</div>
	</div>

    <form v-on:submit.prevent="saveOfficeRecord">
        
        <div class="pProfilewrap p-2 mb-4">
            <div class="row">
                <div class="pProfilewrap-title mt-2 mb-2">
                    <h2 class="mb-2">Basic Info </h2>
                    <span class="d-block fw-bolder mb-1 rff">ID Number: <template v-if="officerecord.employee">{{officerecord.employee.employee_id}}</template></span>
                </div>
            </div>
            <div class="row mb-2" v-if="officerecord.employee">    
                <div class="col col-sm-1 mb-2">
                    <div class="form-floating">
                        <select class="form-select" name="employee_bioid" id="employee_bioid" v-model="officerecord.employee.employee_bioid">
                            <option value="">No Bio</option>
                            <option v-for="id in availablewcids" :value="id">
                                {{id}}
                            </option>               
                        </select>

                        <label for="employee_bioid" class="form-label">Biometrics ID</label>
                    </div>
                </div>        
                <div class="col mb-2 req">                
                    <div class="form-floating">
                        <input type="text" name="employee_fname" placeholder="enter first name" id="employee_fname" class="form-control" v-model="officerecord.employee.employee_fname" :class="errors['employee.employee_fname'] ? 'error-input' : ''">
                        <label for="employee_fname" class="form-label">First Name</label>
                    </div> 
                    <span v-if="errors['employee.employee_fname']" class="text-danger m-error">{{errors['employee.employee_fname'][0]}}</span>                
                </div>  
                <div class="col mb-2">                
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

            <div class="row mb-2">
                <div class="col mb-2">
                    <div class="form-floating">
                        <input type="text" name="emergency_contactperson" placeholder="enter first name" id="emergency_contactperson" class="form-control" v-model="officerecord.emergency_contactperson" :class="errors['employee.emergency_contactperson'] ? 'error-input' : ''">
                        <label for="emergency_contactperson" class="form-label">Contact Person</label>
                    </div> 
                    <span v-if="errors['emergency_contactperson']" class="text-danger m-error">{{errors['emergency_contactperson'][0]}}</span>
                </div>
                <div class="col mb-2">
                    <div class="form-floating">
                        <input type="number" name="emergency_contactnumber" placeholder="enter middle name" id="emergency_contactnumber" class="form-control" v-model="officerecord.emergency_contactnumber">
                        <label for="emergency_contactnumber" class="form-label">Contact Number</label>
                    </div>
                    <span v-if="errors['emergency_contactnumber']" class="text-danger m-error">{{errors['emergency_contactnumber'][0]}}</span>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col pProfilewrap-title">
                <h2 class="mb-0">Employment</h2>
                <small class="mb-2 d-block fst-italic fw-light">* BFAR CAR ONLY</small>
            </div>
             <span v-if="errors['employments']" class="text-danger m-error">{{errors['employments'][0]}}</span>
        </div>
        <template v-if="officerecord.employments">
            <template v-for="(div, key) in divs">
                <div class="pe-2 ps-2 pt-3 pb-2 mb-2 pProfilewrap" :class="officerecord.employments[key].status_id == 1 ? 'bg-active' : ''">
                    <div class="row mb-2">
                        <div class="col mb-2 req">                
                            <div class="form-floating">
                                <select class="form-select" :name="`type_id[${key}]`" :id="`type_id[${key}]`"  v-model="officerecord.employments[key].type_id" :class="errors[`employments.${key}.type_id`] ? 'error-input' : ''">
                                    <option disabled value="">Select type</option>
                                    <option v-for="employeetype in employeetypes" :value="employeetype.id">
                                        {{employeetype.name}}
                                    </option>               
                                </select>
                                <label :for="`type_id[${key}]`" class="form-label">Employment Type</label>
                            </div>
                            <span v-if="errors[`employments.${key}.type_id`]" class="text-danger m-error">{{errors[`employments.${key}.type_id`][0]}}</span>
                        </div>                           
                        <div class="col mb-2">                
                            <div class="form-floating">
                                <select class="form-select" name="position" id="position" v-model="officerecord.employments[key].position_id">
                                    <option disabled value="0">Select position</option>
                                    <option v-for="employeeposition in employeepositions" :value="employeeposition.id">
                                        {{employeeposition.name}}
                                    </option>               
                                </select>
                                <label for="position" class="form-label">Position</label>
                            </div>
                        </div> 
                        <div class="col mb-2">                    
                            <div class="form-floating">                                    
                                <select class="form-select" name="sg_year" id="sg_year"  v-model="officerecord.employments[key].salarygradegroups_id" @change="slctSGG(officerecord.employments[key].salarygradegroups_id,key)">
                                    <option disabled value="">Select year</option>
                                    <option :value="salarygradegroup.id" v-for="salarygradegroup in salarygradegroups">{{salarygradegroup.year}}</option>
                                </select>
                                <label for="sg_year" class="form-label">Salary Grade Year</label>                
                            </div>
                        </div>
                        <div class="col mb-2">                    
                            <div class="form-floating">
                                <select class="form-select" name="sg_id" id="sg_id"  v-model="officerecord.employments[key].salarygrades_id" @change="slctSG(officerecord.employments[key].salarygrades_id,key)">

                                    <option v-if="salarygradenames.length > 0" disabled value="">Select salary grade </option>
                                    <option v-else disabled value="">No salary grade for the selected year!</option>
                                    <option :value="salarygrade.id" v-for="salarygrade in salarygradenamesArr[key]">
                                        {{salarygrade.name}}
                                    </option>             
                                </select>
                                <label for="sg_id" class="form-label">Salary Grade </label>                
                            </div>
                        </div>
                        <div class="col mb-2">                    
                            <div class="form-floating">
                                <select class="form-select" name="sg_steps" id="sg_steps" v-model="officerecord.employments[key].salarygrades_steps_id">
                                    <option v-if="salarygradesteps.length > 0" disabled value="">Select step</option>
                                    <option v-else disabled value="">No steps for the selected salary grade!</option>
                                    <option :value="salarygradestep.id" v-for="salarygradestep in salarygradestepsArr[key]">{{salarygradestep.name}} - {{formatPrice(salarygradestep.value)}}</option>             
                                </select>
                                <label for="sg_steps" class="form-label">Salary Grade Steps</label>                
                            </div>
                        </div>             
                    </div>
                    <div class="row">
                        <div class="col mb-2 req">                
                            <div class="form-floating">
                                <select class="form-select" :name="`office_id[${key}]`" :id="`office_id[${key}]`" v-model="officerecord.employments[key].office_id" :class="errors[`employments.${key}.office_id`] ? 'error-input' : ''">
                                    <option disabled value="">Select one</option>
                                    <option :value="office.offices_id"  v-for="office in offices">{{office.offices_name}}</option>
                                </select>      
                                <label :for="`office_id[${key}]`" class="form-label">Office</label>
                            </div>
                            <span v-if="errors[`employments.${key}.office_id`]" class="text-danger m-error">{{errors[`employments.${key}.office_id`][0]}}</span>
                        </div> 
                        <div class="col mb-2 req">                
                            <div class="form-floating">
                                <select class="form-select" :name="`status_id[${key}]`" :id="`status_id[${key}]`" @change="selectChange(officerecord.employments[key].id)" v-model="officerecord.employments[key].status_id" :class="errors[`employments.${key}.status_id`] ? 'error-input' : ''">
                                    <option disabled value="">Select one</option>
                                    <option :value="status.id"  v-for="status in employeestatuses">{{status.name}}</option>
                                </select>    
                                <label :for="`status_id[${key}]`" class="form-label text-danger">Status</label>
                            </div>
                            <span v-if="errors[`employments.${key}.status_id`]" class="text-danger m-error">{{errors[`employments.${key}.status_id`][0]}}</span>
                        </div> 
                        <div class="col mb-2 date-form-floating">                             
                            <Datepicker v-model="officerecord.employments[key].startdate" week-start="0" auto-apply :enable-time-picker="false" name="startdate" placeholder="Start Date"></Datepicker>  
                            <small id="passwordHelpBlock" class="form-text text-muted">
                                Startdate (mm/dd/yyyy)
                            </small>
                        </div> 
                        <div class="col mb-2 date-form-floating" v-if="officerecord.employments[key].status_id != 1">                             
                            <Datepicker v-model="officerecord.employments[key].enddate"  auto-apply :enable-time-picker="false" name="enddate" placeholder="End Date"></Datepicker>  
                            <small id="passwordHelpBlock" class="form-text text-muted">
                                Enddate (mm/dd/yyyy)
                            </small>
                        </div>            
                    </div>   
                    <div class="row">
                        <div class="col text-end">
                            <ul class="list-unstyled ul-inlineblock mb-0 fs-6 li-empactions">
    
                                <li><a href="#"  @click.prevent="removeEmployment(key)">Remove</a></li>
                            </ul>
                        </div>
                    </div>
                </div>


            </template>            
        </template>
 
        <div class="row mb-2 mt-3">
            <div class="col text-center">
                <button class="btn btn-primary" @click.prevent="addemployment">+ Add Employment</button>
            </div>
        </div>    
       
        
        <div class="form-row">
            <div class="col mt-3 text-end">
            	<router-link :to="{name: 'record.index'}" class="btn btn-secondary me-1">Cancel</router-link>
            	<button type="submit" class="btn btn-primary">Update</button>
            </div>
        </div>
  
    </form>
</template>

<script>

import { onMounted, ref, inject, reactive, nextTick} from 'vue';
import useEmployees from '@/composables/composables-employees';
import useOffices from '@/composables/composables-office';
import useEmployeeTypes from '@/composables/composables-type';
import useEmployeeStatus from '@/composables/composables-status';
import useEmployeePosition from '@/composables/composables-position';

import useOfficerecord from '@/composables/composables-record';
import useSalaryGradeGroup from '@/composables/composables-salarygradegroup';
import { useHead } from '@unhead/vue'


export default{

    props: {
        id: {
            required: true,
            type: String
        }
    },

    setup (props){
        useHead({
            title: 'Edit Employee | BFAR - CAR HRMIS'
        })
        const swal = inject('$swal')
        const {officerecord, getOfficerecord, updateOfficerecord, errors, updateActiveemployment}= useOfficerecord()
        const {getEmployeeStatuses, employeestatuses } = useEmployeeStatus();
        const {getOffices, offices} = useOffices()
        const {getEmployeeTypes, employeetypes} = useEmployeeTypes()
        const {employeepositions, getEmployeePositions } = useEmployeePosition()
        const {getAvailableIDSwithcurrentID, availablewcids} = useEmployees();


        const {             
            getSalaryGradeGroups, 
            salarygradegroups, 
            getSalaryGradeName, 
            salarygradenames, 
            getSalaryGradeSteps,
            salarygradesteps

        } = useSalaryGradeGroup()


        const form = reactive({
            'newposition' : ''
        })

        const divs = reactive([]); 
        const add = ref(0);
        const salarygradenamesArr = ref([]);
        const salarygradestepsArr = ref([]);


        const loadrecords = () => {
            getOfficerecord(props.id).then(() => {                
                for(let x in officerecord.value.employments){
                    if(officerecord.value.employments[x].salarygradegroups_id){
                        getSalaryGradeName(officerecord.value.employments[x].salarygradegroups_id).then(() => {
                            salarygradenamesArr.value[x] = salarygradenames.value;     
                        });                      
                    }
                    if(officerecord.value.employments[x].salarygrades_steps_id){
                        getSalaryGradeSteps(officerecord.value.employments[x].salarygrades_id).then(() => {
                            salarygradestepsArr.value[x] = salarygradesteps.value;     
                        });                      
                    }                    
                    divs.push({
                        id: x,
                    })
                }                    
                add.value = divs.length;

                if(officerecord.value.employee){
                    getAvailableIDSwithcurrentID(officerecord.value.employee.employee_bioid)

                }
            })
        }

        onMounted(() => {   
            loadrecords(), 
            getOffices(),
            getEmployeeTypes(),
            getEmployeeStatuses(),
            getEmployeePositions(),
            getSalaryGradeGroups()
            
        })
        const hc = {
            headers: {
                'xlr': 1
            }
        }
       const slctSGG = async (id,key) => {
            getSalaryGradeName(id).then(() => {
                salarygradenamesArr.value[key] = salarygradenames.value;
            });
            salarygradesteps.value = [];
            salarygradestepsArr.value[key] = [];
        }
        const slctSG = async (id,key) => {
            getSalaryGradeSteps(id).then(() => {
                salarygradestepsArr.value[key] = salarygradesteps.value;  
            });
        }
        const formatPrice = (value) =>  {
            let val = (value/1).toFixed(2);
            return val.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        }
        const addemployment =  async() => {
            divs.push({
                id: add.value,
            })
            var rndIDtemp = Math.floor(Math.random() * 10000) + divs.length;

            add.value++;

            officerecord.value.employments.push({
                'id': rndIDtemp,
                'employee_id' : props.id,
                'employmentstatus' : '',
                'type_id' : '',
                'office_id' : '',
                'status_id' : '',
                'position_id' : '',
                'salarygradegroups_id' : '',
                'salarygrades_id' : '',
                'salarygrades_steps_id' : '',
                'startdate' : '',
                'enddate' : '',
                'enddatestatus' : '',
                'dateupdated' : '',
                'new' : 1,
            });

        }
        const saveOfficeRecord = async () => {
            await updateOfficerecord(props.id, form).then(() => {
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
        const removeEmployment = async(index) =>{
            officerecord.value.employments.splice(index,1);
            divs.splice(index,1);
        }
        const selectChange = async(employmentID) =>{
            let res = officerecord.value.employments.filter(stat => stat.status_id == 1);
            if (res.length > 1) {
                for (var i = 0; i < res.length; i++) {
                    res[i].status_id = 10;
                }
                let result1 = officerecord.value.employments.find(x => x.id == employmentID).status_id = 1;
            }            
        }

        return{
            errors,
            saveOfficeRecord,
            getOfficerecord,
            offices,
            employeetypes,
            officerecord,
            employeestatuses,
            employeepositions,
            salarygradenames,
            salarygradegroups,
            slctSGG,
            slctSG,
            salarygradesteps,
            formatPrice,
            addemployment,
            divs,
            salarygradenamesArr,
            salarygradestepsArr,
            removeEmployment,
            selectChange,
            availablewcids
        
        }
    }
}


</script>
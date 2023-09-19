<template>
	<div class="row">
		<div class="col-md-12 p-title">
			<h2>New Employee Record</h2>
		</div>
	</div>
    <form v-on:submit.prevent="saveEmployee">
        <div class="pProfilewrap p-2 mb-4">
            <div class="row">
                <div class="pProfilewrap-title mt-2 mb-2">
                    <h2>Basic Info</h2>
                </div>
            </div>
            <div class="row mb-2">
                <div class="col-md-1 mb-2 req">                    
                    <div class="form-floating">
                        <input type="number" name="employee_id" :class="errors.employee_id ? 'error-input' : ''" placeholder="enter id number" id="employee_id" class="form-control" v-model="form.employee_id">                        
                        <label for="employee_id" class="form-label">ID Number </label>
                    </div>
                    <span v-if="errors.employee_id" class="text-danger m-error">{{errors.employee_id[0]}}</span>
                </div> 
                <div class="col-md-1 mb-2">                    
                    <div class="form-floating">
                        <select class="form-select" name="employee_bioid" id="employee_bioid" v-model="form.employee_bioid" :class="errors.employee_bioid ? 'error-input' : ''">
                            <option value="">No Bio</option>
                            <option v-for="id in availableids" :value="id">
                                {{id}}
                            </option>               
                        </select>
                        <label for="employee_bioid" class="form-label">Biometrics ID</label>
                    </div>
                    <span v-if="errors.employee_bioid" class="text-danger m-error">{{errors.employee_bioid[0]}}</span>
                </div> 
                <div class="col mb-2 req">                    
                    <div class="form-floating">
                        <input type="text" name="employee_fname" :class="errors.employee_fname ? 'error-input' : ''" placeholder="enter first name" id="employee_fname" class="form-control" v-model="form.employee_fname">
                        <label for="employee_fname" class="form-label">First Name</label>
                    </div>
                    <span v-if="errors.employee_fname" class="text-danger m-error">{{errors.employee_fname[0]}}</span>
                </div>  
                <div class="col mb-2">                    
                    <div class="form-floating">
                        <input type="text" name="employee_mname" placeholder="enter middle name" id="employee_mname" class="form-control" v-model="form.employee_mname">
                        <label for="employee_mname" class="form-label">Middle Name</label>
                    </div>
                </div>                
                <div class="col mb-2 req">                    
                    <div class="form-floating">
                        <input type="text" name="employee_lname" :class="errors.employee_lname ? 'error-input' : ''" placeholder="enter last name" id="employee_lname" class="form-control" v-model="form.employee_lname">
                        <label for="employee_lname" class="form-label">Last Name</label>
                    </div>
                    <span v-if="errors.employee_lname" class="text-danger m-error">{{errors.employee_lname[0]}}</span>
                </div> 
                <div class="col col-sm-1 mb-2">                  
                    <div class="form-floating">
                        <input type="text" name="employee_extname"  placeholder="enter name extension" id="employee_extname" class="form-control" v-model="form.employee_extname">
                        <label for="employee_extname" class="form-label">Ext. (Jr, Sr)</label>
                    </div>
                </div>  
            </div> 
        

            <div class="row mb-2">
                <div class="col mb-2">
                    <div class="form-floating">
                        <input type="text" name="emergency_contactperson" placeholder="enter contact person" id="emergency_contactperson" class="form-control" v-model="form.emergency_contactperson" :class="errors['employee.emergency_contactperson'] ? 'error-input' : ''">
                        <label for="emergency_contactperson" class="form-label">Contact Person</label>
                    </div> 
                </div>
                <div class="col mb-2">
                    <div class="form-floating">
                        <input type="number" name="emergency_contactnumber" placeholder="enter contact number" id="emergency_contactnumber" class="form-control" v-model="form.emergency_contactnumber">
                        <label for="emergency_contactnumber" class="form-label">Contact Number</label>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col pProfilewrap-title">
                <h2 class="mb-0">Employment</h2>
                <small class="mb-2 d-block fw-light fst-italic">* BFAR CAR ONLY</small>
            </div>
             <span v-if="errors['employments']" class="text-danger m-error">{{errors['employments'][0]}}</span>
        </div>

        <!-- employment -->
 
            <template v-for="(div, key) in divs">
                <div class="pe-2 ps-2 pt-3 pb-2  mb-2 pProfilewrap" :class="form.employments[key].status_id == 1 ? 'bg-active' : ''">
                    <div class="row mb-2">
                        <div class="col mb-2 req">                
                            <div class="form-floating">
                                <select class="form-select" :name="`type_id[${key}]`"  v-model="form.employments[key].type_id" :class="errors[`employments.${key}.type_id`] ? 'error-input' : ''">
                                    <option disabled value="">Select type</option>
                                    <option v-for="employeetype in employeetypes" :value="employeetype.id">
                                        {{employeetype.name}}
                                    </option>               
                                </select>
                                <label for="type" class="form-label">Employment Type</label>
                            </div>
                            <span v-if="errors[`employments.${key}.type_id`]" class="text-danger m-error">{{errors[`employments.${key}.type_id`][0]}}</span>
                        </div>                           
                        <div class="col mb-2">                
                            <div class="form-floating">
                                <select class="form-select" name="position"  v-model="form.employments[key].position_id">
                                    <option disabled value="">Select position</option>
                                    <option v-for="employeeposition in employeepositions" :value="employeeposition.id">
                                        {{employeeposition.name}}
                                    </option>               
                                </select>
                                <label for="position" class="form-label">Position</label>
                            </div>
                        </div> 
                        <div class="col mb-2">                    
                            <div class="form-floating">     
                                <select class="form-select" name="sg_year" id="sg_year"  v-model="form.employments[key].salarygradegroups_id" @change="slctSGG(form.employments[key].salarygradegroups_id,key)">
                                    <option disabled value="">Select year</option>
                                    <option :value="salarygradegroup.id" v-for="salarygradegroup in salarygradegroups">{{salarygradegroup.year}}</option>
                                </select>
                                <label for="sg_year" class="form-label">Salary Grade Year</label>                
                            </div>
                        </div>                       
                        <div class="col mb-2">                    
                            <div class="form-floating">
                                <select class="form-select" name="sg_id" id="sg_id"  v-model="form.employments[key].salarygrades_id" @change="slctSG(form.employments[key].salarygrades_id,key)">
                                      <option v-if="salarygradenames.length > 0" disabled value="">Select salary grade</option>
                                    <option v-else disabled value="">No salary grade for the selected year!</option>
                                    <option :value="salarygrade.id" v-for="salarygrade in salarygradenamesArr[key]">{{salarygrade.name}}</option>             
                                </select>
                                <label for="sg_id" class="form-label">Salary Grade</label>                
                            </div>
                        </div>
                        <div class="col mb-2">                    
                            <div class="form-floating">
                                <select class="form-select" name="sg_steps" id="sg_steps" v-model="form.employments[key].salarygrades_steps_id">
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
                                <select class="form-select" :name="`office_id[${key}]`" v-model="form.employments[key].office_id" :class="errors[`employments.${key}.office_id`] ? 'error-input' : ''">
                                    <option disabled value="">Select one</option>
                                    <option :value="office.offices_id"  v-for="office in offices">{{office.offices_name}}</option>
                                </select>      
                                <label for="name" class="form-label">Office</label>
                            </div>
                            <span v-if="errors[`employments.${key}.office_id`]" class="text-danger m-error">{{errors[`employments.${key}.office_id`][0]}}</span>
                        </div> 
                        <div class="col mb-2 req">                
                            <div class="form-floating">
                                <select class="form-select" :name="`status_id[${key}]`" @change="selectChange(form.employments[key].id)" v-model="form.employments[key].status_id" :class="errors[`employments.${key}.status_id`] ? 'error-input' : ''">
                                    <option disabled value="">Select one</option>
                                    <option :value="status.id"  v-for="status in employeestatuses">{{status.name}}</option>
                                </select>    
                                <label for="name" class="form-label text-danger">Status</label>
                            </div>
                            <span v-if="errors[`employments.${key}.status_id`]" class="text-danger m-error">{{errors[`employments.${key}.status_id`][0]}}</span>
                        </div> 
                        <div class="col mb-2 date-form-floating">                             
                            <Datepicker v-model="form.employments[key].startdate" week-start="0" auto-apply :enable-time-picker="false" name="startdate" placeholder="Start Date"></Datepicker>  
                            <small id="passwordHelpBlock" class="form-text text-muted">
                                Startdate (mm/dd/yyyy)
                            </small>
                        </div> 
                        <div class="col mb-2 date-form-floating" v-if="form.employments[key].status_id != 1">                             
                            <Datepicker v-model="form.employments[key].enddate"  auto-apply :enable-time-picker="false" name="enddate" placeholder="End Date"></Datepicker>  
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

            <div class="row mb-2 mt-3">
                <div class="col text-center">
                    <button class="btn btn-primary" @click.prevent="addemployment">+ Add Employment</button>
                </div>
            </div> 




        <!-- end employment -->
        <div class="form-row">
            <div class="col mt-3 text-end">
            	<router-link :to="{name: 'record.index'}" class="btn btn-secondary me-1">Cancel</router-link>
            	<button type="submit" class="btn btn-primary">Save</button>
            </div>
        </div>
  
    </form>
</template>

<script>
import useEmployees from '@/composables/composables-employees';
import useOfficerecord from '@/composables/composables-record';
import { onMounted, ref, inject, reactive} from 'vue';
import useOffices from '@/composables/composables-office';
import useEmployeeTypes from '@/composables/composables-type';
import useEmployeeStatus from '@/composables/composables-status';
import useEmployeePosition from '@/composables/composables-position';
import useSalaryGradeGroup from '@/composables/composables-salarygradegroup';

export default{
    setup (){
        const swal = inject('$swal');
        const { errors,  storeOfficerecord } = useOfficerecord();
        const { getEmployeeStatuses, employeestatuses } = useEmployeeStatus();        
        const {getOffices, offices} = useOffices();
        const {getEmployeeTypes, employeetypes} = useEmployeeTypes();
        const {employeepositions, getEmployeePositions } = useEmployeePosition();
        const {getAvailableIDS, availableids} = useEmployees();
        const {             
            getSalaryGradeGroups, 
            salarygradegroups, 
            getSalaryGradeName, 
            salarygradenames, 
            getSalaryGradeSteps,
            salarygradesteps

        } = useSalaryGradeGroup()

        const divs = reactive([]); 
        const add = ref(0);
        const salarygradenamesArr = ref([]);
        const salarygradestepsArr = ref([]);


        const form = reactive({

            'employee_id' : '',
            'employee_bioid': '',
            'employee_fname' : '',
            'employee_mname' : '',
            'employee_lname' : '',
            'employee_extname' : '',
            'emergency_contactperson': '',
            'emergency_contactnumber': '',
            'employments': []          
        })
        const addemployment =  async() => {
            divs.push({
                id: add.value,
            })
            var rndIDtemp = Math.floor(Math.random() * 10000) + divs.length;

            add.value++;
            
            form.employments.push({
                'id': rndIDtemp,
                'employee_id' : '',
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



        onMounted(() => {   
            getOffices(),
            getEmployeeTypes(),
            getEmployeeStatuses(),
            getEmployeePositions(),
            getSalaryGradeGroups(),
            getAvailableIDS()
        })

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


        const saveEmployee = async () => {
            await storeOfficerecord({...form}).then(() => {
                if(!errors.value){
                    swal.fire({
                        toast: true,
                        position: 'top-end',
                        title: 'Successfully Created',
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
            form.employments.splice(index,1);
            divs.splice(index,1);
        }
        const selectChange = async(employmentID) =>{
            let res = form.employments.filter(stat => stat.status_id == 1);
            if (res.length > 1) {
                for (var i = 0; i < res.length; i++) {
                    res[i].status_id = 10;
                }
                let result1 = form.employments.find(x => x.id == employmentID).status_id = 1;
            }            
        }
        return{
            errors,
            saveEmployee,
            offices,
            employeetypes,
            employeestatuses,
            form,
            salarygradenames,
            employeepositions,
            salarygradegroups,
            slctSGG,
            slctSG,
            salarygradesteps,
            salarygradenamesArr,
            salarygradestepsArr,
            formatPrice,
            addemployment,
            divs,
            selectChange,
            removeEmployment,
            availableids
        
        }
    }
}


</script>
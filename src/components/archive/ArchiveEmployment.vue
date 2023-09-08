<template>
    
        <div class="pProfilewrap p-3 mb-4">
            <div class="row">
                <div class="pProfilewrap-title mt-2 mb-2">
                    <h2 class="mb-0">Basic Info </h2>
                    <span class="d-block fw-bolder mb-1 rff">OLD ID Number: <template v-if="archive.old_employee_id">{{archive.old_employee_id}}</template></span>
                </div>
            </div>
            <div class="row mb-2">            
                <div class="col col-sm-3 mb-2">                
                    <div class="form-floating">
                        <label class="form-control frm-lbl">{{archive.employee_fname}}</label>
                        <label for="name" class="form-label">First Name</label>
                    </div>                     
                
                </div>  
                <div class="col col-sm-3 mb-2">                
                    <div class="form-floating">
                        <label class="form-control frm-lbl">{{archive.employee_mname}}</label>
                        <label for="mname" class="form-label">Middle Name</label>
                    </div>
                </div>                
                <div class="col col-sm-4 mb-2">                
                    <div class="form-floating">
                        <label class="form-control frm-lbl">{{archive.employee_lname}}</label>
                        <label for="name" class="form-label">Last Name</label>
                    </div>
                </div>  
                <div class="col col-sm-2 mb-2">                  
                    <div class="form-floating">
                        <label class="form-control frm-lbl">{{archive.employee_extname}}</label>
                        <label for="employee_extname" class="form-label">Ext. (Jr, Sr)</label>
                    </div>
                </div>  
            </div> 
            <div class="row">
                <div class="col pProfilewrap-title mb-2">
                    <h2 class="mb-0">Emergency Contact</h2>
                </div>
                
            </div>
            <div class="row mb-2">
                <div class="col mb-2">
                    <div class="form-floating">
                        <label class="form-control frm-lbl">{{archive.emergency_contactperson}}</label>
                        <label for="name" class="form-label">Person</label>
                    </div> 
                </div>
                <div class="col mb-2">
                    <div class="form-floating">
                        <label class="form-control frm-lbl">{{archive.emergency_contactnumber}}</label>
                        <label for="name" class="form-label">Number</label>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col pProfilewrap-title">
                <h2 class="mb-2">BFAR - CAR Employment Details</h2>
            </div>
        </div>
        <template v-if="archive.archiveemployments">
            <template v-for="(div, key) in divs">
                <div class="p-3 mb-2 pProfilewrap">
                    <div class="row mb-2">
                        <div class="col mb-2">                
                            <div class="form-floating">
                                <label class="form-control frm-lbl">
                                    <template v-if="archive.archiveemployments[key].type">
                                        {{archive.archiveemployments[key].type}}
                                    </template>
                                </label>
                                <label for="type" class="form-label">Employment Type</label>
                            </div>
                           
                        </div>                           
                        <div class="col mb-2">                
                            <div class="form-floating">
                                <label class="form-control frm-lbl">
                                    <template v-if="archive.archiveemployments[key].position">
                                        {{archive.archiveemployments[key].position}}
                                    </template>
                                </label>
                                <label for="type" class="form-label">Position</label>
                            </div>
                        </div> 
                        
                    </div>
                    <div class="row">
                        <div class="col mb-2">   
                            <div class="form-floating">
                                <label class="form-control frm-lbl">
                                    <template v-if="archive.archiveemployments[key].salarygradegroups">
                                        {{archive.archiveemployments[key].salarygradegroups}}                              
                                    </template>
                                </label>
                                <label for="type" class="form-label">Salary Grade Year</label>
                            </div>                 
                        </div>
                        <div class="col mb-2">
                            <div class="form-floating">
                                <label class="form-control frm-lbl">
                                    <template v-if="archive.archiveemployments[key].salarygrades">
                                        {{archive.archiveemployments[key].salarygrades}}                         
                                    </template>
                                </label>
                                <label for="type" class="form-label">Salary Grade Year</label>
                            </div>    
                        </div>
                        <div class="col mb-2">                    
                            <div class="col mb-2">
                                <div class="form-floating">
                                    <label class="form-control frm-lbl">

                                        <template v-if="archive.archiveemployments[key].salarygrades_steps">
                                            
                                         {{archive.archiveemployments[key].salarygrades_steps}} - {{formatPrice(archive.archiveemployments[key].salarygradevalue)}}
                                        </template>
                                    </label>
                                    <label for="type" class="form-label">Salary Grade Step</label>
                                </div>    
                            </div>
                        </div>             
                    </div>
                    <div class="row">
                        <div class="col mb-2">                
                            <div class="form-floating">
                                <label class="form-control frm-lbl">
                                    <template v-if="archive.archiveemployments[key].office">
                                        {{archive.archiveemployments[key].office}}
                                    </template>
                                </label>  
                                <label for="name" class="form-label">Office</label>
                            </div>
     
                        </div> 
                        <div class="col mb-2"> 
                            <div class="form-floating">
                                <label class="form-control frm-lbl">
                                    <template v-if="archive.archiveemployments[key].status">
                                        {{archive.archiveemployments[key].status}}
                                    </template>
                                </label>  
                                <label for="name" class="form-label">Status</label>
                            </div>               
                        </div> 
                    </div>
                    <div class="row">
                        <div class="col mb-2">                             
                            <div class="form-floating">
                                <label class="form-control frm-lbl">
                                    <template v-if="archive.archiveemployments[key].startdate">
                                        {{moment(archive.archiveemployments[key].startdate).format('MMMM D, Y')}}
                                    </template>
                                </label>
                                <label>Startdate (mm/dd/yyyy)</label>
                            </div>
                        </div> 
                        <div class="col">
                            <div class="form-floating">
                                <label class="form-control frm-lbl">
                                    <template v-if="archive.archiveemployments[key].enddate">
                                        {{moment(archive.archiveemployments[key].enddate).format('MMMM D, Y')}}
                                    </template>
                                </label>
                                <label>Enddate (mm/dd/yyyy)</label>
                            </div> 
                        </div>   
                    </div>   
                </div>


            </template>            
        </template>



</template>

<script>

import { onMounted, ref, inject, reactive} from 'vue';
import useOffices from '@/composables/composables-office';
import useEmployeeTypes from '@/composables/composables-type';
import useEmployeeStatus from '@/composables/composables-status';
import useEmployeePosition from '../../composables/composables-position';

import useSalaryGradeGroup from '../../composables/composables-salarygradegroup';
import moment from 'moment';

import useArchive from '../../composables/composables-archive';

export default{

    props: {
        id: {
            required: true,
            type: String
        }
    },

    setup (props){
        const swal = inject('$swal')
        const {archive,getArchiveEmployee} = useArchive()
        const {getEmployeeStatuses, employeestatuses } = useEmployeeStatus();
        const {getOffices, offices} = useOffices()
        const {getEmployeeTypes, employeetypes} = useEmployeeTypes()
        const {employeepositions, getEmployeePositions } = useEmployeePosition()

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

            getArchiveEmployee(props.id).then(() => {                
                for(let x in archive.value.archiveemployments){
                    if(archive.value.archiveemployments[x].salarygradegroups_id){
                        getSalaryGradeName(archive.value.archiveemployments[x].salarygradegroups_id).then(() => {
                            salarygradenamesArr.value[x] = salarygradenames.value;     
                        });                      
                    }
                    if(archive.value.archiveemployments[x].salarygrades_steps_id){
                        getSalaryGradeSteps(archive.value.archiveemployments[x].salarygrades_id).then(() => {
                            salarygradestepsArr.value[x] = salarygradesteps.value;     
                        });                      
                    }                    
                    divs.push({
                        id: x,
                    })
                }                    
                add.value = divs.length;

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
      
        const formatPrice = (value) =>  {
            let val = (value/1).toFixed(2);
            return val.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        }
      

        return{
            offices,
            employeetypes,
            archive,
            employeestatuses,
            employeepositions,
            salarygradenames,
            salarygradegroups,
            salarygradesteps,
            formatPrice,
            divs,
            salarygradenamesArr,
            salarygradestepsArr,
            moment
        }
    }
}


</script>
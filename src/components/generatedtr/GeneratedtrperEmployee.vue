<template>
    <div class="row">
        <div class="col-md-12 p-title">
            <h2>Generate DTR Per Employee</h2>
        </div>
    </div>
    <div class="row">
        <div class="col biomonitoring-employee-name">
            <span class="fs-5 fm m19 mb-2"><strong>{{employee.employee_fname}} {{employee.employee_mnane}} {{employee.employee_lname}}</strong></span>         
        </div>
    </div>
    <form  @submit.prevent="generatenewDTR" class="row needs-validation">
        <input type="hidden" name="empID" v-model="form.empID">

        <div class="col-sm-6 col-md-3 mb-2">
            <div class="form-floating">
                <select class="form-select border-blue mb-2" name="dtrmonthtype" v-model="form.dtrmonthtype" required>
                    <option disabled value="">Select Range</option>
                    <option value="1" >1st Half</option>
                    <option value="2" >2nd Half</option>
                    <option value="3" >Full Month</option>
                </select>     
                <label class="form-label" for="dtrmonthtype">Month Range</label> 
            </div>           
            <div class="datepicker date-form-floating">
                <Datepicker v-model="form.monthpicked" id="fdate" auto-apply month-picker  :clearable="false" placeholder="Select Month" required></Datepicker>  
            </div>      
            <ul class="ulbtn-generate mt-2">
                <li class="me-2 mb-2">
                    <button  title="Generate DTR" type="submit" class="btn btn-blue"><i class="fa-solid fa-gears"></i> Generate DTR</button>      
                </li>
                <li v-if="datagenerated">
                    <button title="Export Data to PDF" class="btn btn-outline-danger btn-exportEmps mt-1" @click.prevent="downloadselectedDTR"><i class="fa-regular fa-file-pdf"></i> Export Generated</button>
                </li>
            </ul>
        </div>
    </form>   

    <table class="table border tblbordered table-bordered text-center" v-if="datagenerated">
        <thead>
            <tr>
                <th rowspan="2" class="text-center w-5">Day</th>
                <th colspan="2" class="text-center">AM</th>
                <th colspan="2" class="text-center">PM</th>
            </tr>
            <tr>                       
                <th class="w-p5">Arrival</th>
                <th class="w-p5">Departure</th>
                <th class="w-p5">Arrival</th>
                <th class="w-p5">Departure</th>
            </tr>
        </thead>
        <tbody >
            <tr v-for="(dtr, k) in datagenerated.biometricsData">    

                <template v-if="dtr.travelid">
                    <td>{{dtr.d}}</td>

                    <template v-if="dtr.d == 1">                                        
                            <td class="bg-lightgray noboxshadow ps-3" :rowspan="dtr.totaldays" valign="middle">
                                T.O. <strong>{{dtr.travelorder}}</strong>
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>  
                    </template>
                    <template v-else>
                        <template v-if="datagenerated.biometricsData[k-1]">        
                            <template v-if="datagenerated.biometricsData[k-1].travelorder != dtr.travelorder">
                                <td class="bg-lightgray noboxshadow ps-3" :rowspan="dtr.totaldays" valign="middle">
                                    T.O. <strong>{{dtr.travelorder}}</strong>
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>

                            </template>
                            <template v-else>
                                <td></td>
                                <td></td>
                                <td></td>
                            </template>
                        </template>  
                    </template>    
                </template>
                <template v-else>
                    <template v-if="dtr.dtr_timeinam == null && dtr.dtr_timeinpm == null && dtr.dtr_timeoutam == null && dtr.dtr_timeoutpm == null && dtr.status != null">
                            <td class="text-danger">{{dtr.d}}</td> 
                            <td class="text-danger">{{dtr.status}}</td>
                            <td></td>
                            <td></td>
                            <td></td>  
                    </template>     
                    <template v-else-if="dtr.dtr_timeinam == null && dtr.dtr_timeinpm == null && dtr.dtr_timeoutam == null && dtr.dtr_timeoutpm == null && dtr.holiday != null">  
                        <td class="text-danger">{{dtr.d}}</td> 
                        <td class="text-danger text-start ps-5" colspan="4">{{dtr.holiday}}</td>                
                    </template>
                    <template v-else>
                            <td>{{dtr.d}}</td> 
                            <td>{{dtr.dtr_timeinam}}</td>   
                            <td>{{dtr.dtr_timeoutam}}</td>   
                            <td>{{dtr.dtr_timeinpm}}</td>   
                            <td>{{dtr.dtr_timeoutpm}}</td>              
                    </template> 
                </template>                       
            </tr>
        </tbody>
    </table>




        

</template>

<script>
    import useEmployees from '@/composables/composables-employees';
    import useMonitoring from '@/composables/composables-monitoring';
    import useGeneratedtr from '@/composables/composables-generatedtr';

    import {onMounted ,ref, computed, reactive, onUpdated } from 'vue';
    import { sortBy} from 'lodash';
    import {useRouter} from 'vue-router'
    import {formatDate} from '../../helper/formatdate'
    import {formatTime} from '../../helper/formattime'
    import moment from 'moment';

    export default{
        props: {
            id: {
                required: true,
                type: String
            }
        },
        setup(props){

            const check = ref(false);
            const formClass = ref('');
            const {employee, getEmployee} = useEmployees()

            const {monitoringbiometric, getEmployeebiometric} = useMonitoring()
            const {generateDTRfromData, datagenerated, downloadperEmployeeDTR} = useGeneratedtr();


            const form = reactive({
                'empID': props.id,
                'dtrmonthtype': '',
                'monthpicked': '',
                'name': ''
             })

            

            const generatenewDTR = async () =>{
                await generateDTRfromData({ ...form });
            }
            

            let sort = ref(false);
            let updatedList = ref([])
            const router = useRouter()
            
            const sortColumn = ref("id");
            const sortDirection = ref(1);
            const arrowIconName = ref("arrow_drop_up");         
            

            onMounted(() => {
                // getEmployeebiometric(props.id),
                getEmployee(props.id).then(() =>{
                    form.name = employee.value.cname;
                })

            })       
            

            const downloadselectedDTR = async() => {
                await downloadperEmployeeDTR({...form}, form.name);
            }


            return{
                getEmployeebiometric,
                sortColumn,
                formatDate,
                formatTime,
                employee,
                props,
                form,
                moment,
                arrowIconName,
                generatenewDTR,
                datagenerated,
                formClass,
                check,
                downloadselectedDTR
                
            }
        }
    }
</script>
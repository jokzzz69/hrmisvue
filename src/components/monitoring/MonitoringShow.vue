<template>
    <template v-if="hld">
        <LoadingComponentDiv/>
    </template>
    <div class="row">
        <div class="col-md-12 p-title">
            <ul class="ulwidback">
                <li>
                    <router-link :to="{ name: 'monitoring.index' }" class="btn btn-back" title="Return to List"><i class="fa-solid fa-arrow-left"></i></router-link>
                </li>  
                <li>
                    <h2>Biometrics Information</h2>
                </li>
            </ul>
        </div>
    </div>
    <div class="row">
        <div class="col biomonitoring-employee-name">
            <span class="fs-5 fm d-block mh-30 ms-5"><strong>{{employee.employee_fname}} {{employee.employee_mname}} {{employee.employee_lname}}</strong></span>
        
        
        </div>
    </div>
    <div class="row justify-content-md-center">       
        <div class="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 col-xxl-3">     
            <ul class="ulwidback">  
                <li>
                    <span class="col-form-label col-12">Select Date</span>                
                    <Datepicker v-model="monthpicked" id="fdate" auto-apply month-picker @update:model-value="getEmployeeBio" :clearable="false" name="monthpicked" :format="format" :month-change-on-arrows="true"></Datepicker> 
                </li> 
            </ul>
        </div>            
    </div>
    <div class="row">
        <div class="col-md-12 pr">    
            
            <table class="table border tblborderedgray table-bordered text-center mt-3 tbl-mydtr" v-if="biometricsData.biometricsData">
                <thead>
                    <tr>
                        <th rowspan="2" class="text-center w-5">Day</th>
                        <th colspan="2" class="text-center">AM</th>
                        <th colspan="2" class="text-center">PM</th>
                    </tr>
                    <tr>                       
                        <th class="w-p6">Arrival</th>
                        <th class="w-p6">Departure</th>
                        <th class="w-p6">Arrival</th>
                        <th class="w-p6">Departure</th>
                    </tr>
                </thead>
                <tbody>                    
                        
                        <template v-for="(dtr, k) in biometricsData.biometricsData" :key="dtr.dtr_empid">
                 
                            <tr>

                                    <template v-if="dtr.dtr_date == moment(currentDate).format('Y-MM-DD').toString()">
                                        <td :class="dtr.status" class="bg-currentDate" title="Current Date">  
                                          {{dtr.d}}
                                        </td>
                                    </template>
                                    <template v-else>
                                        <td :class="dtr.status">  
                                            {{dtr.d}}
                                        </td>
                                    </template>

                                            
                                <template v-if="dtr.travelid">                               
                                    <template v-if="dtr.d == 1">                                        
                                            <td class="bg-lightgray noboxshadow ps-3" :rowspan="dtr.totaldays" valign="middle">
                                                T.O. <strong>{{dtr.travelorder}}</strong>
                                            </td>
                                            <td></td>
                                            <td></td>
                                            <td></td>  
                                    </template>
                                    <template v-else>
                                        <template v-if="biometricsData.biometricsData[k-1]">        
                                            <template v-if="biometricsData.biometricsData[k-1].travelorder != dtr.travelorder">
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
                                    <template v-if="dtr.leaveid">
                                        <template v-if="dtr.d == 1">                                        
                                                <td class="bg-lightgray noboxshadow ps-3" :rowspan="dtr.leavetotaldays" valign="middle">
                                                    <strong>{{dtr.leavetype}}</strong>
                                                </td>
                                                <td></td>
                                                <td></td>
                                                <td></td>  
                                        </template>
                                        <template v-else>
                                            <template v-if="biometricsData.biometricsData[k-1]">        
                                                <template v-if="biometricsData.biometricsData[k-1].leaveid != dtr.leaveid">
                                                    <td class="bg-lightgray noboxshadow ps-3" :rowspan="dtr.leavetotaldays" valign="middle">
                                                       <strong>{{dtr.leavetype}}</strong>
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
                                            <td class="text-danger">{{dtr.status}}</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </template>
                                        
                                        <template v-else-if="dtr.dtr_timeinam == null && dtr.dtr_timeinpm == null && dtr.dtr_timeoutam == null && dtr.dtr_timeoutpm == null && dtr.holiday != null">  
                                            <td class="text-danger text-start ps-5" colspan="4">{{dtr.holiday}}</td>                
                                        </template>

                                        <template v-else>
                                            <td>
                                                <template v-if="dtr.dtr_timeinam">
                                                    {{moment(dtr.dtr_timeinam,'HH:mm').format('hh:mm')}}
                                                </template>                                
                                            </td>
                                            <td>
                                                <template v-if="dtr.dtr_timeoutam">
                                                    {{moment(dtr.dtr_timeoutam,'HH:mm').format('hh:mm')}}
                                                </template>
                                            </td>
                                            <td>
                                                <template v-if="dtr.dtr_timeinpm">
                                                    {{moment(dtr.dtr_timeinpm,'HH:mm').format('hh:mm')}}
                                                </template>
                                            </td>
                                            <td>
                                                <template v-if="dtr.dtr_timeoutpm">
                                                    {{moment(dtr.dtr_timeoutpm,'HH:mm').format('hh:mm')}}
                                                </template>
                                            </td>
                                        </template>
                                    </template>
                                </template>
                                
                            </tr>
                        </template>
                    
                </tbody>
            </table>
            
   
        </div>
    </div>
</template>

<script>
    import useEmployees from '@/composables/composables-employees';
    import useMonitoring from '@/composables/composables-monitoring';
    import {onMounted ,ref, computed, reactive} from 'vue';
    import { sortBy} from 'lodash';
    import {useRouter} from 'vue-router'
    import {formatTime} from '@/helper/formattime'
    import moment from 'moment';
    import { useHead } from '@unhead/vue'
    import LoadingComponentDiv from '@/components/loader/LoadingComponentDiv.vue';
    export default{
        components:{
            LoadingComponentDiv
        },
        props: {
            id: {
                required: true,
                type: String
            },
            mf: {
                type: String,
                default: null
            }
        },
        setup(props){
            useHead({
                title: 'Employee DTR | '+import.meta.env.VITE_BFAR_AGENCY
            })
            const {employee, getEmployee} = useEmployees()
            const {biometricsData, getEmployeemonthBio} = useMonitoring()
            
            let sort = ref(false);
            let updatedList = ref([])
            const router = useRouter()

            
            const sortColumn = ref("id");
            const sortDirection = ref(1);
            const arrowIconName = ref("arrow_drop_up");         
            
      
            
            const monthpicked = ref({ 
                month: new Date().getMonth(),
                year: new Date().getFullYear()
            });
            const hld = ref(true);

            onMounted(() => {


                getEmployeemonthBio(props.id,monthpicked.value.month+'-'+monthpicked.value.year).then(() =>{
                    hld.value = false;
                }),
                getEmployee(props.id)

            })


            const getEmployeeBio = async (monthpicked) =>{
                const cf = {
                    headers: {
                        'xlr': 1
                    }
                }
                hld.value = true;

                await getEmployeemonthBio(props.id,monthpicked.month+'-'+monthpicked.year,cf).then(() =>{
                    hld.value = false;
                })
            }


            const format = (date) => {
              return moment(date).format('MMMM Y');
            }

            const currentDate = new Date();     





            return{
                moment,
                biometricsData,
                formatTime,
                getEmployeeBio,                
                props,
                monthpicked,
                format,
                employee,
                currentDate,
                hld
            }
        }
    }
</script>
<template>
    <div class="row">
        <div class="col-md-12 p-title">
            <ul class="ulwidback">
                <li>

                    <a href="#" class="btn btn-back" @click="$router.go(-1)"><i class="fa-solid fa-arrow-left"></i></a>
                </li>  
                <li>
                    <h2>Update Daily Time Record</h2>           
                    <template v-if="userrole == 'super-admin' || userrole == 'admin' || userrole == 'hr'">
                        <template v-if="authid != props.id">
                            <template v-if="employee.employee_fname">{{employee.employee_fname}}</template><template v-if="employee.employee_lname">&nbsp;{{employee.employee_lname}}</template>
                        </template>
                    </template>         
                </li>
            </ul>
        </div>
    </div>
    <div class="row">
        <div class="col-xxl-3 col-xl-4 col-lg-5 col-md-6 col-sm-6 col mt-3">
            <div class="card p-3">
                <form  v-on:submit.prevent="getEmployeeBio">
                    <div class="form-group form-floating">                        
                        <select class="form-select" name="slctMonth" v-model="form.monthtofix">
                            <option disabled value="">Months</option>
                            <template v-for="(x,y) in months" >
                                <template v-if="prevPresMonth.includes(y)">
                                    <option :value="y">{{x}}</option>
                                </template>
                            </template>                        
                        </select>
                        <label class="form-label" for="monthSelected">Select Month to edit</label>
                    </div>
                    <button type="submit" class="btn mt-2 btn-violet alw-100"><i class="fa-solid fa-eye"></i> Check</button>
                </form>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">    
            
            <table class="table border tblbordered table-bordered text-center mt-3 tblupdating" v-if="biometricsData.biometricsData">
                <thead>
                    <tr>
                        <th rowspan="2" class="text-center w-5">Day</th>
                        <th colspan="2" class="text-center">AM</th>
                        <th colspan="2" class="text-center">PM</th>
                        <th rowspan="2" class="text-center w-5">Actions</th>
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
                        <tr :class="dtr.dtr_date > ct ? 'disabled' : ''">
                            <td :class="dtr.status">{{dtr.d}}</td>
                            
                            <template v-if="dtr.travelid">                               
                                    <template v-if="biometricsData.biometricsData[k-1]">
                                        <template v-if="biometricsData.biometricsData[k-1].travelorder != dtr.travelorder">
                                            <td class="bg-lightgray noboxshadow ps-3" :rowspan="dtr.totaldays" valign="middle">
                                                T.O. <strong>{{dtr.travelorder}}</strong>
                                            </td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </template>
                                        <template v-else>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
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
                                <td>
                                    <template v-if="dtr.dtr_timeinam && dtr.dtr_timeoutam && dtr.dtr_timeinpm && dtr.dtr_timeoutpm">
                                        <template v-if="userrole == 'super-admin'">
                                            
                                        </template>
                                    </template>
                                    <template v-else>
                                        <template v-if="dtr.dtr_date < ct">
                                            <template v-if="dtr.dtr_timeinam != null || dtr.dtr_timeoutpm != null">               
                                                <template v-if="dtr.dtr_timeoutam == null || dtr.dtr_timeinpm == null">
                                                    <template v-if="userrole != 'employee'">
                                                        <router-link :to="{ name: 'dtrupdating.edit' ,params: { id: dtr.id }}" class="btn-link" title="Edit">Edit</router-link> 
                                                    </template>
                                                </template>                                                 
                                            </template>                                             
                                        </template>                                    
                                    </template>
                                </td>
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

    import { useAuthStore } from '@/stores/store.js'

    export default{
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
            const store = useAuthStore();
            const userrole = ref(store.getdetails[1]);
            const authid = ref(store.getdetails[0]);

            const {employee, getEmployee} = useEmployees()

            const {biometricsData, getEmployeemonthBio} = useMonitoring()
            
            let sort = ref(false);
            let updatedList = ref([])
            const router = useRouter()

            
            const sortColumn = ref("id");
            const sortDirection = ref(1);
            const arrowIconName = ref("arrow_drop_up");         
            
            const form = reactive({
                'monthtofix' : ''
            })
            


            onMounted(() => {
                getEmployee(props.id)
                
                if(props.mf){
                    form.monthtofix = props.mf;
                }else{
                    form.monthtofix = new Date().getMonth();
                }
                getEmployeemonthBio(props.id,form.monthtofix)
            })

    
            const currentDate = new Date();          
            const prevPresMonth = ref([currentDate.getMonth()-1,currentDate.getMonth()]);
            const months= ref(["January","February","March","April","May","June","July","August","September","October","November","December"]);




            const getEmployeeBio = async () =>{
                await getEmployeemonthBio(props.id,form.monthtofix)
            }


            const totalDays = new Date(currentDate.getFullYear(),currentDate.getMonth()+1, 0).getDate();

            let currentDay= String(currentDate.getDate()).padStart(2, '0');
            let currentMonth = String(currentDate.getMonth()+1).padStart(2,"0");
            let currentYear = currentDate.getFullYear();

            let ct = `${currentYear}-${currentMonth}-${currentDay}`;





            return{
                moment,
                biometricsData,
                formatTime,
                totalDays,
                prevPresMonth,
                months,
                form,
                getEmployeeBio,
                ct,
                props,
                employee,
                userrole,
                authid
            }
        }
    }
</script>
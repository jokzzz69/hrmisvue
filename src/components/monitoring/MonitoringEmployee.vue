<template>
    <div class="row">
        <div class="col-md-12 p-title">           
            <h2>My Daily Time Record</h2>                
        </div>
    </div>
    <div class="row justify-content-md-center">       
        <div class="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 col-xxl-3">     
            <ul class="ulwidback">  
                <li>
                    <label class="col-form-label col-12" for="fdate">Select Date</label>                
                    <Datepicker v-model="monthpicked" id="fdate" auto-apply month-picker @update:model-value="getEmployeeBio" :clearable="false" name="monthpicked" :format="format" :month-change-on-arrows="true"></Datepicker> 
                </li> 
                <li class="mt-2" v-if="userrole == 'super-admin' || id == 207 || id == 29 || id == 215"><button class="btn btn-outline-info" @click="gotoEditDTR">Edit</button></li>
            </ul>
        </div>            
    </div>
    <div class="row">
        <div class="col-md-12">              
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
                                <td :class="dtr.status" class="bg-currentDate"  title="Current Date">  
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
                            
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>

    import useMonitoring from '../../composables/composables-monitoring';
    import {onMounted ,ref, computed, reactive} from 'vue';
    import { sortBy} from 'lodash';
    import {useRouter} from 'vue-router'
    import {formatTime} from '../../helper/formattime'
    import moment from 'moment';
    import { useAuthStore } from '@/stores/store.js'

    export default{
        setup(){

            const store = useAuthStore();
            const id = ref(store.details[0]);
            const userrole = ref(store.details[1]);

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


            onMounted(() => {
                getEmployeemonthBio(id.value,monthpicked.value.month+'-'+monthpicked.value.year)

            })


            const getEmployeeBio = async (monthpicked) =>{
                await getEmployeemonthBio(id.value,monthpicked.month+'-'+monthpicked.year)
            }


            const format = (date) => {
              return moment(date).format('MMMM Y');
            }

            const currentDate = new Date();     

            const gotoEditDTR = () => {
               const sm = monthpicked.value.month+'-'+monthpicked.value.year;
               router.push({ name: 'dtrupdating.edit', params: { id: id.value, mf: sm} });
            }



            return{
                moment,
                biometricsData,
                formatTime,
                getEmployeeBio,
                monthpicked,
                format,
                currentDate,
                gotoEditDTR,
                id,
                userrole
                
            }
        }
    }
</script>
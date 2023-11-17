<template>
    <div class="row">
        <div class="col-md-12 p-title">
            <h2>Generate DTR</h2>
        </div>
    </div>
    <div class="row">
        <div class="col biomonitoring-employee-name">
            <p>{{employee.employee_fname}} {{employee.employee_mnane}} {{employee.employee_lname}}</p>
            <form>
                <button type="submit" class="btn btn-outline-success" @click="generatedtr(employee.employee_id)"  title="Generate DTR">
                    <i class="fa-solid fa-user-lock"></i> Generate DTR
                </button>      
            </form>  
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
            <div class="row">                                  
                <div class="col-sm-6">                  
                        <label class="col-form-label col-sm-2" for="fdate">Filter Date</label>                
                        <Datepicker v-model="monthpicked" id="fdate" auto-apply month-picker name="monthpicked"></Datepicker>  
                </div>            
            </div>
            <table class="mtable hasActions mt-2 mb-2 table">
                <thead>
                    <tr>
                        <th @click="sortTable('dtr_date')">Date
                            <span v-if="sortColumn == 'dtr_date'" class="material-icons">{{arrowIconName}}</span>
                            <span v-else class="material-icons">sort</span>
                        </th>
                        <th>Time In</th>
                        <th>Time Out</th>
                        <th>Time In</th>
                        <th>Time Out</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="dtr in filteredDtr" :key="dtr.dtr_empid">
                        <tr>
                            <td>{{formatDate(dtr.dtr_date)}}</td>
                            <td>{{formatTime(dtr.dtr_timeinam)}}</td>
                            <td>{{formatTime(dtr.dtr_timeoutam)}}</td>
                            <td>{{formatTime(dtr.dtr_timeinpm)}}</td>
                            <td>{{formatTime(dtr.dtr_timeoutpm)}}</td>
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
    import useGeneratedtr from '@/composables/composables-generatedtr';

    import {onMounted ,ref, computed} from 'vue';
    import { sortBy} from 'lodash';
    import {useRouter} from 'vue-router'
    import {formatDate} from '@/helper/formatdate'
    import {formatTime} from '@/helper/formattime'
    import moment from 'moment';
    import { useHead } from '@unhead/vue'
    export default{
        props: {
            id: {
                required: true,
                type: String
            }
        },
        setup(props){
            useHead({
                title: 'Employee DTR Report | '+import.meta.env.VITE_BFAR_AGENCY
            })
            const {employee, getEmployee} = useEmployees()
            const {downloadperEmployeeDTR} = useGeneratedtr()
            const {monitoringbiometric, getEmployeebiometric} = useMonitoring()

      
            
            let sort = ref(false);
            let updatedList = ref([])
            const router = useRouter()
            
            const sortColumn = ref("id");
            const sortDirection = ref(1);
            const arrowIconName = ref("arrow_drop_up");         
            

            onMounted(() => {
                getEmployeebiometric(props.id),
                getEmployee(props.id)
            })       

            const generatedtr = async (id) =>{      
                await generatedtruser(id); 
            }


            const monthpicked = ref({ 
                month: new Date().getMonth(),
                year: new Date().getFullYear()
            });
                    
            const filteredDtr = computed(function(){
                return monitoringbiometric.value.filter(
                    (mb) => moment(String(mb.dtr_date)).month() == monthpicked.value.month &&
                            moment(String(mb.dtr_date)).year() == monthpicked.value.year
                );
            });
            

            const sortTable = (columnName) => {
                sortColumn.value = columnName;
                sortDirection.value = -1 * sortDirection.value;
                if (sortDirection.value == 1) {
                    arrowIconName.value = "arrow_drop_up";
                    monitoringbiometric.value.sort((a, b) => (a[columnName] > b[columnName] ? 1 : -1));
                } else {
                    arrowIconName.value = "arrow_drop_down";
                    monitoringbiometric.value.sort((a, b) => (a[columnName] < b[columnName] ? 1 : -1));
                }
            }




            return{
                filteredDtr,
                getEmployeebiometric,
                sortTable,
                sortColumn,
                generatedtr,
                formatDate,
                formatTime,
                monthpicked,
                employee,
                arrowIconName
                
            }
        }
    }
</script>
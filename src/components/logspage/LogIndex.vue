<template>
	<div class="row">
        <div class="col-md-12 p-title">
            <h2>System Logs</h2>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
            <div class="row">
                <div class="col-2">
                    <span class="col-form-label d-block" for="fdate">Filter Date</span>                
                    <Datepicker v-model="daypicked" id="fdate" week-start="0" :enable-time-picker="false" :clearable="false" :format="dateformat" auto-apply name="daypicked"></Datepicker> 
                </div>
                <div class="col-10 d-flex align-items-end">
                    <div class="form-group col-12">
                        <input type="text" name="inputSearch"  placeholder="search..." class="form-control border-blue" v-model="searchQuery">
                    </div>
                </div>
                
            </div>
            <table class="mtable darkTable mt-2 mb-2 table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Page</th>
                        <th>Name</th>
                        <th>Action</th> 
                        <th>Time</th>                    
                    </tr>
                </thead>
                <tbody>
                    <template v-for="activitylog in filteredLogs" :key="activitylog.id">
                        <tr>
                            <td>
                                {{ activitylog.employee_id }}
                            </td>
                            <td>
                                {{ activitylog.page }}
                            </td>
                            <td class="ttc">
                                <template v-if="activitylog.employee">
                                    {{activitylog.employee.employee_fname}} 
                                    <template v-if="activitylog.employee.employee_mname">
                                        {{activitylog.employee.employee_mname.charAt(0).toUpperCase()}}.
                                    </template>
                                    {{activitylog.employee.employee_lname}} {{activitylog.employee.employee_extname}}</template>
                            </td>
                            
                            <td>
                                {{ activitylog.actionname }}
                                <template v-if="activitylog.employeeaffected">
                                    of <strong>{{activitylog.employeeaffected.employee_fname}}
                                    <template v-if="activitylog.employee.employee_mname">
                                        {{activitylog.employeeaffected.employee_mname.charAt(0).toUpperCase()}}.
                                    </template>
                                    {{activitylog.employeeaffected.employee_lname}} {{activitylog.employeeaffected.employee_extname}} 
                                    </strong> 
                                </template>
                            </td>
                            <td>
                                <template v-if="activitylog.actiondate">
                                    {{ moment(activitylog.actiondate).format('hh:mm A') }}
                                </template>                                
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
	import useActivityLogs from '@/composables/composables-logs';
    import useUsers from '@/composables/userscomposables';
	import {onMounted ,ref, computed, inject} from 'vue';
    import moment from 'moment'
    import { useHead } from '@unhead/vue'

	export default{
		setup(){
            useHead({
                title: 'System Logs | BFAR - CAR HRMIS'
            })
            const searchQuery = ref("");
			const {activitylogs,getLogs} = useActivityLogs()
            const {getAuthuser, authuser} = useUsers()
			onMounted(() => {
                getLogs(),
                getAuthuser()
            })

            const daypicked = ref(new Date());

            const dateformat = (daypicked) => {
              return moment(daypicked).format('MMMM DD, Y');
            }
       
            const filteredLogs = computed(function(){
                return activitylogs.value.filter(
                    (activitylog) =>    moment(String(activitylog.actiondate)).month() == daypicked.value.getMonth() &&
                                        moment(String(activitylog.actiondate)).year() == daypicked.value.getFullYear() &&
                                        moment(String(activitylog.actiondate)).date() == daypicked.value.getDate() &&                          
                                        (
                                            activitylog.employee_id.toString().toString().toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1 ||
                                            activitylog.page.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1 ||
                                            activitylog.actionname.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1 ||
                                            (activitylog.employee && activitylog.employee.employee_fname && activitylog.employee.employee_fname.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1) ||
                                            (activitylog.employee && activitylog.employee.employee_mname && activitylog.employee.employee_mname.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1) ||
                                            (activitylog.employee && activitylog.employee.employee_lname && activitylog.employee.employee_lname.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1) ||
                                            (activitylog.employee && activitylog.employee.employee_extname && activitylog.employee.employee_extname.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1) ||

                                            (activitylog.employeeaffected && activitylog.employeeaffected.employee_fname && activitylog.employeeaffected.employee_fname.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1) ||
                                            (activitylog.employeeaffected && activitylog.employeeaffected.employee_mname && activitylog.employeeaffected.employee_mname.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1) ||
                                            (activitylog.employeeaffected && activitylog.employeeaffected.employee_lname && activitylog.employeeaffected.employee_lname.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1) ||
                                            (activitylog.employeeaffected && activitylog.employeeaffected.employee_extname && activitylog.employeeaffected.employee_extname.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1) ||

                                            (moment(activitylog.actiondate).format('hh:mm A').toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1) 
                                        )                                  
                             
                );
            });

			return {
				filteredLogs,
                searchQuery,
                moment,
                daypicked,
                dateformat,
                authuser
                
			}
		}
	}
</script>
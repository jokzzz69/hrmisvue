<template>
	<div class="row">
        <div class="col-md-12 p-title">
            <h2>User Logs for </h2>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
            <div class="row">
                <div class="col-2">
                    <label class="col-form-label" for="fdate">Filter Date</label>                
                    <Datepicker week-start="0" v-model="daypicked" id="fdate" :enable-time-picker="false" :clearable="false" :format="dateformat" auto-apply name="daypicked"></Datepicker> 
                </div>
                <div class="col-10 d-flex align-items-end">
                    <div class="form-group col-12">
                        <input type="text" name="inputSearch"  placeholder="search..." class="form-control border-blue" v-model="searchQuery">
                    </div>
                </div>
            </div>
            <div class="tblWrap mt-2">
                <table class="mtable darkTable table">
                    <thead>
                        <tr>

                            <th>Page</th>
                            <th>Action</th> 
                            <th>Time</th>                    
                        </tr>
                    </thead>
                    <tbody>
                        <template v-if="!tblloader">
                            <template v-for="activitylog in filteredLogs" :key="activitylog.id">
                                <tr>
                
                                    <td>
                                        {{ activitylog.page }}
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
                            <template v-if="searchQuery">
                                <template v-if="!filteredLogs.length">
                                    <tr class="nodata">
                                        <td colspan="3">
                                            No Results Found
                                        </td>
                                    </tr>
                                </template>                         
                            </template>
                            <template v-else>
                                <template v-if="!filteredLogs.length">
                                    <tr class="nodata">
                                        <td colspan="3">
                                            No Entry!
                                        </td>
                                    </tr>
                                </template> 
                            </template>  
                        </template>
                        <template v-else>
                            <tr class="nodata pr">
                                <td colspan="3">
                                    <LoadingComponent/>
                                </td>
                            </tr>
                        </template>
                     
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
	import useActivityLogs from '@/composables/composables-logs';
	import {onMounted ,ref, computed, inject} from 'vue';
    import moment from 'moment'
    import useUser from '@/composables/userscomposables';
    import { useHead } from '@unhead/vue'
    import LoadingComponent from '@/components/loader/LoadingComponent.vue'

	export default{
        components: {
            LoadingComponent
        },
        props: {
            id: {
                required: true,
                type: String
            }
        },
		setup(props){
            useHead({
                title: 'Employee Logs | BFAR - CAR HRMIS'
            })
            const searchQuery = ref("");
			const {activitylog,getLog} = useActivityLogs()
            const {getAuthuser} = useUser();
            const tblloader = ref(true);

            onMounted(() => {
                getLog(props.id).then(() => {
                    tblloader.value = false;
                })
            })      

            const daypicked = ref(new Date());

            const dateformat = (daypicked) => {               

                return moment(daypicked).format('MMMM DD, Y');
            }

            

            const filteredLogs = computed(function(){
                return activitylog.value.filter(
                    (al) =>    moment(String(al.actiondate)).month() == daypicked.value.getMonth() &&
                                        moment(String(al.actiondate)).year() == daypicked.value.getFullYear() &&
                                        moment(String(al.actiondate)).date() == daypicked.value.getDate() &&                          
                                        (                                            
                                            al.page.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1 ||
                                            al.actionname.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1 ||
                                            (al.employeeaffected && al.employeeaffected.employee_fname && al.employeeaffected.employee_fname.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1) ||
                                            (al.employeeaffected && al.employeeaffected.employee_mname && al.employeeaffected.employee_mname.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1) ||
                                            (al.employeeaffected && al.employeeaffected.employee_lname && al.employeeaffected.employee_lname.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1) ||
                                            (al.employeeaffected && al.employeeaffected.employee_extname && al.employeeaffected.employee_extname.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1) ||

                                            (moment(al.actiondate).format('hh:mm A').toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1) 
                                        )                                  
                             
                );
            });

			return {
				filteredLogs,
                searchQuery,
                moment,
                daypicked,
                dateformat,
                tblloader
			}
		}
	}
</script>
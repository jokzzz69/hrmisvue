<template> 
	<div class="row">
        <div class="col-md-12 p-title">
            <h2>New Leave / Absence Record</h2>
        </div>
    </div>
    <form @submit.prevent="saveLeaveRecord">
        <template v-if="displayoptions">
            <div class="form-check">
              <input class="form-check-input" type="radio" name="exampleRadios" id="leave" value="1"  v-model="form.leaveoption" @change="chkleaveoption">
              <label class="form-check-label" for="leave">
                Leave
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="exampleRadios" id="absent" value="0" v-model="form.leaveoption" @change="chkleaveoption">
              <label class="form-check-label" for="absent">
                Absent
              </label>
            </div>
        </template>
        
        <template v-if="userslug != 'employee'">
            <div class="row">
            <div class="col">
                <div class="req">
                    <span class="form-label mb-1">Employees <i class="text-danger">*</i></span>
                       <v-select class="sp2wrap  sl2-floating" multiple placeholder="Select Employees" v-model="form.employees" :reduce="employees => employees.id" :options="employees" :class="errors.employees ? 'error-inputsl' : ''"/>
                </div>
                <span v-if="errors.employees" class="text-danger m-error">{{errors.employees[0]}}</span> 
            </div>
        </div>
        </template>

        <template v-if="displayLeave">
             <div class="row align-items-end">
                <div class="col">
                    <div class="date-form-floating req">
                        <span class="mb-2 d-block">Date of Filing <span class="text-danger">*</span></span>
                        <Datepicker v-model="form.dateoffiling" auto-apply :clearable="true" :highlight-week-days="[0, 6]" week-start="0"  :class="errors.dateoffiling ? 'error-input' : ''" :enable-time-picker="false" name="dateoffiling" placeholder="Select date of filing (mm/dd/yyyy)"></Datepicker>
                        <span v-if="errors.dateoffiling" class="text-danger m-error sp-aberror">{{errors.dateoffiling[0]}}</span>  
                    </div>
                </div>

            </div>
            <div class="row">
                <div class="col mt-4">
                    <span class="mb-2 d-block">Leave Types <span class="text-danger">*</span></span>
                </div>
            </div>
            <div class="row">
                <div class="col mb-2">
                    <div class="card p-3" :class="errors.leavetypes ? 'br-error' : ''">                    
                        <ul class="list-unstyled li--50 li-leavedetails mb-0">                    
                            <template v-for="leavetype in leavetypes" :key="leavetype.id">
                                <li>
                                    <div class="form-check form-switch childCheck">
                                          <input class="form-check-input" :id="'lt-'+leavetype.id"  type="checkbox" checked v-model="form.leavetypes" :value="leavetype.id" @change="chkOthers">
                                          <label class="form-check-label" :for="'lt-'+leavetype.id" ><strong>{{leavetype.name}}</strong> 
                                            <template v-if="leavetype.description">
                                                  ({{leavetype.description}})
                                            </template>
                                          </label>
                                    </div>  
                                </li>
                            </template>                    
                        </ul>
                        <div class="others" v-if="displayOthers">
                            <input type="text" class="form-control mt-2" placeholder="enter others..." name="otherleave" v-model="form.otherleavetype"/>
                        </div>
                    </div>
                </div>
                <div class="col-12" v-if="errors.leavetypes"><span class="text-danger m-error">{{errors.leavetypes[0]}}</span></div>
            </div>
        </template>

        <div class="row">
            <div class="col mt-2 mb-3 req tsnn">
                <span class="d-block">Start Date <i class="text-danger">*</i></span>
                <Datepicker class="date-form-floating highlights-weekend" id="dts" week-start="0" auto-apply v-model="form.leavestart" placeholder="Date Start" :enable-time-picker="false"  :clearable="false"  :class="errors.leavestart ? 'error-input' : ''" :highlight-week-days="[0, 6]" :teleport="true"></Datepicker>
                <span v-if="errors.leavestart" class="text-danger m-error">{{errors.leavestart[0]}}</span>  
                <small>(mm/dd/yy)</small>
                
            </div>
            <div class="col  mt-2 mb-3 req tsnn">
                <span class="d-block">End Date <i class="text-danger">*</i></span>
                <Datepicker class="date-form-floating highlights-weekend" id="dts1" week-start="0" auto-apply v-model="form.leaveend" placeholder="Date End" :enable-time-picker="false"  :clearable="false"  :class="errors.leaveend ? 'error-input' : ''" :highlight-week-days="[0, 6]" :teleport="true"></Datepicker>
                <span v-if="errors.leaveend" class="text-danger m-error">{{errors.leaveend[0]}}</span>  
                <small>(mm/dd/yy)</small>
                
            </div>
        </div>
        



        <div class="form-row">
            <div class="col mt-3 text-end">
            	<router-link :to="{name: 'leavetypes.index'}" class="btn btn-secondary me-1">Cancel</router-link>
            	<button type="submit" class="btn btn-primary"> Save</button>
            </div>
        </div>
        
    </form>
</template>

<script>
	import { reactive,inject, onMounted,ref} from "vue";
	import useLeaveTypes from "@/composables/composables-leavetypes";
    import useLeaveRecords from "@/composables/composables-leave";
    import { useHead } from '@unhead/vue'
    import useEmployees from '@/composables/composables-employees'
    import {useAuthStore} from '@/stores/store.js'

	export default {
		setup(){
            useHead({
                title: 'Create Leave / Absence Record | BFAR - CAR HRMIS'
            })

			const form = reactive({
			    'dateoffiling': '',
                'totaldays': '',
                'leavestart': '',
                'leaveend': '',
                'otherleavetype': '',
                'leavetypes': [],
                'leaveoption': '',
			});

			const swal = inject('$swal')
			
			const {  storeLeaveType, getLeaveTypes, leavetypes } = useLeaveTypes()
            const {  getEmployeeOptions, employees } = useEmployees()

            const {errors, storeLeaveRecord} = useLeaveRecords();

            const store = useAuthStore()

            const userid = store.getdetails[0];
            const userslug = store.getdetails[1];
            const usertype = store.getdetails[3];
            const displayLeave = ref(false);
            const displayoptions = ref(false);
            const displayOthers = ref(false);



            onMounted(() => {
                getLeaveTypes();
                getEmployeeOptions();
                if(userslug != 'employee'){
                    displayoptions.value = true;
                }
                if(usertype > 0){
                    form.leaveoption = '0';
                    displayLeave.value  = false;
                }else{

                    form.leaveoption = '1';
                    displayLeave.value  = true;                
                }
            })
			const saveLeaveRecord = async () => {
			    await storeLeaveRecord({ ...form }).then(() => {
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
                });
			}
            const chkleaveoption = () =>{
                displayLeave.value = !displayLeave.value;
            }
			const chkOthers = () =>{
                if(form.leavetypes.includes(14)){
                    displayOthers.value = true;
                }else{
                    displayOthers.value = false;
                    form.otherleavetype = '';
                }

            }

			return{
				form,
				errors,
				saveLeaveRecord,
                leavetypes,
                chkOthers,
                chkleaveoption,
                displayLeave,
                displayoptions,
                displayOthers,
                employees,
                userslug
			}
		}
	}
</script>
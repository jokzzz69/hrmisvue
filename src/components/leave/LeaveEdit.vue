<template> 
    <div class="row">
        <div class="col-md-12 p-title">
            <h2 v-if="usertype != 1">Edit Absent / Leave Record</h2>
            <h2 v-else>Edit Absent Record</h2>
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
                    <div class="form-floating">
                      <select class="form-select mt-2" id="flselectemp" v-model="form.employee_id">
                        <option value="" disabled>----</option>
                        <option v-for="employee in employees" :key="employee.id" :value="employee.id">
                            {{employee.label}}
                        </option>
                      </select>
                      <label for="flselectemp">Select Employee</label>
                    </div>
                </div>
            </div>
        </template>

        <template v-if="displayLeave">
             <div class="row align-items-end">
                <div class="col">
                    <div class="date-form-floating req">
                        <span class="mb-2 d-block">Date of Filing <span class="text-danger">*</span></span>
                        <Datepicker v-model="form.dateoffiling" auto-apply :clearable="true" :highlight-week-days="[0, 6]" week-start="0"  :class="errors.dateoffiling ? 'error-input' : ''" :enable-time-picker="false" name="dateoffiling" placeholder="Select date of filing (yyyy-mm-dd)" @update:model-value="handleFiling(key)" :format="format"></Datepicker>
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
        <template v-if="errors.leaveduration">
            <span class="text-danger m-error">{{errors.leaveduration[0]}}</span>
        </template>

        <div class="row" v-if="divs.length > 0">
            <div class="col-12 mt-2 duration-col">
                <div class="card p-3">
                    <template v-for="(div, key) in divs">               
                        <div class="row align-items-center">
                            <div class="col mt-1 mb-1 req tsnn">

                                <span class="d-block" v-if="key < 1">Start Date <i class="text-danger">*</i>
                                <template v-if="errors">
                                    <template v-if="errors[`leaveduration.${key}.leavestart`]">
                                        <span class="text-danger ms-2">{{errors[`leaveduration.${key}.leavestart`][key]}}</span>
                                    </template>
                                </template>
                                </span>
  
                
                                <Datepicker :enable-time-picker="false"   class="date-form-floating highlights-weekend" id="dts" week-start="0" auto-apply v-model="form.leaveduration[key].leavestart" placeholder="Date Start (yyyy-mm-dd)"  :clearable="false" :class="errors[`leaveduration.${key}.leavestart`] ? 'error-input' : ''" :highlight-week-days="[0, 6]" :teleport="true" @update:model-value="handleStartDate(key)" :format="format"></Datepicker>
                                    

                                
                            </div>
                            <div class="col  mt-1 mb-1 req tsnn">
                                <span class="d-block" v-if="key < 1">End Date <i class="text-danger">*</i>
                                <template v-if="errors">
                                    <template v-if="errors[`leaveduration.${key}.leaveend`]">
                                        <span class="text-danger ms-2">{{errors[`leaveduration.${key}.leaveend`][key]}}</span>
                                    </template>
                                </template>
                                </span>
                                <Datepicker class="date-form-floating highlights-weekend" id="dts1" week-start="0" auto-apply v-model="form.leaveduration[key].leaveend" placeholder="Date End (yyyy-mm-dd)" :enable-time-picker="false"  :clearable="false" :class="errors[`leaveduration.${key}.leaveend`] ? 'error-input' : ''" :highlight-week-days="[0, 6]" :teleport="true" @update:model-value="handleEndDate(key)" :format="format"></Datepicker>       
             
                            </div>
                            <div class="col-auto">
                                <button class="btn btn-danger btn-remove-duration" @click.prevent="removeduration(key)">-</button>
                            </div>
                        </div>          
                    </template>
                </div>
            </div>
        </div>
        
        
        <div class="row">
            <div class="col text-center mt-2">
                <button class="btn btn-primary" @click.prevent="addduration">+ Add Inclusive Dates</button>
            </div>
        </div>


        <div class="form-row">
            <div class="col mt-3 text-end">
                <button class="btn btn-secondary me-1" @click.prevent="cancelback">Cancel</button>
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
    import {useRouter} from 'vue-router'
    import moment from 'moment'
    export default {
        props: {
            id: {
                required: true,
                type: String
            }
        },
        setup(props){
            useHead({
                title: 'Edit Leave / Absent Record | BFAR - CAR HRMIS'
            })

            const form = reactive({
                'dateoffiling': '',
                'employee_id': '',
                'leaveduration': [],
                'otherleavetype': '',
                'leavetypes': [],
                'leaveoption': '',
            });


            const router = useRouter()
            const swal = inject('$swal')
            
            const {  getLeaveTypes, leavetypes } = useLeaveTypes()
            const {  getEmployeeOptions, employees } = useEmployees()

            const {errors, updateLeaveRecord, getLeaveRecord, leaverecord} = useLeaveRecords();

            const store = useAuthStore()

            const userid = store.getdetails[0];
            const userslug = store.getdetails[1];
            const usertype = store.getdetails[3];
            const displayLeave = ref(false);
            const displayoptions = ref(false);
            const displayOthers = ref(false);

            const divs = reactive([]); 
            const add = ref(0); 

            onMounted(() => {
                getLeaveTypes();
                getEmployeeOptions();

                getLeaveRecord(props.id).then(() => {

                    

                    form.dateoffiling = leaverecord.value.dateoffiling;
                    form.employee_id = leaverecord.value.employee_id;
                    form.leavestart = leaverecord.value.leavestart;
                    form.leaveend = leaverecord.value.leaveend;
                    form.otherleavetype = leaverecord.value.otherleavetype;
                    
                    form.leaveoption = leaverecord.value.leaveoption;

                    if(leaverecord.value.leavetypes){
                        for(const x of leaverecord.value.leavetypes){
                            if(x['id'] != 15){
                                form.leavetypes.push(x['id']);
                            }
                        }
                    }
                    if(leaverecord.value.leaveduration){
                        for(const x in leaverecord.value.leaveduration){
                            divs.push({
                                id: x,
                            })
                    
                            form.leaveduration.push({
                                'leavestart': moment(leaverecord.value.leaveduration[x].leavestart).format('YYYY-MM-DD'),
                                'leaveend':moment(leaverecord.value.leaveduration[x].leaveend).format('YYYY-MM-DD')
                            })
                        }
                        add.value = divs.length;
                    }

                    if(leaverecord.value.leaveoption != 1){
                        displayLeave.value  = false;
                    }else{
                        displayLeave.value = true;
                    }

                });

                form.employee_id = userid;

                if(usertype != 1){
                    displayoptions.value = true;
                }else{

                    if(userslug == 'super-admin' || userslug == 'admin'){
                        displayoptions.value = true;
                    }else{
                        displayoptions.value = false;
                    }                  
                }               
        
        
            })
            const saveLeaveRecord = async () => {

                await updateLeaveRecord(props.id,{ ...form }).then(() => {
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
            const cancelback = () =>{
                router.go(-1);
            }
            const addduration =() =>{
                divs.push({
                    id: add.value,
                })
                add.value++;

                form.leaveduration.push({
                    'leavestart':'',
                    'leaveend':''
                })
            }
            const removeduration = async(index) =>{
                form.leaveduration.splice(index,1);
                divs.splice(index,1);
            }
            const handleStartDate = async(key) =>{           
                form.leaveduration[key].leavestart = moment(form.leaveduration[key].leavestart).format('YYYY-MM-DD');                   
            }
            const handleEndDate = async(key) =>{           
                form.leaveduration[key].leaveend = moment(form.leaveduration[key].leaveend).format('YYYY-MM-DD');                   
            }
            const handleFiling = async(key) =>{           
                form.dateoffiling = moment(form.dateoffiling).format('YYYY-MM-DD');                   
            }
            const format = (k) => {
               
                return moment(k).format('YYYY-MM-DD');
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
                userslug,
                usertype,
                cancelback,
                divs,
                addduration,
                removeduration,
                handleStartDate,
                handleEndDate,
                handleFiling,
                format
            }
        }
    }
</script>
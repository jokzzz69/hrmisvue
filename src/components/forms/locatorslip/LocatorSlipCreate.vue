<template>
    <div class="row">
        <div class="col-md-12 p-title">
            <h2>New Locator Slip</h2>
        </div>
    </div>
    <form v-on:submit.prevent="saveLocatorSlip">
        <div class="row mh-ls">
            <div class="col col-auto">
                <span class="splbl">Duration Type: </span>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="dt1" value="1" v-model="form.durationtype">
                  <label class="form-check-label" for="dt1">Hour(s)</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="dt2" value="2" v-model="form.durationtype">
                  <label class="form-check-label" for="dt2">Day(s)</label>
                </div>
            </div>
            <div class="col"  v-if="form.durationtype == 1">
                 <div class="row">
                    <div class="col  mb-3 req tsnn">
                        <span class="d-block">Date <i class="text-danger">*</i></span>
                        <Datepicker class="date-form-floating highlights-weekend" id="dts" week-start="0" auto-apply v-model="form.datehourly" placeholder="Date" :enable-time-picker="false"  :clearable="false"  :class="errors.datehourly ? 'error-input' : ''" :highlight-week-days="[0, 6]" @update:model-value="handleStartDate()" :format="format" :max-date="getmaxdate()"></Datepicker>
                        <span v-if="errors.datehourly" class="text-danger m-error">{{errors.datehourly[0]}}</span>  

                        
                    </div>
                    <div class="col mb-3 req tsnn">
                        <span class="d-block">Time Start <i class="text-danger">*</i></span>
                        <Datepicker class="date-form-floating highlights-weekend" id="dts" week-start="0" auto-apply v-model="form.timestart" placeholder="Time Start" time-picker :clearable="false"  :class="errors.timestart ? 'error-input' : ''"  :max-time="getmaxtime()" @update:model-value="handleStartTime()"></Datepicker>
                        <span v-if="errors.timestart" class="text-danger m-error">{{errors.timestart[0]}}</span>  
     
                        
                    </div>
                    <div class="col mb-3 req tsnn">
                        <span class="d-block">Time End <i class="text-danger">*</i></span>
                        <Datepicker class="date-form-floating highlights-weekend" id="dts" week-start="0" auto-apply v-model="form.timeend" placeholder="Time End" :enable-time-picker="false"  time-picker :clearable="false"  :class="errors.timeend ? 'error-input' : ''" :min-time="getmintime()"></Datepicker>
                        <span v-if="errors.timeend" class="text-danger m-error">{{errors.timeend[0]}}</span>  
                        
                    </div>
                </div>
            </div>
            <div class="col" v-if="form.durationtype == 2">
                <div class="row">
                    <div class="col col-sm-6 mb-3 req tsnn">
                        <span class="d-block">Start Date <i class="text-danger">*</i></span>
                        <Datepicker class="date-form-floating highlights-weekend" id="dts" week-start="0" auto-apply v-model="form.datestart" placeholder="Date Start" :enable-time-picker="false"  :clearable="false"  :class="errors.datestart ? 'error-input' : ''" :highlight-week-days="[0, 6]" @update:model-value="handleStartDate()" :format="format" :max-date="getmaxdate()"></Datepicker>
                        <span v-if="errors.datestart" class="text-danger m-error">{{errors.datestart[0]}}</span>  
                        <small>(mm/dd/yy)</small>
                        
                    </div>
                    <div class="col col-sm-6 mb-3 req tsnn">
                        <span class="d-block">End Date <i class="text-danger">*</i></span>
                        <Datepicker class="date-form-floating highlights-weekend" id="dts" week-start="0" auto-apply v-model="form.dateend" placeholder="Date End" :enable-time-picker="false"  :clearable="false"  :class="errors.dateend ? 'error-input' : ''" :highlight-week-days="[0, 6]" @update:model-value="handleEndDate()" :format="format" :min-date="getmindate()"></Datepicker>
                        <span v-if="errors.dateend" class="text-danger m-error">{{errors.dateend[0]}}</span>  
                        <small>(mm/dd/yy)</small>
                        
                    </div>
                </div>
            </div>

        </div>
        <div class="row">
            <div class="col">
                <div class="form-floating">
                    <select class="form-select" id="obtype" v-model="form.obtype">
                        <option value="" disabled>Select Type</option>
                        <option value="0">Fieldwork / OB</option>
                        <option value="1">Personal Matter</option>
                    </select>
                    <label for="obtype">Type</label>
                </div>
            </div>
            <div class="col">
                <div class="form-floating">
                    <input type="text" v-model="form.obaddress" placeholder="OB At" id="obaddress" class="form-control">
                    <label for="obaddress">Location</label>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col mt-2">
                <div class="form-floating">
                    <textarea class="form-control" id="reasons" v-model="form.reason" placeholder="Enter Reasons">
                        
                    </textarea>

                    <label for="reasons">Reason</label>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col mt-2">
                <span class="form-label mb-1">Agency Head / Supervisor</span>
                <v-select  class="sl2-floating" placeholder="Select Employee" v-model="form.supervisor" :reduce="employees => employees.id" :options="employees"/>
            </div>
        </div>
        <div class="row">
            <div class="col mt-2 text-end">
                <button @click="$router.go(-1)" class="btn btn-secondary me-1">Cancel</button>
                <button type="submit" class="btn btn-save">Save</button>
            </div>
        </div>  
    </form>
</template>
<script>
    import { reactive ,inject, onMounted} from "vue";
    import useLocations from "@/composables/composables-location";
    import { useHead } from '@unhead/vue'
    import moment from 'moment'
    import useEmployees from '@/composables/composables-employees';
    import 'vue-select/dist/vue-select.css';
    export default {
        setup(){
            useHead({
                title: 'Create Locator Slip | '+import.meta.env.VITE_BFAR_AGENCY
            })
            const form = reactive({
                'obaddress': '',
                'obtype': '',
                'location_name': '',
                'durationtype': 1,
                'datestart': '',
                'dateend': '',
                'datehourly': '',
                'timestart': '',
                'timeend': '',
                'reason': '',
                'supervisor': ''

            })

            const swal = inject('$swal')
            const { errors, storeLocation } = useLocations()
            const {employees, getEmployeeOptions} = useEmployees()

            onMounted(() => {
                getEmployeeOptions()
            })
            const saveLocatorSlip = async () => {                
                await storeLocation({ ...form }).then(() => {
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
                })
            }
            
            const getmaxdate = (key) => {
                if(form.travelend != ''){
                    return new Date(form.travelend);
                }
                
            }
            const getmindate = (key) => {
                if(form.travelstart != ''){
                    return new Date(form.travelstart); 
                }                
            }
            const handleStartDate = async() =>{           
                form.travelstart  = moment(form.travelstart).format('YYYY-MM-DD');                   
            }
            const handleEndDate = async() =>{           
                form.travelend = moment(form.travelend).format('YYYY-MM-DD');                   
            }
            const handleStartTime = async() =>{           
                console.log(form.timestart);
            }
            const format = (k) => {
               
                return moment(k).format('MMMM D, Y');
            }
            const getmaxtime = () =>{
                if(form.timeend != ''){
                    return form.timeend;
                }
            }
            const getmintime = () =>{
                if(form.timestart != ''){
                    return form.timestart;
                }
            }
            return{
                form,
                errors,
                saveLocatorSlip,
                getmaxdate,
                getmindate,
                handleStartDate,
                handleEndDate,
                handleStartTime,
                format,
                moment,
                getmaxtime,
                getmintime,
                employees
            }
        }
    }
</script>
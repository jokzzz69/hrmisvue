<template>
    <div class="row">
        <div class="col-md-12 p-title">
            <h2>Edit Approved Locator Slip</h2>
        </div>
    </div>
    <form v-on:submit.prevent="saveLocatorSlip">
        <div class="row">
            <div class="col">
                <div class="col  mb-3 req tsnn">
                    <span class="d-block">Date Created<i class="text-danger">*</i></span>
                    <Datepicker class="date-form-floating highlights-weekend" id="dts" week-start="0"  v-model="form.datecreated" placeholder="Date" :enable-time-picker="false"  :clearable="false"  :class="errors.datecreated ? 'error-input' : ''" :highlight-week-days="[0, 6]" @update:model-value="handleDateCreated()" :format="format"  :max-date="new Date()"></Datepicker>
                    <span v-if="errors.datecreated" class="text-danger m-error">{{errors.datecreated[0]}}</span>                        
                </div>
            </div>
            <div class="col">
                <span class="form-label mb-1">Approved by <span class="text-danger">*</span></span>
                <v-select  class="sl2-floating single select-sl-approved" placeholder="Select Supervisor" v-model="form.supervisor" :reduce="employees => employees.id" :options="employees" :class="errors.supervisor ? 'error-inputsl' : ''"/>
                <span v-if="errors.supervisor" class="text-danger m-error">{{errors.supervisor[0]}}</span>   
            </div>
        </div>
        <hr>
        <div class="row mh-ls">            
            <div class="col col-auto">
                <span class="splbl">Duration Type: </span>
                <div class="form-check" @change="radbtnChange">
                  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="dt1" value="1" v-model="form.durationtype">
                  <label class="form-check-label" for="dt1">Hour(s)</label>
                </div>
                <div class="form-check" @change="radbtnChange">
                  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="dt2" value="2" v-model="form.durationtype">
                  <label class="form-check-label" for="dt2">Day(s)</label>
                </div>
            </div>
            <div class="col"  v-if="form.durationtype == 1">
                 <div class="row">
                    <div class="col  mb-3 req tsnn">
                        <span class="d-block">Event Date <i class="text-danger">*</i></span>
                        <Datepicker class="date-form-floating highlights-weekend" id="dts" week-start="0"  v-model="form.datehourly" placeholder="Date" :enable-time-picker="false"  :clearable="false"  :class="errors.datehourly ? 'error-input' : ''" :highlight-week-days="[0, 6]" @update:model-value="handleHourlyDate()" :format="format"></Datepicker>
                        <span v-if="errors.datehourly" class="text-danger m-error">{{errors.datehourly[0]}}</span>                        
                    </div>
                    <div class="col mb-3 req tsnn">
                        <span class="d-block">Time Start <i class="text-danger">*</i></span>
                        <Datepicker class="date-form-floating highlights-weekend" id="dts" week-start="0" v-model="form.timestart" placeholder="Time Start" time-picker :clearable="false"  :class="errors.timestart ? 'error-input' : ''"  :max-time="getmaxtime()" @update:model-value="handleStartTime()"></Datepicker>
                        <span v-if="errors.timestart" class="text-danger m-error">{{errors.timestart[0]}}</span>  
                    </div>
                    <div class="col mb-3 req tsnn">
                        <span class="d-block">Time End <i class="text-danger">*</i></span>
                        <Datepicker class="date-form-floating highlights-weekend" id="dts" week-start="0"  v-model="form.timeend" placeholder="Time End" :enable-time-picker="false"  time-picker :clearable="false"  :class="errors.timeend ? 'error-input' : ''" :min-time="getmintime()"></Datepicker>
                        <span v-if="errors.timeend" class="text-danger m-error">{{errors.timeend[0]}}</span>  
                        
                    </div>
                </div>
            </div>
            <div class="col" v-if="form.durationtype == 2">
                <div class="row">
                    <div class="col col-sm-6 mb-3 req tsnn">
                        <span class="d-block">Start Date <i class="text-danger">*</i></span>
                        <Datepicker class="date-form-floating highlights-weekend" id="dts" week-start="0" v-model="form.datestart" placeholder="Date Start" :enable-time-picker="false"  :clearable="false"  :class="errors.datestart ? 'error-input' : ''" :highlight-week-days="[0, 6]" @update:model-value="handleStartDate()" :format="format" :max-date="getmaxdate()"></Datepicker>
                        <span v-if="errors.datestart" class="text-danger m-error">{{errors.datestart[0]}}</span>  
                        <small>(mm/dd/yy)</small>                        
                    </div>
                    <div class="col col-sm-6 mb-3 req tsnn">
                        <span class="d-block">End Date <i class="text-danger">*</i></span>
                        <Datepicker class="date-form-floating highlights-weekend" id="dts" week-start="0" v-model="form.dateend" placeholder="Date End" :enable-time-picker="false"  :clearable="false"  :class="errors.dateend ? 'error-input' : ''" :highlight-week-days="[0, 6]" @update:model-value="handleEndDate()" :format="format" :min-date="getmindate()"></Datepicker>
                        <span v-if="errors.dateend" class="text-danger m-error">{{errors.dateend[0]}}</span>  
                        <small>(mm/dd/yy)</small>                        
                    </div>
                </div>
            </div>

        </div>
        <div class="row">
            <div class="col">
                <div class="form-floating req">
                    <select class="form-select" id="obtype" v-model="form.obtype" :class="errors.obtype ? 'error-input' : ''">
                        <option value="" disabled>Select Type</option>
                        <option value="0">Fieldwork / OB</option>
                        <option value="1">Personal Matter</option>
                    </select>
                    <label for="obtype">Type</label>
                    <span v-if="errors.obtype" class="text-danger m-error">{{errors.obtype[0]}}</span>   
                </div>
            </div>
            <div class="col">
                <div class="form-floating req">
                    <input type="text" v-model="form.obaddress" placeholder="OB At" id="obaddress" class="form-control" :class="errors.obaddress ? 'error-input' : ''">
                    <label for="obaddress">Location</label>
                    <span v-if="errors.obaddress" class="text-danger m-error">{{errors.obaddress[0]}}</span>   
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col mt-2">
                <div class="form-floating req">
                    <textarea class="form-control" id="reasons" v-model="form.reason" placeholder="Enter Reasons"  :class="errors.reason ? 'error-input' : ''"></textarea>
                    <label for="reasons">Reason</label>
                    <span v-if="errors.reason" class="text-danger m-error">{{errors.reason[0]}}</span>
                </div>
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
    import { useHead } from '@unhead/vue'
    import moment from 'moment'
    import useEmployees from '@/composables/composables-employees';
    import useLocatorSlips from '@/composables/forms/composables-locatorslip';
    
    import 'vue-select/dist/vue-select.css';
    export default {
        props: {
            id: {
                required: true,
                type: String
            }
        },
        setup(props){
            useHead({
                title: 'Edit Locator Slip | '+import.meta.env.VITE_BFAR_AGENCY
            })
            const form = reactive({
                'obaddress': '',
                'lsstatus': 3,
                'obtype': '',
                'durationtype': '',
                'datestart': '',
                'dateend': '',
                'datehourly': '',
                'timestart': '',
                'timeend': '',
                'reason': '',
                'supervisor': '',
                'datecreated': ''

            })

            const swal = inject('$swal')

            const {updateLocatorSlip, locatorslip, errors, getLocatorSlip} = useLocatorSlips();

            const {employees, getRegularEmployeeOptions} = useEmployees()

            onMounted(() => {
                getRegularEmployeeOptions(),
                getLocatorSlip(props.id).then(() =>{

                    if(locatorslip.value.durationtype != 1){
                        form.durationtype = 2;
                    }else{
                        form.durationtype = 1;
                    }

                    form.datecreated = locatorslip.value.lsdatecreated;
                    form.supervisor = locatorslip.value.actionedby;


                    if(locatorslip.value.durationtype == 1){
                        form.datehourly = moment(new Date(locatorslip.value.datestart)).format('YYYY-MM-DD');
                        form.timestart = {
                            'hours' : new Date(locatorslip.value.datestart).getHours(),
                            'minutes' : new Date(locatorslip.value.datestart).getMinutes(),
                            'seconds' : new Date(locatorslip.value.datestart).getSeconds(),
                        }
                        form.timeend = {
                            'hours' : new Date(locatorslip.value.dateend).getHours(),
                            'minutes' : new Date(locatorslip.value.dateend).getMinutes(),
                            'seconds' : new Date(locatorslip.value.dateend).getSeconds(),
                        }
                    }else{
                        form.datestart  = moment(new Date(locatorslip.value.datestart)).format('YYYY-MM-DD');      
                        form.dateend = moment(new Date(locatorslip.value.dateend)).format('YYYY-MM-DD'); 
                    }

                    form.obtype = locatorslip.value.obtype;
                    form.obaddress = locatorslip.value.lslocation;
                    form.reason = locatorslip.value.reason;
                })
            })
            const saveLocatorSlip = async () => {   
           
                await updateLocatorSlip(props.id,{ ...form }).then(() => {
                    if(!errors.value){
                        swal.fire({
                            toast: true,
                            position: 'top-end',
                            title: 'Successfully Updated',
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
                if(form.dateend != ''){
                    return new Date(form.dateend);
                }
                
            }
            const dayMaxdate = (key) => {
                if(form.datestart != ''){
                    return new Date(new Date(form.datestart).getTime() + 2* 24 * 60 * 60 * 1000); 
                }  
            }
            const getmindate = (key) => {
                if(form.datestart != ''){
                    return new Date(form.datestart); 
                }                
            }
            const handleDateCreated = async() =>{           
                form.datecreated  = moment(new Date(form.datecreated)).format('YYYY-MM-DD');                   
            }
            const handleHourlyDate = async() =>{           
                form.datehourly  = moment(new Date(form.datehourly)).format('YYYY-MM-DD');                   
            }
            const handleStartDate = async() =>{           
                form.datestart  = moment(new Date(form.datestart)).format('YYYY-MM-DD');                   
            }
            const handleEndDate = async() =>{           
                form.dateend = moment(new Date(form.dateend)).format('YYYY-MM-DD');                   
            }
            const handleStartTime = async() =>{           

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
            const radbtnChange = () => {
                form.datestart = '';
                form.dateend = '';
                form.datehourly = '';
                form.timestart = '';
                form.timeend = '';
            }
            return{
                form,
                errors,
                saveLocatorSlip,
                getmaxdate,
                dayMaxdate,
                getmindate,
                handleHourlyDate,
                handleStartDate,
                handleEndDate,
                handleStartTime,
                handleDateCreated,
                format,
                moment,
                getmaxtime,
                getmintime,
                employees,
                radbtnChange,
                locatorslip
            }
        }
    }
</script>
<template>
    <div class="row">
        <div class="col-md-12 p-title">
            <h2>Edit Biometric Log</h2>
            <span class="fs-5 mh-20 d-block">
            	<template v-if="employee">
            		<template v-if="authid != employee.employee_id">
            			{{employee.employee_fname}} 
	            			<template v-if="employee.employee_mname">
	            				{{employee.employee_mname.charAt(0).toUpperCase()}}.
	            			</template>
	            		 {{employee.employee_lname}} 
	            		
            		</template>            		
            	</template>
            </span>
        </div>
    </div>
                      
    <p class="fs-5">Date: <strong>{{moment(biolog.dtr_date).format('MMMM D, Y')}}</strong> </p>                    
             
    <form v-on:submit.prevent="saveBioLog">
    	
        <div class="row">        	
        	<div class="col mb-2 lblname disabled">
                <div class="form-floating">                    
                    <span class="form-control mhlabel">                        
                        <strong>{{formatTime(biolog.dtr_timeinam)}}</strong>                     
                    </span>
                    <label class="form-label">Time in AM</label>
                </div>
            </div>  

        	<div class="col mb-2">  
        		<template v-if="checkTimeoutAM == 1">
        			<div class="form-floating disabled">                    
	                    <span class="form-control mhlabel">                        
	                        <strong>{{formatTime(biolog.dtr_timeoutam)}}</strong>                     
	                    </span>
	                    <label class="form-label">Time in AM</label>
	                </div>
        		</template>
        		<template v-else>
        			<div class="form-floating">
	                	<input type="time" v-model="form.dtr_timeoutam" :class="errors.dtr_timeoutam ? 'error-input' : ''" class="form-control" name="timeoutam">
	                	<label>Time out AM</label>
	                </div>
	                <span v-if="errors.dtr_timeoutam" class="text-danger m-error">{{errors.dtr_timeoutam[0]}}</span>
        		</template>               
            </div>  
            <div class="col mb-2">
                <template v-if="checkTimeinPM == 1">
        			<div class="form-floating disabled">                    
	                    <span class="form-control mhlabel">                        
	                        <strong>{{formatTime(biolog.dtr_timeinpm)}}</strong>                     
	                    </span>
	                    <label class="form-label">Time in PM</label>
	                </div>
        		</template>
        		<template v-else>
        			<div class="form-floating">
	                	<input type="time" v-model="form.dtr_timeinpm" :class="errors.dtr_timeinpm ? 'error-input' : ''" class="form-control" name="timeinpm">
	                	<label>Time out AM</label>
	                </div>
	                <span v-if="errors.dtr_timeinpm" class="text-danger m-error">{{errors.dtr_timeinpm[0]}}</span>
        		</template>
            </div>   
            <div class="col mb-2 lblname disabled">
                <div class="form-floating">                    
                    <span class="form-control mhlabel">                        
                        <strong>{{formatTime(biolog.dtr_timeoutpm)}}</strong>                     
                    </span>
                    <label class="form-label">Time out PM</label>
                </div>
            </div>               
        </div>
        <div class="row">
        	<div class="col">
        		<h4 class="text-danger text-center mt-2"><i class="fa-solid fa-person-digging"></i> This Page is under development!</h4>
        	</div>
        </div>
    </form>
</template>

<script>
import useBiolog from '@/composables/composables-dtrupdating';
import useEmployees from '@/composables/composables-employees'
import { onMounted, inject, reactive,ref, computed} from 'vue';
import {formatTime} from '../../helper/formattime'
import moment from 'moment'
import {useRouter} from 'vue-router'

import { useAuthStore } from '@/stores/store.js'

export default {
	props : {
		id: {
			required: true,
			type: String
		}
	},
	setup(props){
		const form = reactive({
			'dtr_timeinam': '',
			'dtr_timeoutam': '',
			'dtr_timeinpm': '',
			'dtr_timeoutpm': '',
			'month': ''
		});
		const store = useAuthStore();
        const userrole = ref(store.getdetails[1]);
        const authid = ref(store.getdetails[0]);
		const swal = inject('$swal')
		const { errors, getBiolog, biolog } = useBiolog()
		const { getEmployee, employee } = useEmployees()
		const router = useRouter()

		onMounted(
			()  => 	getBiolog(props.id).then(res => {
						const day = biolog.value.dtr_date;
						const timeinAm = `${day} ${biolog.value.dtr_timeinam}`;
						const timeoutAm = `${day} ${biolog.value.dtr_timeoutam}`;
						const timeinPm = `${day} ${biolog.value.dtr_timeinpm}`;
						const timeoutPm = `${day} ${biolog.value.dtr_timeoutpm}`;
						form.dtr_timeoutam = new Date(timeoutAm).toLocaleTimeString('it-IT');
						form.dtr_timeinpm = new Date(timeinPm).toLocaleTimeString('it-IT');
						form.month = new Date(day).getMonth();

						getEmployee(biolog.value.dtr_empid)
					})
					


		);

		const checkTimeoutAM = computed(() =>{
			return biolog.value.dtr_timeoutam != '00:00:00.0000000'  ? '1' : '0';
		});
		const checkTimeinPM = computed(() =>{
			return biolog.value.dtr_timeinpm != '00:00:00.0000000'  ? '1' : '0';
		});
		const saveBioLog = async () => {    
		    await updateLocation(props.id).then(() => {
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

		const goBack = (id) => {
            router.push({name: 'dtrupdating.index', params: { id: id, mf: form.month }});
        }

		return {
			biolog,
			saveBioLog,
			errors,
			formatTime,
			moment,
			goBack,
			form,
			checkTimeoutAM,
			checkTimeinPM,
			employee,
			authid,
			userrole
		}
	}

}
</script>
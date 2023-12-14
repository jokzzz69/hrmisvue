<template>
	<template v-if="hld">
        <LoadingComponentDiv/>
    </template>
    <div class="row">
        <div class="col-md-12 p-title">
            <h2>Generate Communications</h2>
        </div>
    </div>	
    
    		<form @submit.prevent="generateReport" class="row mb-2 pb-2 frmGenCom">
    			<div class="row">
    				<div class="col col-sm-4 col-lg-4">
		    			<div class="form-floating mb-2">
		    				<select class="form-select border-blue" @change="checkValue()" name="dtremployeetype" id="reporttype" v-model="form.reportType">
			                    <option disabled value="">Select Type</option>
			                    <option value="1" >Yearly</option>
			                    <option value="2" >Monthly</option>
			                    <option value="3" >Daily</option>
			                    <option value="4" >Custom</option>                            
			                </select>
			                <label class="form-label" for="reporttype">Employee Type</label>
		    			</div>
		    			<div class="mb-2 date-form-floating" v-if="form.reportType == 1">		    				
		    				<Datepicker :teleport="true" v-model="form.datevalue" class="date-form-floating" id="dateyearly" placeholder="Select Year" :max-date="new Date()" auto-apply year-picker :clearable="false" @update:model-value="handleDate()"></Datepicker>
		    			</div>
		    			<div class="mb-2 date-form-floating" v-else-if="form.reportType == 2">		    				
		    				<Datepicker :teleport="true" v-model="form.datevalue" class="date-form-floating" id="datemonthly" placeholder="Select Month" auto-apply month-picker :clearable="false" :max-date="new Date()" @update:model-value="handleDate()"></Datepicker>
		    			</div>
		    			<div class="mb-2 date-form-floating" v-else-if="form.reportType == 3">		    				
		    				<Datepicker :teleport="true" v-model="form.datevalue" :enable-time-picker="false" class="date-form-floating" id="datecustom" placeholder="Select Date" auto-apply :clearable="false" :max-date="new Date()" @update:model-value="handleDate()"></Datepicker>
		    			</div>
		    			<div class="mb-2 date-form-floating" v-else-if="form.reportType == 4">		    				
		    				<Datepicker :teleport="true" v-model="form.datevalue" :enable-time-picker="false" class="date-form-floating" id="datecustom" placeholder="Select Range" auto-apply range multi-calendars :clearable="false" :max-date="new Date()" @update:model-value="handleDate()"></Datepicker>
		    			</div>

		    			<div class="btnWrapGenCom">
		    				<button class="btn btn-blue" type="submit" :disabled="disabledbutton">Generate Communications</button>
		    			</div>

				   </div>
				</div>
    		</form>
    	

</template>
<script>
	import {onMounted ,ref, computed, inject, reactive} from 'vue';
	import LoadingComponentDiv from '@/components/loader/LoadingComponentDiv.vue';
	import moment from 'moment'
    import { useHead } from '@unhead/vue'
    import { useAuthStore } from '@/stores/store.js'
    import useGenerateCommunications from '@/composables/composables-generatecommunications';


	export default{
		components: {
            LoadingComponentDiv
        },
		setup(){
			useHead({
                title: 'Communications Report | '+import.meta.env.VITE_BFAR_AGENCY
            })
            const {generated,generateCommunication} = useGenerateCommunications();

            const form = reactive({
            	'reportType': '',
            	'datevalue': '',
            });
            const store = useAuthStore();
            const authslug = store.getdetails[1];
			const hld = ref(false);
			const swal = inject('$swal') 
			const disabledbutton = ref(true);

			
			const checkValue = () => {
				form.datevalue = [];

				disabledbutton.value = false;

				if(form.reportType == 1){
					form.datevalue = new Date().getFullYear();
					
				}else if (form.reportType == 2) {
					const month = ref({
					  month: new Date().getMonth(),
					  year: new Date().getFullYear()
					});
					form.datevalue = month;					
				}else if (form.reportType == 3){
					form.datevalue = new Date();				
				}else{
					disabledbutton.value = true;
				}
				
			}
			const handleDate = () => {
				if(form.datevalue == ''){
					disabledbutton.value = true;
				}else{
					disabledbutton.value = false;
				}

				if(form.reportType == 4){
					form.datevalue[0] = moment(new Date(form.datevalue[0])).format('Y-MM-DD');
					form.datevalue[1] = moment(new Date(form.datevalue[1])).format('Y-MM-DD');

				}
			}
			const generateReport = async () => {
				await generateCommunication({...form});

			}
			return {
				hld,
				generateReport,
				form,
				checkValue,
				disabledbutton,
				handleDate
			}
		}
	}


</script>
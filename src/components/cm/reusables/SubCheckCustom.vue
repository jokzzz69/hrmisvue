<template>
	<div class="specificEmployees-wrap">
		<v-select class="sp2wrap" name="mu" multiple placeholder="search . . . " 
                v-model="form.specificemployees" 
                :reduce="employees => employees.id" 
                :options="employees" 
                @update:modelValue="updateSpecificemployees"/>
	</div>

</template>
<script>
	import {ref, reactive, onMounted} from 'vue'

	import useEmployees from '@/composables/composables-employees';
	import 'vue-select/dist/vue-select.css';
	import {useRecipients} from "@/stores/recipients.js"

	export default{


		setup(){
			
			const st_recipients = useRecipients();

			const {employees, getNonUnitHeadsEmployees} = useEmployees()
			const form = reactive({
				'specificemployees': ''
			});
			onMounted(() => {
				getNonUnitHeadsEmployees();
			});
			const updateSpecificemployees = () => {
				st_recipients.setspecificemployees(form.specificemployees);
			}
			return{
				employees,
				form,
				updateSpecificemployees
			}
		}
	}
</script>
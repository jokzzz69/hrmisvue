<template>
	<div class="row">
		<div class="col p-title">
			Dashboard Soon.
		</div>
	</div>
	<div class="row">
		<div class="monitoring activityLogs col col-sm-6">
			<div class="activityLogsWrap">
				<div class="logtitle bg-success text-light fs-4 text-center pt-2 pb-2">Activity Logs</div>
				<div class="logmessage ps-2">
					<template v-if="officerecord.employee">
						{{officerecord.employee.employee_id}} - {{officerecord.employee.employee_fname}} {{officerecord.employee.employee_lname}}  <span class="badge bg-success">Logged in</span>
					</template>
				</div>
			</div>
		</div>
	</div>
	<PrivacyModal/>
</template>

<script>
	import PrivacyModal from '@/components/privacy/PrivacyModal.vue';
	import useOfficerecord from '@/composables/composables-record';
	import {ref} from "vue";
	

	export default{
		 components: {
		 	PrivacyModal
		 },
		 setup(){
		 	const {officerecord, getOfficerecord, } = useOfficerecord()

		 	// Echo.channel(`my-channel`)
		    // .listen('.bfarcarhrmis', (e) => {
		    //     getOfficerecord(e.id);
		    // });


		    return{
		    	officerecord
		    }

		 }

	}
</script>
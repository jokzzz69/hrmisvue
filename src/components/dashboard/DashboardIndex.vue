<template>
	<div class="row">
		<div class="col p-title">
			Dashboard Soon.
		</div>
	</div>
	<div class="row">
		<div class="col">
			{{info}}
		</div>
	</div>
	<PrivacyModal/>
</template>

<script>
	import PrivacyModal from '@/components/privacy/PrivacyModal.vue';
	import useOfficerecord from '@/composables/composables-record';
	import {ref, onMounted} from "vue";
	import { useHead } from '@unhead/vue'
	import useAuthenticate from '@/composables/composables-authenticate';

	export default{
		 components: {
		 	PrivacyModal
		 },
		 setup(){
		 	useHead({
                title: 'Dashboard | BFAR - CAR HRMIS'
            })
            const {info, getinfo} = useAuthenticate()
		 	const {officerecord, getOfficerecord } = useOfficerecord()

		 	// Echo.channel(`my-channel`)
		    // .listen('.bfarcarhrmis', (e) => {
		    //     getOfficerecord(e.id);
		    // });
		 	onMounted(() =>{
		 		getinfo()
		 	})

		    return{
		    	officerecord,
		    	info
		    }

		 }

	}
</script>
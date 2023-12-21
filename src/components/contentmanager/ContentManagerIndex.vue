<template>
	<div class="row">
        <div class="col-md-12 p-title">
            <h2>Debug</h2>
        </div>
    </div>
    
	<CommunicationsDebug/>
</template>

<script>


	import ChangeID from '@/components/contentmanager/ChangeID.vue';
	import CommunicationsDebug from '@/components/contentmanager/CommunicationsDebug.vue';
	import BiometricsDebug from '@/components/contentmanager/BiometricsDebug.vue';
	import { useHead } from '@unhead/vue'

	export default{
		components: {
			ChangeID,
			CommunicationsDebug,
			BiometricsDebug
		},
		setup(){
			useHead({
                title: 'Debugger | '+import.meta.env.VITE_BFAR_AGENCY
            })
			return{
				
			}
		}
	}
</script>
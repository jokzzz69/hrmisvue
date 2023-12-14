<template>
	<template v-if="hld">
        <LoadingComponentDiv/>
    </template>
    <div class="row">
        <div class="col-md-12 p-title">
            <h2>Generate Communications</h2>
        </div>
    </div>	


</template>
<script>
	import {onMounted ,ref, computed, inject, reactive} from 'vue';
	import LoadingComponentDiv from '@/components/loader/LoadingComponentDiv.vue';
	import moment from 'moment'
    import { useHead } from '@unhead/vue'
    import { useAuthStore } from '@/stores/store.js'

	export default{
		components: {
            LoadingComponentDiv
        },
		setup(){
			useHead({
                title: 'Communications Report | '+import.meta.env.VITE_BFAR_AGENCY
            })
            const store = useAuthStore();
            const authslug = store.getdetails[1];
			const hld = ref(false);
			const swal = inject('$swal') 
			
			return {
				hld
			}
		}
	}


</script>
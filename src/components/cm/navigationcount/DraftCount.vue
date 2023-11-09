<template>
	<template v-if="drafttotal">
		<template v-if="drafttotal > 0">
			<span id="w--draftcount">
				{{drafttotal}}
			</span>			
		</template>
	</template>
</template>
<script>
	import useNotifications from '@/composables/composables-notifications';
	import {ref, onMounted,watch} from 'vue'
	import useEventsBus from '@/components/helper/Eventbus';
	import useCommunicationsDraft from '@/composables/composables-communicationsdraft';
	
	export default{
		setup(){

			const {getUserDraftCount, draftcount} = useCommunicationsDraft();

			const {bus}=useEventsBus()
			const reload = ref(false);

			const drafttotal = ref();

			watch(()=>bus.value.get('reload'), (val) => {
                [reload.value] = val ?? []

                if(reload){
                	loaddraft();
                }
            })
            const loaddraft = () =>{
            	getUserDraftCount().then(() => {
					drafttotal.value = draftcount.value.totaluserdraft;
				});
            }
			onMounted(() =>{
				loaddraft();
			})
			return {
				drafttotal

			}

		}
	}
</script>
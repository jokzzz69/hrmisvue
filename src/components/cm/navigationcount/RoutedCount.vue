<template>
	<template v-if="newTotal">
		<template v-if="newTotal > 0">
			<span id="w--routed">
				{{newTotal}}
			</span>			
		</template>
	</template>
</template>
<script>
	import useNotifications from '@/composables/composables-notifications';
	import {ref, onMounted,watch} from 'vue'
	import {useNotificationStore} from '@/stores/notificationstore.js'

	export default{
		setup(){
			const hasnotification = ref(false);
			const {getUnread, totalunread} = useNotifications()

			const newTotal = ref();
			const reload = ref(false);
			const notificationstore = useNotificationStore()



            notificationstore.$subscribe((m,s) => {
				newTotal.value = notificationstore.getnrc.__rc;
			})

			onMounted(() =>{
				notificationstore.fetchNotification();
				newTotal.value = notificationstore.getnrc.__rc;
			})

			
			return {
				newTotal

			}

		}
	}
</script>
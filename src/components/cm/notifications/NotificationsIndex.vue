<template>
	<div class="row">
		<div class="col mt-3">
			<h2>Notifications</h2>
		</div>
	</div>
	
</template>
<script>
	import useNotifications from '@/composables/composables-notifications';
	export default {
		setup(){
			const {notifications, getAllMyNotifications} = useNotifications()
			return{

			}
		}
	}
</script>
<template>	
	  <a id="drpnotifs" @click.prevent="viewunviewed" class="nav-link dropdown-toggle pb-0 pt-1" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
	      <small id="notificationCount" v-if="totalunviewed > 0">{{totalunviewed}}</small>
	      <i class="fa-regular fa-bell"></i>
	  </a>
	  <ul class="dropdown-menu notifications dropdown-menu-lg-end" role="menu" aria-labelledby="dLabel">
	    <div class="notification-header">
	      <h4 class="notification-title">Notifications</h4>
	    </div>
	   <div class="notifications-body px-2 py-2">

	   	<template v-if="hasnotification">
	   		<template v-for="notification in notifications" :key="notification.id"> 			
	   			<div class="notification-content" @click.prevent="clicknotification(notification.data.id,notification.type)" :class="notification.read_at ? 'is_read' : ''">    
			       <div class="notification-item py-2 ps-2 pe-4">
			        <span>
			        	<template v-if="gettype(notification.type) == 'atcommcreator' || gettype(notification.type) == 'atcommreceivers'">
		        			<strong>{{notification.data.disseminator}}</strong>     	
				        	has taken action to 
				        	<strong>{{notification.data.documenttype}}
				        		<template v-if="notification.data.subject">
				        			- {{notification.data.subject}}
				        		</template>		        	 
				        	</strong> 
			        	</template>
			        	<template v-else>
			        		<template v-if="notification.data.total > 1">
				        		<template v-if="notification.data.disseminatorid == authid">
				        			<strong>You </strong>
				        			<template v-if="gettype(notification.type) == 'communicationresend'">
				        				updated and sent
				        			</template>
				        			<template v-else>
				        				sent
				        			</template>	
				        			 to yourself
				        		</template>
				        		<template v-else>
				        			<strong>{{notification.data.disseminator}}</strong> 
				        			<template v-if="gettype(notification.type) == 'communicationresend'">
				        				updated and sent
				        			</template>
				        			<template v-else>
				        				sent
				        			</template>		        			
				        		</template>
				        		
					        	<strong>{{notification.data.documenttype}}
					        		<template v-if="notification.data.subject">
					        			- {{notification.data.subject}}
					        		</template>
					        	</strong>


					        	<template v-if="notification.data.disseminatorid != authid">
				        			 to <strong>you </strong>
				        		</template>
					        	and <strong>{{notification.data.total - 1}} Concerned Personnel </strong>
				        	</template>
				        	<template v-else>
				        			<!-- {{authid}} -->
				        		<template v-if="notification.data.disseminatorid == authid">
				        			<strong>You </strong>
				        			<template v-if="gettype(notification.type) == 'communicationresend'">
				        				updated and sent
				        			</template>
				        			<template v-else>
				        				sent
				        			</template>	
				        			 to yourself
				        			<strong>{{notification.data.documenttype}}
						        		<template v-if="notification.data.subject">
						        			- {{notification.data.subject}}
						        		</template>		        	 
						        	</strong> 
				        		</template>
				        		<template v-else>
				        			<strong>{{notification.data.disseminator}}</strong>     	
						        	<template v-if="gettype(notification.type) == 'communicationresend'">
				        				updated and sent
				        			</template>
				        			<template v-else>
				        				sent
				        			</template>	

						        	 you
						        	<strong>{{notification.data.documenttype}}
						        		<template v-if="notification.data.subject">
						        			- {{notification.data.subject}}
						        		</template>		        	 
						        	</strong> 
				        		</template>			        		
				        	</template>
			        	</template>


			        </span>
			        <span class="notificationdate"><i class="fa-regular fa-clock"></i> {{formatnotifdate(notification.created_at)}}</span>
			        <template v-if="notification.communicationstatus">		
			        	<span class="notification-status new" v-if="!notification.communicationstatus.read_at"></span>
			        </template>
			        
			      </div>       
			    </div>



	   		</template>
	   		
	   	</template>
	   	<template v-else>
	   		<div class="text-center">
	   			No Notification
	   		</div>
	   	</template>        
	   </div>
	    <div class="notification-footer text-center" v-if="hasnotification">
	      <router-link :to="{name: 'notifications.index'}" cl>View all notifications</router-link>
	    </div>
	  </ul>
	
</template>
<script>
	import {ref, onMounted,computed, watch} from 'vue'
	import useNotifications from '@/composables/composables-notifications';
	import {formatnotifdate} from '@/helper/formatnotifdate';
	import {useRouter} from 'vue-router'

	
	import nProgress from "nprogress";
	import {useAuthStore} from "@/stores/store.js";
	import {useNotificationStore} from '@/stores/notificationstore.js';
	import Pusher from 'pusher-js'


	export default {
		
		setup(){
			const hasnotification = ref(false);
			const router = useRouter()

			const totals = ref();
			const store = useAuthStore()
			const notificationstore = useNotificationStore()


			const authid = store.details[0];

			const {getLimitedNotifications, notifications, getUnviewed,totalunviewed, updateUnviewed, totalunread} = useNotifications()


			notificationstore.$subscribe((m,s) => {	

				loadNotif()

			})


			const loadNotif = async() => {
				getLimitedNotifications().then(res => {
					if(notifications.value.length > 0){
						hasnotification.value = true;
					}
				}),
				getUnviewed()
				
			}
			onMounted(() => {	
				loadNotif()
			})


			window.Echo.private('cmsCH')
			.listen('.incommingcommunications', (e) =>{
				loadNotif(),
				notificationstore.fetchNotification()
			})
			.listen('.cmdtsactionstaken', (e) =>{

				loadNotif(),
				notificationstore.fetchNotification()
				
			});

            const viewunviewed = async() =>{           	
            	const btnmenu = document.getElementById('drpnotifs');
        		if(btnmenu.classList.contains('show')){
            		await updateUnviewed();
        		}     
            }
			const clicknotification = (id, type) =>{
				if(gettype(type) == 'atcommcreator'){
					router.push({name: 'communications-routed.show', params: { id: id }});
				}else{
					router.push({name: 'communications.show', params: { id: id }});
				}
				//atcommcreator

				
			}
			const gettype = (type) => {
				const arrtype = type.split("\\");
				return arrtype[2].toLowerCase();
			}
			return{
				clicknotification,
				hasnotification,
				notifications,
				formatnotifdate,
				viewunviewed,
				totalunviewed,
				authid,
				gettype
			}
		}
	}
</script>
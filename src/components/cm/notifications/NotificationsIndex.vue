<template>
	<div class="container notificationContainer">
		<div class="row">
			<div class="col mt-3">
				<h2>Notifications</h2>
			</div>
		</div>
		<div class="row">
			<div class="col-12 pb-2">
				<template v-if="!contentLoader">
					
				
					<template v-for="notification in notifications" :key="notification.id">

						<div class="pNotifWrap" @click.prevent="clicknotification(notification.data.id,notification.type)">
							<div class="pNotif--avatar">
								<template v-if="notification.data">
									<img :src="getimageurl(notification.data.disseminator)">
								</template>
							</div>
							<div class="pNotif--message">
								<div class="pNotif--message--content">
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
								</div>
								<div class="pNotif--message--date">
									<span>
										<i class="fa-regular fa-clock"></i> {{formatnotifdate(notification.created_at)}}
									</span>
								</div>
							</div>
						</div>
					</template>
					<template v-if="!noMorePage">
						<div class="psSticky">
							<LoadingComponent/>
						</div>               
				    </template>
				</template>
				<template v-else>
					<div class="psSticky">
						<LoadingComponent/>
					</div>
				</template>
			</div>
		</div>
	</div>
	
</template>
<script>
	import useNotifications from '@/composables/composables-notifications';
	import {useAuthStore} from "@/stores/store.js";
	import {ref, onMounted, defineAsyncComponent} from 'vue'
	import {formatnotifdate} from '@/helper/formatnotifdate';
	import {useRouter} from 'vue-router'

	const LoadingComponent = defineAsyncComponent(() => 
        import('@/components/loader/LoadingComponent.vue')
    );

	export default {
		components: {
			LoadingComponent
		},
		setup(){
			const {notifications, getMyMainPageNotification,notificationsMeta, getMyPageNotifications, pagenotifications} = useNotifications()
			const currentPage = ref(null);
			const lastPage = ref(null);
			const store = useAuthStore()
			const authid = store.details[0];
			const router = useRouter()

			const contentLoader = ref(true);
			const noMorePage = ref(true);


			const gettype = (type) => {
				const arrtype = type.split("\\");
				return arrtype[2].toLowerCase();
			}
			const getimageurl = (name) =>{
				return 'https://ui-avatars.com/api/?name='+name+'&background=random&size=40';
			}
			const clicknotification = (id, type) =>{
				if(gettype(type) == 'atcommcreator'){
					router.push({name: 'communications-routed.show', params: { id: id }});
				}else{
					router.push({name: 'communications.show', params: { id: id }});
				}			
			}

			var bodyVal = document.getElementsByTagName("BODY")[0];

			const handlescroll = () =>{               
                const cf = {
	                headers: {
	                    'xlr': 1
	                }
	            }
                window.onscroll = () => {
                    let bottomOfWindow = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight === document.documentElement.offsetHeight

                    if (bottomOfWindow) {
                        
                        if(currentPage.value){
	            			currentPage.value+1;            			
	            			if(currentPage.value <= lastPage.value){
		            			currentPage.value++;
		            			noMorePage.value = false;
		            			getMyPageNotifications(currentPage.value,cf).then(() => {	          				
		            				notifications.value.push(...pagenotifications.value);
		            				noMorePage.value = true;
		            			});
		            		}
	            		}

                    }
                }
            }

			onMounted(() => {
				getMyMainPageNotification().then(() =>{
					currentPage.value = notificationsMeta.value.current_page;
					lastPage.value = notificationsMeta.value.last_page;

					contentLoader.value = false;
				})
				handlescroll();
			})

			return{
				notifications,
				gettype,
				authid,
				getimageurl,
				formatnotifdate,
				clicknotification,
				contentLoader,
				noMorePage
			}
		}
	}
</script>
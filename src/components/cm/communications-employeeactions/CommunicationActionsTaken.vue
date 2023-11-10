<template>
	<div class="row">
		<div class="col card--title border-dashed pb-1">
			<strong>Actions Taken</strong>
		</div>
	</div>
	<div class="row">
		<template v-if="actionstaken.length">
			<template v-for="(actiontaken,i) in actionstaken" :key="actiontaken.id">
				<div class="action__taken col">
					<div class="action--taken--employeeprofile">
						<template v-if="actiontaken.actioncreator">
							<img :src="getimageurl(actiontaken.actioncreator.employee_fname,actiontaken.actioncreator.employee_lname)">
						</template>
					</div>
					<div class="action--taken--employeedetails">
						<div class="action--taken--employee">
							<template v-if="actiontaken.actioncreator">
								{{actiontaken.actioncreator.cname}}
							</template>
						</div>
						<div class="action--taken--message" :id="actiontaken.id" v-html="actiontaken.message" :class="{actiontakenMessage: i === activeItem}" :contenteditable="i === activeItem ? true : false">
						</div>
						<div class="action--taken--controls">

							<ul class="list-inline mb-0">

								<template v-if="i === activeItem">
									<li class="list-inline-item me mt-2">
										<button class="btn btn-secondary" @click.prevent="cancelat(actiontaken.id)">Cancel</button>
									</li>
									<li class="list-inline-item me-0 mt-2">
										<button class="btn btn-primary" @click.prevent="saveat(actiontaken.id)">Save</button>
									</li>
								</template>
								<template v-else>
									<li class="list-inline-item me-0">
										<button class="btn btn-removeAT" title="Edit" @click.prevent="editmyactiontaken(i, actiontaken.id)" v-if="userid == actiontaken.createdby">
											<i class="fa-regular fa-pen-to-square"></i>
										</button>
									</li>
									<li class="list-inline-item">
										<button class="btn btn-removeAT" title="Delete" @click.prevent="removemyactiontaken(actiontaken.id)" v-if="userid == actiontaken.createdby">
											<i class="fa-solid fa-trash-can"></i>
										</button>
									</li>
								</template>						


							</ul>

						</div>
						<div class="action--taken--attachments">
						<template v-if="actiontaken.attachments">
				            <template v-if="actiontaken.attachments.length > 0">
				                <AttachmentPreview :files="actiontaken.attachments"/>
				            </template>
				        </template>
					</div>
					</div>

					
				</div>

			</template>
		</template>
		<template v-else>
			<template v-if="!noData">
				<div class="col pr">
					<LoadingComponentDiv/>
				</div>               
            </template>
		</template>
		<template v-if="noData">
			<div class="col">
				No Employee Actions
			</div>
		</template>
	</div>
</template>
<script>	
	import {ref, onMounted, inject, watch, reactive} from 'vue'
	import useActionsTaken from '@/composables/composables-actionstaken'
	import LoadingComponentDiv from '@/components/loader/LoadingComponentDiv.vue';
	import {useAuthStore} from '@/stores/store'
	import useEventsBus from '@/components/helper/Eventbus';
	import Pusher from 'pusher-js'
	import Echo from 'laravel-echo'
	import axios from 'axios';
	import {useNotificationStore} from '@/stores/notificationstore.js';
	import AttachmentPreview from '@/components/cm/reusables/AttachmentPreview.vue';

	export default{
		components: {
			LoadingComponentDiv,
			AttachmentPreview
		},
		props: {
			id : {
				required: true,
				type: String
			}			
		},
		setup(props){
			const noData = ref(false)
			const {actionstaken,getActionTaken,destroyActionTaken, updateCommunicationActionTaken} = useActionsTaken()
			const profileimageurl = ref();
			const swal = inject('$swal')
			const userdetails = useAuthStore();
			const {bus}=useEventsBus()			
			const userid = userdetails.getdetails[0];

			const activeItem = ref();
			const notificationstore = useNotificationStore();

			const form = reactive({
				'defaultmessage': '',
				'newmessage': ''
			});
			const getimageurl = (fname,lname) =>{
				return 'https://ui-avatars.com/api/?name='+fname+'+'+lname+'&background=random&size=40';
			}
			const checkifdata = async() =>{
				if(actionstaken.value.length > 0){
                    noData.value = false;
                }else{
                    noData.value = true;
                }
			}
			const removemyactiontaken = async (id) =>{
                
                let x = 0; //trigger

                await swal.fire({
                  title: 'Are you sure?',
                  text: "You won't be able to revert this!",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#506fd9',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                  if (result.isConfirmed) {         
                    x = 1;
                  }
                })
                if (x > 0) {

                    await destroyActionTaken(id);
                    await getActionTaken(props.id).then(() => {
                        swal.fire({
                            toast: true,
                            position: 'top-end',
                            title: 'Action Taken Successfully Deleted',
                            showConfirmButton: false,            
                            icon: 'success',
                            width: '300',
                            padding: '.5em 1em',
                            timerProgressBar: true,
                            timer:1500,
                            customClass: {
                                container: 'swaltopright-del'
                            }
                        })

                        checkifdata()
                    })
                }
                
            }
            const editmyactiontaken = (i, id) =>{
            	form.defaultmessage = '';
            	form.defaultmessage = document.getElementById(id).innerHTML;            	
            	return activeItem.value = i;
            }
            const cancelat = (id) =>{
            	document.getElementById(id).innerHTML = form.defaultmessage;
            	activeItem.value = null;
            }


            notificationstore.$subscribe((m,s) => {
                if(notificationstore.getnrc.__rc > 0){
                    reloadActionsTakenList();
                }
            })




            watch(()=>bus.value.get('cancelallat'), (val) => {
                if(val ?? [] > 0){
                	activeItem.value = null;
					form.newmessage = '';
					form.defaultmessage = '';
                }
            })
            const reloadActionsTakenList = async() =>{
            	getActionTaken(props.id).then(() =>{
					checkifdata()
				});
            }
			onMounted(() =>{
				
				reloadActionsTakenList();

			})			

			window.Echo.private(`cmsCH`)
			.listen('.cmdtsactionstaken', (e) =>{
				reloadActionsTakenList();
			});

			const saveat = async(id) => {
				form.newmessage = document.getElementById(id).innerHTML; 
				await updateCommunicationActionTaken(id,{...form}).then(() =>{
					activeItem.value = null;
					form.newmessage = '';
					form.defaultmessage = '';
				});
			}
			return{
				actionstaken,
				profileimageurl,
				getimageurl,
				noData,
				removemyactiontaken,
				userid,
				editmyactiontaken,
				activeItem,
				cancelat,
				saveat
			}
		}
	}
</script>
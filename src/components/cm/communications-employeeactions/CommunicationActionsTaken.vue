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
							<span class="sp-dateSent">
								{{moment(actiontaken.updated_at).format('llll')}}
							</span>
						</div>
						<div class="action--taken--message" :id="actiontaken.id" v-html="actiontaken.message" :class="{actiontakenMessage: i === activeItem}" :contenteditable="i === activeItem ? true : false">
						</div>
						<div class="comm--AT--attachments" v-if="i === activeItem" :id="actiontaken.id">
		                    <AttachFileCommunication :attachments="bid" @getUploadedFile="updateUploaded"/>
		                </div>

						<div class="action--taken--controls">

							<ul class="list-inline mb-0">

								<template v-if="i === activeItem">
									
									<li class="list-inline-item me mt-2">
										<button class="btn btn-secondary" @click.prevent="cancelat(actiontaken.id)">Cancel</button>
									</li>
									<li class="list-inline-item me mt-2">
										<div class="comm--AT--attachments">
											<label for="AT-toattach" class="AT-EditUpload btn btn-semiblue" title="Attach Files"><i class="fa-solid fa-paperclip"></i> <span>Attach</span></label>
                            				<input type="file" name="drpfiles" id="AT-toattach" class="AT-toattach" multiple @change="atselectedfiles"/>
			
					                    </div>
									</li>
									<li class="list-inline-item me-0 mt-2">
										<button class="btn btn-save" @click.prevent="saveat(actiontaken.id)">Save</button>
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
						<div class="action--taken--attachments" v-if="selectedEditAT != actiontaken.id">
							<template v-if="actiontaken.attachments">
					            <template v-if="actiontaken.attachments.length > 0">
					                <AttachmentPreview :files="actiontaken.attachments"/>
					            </template>
					        </template>
						</div>
					</div>
					
				</div>

			</template>
			<template v-if="!noMorePage">
				<div class="col pr">
					<LoadingComponentAC/>
				</div>               
		    </template>
		</template>
		

		<template v-else>
			<template v-if="!noData">
				<div class="col pr">
					<LoadingComponentAC/>
				</div>               
            </template>
		</template>
		<template v-if="noData">
			<div class="col pr mh-75">
				No Employee Actions
			</div>
		</template>
	</div>
</template>
<script>	
	import {ref, onMounted, inject, watch, reactive,defineAsyncComponent} from 'vue'
	import useActionsTaken from '@/composables/composables-actionstaken'

	import {useAuthStore} from '@/stores/store'
	import useEventsBus from '@/components/helper/Eventbus';
	import Pusher from 'pusher-js'
	import Echo from 'laravel-echo'
	import axios from 'axios';
	import {useNotificationStore} from '@/stores/notificationstore.js';

	import moment from 'moment';
	import AttachFileCommunication from '@/components/cm/reusables/AttachFileCommunication.vue';


	const AttachmentPreview = defineAsyncComponent(() => 
        import('@/components/cm/reusables/AttachmentPreview.vue')
    );
    const LoadingComponentAC = defineAsyncComponent(() => 
        import('@/components/loader/LoadingComponentAC.vue')
    );

	export default{
		components: {
			LoadingComponentAC,
			AttachmentPreview,
			AttachFileCommunication
		},
		props: {
			id : {
				required: true,
				type: String
			}			
		},
		setup(props){
			const bid = ref([]);
			const noData = ref(false)
			const noMorePage = ref(true)
			const currentPage = ref(null);
			const lastPage = ref(0);
			const {actionstaken,getActionTaken,commactionstakenFromPage,getCommActionTakenPage,destroyActionTaken, updateCommunicationActionTaken, editActionTaken, actiontaken, actiontakenMeta} = useActionsTaken()
			const profileimageurl = ref();
			const swal = inject('$swal')
			const userdetails = useAuthStore();
			const {bus,emit}=useEventsBus()			
			const userid = userdetails.getdetails[0];

			const activeItem = ref();
			const notificationstore = useNotificationStore();
			const selectedEditAT = ref(null);

			const form = reactive({
				'defaultmessage': '',
				'newmessage': '',
				'uploadedfileids': []
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
			const config = {
				headers: {
					xlr: 1
				}
			}		

            notificationstore.$subscribe((m,s) => {
                if(notificationstore.getnrc.__rc > 0){
                    reloadActionsTakenList();
                }
            })
            window.Echo.private(`cmsCH`)
			.listen('.cmdtsactionstaken', (e) =>{
				reloadActionsTakenList();
			});
            watch(()=>bus.value.get('cancelallat'), (val) => {
                if(val ?? [] > 0){
                	selectedEditAT.value = null;
                	activeItem.value = null;
					form.newmessage = '';
					form.defaultmessage = '';
					form.uploadedfileids = [];
                }
            })
            const reloadActionsTakenList = async() =>{
            	const cf = {
	                headers: {
	                    'xlr': 1
	                }
	            }
            	getActionTaken(props.id,cf).then(() =>{
					checkifdata()
					currentPage.value = actiontakenMeta.value.current_page;
					lastPage.value = actiontakenMeta.value.last_page
				});
            }

               
            var div = document.getElementById('ccw');

            div.addEventListener('scroll', (e) => {

            	const cf = {
	                headers: {
	                    'xlr': 1
	                }
	            }


            	if(Math.max(div.scrollTop + div.clientHeight) == div.scrollHeight){
            		if(currentPage.value){
            			currentPage.value+1;            			
            			if(currentPage.value <= lastPage.value){
	            			currentPage.value++;
	            			noMorePage.value = false;
	            			getCommActionTakenPage(props.id,currentPage.value,cf).then(() => {	            				
	            				actionstaken.value.push(...commactionstakenFromPage.value);
	            				noMorePage.value = true;
	            			});
	            		}
            		}
            		
            	}
            })
            


			onMounted(() =>{
				
				reloadActionsTakenList();

			})			

			
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
                    await getActionTaken(props.id,config).then(() => {
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
			const cancelat = (id) =>{
            	selectedEditAT.value = null;
            	bid.value = null;
            	document.getElementById(id).innerHTML = form.defaultmessage;
            	activeItem.value = null;
            }
			const saveat = async(id) => {
				form.newmessage = document.getElementById(id).innerHTML; 
				await updateCommunicationActionTaken(id,{...form}).then(() =>{

					reloadActionsTakenList();

					form.newmessage = '';
					form.defaultmessage = '';
					form.uploadedfileids = [];

					

					activeItem.value = null;
					selectedEditAT.value = null;
            		bid.value = null;
				});
			}


			const updateUploaded = (attachids) =>{
                form.uploadedfileids = [];
                for(const attachid in attachids){
                    form.uploadedfileids.push(attachids[attachid]);
                }
            }
            

            const editmyactiontaken = (i, id) =>{
            	selectedEditAT.value = id;
            	emit('actionbox',false);

            	bid.value = [];
            	form.defaultmessage = '';
            	form.defaultmessage = document.getElementById(id).innerHTML;

            	editActionTaken(id).then(() => {
            		for (var i of actiontaken.value.attachments) {
                        const fileSize = (i.filesize < 1024) ? i.filesize +' KB' : (i.filesize / (1024*1024)).toFixed(2)+' MB';
                        bid.value.push({id: i.id,name: i.filename, size: fileSize,fileextension: i.fileextension, filepath: i.filepath});
                    }
            		emit('rprops',false);
            	})
            	return activeItem.value = i;
            }
            const atselectedfiles = async() => {     
                bid.value = document.querySelector('.AT-toattach').files;
                emit('rprops',true);
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
				saveat,
				moment,
				bid,
				updateUploaded,
				atselectedfiles,
				selectedEditAT,
				noMorePage
				
			}
		}
	}
</script>
<template>
	<div class="row">	
		<div class="col col-sm-4 attachedfiles">
            <div class="fileATUploadedWrap" v-if="attachfiledetails.attachedfiles.length > 0">
                <section class="loading-area" v-if="showProgress">
                    <div class="fileuprow fileuprow-communications" v-for="(file,index) in attachfiledetails.attachedfiles">
                        <div class="content">
                            <div class="details">
              
                                    <div class="atfileName">
                                        <span class="name">{{checkName(file.name)}} 
                                            <template v-if="attachfiledetails.files[index]">
                                                <template v-if="attachfiledetails.files[index].loading == 100">
                                                    <span>({{attachfiledetails.files[index].size}})</span>
                                                </template>
                                            </template>
                                        </span>
                                    </div>
                                    <div class="atfileDetails">
                                        <template v-if="attachfiledetails.files[index]">
                                            <template v-if="attachfiledetails.files[index].loading < 100">
                                                <div class="loading-bar">
                                                    <div class="loading" :style="{width: attachfiledetails.files[index].loading +'%'}"></div>
                                                </div>
                                            </template>                          
                                        </template>
                                        <template v-else>
                                            <div class="loading-bar">
                                                <div class="loading" style="width:0%"></div>
                                            </div>
                                        </template> 
                                    </div>

                                    <div class="atfileLoader">
                                        <template v-if="attachfiledetails.files[index]">
                                            <template v-if="attachfiledetails.files[index].loading < 100">
                                                <span class="percent" >{{attachfiledetails.files[index].loading+'%'}}</span>
                                            </template>
                                            <template v-else>
                                                <span class="remove"><button class="p-0" title="Remove" :disabled="disabledbutton" @click.prevent="removeAttached(index)"><i class="fa-regular fa-circle-xmark"></i></button></span>
                                            </template>
                                        </template>
                                        <template v-else>                     
                                                <span class="percent" >0%</span>
                                        </template>
                                    </div>






                                
                                



                            </div>

                                                      
                        </div>
                    </div>
                </section>
            </div>                
        </div>
        
    </div>
</template>
<script>
	import { reactive,inject, ref, onMounted, watch} from "vue";
	import useManageFile from '@/composables/composables-managefile';
    import useEventsBus from '@/components/helper/Eventbus';

	export default{
		props: {
			attachments: {
				type: Object,
				default() {

				}
			}
		},
		setup(props,{emit}){

            const {bus} = useEventsBus();

			const disabledbutton = ref(false);
			const showProgress = ref(true);
			const active = ref(false);

			const attachfiledetails = reactive({
                'uploadedfileid': [],
                'attachedfiles': [],
                'attachfromprops': [],
                'files': []

			});
			const {uploadTempAttachment, attachedtemp} = useManageFile()
            const allowedExtensions = /(\.doc|\.docx|\.pdf|\.tex|\.txt|\.xlsx|\.csv|\.png|\.jpg|\.jpeg|\.tiff|\.tif|\.pptx|\.pptm|\.ppt)$/i;
            const loaderkey = ref(null);

            const uploadConfig = {
            	headers: {
            		'xlr': 1
            	},       
                onUploadProgress: ({loaded, total}) => {
                    attachfiledetails.files[loaderkey.value].loading = Math.floor((loaded / total) * 100);
                    if(loaded == total){
                        const fileSize = (total < 1024) ? total +' KB' : (loaded / (1024*1024)).toFixed(2)+' MB';
                        attachfiledetails.files[loaderkey.value].size = fileSize;
                        showProgress.value = true;                                   
                    }                                             
                }
            }



            const upLoadFile = async(files) =>{
                for (var x = 0; x < files.length; x++) {           
                    if(!attachfiledetails.files[x]){
                        const formData = new FormData();
                        formData.append('file[]', files[x]);
                        loaderkey.value = x;
                        attachfiledetails.files.push({name: files[x].name, loading: 0 ,size: 0});
                        await uploadTempAttachment(formData,uploadConfig).then(res => {

                            attachfiledetails.uploadedfileid.push(attachedtemp.value.id);
                            emit('getUploadedFile',attachfiledetails.uploadedfileid);
                            
                        })
                    }                 
                }

            }

            const removeAttached = async(index) => {
                attachfiledetails.uploadedfileid.splice(index,1);
                attachfiledetails.attachedfiles.splice(index,1);
                attachfiledetails.files.splice(index,1);
                emit('getUploadedFile',attachfiledetails.uploadedfileid);
            }
            const recheckprops = ref(false);


            const checkName = (name) =>{

                var filext = name.split('.').pop();

                if(name.length > 20){
                    return name.substring(0,20)+'...'+filext;
                    
                }else{
                    return name;
                }
                
            }

            watch(()=>bus.value.get('rprops'), (val) => {
                [recheckprops.value] = val ?? [] 
                


        

                if(props.attachments){
                    for (var i = 0; i < props.attachments.length; i++) {      
                        attachfiledetails.attachedfiles.push(props.attachments[i]);
                    }
                   upLoadFile(attachfiledetails.attachedfiles)
                
               }
            })

            return{
            	removeAttached,
            	active,
            	attachfiledetails,
            	showProgress,
            	attachfiledetails,
            	props,
            	disabledbutton,
                checkName

            }
		}
	}
</script>
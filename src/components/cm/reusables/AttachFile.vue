<template>
	<div class="row" :class="props.err ? 'file-attach-invalid' : ''">
	
		<div class="col col-sm-12 attachedfiles">
            <div class="border p-2 fileUploadedWrap" v-if="attachfiledetails.attachedfiles.length > 0">


                <section class="loading-area" v-if="showProgress">

                    <div class="fileuprow" v-for="(file,index) in attachfiledetails.attachedfiles">

                        <i :class="getfiletype(file.name.split('.').pop())"></i>
                        <div class="content">
                            <div class="details">
                                <span class="name">{{file.name}}</span>

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

                            <template v-if="attachfiledetails.files[index]">
                            	<template v-if="attachfiledetails.files[index].loading < 100">
	                            	<div class="loading-bar">
	                            		<div class="loading" :style="{width: attachfiledetails.files[index].loading +'%'}"></div>
		                            </div>
	                            </template>
	                            <template v-else>
	                            	<div class="uploadeddetails">
	                        			{{attachfiledetails.files[index].size}}
	                            	</div>
	                            </template>
                            </template>

                            <template v-else>
                            	<div class="loading-bar">
                            		<div class="loading" style="width:0%"></div>
	                            </div>
                            </template>
                            
                            
                        </div>
                    </div>
                </section>

            </div>                
        </div>

        <div class="col col-sm-12">
            <div class="mt-4 mainLabel">
                <h6>Attach Files: <span class="text-danger">*</span></h6>
            </div>
            <span v-if="props.err" class="text-danger m-error">{{props.err}}</span>
            <div class="drgDrp" @dragenter.prevent="toggleDrgdrpActive" @dragleave.prevent="toggleDrgdrpActive" @dragover.prevent @drop.prevent="drop" :class="{'active-drgdrp': active}">
                <span class="icon fs-2"><i class="fa-solid fa-cloud-arrow-up"></i></span>
                <span>Drag & Drop</span>
                <span>OR</span>
                <label for="drgDRpFile">Select Files</label>
                <input type="file" name="drpfiles" id="drgDRpFile" class="drgDRpFile" multiple @change="selectedFile"/>
            </div>
            <div id="emailHelp" class="form-text"><i>Supports: PDF, Word, Excel and Images</i></div>
        </div>
        
    </div>
</template>
<script>
	import { reactive,inject, ref, onMounted, watch} from "vue";
	import useManageFile from '@/composables/composables-managefile';

	export default{
		props: {
			attachments: {
				type: Object,
				default() {

				}
			},
			err: {
				required: true,
				type: String
			}
		},
		setup(props,{emit}){


			const disabledbutton = ref(false);
			const showProgress = ref(true);
			const active = ref(false);

			const attachfiledetails = reactive({
                'uploadedfileid': [],
                'attachedfiles': [],
                'files': []

			});
			const {uploadTempAttachment, attachedtemp} = useManageFile()



			const selectedFile = async() => {

               const tempSelected = document.querySelector('.drgDRpFile').files;

               if(tempSelected){
                    for (var file of tempSelected) {
                        if(allowedExtensions.exec(file.name)){
                            attachfiledetails.attachedfiles.push(file);
                        }
                    }
                    upLoadFile(attachfiledetails.attachedfiles)
               }              
            }

            const allowedExtensions = /(\.doc|\.docx|\.pdf|\.tex|\.txt|\.xlsx|\.csv|\.png|\.jpg|\.jpeg|\.tiff|\.tif|\.pptx|\.pptm|\.ppt)$/i;

            const drop = (e) => {
                active.value = !active.value;       
                if(e.dataTransfer.files){ 
                    for (var file of e.dataTransfer.files) {
                        if(allowedExtensions.exec(file.name)){
                            attachfiledetails.attachedfiles.push(file);
                        }
                    }

                    upLoadFile(attachfiledetails.attachedfiles)

                }
            }           
            const toggleDrgdrpActive = async () =>{
                active.value = !active.value;
            }

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
            	disabledbutton.value = true;
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
                disabledbutton.value = false;
            }

            const removeAttached = async(index) => {
                attachfiledetails.uploadedfileid.splice(index,1);
                attachfiledetails.attachedfiles.splice(index,1);
                attachfiledetails.files.splice(index,1);
                emit('getUploadedFile',attachfiledetails.uploadedfileid);
            }
            const getfiletype = (type) =>{
            	if(type == 'pdf'){
            		return 'fa-solid fa-file-pdf text-danger';
            	}else if(type == 'jpg' || type == 'jpeg'  || type == 'jpeg' || type == 'tiff' || type == 'png' || type == 'tif'){
            		return 'fa-solid fa-file-image text-primary';
            	}else if(type == 'doc' || type == 'docx'){
            		return 'fa-regular fa-file-word text-primary';
            	}else if(type == 'xlsx' || type == 'xlsm'){
            		return 'fa-solid fa-file-excel text-success';
            	}else if(type == 'ppt' || type == 'pptx'){
            		return 'fa-solid fa-file-powerpoint text-danger';
            	}else{
            		return 'fa-solid fa-file-lines';
            	}
           }

           watch(props.attachments, () => {
           		for (var i = 0; i < props.attachments.length; i++) {
           			attachfiledetails.uploadedfileid.push(props.attachments[i].id);
       				attachfiledetails.attachedfiles.push({name: props.attachments[i].name});
       				attachfiledetails.files.push({name: props.attachments[i].name, size: props.attachments[i].size, loading: 100});

           		}
           })

 
          
       		


            return{
            	selectedFile,
            	drop,
            	toggleDrgdrpActive,
            	removeAttached,
            	active,
            	attachfiledetails,
            	showProgress,
            	attachfiledetails,
            	props,
            	getfiletype,
            	disabledbutton

            }
		}
	}
</script>
<template>
		<div class="modal-mask" id="mm" @keyup.esc="$emit('close')" @click="$emit('close')" tabindex="0">
			<div class="modal-wrapper" :class="isImage ? 'text-center': ''">
				<div class="imagedetails d-flex pt-2 pb-2" v-if="isImage" @click.prevent.stop>
					<div class="col mt-2 text-end">
						<span>{{filedata.filename}}</span>
					</div>
			       	<div class="col ms-3 text-start">
			       		<ul class="list-inline mb-0">
				       		<li class="list-inline-item"><button title="Download"  @click.prevent="downloadfile" class="btn btn-downloadimage"><i class="fa-solid fa-download"></i></button></li>
				     
				       </ul>
			       	</div>

			       
			    </div> 
				<div class="modal-container displaypds" @click.prevent.stop  :class="checkClass">
			        <div class="modal-body">			      
			        	
	        			<div class="previewContents" id="preview">	        				
	        				<img :src="src" class="imgRes" v-if="isImage">
	        				
	        				<div class="othertypes d-flex" v-if="isOthertype">		        		
        						<div class="col-12 mb-1 text-center">
        							<span class="fs-5 text-white">No Preview Available</span>
        						</div>
        						<div class="col-12 text-center" @click.prevent.stop>
        							<button @click.prevent="downloadfile" class="btn btn-semiblue"><i class="fa-solid fa-download"></i> Download</button>
        						</div>
	        				</div>
						</div>			        	
			        </div>
				</div>
			</div>

		</div>		
</template>
<script>

	import pdf from 'pdfobject'
	import {reactive, nextTick, ref, onMounted } from 'vue';
	import useAttachments from '@/composables/composables-attachment'

	export default{
		props: {
			path: {
				required:true,
				type: Object
			},
			currentdisplay: {
				required:true,
				type: Number
			}
		},setup(props){	
			const isImage = ref(false);
			const isOthertype = ref(false);
			const checkClass = ref('');
			const filedata = reactive({
				'path': '',
				'filename': ''
			});
			const src = ref();

			const {downloadAttached} = useAttachments()

			nextTick(() => {
				const element = document.getElementById('mm');
				element.focus();

				for (var i of props.path) {
					if(props.currentdisplay == i.id){
						filedata.path = i.fullpath;
						filedata.filename = i.filename;

						if(i.fileextension == 'pdf'){
							isImage.value = false;
							isOthertype.value = false;
							checkClass.value = 'is-pdf';
							pdf.embed(i.fullpath,'#preview');
						}else if(i.fileextension == 'jpg' || i.fileextension == 'jpeg'  || i.fileextension == 'jpeg' || i.fileextension == 'tiff' ||i.fileextension == 'png'){
							isImage.value = true;
							isOthertype.value = false;
							checkClass.value = 'is-image';
							src.value = i.fullpath;
						}else{
							isImage.value = false;
							isOthertype.value = true;
							checkClass.value = 'is-othertypes';
						}										
					}
				}
			})		

			const downloadfile = async() =>{
				await downloadAttached({...filedata});
			}

			return {
				props,
				isImage,
				checkClass,
				isOthertype,
				src,
				filedata,
				downloadfile
			}
		}
	}
</script>
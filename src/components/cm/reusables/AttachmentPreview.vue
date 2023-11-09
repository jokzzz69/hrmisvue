<template>
    <div class="row">
        <div class="col-12 mt-2">
            <div class="card--title border-dashed pb-1">
                <strong>
                    Attachments ({{props.files.length}})
                </strong>
            </div>                       
        </div>
    </div>
    <div class="row">
        <div class="col mb-3">
            <ul class="files__wrap list-unstyled list-inline">
                <template v-for="attachment in props.files">                    
                    <li class="file--content list-inline-item" @click.prevent="viewModal(attachment.id)">
                        <div class="filedescription" :class="attachment.fileextension">
                            <div>
                                <span class="icon">
                                    <template v-if="attachment.fileextension == 'pdf'">
                                        <i class="fa-solid fa-file-pdf text-danger"></i>
                                    </template>
                                    <template v-else-if="attachment.fileextension == 'jpg' || attachment.fileextension == 'jpeg'  || attachment.fileextension == 'jpeg' || attachment.fileextension == 'tiff' || attachment.fileextension == 'png'">
                                        <i class="fa-solid fa-file-image text-primary"></i>
                                    </template>
                                    <template v-else>
                                        <template v-if="attachment.fileextension == 'doc' || attachment.fileextension == 'docx'">
                                            <i class="fa-regular fa-file-word text-primary"></i>
                                        </template>
                                        <template v-else-if="attachment.fileextension == 'xlsx' || attachment.fileextension == 'xlsm'">
                                            <i class="fa-solid fa-file-excel text-success"></i>
                                        </template>
                                        <template v-else-if="attachment.fileextension == 'ppt' || attachment.fileextension == 'pptx'">
                                            <i class="fa-solid fa-file-powerpoint text-danger"></i>
                                        </template>
                                        <template v-else>
                                            <i class="fa-solid fa-file-lines"></i>
                                        </template>
                                    </template>
                                </span>
                            </div>
                            <div class="w-100">
                                <span class="title">{{formatfilename(attachment.filename,attachment.fileextension)}}</span>
                                <span class="size">{{formatfilesize(attachment.filesize)}}</span>
                                <ul class="list-inline list-unstyled mb-1 ">
                                    <li class="list-inline-item" @click.stop>
                                        <a @click.prevent="dldata(attachment.fullpath,attachment.filename,attachment.fileextension)" href="#" class="btn btn-blue px-2 py-1" title="Download"><i class="fa-solid fa-download"></i> Download</a>                                       
                                    </li>                                    
                                </ul>
                            </div>
                        </div>

                    </li>
                </template>        
            </ul> 
        </div>
    </div>
    
    <Preview v-if="showModal" :path="props.files" :currentdisplay="activeOnModal" @close="showModal = false"/>

    
</template>
<script>

    import {formatfilesize} from '@/helper/formatfilesize';

    import {reactive, onMounted, ref} from 'vue';
    import Preview from '@/components/cm/reusables/Preview.vue';
    import useAttachments from '@/composables/composables-attachment'



    export default{
        components: {
            Preview
        },
        props: {
            files: {
                required: true,
                type: Object
            }
        },

        setup(props){
            const showModal = ref(false);
            const activeOnModal = ref();
            const {downloadAttached} = useAttachments()

            const form = reactive({
                'filepath' : ''
            });
            const fileTODL = reactive({
                'path': '',
                'filename': '',
                'extension':''
            })
            const viewModal = (id) =>{
                activeOnModal.value = id;
                showModal.value = true;
            }
            const formatfilename = (filename,ext) => {
                if(filename){
                    if(filename.length > 50){
                        return filename.slice(0, 50)+'...'+ext;
                    }else{
                        return filename;
                    }
                }
                
            }
            const dldata = async(path,filename,ext) => {
                fileTODL.path = path;
                fileTODL.filename = filename;
                fileTODL.extension = ext;

                await downloadAttached({...fileTODL})
            }
            return {
                props,
                formatfilesize,
                viewModal,
                showModal,
                activeOnModal,
                formatfilename,
                dldata
            }
        }
    }
</script>